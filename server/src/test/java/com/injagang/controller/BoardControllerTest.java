package com.injagang.controller;

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
import com.injagang.response.QnAInfo;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.TestInstance.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@TestInstance(Lifecycle.PER_CLASS)
@AutoConfigureMockMvc
@Transactional
@ActiveProfiles("test")
class BoardControllerTest {


    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    QnARepository qnARepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    HashtagRepository hashtagRepository;

    @Autowired
    BoardHashtagRepository boardHashtagRepository;

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    TestHelper testHelper;


    @Autowired
    EssayRepository essayRepository;

    @AfterAll
    void after() {
        likeRepository.deleteAll();
        feedbackRepository.deleteAll();
        qnARepository.deleteAll();
        essayRepository.deleteAll();
        boardRepository.deleteAll();
        userRepository.deleteAll();
    }

    @BeforeEach
    void clean() {
        likeRepository.deleteAll();
        feedbackRepository.deleteAll();
        qnARepository.deleteAll();
        essayRepository.deleteAll();
        boardRepository.deleteAll();
        userRepository.deleteAll();
    }


    @Test
    @DisplayName("/write 게시글 작성하기")
    void test() throws Exception {

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
                .build();


        String json = objectMapper.writeValueAsString(boardWrite);

        mockMvc.perform(post("/board/write")
                        .contentType(APPLICATION_JSON)
                        .header("Authorization", jws)
                        .content(json))
                .andExpect(status().isOk())
                .andDo(print());


    }


    @Test
    @DisplayName("/write 게시글 작성하기 패스워드 포함")
    void test_password() throws Exception {

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
                .andExpect(status().isOk())
                .andDo(print());


    }



