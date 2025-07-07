package com.injagang.resolver;

import com.injagang.annotation.OptionalSession;
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

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RequiredArgsConstructor
public class AuthResolver implements HandlerMethodArgumentResolver {

    private final JwtProvider jwtProvider;

    private final RedisTemplate<String, String> redisTemplate;
    private static final AntPathMatcher matcher = new AntPathMatcher();

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().equals(UserSession.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

        boolean optional = parameter.hasParameterAnnotation(OptionalSession.class);


        if (optional){

            HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);

            String path = request.getRequestURI();
            String type = request.getParameter("type");
            boolean isBoardRead = matcher.match("/board/{boardId}", path);
            log.info("path = {}", path);

            if (isBoardRead && "notice".equals(type)) {
                return null;
            }


        }

        String authorizationHeader = webRequest.getHeader("Authorization");


        if (!StringUtils.hasText(authorizationHeader) || !authorizationHeader.startsWith("Bearer ")) {

            if (optional) {
                return null;
            }

            throw new UnauthorizedException();
        }

        String jws = authorizationHeader.substring(7);

        if (redisTemplate.opsForValue().get(jws) != null) {
            log.info("logout 됨");
            throw new UnauthorizedException();
        }

        try {

            Long userId = jwtProvider.parseToken(jws);

            //OK, we can trust this JWT

            return new UserSession(userId);

        } catch (ExpiredJwtException e) {

            throw new JwtExpiredException();

        } catch (JwtException e) {

            throw new InjaGangJwtException();

            //don't trust the JWT!
        }


    }


}
