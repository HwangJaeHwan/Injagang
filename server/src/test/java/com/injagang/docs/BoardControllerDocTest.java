package com.injagang.docs;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.domain.Board;
import com.injagang.domain.Essay;
import com.injagang.domain.Feedback;
import com.injagang.domain.user.User;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.domain.user.UserType;
import com.injagang.helper.TestHelper;
import com.injagang.repository.*;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.BoardWrite;
import com.injagang.request.FeedbackWrite;
import com.injagang.request.ReviseFeedback;
import com.injagang.response.BoardRevise;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.stream.IntStream;

import static org.junit.jupiter.api.TestInstance.*;
import static org.springframework.http.MediaType.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
@AutoConfigureRestDocs(uriScheme = "https",uriHost = "api.injagang.com",uriPort = 443)
@ExtendWith(RestDocumentationExtension.class)
@ActiveProfiles("test")
public class BoardControllerDocTest {



    @Autowired
    MockMvc mockMvc;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    QnARepository qnARepository;

    @Autowired
    BoardRepository boardRepository;


    @Autowired
    EssayRepository essayRepository;

    @Autowired
    FeedbackRepository feedbackRepository;


    @Autowired
    TestHelper testHelper;


    @AfterAll
    void after() {
        feedbackRepository.deleteAll();
        qnARepository.deleteAll();
        essayRepository.deleteAll();
        boardRepository.deleteAll();
        userRepository.deleteAll();

    }

    @BeforeEach
    void clean() {
        feedbackRepository.deleteAll();
        qnARepository.deleteAll();
        essayRepository.deleteAll();
        boardRepository.deleteAll();
        userRepository.deleteAll();

    }

    @Test
    @DisplayName("게시글 쓰기")
    void test() throws Exception{
        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .type(UserType.USER)
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

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

        String jws = testHelper.makeAccessToken(user.getId());

        BoardWrite boardWrite = BoardWrite.builder()
                .title("test board")
                .content("test board")
                .essayId(essay.getId())
                .password("test")
                .build();


        String json = objectMapper.writeValueAsString(boardWrite);

        mockMvc.perform(post("/board/write")
                        .contentType(APPLICATION_JSON)
                        .header("Authorization", jws)
                        .content(json))
                .andDo(document("board-write", requestHeaders(
                        headerWithName("Authorization").description("로그인 인증")
                ), requestFields(
                        fieldWithPath("title").description("게시물 제목"),
                        fieldWithPath("content").description("게시물 내용"),
                        fieldWithPath("essayId").description("불러올 자소서 ID"),
                        fieldWithPath("password").description("게시물 비밀번호(선택사항)").optional()
                )));

    }

