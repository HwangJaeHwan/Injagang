package com.injagang.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.config.redis.RedisDao;
import com.injagang.domain.user.User;
import com.injagang.domain.user.UserType;
import com.injagang.helper.TestHelper;
import com.injagang.repository.*;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import javax.servlet.http.Cookie;

import static org.junit.jupiter.api.TestInstance.*;
import static org.springframework.http.MediaType.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
@SpringBootTest
@ActiveProfiles("test")
class AuthControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TestHelper testHelper;

    @Autowired
    QnARepository qnARepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    EssayRepository essayRepository;

    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    RedisDao redisDao;


    @AfterAll
    void after() {
        userRepository.deleteAll();
        redisDao.clear();
    }

    @BeforeEach
    void clean() {

        userRepository.deleteAll();
        redisDao.clear();
    }


    @Test
    @DisplayName("/login 로그인하기")
    void test() throws Exception {


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

        String json = objectMapper.writeValueAsString(login);

        mockMvc.perform(post("/login")
                        .contentType(APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value(user.getId()))
                .andExpect(jsonPath("$.access").isNotEmpty())
                .andExpect(cookie().exists("refreshToken"))
                .andDo(print());


    }


    @Test
    @DisplayName("/signup 회원가입하기")
    void test2() throws Exception {

        SignUp signUp = SignUp.builder()
                .loginId("test")
                .password("1234")
                .passwordCheck("1234")
                .email("test@gmail.com")
                .nickname("nickname")
                .build();

        String json = objectMapper.writeValueAsString(signUp);

        mockMvc.perform(post("/signup")
                        .contentType(APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andDo(print());


    }

    @Test
    @DisplayName("/nicknameChange 닉네임 변경")
    void test3() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("12345"))
                .nickname("nickname")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());


        NicknameChange changeNickname = NicknameChange.builder()
                .changeNickname("changeNickname")
                .build();

        String json = objectMapper.writeValueAsString(changeNickname);


        mockMvc.perform(patch("/nicknameChange")
                        .contentType(APPLICATION_JSON)
                        .header("Authorization", jws)
                        .content(json))
                .andExpect(status().isOk())
                .andDo(print());

    }

    @Test
    @DisplayName("/passwordChange 비밀번호 변경")
    void test4() throws Exception {


        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("12345"))
                .nickname("nickname")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        PasswordChange passwordChange = PasswordChange.builder()
                .nowPassword("12345")
                .changePassword("change")
                .changePasswordCheck("change")
                .build();

        String json = objectMapper.writeValueAsString(passwordChange);

        mockMvc.perform(patch("/passwordChange")
                        .contentType(APPLICATION_JSON)
                        .header("Authorization", jws)
                        .content(json))
                .andExpect(status().isOk())
                .andDo(print());


    }

    @Test
    @DisplayName("/logout 로그아웃")
    void test5() throws Exception {

        String accessToken = testHelper.makeAccessToken(1L);
        String refreshToken = testHelper.makeRefreshToken(1L);

        accessToken = accessToken.substring(7);

        Tokens tokens = new Tokens(accessToken);

        redisDao.setData(refreshToken, "login", 6000L);

        String json = objectMapper.writeValueAsString(tokens);
        Cookie cookie = new Cookie("refreshToken", refreshToken);

        mockMvc.perform(post("/logout")
                        .contentType(APPLICATION_JSON)
                        .content(json)
                        .cookie(cookie))
                .andExpect(status().isOk())
                .andDo(print());


    }

    @Test
    @DisplayName("/reissue 토큰 재발급")
    void test6() throws Exception {


        String accessToken = testHelper.makeToken(1L, 0L);
        String refreshToken = testHelper.makeRefreshToken(1L);

        Tokens tokens = new Tokens(accessToken);

        redisDao.setData(refreshToken, "login", 6000L);

        String json = objectMapper.writeValueAsString(tokens);
        Cookie cookie = new Cookie("refreshToken", refreshToken);

        mockMvc.perform(post("/reissue")
                        .contentType(APPLICATION_JSON)
                        .content(json)
                        .cookie(cookie))
                .andExpect(status().isOk())
                .andDo(print());



    }

    @Test
    @DisplayName("/info 유저 정보")
    void test7() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("12345"))
                .nickname("nickname")
                .type(UserType.USER)
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        mockMvc.perform(get("/info")
                        .header("Authorization", jws))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nickname").value("nickname"))
                .andExpect(jsonPath("$.role").value("USER"));

    }





}