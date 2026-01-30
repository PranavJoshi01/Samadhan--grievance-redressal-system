package com.samadhan.grievance_core_service.service;
import com.samadhan.grievance_core_service.constants.GrievanceStatus;
import com.samadhan.grievance_core_service.dto.FeedbackRequestDTO;
import com.samadhan.grievance_core_service.entity.Feedback;
import com.samadhan.grievance_core_service.entity.Grievances;
import com.samadhan.grievance_core_service.repository.FeedbackRepository;
import com.samadhan.grievance_core_service.repository.GrievanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final GrievanceRepository grievanceRepository;

  

    public String submitFeedback(FeedbackRequestDTO dto, Long userId, String email, Long deptId) {

        Grievances grievance = grievanceRepository.findById(dto.getGrievanceId())
                .orElseThrow(() -> new RuntimeException("Grievance not found"));

        // Rule 1: Must belong to same user
        if (!grievance.getCreatedByUserId().equals(userId)) {
            throw new RuntimeException("You can only give feedback for your own grievance");
        }

        // Rule 2: Must be resolved (ENUM comparison)
        if (grievance.getStatus() != GrievanceStatus.RESOLVED) {
            throw new RuntimeException("Feedback allowed only after grievance is RESOLVED");
        }

        // Rule 3: Only once
        if (feedbackRepository.findByGrievanceIdAndUserId(dto.getGrievanceId(), userId).isPresent()) {
            throw new RuntimeException("Feedback already submitted for this grievance");
        }

        Feedback feedback = Feedback.builder()
                .grievanceId(dto.getGrievanceId())
                .userId(userId)
                .userEmail(email)
                .deptId(deptId)
                .rating(dto.getRating())
                .message(dto.getMessage())
                .createdAt(LocalDateTime.now())
                .build();

        feedbackRepository.save(feedback);

        return "Feedback submitted successfully";
    }

}
