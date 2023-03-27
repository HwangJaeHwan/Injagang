package com.injagang.domain.qna;

import com.injagang.domain.Essay;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@NoArgsConstructor(access = PROTECTED)
public class QuestionAndAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qna_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "essay_id")
    private Essay essay;

    private String question;

    private String answer;


    @Builder
    public QuestionAndAnswer(String question, String answer) {
        this.question = question;
        this.answer = answer;
    }

    public void registerEssay(Essay essay) {
        this.essay = essay;
    }

}
