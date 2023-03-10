package com.injagang.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class QnAInfo {


    private Long QnaId;

    private String question;

    private String answer;


    @Builder
    public QnAInfo(Long qnaId, String question, String answer) {
        QnaId = qnaId;
        this.question = question;
        this.answer = answer;
    }
}
