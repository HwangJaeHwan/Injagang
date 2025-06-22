package com.injagang.docs;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.domain.Essay;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.domain.user.User;
import com.injagang.helper.TestHelper;
import com.injagang.repository.*;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.EssayWrite;
import com.injagang.request.QnaRequest;
import com.injagang.service.EssayService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;


import java.util.stream.IntStream;

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
    QnARepository qnARepository;

    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    BoardRepository boardRepository;


    @Autowired
    TestHelper testHelper;

    @AfterAll
    void after() {
        qnARepository.deleteAll();
        essayRepository.deleteAll();
        userRepository.deleteAll();

    }


    @BeforeEach
    void clean() {
        qnARepository.deleteAll();
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

        String jws = testHelper.makeAccessToken(user.getId());


        EssayWrite essayWrite = EssayWrite.builder()
                .title("test essay")
                .build();

        QnaRequest qnaRequest1 = QnaRequest.builder()
                .question("question1")
                .answer("answer1")
                .build();

        essayWrite.addQna(qnaRequest1);

        QnaRequest qnaRequest2 = QnaRequest.builder()
                .question("question2")
                .answer("answer2")
                .build();

        essayWrite.addQna(qnaRequest2);


        QnaRequest qnaRequest3 = QnaRequest.builder()
                .question("question3")
                .answer("answer3")
                .build();

        essayWrite.addQna(qnaRequest3);

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

        String jws = testHelper.makeAccessToken(user.getId());

        Essay essay = Essay.builder()
                .title("test title")
                .user(user)
                .build();


        EssayQnA qna1 = EssayQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        essay.addQnA(qna1);

        EssayQnA qna2 = EssayQnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        essay.addQnA(qna2);

        EssayQnA qna3 = EssayQnA.builder()
                .question("question3")
                .answer("answer3")
                .build();

        essay.addQnA(qna3);

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
                                fieldWithPath("owner").description("작성자 판별"),
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

        String jws = testHelper.makeAccessToken(user.getId());

        IntStream.rangeClosed(1,10).forEach(

                i->{

                    Essay essay = Essay.builder()
                            .title("test title" + i)
                            .user(user)
                            .build();


                    EssayQnA qna = EssayQnA.builder()
                            .question("question" + i)
                            .answer("answer" + i)
                            .build();

                    essay.addQnA(qna);

                    essayRepository.save(essay);


                }


        );

        mockMvc.perform(get("/essay/list")
                .header("Authorization", jws))
                .andDo(document("essay-list"
                        ,responseFields(
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

        String jws = testHelper.makeAccessToken(user.getId());

        Essay essay = Essay.builder()
                .title("delete")
                .user(user)
                .build();

        EssayQnA qna = EssayQnA.builder()
                .question("question")
                .answer("answer")
                .build();

        essay.addQnA(qna);

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

        String jws = testHelper.makeAccessToken(user.getId());

        Essay essay = Essay.builder()
                .title("delete")
                .user(user)
                .build();

        EssayQnA qna1 = EssayQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        EssayQnA qna2 = EssayQnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        EssayQnA qna3 = EssayQnA.builder()
                .question("question3")
                .answer("answer3")
                .build();

        essay.addQnA(qna1);
        essay.addQnA(qna2);
        essay.addQnA(qna3);

        essayRepository.save(essay);


        EssayWrite essayWrite = EssayWrite.builder()
                .title("change")
                .build();

        QnaRequest changeQna1 = QnaRequest.builder()
                .question("questionChange1")
                .answer("answerChange1")
                .build();

        QnaRequest changeQna2 = QnaRequest.builder()
                .question("questionChange2")
                .answer("answerChange2")
                .build();

        QnaRequest changeQna3 = QnaRequest.builder()
                .question("questionChange3")
                .answer("answerChange3")
                .build();

        QnaRequest changeQna4 = QnaRequest.builder()
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






}
