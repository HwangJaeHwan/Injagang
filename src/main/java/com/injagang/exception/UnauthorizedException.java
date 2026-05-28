package com.injagang.exception;

public class UnauthorizedException extends InJaGangException{

    private static final String MESSAGE = "권한이 없습니다. ";



    public UnauthorizedException() {
        super(MESSAGE);
    }

    public UnauthorizedException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "401";
    }

}
