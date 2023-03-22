package com.injagang.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.domain.Essay;
import com.injagang.domain.QuestionAndAnswer;
import com.injagang.domain.User;
import com.injagang.helper.TestHelper;
import com.injagang.repository.EssayRepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.EssayWrite;
import com.injagang.request.QnA;
import com.injagang.service.EssayService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.stream.IntStream;

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

    @Autowired
    TestHelper testHelper;

    @BeforeEach
    void clean() {
        essayRepository.deleteAll();
        userRepository.deleteAll();

    }



    @Test
    @DisplayName("/write 자소서 작성하기")
    void test() throws Exception {


        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());


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
                        .header("Authorization", jws)
                        .content(json))
                .andExpect(status().isOk())
                .andDo(print());


    }


    @Test
    @DisplayName("/write 자소서 작성시 제목은 필수다")
    void testValid() throws Exception {


        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);


        EssayWrite essayWrite = EssayWrite.builder()
                .title("")
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


        String jws = testHelper.makeAccessToken(user.getId());


        mockMvc.perform(post("/essay/write")
                        .contentType(APPLICATION_JSON)
                        .header("Authorization", jws)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andDo(print());


    }

    @Test
    @DisplayName("/write 자소서 작성시 QnA는 1개 이상 있어야 한다")
    void testValid2() throws Exception {


        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);


        EssayWrite essayWrite = EssayWrite.builder()
                .title("title")
                .build();


        String json = objectMapper.writeValueAsString(essayWrite);


        String jws = testHelper.makeAccessToken(user.getId());


        mockMvc.perform(post("/essay/write")
                        .contentType(APPLICATION_JSON)
                        .header("Authorization", jws)
                        .content(json))
                .andExpect(status().isBadRequest())
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

        String jws = testHelper.makeAccessToken(user.getId());

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

        mockMvc.perform(get("/essay/read/{essayId}", essay.getId())
                .header("Authorization", jws))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.essayId").value(essay.getId()))
                .andExpect(jsonPath("$.title").value("test title"))
                .andExpect(jsonPath("$.qnaList[0].question").value("question1"))
                .andExpect(jsonPath("$.qnaList[0].answer").value("answer1"))
                .andExpect(jsonPath("$.qnaList[1].question").value("question2"))
                .andExpect(jsonPath("$.qnaList[1].answer").value("answer2"))
                .andExpect(jsonPath("$.qnaList[2].question").value("question3"))
                .andExpect(jsonPath("$.qnaList[2].answer").value("answer3"))
                .andDo(print());


    }

    @Test
    @DisplayName("/{userId} 해당 ID를 가진 유저의 자기소개서 목록을 불러온다")
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

        mockMvc.perform(get("/essay/{userId}", user.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(100L))
                .andDo(print());


    }


    @Test
    @DisplayName("/delete/{essayId} 자소서를 삭제한다 ")
    void test4() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        Essay essay = Essay.builder()
                .title("delete")
                .user(user)
                .build();

        QuestionAndAnswer qna = QuestionAndAnswer.builder()
                .question("question")
                .answer("answer")
                .build();

        essay.addQuestionAndAnswer(qna);

        essayRepository.save(essay);


        mockMvc.perform(delete("/essay/delete/{essayId}", essay.getId())
                        .header("Authorization", jws))
                .andExpect(status().isOk())
                .andDo(print());


    }

    @Test
    @DisplayName("/revise/{essayId} 자소서를 수정한다.")
    void test6() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        Essay essay = Essay.builder()
                .title("delete")
                .user(user)
                .build();

        QuestionAndAnswer qna1 = QuestionAndAnswer.builder()
                .question("question1")
                .answer("answer1")
                .build();

        QuestionAndAnswer qna2 = QuestionAndAnswer.builder()
                .question("question2")
                .answer("answer2")
                .build();

        QuestionAndAnswer qna3 = QuestionAndAnswer.builder()
                .question("question3")
                .answer("answer3")
                .build();

        essay.addQuestionAndAnswer(qna1);
        essay.addQuestionAndAnswer(qna2);
        essay.addQuestionAndAnswer(qna3);

        essayRepository.save(essay);


        EssayWrite essayWrite = EssayWrite.builder()
                .title("change")
                .build();

        QnA changeQna1 = QnA.builder()
                .question("questionChange1")
                .answer("answerChange1")
                .build();

        QnA changeQna2 = QnA.builder()
                .question("questionChange2")
                .answer("answerChange2")
                .build();

        QnA changeQna3 = QnA.builder()
                .question("questionChange3")
                .answer("answerChange3")
                .build();

        QnA changeQna4 = QnA.builder()
                .question("questionChange4")
                .answer("answerChange4")
                .build();

        essayWrite.addQna(changeQna1);
        essayWrite.addQna(changeQna2);
        essayWrite.addQna(changeQna3);
        essayWrite.addQna(changeQna4);

        String json = objectMapper.writeValueAsString(essayWrite);

        mockMvc.perform(patch("/essay/revise/{essayId}", essay.getId())
                        .header("Authorization", jws)
                        .content(json)
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());



    }






}