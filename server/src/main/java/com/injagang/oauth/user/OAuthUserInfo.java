package com.injagang.oauth.user;

public interface OAuthUserInfo {

    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();
}
