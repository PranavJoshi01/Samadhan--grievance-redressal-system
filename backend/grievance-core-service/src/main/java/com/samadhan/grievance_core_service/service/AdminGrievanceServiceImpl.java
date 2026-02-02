package com.samadhan.grievance_core_service.service;

import com.samadhan.grievance_core_service.dto.AdminGrievanceListDto;
import com.samadhan.grievance_core_service.entity.Grievances;
import com.samadhan.grievance_core_service.repository.GrievanceRepository;
import com.samadhan.grievance_core_service.client.FeedbackClient;
import com.samadhan.grievance_core_service.dto.FeedbackResponseDto;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminGrievanceServiceImpl implements AdminGrievanceService {

    @Autowired
    private GrievanceRepository grievanceRepository;

    @Autowired
    private FeedbackClient feedbackClient;   // ⭐ Feign Client

    @Override
    public List<AdminGrievanceListDto> getAllGrievances() {

        List<Grievances> grievances = grievanceRepository.findAll();
        List<AdminGrievanceListDto> response = new ArrayList<>();

        for (Grievances g : grievances) {

            AdminGrievanceListDto dto = new AdminGrievanceListDto();

            dto.setGrievanceId(g.getGrievanceId());
            dto.setTitle(g.getTitle());
            dto.setStatus(g.getStatus().name());
            dto.setAssignedAuthorityId(g.getAssignedAuthorityId());
            dto.setCreatedAt(g.getCreatedAt());

            // ⭐ Fetch feedback ONLY if grievance is RESOLVED
            if ("RESOLVED".equalsIgnoreCase(g.getStatus().name())) {
                try {
                	FeedbackResponseDto feedback =
                            feedbackClient.getFeedbackByGrievanceId(g.getGrievanceId());

                    if (feedback != null) {
                        dto.setFeedbackRating(feedback.getRating());
                        dto.setFeedbackMessage(feedback.getMessage());
                    }
                } catch (Exception ex) {
                    // Do NOT break admin API if feedback service is down
                    dto.setFeedbackRating(null);
                    dto.setFeedbackMessage(null);
                }
            }

            response.add(dto);
        }

        return response;
    }
}
