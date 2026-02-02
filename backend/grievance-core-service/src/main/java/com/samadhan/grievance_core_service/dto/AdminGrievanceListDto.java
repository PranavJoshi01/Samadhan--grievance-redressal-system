package com.samadhan.grievance_core_service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AdminGrievanceListDto {

    private Long grievanceId;
    private String title;
    private String status;
    private Long assignedAuthorityId;
    private LocalDateTime createdAt;

    // ⭐ NEW FIELDS FOR FEEDBACK
    private Integer feedbackRating;
    private String feedbackMessage;
}
