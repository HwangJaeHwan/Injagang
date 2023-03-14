package com.injagang.oauth;

import com.injagang.config.jwt.JwtProvider;
import com.injagang.domain.User;
import com.injagang.exception.UnauthorizedException;
import com.injagang.oauth.user.*;
import com.injagang.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;
import java.util.function.Consumer;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class OAuth2Service extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    private final JwtProvider jwtProvider;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.info("attributes = :{}",super.loadUser(userRequest).getAttributes());


        OAuthUserInfo oAuth2UserInfo;

        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            oAuth2UserInfo = new NaverUserInfo(oAuth2User.getAttribute("response"));
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        } else {
            throw new UnauthorizedException();
        }

        String provider = oAuth2UserInfo.getProvider();
        String providerId = oAuth2UserInfo.getProviderId();
        String loginId = provider + "_" + providerId;
        String password = encoder.encode(UUID.randomUUID().toString().substring(0, 10));
        String email = oAuth2UserInfo.getEmail();
        String role = "USER";
        String nickname = oAuth2UserInfo.getName();
        Optional<User> optional = userRepository.findUserByLoginId(loginId);

        if (!optional.isPresent()) {

            log.info("최초 로그인");

            User user = User.builder()
                    .loginId(loginId)
                    .password(password)
                    .nickname(nickname)
                    .email(email)
                    .role(role)
                    .provider(provider)
                    .providerId(providerId)
                    .build();

            userRepository.save(user);

            log.info("user Id = {}",user.getId());

            return new UserInfo(user.getId(), oAuth2User.getAttributes());



        }

        return new UserInfo(optional.get().getId(), oAuth2User.getAttributes());
    }

}

