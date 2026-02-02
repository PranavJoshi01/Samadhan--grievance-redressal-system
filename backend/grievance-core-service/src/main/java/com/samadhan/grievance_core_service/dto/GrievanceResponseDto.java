package com.samadhan.grievance_core_service.dto;

import com.samadhan.grievance_core_service.constants.GrievanceStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GrievanceResponseDto {

    private Long grievanceId;
    private String title;
    private String description;
    private String address;
    private GrievanceStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long createdByUserId;
    private Long assignedAuthorityId;

    private CategoryDto category;
    private List<String> mediaUrls;  // Only URLs, not full media objects

    //  NEW FIELDS FROM FEEDBACK SERVICE
    private Integer feedbackRating;
    private String feedbackMessage;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CategoryDto {
        private Long categoryId;
        private String categoryName;
    }
}
