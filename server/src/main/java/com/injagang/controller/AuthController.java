package com.injagang.controller;

import com.injagang.config.data.UserSession;
import com.injagang.config.jwt.JwtConfig;
import com.injagang.config.jwt.JwtProvider;
import com.injagang.exception.RefreshTokenExpiredException;
import com.injagang.request.Login;
import com.injagang.request.PasswordChange;
import com.injagang.request.Tokens;
import com.injagang.request.SignUp;
import com.injagang.response.AccessTokenResponse;
import com.injagang.response.LoginResponse;
import com.injagang.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.concurrent.TimeUnit;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtProvider jwtProvider;

    private final JwtConfig jwtConfig;

    private final RedisTemplate<String, String> redisTemplate;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid Login login) {

        Long userId = authService.login(login);

        String accessToken = jwtProvider.createAccessToken(userId);
        String refreshToken = jwtProvider.createRefreshToken(userId);

        redisTemplate.opsForValue().set(refreshToken, accessToken, jwtConfig.getRefresh(), TimeUnit.MILLISECONDS);

        return LoginResponse.builder()
                .userId(userId)
                .access(accessToken)
                .refresh(refreshToken)
                .build();


    }

    @PostMapping("/logout")
    public void logout(@RequestBody @Valid Tokens tokens) {

        authService.logout(tokens);

    }

    @PostMapping("/reissue")
    public AccessTokenResponse refresh(@RequestBody @Valid Tokens tokens) {

        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        String access = operations.get(tokens.getRefresh());

        if (access == null) {
            throw new RefreshTokenExpiredException();
        }

        if (!jwtProvider.refreshCheck(access)) {
            log.info("Refresh 토큰 탈취");
            authService.logout(tokens);
            throw new RefreshTokenExpiredException();

        }

        String accessToken = jwtProvider.createAccessToken(jwtProvider.parseToken(tokens.getRefresh()));

        return new AccessTokenResponse(accessToken);
    }

    @PostMapping("/signup")
    public void signUp(@RequestBody @Valid SignUp signUp) {

        authService.signUp(signUp);

    }

    @PatchMapping("/passwordChange")
    public void passwordChange(UserSession userSession, @RequestBody @Valid PasswordChange passwordChange) {

        authService.changePassword(userSession.getUserId(), passwordChange);

    }

    @PatchMapping("/nicknameChange")
    public void nicknameChange(UserSession userSession, @RequestBody @Valid String changeNickname) {

        authService.nicknameChange(userSession.getUserId(), changeNickname);
    }

}
