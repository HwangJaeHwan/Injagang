package com.injagang.service;

import com.injagang.domain.Board;
import com.injagang.domain.Feedback;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.user.User;
import com.injagang.domain.user.UserType;
import com.injagang.exception.UnauthorizedException;
import com.injagang.repository.EssayRepository;
import com.injagang.repository.FeedbackRepository;
import com.injagang.repository.QnARepository;
import com.injagang.repository.UserRepository;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.FeedbackWrite;
import com.injagang.request.ReviseFeedback;
import com.injagang.response.FeedbackList;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import javax.transaction.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class FeedbackServiceTest {

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
    FeedbackService feedbackService;

    @Autowired
    PasswordEncoder passwordEncoder;

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
    @DisplayName("피드백 쓰기")
    void test4() {

        User user = User.builder()
                .loginId("loginId")
                .password("test")
                .nickname("nickname")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();

        userRepository.save(user);

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
                .boardId(board.getId())
                .feedbackTarget("feedback target")
                .feedbackContent("feedback content")
                .build();

        feedbackService.writeFeedback(user.getId(),feedbackWrite);

        List<Feedback> feedbacks = feedbackRepository.findAllByQna(qna1);

        assertEquals(1, feedbacks.size());
        assertEquals("feedback target", feedbacks.get(0).getFeedbackTarget());
        assertEquals("feedback content", feedbacks.get(0).getFeedbackContent());



    }

    @Test
    @DisplayName("피드백 수정")
    void test5() {


        User user = User.builder()
                .loginId("loginId")
                .password("test")
                .nickname("nickname")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();

        userRepository.save(user);

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

        ReviseFeedback revise = ReviseFeedback.builder()
                .feedbackId(feedback.getId())
                .reviseContent("revise")
                .build();

        feedbackService.reviseFeedback(user.getId(), revise);

        Feedback reviseFeedback = feedbackRepository.findById(feedback.getId()).get();

        assertEquals("revise", reviseFeedback.getFeedbackContent());




    }

    @Test
    @DisplayName("피드백 수정 권한 없음")
    void test5_1() {


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

        ReviseFeedback revise = ReviseFeedback.builder()
                .feedbackId(feedback.getId())
                .reviseContent("revise")
                .build();

        assertThrows(UnauthorizedException.class, () -> feedbackService.reviseFeedback(user2.getId(), revise));





    }

    @Test
    @DisplayName("피드백 리스트")
    void test6() {


        User user = User.builder()
                .loginId("loginId")
                .password("test")
                .nickname("nickname")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();

        userRepository.save(user);

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


        Feedback feedback1 = Feedback.builder()
                .user(user)
                .boardQnA(qna1)
                .feedbackTarget("target1")
                .feedbackContent("content1")
                .build();

        Feedback feedback2 = Feedback.builder()
                .user(user)
                .boardQnA(qna1)
                .feedbackTarget("target2")
                .feedbackContent("content2")
                .build();

        Feedback feedback3 = Feedback.builder()
                .user(user)
                .boardQnA(qna1)
                .feedbackTarget("target3")
                .feedbackContent("content3")
                .build();

        Feedback feedback4 = Feedback.builder()
                .user(user2)
                .boardQnA(qna1)
                .feedbackTarget("target4")
                .feedbackContent("content4")
                .build();

        feedbackRepository.save(feedback1);
        feedbackRepository.save(feedback2);
        feedbackRepository.save(feedback3);
        feedbackRepository.save(feedback4);

        List<FeedbackList> feedbackList = feedbackService.feedbacksByQna(user.getId(), qna1.getId());

        assertEquals(4, feedbackList.size());
        assertEquals(feedback1.getId(),feedbackList.get(0).getFeedbackId());
        assertEquals("target1", feedbackList.get(0).getTarget());
        assertEquals("content1", feedbackList.get(0).getContent());
        assertTrue(feedbackList.get(0).isOwner());

        assertEquals(feedback2.getId(),feedbackList.get(1).getFeedbackId());
        assertEquals("target2", feedbackList.get(1).getTarget());
        assertEquals("content2", feedbackList.get(1).getContent());
        assertTrue(feedbackList.get(1).isOwner());

        assertEquals(feedback3.getId(),feedbackList.get(2).getFeedbackId());
        assertEquals("target3", feedbackList.get(2).getTarget());
        assertEquals("content3", feedbackList.get(2).getContent());
        assertTrue(feedbackList.get(2).isOwner());

        assertEquals(feedback4.getId(),feedbackList.get(3).getFeedbackId());
        assertEquals("target4", feedbackList.get(3).getTarget());
        assertEquals("content4", feedbackList.get(3).getContent());
        assertFalse(feedbackList.get(3).isOwner());

    }

}