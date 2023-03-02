package com.injagang.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class MyEssay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    User user;

    @OneToMany(mappedBy = "myEssay",cascade = CascadeType.ALL)
    List<MyQuestion> questions = new ArrayList<>();

    @OneToMany(mappedBy = "myEssay",cascade = CascadeType.ALL)
    List<MyAnswer> answers = new ArrayList<>();




}
