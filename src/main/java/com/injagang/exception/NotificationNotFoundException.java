package com.injagang.exception;

public class NotificationNotFoundException extends InJaGangException{

    private static final String MESSAGE = "해당 알림을 찾을 수 없습니다.";



    public NotificationNotFoundException() {
        super(MESSAGE);
    }

    public NotificationNotFoundException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "404";
    }

}
