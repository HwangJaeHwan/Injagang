package com.injagang.docs;

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
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
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

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
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
public class FeedbackControllerDocTest {


    @Autowired
    MockMvc mockMvc;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    QnARepository qnARepository;

    @Autowired
    BoardRepository boardRepository;


    @Autowired
    EssayRepository essayRepository;

    @Autowired
    FeedbackRepository feedbackRepository;


    @Autowired
    TestHelper testHelper;



    @Test
    @DisplayName("피드백 쓰기")
    void test() throws Exception{


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

        mockMvc.perform(post("/feedbacks", qna1.getId())
                        .header("Authorization", jws)
                        .content(json)
                        .contentType(APPLICATION_JSON))
                .andDo(document("feedback-write", requestHeaders(
                                headerWithName("Authorization").description("로그인 인증")
                        ),requestFields(
                                fieldWithPath("qnaId").description("피드백 작성할 QnA ID"),
                                fieldWithPath("boardId").description("피드백 작성한 Board ID"),
                                fieldWithPath("feedbackTarget").description("피드백 타겟"),
                                fieldWithPath("feedbackContent").description("피드백 내용")
                        ))
                );

    }

    @Test
    @DisplayName("피드백 수정")
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
                .andDo(document("feedback-revise", requestHeaders(
                        headerWithName("Authorization").description("로그인 인증")
                ), requestFields(
                        fieldWithPath("feedbackId").description("수정할 피드백 ID"),
                        fieldWithPath("reviseContent").description("수정할 피드백 내용")
                )));

    }

    @Test
    @DisplayName("피드백 리스트")
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

        userRepository.save(user);

        User user2 = User.builder()
                .loginId("test2")
                .password("test2")
                .nickname("test2")
                .type(UserType.USER)
                .birthday(LocalDate.now())
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
                .andDo(document("feedback-list", requestHeaders(
                        headerWithName("Authorization").description("로그인 인증")
                ),pathParameters(
                        parameterWithName("qnaId").description("타겟 QnA")
                ),responseFields(
                        fieldWithPath("[].feedbackId").description("피드백 ID"),
                        fieldWithPath("[].target").description("피드백 타겟"),
                        fieldWithPath("[].content").description("피드백 내용"),
                        fieldWithPath("[].nickname").description("작성자 닉네임"),
                        fieldWithPath("[].owner").description("작성자 판별")
                )));


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
                .andDo(document("feedback-like"
                        , requestHeaders(
                                headerWithName("Authorization").description("로그인 인증")
                        ),pathParameters(
                                parameterWithName("feedbackId").description("피드백 ID")
                        )));


    }


}
