package com.injagang.oauth;

import com.injagang.config.jwt.JwtConfig;
import com.injagang.config.jwt.JwtProvider;
import com.injagang.oauth.user.UserInfo;
import com.injagang.resolver.data.AccessToken;
import com.injagang.resolver.data.Tokens;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.HttpHeaders.SET_COOKIE;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final JwtConfig jwtConfig;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

        UserInfo userInfo = (UserInfo) authentication.getPrincipal();

        String redirect = UriComponentsBuilder.fromUriString("https://www.relaymentor.com/")
                .build().toUriString();

        ResponseCookie oauthCookie = ResponseCookie.from("oauthToken", jwtProvider.createAccessToken(userInfo.getUserId()))
                .domain(".relaymentor.com")
                .httpOnly(false)
                .secure(true)
                .path("/")
                .maxAge(jwtConfig.getAccess())
                .sameSite("None")
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", jwtProvider.createRefreshToken(userInfo.getUserId()))
                .domain(".relaymentor.com")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(jwtConfig.getRefresh())
                .sameSite("None")
                .build();

        response.addHeader(SET_COOKIE, oauthCookie.toString());
        response.addHeader(SET_COOKIE, refreshCookie.toString());

        response.sendRedirect(redirect);

//        response.getWriter().write(json);

    }
}
