package com.injagang.domain.like;

import com.injagang.domain.Board;
import com.injagang.domain.Feedback;
import com.injagang.domain.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("FEEDBACK")
public class FeedbackLike extends Like {

    @ManyToOne
    @JoinColumn(name = "feedback_id")
    private Feedback feedback;

    public FeedbackLike(User user, Feedback feedback) {
        super(user);
        this.feedback = feedback;
    }
}
