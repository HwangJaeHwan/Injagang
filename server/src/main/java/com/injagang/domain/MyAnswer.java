package com.injagang.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class MyAnswer {

    @Id
    Long id;

    @ManyToOne
    MyEssay myEssay;

    String question;

}
