package com.injagang.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class FeedbackWrite {


    @NotNull
    private Long qnaId;
    @NotBlank(message = "피드백할 타겟을 입력해주세요.")
    private String feedbackTarget;
    @NotBlank(message = "피드백 내용을 입력해주세요.")
    private String feedbackContent;
    @Builder
    public FeedbackWrite(Long qnaId, String feedbackTarget, String feedbackContent) {
        this.qnaId = qnaId;
        this.feedbackTarget = feedbackTarget;
        this.feedbackContent = feedbackContent;
    }
}
