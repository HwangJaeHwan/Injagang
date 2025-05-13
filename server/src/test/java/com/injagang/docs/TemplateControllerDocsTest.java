package com.injagang.docs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.domain.Template;
import com.injagang.domain.TemplateQuestion;
import com.injagang.domain.User;
import com.injagang.helper.TestHelper;
import com.injagang.repository.*;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.TemplateCreate;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.TestInstance.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;


@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
@AutoConfigureRestDocs(uriScheme = "https",uriHost = "api.injagang.com",uriPort = 443)
@ExtendWith(RestDocumentationExtension.class)
@ActiveProfiles("test")
public class TemplateControllerDocsTest {


    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    TemplateRepository templateRepository;

    @Autowired
    QnARepository qnARepository;

    @Autowired
    EssayRepository essayRepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    FeedbackRepository feedbackRepository;
    @Autowired
    TestHelper testHelper;

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
                .role("ADMIN")
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
                .andDo(document("template-add", requestHeaders(
                        headerWithName("Authorization").description("ADMIN 로그인 인증")
                ), requestFields(
                        fieldWithPath("title").description("템플릿 제목"),
                        fieldWithPath("questions[]").description("질문 목록")
                )));


    }


//    @Test
//    @DisplayName("템플릿 읽기")
//    void test2() throws Exception{
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
//        mockMvc.perform(get("/template/{templateId}", template.getId()))
//                .andDo(document("template-read", pathParameters(
//                        parameterWithName("templateId").description("템플릿 ID")
//                ), responseFields(
//                        fieldWithPath("title").description("템플릿 제목"),
//                        fieldWithPath("questions[]").description("질문 목록")
//                )));
//
//
//
//    }


    @Test
    @DisplayName("템플릿 리스트")
    void test3() throws Exception{

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
                .andDo(document("template-list", responseFields(
                        fieldWithPath("[].templateId").description("템플릿 ID"),
                        fieldWithPath("[].title").description("템플릿 제목"),
                        fieldWithPath("[].questions").description("템플릿 질문 목록")
                )));


    }

    @Test
    @DisplayName("템플릿 삭제")
    void test4() throws Exception{

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .role("ADMIN")
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
                .andDo(document("template-delete", requestHeaders(
                                headerWithName("Authorization").description("ADMIN 로그인 인증")
                        ),pathParameters(
                        parameterWithName("templateId").description("템플릿 ID")
                )));


    }





}
