package com.github.straight.task.tracker.error;

public class NotFoundException extends IllegalArgumentException {
    public NotFoundException(Class<?> resource) {
        super(String.format("%s not found", resource.getSimpleName()));
    }
}
