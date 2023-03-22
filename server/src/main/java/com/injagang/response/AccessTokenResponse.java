package com.injagang.response;

import lombok.Getter;

@Getter
public class AccessTokenResponse {

    private String access;

    public AccessTokenResponse(String access) {
        this.access = access;
    }
}
