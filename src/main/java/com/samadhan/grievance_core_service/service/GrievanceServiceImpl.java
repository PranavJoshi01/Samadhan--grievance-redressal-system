package com.samadhan.grievance_core_service.service;

import com.samadhan.grievance_core_service.dto.GrievanceStatsDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


import com.samadhan.grievance_core_service.constants.GrievanceStatus;
import com.samadhan.grievance_core_service.controller.GrievanceController;
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

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GrievanceServiceImpl implements GrievanceService {

    private static final Logger logger =
            LoggerFactory.getLogger(GrievanceController.class);

    @Autowired
    private GrievanceRepository grievanceRepository;
    @Autowired
    private GrievanceMediaRepository mediaRepository;
    @Autowired
    private GrievanceCategoryRepository categoryRepository;


    @Override
    @Transactional
    public void createGrievance(GrievanceDto grievanceDto, Long userId) {
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
                .status(GrievanceStatus.PENDING)
                .createdByUserId(userId)
                .category(category)

                .build();

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
    public Page<Grievances> getAllGrievances(int page, int size) {


        Pageable pageable = PageRequest.of(page, size);
        return grievanceRepository.findAll(pageable);
    }

    @Override
    public GrievanceStatsDto getGrievanceCountByStatus(Long userId) {

        GrievanceStatsDto dto = new GrievanceStatsDto();
        Map<GrievanceStatus, Long> map = new HashMap<>();
        List<Object[]> result;


        result = grievanceRepository.countByStatusForUser(userId);
        long totalCount=grievanceRepository.countByCreatedByUserId(userId);
        dto.setTotalCount(totalCount);

        for (Object[] row : result) {
            GrievanceStatus status = (GrievanceStatus) row[0];
            Long count = (Long) row[1];
            map.put(status, count);
        }

        dto.setStatusWiseCount(map);
        return dto;

    }
}