package com.injagang.service;

import com.injagang.config.jwt.JwtConfig;
import com.injagang.config.jwt.JwtProvider;
import com.injagang.config.redis.RedisDao;
import com.injagang.domain.user.User;
import com.injagang.domain.user.UserType;
import com.injagang.exception.*;
import com.injagang.repository.EssayRepository;
import com.injagang.repository.FeedbackRepository;
import com.injagang.repository.QnARepository;
import com.injagang.repository.UserRepository;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.*;
import com.injagang.resolver.data.Tokens;
import com.injagang.response.UserInfo;
import io.micrometer.core.annotation.Counted;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final BoardRepository boardRepository;
    private final EssayRepository essayRepository;
    private final FeedbackRepository feedbackRepository;
    private final JwtConfig jwtConfig;

    private final RedisTemplate<String, String> redisTemplate;

    private final RedisDao redisDao;


    public UserInfo info(Long userId) {

        log.info("사용자 정보 조회 시도 → userId={}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("사용자 정보 조회 실패 → userId={} (사용자 없음)", userId);
                    return new UserNotFoundException();
                });

        UserInfo userInfo = UserInfo.builder()
                .nickname(user.getNickname())
                .role(user.getType().name())
                .build();

        log.info("사용자 정보 조회 성공 → userId={}, nickname={}, role={}",
                userId, userInfo.getNickname(), userInfo.getRole());
        return userInfo;


    }

    public Tokens login(Login login) {


        log.info("로그인 시도 → loginId={}", login.getLoginId());

        User user = userRepository.findUserByLoginId(login.getLoginId())
                .orElseThrow(() -> {
                    log.warn("로그인 실패(존재하지 않는 로그인 ID) → loginId={}", login.getLoginId());
                    return new InvalidLoginInfoException();
                });

        if (!passwordEncoder.matches(login.getPassword(), user.getPassword())) {
            log.warn("로그인 실패(비밀번호 불일치) → loginId={}", login.getLoginId());
            throw new InvalidLoginInfoException();
        }

        String access  = jwtProvider.createAccessToken(user.getId());
        String refresh = jwtProvider.createRefreshToken(user.getId());

        redisDao.setData(refresh, "login", jwtConfig.getRefresh() * 1000);

        log.info("로그인 성공 → userId={}", user.getId());

        return Tokens.builder()
                .userId(user.getId())
                .access(access)
                .refresh(refresh)
                .build();

    }

    public void check(String nickname, String loginId) {

        log.info("loginId ={}, nickname={} 중복 체크",loginId,nickname);

        if (userRepository.findUserByLoginId(loginId).isPresent()) {
            log.warn("login Id 중복 → loginId={}", loginId);
            throw new DuplicateLoginIdException();
        }

        if (userRepository.findUserByNickname(nickname).isPresent()) {
            log.warn("nickname 중복 → nickname={}", nickname);
            throw new DuplicateNicknameException();
        }

    }

    @Counted("signup")
    public void signUp(SignUp signUp) {

        log.info("회원가입 시도 → loginId={}, nickname={}, birthday={}",
                signUp.getLoginId(),
                signUp.getNickname(),
                signUp.getBirthday());

        check(signUp.getNickname(), signUp.getLoginId());

        User user = User.builder()
                .loginId(signUp.getLoginId())
                .password(passwordEncoder.encode(signUp.getPassword()))
                .nickname(signUp.getNickname())
                .birthday(LocalDate.parse(signUp.getBirthday()))
                .type(UserType.USER)
                .terms(signUp.getTerms())
                .policy(signUp.getPolicy())
                .build();

        userRepository.save(user);

        log.info("회원가입 성공 → userId={}, loginId={}",
                user.getId(),
                user.getLoginId());
    }


    public void logout(String access, String refresh) {

        log.info("로그아웃 시도");

        redisTemplate.delete(refresh);

        log.debug("리프레시 토큰 삭제 시도 → refresh={}", refresh);

        redisDao.setData(access, "logout", jwtConfig.getAccess() * 1000);

        log.info("로그아웃 완료 → access token 블랙리스트 등록");
    }


    public String reissue(String refresh) {
        log.info("Access token 재발급 시도");

        if (redisDao.getData(refresh) == null) {
            log.warn("재발급 실패(만료된 refresh token)");
            throw new InvalidRefreshTokenException();
        }
        if (!jwtProvider.validateToken(refresh)) {
            log.warn("재발급 실패(유효하지 않은 refresh token)");
            throw new InvalidRefreshTokenException();
        }

        String newAccess = jwtProvider.createAccessToken(jwtProvider.parseToken(refresh));
        log.info("Access token 재발급 성공");
        return newAccess;
    }

    public void changePassword(Long userId, PasswordChange passwordChange) {
        log.info("비밀번호 변경 시도 → userId={}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("비밀번호 변경 실패(사용자 없음) → userId={}", userId);
                    return new UserNotFoundException();
                });

        if (!passwordEncoder.matches(passwordChange.getNowPassword(), user.getPassword())) {
            log.warn("비밀번호 변경 실패(기존 비밀번호 불일치) → userId={}", userId);
            throw new PasswordDiffException();
        }
        if (!passwordChange.getChangePassword().equals(passwordChange.getChangePasswordCheck())) {
            log.warn("비밀번호 변경 실패(새 비밀번호 확인 불일치) → userId={}", userId);
            throw new PasswordCheckException();
        }

        user.changePassword(passwordEncoder.encode(passwordChange.getChangePassword()));
        log.info("비밀번호 변경 성공 → userId={}", userId);
    }

    public void nicknameChange(Long userId, NicknameChange nicknameChange) {
        log.info("닉네임 변경 시도 → userId={}, newNickname={}", userId, nicknameChange.getChangeNickname());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("닉네임 변경 실패(사용자 없음) → userId={}", userId);
                    return new UserNotFoundException();
                });

        if (userRepository.findUserByNickname(nicknameChange.getChangeNickname()).isPresent()) {
            log.warn("닉네임 변경 실패(중복 닉네임) → userId={}, nickname={}",
                    userId, nicknameChange.getChangeNickname());
            throw new DuplicateNicknameException();
        }

        user.changeNickname(nicknameChange.getChangeNickname());
        log.info("닉네임 변경 성공 → userId={}, newNickname={}",
                userId, nicknameChange.getChangeNickname());
    }

    public void delete(Long userId) {
        log.info("회원 탈퇴 시도 → userId={}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("회원 탈퇴 실패(사용자 없음) → userId={}", userId);
                    return new UserNotFoundException();
                });

        feedbackRepository.deleteAllByUser(user);
        boardRepository.deleteAllByUser(user);
        essayRepository.deleteAllByUser(user);
        userRepository.delete(user);

        log.info("회원 탈퇴 성공 → userId={}", userId);
    }

}
