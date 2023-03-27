package com.injagang.domain.qna;

import com.injagang.domain.Essay;

import javax.persistence.DiscriminatorValue;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@DiscriminatorValue("ESSAY")
public class EssayQnA extends QuestionAndAnswer {



    @ManyToOne
    @JoinColumn(name = "essay_id")
    private Essay essay;



}
