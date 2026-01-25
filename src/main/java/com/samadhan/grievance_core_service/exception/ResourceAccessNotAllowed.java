package com.samadhan.grievance_core_service.exception;

public class ResourceAccessNotAllowed extends RuntimeException{

    public ResourceAccessNotAllowed(String message) {
        super(message);
    }
}
