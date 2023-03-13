package com.injagang.oauth.user;

import lombok.RequiredArgsConstructor;

import java.util.Map;


@RequiredArgsConstructor
public class GoogleUserInfo implements OAuthUserInfo {

    private final Map<String, Object> attributes;


    @Override
    public String getProviderId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getProvider() {
        return "google";
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }
}
