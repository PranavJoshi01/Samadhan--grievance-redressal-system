package com.samadhan.grievance_core_service.controller;


import com.samadhan.grievance_core_service.entity.GrievanceCategory;
import com.samadhan.grievance_core_service.service.DepartmentService;
import com.samadhan.grievance_core_service.service.GrievanceCategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "*")
public class GrievanceCategoryController {

    private static final Logger logger =
            LoggerFactory.getLogger(GrievanceController.class);

    @Autowired
    private GrievanceCategoryService grievanceCategoryService;

    @GetMapping
    public ResponseEntity<List<GrievanceCategory>> getAllCategory(){
        return ResponseEntity.ok(grievanceCategoryService.getAllCategory());
    }
    
    
    @PostMapping
    public ResponseEntity<GrievanceCategory> createCategory(
    @RequestBody GrievanceCategory category
    ) {
    return ResponseEntity.ok(grievanceCategoryService.createCategory(category));
    }
    
    
    @PutMapping("/{id}")
    public ResponseEntity<GrievanceCategory> updateCategory(
    @PathVariable Long id,
    @RequestBody GrievanceCategory category
    ) {
    return ResponseEntity.ok(
    grievanceCategoryService.updateCategory(id, category)
    );
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
    grievanceCategoryService.deleteCategory(id);
    return ResponseEntity.noContent().build();
    }
    
    
    
    
    @PostMapping("/add-department")
    public ResponseEntity<GrievanceCategory> addDepartment(
            @RequestBody GrievanceCategory department
    ) {
        GrievanceCategory saved =
                grievanceCategoryService.createCategory(department);

        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
    
    
}
