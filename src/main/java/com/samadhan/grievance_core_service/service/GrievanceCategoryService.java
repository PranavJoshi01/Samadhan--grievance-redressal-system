package com.samadhan.grievance_core_service.service;

import com.samadhan.grievance_core_service.entity.GrievanceCategory;
import org.jspecify.annotations.Nullable;

import java.util.List;

public interface GrievanceCategoryService {
   List<GrievanceCategory> getAllCategory();
}
