package com.injagang.domain;


import com.injagang.domain.qna.QuestionAndAnswer;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Board {


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

    @OneToMany(mappedBy = "board",cascade = CascadeType.ALL)
    private List<QuestionAndAnswer> qnaList = new ArrayList<>();

}
