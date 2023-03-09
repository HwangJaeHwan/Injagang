package com.injagang.service;

import com.injagang.domain.User;
import com.injagang.exception.DuplicateLoginIdException;
import com.injagang.exception.InvalidLoginInfoException;
import com.injagang.repository.UserRepository;
import com.injagang.request.Login;
import com.injagang.request.SignUp;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.security.Key;
import java.util.Base64;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AuthServiceTest {

    @Autowired
    AuthService authService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @BeforeEach
    void clean() {
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("회원가입 테스트")
    void test() {

        SignUp signUp = SignUp.builder()
                .loginId("test")
                .password("1234")
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

}