package com.samadhan.grievance_core_service.service;

import com.samadhan.grievance_core_service.entity.GrievanceCategory;

import java.util.List;

public interface GrievanceCategoryService {
   List<GrievanceCategory> getAllCategory();
   
   GrievanceCategory createCategory(GrievanceCategory category);


   GrievanceCategory updateCategory(Long categoryId, GrievanceCategory category);


   void deleteCategory(Long categoryId);
}
