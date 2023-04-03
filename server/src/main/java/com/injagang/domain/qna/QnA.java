package com.injagang.domain.qna;

import com.injagang.domain.Essay;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@NoArgsConstructor(access = PROTECTED)
public abstract class QnA {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qna_id")
    private Long id;

    @Lob
    private String question;
    @Lob
    private String answer;


    public QnA(String question, String answer) {
        this.question = question;
        this.answer = answer;
    }


}
