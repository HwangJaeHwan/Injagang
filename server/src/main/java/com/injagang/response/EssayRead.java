package com.injagang.response;

import com.injagang.domain.Essay;
import com.injagang.domain.QuestionAndAnswer;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class EssayRead {


    private Long essayId;

    private String title;

    private List<QnAInfo> qna = new ArrayList<>();

    public EssayRead(Essay essay, List<QuestionAndAnswer> qnaList) {

        this.essayId = essay.getId();
        this.title = essay.getTitle();

        for (QuestionAndAnswer questionAndAnswer : qnaList) {

            qna.add(QnAInfo.builder()
                    .qnAId(questionAndAnswer.getId())
                    .question(questionAndAnswer.getQuestion())
                    .answer(questionAndAnswer.getAnswer())
                    .build()
            );

        }







    }
}
