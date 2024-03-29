package com.injagang.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.config.jwt.JwtProvider;
import com.injagang.oauth.user.UserInfo;
import com.injagang.request.Tokens;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        UserInfo userInfo = (UserInfo) authentication.getPrincipal();

        Tokens tokens = Tokens.builder()
                .access(jwtProvider.createAccessToken(userInfo.getUserId()))
                .refresh(jwtProvider.createRefreshToken(userInfo.getUserId()))
                .build();

        String json = objectMapper.writeValueAsString(tokens);


        response.getWriter().write(json);

    }
}
