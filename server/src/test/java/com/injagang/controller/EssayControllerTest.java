package com.injagang.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.domain.Essay;
import com.injagang.domain.QuestionAndAnswer;
import com.injagang.domain.User;
import com.injagang.repository.EssayRepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.EssayWrite;
import com.injagang.request.QnA;
import com.injagang.service.EssayService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.http.MediaType.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest
class EssayControllerTest {


    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    EssayService essayService;

    @Autowired
    EssayRepository essayRepository;

    @Autowired
    UserRepository userRepository;


    @Test
    @DisplayName("/write 자소서 작성하기")
    void test() throws Exception {


        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);


        EssayWrite essayWrite = EssayWrite.builder()
                .title("test essay")
                .build();

        QnA qnA1 = QnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        essayWrite.addQna(qnA1);

        QnA qnA2 = QnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        essayWrite.addQna(qnA2);


        QnA qnA3 = QnA.builder()
                .question("question3")
                .answer("answer3")
                .build();

        essayWrite.addQna(qnA3);

        String json = objectMapper.writeValueAsString(essayWrite);


        mockMvc.perform(post("/essay/write")
                        .contentType(APPLICATION_JSON)
                        .content(json))
                .andDo(print());


    }

    @Test
    @DisplayName("/read/{essayId} 해당 자소서를 읽는다")
    void test2() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);

        Essay essay = Essay.builder()
                .title("test title")
                .user(user)
                .build();


        QuestionAndAnswer qna1 = QuestionAndAnswer.builder()
                .question("question1")
                .answer("answer1")
                .build();

        essay.addQuestionAndAnswer(qna1);

        QuestionAndAnswer qna2 = QuestionAndAnswer.builder()
                .question("question2")
                .answer("answer2")
                .build();

        essay.addQuestionAndAnswer(qna2);

        QuestionAndAnswer qna3 = QuestionAndAnswer.builder()
                .question("question3")
                .answer("answer3")
                .build();

        essay.addQuestionAndAnswer(qna3);

        essayRepository.save(essay);

        mockMvc.perform(get("/essay/read/{essayId}", essay.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.essayId").value(essay.getId()))
                .andExpect(jsonPath("$.title").value("test title"))
                .andExpect(jsonPath("$.qna[0].question").value("question1"))
                .andExpect(jsonPath("$.qna[0].answer").value("answer1"))
                .andExpect(jsonPath("$.qna[1].question").value("question2"))
                .andExpect(jsonPath("$.qna[1].answer").value("answer2"))
                .andExpect(jsonPath("$.qna[2].question").value("question3"))
                .andExpect(jsonPath("$.qna[2].answer").value("answer3"))
                .andDo(print());


    }

    @Test
    @DisplayName("/{loginId} 해당 아이디를 가진 유저의 자기소개서 목록을 불러온다")
    void test3() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);

        IntStream.rangeClosed(1,100).forEach(

                i->{
                    essayRepository.save(
                            Essay.builder()
                                    .title("test title" + i)
                                    .user(user)
                                    .build()
                    );


                }


        );

        mockMvc.perform(get("/essay/{loginId}", user.getLoginId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.EssayList.length()").value(100L))
                .andDo(print());


    }
}