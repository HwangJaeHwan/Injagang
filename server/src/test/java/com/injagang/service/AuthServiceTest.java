package com.injagang.service;

import com.injagang.config.jwt.JwtProvider;
import com.injagang.config.redis.RedisDao;
import com.injagang.domain.Board;
import com.injagang.domain.Essay;
import com.injagang.domain.Feedback;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.domain.user.User;
import com.injagang.domain.user.UserType;
import com.injagang.exception.*;
import com.injagang.helper.TestHelper;
import com.injagang.repository.*;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.*;
import com.injagang.resolver.data.AccessToken;
import com.injagang.resolver.data.Tokens;
import com.injagang.response.UserInfo;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.TestInstance.*;

@SpringBootTest
@ActiveProfiles("test")
@TestInstance(Lifecycle.PER_CLASS)
class AuthServiceTest {

    @Autowired
    AuthService authService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EssayRepository essayRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    TestHelper testHelper;

    @Autowired
    RedisDao redisDao;

    @Autowired
    RedisTemplate<String, String> redisTemplate;

    @Autowired
    QnARepository qnARepository;

    @Autowired
    BoardRepository boardRepository;


    @Autowired
    FeedbackRepository feedbackRepository;


    @AfterAll
    void after() {
        feedbackRepository.deleteAll();
        essayRepository.deleteAll();
        boardRepository.deleteAll();
        userRepository.deleteAll();
        redisDao.clear();
    }


    @BeforeEach
    void clean() {
        feedbackRepository.deleteAll();
        essayRepository.deleteAll();
        boardRepository.deleteAll();
        userRepository.deleteAll();
        redisDao.clear();
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


        Tokens tokens = authService.login(login);

        assertEquals(tokens.getUserId(), user.getId());


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

        NicknameChange changeNickname = NicknameChange.builder()
                .changeNickname("changeNickname")
                .build();



        authService.nicknameChange(user.getId(), changeNickname);
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

        NicknameChange changeNickname = NicknameChange.builder()
                .changeNickname("test")
                .build();


        assertThrows(DuplicateNicknameException.class, () -> authService.nicknameChange(user.getId(), changeNickname));


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

    @Test
    @DisplayName("로그아웃")
    void test6() {

        String accessToken = testHelper.makeAccessToken(1L);
        String refreshToken = testHelper.makeRefreshToken(1L);

        accessToken = accessToken.substring(7);

        AccessToken access = new AccessToken(accessToken);

        redisDao.setData(refreshToken, "login", 6000L);


        authService.logout(access.getAccess(), refreshToken);


        assertNull(redisDao.getData(refreshToken));
        assertEquals("logout", redisDao.getData(accessToken));


    }

    @Test
    @DisplayName("토큰 재발급")
    void test7() {


        String accessToken = testHelper.makeToken(1L, 0L);
        String refreshToken = testHelper.makeRefreshToken(1L);


        AccessToken access = new AccessToken(accessToken);

        redisDao.setData(refreshToken, "login", 6000L);

        String reissue = authService.reissue(refreshToken);

        assertEquals(1L, jwtProvider.parseToken(reissue));


    }


    @Test
    @DisplayName("토큰 재발급시 Refresh 토큰 만료")
    void testValid5() {


        String accessToken = testHelper.makeToken(1L, 0L);
        String refreshToken = testHelper.makeRefreshToken(1L);


        assertThrows(RefreshTokenExpiredException.class, () -> authService.reissue(refreshToken));

    }


    @Test
    @DisplayName("유저 정보")
    void test8() {

        User user = User.builder()
                .loginId("test")
                .password(passwordEncoder.encode("12345"))
                .nickname("nickname")
                .type(UserType.USER)
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        UserInfo info = authService.info(user.getId());

        assertEquals("nickname", info.getNickname());
        assertEquals("USER", info.getRole());
    }

    @Test
    @DisplayName("유저 삭제")
    void test9() {

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

        authService.delete(user.getId());

        assertEquals(0L, userRepository.count());
        assertEquals(0L, feedbackRepository.count());
        assertEquals(0L, boardRepository.count());
        assertEquals(0L, essayRepository.count());

    }
}