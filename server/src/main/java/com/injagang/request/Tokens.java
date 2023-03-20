package com.injagang.request;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class Tokens {

    @NotNull
    private String access;

    @NotNull
    private String refresh;

}
