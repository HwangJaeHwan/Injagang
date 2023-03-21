package com.injagang.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class PasswordChange {

    @NotBlank(message = "현재 비밀번호를 입력해주세요.")
    private String nowPassword;

    @NotBlank(message = "바꿀 비밀번호를 입력해주세요.")
    private String changePassword;

    @NotBlank(message = "비빌번호 체크를 입력해주세요.")
    private String changePasswordCheck;


}
