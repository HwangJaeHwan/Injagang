package com.injagang.config.jwt;

import com.injagang.config.AppConfig;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final AppConfig appConfig;
    private final JwtConfig jwtConfig;

    public String createToken(Long userId) {

        SecretKey key = Keys.hmacShaKeyFor(appConfig.getJwtKey());

        long now = new Date().getTime();

        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .signWith(key)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtConfig.access))
                .compact();

    }

    public Long parseToken(String token) {
        String subject = Jwts.parserBuilder()
                .setSigningKey(appConfig.getJwtKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        return Long.parseLong(subject);
    }




}
