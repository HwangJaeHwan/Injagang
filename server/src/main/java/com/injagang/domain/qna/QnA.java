package com.injagang.domain.qna;

import com.injagang.domain.Essay;
import com.injagang.domain.base.SoftDelete;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@NoArgsConstructor(access = PROTECTED)
public abstract class QnA extends SoftDelete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qna_id")
    private Long id;

    @Lob
    @Column(nullable = false)
    private String question;
    @Lob
    @Column(nullable = false)
    private String answer;


    public QnA(String question, String answer) {
        this.question = question;
        this.answer = answer;
    }


}
