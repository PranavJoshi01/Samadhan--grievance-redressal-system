package com.samadhan.notification.controller;

import com.samadhan.notification.dto.NotificationRequestDTO;
import com.samadhan.notification.dto.NotificationResponseDTO;
import com.samadhan.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    // CREATE NOTIFICATION
    @PostMapping
    public ResponseEntity<NotificationResponseDTO> create(
            @RequestBody NotificationRequestDTO request) {

        return ResponseEntity.ok(notificationService.createNotification(request));
    }

    // GET NOTIFICATIONS FOR LOGGED-IN USER
    @GetMapping
    public ResponseEntity<List<NotificationResponseDTO>> myNotifications(Authentication authentication) {

        String email = authentication.getName(); // Extracted from JWT
        return ResponseEntity.ok(notificationService.getUserNotifications(email));
    }

    //  MARK AS READ
    @PutMapping("/{id}/read")
    public ResponseEntity<String> markRead(@PathVariable Long id) {

        notificationService.markAsRead(id);
        return ResponseEntity.ok("Marked as read");
    }
}
