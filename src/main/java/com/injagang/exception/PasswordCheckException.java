package com.injagang.exception;

public class PasswordCheckException extends InJaGangException{

    private static final String MESSAGE = "비밀번호와 비빌번호 확인이 다릅니다. ";



    public PasswordCheckException() {
        super(MESSAGE);
    }

    public PasswordCheckException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "400";
    }


}
