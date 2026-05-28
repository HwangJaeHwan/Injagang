package com.injagang.resolver.data;

import lombok.Getter;

@Getter
public class AccessToken {

    private String access;

    public AccessToken(String access) {
        this.access = access;
    }
}
