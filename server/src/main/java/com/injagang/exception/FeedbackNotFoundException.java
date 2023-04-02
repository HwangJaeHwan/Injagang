package com.injagang.exception;

public class FeedbackNotFoundException extends InJaGangException{

    private static final String MESSAGE = "해당 피드백을 찾을 수 없습니다.";



    public FeedbackNotFoundException() {
        super(MESSAGE);
    }

    public FeedbackNotFoundException(Throwable cause) {
        super(MESSAGE, cause);
    }


    @Override
    public String getStatusCode() {
        return "404";
    }

}
