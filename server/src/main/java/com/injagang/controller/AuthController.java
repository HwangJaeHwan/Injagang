package com.injagang.controller;

import com.injagang.config.AppConfig;
import com.injagang.config.jwt.JwtConfig;
import com.injagang.request.Login;
import com.injagang.request.SignUp;
import com.injagang.response.SessionResponse;
import com.injagang.service.AuthService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AppConfig appConfig;

    @GetMapping("/login")
    public SessionResponse login(@RequestBody Login login) {

        Long userId = authService.login(login);

        SecretKey key = Keys.hmacShaKeyFor(appConfig.getJwtKey());

        String jws = Jwts.builder()
                .setSubject(String.valueOf(userId))
                .signWith(key)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + JwtConfig.EXPIRATION_TIME))
                .compact();

        return new SessionResponse(jws);


    }

    @PostMapping("/signup")
    public void signUp(@RequestBody SignUp signUp) {

        authService.signUp(signUp);


    }

}
