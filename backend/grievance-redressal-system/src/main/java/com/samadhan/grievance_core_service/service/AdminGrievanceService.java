package com.samadhan.grievance_core_service.service;

import com.samadhan.grievance_core_service.dto.AdminGrievanceListDto;
import java.util.List;

public interface AdminGrievanceService {
	List<AdminGrievanceListDto> getAllGrievances();
}
