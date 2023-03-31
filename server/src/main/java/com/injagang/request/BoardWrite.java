package com.injagang.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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

    @NotNull(message = "자소서의 ID가 없습니다.")
    private Long essayId;


    @Builder
    public BoardWrite(String title, String content, Long essayId) {
        this.title = title;
        this.content = content;
        this.essayId = essayId;
    }

}
