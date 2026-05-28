package com.injagang.exception;

public class EssayNotFoundException extends InJaGangException{

    private static final String MESSAGE = "해당 자소서를 찾을 수 없습니다.";



    public EssayNotFoundException() {
        super(MESSAGE);
    }

    public EssayNotFoundException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "404";
    }

}
