package com.injagang.docs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.domain.Board;
import com.injagang.domain.Feedback;
import com.injagang.domain.notification.Notification;
import com.injagang.domain.notification.NotificationType;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.user.User;
import com.injagang.domain.user.UserType;
import com.injagang.helper.TestHelper;
import com.injagang.repository.*;
import com.injagang.repository.board.BoardRepository;
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

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@AutoConfigureRestDocs(uriScheme = "https",uriHost = "api.relaymentor.com",uriPort = 443)
@ExtendWith(RestDocumentationExtension.class)
@Transactional
@ActiveProfiles("test")
class NotificationControllerDocTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    QnARepository qnARepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    TestHelper testHelper;

    @Autowired
    EssayRepository essayRepository;

    @AfterAll
    void after() {
        feedbackRepository.deleteAll();
        qnARepository.deleteAll();
        essayRepository.deleteAll();
        boardRepository.deleteAll();
        userRepository.deleteAll();
    }

    @BeforeEach
    void clean() {
        feedbackRepository.deleteAll();
        qnARepository.deleteAll();
        essayRepository.deleteAll();
        boardRepository.deleteAll();
        userRepository.deleteAll();
    }


    @Test
    @DisplayName("알림 리스트")
    void test() throws Exception {
        User user = User.builder()
                .loginId("loginId")
                .password("test")
                .nickname("nickname")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();

        User user2 = User.builder()
                .loginId("loginId2")
                .password("test")
                .nickname("nickname2")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();

        userRepository.save(user);
        userRepository.save(user2);

        String jws = testHelper.makeAccessToken(user.getId());

        Board board = Board.builder()
                .title("test board")
                .content("test content")
                .user(user)
                .essayTitle("test essay title")
                .build();


        BoardQnA qna1 = BoardQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        board.addQnA(qna1);

        BoardQnA qna2 = BoardQnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        board.addQnA(qna2);

        boardRepository.save(board);

        Feedback feedback = Feedback.builder()
                .user(user)
                .boardQnA(qna1)
                .feedbackTarget("target")
                .feedbackContent("content")
                .build();

        feedbackRepository.save(feedback);


        List<Notification> list = new ArrayList<>();

        IntStream.range(0,10).forEach(i->{
            list.add(Notification.builder()
                    .recipient(board.getUser())
                    .actor(user2)
                    .board(board)
                    .type(NotificationType.BOARD)
                    .anchorId(feedback.getId())
                    .readAt(null)
                    .build());
        });

        notificationRepository.saveAll(list);

        mockMvc.perform(get("/notifications")
                        .header("Authorization", jws))
                .andExpect(status().isOk())
                .andDo(document("notification-list",
                        requestHeaders(
                                headerWithName("Authorization").description("로그인 인증")
                        ), responseFields(
                                fieldWithPath("[].id").description("알림 ID"),
                                fieldWithPath("[].boardId").description("게시글 ID"),
                                fieldWithPath("[].anchorId").description("앵커 ID"),
                                fieldWithPath("[].type").description("알림 타입"),
                                fieldWithPath("[].createAt").description("작성 시간"),
                                fieldWithPath("[].nickname").description("알림 작성자 닉네임")
                        )));


    }

    @Test
    @DisplayName("알림 읽기")
    void test2() throws Exception {

        User user = User.builder()
                .loginId("loginId")
                .password("test")
                .nickname("nickname")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();

        User user2 = User.builder()
                .loginId("loginId2")
                .password("test")
                .nickname("nickname2")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();

        userRepository.save(user);
        userRepository.save(user2);

        String jws = testHelper.makeAccessToken(user.getId());

        Board board = Board.builder()
                .title("test board")
                .content("test content")
                .user(user)
                .essayTitle("test essay title")
                .build();


        BoardQnA qna1 = BoardQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        board.addQnA(qna1);

        BoardQnA qna2 = BoardQnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        board.addQnA(qna2);

        boardRepository.save(board);

        Feedback feedback = Feedback.builder()
                .user(user)
                .boardQnA(qna1)
                .feedbackTarget("target")
                .feedbackContent("content")
                .build();

        feedbackRepository.save(feedback);


        Notification notification = notificationRepository.save(Notification.builder()
                .recipient(board.getUser())
                .actor(user2)
                .board(board)
                .type(NotificationType.BOARD)
                .anchorId(feedback.getId())
                .readAt(null)
                .build());


        mockMvc.perform(patch("/notifications/{notificationId}",notification.getId())
                        .header("Authorization", jws))
                .andExpect(status().isOk())
                .andDo(document("notification-read",
                        requestHeaders(
                                headerWithName("Authorization").description("로그인 인증")
                        ),
                        pathParameters(
                                parameterWithName("notificationId").description("알림 ID")
                        )));


        Assertions.assertNotNull(notificationRepository.findById(notification.getId()).get().getReadAt());
        

    }

    @Test
    @DisplayName("알림 모두 읽기")
    void test3() throws Exception {

        User user = User.builder()
                .loginId("loginId")
                .password("test")
                .nickname("nickname")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();

        User user2 = User.builder()
                .loginId("loginId2")
                .password("test")
                .nickname("nickname2")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();

        userRepository.save(user);
        userRepository.save(user2);

        String jws = testHelper.makeAccessToken(user.getId());

        Board board = Board.builder()
                .title("test board")
                .content("test content")
                .user(user)
                .essayTitle("test essay title")
                .build();


        BoardQnA qna1 = BoardQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        board.addQnA(qna1);

        BoardQnA qna2 = BoardQnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        board.addQnA(qna2);

        boardRepository.save(board);

        Feedback feedback = Feedback.builder()
                .user(user)
                .boardQnA(qna1)
                .feedbackTarget("target")
                .feedbackContent("content")
                .build();

        feedbackRepository.save(feedback);


        IntStream.range(1,5).forEach(i->{

            Notification notification = notificationRepository.save(Notification.builder()
                    .recipient(board.getUser())
                    .actor(user2)
                    .board(board)
                    .type(NotificationType.BOARD)
                    .anchorId(feedback.getId())
                    .readAt(null)
                    .build());

            notificationRepository.save(notification);

        });

        mockMvc.perform(patch("/notifications/read")
                        .header("Authorization", jws))
                .andExpect(status().isOk())
                .andDo(document("notification-read-all",
                        requestHeaders(
                                headerWithName("Authorization").description("로그인 인증")
                        )));



    }


}