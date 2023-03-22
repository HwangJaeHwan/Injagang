package com.injagang.controller;

import com.injagang.config.data.UserSession;
import com.injagang.config.jwt.JwtConfig;
import com.injagang.config.jwt.JwtProvider;
import com.injagang.config.redis.RedisDao;
import com.injagang.exception.RefreshTokenExpiredException;
import com.injagang.request.Login;
import com.injagang.request.PasswordChange;
import com.injagang.request.Tokens;
import com.injagang.request.SignUp;
import com.injagang.response.AccessTokenResponse;
import com.injagang.response.LoginResponse;
import com.injagang.response.UserInfo;
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

    private final RedisDao redisDao;


    @GetMapping("/info")
    public UserInfo info(UserSession userSession) {

        return authService.info(userSession.getUserId());

    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid Login login) {

        Long userId = authService.login(login);

        String accessToken = jwtProvider.createAccessToken(userId);
        String refreshToken = jwtProvider.createRefreshToken(userId);

        redisDao.setData(refreshToken, "login", jwtConfig.getRefresh());

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

        return new AccessTokenResponse(authService.reissue(tokens));

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
