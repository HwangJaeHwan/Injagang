package com.injagang.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
public class Login {

    @NotBlank(message = "아이디를 입력해주세요")
    private String loginId;


    @NotBlank(message = "비밀번호를 입력해주세요")
    private String password;

    @Builder
    public Login(String loginId, String password) {
        this.loginId = loginId;
        this.password = password;
    }
}
