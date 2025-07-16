package com.injagang.exception;

public class DuplicateLoginIdException extends InJaGangException{

    private static final String MESSAGE = "중복된 아이디입니다.";



    public DuplicateLoginIdException() {
        super(MESSAGE);
    }

    public DuplicateLoginIdException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "400";
    }


}
