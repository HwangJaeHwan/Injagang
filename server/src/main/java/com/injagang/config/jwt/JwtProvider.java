package com.injagang.config.jwt;

import com.injagang.config.AppConfig;
import com.injagang.exception.InjaGangJwtException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtProvider {

    private final AppConfig appConfig;
    private final JwtConfig jwtConfig;

    public String createAccessToken(Long userId) {

        return getToken(userId, jwtConfig.getAccess());

    }

    public String createRefreshToken(Long userId) {

        return getToken(userId, jwtConfig.getRefresh());

    }



    private String getToken(Long userId, Long timeout) {

        SecretKey key = Keys.hmacShaKeyFor(appConfig.getJwtKey());

        String token = Jwts.builder()
                .setSubject(String.valueOf(userId))
                .signWith(key)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + timeout))
                .compact();

        return token;
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

    public boolean refreshCheck(String token) {

        try {
            Jwts.parserBuilder()
                    .setSigningKey(appConfig.getJwtKey())
                    .build()
                    .parseClaimsJws(token);
        } catch (ExpiredJwtException e) {
            return true;
        } catch (JwtException e) {
            throw new InjaGangJwtException();
        }

        return false;

    }

    public boolean validateToken(String token) {
        try {

            Jwts.parserBuilder()
                    .setSigningKey(appConfig.getJwtKey())
                    .build()
                    .parseClaimsJws(token);

        } catch (JwtException e) {
            return false;
        }

        return true;

    }

    public Long expirationTime(String token) {

        long expiration = Jwts.parserBuilder().setSigningKey(appConfig.getJwtKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration().getTime();

        long now = new Date().getTime();

        return expiration - now;


    }


}