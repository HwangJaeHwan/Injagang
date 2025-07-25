package com.injagang.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.domain.ExpectedQuestion;
import com.injagang.domain.QuestionType;
import com.injagang.domain.user.User;
import com.injagang.domain.user.UserType;
import com.injagang.helper.TestHelper;
import com.injagang.repository.ExpectedQuestionRepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.DeleteIds;
import com.injagang.request.QuestionWrite;
import com.injagang.request.RandomRequest;
import com.injagang.service.QuestionService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import static org.springframework.http.MediaType.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class QuestionControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    QuestionService questionService;

    @Autowired
    ExpectedQuestionRepository questionRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    TestHelper testHelper;


    @AfterAll
    void after() {
        questionRepository.deleteAll();
        userRepository.deleteAll();

    }

    @BeforeEach
    void clean() {
        questionRepository.deleteAll();
        userRepository.deleteAll();
    }


    @Test
    @DisplayName("/add 질문 추가")
    void test() throws Exception{

        User user = User.builder()
                .loginId("test")
                .nickname("test")
                .password("test")
                .email("test@test.com")
                .type(UserType.ADMIN)
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        QuestionWrite questionWrite = new QuestionWrite(QuestionType.CS);

        questionWrite.addQuestion("CS1");
        questionWrite.addQuestion("CS2");
        questionWrite.addQuestion("CS3");
        questionWrite.addQuestion("CS4");

        String json = objectMapper.writeValueAsString(questionWrite);

        mockMvc.perform(post("/questions/add")
                        .contentType(APPLICATION_JSON)
                        .header("Authorization", jws)
                        .content(json))
                .andExpect(status().isOk())
                .andDo(print());


    }

    @Test
    @DisplayName("/questions/random")
    void test2() throws Exception{

        saveQuestions();

        List<RandomRequest> requests = new ArrayList<>();

        RandomRequest csRequest = RandomRequest.builder()
                .size(5)
                .questionType(QuestionType.CS)
                .build();

        RandomRequest commonRequest = RandomRequest.builder()
                .size(6)
                .questionType(QuestionType.COMMON)
                .build();

        RandomRequest situationRequest = RandomRequest.builder()
                .size(7)
                .questionType(QuestionType.SITUATION)
                .build();

        RandomRequest frontRequest = RandomRequest.builder()
                .size(8)
                .questionType(QuestionType.FRONT)
                .build();

        RandomRequest backRequest = RandomRequest.builder()
                .size(9)
                .questionType(QuestionType.BACK)
                .build();

        RandomRequest universityRequest = RandomRequest.builder()
                .size(10)
                .questionType(QuestionType.UNIVERSITY)
                .build();

        requests.add(csRequest);
        requests.add(commonRequest);
        requests.add(situationRequest);
        requests.add(frontRequest);
        requests.add(backRequest);
        requests.add(universityRequest);

        String json = objectMapper.writeValueAsString(requests);

        mockMvc.perform(post("/questions/random")
                        .contentType(APPLICATION_JSON)
                        .content(json))
                .andExpect(jsonPath("$.length()").value(45L))
                .andExpect(status().isOk())
                .andDo(print());

    }

    @Test
    @DisplayName("/questions 질문리스트 CS")
    void test3() throws Exception{
        saveQuestions();

        mockMvc.perform(get("/questions")
                        .param("questionType", "CS"))
                .andExpect(jsonPath("$.length()").value(11L));

    }

    @Test
    @DisplayName("/questions 질문리스트 SITUATION")
    void test4() throws Exception{
        saveQuestions();

        mockMvc.perform(get("/questions")
                        .param("questionType", "SITUATION"))
                .andExpect(jsonPath("$.length()").value(11L));

    }

    @Test
    @DisplayName("/questions 질문리스트 FRONT")
    void test5() throws Exception{
        saveQuestions();

        mockMvc.perform(get("/questions")
                        .param("questionType", "FRONT"))
                .andExpect(jsonPath("$.length()").value(11L));

    }

    @Test
    @DisplayName("/questions 질문리스트 BACK")
    void test6() throws Exception{
        saveQuestions();

        mockMvc.perform(get("/questions")
                        .param("questionType", "BACK"))
                .andExpect(jsonPath("$.length()").value(11L));

    }

    @Test
    @DisplayName("/questions 질문리스트 COMMON")
    void test10() throws Exception{
        saveQuestions();

        mockMvc.perform(get("/questions")
                        .param("questionType", "COMMON"))
                .andExpect(jsonPath("$.length()").value(11L));

    }

    @Test
    @DisplayName("/questions 질문리스트 UNIVERSITY")
    void test11() throws Exception{
        saveQuestions();

        mockMvc.perform(get("/questions")
                        .param("questionType", "UNIVERSITY"))
                .andExpect(jsonPath("$.length()").value(11L));

    }

    @Test
    @DisplayName("/questions 질문리스트 ALL")
    void test7() throws Exception{
        saveQuestions();

        mockMvc.perform(get("/questions"))
                .andExpect(jsonPath("$.length()").value(66L));

    }

    @Test
    @DisplayName("/questions 질문 삭제")
    void test8() throws Exception {

        User user = User.builder()
                .loginId("test")
                .nickname("test")
                .password("test")
                .email("test@test.com")
                .type(UserType.ADMIN)
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());


        saveQuestions();

        DeleteIds ids = new DeleteIds();

        ids.addId(1L);
        ids.addId(2L);
        ids.addId(3L);
        ids.addId(4L);

        String json = objectMapper.writeValueAsString(ids);


        mockMvc.perform(delete("/questions")
                        .contentType(APPLICATION_JSON)
                        .content(json)
                        .header("Authorization", jws)
                )
                .andExpect(status().isOk());
    }


    private void saveQuestions() {

        List<ExpectedQuestion> save = new ArrayList<>();

        IntStream.rangeClosed(0,10)
                .forEach(
                        i->{
                            save.add(
                                    ExpectedQuestion.builder()
                                            .question("CS" + i)
                                            .questionType(QuestionType.CS)
                                            .build()
                            );


                        }

                );

        IntStream.rangeClosed(0,10)
                .forEach(
                        i->{
                            save.add(
                                    ExpectedQuestion.builder()
                                            .question("SITUATION" + i)
                                            .questionType(QuestionType.SITUATION)
                                            .build()
                            );


                        }

                );

        IntStream.rangeClosed(0,10)
                .forEach(
                        i->{
                            save.add(
                                    ExpectedQuestion.builder()
                                            .question("FRONT" + i)
                                            .questionType(QuestionType.FRONT)
                                            .build()
                            );


                        }

                );

        IntStream.rangeClosed(0,10)
                .forEach(
                        i->{
                            save.add(
                                    ExpectedQuestion.builder()
                                            .question("BACK" + i)
                                            .questionType(QuestionType.BACK)
                                            .build()
                            );


                        }

                );

        IntStream.rangeClosed(0,10)
                .forEach(
                        i->{
                            save.add(
                                    ExpectedQuestion.builder()
                                            .question("COMMON" + i)
                                            .questionType(QuestionType.COMMON)
                                            .build()
                            );


                        }

                );

        IntStream.rangeClosed(0,10)
                .forEach(
                        i->{
                            save.add(
                                    ExpectedQuestion.builder()
                                            .question("UNIVERSITY" + i)
                                            .questionType(QuestionType.UNIVERSITY)
                                            .build()
                            );


                        }

                );

        questionRepository.saveAll(save);


    }

}