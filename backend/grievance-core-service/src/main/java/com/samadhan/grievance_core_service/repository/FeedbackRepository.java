package com.samadhan.grievance_core_service.repository;

import com.samadhan.grievance_core_service.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    Optional<Feedback> findByGrievanceIdAndUserId(Long grievanceId, Long userId);

    List<Feedback> findByUserId(Long userId);

    List<Feedback> findByGrievanceId(Long grievanceId);
}
