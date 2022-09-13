package com.github.straight.task.tracker.error.handle;

import com.github.straight.task.tracker.error.NotFoundException;
import com.github.straight.task.tracker.model.ErrorDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Slf4j
@ControllerAdvice
public class ExceptionHandleAdvice {
    @ResponseStatus(NOT_FOUND)
    @ResponseBody
    @ExceptionHandler(NotFoundException.class)
    public ErrorDto notFoundException(NotFoundException e) {
        log.error(e.getMessage());
        return new ErrorDto().code(NOT_FOUND.value()).message(e.getMessage());
    }
}