package com.example.getfluentcreole.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(ItemAlreadyExistsException.class)
    protected ResponseEntity<Object> handleItemAlreadyExistsException(ItemAlreadyExistsException ex, WebRequest request) {
        ErrorObject errorObject = new ErrorObject(
                HttpStatus.CONFLICT.value(),
                ex.getMessage(),
                new Date(),
                "DATA_ALREADY_EXISTS"
        );
        return new ResponseEntity<>(errorObject, HttpStatus.CONFLICT);
    }
}
