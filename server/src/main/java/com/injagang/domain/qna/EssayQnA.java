package com.injagang.domain.qna;

import com.injagang.domain.Essay;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("ESSAY")
public class EssayQnA extends QnA {

    @Builder
    public EssayQnA(String question, String answer) {
        super(question, answer);
    }

    @ManyToOne
    @JoinColumn(name = "essay_id")
    private Essay essay;


    public void registerEssay(Essay essay) {
        this.essay = essay;
    }



}
