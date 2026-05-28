package com.injagang.response;

import com.injagang.domain.Essay;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.domain.qna.QnA;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class EssayRead {


    private Long essayId;

    private String title;

    private boolean owner = false;

    private List<QnAInfo> qnaList = new ArrayList<>();

    public EssayRead(Essay essay, Long userId, List<EssayQnA> qna) {

        this.essayId = essay.getId();
        this.title = essay.getTitle();

        if (essay.getUser().getId().equals(userId)) {
            owner = true;
        }


        for (QnA qnA : qna) {

            qnaList.add(QnAInfo.builder()
                    .qnaId(qnA.getId())
                    .question(qnA.getQuestion())
                    .answer(qnA.getAnswer())
                    .build()
            );

        }


    }
}
