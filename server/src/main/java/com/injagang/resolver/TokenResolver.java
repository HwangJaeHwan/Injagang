package com.injagang.resolver;

import com.injagang.resolver.data.AccessToken;
import com.injagang.resolver.data.UserSession;
import com.injagang.config.jwt.JwtProvider;
import com.injagang.exception.InjaGangJwtException;
import com.injagang.exception.JwtExpiredException;
import com.injagang.exception.UnauthorizedException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Slf4j
@RequiredArgsConstructor
public class TokenResolver implements HandlerMethodArgumentResolver {

    private final JwtProvider jwtProvider;

    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().equals(AccessToken.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {


        String authorizationHeader = webRequest.getHeader("Authorization");

        if (!StringUtils.hasText(authorizationHeader) || !authorizationHeader.startsWith("Bearer ")) {

            throw new UnauthorizedException();
        }


        String jws = authorizationHeader.substring(7);

        if (redisTemplate.opsForValue().get(jws) != null) {
            log.info("logout 됨");
            throw new UnauthorizedException();
        }

        try {

            jwtProvider.validateToken(jws);

            return new AccessToken(jws);

        } catch (ExpiredJwtException e) {

            throw new JwtExpiredException();

        } catch (JwtException e) {

            throw new InjaGangJwtException();

            //don't trust the JWT!
        }


    }


}
