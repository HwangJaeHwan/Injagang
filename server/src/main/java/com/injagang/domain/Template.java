package com.injagang.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.*;
import static lombok.AccessLevel.*;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Template {

    @Id
    @Column(name = "template_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;


    @Builder
    public Template(String title) {
        this.title = title;
    }



    @OneToMany(mappedBy = "template", cascade = CascadeType.ALL,fetch = EAGER)
    List<TemplateQuestion> questions = new ArrayList<>();

    public void addQuestion(TemplateQuestion question) {
        questions.add(question);
        question.registerQuestion(this);
    }


}
