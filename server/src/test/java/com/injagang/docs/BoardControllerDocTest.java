package com.injagang.docs;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.injagang.domain.*;
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
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.TestInstance.*;
import static org.springframework.http.MediaType.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
@AutoConfigureRestDocs(uriScheme = "https",uriHost = "api.relaymentor.com",uriPort = 443)
@ExtendWith(RestDocumentationExtension.class)
@Transactional
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
    HashtagRepository hashtagRepository;

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
                .loginId("loginId")
                .password("test")
                .nickname("nickname")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
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
                        fieldWithPath("hashtags").description("해쉬태그"),
                        fieldWithPath("password").description("게시물 비밀번호(선택사항)").optional()
                )));

    }

    @Test
    @DisplayName("게시글 읽기")
    void test2() throws Exception {

        User user = User.builder()
                .loginId("loginId")
                .password("test")
                .nickname("nickname")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
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
                        fieldWithPath("viewCount").description("조회수"),
                        fieldWithPath("likes").description("좋아요"),
                        fieldWithPath("liked").description("좋아요 여부"),
                        fieldWithPath("hashtags").description("해쉬태그"),
                        fieldWithPath("owner").description("작성자 판별"),
                        fieldWithPath("createdAt").description("작성 시간"),
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
                .loginId("loginId")
                .password("test")
                .nickname("nickname")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
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

        Hashtag 백엔드 = hashtagRepository.save(new Hashtag("백엔드"));

        board.getBoardHashtags().add(new BoardHashtag(board, 백엔드));


        boardRepository.save(board);

        BoardRevise revise = BoardRevise.builder()
                .boardId(board.getId())
                .changeTitle("change title")
                .changeContent("change content")
                .build();

        revise.getHashtags().add("백엔드");
        revise.getHashtags().add("스프링");
        revise.getHashtags().add("신입");

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
                        fieldWithPath("changeContent").description("수정할 게시물 내용"),
                        fieldWithPath("hashtags").description("수정할 해시 태그")
                )));

    }


    @Test
    @DisplayName("게시물 리스트")
    void test7() throws Exception {

        User user = User.builder()
                .loginId("loginId")
                .password("test")
                .nickname("nickname")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();

        userRepository.save(user);

        Hashtag 테스트 = new Hashtag("테스트");
        hashtagRepository.save(테스트);

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
                    board.addHashtag(테스트);

                    boardRepository.save(board);
                }


        );


        mockMvc.perform(get("/board?page=1&type=title&content=test"))
                .andDo(document("board-list", requestParameters(
                        parameterWithName("page").description("현재 페이지"),
                        parameterWithName("type").description("검색 타입(title/writer/hashtag)"),
                        parameterWithName("content").description("검색 내용")
                ), responseFields(
                        fieldWithPath("totalPage").description("총 페이지 수"),
                        fieldWithPath("boardInfos[].id").description("게시글 ID"),
                        fieldWithPath("boardInfos[].title").description("게시글 제목"),
                        fieldWithPath("boardInfos[].nickname").description("작성자 닉네임"),
                        fieldWithPath("boardInfos[].isLock").description("비밀번호 여부"),
                        fieldWithPath("boardInfos[].isNotice").description("공지사항 판별"),
                        fieldWithPath("boardInfos[].createdAt").description("작성 시간"),
                        fieldWithPath("boardInfos[].qnaCount").description("질문 수"),
                        fieldWithPath("boardInfos[].viewCount").description("조회수"),
                        fieldWithPath("boardInfos[].content").description("게시글 내용"),
                        fieldWithPath("boardInfos[].likes").description("좋아요 수"),
                        fieldWithPath("boardInfos[].hashtags").description("해쉬태그"),
                        fieldWithPath("isFirst").description("첫 페이지 확인"),
                        fieldWithPath("isLast").description("마지막 페이지 확인")
                )));

    }

    @Test
    @DisplayName("게시글 삭제")
    void test8() throws Exception {
        User user = User.builder()
                .loginId("loginId")
                .password("test")
                .nickname("nickname")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
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

    @Test
    @DisplayName("내 게시물 리스트")
    void test11() throws Exception {


        User user = User.builder()
                .loginId("loginId")
                .password("test")
                .nickname("nickname")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();

        userRepository.save(user);

        String jws = testHelper.makeAccessToken(user.getId());

        List<Board> boards = new ArrayList<>();

        IntStream.rangeClosed(1, 3).forEach(
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


                    boards.add(board);
                }

        );

        boardRepository.saveAll(boards);

        mockMvc.perform(get("/board/me")
                        .param("page", "1")
                        .header("Authorization", jws))
                .andExpect(status().isOk())
                .andDo(document("board-my"
                        , requestHeaders(
                                headerWithName("Authorization").description("로그인 인증")
                        ),
                        requestParameters(
                                parameterWithName("page").description("현재 페이지")
                        ),
                        responseFields(
                                fieldWithPath("totalPage").description("총 페이지 수"),
                                fieldWithPath("boardInfos[].id").description("게시글 ID"),
                                fieldWithPath("boardInfos[].title").description("게시글 제목"),
                                fieldWithPath("boardInfos[].nickname").description("작성자 닉네임"),
                                fieldWithPath("boardInfos[].isLock").description("비밀번호 여부"),
                                fieldWithPath("boardInfos[].isNotice").description("공지사항 판별"),
                                fieldWithPath("boardInfos[].createdAt").description("작성 시간"),
                                fieldWithPath("boardInfos[].qnaCount").description("질문 수"),
                                fieldWithPath("boardInfos[].viewCount").description("조회수"),
                                fieldWithPath("boardInfos[].content").description("게시글 내용"),
                                fieldWithPath("boardInfos[].likes").description("좋아요 수"),
                                fieldWithPath("boardInfos[].hashtags").description("해쉬태그"),
                                fieldWithPath("isFirst").description("첫 페이지 확인"),
                                fieldWithPath("isLast").description("마지막 페이지 확인")
                        )));




    }


    @Test
    @DisplayName("게시글 좋아요")
    void test12() throws Exception {

        User user = User.builder()
                .loginId("loginId")
                .password("test")
                .nickname("nickname")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
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

        boardRepository.save(board);

        mockMvc.perform(post("/board/{boardId}/like", board.getId())
                        .header("Authorization", jws))
                .andExpect(status().isOk())
                .andDo(document("board-like"
                        , requestHeaders(
                                headerWithName("Authorization").description("로그인 인증")
                        ),pathParameters(
                                parameterWithName("boardId").description("게시글 ID")
                        )));

    }

}
