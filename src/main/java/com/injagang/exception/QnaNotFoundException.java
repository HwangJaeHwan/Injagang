package com.injagang.exception;

public class QnaNotFoundException extends InJaGangException{

    private static final String MESSAGE = "해당 QnA를 찾을 수 없습니다.";



    public QnaNotFoundException() {
        super(MESSAGE);
    }

    public QnaNotFoundException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "404";
    }

}
