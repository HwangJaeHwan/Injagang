package com.injagang.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.config.AppConfig;
import com.injagang.config.jwt.JwtConfig;
import com.injagang.domain.Template;
import com.injagang.domain.TemplateQuestion;
import com.injagang.domain.User;
import com.injagang.repository.TemplateRepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.TemplateCreate;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import javax.crypto.SecretKey;
import java.util.Date;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
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
    AppConfig appConfig;


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
                .role("ADMIN")
                .build();

        userRepository.save(user);

        String jws = makeJWT(user.getId());

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

    @Test
    @DisplayName("/{templateId} 템플릿 읽기")
    void test3() throws Exception{


        Template template = Template.builder()
                .title("template")
                .build();

        template.addQuestion(
                TemplateQuestion.builder()
                        .question("question")
                        .build());

        templateRepository.save(template);



        mockMvc.perform(get("/template/{templateId}",template.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("template"))
                .andExpect(jsonPath("$.questions[0]").value("question"))
                .andDo(print());


    }

    @Test
    @DisplayName("/{templateId} 템플릿 삭제")
    void test4() throws Exception{

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .role("ADMIN")
                .build();

        userRepository.save(user);

        String jws = makeJWT(user.getId());

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





    private String makeJWT(Long userId) {
        SecretKey key = Keys.hmacShaKeyFor(appConfig.getJwtKey());

        String jws = Jwts.builder()
                .setSubject(String.valueOf(userId))
                .signWith(key)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + JwtConfig.EXPIRATION_TIME))
                .compact();

        return jws;
    }


}