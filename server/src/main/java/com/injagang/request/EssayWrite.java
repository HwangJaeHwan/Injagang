package com.injagang.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class EssayWrite {

    @NotBlank(message = "제목을 입력해 주세요")
    private String title;

    @Valid
    @Size(min = 1,message = "QnA는 최소 1개 이상 작성해주세요")
    private List<QnaRequest> qnaList = new ArrayList<>();

    @Builder
    public EssayWrite(String title) {
        this.title = title;
    }

    public void addQna(QnaRequest qna){

        qnaList.add(qna);

    }
}
