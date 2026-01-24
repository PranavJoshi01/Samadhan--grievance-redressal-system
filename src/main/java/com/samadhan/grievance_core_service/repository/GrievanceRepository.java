package com.samadhan.grievance_core_service.repository;

import com.samadhan.grievance_core_service.entity.Grievances;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrievanceRepository extends JpaRepository<Grievances,Long> {
}
