package com.samadhan.grievance_core_service.service;

import com.samadhan.grievance_core_service.constants.GrievanceStatus;
import com.samadhan.grievance_core_service.dto.FeedbackRequestDTO;
import com.samadhan.grievance_core_service.entity.Feedback;
import com.samadhan.grievance_core_service.entity.Grievances;
import com.samadhan.grievance_core_service.exception.BadRequestException;
import com.samadhan.grievance_core_service.exception.ResourceAccessNotAllowed;
import com.samadhan.grievance_core_service.exception.ResourceNotFoundException;
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

        // 🔹 Find grievance
        Grievances grievance = grievanceRepository.findById(dto.getGrievanceId())
                .orElseThrow(() -> new ResourceNotFoundException("Grievance not found"));

        // 🔹 Rule 1: Only grievance owner can give feedback
        if (grievance.getCreatedByUserId() == null || !grievance.getCreatedByUserId().equals(userId)) {
            throw new ResourceAccessNotAllowed("You can only give feedback for your own grievance");
        }

        // 🔹 Rule 2: Grievance must be RESOLVED
        if (!GrievanceStatus.RESOLVED.equals(grievance.getStatus())) {
            throw new BadRequestException("Feedback allowed only after grievance is RESOLVED");
        }

        // 🔹 Rule 3: Only one feedback per grievance per user
        feedbackRepository.findByGrievanceIdAndUserId(dto.getGrievanceId(), userId)
                .ifPresent(f -> {
                    throw new BadRequestException("Feedback already submitted for this grievance");
                });

        // 🔹 Rule 4: Rating must be between 1 and 5
        if (dto.getRating() == null || dto.getRating() < 1 || dto.getRating() > 5) {
            throw new BadRequestException("Rating must be between 1 and 5");
        }

        // 🔹 Rule 5: Message must not be empty
        if (dto.getMessage() == null || dto.getMessage().trim().isEmpty()) {
            throw new BadRequestException("Feedback message cannot be empty");
        }

        // 🔹 Save feedback
        Feedback feedback = Feedback.builder()
                .grievanceId(dto.getGrievanceId())
                .userId(userId)
                .userEmail(email)
                .deptId(deptId)
                .rating(dto.getRating())
                .message(dto.getMessage().trim())
                .createdAt(LocalDateTime.now())
                .build();

        feedbackRepository.save(feedback);

        return "Feedback submitted successfully";
    }
}
