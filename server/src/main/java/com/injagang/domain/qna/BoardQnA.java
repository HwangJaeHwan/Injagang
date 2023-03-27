package com.injagang.domain.qna;


import com.injagang.domain.Board;

import javax.persistence.DiscriminatorValue;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@DiscriminatorValue("BOARD")
public class BoardQnA extends QuestionAndAnswer {


    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;



}
