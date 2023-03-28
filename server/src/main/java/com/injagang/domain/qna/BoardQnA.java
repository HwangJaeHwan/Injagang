package com.injagang.domain.qna;


import com.injagang.domain.Board;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("BOARD")
public class BoardQnA extends QnA {


    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @Builder
    public BoardQnA(String question, String answer) {
        super(question, answer);
    }

    public void registerBoard(Board board) {
        this.board = board;
    }





}
