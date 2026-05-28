package com.injagang.domain;

import com.injagang.domain.base.SoftDelete;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

import static javax.persistence.FetchType.*;
import static javax.persistence.GenerationType.*;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
@SQLDelete(sql = "UPDATE feedback SET deleted_time = NOW() WHERE feedback_id = ?")
@Where(clause = "deleted_time IS NULL")
public class Feedback extends SoftDelete {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "feedback_id")
    private Long id;

    @Column(nullable = false)
    private String feedbackTarget;

    @Lob
    @Column(nullable = false)
    private String feedbackContent;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "qna_id")
    private BoardQnA boardQnA;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @Builder
    public Feedback(String feedbackTarget, String feedbackContent, BoardQnA boardQnA, User user) {
        this.feedbackTarget = feedbackTarget;
        this.feedbackContent = feedbackContent;
        this.boardQnA = boardQnA;
        this.user = user;
    }

    public void reviseContent(String reviseContent){
        this.feedbackContent = reviseContent;
    }
}
