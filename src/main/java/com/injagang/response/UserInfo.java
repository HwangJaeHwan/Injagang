package com.injagang.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserInfo {


    private String nickname;

    private String role;


}
