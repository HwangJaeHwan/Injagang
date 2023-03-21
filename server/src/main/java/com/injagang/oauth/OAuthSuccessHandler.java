package com.injagang.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.config.jwt.JwtProvider;
import com.injagang.oauth.user.UserInfo;
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
        String token = jwtProvider.createAccessToken(userInfo.getUserId());


        response.getWriter().write(objectMapper.writeValueAsString(Map.of("jws", token)));

    }
}
