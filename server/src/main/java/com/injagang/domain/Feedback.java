package com.injagang.domain;

import com.injagang.domain.qna.BoardQnA;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.*;
import static javax.persistence.GenerationType.*;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Feedback {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "feedback_id")
    private Long id;

    private String feedbackTarget;

    private String feedbackContent;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "qna_id")
    private BoardQnA boardQnA;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @Builder
    public Feedback(String feedbackTarget, String feedbackContent, BoardQnA boardQnA,User user) {
        this.feedbackTarget = feedbackTarget;
        this.feedbackContent = feedbackContent;
        this.boardQnA = boardQnA;
        this.user = user;
    }
}
