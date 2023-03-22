package com.injagang.helper;

import com.injagang.config.AppConfig;
import com.injagang.config.jwt.JwtConfig;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class TestHelper {

    private final AppConfig appConfig;
    private final JwtConfig jwtConfig;

    public TestHelper(AppConfig appConfig, JwtConfig jwtConfig) {
        this.appConfig = appConfig;
        this.jwtConfig = jwtConfig;
    }


    public String makeAccessToken(Long userId) {
        SecretKey key = Keys.hmacShaKeyFor(appConfig.getJwtKey());

        String jws = Jwts.builder()
                .setSubject(String.valueOf(userId))
                .signWith(key)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtConfig.getAccess()))
                .compact();

        return jws;
    }

    public String makeRefreshToken(Long userId) {
        SecretKey key = Keys.hmacShaKeyFor(appConfig.getJwtKey());

        String jws = Jwts.builder()
                .setSubject(String.valueOf(userId))
                .signWith(key)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtConfig.getRefresh()))
                .compact();

        return jws;
    }

    public String makeToken(Long userId, Long mill) {

        SecretKey key = Keys.hmacShaKeyFor(appConfig.getJwtKey());

        String jws = Jwts.builder()
                .setSubject(String.valueOf(userId))
                .signWith(key)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + mill))
                .compact();

        return jws;


    }



}
