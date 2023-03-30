package com.injagang.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FeedbackWrite {

    private String feedbackTarget;

    private String feedbackContent;

    @Builder
    public FeedbackWrite(String feedbackTarget, String feedbackContent) {
        this.feedbackTarget = feedbackTarget;
        this.feedbackContent = feedbackContent;
    }
}
