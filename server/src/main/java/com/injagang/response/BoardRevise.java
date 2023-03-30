package com.injagang.response;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class BoardRevise {

    @NotBlank(message = "수정할 제목을 입력해주세요.")
    private String changeTitle;

    @NotBlank(message = "수정할 내용을 입력해주세요")
    private String changeContent;



}
