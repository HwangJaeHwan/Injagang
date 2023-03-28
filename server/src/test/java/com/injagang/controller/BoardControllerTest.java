package com.injagang.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.domain.Board;
import com.injagang.domain.User;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.helper.TestHelper;
import com.injagang.repository.BoardRepository;
import com.injagang.repository.QnARepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.BoardWrite;
import com.injagang.request.QnaRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class BoardControllerTest {


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
    TestHelper testHelper;

    @BeforeEach
    void clean() {
        qnARepository.deleteAll();
        boardRepository.deleteAll();
        userRepository.deleteAll();

    }


    @Test
    @DisplayName("/write 게시글 작성하기")
    void test() throws Exception {

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
                .andExpect(status().isOk())
                .andDo(print());


    }


    @Test
    @DisplayName("/{boardId} 해당 게시글을 읽는다")
    void test2() throws Exception{


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
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.boardId").value(board.getId()))
                .andExpect(jsonPath("$.title").value("test board"))
                .andExpect(jsonPath("$.content").value("test content"))
                .andExpect(jsonPath("$.essayTitle").value("test essay"))
                .andExpect(jsonPath("$.qnaList[0].question").value("question1"))
                .andExpect(jsonPath("$.qnaList[0].answer").value("answer1"))
                .andExpect(jsonPath("$.qnaList[1].question").value("question2"))
                .andExpect(jsonPath("$.qnaList[1].answer").value("answer2"))
                .andExpect(jsonPath("$.qnaList[2].question").value("question3"))
                .andExpect(jsonPath("$.qnaList[2].answer").value("answer3"))
                .andDo(print());



    }
}