package com.injagang.response;

import com.injagang.domain.Essay;
import com.injagang.domain.qna.QnA;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter
public class EssayList {


    private Long essayId;

    private String title;

    private List<String> questions = new ArrayList<>();

    public EssayList(Essay essay) {
        this.essayId = essay.getId();
        this.title = essay.getTitle();

        for (QnA qna : essay.getQnaList()) {
            questions.add(qna.getQuestion());
        }
    }
}
