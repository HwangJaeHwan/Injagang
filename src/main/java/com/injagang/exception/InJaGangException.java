package com.injagang.exception;

public abstract class InJaGangException extends RuntimeException {


    public InJaGangException(String message) {
        super(message);
    }

    public InJaGangException(String message, Throwable cause) {
        super(message, cause);
    }

    public abstract String getStatusCode();



}
