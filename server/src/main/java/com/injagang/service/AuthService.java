package com.injagang.service;

import com.injagang.config.jwt.JwtProvider;
import com.injagang.config.redis.RedisDao;
import com.injagang.domain.User;
import com.injagang.exception.*;
import com.injagang.repository.UserRepository;
import com.injagang.request.Login;
import com.injagang.request.PasswordChange;
import com.injagang.request.SignUp;
import com.injagang.request.Tokens;
import com.injagang.response.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    private final RedisTemplate<String, String> redisTemplate;

    private final RedisDao redisDao;


    public UserInfo info(Long userId) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        return UserInfo.builder()
                .nickname(user.getNickname())
                .role(user.getRole())
                .build();


    }

    public Long login(Login login) {


        User user = userRepository.findUserByLoginId(login.getLoginId()).orElseThrow(InvalidLoginInfoException::new);

        boolean matches = passwordEncoder.matches(login.getPassword(), user.getPassword());

        if (!matches) {
            throw new InvalidLoginInfoException();
        }

        return user.getId();

    }

    public void signUp(SignUp signUp) {

        if (userRepository.findUserByLoginId(signUp.getLoginId()).isPresent()) {
            throw new DuplicateLoginIdException();
        }

        if (userRepository.findUserByNickname(signUp.getNickname()).isPresent()) {
            throw new DuplicateNicknameException();
        }

        User user = User.builder()
                .loginId(signUp.getLoginId())
                .password(passwordEncoder.encode(signUp.getPassword()))
                .nickname(signUp.getNickname())
                .email(signUp.getEmail())
                .role("USER")
                .build();

        userRepository.save(user);

    }

    public void logout(Tokens tokens) {

        if (!jwtProvider.validateToken(tokens.getAccess())) {
            throw new InjaGangJwtException();
        }

        String check = redisDao.getData(tokens.getRefresh());


        if (check != null) {
            redisTemplate.delete(tokens.getRefresh());
            redisDao.setData(tokens.getAccess(), "logout", jwtProvider.expirationTime(tokens.getAccess()));

        }



    }

    public String reissue(Tokens tokens) {

        if (redisDao.getData(tokens.getRefresh()) == null) {
            throw new RefreshTokenExpiredException();
        }

        if (!jwtProvider.refreshCheck(tokens.getAccess())) {
            logout(tokens);
            throw new RefreshTokenExpiredException();
        }

        String accessToken = jwtProvider.createAccessToken(jwtProvider.parseToken(tokens.getRefresh()));

        return accessToken;


    }


    public void changePassword(Long userId, PasswordChange passwordChange) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        if (!passwordEncoder.matches(passwordChange.getNowPassword(), user.getPassword())) {
            throw new PasswordDiffException();
        }

        if (!passwordChange.getChangePassword().equals(passwordChange.getChangePasswordCheck())) {
            throw new PasswordCheckException();
        }

        user.changePassword(passwordEncoder.encode(passwordChange.getChangePassword()));


    }

    public void nicknameChange(Long userId, String changeNickname) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        if (userRepository.findUserByNickname(changeNickname).isPresent()) {
            throw new DuplicateNicknameException();
        }

        user.changeNickname(changeNickname);


    }


}
