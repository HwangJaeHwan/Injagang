package com.injagang.resolver.data;

import lombok.Getter;

@Getter
public class UserSession {

    private Long userId;

    public UserSession(Long userId) {
        this.userId = userId;
    }
}
