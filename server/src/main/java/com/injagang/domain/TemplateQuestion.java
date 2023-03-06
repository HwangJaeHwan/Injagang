package com.injagang.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class TemplateQuestion {

    @Id
    @Column(name = "templatequestion_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;


    @ManyToOne
    @JoinColumn(name = "template_id")
    private Template template;

    @Builder
    public TemplateQuestion(String question) {
        this.question = question;
    }



    public void registerQuestion(Template template) {
        this.template = template;
    }


}
