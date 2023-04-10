package com.injagang.request;

import com.injagang.domain.QuestionType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class QuestionWrite {


    @Size(min = 1,message = "질문은 한개 이상 입력해주세요.")
    private List<String> questions = new ArrayList<>();

    @NotNull(message = "타입을 입력해주세요.")
    private QuestionType questionType;

    public void addQuestion(String question) {
        questions.add(question);
    }

    public QuestionWrite(QuestionType questionType) {
        this.questionType = questionType;
    }
}
