package com.injagang.service;

import com.injagang.domain.Template;
import com.injagang.domain.TemplateQuestion;
import com.injagang.domain.user.User;
import com.injagang.domain.user.UserType;
import com.injagang.repository.*;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.TemplateCreate;
import com.injagang.response.TemplateList;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.TestInstance.*;

@SpringBootTest
@ActiveProfiles("test")
@TestInstance(Lifecycle.PER_CLASS)
class TemplateServiceTest {

    @Autowired
    TemplateService templateService;

    @Autowired
    TemplateRepository templateRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    QnARepository qnARepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    EssayRepository essayRepository;

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
    void test() {


        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .type(UserType.ADMIN)
                .build();

        userRepository.save(user);


        TemplateCreate templateCreate = TemplateCreate.builder()
                .title("test template")
                .build();

        templateCreate.addQuestions("question1");
        templateCreate.addQuestions("question2");
        templateCreate.addQuestions("question3");

        Long templateId = templateService.addTemplate(user.getId(), templateCreate);

        Template template = templateRepository.findById(templateId).get();

        assertThat(template.getTitle()).isEqualTo("test template");
        assertEquals(3, template.getQuestions().size());
        assertThat(template.getQuestions().get(0).getQuestion()).isEqualTo("question1");
        assertThat(template.getQuestions().get(1).getQuestion()).isEqualTo("question2");
        assertThat(template.getQuestions().get(2).getQuestion()).isEqualTo("question3");


    }

//    @Test
//    @DisplayName("템플릿 읽기")
//    void test2() {
//
//        User user = User.builder()
//                .loginId("test")
//                .password("test")
//                .nickname("test")
//                .type(UserType.ADMIN)
//                .build();
//
//        userRepository.save(user);
//
//        TemplateCreate templateCreate = TemplateCreate.builder()
//                .title("test template")
//                .build();
//
//        templateCreate.addQuestions("question1");
//        templateCreate.addQuestions("question2");
//        templateCreate.addQuestions("question3");
//
//        Long templateId = templateService.addTemplate(user.getId(), templateCreate);
//
//
//        TemplateInfo templateInfo = templateService.readTemplate(templateId);
//
//        assertThat(templateInfo.getTitle()).isEqualTo("test template");
//        assertEquals(3, templateInfo.getQuestions().size());
//        assertThat(templateInfo.getQuestions().get(0)).isEqualTo("question1");
//        assertThat(templateInfo.getQuestions().get(1)).isEqualTo("question2");
//        assertThat(templateInfo.getQuestions().get(2)).isEqualTo("question3");
//
//
//    }

    @Test
    @DisplayName("템플릿 리스트")
    void test3() {
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
                        .question("question1")
                        .build());

        template2.addQuestion(
                TemplateQuestion.builder()
                        .question("question2")
                        .build());

        template3.addQuestion(
                TemplateQuestion.builder()
                        .question("question3")
                        .build());

        templateRepository.save(template1);
        templateRepository.save(template2);
        templateRepository.save(template3);

        List<TemplateList> templates = templateService.templates();

        for (TemplateList template : templates) {
            System.out.println(template.getTitle());

        }


        assertEquals(3, templates.size());
        assertThat(templates.get(0).getTitle()).isEqualTo("template1");
        assertThat(templates.get(0).getQuestions().get(0)).isEqualTo("question1");
        assertThat(templates.get(1).getTitle()).isEqualTo("template2");
        assertThat(templates.get(1).getQuestions().get(0)).isEqualTo("question2");
        assertThat(templates.get(2).getTitle()).isEqualTo("template3");
        assertThat(templates.get(2).getQuestions().get(0)).isEqualTo("question3");


    }

    @Test
    @DisplayName("템플릿 삭제")
    void test4() {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .type(UserType.ADMIN)
                .build();

        userRepository.save(user);


        Template template = Template.builder()
                .title("template1")
                .build();
        template.addQuestion(
                TemplateQuestion.builder()
                        .question("question")
                        .build());

        templateRepository.save(template);

        List<Template> all = templateRepository.findAll();

        for (Template template1 : all) {
            System.out.println(template1.getTitle());
        }


        assertEquals(1L, templateRepository.count());

        templateService.delete(user.getId(), template.getId());

        assertEquals(0, templateRepository.count());


    }
}