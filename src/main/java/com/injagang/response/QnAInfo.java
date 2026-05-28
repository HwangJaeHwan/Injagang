package com.injagang.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class QnAInfo {


    private Long qnaId;

    private String question;

    private String answer;


    @Builder
    public QnAInfo(Long qnaId, String question, String answer) {
        this.qnaId = qnaId;
        this.question = question;
        this.answer = answer;
    }
}
