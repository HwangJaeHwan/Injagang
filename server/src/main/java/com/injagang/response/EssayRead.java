package com.injagang.response;

import com.injagang.domain.Essay;
import com.injagang.domain.qna.QuestionAndAnswer;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class EssayRead {


    private Long essayId;

    private String title;

    private List<QnAInfo> qnaList = new ArrayList<>();

    public EssayRead(Essay essay, List<QuestionAndAnswer> qna) {

        this.essayId = essay.getId();
        this.title = essay.getTitle();

        for (QuestionAndAnswer questionAndAnswer : qna) {

            qnaList.add(QnAInfo.builder()
                    .qnaId(questionAndAnswer.getId())
                    .question(questionAndAnswer.getQuestion())
                    .answer(questionAndAnswer.getAnswer())
                    .build()
            );

        }







    }
}
