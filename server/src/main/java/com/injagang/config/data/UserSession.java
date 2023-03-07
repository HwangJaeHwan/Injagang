package com.injagang.config.data;

import lombok.Getter;

@Getter
public class UserSession {

    private Long userId;

    public UserSession(Long userId) {
        this.userId = userId;
    }
}