    @Test
    @DisplayName("/{boardId} 해당 게시글을 읽는다")
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
                .viewCount(0L)
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
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.boardId").value(board.getId()))
                .andExpect(jsonPath("$.title").value("test board"))
                .andExpect(jsonPath("$.content").value("test content"))
                .andExpect(jsonPath("$.essayTitle").value("test essay"))
                .andExpect(jsonPath("$.qnaList[0].question").value("question1"))
                .andExpect(jsonPath("$.qnaList[0].answer").value("answer1"))
                .andExpect(jsonPath("$.qnaList[1].question").value("question2"))
                .andExpect(jsonPath("$.qnaList[1].answer").value("answer2"))
                .andExpect(jsonPath("$.qnaList[2].question").value("question3"))
                .andExpect(jsonPath("$.qnaList[2].answer").value("answer3"))
                .andDo(print());


    }


    @Test
    @DisplayName("/{boardId} 해당 게시글을 읽는다 패스워드")
    void test_read_password() throws Exception {


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

        Hashtag hashtag = new Hashtag("백엔드");

        hashtagRepository.save(hashtag);

        String jws = testHelper.makeAccessToken(user.getId());

        Board board = Board.builder()
                .title("test board")
                .content("test content")
                .essayTitle("test essay")
                .user(user)
                .password(encoder.encode("test"))
                .viewCount(0L)
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

        boardHashtagRepository.save(new BoardHashtag(board, hashtag));


        mockMvc.perform(get("/board/{boardId}", board.getId())
                        .header("Authorization", jws).queryParam("password", "test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.boardId").value(board.getId()))
                .andExpect(jsonPath("$.title").value("test board"))
                .andExpect(jsonPath("$.content").value("test content"))
                .andExpect(jsonPath("$.essayTitle").value("test essay"))
                .andExpect(jsonPath("$.userId").value(user.getId()))
                .andExpect(jsonPath("$.owner").value(true))
                .andExpect(jsonPath("$.viewCount").value(1L))
                .andExpect(jsonPath("$.qnaList[0].question").value("question1"))
                .andExpect(jsonPath("$.qnaList[0].answer").value("answer1"))
                .andExpect(jsonPath("$.qnaList[1].question").value("question2"))
                .andExpect(jsonPath("$.qnaList[1].answer").value("answer2"))
                .andExpect(jsonPath("$.qnaList[2].question").value("question3"))
                .andExpect(jsonPath("$.qnaList[2].answer").value("answer3"))
                .andExpect(jsonPath("$.hashtags[0]").value("백엔드"))
                .andDo(print());


    }


    @Test
    @DisplayName("/revise 게시글 수정")
    void test3() throws Exception {

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
                .andExpect(status().isOk())
                .andDo(print());



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
        Hashtag 백엔드 = new Hashtag("백엔드");
        hashtagRepository.save(테스트);
        hashtagRepository.save(백엔드);

        IntStream.rangeClosed(1, 107).forEach(
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
                    board.addHashtag(백엔드);


                    boardRepository.save(board);
                }


        );

        mockMvc.perform(get("/board"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalPage").value(9L))
                .andExpect(jsonPath("$.boardInfos.length()").value(12L))
                .andDo(print());


    }

    @Test
    @DisplayName("게시물 리스트 title")
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

        IntStream.rangeClosed(1, 100).forEach(
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

        mockMvc.perform(get("/board")
                        .param("type","title")
                        .param("content","1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalPage").value(2L))
                .andExpect(jsonPath("$.boardInfos.length()").value(12L))
                .andExpect(jsonPath("$.isFirst").value(true))
                .andExpect(jsonPath("$.isLast").value(false))
                .andDo(print());


    }

    @Test
    @DisplayName("게시물 리스트 writer")
    void test9() throws Exception {


        User user1 = User.builder()
                .loginId("loginId")
                .password("test")
                .nickname("writer")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();
        userRepository.save(user1);

        User user2 = User.builder()
                .loginId("loginId2")
                .password("test")
                .nickname("nickname2")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();

        userRepository.save(user2);

        IntStream.rangeClosed(1, 30).forEach(
                i->{
                    Board board = Board.builder()
                            .title("test board " + i)
                            .content("test content")
                            .user(user1)
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

        IntStream.rangeClosed(1, 30).forEach(
                i->{
                    Board board = Board.builder()
                            .title("writer board " + i)
                            .content("test content")
                            .user(user2)
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

        mockMvc.perform(get("/board")
                        .param("type","writer")
                        .param("content","writer"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalPage").value(3L))
                .andExpect(jsonPath("$.boardInfos.length()").value(12L))
                .andExpect(jsonPath("$.isFirst").value(true))
                .andExpect(jsonPath("$.isLast").value(false))
                .andExpect(jsonPath("$.boardInfos[0].nickname").value("writer"))
                .andDo(print());


    }

    @Test
    @DisplayName("게시물 리스트 hashtag")
    void test13() throws Exception {


        User user1 = User.builder()
                .loginId("loginId")
                .password("test")
                .nickname("writer")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();
        userRepository.save(user1);

        User user2 = User.builder()
                .loginId("loginId2")
                .password("test")
                .nickname("nickname2")
                .birthday(LocalDate.now())
                .type(UserType.USER)
                .terms(true)
                .policy(true)
                .build();

        userRepository.save(user2);

        Hashtag 백엔드 = hashtagRepository.save(new Hashtag("백엔드"));


        IntStream.rangeClosed(1, 30).forEach(
                i->{
                    Board board = Board.builder()
                            .title("test board " + i)
                            .content("test content")
                            .user(user1)
                            .essayTitle("test essay title")
                            .build();


                    BoardQnA qna1 = BoardQnA.builder()
                            .question("question1")
                            .answer("answer1")
                            .build();

                    board.addQnA(qna1);

                    if (i % 2 == 0) {
                        board.getBoardHashtags().add(new BoardHashtag(board, 백엔드));
                    }


                    boardRepository.save(board);
                }


        );


        mockMvc.perform(get("/board")
                        .param("type","hashtag")
                        .param("content","백엔드"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalPage").value(2L))
                .andExpect(jsonPath("$.boardInfos.length()").value(12L))
                .andExpect(jsonPath("$.isFirst").value(true))
                .andExpect(jsonPath("$.isLast").value(false))
                .andDo(print());


    }

    @Test
    @DisplayName("/{boardId} 게시물 삭제")
    void test10() throws Exception{

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
                .andExpect(status().isOk())
                .andDo(print());


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

        IntStream.rangeClosed(1, 10).forEach(
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
                        .param("page","2")
                        .header("Authorization", jws))
                .andExpect(status().isOk())
                .andDo(print());


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
                .andDo(print());

    }

}