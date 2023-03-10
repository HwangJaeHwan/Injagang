package com.injagang.controller;

import com.injagang.config.jwt.JwtProvider;
import com.injagang.request.Login;
import com.injagang.request.SignUp;
import com.injagang.response.SessionResponse;
import com.injagang.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtProvider jwtProvider;

    @PostMapping("/login")
    public SessionResponse login(@RequestBody Login login) {

        Long userId = authService.login(login);

        return new SessionResponse(jwtProvider.createToken(userId));


    }

    @PostMapping("/signup")
    public void signUp(@RequestBody SignUp signUp) {

        authService.signUp(signUp);


    }

}
