package com.samadhan.grievance_core_service.dto;

import jakarta.validation.constraints.*;

import lombok.Data;

@Data
public class FeedbackRequestDTO {

    @NotNull
    private Long grievanceId;

    @Min(1)
    @Max(5)
    private Integer rating;

    @Size(max = 1000)
    private String message;
}
