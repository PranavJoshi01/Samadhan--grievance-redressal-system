package com.samadhan.grievance_core_service.service;


import com.samadhan.grievance_core_service.constants.GrievanceStatus;
import com.samadhan.grievance_core_service.dto.GrievanceDto;
import com.samadhan.grievance_core_service.entity.GrievanceCategory;
import com.samadhan.grievance_core_service.entity.GrievanceMedia;
import com.samadhan.grievance_core_service.entity.Grievances;
import com.samadhan.grievance_core_service.exception.ResourceNotFoundException;
import com.samadhan.grievance_core_service.repository.GrievanceCategoryRepository;
import com.samadhan.grievance_core_service.repository.GrievanceMediaRepository;
import com.samadhan.grievance_core_service.repository.GrievanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GrievanceServiceImpl implements GrievanceService {

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
                .orElseThrow(() ->
                        new ResourceNotFoundException("Department not found")
                );

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

        // Save single media if present
        if (grievanceDto.getMedia() != null) {

            GrievanceMedia media = GrievanceMedia.builder()
                    .mediaUrl(grievanceDto.getMedia().getMediaUrl())
                    .mediaType(grievanceDto.getMedia().getMediaType())
                    .grievance(savedGrievance)
                    .build();

            mediaRepository.save(media);


        }
    }
}
