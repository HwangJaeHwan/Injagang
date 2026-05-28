package com.injagang.oauth.user;

import lombok.Getter;

import java.util.Map;

@Getter
public class KakaoUserInfo implements OAuthUserInfo{

    private final Map<String, Object> attributes;
    private final Map<String,Object> account;
    private final Map<String, Object> profile;

    public KakaoUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
        this.account = (Map<String, Object>) attributes.get("kakao_account");
        this.profile = (Map<String, Object>) attributes.get("properties");


    }

    @Override
    public String getProviderId() {
        return String.valueOf(attributes.get("id"));
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getEmail() {
        return (String) account.get("email");
    }

    @Override
    public String getName() {
        return (String) profile.get("nickname");
    }
}
