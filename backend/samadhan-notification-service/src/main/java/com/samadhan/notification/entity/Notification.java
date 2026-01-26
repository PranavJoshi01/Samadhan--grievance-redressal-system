package com.samadhan.notification.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private String message;

    @Column(name = "is_read", nullable = false)
    private Boolean read;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (read == null) {
            read = false;
        }
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}

