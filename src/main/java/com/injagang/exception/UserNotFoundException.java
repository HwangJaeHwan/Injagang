package com.injagang.exception;

public class UserNotFoundException extends InJaGangException{

    private static final String MESSAGE = "해당하는 유저를 찾을 수 없습니다.";



    public UserNotFoundException() {
        super(MESSAGE);
    }

    public UserNotFoundException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "404";
    }

}
