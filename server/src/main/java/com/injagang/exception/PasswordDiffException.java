package com.injagang.exception;

public class PasswordDiffException extends InJaGangException{

    private static final String MESSAGE = "현재 비밀번호가 다릅니다. ";



    public PasswordDiffException() {
        super(MESSAGE);
    }

    public PasswordDiffException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "400";
    }


}
