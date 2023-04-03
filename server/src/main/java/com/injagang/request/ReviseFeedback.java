package com.injagang.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class ReviseFeedback {


    @NotNull
    private Long feedbackId;
    @NotBlank(message = "수정할 내용을 입력해주세요.")
    private String reviseContent;

    @Builder
    public ReviseFeedback(Long feedbackId, String reviseContent) {
        this.feedbackId = feedbackId;
        this.reviseContent = reviseContent;
    }
}
