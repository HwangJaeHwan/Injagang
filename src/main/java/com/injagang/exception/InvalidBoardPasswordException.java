package com.injagang.exception;

public class InvalidBoardPasswordException extends InJaGangException{

    private static final String MESSAGE = "게시물의 비밀번호가 올바르지 않습니다.";



    public InvalidBoardPasswordException() {
        super(MESSAGE);
    }

    public InvalidBoardPasswordException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "403";
    }

}
