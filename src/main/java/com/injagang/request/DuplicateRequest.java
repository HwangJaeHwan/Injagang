package com.injagang.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class DuplicateRequest {

    @NotBlank(message = "아이디를 입력해주세요")
    @Pattern(
            regexp = "^(?!.*[\\uAC00-\\uD7A3])\\S{6,}$",
            message = "6글자 이상, 공백·한글 포함 불가"
    )
    private String loginId;

    @NotBlank(message = "닉네임을 입력해주세요")
    @Pattern(regexp = "^\\S{2,8}$",message = "2글자 이상 8글자 이하")
    private String nickname;

    public DuplicateRequest(String loginId, String nickname) {
        this.loginId = loginId;
        this.nickname = nickname;
    }
}
