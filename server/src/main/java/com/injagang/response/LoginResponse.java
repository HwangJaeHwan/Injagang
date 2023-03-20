package com.injagang.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginResponse {

    private Long userId;
    private String access;

    private String refresh;

    @Builder
    public LoginResponse(Long userId, String access, String refresh) {
        this.userId = userId;
        this.access = access;
        this.refresh = refresh;
    }
}
