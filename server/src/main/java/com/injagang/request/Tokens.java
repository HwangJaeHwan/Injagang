package com.injagang.request;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@Builder
public class Tokens {

    @NotNull
    private String access;

    @NotNull
    private String refresh;

}
