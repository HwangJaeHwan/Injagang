package com.injagang.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
public class NicknameChange {

    @NotBlank(message = "닉네임을 입력해 주세요")
    private String changeNickname;

    @Builder
    public NicknameChange(String changeNickname) {
        this.changeNickname = changeNickname;
    }
}
