package com.samadhan.grievance_core_service.service;

import com.samadhan.grievance_core_service.dto.GrievanceStatsDto;
import com.samadhan.grievance_core_service.dto.GrievanceStatusChangedRequestDto;
import com.samadhan.grievance_core_service.exception.ResourceAccessNotAllowed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


import com.samadhan.grievance_core_service.constants.GrievanceStatus;
import com.samadhan.grievance_core_service.dto.GrievanceDto;
import com.samadhan.grievance_core_service.entity.GrievanceCategory;
import com.samadhan.grievance_core_service.entity.GrievanceMedia;
import com.samadhan.grievance_core_service.entity.Grievances;
import com.samadhan.grievance_core_service.exception.ResourceNotFoundException;
import com.samadhan.grievance_core_service.repository.GrievanceCategoryRepository;
import com.samadhan.grievance_core_service.repository.GrievanceMediaRepository;
import com.samadhan.grievance_core_service.repository.GrievanceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GrievanceServiceImpl implements GrievanceService {

    private static final Logger logger =
            LoggerFactory.getLogger(GrievanceServiceImpl.class);

    @Autowired
    private GrievanceRepository grievanceRepository;
    @Autowired
    private GrievanceMediaRepository mediaRepository;
    @Autowired
    private GrievanceCategoryRepository categoryRepository;

    @Autowired
    private S3Service s3Service;


    @Override
    @Transactional
    public void createGrievance(GrievanceDto grievanceDto, MultipartFile[] mediaFile, Long userId) {
        GrievanceCategory category = categoryRepository
                .findById((long) grievanceDto.getDeptId())
                .orElseThrow(() -> {
                    logger.error(
                            "Department {} not found for grievance title: {}",
                            grievanceDto.getDeptId(),
                            grievanceDto.getTitle()
                    );
                    return new ResourceNotFoundException("Department not found");
                });

        logger.info("Fetched department detail{}", category);

        // Create grievance entity
        Grievances grievance = Grievances.builder()
                .title(grievanceDto.getTitle())
                .description(grievanceDto.getDescription())
                .address(grievanceDto.getAddress())
                .status(GrievanceStatus.PENDING)
                .createdByUserId(userId)
                .category(category)
                .build();

        // Save grievance first
        Grievances savedGrievance = grievanceRepository.save(grievance);

        logger.info("Saved grievance detail{}", savedGrievance.getGrievanceId());

            if (mediaFile != null && mediaFile.length > 0) {

                String mediaUrl = s3Service.uploadFile(mediaFile[0]);

                GrievanceMedia mediaEntity = GrievanceMedia.builder()
                        .mediaUrl(mediaUrl)
                        .mediaType(mediaFile[0].getContentType())
                        .grievance(savedGrievance)
                        .build();

                mediaRepository.save(mediaEntity);
            }
            logger.info("Saved media for grievance{}", savedGrievance.getGrievanceId());

    }

    @Override
    public Page<Grievances> getAllGrievancesByRole(
            int page,
            int size,
            Long userId,
            String role,
            Long deptId
    ) {

        Pageable pageable = PageRequest.of(page, size);

        if ("ADMIN".equalsIgnoreCase(role)) {
            // ADMIN → all grievances
            return grievanceRepository.findAll(pageable);
        }

        if ("USER".equalsIgnoreCase(role)) {
            // USER → only grievances created by user
            return grievanceRepository
                    .findByCreatedByUserId(userId, pageable);
        }

        if ("AUTHORITY".equalsIgnoreCase(role)) {
            // AUTHORITY → grievances assigned to authority / department
            return grievanceRepository
                    .findByAssignedAuthorityId(deptId, pageable);
        }

        throw new IllegalArgumentException("Invalid role: " + role);
    }
    
    
    

    @Override
    public GrievanceStatsDto getGrievanceCountByStatus(Long userId,String role,Long deptId) {

        GrievanceStatsDto dto = new GrievanceStatsDto();
        Map<GrievanceStatus, Long> map = new HashMap<>();
        List<Object[]> result;
        long totalCount;

        if(role.equals("USER")) {
              result = grievanceRepository.countByStatusForUser(userId);
               totalCount = grievanceRepository.countByCreatedByUserId(userId);
          }
          else if(role.equals("ADMIN")){
              result=grievanceRepository.countByStatusForAdmin();
               totalCount=grievanceRepository.count();
          }
          else{
              result=grievanceRepository.countByStatusForAuthority(deptId);
               totalCount=grievanceRepository.countByAssignedAuthorityId(deptId);

          }
     logger.info("Fetched count seccessfully {}",totalCount);
        dto.setTotalCount(totalCount);

        for (Object[] row : result) {
            GrievanceStatus status = (GrievanceStatus) row[0];
            Long count = (Long) row[1];
            map.put(status, count);
        }

        dto.setStatusWiseCount(map);
        return dto;

    }

    @Override
    public void updateGrievance(GrievanceDto grievanceDto, Long id) {
        Grievances grievance = grievanceRepository

                .findById(id)
                .orElseThrow(() -> {
                    logger.error("Grievance not found for id {}",id);

                    return new ResourceNotFoundException("Grievance not found");
                });

        GrievanceCategory category = categoryRepository
                .findById((long) grievanceDto.getDeptId())
                .orElseThrow(() -> {
                    logger.error(
                            "Department {} not found for grievance title: {}",
                            grievanceDto.getDeptId(),
                            grievanceDto.getTitle()
                    );
                    return new ResourceNotFoundException("Department not found");
                });

        grievance.setTitle(grievanceDto.getTitle());
        grievance.setDescription(grievanceDto.getDescription());
        grievance.setAddress(grievanceDto.getAddress());
        grievance.setCategory(category);

        // Save grievance first
        Grievances savedGrievance = grievanceRepository.save(grievance);

        logger.info("Saved grievance detail{}", savedGrievance.getGrievanceId());
        // Save single media if present
        if (grievanceDto.getMedia() != null) {

            GrievanceMedia media = GrievanceMedia.builder()
                    .mediaUrl(grievanceDto.getMedia().getMediaUrl())
                    .mediaType(grievanceDto.getMedia().getMediaType())
                    .grievance(savedGrievance)
                    .build();

            mediaRepository.save(media);

            logger.info("Saved media for grievance{}", savedGrievance.getGrievanceId());
        }
    }

    @Override
    public void settingStatus(GrievanceStatusChangedRequestDto grievanceStatusChangedRequestDto, long id, String role) {

        Grievances grievance = grievanceRepository

                .findById(grievanceStatusChangedRequestDto.getGrievanceId())
                .orElseThrow(() -> {
                    logger.error("Grievance not found for id {}",id);

                    return new ResourceNotFoundException("Grievance not found");
                });

        GrievanceStatus newStatus = grievanceStatusChangedRequestDto.getStatus();
        if(role.equals("USER") && newStatus !=GrievanceStatus.CLOSED){
            throw new ResourceAccessNotAllowed(
                    "User is allowed to close grievance only"
            );

        }
        grievance.setStatus(newStatus);
        grievanceRepository.save(grievance);
    }

    
    
    @Override
    @Transactional
    public void assignAuthorityAndUpdateStatus(
    Long grievanceId,
    Long authorityId,
    GrievanceStatus status,
    String message
    ) {


    Grievances grievance = grievanceRepository.findById(grievanceId)
    .orElseThrow(() ->
    new RuntimeException("Grievance not found"));


    grievance.setAssignedAuthorityId(authorityId);
    grievance.setStatus(status);


    // optional: future use
    if (message != null && !message.isBlank()) {
    logger.info("Notification message: {}", message);
    }


    grievanceRepository.save(grievance);


    logger.info(
    "Grievance {} updated with status {} and authority {}",
    grievanceId, status, authorityId
    );
    }
}