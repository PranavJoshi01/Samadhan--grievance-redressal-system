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
}
