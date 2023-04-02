package com.injagang.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class ReviseFeedback {


    @NotNull(message = "피드백 ID는 필수입니다.")
    private Long feedbackId;

    @NotNull(message = "수정할 내용을 입력해주세요.")
    private String reviseContent;





}
