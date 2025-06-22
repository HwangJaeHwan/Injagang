package com.injagang.response;

import com.injagang.domain.Feedback;
import com.injagang.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FeedbackList {


    private Long feedbackId;

    private String target;

    private String content;

    private boolean owner = false;


    public FeedbackList(Feedback feedback, User user) {
        this.feedbackId = feedback.getId();
        this.target = feedback.getFeedbackTarget();
        this.content = feedback.getFeedbackContent();

        if (user == feedback.getUser()) {
            this.owner = true;
        }

    }
}
