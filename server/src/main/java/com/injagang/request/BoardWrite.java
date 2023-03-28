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
public class BoardWrite {

    @NotBlank(message = "제목을 입력해 주세요")
    private String title;

    @NotBlank(message = "내용을 입력해 주세요")
    private String content;

    @NotBlank(message = "자소서 제목을 입력해 주세요")
    private String essayTitle;
    @Valid
    @Size(min = 1,message = "QnA는 최소 1개 이상 작성해주세요")
    private List<QnaRequest> qnaList = new ArrayList<>();

    @Builder
    public BoardWrite(String title, String content, String essayTitle) {
        this.title = title;
        this.content = content;
        this.essayTitle = essayTitle;
    }

    public void addQna(QnaRequest qna){

        qnaList.add(qna);

    }
}
