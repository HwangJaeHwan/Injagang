package com.injagang.docs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.config.redis.RedisDao;
import com.injagang.domain.user.User;
import com.injagang.helper.TestHelper;
import com.injagang.repository.*;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.Login;
import com.injagang.request.PasswordChange;
import com.injagang.request.SignUp;
import com.injagang.request.Tokens;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import javax.servlet.http.Cookie;
import java.util.Map;

import static org.junit.jupiter.api.TestInstance.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;


@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
@AutoConfigureRestDocs(uriScheme = "https",uriHost = "api.injagang.com",uriPort = 443)
@ExtendWith(RestDocumentationExtension.class)
@ActiveProfiles("test")
public class AuthControllerDocTest {

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
    @DisplayName("회원가입")
    void test() throws Exception {

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
                .andDo(document("auth-signup",
                        requestFields(fieldWithPath("loginId").description("로그인 아이디"),
                                fieldWithPath("password").description("비밀번호"),
                                fieldWithPath("passwordCheck").description("비밀번호 확인"),
                                fieldWithPath("email").description("이메일"),
                                fieldWithPath("nickname").description("닉네임")
                        )));



    }





    @Test
    @DisplayName("로그인")
    void test2() throws Exception {


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
                .andDo(document("auth-login",
                        requestFields(fieldWithPath("loginId").description("로그인 아이디"),
                                fieldWithPath("password").description("비밀번호")

                        ),
                        responseFields(
                                fieldWithPath("userId").description("로그인 유저 ID"),
                                fieldWithPath("access").description("Access 토큰")
                        )));



    }

    @Test
    @DisplayName("닉네임 변경")
    void test3() throws Exception{

        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("12345"))
                .nickname("nickname")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        Map<String, String> map = Map.of("changeNickname", "change");

        String json = objectMapper.writeValueAsString(map);

        mockMvc.perform(patch("/nicknameChange")
                        .header("Authorization", jws)
                        .contentType(APPLICATION_JSON)
                        .content(json))
                .andDo(document("auth-nicknameChange",
                        requestHeaders(
                                headerWithName("Authorization").description("로그인 인증")
                        )
                        , requestFields(
                                fieldWithPath("changeNickname").description("변경할 닉네임")
                        )
                ));



    }

    @Test
    @DisplayName("비밀번호 변경")
    void test4() throws Exception{

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
                        .header("Authorization", jws)
                        .contentType(APPLICATION_JSON)
                        .content(json))
                .andDo(document("auth-passwordChange", requestHeaders(
                                headerWithName("Authorization").description("로그인 인증")
                        ), requestFields(
                                fieldWithPath("nowPassword").description("현재 비밀번호"),
                                fieldWithPath("changePassword").description("바꿀 비밀번호"),
                                fieldWithPath("changePasswordCheck").description("비밀번호 확인")
                        )
                ));


    }

    @Test
    @DisplayName("로그아웃")
    void test5() throws Exception {


        String accessToken = testHelper.makeAccessToken(1L);
        String refreshToken = testHelper.makeRefreshToken(1L);

        Tokens tokens = new Tokens(accessToken);

        redisDao.setData(refreshToken, "login", 6000L);

        String json = objectMapper.writeValueAsString(tokens);

        mockMvc.perform(post("/logout")
                        .contentType(APPLICATION_JSON)
                        .content(json))
                .andDo(document("auth-logout",
                        requestFields(
                                fieldWithPath("access").description("Access 토큰")
                        ))
                );

    }

    @Test
    @DisplayName("토큰 재발급")
    void test6() throws Exception {

        String accessToken = testHelper.makeToken(1L, 0L);
        String refreshToken = testHelper.makeRefreshToken(1L);

        Tokens tokens = new Tokens(accessToken);

        redisDao.setData(refreshToken, "login", 6000L);

        String json = objectMapper.writeValueAsString(tokens);

        mockMvc.perform(post("/reissue")
                        .contentType(APPLICATION_JSON)
                        .content(json)
                        .cookie(new Cookie("refreshToken",refreshToken)))
                .andDo(document("auth-reissue",
                        requestFields(
                                fieldWithPath("access").description("만료된 Access 토큰")
                        ),responseFields(
                                fieldWithPath("access").description("재발급된 Access 토큰")
                        )
                ));
    }

    @Test
    @DisplayName("유저 정보")
    void test7() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("12345"))
                .nickname("nickname")
                .role("USER")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        mockMvc.perform(get("/info")
                        .header("Authorization", jws))
                .andDo(document("auth-info", requestHeaders(
                        headerWithName("Authorization").description("로그인 인증")
                ), responseFields(
                        fieldWithPath("nickname").description("유저 닉네임"),
                        fieldWithPath("role").description("권한")
                )));

    }
}
