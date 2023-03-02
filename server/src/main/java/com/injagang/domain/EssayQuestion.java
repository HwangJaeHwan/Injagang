package com.injagang.domain;

import javax.persistence.*;

@Entity
public class EssayQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String question;

    @ManyToOne
    @JoinColumn(name = "essay_id")
    Essay essay;

    public void setEssay(Essay essay) {
        this.essay = essay;
    }


}
