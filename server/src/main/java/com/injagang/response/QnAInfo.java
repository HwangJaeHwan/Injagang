package com.injagang.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class QnAInfo {


    private Long QnAId;

    private String question;

    private String answer;


    @Builder
    public QnAInfo(Long qnAId, String question, String answer) {
        QnAId = qnAId;
        this.question = question;
        this.answer = answer;
    }
}
