package com.injagang.response;

import lombok.Builder;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public class ErrorResponse {

    private String code;

    private String message;

    private Map<String, String> validations = new HashMap<>();

    @Builder
    public ErrorResponse(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public void addValidation(String name, String message) {
        validations.put(name, message);
    }
}
