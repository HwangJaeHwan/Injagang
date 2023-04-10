package com.injagang.request;

import com.injagang.domain.QuestionType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class RandomRequest {

    @NotNull(message = "질문의 수를 입력해 주세요.")
    private Integer size;

    @NotNull(message = "타입을 입력해 주세요.")
    private QuestionType questionType;


    @Builder
    public RandomRequest(Integer size, QuestionType questionType) {
        this.size = size;
        this.questionType = questionType;
    }
}
