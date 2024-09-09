package com.injagang.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.config.jwt.JwtConfig;
import com.injagang.config.jwt.JwtProvider;
import com.injagang.oauth.user.UserInfo;
import com.injagang.request.Tokens;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.http.HttpClient;
import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final JwtConfig jwtConfig;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

        UserInfo userInfo = (UserInfo) authentication.getPrincipal();

        Tokens tokens = new Tokens(jwtProvider.createAccessToken(userInfo.getUserId()));

        String redirect = UriComponentsBuilder.fromUriString("http://localhost:3000/auth")
                .queryParam("access", tokens.getAccess())
                .build().toUriString();

        Cookie cookie = new Cookie("refreshToken", jwtProvider.createRefreshToken(userInfo.getUserId()));

        cookie.setMaxAge(Math.toIntExact(jwtConfig.getRefresh()));
        response.addCookie(cookie);
        cookie.setHttpOnly(true);
        response.sendRedirect(redirect);

//        response.getWriter().write(json);

    }
}
