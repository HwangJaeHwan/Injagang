package com.injagang.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.domain.Board;
import com.injagang.domain.Feedback;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.user.User;
import com.injagang.domain.user.UserType;
import com.injagang.helper.TestHelper;
import com.injagang.repository.EssayRepository;
import com.injagang.repository.FeedbackRepository;
import com.injagang.repository.QnARepository;
import com.injagang.repository.UserRepository;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.FeedbackWrite;
import com.injagang.request.ReviseFeedback;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;

import java.time.LocalDate;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
class FeedbackControllerTest {

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
    @DisplayName("/feedback 피드백 쓰기")
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

        userRepository.save(user);

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

        boardRepository.save(board);

        FeedbackWrite write = FeedbackWrite.builder()
                .qnaId(qna1.getId())
                .boardId(board.getId())
                .feedbackTarget("target")
                .feedbackContent("content")
                .build();

        String json = objectMapper.writeValueAsString(write);

        mockMvc.perform(post("/feedbacks")
                        .header("Authorization", jws)
                        .content(json)
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());

    }

    @Test
    @DisplayName("/board/feedback/revise 피드백 수정")
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

        userRepository.save(user);

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

        String json = objectMapper.writeValueAsString(revise);

        mockMvc.perform(patch("/feedbacks/revise")
                        .header("Authorization", jws)
                        .contentType(APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andDo(print());


    }

    @Test
    @DisplayName("/feedback/{qnaId} 피드백 리스트")
    void test3() throws Exception{

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

        mockMvc.perform(get("/feedbacks/{qnaId}", qna1.getId())
                        .header("Authorization", jws))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(4))
                .andDo(print());


    }

    @Test
    @DisplayName("피드백 좋아요")
    void test4() throws Exception {

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

        mockMvc.perform(post("/feedbacks/{feedbackId}/like", feedback.getId())
                        .header("Authorization", jws))
                .andExpect(status().isOk())
                .andDo(print());


    }


}