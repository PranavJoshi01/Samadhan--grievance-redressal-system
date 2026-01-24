package com.samadhan.grievance_core_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "grievance_category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GrievanceCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "category_name", nullable = false, unique = true, length = 100)
    private String categoryName;

    @Column(name = "description", length = 255)
    private String description;
}