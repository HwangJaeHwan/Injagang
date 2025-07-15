package com.injagang.controller;

import com.injagang.resolver.data.AccessToken;
import com.injagang.resolver.data.Tokens;
import com.injagang.resolver.data.UserSession;
import com.injagang.config.jwt.JwtConfig;
import com.injagang.config.jwt.JwtProvider;
import com.injagang.config.redis.RedisDao;
import com.injagang.request.*;
import com.injagang.response.AccessTokenResponse;
import com.injagang.response.LoginResponse;
import com.injagang.response.UserInfo;
import com.injagang.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import static org.springframework.http.HttpHeaders.SET_COOKIE;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    private final JwtConfig jwtConfig;


    @GetMapping("/info")
    public UserInfo info(UserSession userSession) {

        return authService.info(userSession.getUserId());

    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid Login login, HttpServletResponse response) {

        Tokens tokens = authService.login(login);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", tokens.getRefresh())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(jwtConfig.getRefresh())
                .sameSite("None")
                .build();

        response.addHeader(SET_COOKIE, cookie.toString());

        return new LoginResponse(tokens.getUserId(), tokens.getAccess());


    }

    @PostMapping("/logout")
    public void logout(AccessToken accessToken,
                       @CookieValue(name = "refreshToken") String refreshToken,
                       HttpServletResponse response) {

        deleteCookie(response);

        authService.logout(accessToken.getAccess(),refreshToken);

    }


    @PostMapping("/reissue")
    public AccessTokenResponse refresh(
            @CookieValue(name = "refreshToken") String refreshToken) {

        return new AccessTokenResponse(authService.reissue(refreshToken));

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
    public void nicknameChange(UserSession userSession, @RequestBody @Valid NicknameChange nicknameChange) {

        authService.nicknameChange(userSession.getUserId(), nicknameChange);
    }

    @DeleteMapping("/delete")
    public void deleteUser(UserSession userSession,
                           @CookieValue(name = "refreshToken") String refreshToken,
                           HttpServletResponse response) {

        deleteCookie(response);
        authService.delete(userSession.getUserId());


    }

    private void deleteCookie(HttpServletResponse response) {
        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("None")
                .build();


        response.addHeader(SET_COOKIE, deleteCookie.toString());
    }

}
