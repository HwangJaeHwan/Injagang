package com.injagang.domain;

import com.injagang.domain.base.Timestamp;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.*;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Essay extends Timestamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "essay_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    private User user;

    private String title;

    @OneToMany(mappedBy = "essay",cascade = CascadeType.ALL)
    private List<EssayQnA> qnaList = new ArrayList<>();

    @Builder
    public Essay(User user, String title) {
        this.user = user;
        this.title = title;
    }

    public void addQnA(EssayQnA qna) {
        qnaList.add(qna);
        qna.registerEssay(this);

    }

    public void reviseTitle(String title) {
        this.title = title;
    }





}
