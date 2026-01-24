package com.samadhan.grievance_core_service.entity;


import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "grievances")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Grievances {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grievance_id")
    private Long grievanceId;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 50)
    private String status;

    @Column(name = "created_by_user_id", nullable = false)
    private Long createdByUserId;

    @Column(name = "assigned_authority_id")
    private Long assignedAuthorityId;

    // 🔗 Many grievances belong to one category
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private GrievanceCategory category;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Auto timestamps
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
