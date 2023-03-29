package com.injagang.docs;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.domain.Board;
import com.injagang.domain.User;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.helper.TestHelper;
import com.injagang.repository.BoardRepository;
import com.injagang.repository.EssayRepository;
import com.injagang.repository.QnARepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.BoardWrite;
import com.injagang.request.QnaRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.headers.HeaderDocumentation;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.restdocs.request.RequestDocumentation;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.http.MediaType.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs(uriScheme = "https",uriHost = "api.injagang.com",uriPort = 443)
@ExtendWith(RestDocumentationExtension.class)
public class BoardControllerDocTest {



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
    TestHelper testHelper;

    @BeforeEach
    void clean() {
        qnARepository.deleteAll();
        essayRepository.deleteAll();
        boardRepository.deleteAll();
        userRepository.deleteAll();

    }

    @Test
    @DisplayName("게시글 쓰기")
    void test() throws Exception{
        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .role("USER")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        BoardWrite boardWrite = BoardWrite.builder()
                .title("test board")
                .content("test board")
                .essayTitle("test essay")
                .build();

        QnaRequest qnaRequest1 = QnaRequest.builder()
                .question("question1")
                .answer("answer1")
                .build();

        QnaRequest qnaRequest2 = QnaRequest.builder()
                .question("question2")
                .answer("answer2")
                .build();

        boardWrite.addQna(qnaRequest1);
        boardWrite.addQna(qnaRequest2);

        String json = objectMapper.writeValueAsString(boardWrite);

        mockMvc.perform(post("/board/write")
                        .contentType(APPLICATION_JSON)
                        .header("Authorization", jws)
                        .content(json))
                .andDo(document("board-write", requestHeaders(
                        headerWithName("Authorization").description("로그인 인증")
                ), requestFields(
                        fieldWithPath("title").description("게시물 제목"),
                        fieldWithPath("content").description("게시물 내용"),
                        fieldWithPath("essayTitle").description("불러온 자소서 제목"),
                        fieldWithPath("qnaList[].question").description("불러온 자소서 질문"),
                        fieldWithPath("qnaList[].answer").description("불러온 자소서 답변")
                )));
    }

    @Test
    @DisplayName("게시글 읽기")
    void test2() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .role("USER")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        Board board = Board.builder()
                .title("test board")
                .content("test content")
                .essayTitle("test essay")
                .user(user)
                .build();

        BoardQnA qna1 = BoardQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        BoardQnA qna2 = BoardQnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        BoardQnA qna3 = BoardQnA.builder()
                .question("question3")
                .answer("answer3")
                .build();

        board.addQnA(qna1);
        board.addQnA(qna2);
        board.addQnA(qna3);

        boardRepository.save(board);

        mockMvc.perform(get("/board/{boardId}", board.getId())
                        .header("Authorization", jws))
                .andDo(document("board-read", requestHeaders(
                        headerWithName("Authorization").description("로그인 인증")
                ), pathParameters(
                        parameterWithName("boardId").description("게시글 ID")
                ), responseFields(
                        fieldWithPath("boardId").description("게시글 ID"),
                        fieldWithPath("title").description("게시글 제목"),
                        fieldWithPath("content").description("게시글 내용"),
                        fieldWithPath("essayTitle").description("게시글 자소서 제목"),
                        fieldWithPath("qnaList[].qnaId").description("게시글 자소서 ID"),
                        fieldWithPath("qnaList[].question").description("게시글 자소서 제목"),
                        fieldWithPath("qnaList[].answer").description("게시글 자소서 답변")
                )));


    }

}
