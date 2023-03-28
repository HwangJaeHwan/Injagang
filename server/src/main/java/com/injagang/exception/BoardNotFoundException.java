package com.injagang.exception;

public class BoardNotFoundException extends InJaGangException{

    private static final String MESSAGE = "해당 게시글을 찾을 수 없습니다.";



    public BoardNotFoundException() {
        super(MESSAGE);
    }

    public BoardNotFoundException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "404";
    }

}
