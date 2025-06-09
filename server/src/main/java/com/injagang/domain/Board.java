package com.injagang.domain;


import com.injagang.domain.base.Timestamp;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.qna.QnA;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = PROTECTED)
public class Board extends Timestamp {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;

    private String title;

    @Lob
    private String content;

    @ManyToOne
    private User user;


    private String essayTitle;

    private String password;

    @OneToMany(mappedBy = "board",cascade = CascadeType.PERSIST)
    private List<BoardQnA> qnaList = new ArrayList<>();



    @Builder
    public Board(String title, String content, User user, String essayTitle,String password) {
        this.title = title;
        this.content = content;
        this.user = user;
        this.essayTitle = essayTitle;
        this.password = password;
    }


    public void addQnA(BoardQnA qnA) {
        qnaList.add(qnA);
        qnA.registerBoard(this);
    }

    public void reviseTitle(String changeTitle) {

        this.title = changeTitle;
    }

    public void reviseContent(String changeContent) {

        this.content = changeContent;
    }

}
