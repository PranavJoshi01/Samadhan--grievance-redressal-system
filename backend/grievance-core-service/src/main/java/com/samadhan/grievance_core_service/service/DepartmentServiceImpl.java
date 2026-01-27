package com.samadhan.grievance_core_service.service;

import com.samadhan.grievance_core_service.entity.GrievanceCategory;
import com.samadhan.grievance_core_service.repository.GrievanceCategoryRepository;
import com.samadhan.grievance_core_service.service.DepartmentService;
import org.springframework.stereotype.Service;

public class DepartmentServiceImpl implements DepartmentService {
	
	
	private final  GrievanceCategoryRepository repository;


	public DepartmentServiceImpl(GrievanceCategoryRepository repository) {
	this.repository = repository;
	}


	@Override
	public GrievanceCategory createDepartment(GrievanceCategory department) {


	// 🔒 duplicate check
		repository.findByCategoryName(department.getCategoryName())
		.ifPresent(c -> {
		throw new RuntimeException("Category already exists");
		});


	return repository.save(department);
	}

}
