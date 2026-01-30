package com.samadhan.grievance_core_service.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "feedback",
       uniqueConstraints = @UniqueConstraint(columnNames = {"grievance_id", "user_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "grievance_id", nullable = false)
    private Long grievanceId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    private String userEmail;

    private Long deptId;

    private Integer rating;

    @Column(length = 1000)
    private String message;

    private LocalDateTime createdAt;
}
