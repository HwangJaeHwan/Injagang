package com.injagang.exception;

import io.jsonwebtoken.JwtException;

public class InjaGangJwtException extends JwtException {

    private static final String MESSAGE = "JWT가 유효하지 않습니다. ";

    public InjaGangJwtException() {
        super(MESSAGE);
    }



}
