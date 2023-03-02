package com.injagang.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Essay {

    @Id
    @Column(name = "essay_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String title;

    @OneToMany(mappedBy = "essay", cascade = CascadeType.ALL)
    List<EssayQuestion> questions = new ArrayList<>();

    public void addQuestion(EssayQuestion question) {
        questions.add(question);
        question.setEssay(this);
    }


}
