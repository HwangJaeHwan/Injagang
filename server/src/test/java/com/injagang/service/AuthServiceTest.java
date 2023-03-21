package com.injagang.service;

import com.injagang.domain.User;
import com.injagang.exception.*;
import com.injagang.repository.EssayRepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.Login;
import com.injagang.request.PasswordChange;
import com.injagang.request.SignUp;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.Key;
import java.util.Base64;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AuthServiceTest {

    @Autowired
    AuthService authService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EssayRepository essayRepository;

    @Autowired
    PasswordEncoder passwordEncoder;


    @BeforeEach
    void clean() {
        essayRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("회원가입 테스트")
    void test() {

        SignUp signUp = SignUp.builder()
                .loginId("test")
                .password("1234")
                .passwordCheck("1234")
                .email("test@gmail.com")
                .nickname("nickname")
                .build();

        authService.signUp(signUp);

        User user = userRepository.findAll().get(0);
        assertEquals(1, userRepository.count());
        assertEquals("test", user.getLoginId());
        assertEquals("test@gmail.com", user.getEmail());
        assertEquals("nickname", user.getNickname());
        assertTrue(passwordEncoder.matches("1234", user.getPassword()));

    }

    @Test
    @DisplayName("회원가입 아이디 중복")
    void testValid() {


        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        String tmp = Base64.getEncoder().encodeToString(key.getEncoded());

        System.out.println(tmp);

        User user = User.builder()
                .loginId("test")
                .password("1234")
                .nickname("nickname")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);


        SignUp signUp = SignUp.builder()
                .loginId("test")
                .password("1234")
                .passwordCheck("1234")
                .email("test@gmail.com")
                .nickname("nickname")
                .build();

        assertThrows(DuplicateLoginIdException.class, () -> authService.signUp(signUp));


    }


    @Test
    @DisplayName("로그인 테스트")
    void test2() {

        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("1234"))
                .nickname("nickname")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        Login login = Login.builder()
                .loginId("test")
                .password("1234")
                .build();


        Long userId = authService.login(login);

        assertEquals(userId, user.getId());


    }

    @Test
    @DisplayName("로그인 실패 테스트")
    void test3() {

        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("12345"))
                .nickname("nickname")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        Login login = Login.builder()
                .loginId("test")
                .password("1234")
                .build();


        assertThrows(InvalidLoginInfoException.class, () -> authService.login(login));


    }

    @Test
    @DisplayName("닉네임 변경")
    void test4() {

        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("12345"))
                .nickname("nickname")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        authService.nicknameChange(user.getId(), "changeNickname");
        User findUser = userRepository.findById(user.getId()).get();

        assertEquals("changeNickname", findUser.getNickname());


    }

    @Test
    @DisplayName("닉네임 중복")
    void testValid2() {

        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("12345"))
                .nickname("nickname")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        User user2 = User.builder()
                .loginId("test1")
                .password(passwordEncoder.encode("12345"))
                .nickname("test")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);
        userRepository.save(user2);


        assertThrows(DuplicateNicknameException.class, () -> authService.nicknameChange(user.getId(), "test"));


    }

    @Test
    @DisplayName("비밀번호 변경")
    void test5() {

        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("12345"))
                .nickname("nickname")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);
        PasswordChange passwordChange = PasswordChange.builder()
                .nowPassword("12345")
                .changePassword("change")
                .changePasswordCheck("change")
                .build();

        authService.changePassword(user.getId(), passwordChange);
        User findUser = userRepository.findById(user.getId()).get();

        assertTrue(passwordEncoder.matches("change", findUser.getPassword()));

    }

    @Test
    @DisplayName("비밀번호 변경 시 현 비밀번호 틀림")
    void testValid3() {

        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("12345"))
                .nickname("nickname")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);
        PasswordChange passwordChange = PasswordChange.builder()
                .nowPassword("test")
                .changePassword("change")
                .changePasswordCheck("change")
                .build();

        assertThrows(PasswordDiffException.class, () -> authService.changePassword(user.getId(), passwordChange));


    }

    @Test
    @DisplayName("비밀번호 변경 시 바꾼 비밀번호와 비밀번호 확인이 다름")
    void testValid4() {

        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("12345"))
                .nickname("nickname")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        PasswordChange passwordChange = PasswordChange.builder()
                .nowPassword("12345")
                .changePassword("change")
                .changePasswordCheck("diff")
                .build();

        assertThrows(PasswordCheckException.class, () -> authService.changePassword(user.getId(), passwordChange));


    }
}