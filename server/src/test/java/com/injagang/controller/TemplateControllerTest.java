package com.injagang.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.domain.Template;
import com.injagang.domain.TemplateQuestion;
import com.injagang.domain.user.User;
import com.injagang.domain.user.UserType;
import com.injagang.helper.TestHelper;
import com.injagang.repository.*;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.TemplateCreate;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;


import static org.junit.jupiter.api.TestInstance.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
@SpringBootTest
@ActiveProfiles("test")
class TemplateControllerTest {


    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TemplateRepository templateRepository;

    @Autowired
    TestHelper testHelper;

    @Autowired
    QnARepository qnARepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    EssayRepository essayRepository;

    @Autowired
    FeedbackRepository feedbackRepository;


    @AfterAll
    void after() {
        templateRepository.deleteAll();
        userRepository.deleteAll();
    }


    @BeforeEach
    void clean() {
        templateRepository.deleteAll();
        userRepository.deleteAll();
    }


    @Test
    @DisplayName("템플릿 추가")
    void test() throws Exception{

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .type(UserType.ADMIN)
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        TemplateCreate templateCreate = TemplateCreate.builder()
                .title("test template")
                .build();

        templateCreate.addQuestions("question1");
        templateCreate.addQuestions("question2");
        templateCreate.addQuestions("question3");

        String json = objectMapper.writeValueAsString(templateCreate);

        mockMvc.perform(post("/template/add")
                        .contentType(APPLICATION_JSON)
                        .header("Authorization", jws)
                        .content(json))
                .andExpect(status().isOk())
                .andDo(print());


    }


    @Test
    @DisplayName("템플릿 리스트")
    void test2() throws Exception{

        Template template1 = Template.builder()
                .title("template1")
                .build();
        Template template2 = Template.builder()
                .title("template2")
                .build();
        Template template3 = Template.builder()
                .title("template3")
                .build();

        template1.addQuestion(
                TemplateQuestion.builder()
                        .question("question")
                        .build());

        template2.addQuestion(
                TemplateQuestion.builder()
                        .question("question")
                        .build());

        template3.addQuestion(
                TemplateQuestion.builder()
                        .question("question")
                        .build());

        templateRepository.save(template1);
        templateRepository.save(template2);
        templateRepository.save(template3);


        mockMvc.perform(get("/template"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3L))
                .andDo(print());


    }

//    @Test
//    @DisplayName("/{templateId} 템플릿 읽기")
//    void test3() throws Exception{
//
//
//        Template template = Template.builder()
//                .title("template")
//                .build();
//
//        template.addQuestion(
//                TemplateQuestion.builder()
//                        .question("question")
//                        .build());
//
//        templateRepository.save(template);
//
//
//
//        mockMvc.perform(get("/template/{templateId}",template.getId()))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.title").value("template"))
//                .andExpect(jsonPath("$.questions[0]").value("question"))
//                .andDo(print());
//
//
//    }

    @Test
    @DisplayName("/{templateId} 템플릿 삭제")
    void test4() throws Exception{

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .type(UserType.ADMIN)
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        Template template = Template.builder()
                .title("template")
                .build();

        template.addQuestion(
                TemplateQuestion.builder()
                        .question("question")
                        .build());

        templateRepository.save(template);



        mockMvc.perform(delete("/template/{templateId}",template.getId())
                        .header("Authorization", jws))
                .andExpect(status().isOk())
                .andDo(print());


    }







}