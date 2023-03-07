package com.injagang.config;

import com.injagang.config.data.UserSession;
import com.injagang.exception.UnauthorizedException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@RequiredArgsConstructor
public class AuthResolver implements HandlerMethodArgumentResolver {

    private final AppConfig appConfig;


    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().equals(UserSession.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        String jws = webRequest.getHeader("Authorization");

        if (jws == null || jws.equals("")) {
            throw new UnauthorizedException();
        }

        try {

            String userId = Jwts.parserBuilder()
                    .setSigningKey(appConfig.getJwtKey())
                    .build()
                    .parseClaimsJws(jws)
                    .getBody()
                    .getSubject();

            //OK, we can trust this JWT

            return new UserSession(Long.parseLong(userId));

        } catch (JwtException e) {

            throw new UnauthorizedException();

            //don't trust the JWT!
        }


    }


}
