package com.injagang.service;

import com.injagang.domain.Board;
import com.injagang.domain.Essay;
import com.injagang.domain.Feedback;
import com.injagang.domain.User;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.repository.*;
import com.injagang.request.BoardWrite;
import com.injagang.request.FeedbackWrite;
import com.injagang.request.QnaRequest;
import com.injagang.request.ReviseFeedback;
import com.injagang.response.BoardRead;
import com.injagang.response.BoardRevise;
import com.injagang.response.FeedbackList;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.TestInstance.*;

@SpringBootTest
@TestInstance(Lifecycle.PER_CLASS)
class BoardServiceTest {


    @Autowired
    UserRepository userRepository;

    @Autowired
    EssayRepository essayRepository;

    @Autowired
    QnARepository qnARepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    BoardService boardService;

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
    @DisplayName("게시글 작성")
    void test() {


        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .role("USER")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        Essay essay = Essay.builder()
                .title("test essay")
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


        BoardWrite boardWrite = BoardWrite.builder()
                .title("test board")
                .content("test board")
                .essayId(essay.getId())
                .build();

        Long boardId = boardService.writeBoard(user.getId(), boardWrite);
        Board board = boardRepository.findById(boardId).get();
        List<BoardQnA> qnAList = qnARepository.findAllByBoard(board);


        assertEquals(board.getTitle(),"test board");
        assertEquals(board.getContent(),"test board");
        assertEquals(board.getEssayTitle(), "test essay");
        assertEquals(3, qnAList.size());
        assertEquals("question1",qnAList.get(0).getQuestion());
        assertEquals("answer1",qnAList.get(0).getAnswer());
        assertEquals("question2",qnAList.get(1).getQuestion());
        assertEquals("answer2",qnAList.get(1).getAnswer());
        assertEquals("question3",qnAList.get(2).getQuestion());
        assertEquals("answer3",qnAList.get(2).getAnswer());
    }

    @Test
    @DisplayName("게시글 읽기")
    void test2() {


        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .role("USER")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

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

        BoardRead read = boardService.readBoard(user.getId(), board.getId());

        assertEquals(board.getId(),read.getBoardId());
        assertEquals(board.getTitle(), read.getTitle());
        assertEquals(board.getContent(), read.getContent());
        assertEquals(board.getEssayTitle(),read.getEssayTitle());
        assertTrue(read.isOwner());
        assertEquals(3, read.getQnaList().size());


    }

    @Test
    @DisplayName("게시글 수정")
    void test3() {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .role("USER")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);


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

        boardService.reviseBoard(user.getId(), revise);

        Board changeBoard = boardRepository.findById(board.getId()).get();
        assertEquals("change title", changeBoard.getTitle());
        assertEquals("change content", changeBoard.getContent());

    }


    @Test
    @DisplayName("피드백 쓰기")
    void test4() {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .role("USER")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

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

        FeedbackWrite feedbackWrite = FeedbackWrite.builder()
                .qnaId(qna1.getId())
                .feedbackTarget("feedback target")
                .feedbackContent("feedback content")
                .build();

        boardService.writeFeedback(user.getId(),feedbackWrite);

        List<Feedback> feedbacks = feedbackRepository.findAllByQna(qna1);

        assertEquals(1, feedbacks.size());
        assertEquals("feedback target", feedbacks.get(0).getFeedbackTarget());
        assertEquals("feedback content", feedbacks.get(0).getFeedbackContent());



    }

    @Test
    @DisplayName("피드백 수정")
    void test5() {


        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .role("USER")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

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

        boardService.reviseFeedback(user.getId(), revise);

        Feedback reviseFeedback = feedbackRepository.findById(feedback.getId()).get();

        assertEquals("revise", reviseFeedback.getFeedbackContent());




    }

    @Test
    @DisplayName("피드백 리스트")
    void test6() {


        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .role("USER")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);

        User user2 = User.builder()
                .loginId("test2")
                .password("test2")
                .nickname("test2")
                .role("USER")
                .email("test@gmail.com")
                .build();

        userRepository.save(user);
        userRepository.save(user2);

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

        List<FeedbackList> feedbackList = boardService.feedbacksByQna(user.getId(), qna1.getId());

        assertEquals(4, feedbackList.size());
        assertEquals(feedback1.getId(),feedbackList.get(0).getFeedbackId());
        assertEquals("target1", feedbackList.get(0).getTarget());
        assertEquals("content1", feedbackList.get(0).getContent());
        assertTrue(feedbackList.get(0).isOwner());

        assertEquals(feedback2.getId(),feedbackList.get(1).getFeedbackId());
        assertEquals("target2", feedbackList.get(1).getTarget());
        assertEquals("content2", feedbackList.get(1).getContent());
        assertTrue(feedbackList.get(1).isOwner());

        assertEquals(feedback3.getId(),feedbackList.get(2).getFeedbackId());
        assertEquals("target3", feedbackList.get(2).getTarget());
        assertEquals("content3", feedbackList.get(2).getContent());
        assertTrue(feedbackList.get(2).isOwner());

        assertEquals(feedback4.getId(),feedbackList.get(3).getFeedbackId());
        assertEquals("target4", feedbackList.get(3).getTarget());
        assertEquals("content4", feedbackList.get(3).getContent());
        assertFalse(feedbackList.get(3).isOwner());

    }


}