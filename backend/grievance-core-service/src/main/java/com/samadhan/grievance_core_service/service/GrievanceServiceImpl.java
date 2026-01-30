package com.samadhan.grievance_core_service.service;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import com.samadhan.grievance_core_service.constants.GrievanceStatus;
import com.samadhan.grievance_core_service.dto.*;
import com.samadhan.grievance_core_service.entity.*;
import com.samadhan.grievance_core_service.exception.ResourceAccessNotAllowed;
import com.samadhan.grievance_core_service.exception.ResourceNotFoundException;
import com.samadhan.grievance_core_service.repository.*;
import com.samadhan.grievance_core_service.security.JwtUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GrievanceServiceImpl implements GrievanceService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RestTemplate restTemplate;

    private static final Logger logger = LoggerFactory.getLogger(GrievanceServiceImpl.class);

    @Autowired
    private GrievanceRepository grievanceRepository;
    @Autowired
    private GrievanceMediaRepository mediaRepository;
    @Autowired
    private GrievanceCategoryRepository categoryRepository;
    @Autowired
    private S3Service s3Service;

    // ================= CREATE GRIEVANCE =================
    @Override
    @Transactional
    public void createGrievance(GrievanceDto grievanceDto, MultipartFile[] mediaFile, String token) {

        String userEmail = jwtUtil.extractEmail(token);
        Long userId = jwtUtil.extractUserId(token);

        if (userEmail == null) {
            throw new RuntimeException("User email not found. Please login again.");
        }

        GrievanceCategory category = categoryRepository
                .findById((long) grievanceDto.getDeptId())
                .orElseThrow(() -> new ResourceNotFoundException("Department not found"));

        Grievances grievance = Grievances.builder()
                .title(grievanceDto.getTitle())
                .description(grievanceDto.getDescription())
                .address(grievanceDto.getAddress())
                .status(GrievanceStatus.PENDING)
                .createdByUserId(userId)
                .createdByUserEmail(userEmail)
                .category(category)
                .build();

        Grievances savedGrievance = grievanceRepository.save(grievance);

        if (mediaFile != null && mediaFile.length > 0) {
            String mediaUrl = s3Service.uploadFile(mediaFile[0]);
            GrievanceMedia mediaEntity = GrievanceMedia.builder()
                    .mediaUrl(mediaUrl)
                    .mediaType(mediaFile[0].getContentType())
                    .grievance(savedGrievance)
                    .build();
            mediaRepository.save(mediaEntity);
        }

        try {
            String notificationUrl = "http://localhost:8083/notifications";

            Map<String, String> notificationRequest = new HashMap<>();
            notificationRequest.put("userEmail", userEmail);
            notificationRequest.put("message",
                    "Your grievance '" + grievanceDto.getTitle() + "' has been submitted successfully.");

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> requestEntity =
                    new HttpEntity<>(notificationRequest, headers);

            restTemplate.postForObject(notificationUrl, requestEntity, String.class);


        } catch (Exception e) {
            logger.error("Failed to send notification", e);
        }
    }

    // ================= FETCH GRIEVANCES =================
    @Override
    public Page<Grievances> getAllGrievancesByRole(int page, int size, Long userId, String role, Long deptId) {
        Pageable pageable = PageRequest.of(page, size);

        if ("ADMIN".equalsIgnoreCase(role)) return grievanceRepository.findAll(pageable);
        if ("USER".equalsIgnoreCase(role)) return grievanceRepository.findByCreatedByUserId(userId, null, pageable);
        if ("AUTHORITY".equalsIgnoreCase(role)) return grievanceRepository.findByAssignedAuthorityId(deptId, null, pageable);

        throw new IllegalArgumentException("Invalid role");
    }

    public Page<GrievanceResponseDto> getAllGrievancesByRoleWithDTO(int page, int size, Long userId, String role, Long deptId, String status) {
        GrievanceStatus statusEnum = (status != null && !status.isEmpty()) ? GrievanceStatus.valueOf(status.toUpperCase()) : null;
        Pageable pageable = PageRequest.of(page, size);
        Page<Grievances> grievancesPage;

        if ("ADMIN".equalsIgnoreCase(role)) grievancesPage = grievanceRepository.findAll(statusEnum, pageable);
        else if ("USER".equalsIgnoreCase(role)) grievancesPage = grievanceRepository.findByCreatedByUserId(userId, statusEnum, pageable);
        else if ("AUTHORITY".equalsIgnoreCase(role)) grievancesPage = grievanceRepository.findByAssignedAuthorityId(deptId, statusEnum, pageable);
        else throw new IllegalArgumentException("Invalid role");

        return grievancesPage.map(this::convertToResponseDto);
    }

    private GrievanceResponseDto convertToResponseDto(Grievances grievance) {

        GrievanceResponseDto dto = GrievanceResponseDto.builder()
                .grievanceId(grievance.getGrievanceId())
                .title(grievance.getTitle())
                .description(grievance.getDescription())
                .address(grievance.getAddress())
                .status(grievance.getStatus())
                .createdAt(grievance.getCreatedAt())
                .updatedAt(grievance.getUpdatedAt())
                .createdByUserId(grievance.getCreatedByUserId())   // ✅ correct field
                .assignedAuthorityId(grievance.getAssignedAuthorityId())
                .build();

        // Category mapping
        if (grievance.getCategory() != null) {
            dto.setCategory(new GrievanceResponseDto.CategoryDto(
                    grievance.getCategory().getCategoryId(),
                    grievance.getCategory().getCategoryName()
            ));
        }

        // Media URLs mapping
        if (grievance.getGrievanceMedia() != null && !grievance.getGrievanceMedia().isEmpty()) {
            dto.setMediaUrls(
                    grievance.getGrievanceMedia()
                            .stream()
                            .map(GrievanceMedia::getMediaUrl)
                            .toList()
            );
        }

        return dto;
    }


    // ================= OTHER METHODS UNCHANGED =================
    @Override
    public GrievanceStatsDto getGrievanceCountByStatus(Long userId, String role, Long deptId) {
        GrievanceStatsDto dto = new GrievanceStatsDto();
        Map<GrievanceStatus, Long> map = new HashMap<>();
        List<Object[]> result;
        long totalCount;

        if (role.equals("USER")) {
            result = grievanceRepository.countByStatusForUser(userId);
            totalCount = grievanceRepository.countByCreatedByUserId(userId);
        } else if (role.equals("ADMIN")) {
            result = grievanceRepository.countByStatusForAdmin();
            totalCount = grievanceRepository.count();
        } else {
            result = grievanceRepository.countByStatusForAuthority(deptId);
            totalCount = grievanceRepository.countByAssignedAuthorityId(deptId);
        }

        dto.setTotalCount(totalCount);
        result.forEach(row -> map.put((GrievanceStatus) row[0], (Long) row[1]));
        dto.setStatusWiseCount(map);
        return dto;
    }

    @Override
    public void updateGrievance(GrievanceDto grievanceDto, Long id) {
        Grievances grievance = grievanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Grievance not found"));

        if (grievance.getStatus() == GrievanceStatus.CLOSED)
            throw new ResourceAccessNotAllowed("Cannot update closed grievance");

        GrievanceCategory category = categoryRepository
                .findById((long) grievanceDto.getDeptId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        grievance.setTitle(grievanceDto.getTitle());
        grievance.setDescription(grievanceDto.getDescription());
        grievance.setAddress(grievanceDto.getAddress());
        grievance.setCategory(category);

        grievanceRepository.save(grievance);
    }

    @Override
    public void settingStatus(GrievanceStatusChangedRequestDto dto, long id, String role) {
        Grievances grievance = grievanceRepository.findById(dto.getGrievanceId())
                .orElseThrow(() -> new ResourceNotFoundException("Grievance not found"));

        if (role.equals("USER") && dto.getStatus() != GrievanceStatus.CLOSED)
            throw new ResourceAccessNotAllowed("User can only close grievance");

        grievance.setStatus(dto.getStatus());
        grievanceRepository.save(grievance);
    }

    @Override
    @Transactional
    public void assignAuthorityAndUpdateStatus(Long grievanceId,
                                               Long authorityId,
                                               GrievanceStatus status,
                                               String message) {

        Grievances grievance = grievanceRepository.findById(grievanceId)
                .orElseThrow(() -> new RuntimeException("Grievance not found"));

        // If authority/category is provided, set it
        if (authorityId != null) {
            GrievanceCategory category = categoryRepository.findById(authorityId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            grievance.setCategory(category);

            // Also store authority ID if your entity has this field
            grievance.setAssignedAuthorityId(authorityId);
        }

        // If status is provided, update it
        if (status != null) {
            grievance.setStatus(status);
        }

        // Optional message logging
        if (message != null && !message.isBlank()) {
            logger.info("Notification message: {}", message);
        }

        grievanceRepository.save(grievance);
    }
