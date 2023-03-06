package com.injagang.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
public class TemplateCreate {

    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    @Size(min = 1,message = "질문은 최소 1개 이상 입력해야 합니다.")
    List<String> questions = new ArrayList<>();

    @Builder
    public TemplateCreate(String title) {
        this.title = title;
    }

    public void addQuestions(String s) {
        questions.add(s);
    }
}
