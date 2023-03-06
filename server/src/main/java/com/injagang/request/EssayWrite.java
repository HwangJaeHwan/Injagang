package com.injagang.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Getter
public class EssayWrite {

    @NotBlank(message = "제목을 입력해 주세요")
    private String title;

    @Valid
    private List<QnA> qnaList = new ArrayList<>();

    @Builder
    public EssayWrite(String title) {
        this.title = title;
    }

    public void addQna(QnA qna){

        qnaList.add(qna);

    }
}
