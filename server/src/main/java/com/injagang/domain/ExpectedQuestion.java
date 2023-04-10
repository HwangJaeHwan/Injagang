package com.injagang.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class ExpectedQuestion {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expected_question_id")
    private Long id;

    private String question;

    @Enumerated(value = EnumType.STRING)
    private QuestionType questionType;


    @Builder
    public ExpectedQuestion(String question, QuestionType questionType) {
        this.question = question;
        this.questionType = questionType;
    }
}
