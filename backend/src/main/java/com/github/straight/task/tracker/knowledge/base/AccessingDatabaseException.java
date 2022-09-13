package com.github.straight.task.tracker.knowledge.base;

public class AccessingDatabaseException extends IllegalStateException {
    public AccessingDatabaseException() {
        super();
    }

    public AccessingDatabaseException(String message) {
        super(message);
    }

    public AccessingDatabaseException(String message, Throwable cause) {
        super(message, cause);
    }
}
