package com.injagang.exception;

public class TemplateNotExistException extends InJaGangException{

    private static final String MESSAGE = "템플렛이 존재하지 않습니다.";



    public TemplateNotExistException() {
        super(MESSAGE);
    }

    public TemplateNotExistException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "404";
    }

}
