package com.samadhan.notification.dto;

import lombok.Data;

@Data
public class NotificationRequestDTO {
    private String userEmail;
    private String message;
}
