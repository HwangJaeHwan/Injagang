package com.injagang.exception;

public class InvalidLoginInfoException extends InJaGangException{

    private static final String MESSAGE = "아이디나 비밀번호가 올바르지 않습니다.";



    public InvalidLoginInfoException() {
        super(MESSAGE);
    }

    public InvalidLoginInfoException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "400";
    }

}
