package com.samadhan.grievance_core_service.exception;



/**
 * Custom exception used when a requested resource is not found.
 * Example: Category not found, Grievance not found
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }
}
