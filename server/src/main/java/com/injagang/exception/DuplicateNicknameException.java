package com.injagang.exception;

public class DuplicateNicknameException extends InJaGangException{

    private static final String MESSAGE = "중복된 닉네임입니다.";



    public DuplicateNicknameException() {
        super(MESSAGE);
    }

    public DuplicateNicknameException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "400";
    }


}
