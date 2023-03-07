package com.injagang.exception;

public class DuplicateLoginIdException extends InJaGangException{

    private static final String MESSAGE = "아이디가 중복됩니다. ";



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
