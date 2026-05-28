package com.injagang.exception;

public class RefreshTokenExpiredException extends InJaGangException{

    private static final String MESSAGE = "Refresh 토큰이 만료되었습니다.";



    public RefreshTokenExpiredException() {
        super(MESSAGE);
    }

    public RefreshTokenExpiredException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "401";
    }


}
