package com.samadhan.grievance_core_service.service;
import com.samadhan.grievance_core_service.constants.GrievanceStatus;
import com.samadhan.grievance_core_service.dto.GrievanceResponseDto;
import com.samadhan.grievance_core_service.dto.GrievanceStatsDto;
import com.samadhan.grievance_core_service.dto.GrievanceStatusChangedRequestDto;
import com.samadhan.grievance_core_service.entity.Grievances;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;

import com.samadhan.grievance_core_service.dto.GrievanceDto;
import org.springframework.web.multipart.MultipartFile;

public interface GrievanceService {
	void createGrievance(GrievanceDto grievanceDto, MultipartFile[] mediaFile, String token);

    
    Page<Grievances> getAllGrievancesByRole(
            int page,
            int size,
            Long userId,
            String role,
            Long deptId
    );

    GrievanceStatsDto getGrievanceCountByStatus(Long UserId,String role,Long deptId);

    void updateGrievance(@Valid GrievanceDto grievanceDto, Long id);

    void settingStatus(GrievanceStatusChangedRequestDto grievanceStatusChangedRequestDto, long l, String user);
    
    
    void assignAuthorityAndUpdateStatus(
    		Long grievanceId,
    		Long authorityId,
    		GrievanceStatus status,
    		String message
    		);

    Page<GrievanceResponseDto> getAllGrievancesByRoleWithDTO(int page, int size, Long userId, String role, Long deptId, String status);
}
