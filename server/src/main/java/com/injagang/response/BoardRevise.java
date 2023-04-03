package com.injagang.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class BoardRevise {

    @NotNull
    private Long boardId;

    @NotBlank(message = "수정할 제목을 입력해주세요.")
    private String changeTitle;

    @NotBlank(message = "수정할 내용을 입력해주세요")
    private String changeContent;
    @Builder
    public BoardRevise(Long boardId, String changeTitle, String changeContent) {
        this.boardId = boardId;
        this.changeTitle = changeTitle;
        this.changeContent = changeContent;
    }
}