    @Test
    @DisplayName("게시글 읽기")
    void test2() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .type(UserType.USER)
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
                .andDo(document("board-read", requestHeaders(
                        headerWithName("Authorization").description("로그인 인증")
                ), pathParameters(
                        parameterWithName("boardId").description("게시글 ID")
                ), requestParameters(
                        parameterWithName("password")
                                .description("게시글 비밀번호 (선택사항)")
                                .optional()
                ), responseFields(
                        fieldWithPath("boardId").description("게시글 ID"),
                        fieldWithPath("title").description("게시글 제목"),
                        fieldWithPath("content").description("게시글 내용"),
                        fieldWithPath("userId").description("작성자 ID"),
                        fieldWithPath("nickname").description("작성자 닉네임"),
                        fieldWithPath("owner").description("작성자 판별"),
                        fieldWithPath("essayTitle").description("게시글 자소서 제목"),
                        fieldWithPath("qnaList[].qnaId").description("게시글 자소서 ID"),
                        fieldWithPath("qnaList[].question").description("게시글 자소서 제목"),
                        fieldWithPath("qnaList[].answer").description("게시글 자소서 답변")
                )));


    }

    @Test
    @DisplayName("게시글 수정")
    void test3() throws Exception{


        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .type(UserType.USER)
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        Board board = Board.builder()
                .title("test board")
                .content("test content")
                .user(user)
                .essayTitle("test essay title")
                .build();


        board.addQnA(BoardQnA.builder()
                .question("question1")
                .answer("answer1")
                .build());

        board.addQnA(BoardQnA.builder()
                .question("question2")
                .answer("answer2")
                .build());

        boardRepository.save(board);

        BoardRevise revise = BoardRevise.builder()
                .boardId(board.getId())
                .changeTitle("change title")
                .changeContent("change content")
                .build();

        String json = objectMapper.writeValueAsString(revise);

        mockMvc.perform(patch("/board/revise")
                        .header("Authorization", jws)
                        .content(json)
                        .contentType(APPLICATION_JSON))
                .andDo(document("board-revise", requestHeaders(
                        headerWithName("Authorization").description("로그인 인증")
                ), requestFields(
                        fieldWithPath("boardId").description("수정할 게시물 ID"),
                        fieldWithPath("changeTitle").description("수정할 게시물 제목"),
                        fieldWithPath("changeContent").description("수정할 게시물 내용")
                )));

    }

    @Test
    @DisplayName("피드백 쓰기")
    void test4() throws Exception{


        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .type(UserType.USER)
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        Board board = Board.builder()
                .title("test board")
                .content("test content")
                .user(user)
                .essayTitle("test essay title")
                .build();


        BoardQnA qna1 = BoardQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        board.addQnA(qna1);

        boardRepository.save(board);

        FeedbackWrite write = FeedbackWrite.builder()
                .qnaId(qna1.getId())
                .feedbackTarget("target")
                .feedbackContent("content")
                .build();

        String json = objectMapper.writeValueAsString(write);

        mockMvc.perform(post("/board/feedback", qna1.getId())
                        .header("Authorization", jws)
                        .content(json)
                        .contentType(APPLICATION_JSON))
                .andDo(document("feedback-write", requestHeaders(
                                headerWithName("Authorization").description("로그인 인증")
                        ),requestFields(
                                fieldWithPath("qnaId").description("피드백 작성할 QnA ID"),
                                fieldWithPath("feedbackTarget").description("피드백 타겟"),
                                fieldWithPath("feedbackContent").description("피드백 내용")
                        ))
                );

    }

    @Test
    @DisplayName("피드백 수정")
    void test5() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .type(UserType.USER)
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        Board board = Board.builder()
                .title("test board")
                .content("test content")
                .user(user)
                .essayTitle("test essay title")
                .build();


        BoardQnA qna1 = BoardQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        board.addQnA(qna1);

        boardRepository.save(board);


        Feedback feedback = Feedback.builder()
                .user(user)
                .boardQnA(qna1)
                .feedbackTarget("target")
                .feedbackContent("content")
                .build();

        feedbackRepository.save(feedback);

        ReviseFeedback revise = ReviseFeedback.builder()
                .feedbackId(feedback.getId())
                .reviseContent("revise")
                .build();

        String json = objectMapper.writeValueAsString(revise);

        mockMvc.perform(patch("/board/feedback/revise")
                        .header("Authorization", jws)
                        .contentType(APPLICATION_JSON)
                        .content(json))
                .andDo(document("feedback-revise", requestHeaders(
                        headerWithName("Authorization").description("로그인 인증")
                ), requestFields(
                        fieldWithPath("feedbackId").description("수정할 피드백 ID"),
                        fieldWithPath("reviseContent").description("수정할 피드백 내용")
                )));

    }

    @Test
    @DisplayName("피드백 리스트")
    void test6() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .type(UserType.USER)
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        User user2 = User.builder()
                .loginId("test2")
                .password("test2")
                .nickname("test2")
                .type(UserType.USER)
                .email("test@gmail.com")
                .build();

        userRepository.save(user);
        userRepository.save(user2);

        String jws = testHelper.makeAccessToken(user.getId());

        Board board = Board.builder()
                .title("test board")
                .content("test content")
                .user(user)
                .essayTitle("test essay title")
                .build();


        BoardQnA qna1 = BoardQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        board.addQnA(qna1);

        BoardQnA qna2 = BoardQnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        board.addQnA(qna2);

        boardRepository.save(board);

        Feedback feedback1 = Feedback.builder()
                .user(user)
                .boardQnA(qna1)
                .feedbackTarget("target1")
                .feedbackContent("content1")
                .build();

        Feedback feedback2 = Feedback.builder()
                .user(user)
                .boardQnA(qna1)
                .feedbackTarget("target2")
                .feedbackContent("content2")
                .build();

        Feedback feedback3 = Feedback.builder()
                .user(user)
                .boardQnA(qna1)
                .feedbackTarget("target3")
                .feedbackContent("content3")
                .build();

        Feedback feedback4 = Feedback.builder()
                .user(user2)
                .boardQnA(qna1)
                .feedbackTarget("target4")
                .feedbackContent("content4")
                .build();

        feedbackRepository.save(feedback1);
        feedbackRepository.save(feedback2);
        feedbackRepository.save(feedback3);
        feedbackRepository.save(feedback4);

        mockMvc.perform(get("/board/feedback/{qnaId}", qna1.getId())
                        .header("Authorization", jws))
                .andDo(document("feedback-list", requestHeaders(
                        headerWithName("Authorization").description("로그인 인증")
                ),pathParameters(
                        parameterWithName("qnaId").description("타겟 QnA")
                ),responseFields(
                        fieldWithPath("[].feedbackId").description("피드백 ID"),
                        fieldWithPath("[].target").description("피드백 타겟"),
                        fieldWithPath("[].content").description("피드백 내용"),
                        fieldWithPath("[].owner").description("작성자 판별")
                )));


    }

    @Test
    @DisplayName("게시물 리스트")
    void test7() throws Exception {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .type(UserType.USER)
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        IntStream.rangeClosed(1, 30).forEach(
                i->{
                    Board board = Board.builder()
                            .title("test board " + i)
                            .content("test content")
                            .user(user)
                            .essayTitle("test essay title")
                            .build();


                    BoardQnA qna1 = BoardQnA.builder()
                            .question("question1")
                            .answer("answer1")
                            .build();

                    board.addQnA(qna1);


                    boardRepository.save(board);
                }


        );


        mockMvc.perform(get("/board?page=1&type=title&content=test"))
                .andDo(document("board-list", requestParameters(
                        parameterWithName("page").description("현재 페이지"),
                        parameterWithName("type").description("검색 타입(title/writer)"),
                        parameterWithName("content").description("검색 내용")
                ), responseFields(
                        fieldWithPath("totalPage").description("총 페이지 수"),
                        fieldWithPath("boardInfos[].id").description("게시글 ID"),
                        fieldWithPath("boardInfos[].title").description("게시글 제목"),
                        fieldWithPath("boardInfos[].nickname").description("작성자 닉네임"),
                        fieldWithPath("boardInfos[].isLock").description("비밀번호 여부"),
                        fieldWithPath("boardInfos[].isNotice").description("공지사항 판별"),
                        fieldWithPath("isFirst").description("첫 페이지 확인"),
                        fieldWithPath("isLast").description("마지막 페이지 확인")
                )));

    }

    @Test
    @DisplayName("게시글 삭제")
    void test8() throws Exception {
        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .type(UserType.USER)
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());


        Board board = Board.builder()
                .title("test board")
                .content("test content")
                .user(user)
                .essayTitle("test essay title")
                .build();


        BoardQnA qna1 = BoardQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        board.addQnA(qna1);

        BoardQnA qna2 = BoardQnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        board.addQnA(qna2);

        BoardQnA qna3 = BoardQnA.builder()
                .question("question3")
                .answer("answer3")
                .build();

        board.addQnA(qna3);

        boardRepository.save(board);

        Feedback feedback1 = Feedback.builder()
                .user(user)
                .boardQnA(qna1)
                .feedbackTarget("target1")
                .feedbackContent("content1")
                .build();

        Feedback feedback2 = Feedback.builder()
                .user(user)
                .boardQnA(qna1)
                .feedbackTarget("target2")
                .feedbackContent("content2")
                .build();

        Feedback feedback3 = Feedback.builder()
                .user(user)
                .boardQnA(qna2)
                .feedbackTarget("target3")
                .feedbackContent("content3")
                .build();

        Feedback feedback4 = Feedback.builder()
                .user(user)
                .boardQnA(qna3)
                .feedbackTarget("target4")
                .feedbackContent("content4")
                .build();

        feedbackRepository.save(feedback1);
        feedbackRepository.save(feedback2);
        feedbackRepository.save(feedback3);
        feedbackRepository.save(feedback4);


        mockMvc.perform(delete("/board/{boardId}", board.getId())
                        .header("Authorization", jws))
                .andDo(document("board-delete",requestHeaders(
                        headerWithName("Authorization").description("로그인 인증")
                ),pathParameters(
                        parameterWithName("boardId").description("삭제할 게시글 ID")
                )));

    }
}
