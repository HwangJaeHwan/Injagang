package com.injagang.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginResponse {

    private Long userId;
    private String access;


    public LoginResponse(Long userId, String access) {
        this.userId = userId;
        this.access = access;
    }
}
