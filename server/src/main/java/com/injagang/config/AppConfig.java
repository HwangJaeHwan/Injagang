package com.injagang.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Base64;

@ConfigurationProperties("injagang")
public class AppConfig {

    private byte[] jwtKey;

    public byte[] getJwtKey() {
        return jwtKey;
    }

    public void setJwtKey(String jwtKey) {
        Base64.getDecoder().decode(jwtKey);
    }
}
