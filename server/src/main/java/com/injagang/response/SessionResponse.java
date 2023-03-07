package com.injagang.response;

import lombok.Getter;

@Getter
public class SessionResponse {

    private String jws;

    public SessionResponse(String jws) {
        this.jws = jws;
    }
}
