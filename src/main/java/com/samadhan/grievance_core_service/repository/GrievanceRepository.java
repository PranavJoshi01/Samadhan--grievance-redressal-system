package com.samadhan.grievance_core_service.repository;

import com.samadhan.grievance_core_service.entity.Grievances;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrievanceRepository extends JpaRepository<Grievances,Long> {

    @Query("""
    SELECT g.status, COUNT(g)
    FROM Grievances g
    WHERE g.createdByUserId = :userId
    GROUP BY g.status
""")
    List<Object[]> countByStatusForUser(@Param("userId") Long userId);
    Long countByCreatedByUserId(Long userId);

}
