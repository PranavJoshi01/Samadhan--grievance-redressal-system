package com.samadhan.notification.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    private String subject;

    @Column(length = 2000)
    private String message;

    private LocalDateTime submittedAt = LocalDateTime.now();
}
