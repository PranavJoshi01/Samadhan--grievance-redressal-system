package com.samadhan.notification.service;

import com.samadhan.notification.dto.NotificationRequestDTO;
import com.samadhan.notification.dto.NotificationResponseDTO;
import com.samadhan.notification.entity.Notification;
import com.samadhan.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    // ✅ CREATE NOTIFICATION USING REAL USER EMAIL
    public NotificationResponseDTO createNotification(NotificationRequestDTO request) {

        Notification notification = Notification.builder()
                .userEmail(request.getUserEmail())   // ✅ USE EMAIL FROM REQUEST
                .message(request.getMessage())
                .read(false)
                .build();

        Notification saved = notificationRepository.save(notification);

        return NotificationResponseDTO.builder()
                .id(saved.getId())
                .userEmail(saved.getUserEmail())
                .message(saved.getMessage())
                .read(saved.getRead())
                .createdAt(saved.getCreatedAt())
                .build();
    }

    // ✅ GET ALL NOTIFICATIONS FOR LOGGED-IN USER
    public List<NotificationResponseDTO> getUserNotifications(String email) {

        return notificationRepository
                .findByUserEmailOrderByCreatedAtDesc(email)
                .stream()
                .map(n -> NotificationResponseDTO.builder()
                        .id(n.getId())
                        .userEmail(n.getUserEmail())
                        .message(n.getMessage())
                        .read(n.getRead())
                        .createdAt(n.getCreatedAt())
                        .build())
                .toList();
    }

    // ✅ MARK NOTIFICATION AS READ
    public void markAsRead(Long id) {

        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setRead(true);
        notificationRepository.save(notification);
    }
}
