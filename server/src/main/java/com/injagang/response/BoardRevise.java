package com.injagang.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
public class BoardRevise {

    @NotBlank(message = "수정할 제목을 입력해주세요.")
    private String changeTitle;

    @NotBlank(message = "수정할 내용을 입력해주세요")
    private String changeContent;
    @Builder
    public BoardRevise(String changeTitle, String changeContent) {
        this.changeTitle = changeTitle;
        this.changeContent = changeContent;
    }
}
