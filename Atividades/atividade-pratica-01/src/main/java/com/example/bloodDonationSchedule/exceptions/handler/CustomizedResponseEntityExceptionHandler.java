package com.example.bloodDonationSchedule.exceptions.handler;

import com.example.bloodDonationSchedule.exceptions.ExceptionCustom;
import com.example.bloodDonationSchedule.exceptions.ExceptionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomizedResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ExceptionResponse> handleAllExceptions(ExceptionCustom exception, WebRequest request) {
        var exceptionResponse = new ExceptionResponse(exception.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(exceptionResponse, exception.getHttpStatus());
    }
}
