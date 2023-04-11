package com.injagang.response;

import com.injagang.domain.ExpectedQuestion;
import lombok.Getter;

@Getter
public class QuestionResponse {

    private Long id;
    private String questions;


    public QuestionResponse(ExpectedQuestion expectedQuestion) {
        this.id = expectedQuestion.getId();
        this.questions = expectedQuestion.getQuestion();
    }
}
