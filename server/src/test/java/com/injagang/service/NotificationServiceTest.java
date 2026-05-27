package com.injagang.service;

import com.injagang.domain.Board;
import com.injagang.domain.Feedback;
import com.injagang.domain.notification.Notification;
import com.injagang.domain.notification.NotificationType;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.user.User;
import com.injagang.domain.user.UserType;
import com.injagang.repository.*;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.FeedbackWrite;
import com.injagang.response.NotificationResponse;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import javax.transaction.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class NotificationServiceTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    EssayRepository essayRepository;

    @Autowired
    QnARepository qnARepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    NotificationService notificationService;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    FeedbackService feedbackService;

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
    void test() {
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

        FeedbackWrite feedbackWrite = FeedbackWrite.builder()
                .qnaId(qna1.getId())
                .feedbackTarget("feedback target")
                .feedbackContent("feedback content")
                .boardId(board.getId())
                .build();

        feedbackService.writeFeedback(user2.getId(),feedbackWrite);
        feedbackService.writeFeedback(user2.getId(),feedbackWrite);
        feedbackService.writeFeedback(user2.getId(),feedbackWrite);

        List<NotificationResponse> list = notificationService.list(user.getId());

        System.out.println("사이즈1 = " + list.size());

        Assertions.assertEquals(3L, list.size());





    }

    @Test
    @DisplayName("알림 읽기")
    void test2() {
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

        notificationService.read(notification.getId(), user.getId());

        Notification newNotification = notificationRepository.findById(notification.getId()).get();

        Assertions.assertNotNull(newNotification.getReadAt());

    }


    @Test
    @DisplayName("알림 모두 읽기")
    void test3() {
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

            notificationRepository.save(Notification.builder()
                    .recipient(board.getUser())
                    .actor(user2)
                    .board(board)
                    .type(NotificationType.BOARD)
                    .anchorId(feedback.getId())
                    .readAt(null)
                    .build());

        });

        notificationService.readAll(user.getId());
        List<Notification> all = notificationRepository.findAll();


        Assertions.assertNotNull(all.get(0).getReadAt());
        Assertions.assertNotNull(all.get(1).getReadAt());
        Assertions.assertNotNull(all.get(2).getReadAt());
        Assertions.assertNotNull(all.get(3).getReadAt());

    }
}