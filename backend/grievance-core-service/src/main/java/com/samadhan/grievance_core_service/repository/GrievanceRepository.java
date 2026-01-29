package com.samadhan.grievance_core_service.repository;

import com.samadhan.grievance_core_service.entity.Grievances;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrievanceRepository extends JpaRepository<Grievances,Long> {
	
	
	/*Page<Grievances> findByCreatedByUserId(
			Long userId,
			Pageable pageable
			);


			Page<Grievances> findByAssignedAuthorityId(
			Long authorityId,
			Pageable pageable
			);*/
			
			
			
	@EntityGraph(attributePaths = {"grievanceMedia"})
	@Query("SELECT g FROM Grievances g WHERE (:status IS NULL OR g.status = :status)")
	Page<Grievances> findAll(@Param("status") com.samadhan.grievance_core_service.constants.GrievanceStatus status, Pageable pageable);

	@EntityGraph(attributePaths = {"grievanceMedia"})
	@Query("SELECT g FROM Grievances g WHERE g.createdByUserId = :userId AND (:status IS NULL OR g.status = :status)")
	Page<Grievances> findByCreatedByUserId(@Param("userId") Long userId, @Param("status") com.samadhan.grievance_core_service.constants.GrievanceStatus status, Pageable pageable);

	@EntityGraph(attributePaths = {"grievanceMedia"})
	@Query("SELECT g FROM Grievances g WHERE g.category.categoryId = :deptId AND (:status IS NULL OR g.status = :status)")
	Page<Grievances> findByAssignedAuthorityId(@Param("deptId") Long deptId, @Param("status") com.samadhan.grievance_core_service.constants.GrievanceStatus status, Pageable pageable);
	

    @Query("""
    SELECT g.status, COUNT(g)
    FROM Grievances g
    WHERE g.createdByUserId = :userId
    GROUP BY g.status
""")
    List<Object[]> countByStatusForUser(@Param("userId") Long userId);
    Long countByCreatedByUserId(Long userId);

    @Query("""
    SELECT g.status, COUNT(g)
    FROM Grievances g
    GROUP BY g.status
""")
    List<Object[]> countByStatusForAdmin();


    @Query("""
    SELECT g.status, COUNT(g)
    FROM Grievances g
    WHERE g.category.categoryId = :deptId
    GROUP BY g.status
""")
    List<Object[]> countByStatusForAuthority(@Param("deptId") Long deptId);

	@Query("""
    SELECT  COUNT(g)
    FROM Grievances g
    WHERE g.category.categoryId = :deptId
""")
    Long countByAssignedAuthorityId(Long deptId);

}
