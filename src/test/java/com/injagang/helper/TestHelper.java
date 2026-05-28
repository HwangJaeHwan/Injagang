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

    public static final String USERAGENT =
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.5790.102 Safari/537.36";
    public static final String IPADDRESS = "127.0.0.1";

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
                .setExpiration(new Date(System.currentTimeMillis() + (jwtConfig.getAccess() * 1000)))
                .compact();

        return "Bearer " + jws;
    }

    public String makeRefreshToken(Long userId) {
        SecretKey key = Keys.hmacShaKeyFor(appConfig.getJwtKey());

        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .signWith(key)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtConfig.getRefresh() * 1000))
                .compact();
    }

    public String makeToken(Long userId, Long mill) {

        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .signWith(Keys.hmacShaKeyFor(appConfig.getJwtKey()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + mill))
                .compact();


    }



}
