package com.injagang.exception;

public class DuplicateNicknameException extends InJaGangException{

    private static final String MESSAGE = "닉네임이 중복됩니다. ";



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
