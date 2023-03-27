package com.injagang.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class QnaRequest {

    @NotBlank(message = "질문을 입력해 주세요")
    private String question;

    @NotBlank(message = "답변을 입력해 주세요")
    private String answer;

    @Builder
    public QnaRequest(String question, String answer) {
        this.question = question;
        this.answer = answer;
    }
}
