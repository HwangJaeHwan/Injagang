package com.injagang.resolver.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
public class Tokens {

    private Long userId;

    private String access;

    private String refresh;
    @Builder
    public Tokens(Long userId, String access, String refresh) {
        this.userId = userId;
        this.access = access;
        this.refresh = refresh;
    }
}
