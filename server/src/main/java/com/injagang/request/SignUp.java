package com.injagang.request;

import lombok.Builder;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@Builder
public class SignUp {

    @NotBlank(message = "아이디를 입력해주세요")
    @Pattern(
            regexp = "^(?!.*[\\uAC00-\\uD7A3])\\S{6,}$",
            message = "6글자 이상, 공백·한글 포함 불가"
    )
    private String loginId;

    @NotBlank(message = "비밀번호를 입력해주세요")
    private String password;

    @NotBlank(message = "비밀번호 확인을 입력해주세요")
    private String passwordCheck;

    @NotBlank(message = "닉네임을 입력해주세요")
    @Pattern(regexp = "^\\S{2,8}$",message = "2글자 이상 8글자 이하")
    private String nickname;

    @NotBlank(message = "생년월일을 입력해주세요")
    @Pattern(regexp="^\\d{4}-\\d{2}-\\d{2}$", message="생년월일 형식은 YYYY-MM-DD 입니다")
    private String birthday;

    @NotNull
    private Boolean terms;

    @NotNull
    private Boolean policy;


}
