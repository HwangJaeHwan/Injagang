package com.injagang.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class MyQuestion {

    @Id
    Long id;

    @ManyToOne
    MyEssay essay;

    String question;


}
