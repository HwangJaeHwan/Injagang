package com.injagang.docs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.config.redis.RedisDao;
import com.injagang.domain.Board;
import com.injagang.domain.Essay;
import com.injagang.domain.Feedback;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.domain.user.User;
import com.injagang.domain.user.UserType;
import com.injagang.helper.TestHelper;
import com.injagang.repository.*;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.Login;
import com.injagang.request.PasswordChange;
import com.injagang.request.SignUp;
import com.injagang.resolver.data.AccessToken;
import com.injagang.resolver.data.Tokens;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;


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


        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("12345"))
                .nickname("nickname")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());
        String refreshToken = testHelper.makeRefreshToken(user.getId());

        redisDao.setData(refreshToken, "login", 6000L);

        mockMvc.perform(post("/logout")
                        .header("Authorization", jws))
                .andDo(document("auth-logout",
                        requestHeaders(
                                headerWithName("Authorization").description("로그인 인증")
                        ))
                );

    }

    @Test
    @DisplayName("토큰 재발급")
    void test6() throws Exception {


        String refreshToken = testHelper.makeRefreshToken(1L);

        redisDao.setData(refreshToken, "login", 6000L);


        mockMvc.perform(post("/reissue")
                        .cookie(new Cookie("refreshToken",refreshToken)))
                .andDo(document("auth-reissue"
                        ,responseFields(
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
                .type(UserType.USER)
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

    @Test
    @DisplayName("유저 삭제")
    void test8() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("12345"))
                .nickname("nickname")
                .type(UserType.USER)
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        Essay essay = Essay.builder()
                .title("test essay")
                .user(user)
                .build();


        EssayQnA qna1 = EssayQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        essay.addQnA(qna1);

        EssayQnA qna2 = EssayQnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        essay.addQnA(qna2);

        EssayQnA qna3 = EssayQnA.builder()
                .question("question3")
                .answer("answer3")
                .build();

        essay.addQnA(qna3);

        essayRepository.save(essay);


        Board board = Board.builder()
                .title("test board")
                .content("test content")
                .essayTitle("test essay")
                .user(user)
                .build();

        BoardQnA bQna1 = BoardQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        BoardQnA bQna2 = BoardQnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        BoardQnA bQna3 = BoardQnA.builder()
                .question("question3")
                .answer("answer3")
                .build();

        board.addQnA(bQna1);
        board.addQnA(bQna2);
        board.addQnA(bQna3);

        boardRepository.save(board);

        Feedback feedback = Feedback.builder()
                .user(user)
                .boardQnA(bQna1)
                .feedbackTarget("target")
                .feedbackContent("content")
                .build();

        feedbackRepository.save(feedback);

        String jws = testHelper.makeAccessToken(user.getId());
        String refreshToken = testHelper.makeRefreshToken(user.getId());

        redisDao.setData(refreshToken, "login", 6000L);

        Cookie cookie = new Cookie("refreshToken", refreshToken);

        mockMvc.perform(delete("/delete")
                        .header("Authorization", jws)
                        .cookie(cookie))
                .andDo(document("auth-delete", requestHeaders(
                        headerWithName("Authorization").description("로그인 인증")
                )));
    }

}
