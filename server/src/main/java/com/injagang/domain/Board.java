package com.injagang.domain;


import com.injagang.domain.base.SoftDelete;
import com.injagang.domain.base.Timestamp;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.CascadeType.*;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@SQLDelete(sql = "UPDATE board SET deleted_time = NOW() WHERE board_id = ?")
@Where(clause = "deleted_time IS NULL")
@NoArgsConstructor(access = PROTECTED)
public class Board extends SoftDelete {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String essayTitle;

    private String password;

    @OneToMany(mappedBy = "board",cascade = PERSIST)
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
