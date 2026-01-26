package com.samadhan.notification.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NotificationResponseDTO {
    private Long id;
    private String userEmail;
    private String message;
    private Boolean read;
    private LocalDateTime createdAt;
}
