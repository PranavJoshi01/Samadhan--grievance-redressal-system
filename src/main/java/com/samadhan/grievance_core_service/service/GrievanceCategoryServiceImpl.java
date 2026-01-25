package com.samadhan.grievance_core_service.service;

import com.samadhan.grievance_core_service.entity.GrievanceCategory;
import com.samadhan.grievance_core_service.repository.GrievanceCategoryRepository;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GrievanceCategoryServiceImpl implements GrievanceCategoryService {

    @Autowired
    private GrievanceCategoryRepository grievanceCategoryRepository;

    @Override
    public List<GrievanceCategory> getAllCategory() {
        return grievanceCategoryRepository.findAll();
    }
    
    
    @Override
    public GrievanceCategory createCategory(GrievanceCategory category) {
    return grievanceCategoryRepository.save(category);
    }
    
    @Override
    public GrievanceCategory updateCategory(
    Long categoryId,
    GrievanceCategory category
    ) {
    GrievanceCategory existingCategory =
    grievanceCategoryRepository.findById(categoryId)
    .orElseThrow(() ->
    new RuntimeException("Category not found"));


    existingCategory.setCategoryName(category.getCategoryName());
    existingCategory.setDescription(category.getDescription());


    return grievanceCategoryRepository.save(existingCategory);
    }
    
    @Override
    public void deleteCategory(Long categoryId) {
    grievanceCategoryRepository.deleteById(categoryId);
    }
}
