package com.injagang.docs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.config.AppConfig;
import com.injagang.config.jwt.JwtConfig;
import com.injagang.domain.Essay;
import com.injagang.domain.QuestionAndAnswer;
import com.injagang.domain.User;
import com.injagang.repository.EssayRepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.EssayWrite;
import com.injagang.request.QnA;
import com.injagang.service.EssayService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.headers.HeaderDocumentation;
import org.springframework.test.web.servlet.MockMvc;


import javax.crypto.SecretKey;
import java.util.Date;
import java.util.stream.IntStream;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;



@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs(uriScheme = "https",uriHost = "api.injagang.com",uriPort = 443)
@ExtendWith(RestDocumentationExtension.class)
public class EssayControllerDocsTest {


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
    AppConfig appConfig;

    @Autowired
    JwtConfig jwtConfig;

    @BeforeEach
    void clean() {
        essayRepository.deleteAll();
        userRepository.deleteAll();

    }



    @Test
    @DisplayName("자소서 작성")
    void test() throws Exception {


        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);

        String jws = makeJWT(user.getId());


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
                .andDo(document("essay-write",requestHeaders(
                                headerWithName("Authorization").description("로그인 인증")
                        ), requestFields(
                                fieldWithPath("title").description("자소서 제목"),
                                fieldWithPath("qnaList[].question").description("자소서 질문"),
                                fieldWithPath("qnaList[].answer").description("자소서 답변")
                        )));


    }


    @Test
    @DisplayName("자소서를 읽는다")
    void test2() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);

        String jws = makeJWT(user.getId());

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
                .andDo(document("essay-read", requestHeaders(
                                headerWithName("Authorization").description("로그인 인증")
                        ),pathParameters(
                        parameterWithName("essayId").description("자소서 ID")
                        ),
                        responseFields(
                                fieldWithPath("essayId").description("자소서 ID"),
                                fieldWithPath("title").description("자소서 제목"),
                                fieldWithPath("qnaList[].qnaId").description("QnA ID"),
                                fieldWithPath("qnaList[].question").description("자소서 질문"),
                                fieldWithPath("qnaList[].answer").description("자소서 답변")
                        )));


    }

    @Test
    @DisplayName("자기소개서 목록")
    void test3() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);

        IntStream.rangeClosed(1,10).forEach(

                i->{

                    Essay essay = Essay.builder()
                            .title("test title" + i)
                            .user(user)
                            .build();


                    QuestionAndAnswer qna = QuestionAndAnswer.builder()
                            .question("question" + i)
                            .answer("answer" + i)
                            .build();

                    essay.addQuestionAndAnswer(qna);

                    essayRepository.save(essay);


                }


        );

        mockMvc.perform(get("/essay/{userId}", user.getId()))
                .andDo(document("essay-list",pathParameters(
                        parameterWithName("userId").description("자소서 ID")
                ),responseFields(
                        fieldWithPath("[].essayId").description("자소서 ID"),
                        fieldWithPath("[].title").description("자소서 제목"),
                        fieldWithPath("[].questions").description("자소서 질문 목록")
                        )));


    }

    @Test
    @DisplayName("자소서 삭제")
    void test4() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);

        String jws = makeJWT(user.getId());

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
                .andDo(document("essay-delete", requestHeaders(
                                headerWithName("Authorization").description("로그인 인증")
                        ), pathParameters(
                        parameterWithName("essayId").description("자소서 ID")
                )));


    }

    @Test
    @DisplayName("자소서 수정")
    void test6() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);

        String jws = makeJWT(user.getId());

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
                .andDo(document("essay-revise", requestHeaders(
                        headerWithName("Authorization").description("로그인 인증")
                        )
                        ,pathParameters(
                        parameterWithName("essayId").description("자소서 ID")
                        ),
                        requestFields(
                                fieldWithPath("title").description("수정한 자소서 제목"),
                                fieldWithPath("qnaList[].question").description("수정한 자소서 질문"),
                                fieldWithPath("qnaList[].answer").description("수정한 자소서 답변")
                        )
                        ));



    }



    private String makeJWT(Long userId) {
        SecretKey key = Keys.hmacShaKeyFor(appConfig.getJwtKey());

        String jws = Jwts.builder()
                .setSubject(String.valueOf(userId))
                .signWith(key)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtConfig.access))
                .compact();

        return jws;
    }



}
