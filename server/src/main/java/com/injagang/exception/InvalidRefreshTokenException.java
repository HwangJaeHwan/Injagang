package com.injagang.exception;

public class InvalidRefreshTokenException extends InJaGangException{

    private static final String MESSAGE = "Refresh 토큰이 유효하지 않습니다.";



    public InvalidRefreshTokenException() {
        super(MESSAGE);
    }

    public InvalidRefreshTokenException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "401";
    }


}
