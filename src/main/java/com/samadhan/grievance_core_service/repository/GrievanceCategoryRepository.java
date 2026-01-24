package com.samadhan.grievance_core_service.repository;

import com.samadhan.grievance_core_service.entity.GrievanceCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrievanceCategoryRepository extends JpaRepository<GrievanceCategory,Long> {
}
