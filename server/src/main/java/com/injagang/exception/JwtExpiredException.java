package com.injagang.exception;

import io.jsonwebtoken.JwtException;

public class JwtExpiredException extends JwtException {

    private static final String MESSAGE = "JWT가 만료되었습니다.";

    public JwtExpiredException() {
        super(MESSAGE);
    }



}
