package com.injagang.service;

import com.injagang.domain.Board;
import com.injagang.domain.User;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.repository.BoardRepository;
import com.injagang.repository.EssayRepository;
import com.injagang.repository.QnARepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.BoardWrite;
import com.injagang.request.QnaRequest;
import com.injagang.response.BoardRead;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
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
    BoardService boardService;

    @BeforeEach
    void clean() {
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

        BoardWrite boardWrite = BoardWrite.builder()
                .title("test board")
                .content("test board")
                .essayTitle("test essay")
                .build();

        QnaRequest qnaRequest1 = QnaRequest.builder()
                .question("question1")
                .answer("answer1")
                .build();

        QnaRequest qnaRequest2 = QnaRequest.builder()
                .question("question2")
                .answer("answer2")
                .build();

        boardWrite.addQna(qnaRequest1);
        boardWrite.addQna(qnaRequest2);

        Long boardId = boardService.writeBoard(user.getId(), boardWrite);
        Board board = boardRepository.findById(boardId).get();
        List<BoardQnA> qnAList = qnARepository.findAllByBoard(board);

        assertEquals(board.getTitle(),"test board");
        assertEquals(board.getContent(),"test board");
        assertEquals(board.getEssayTitle(), "test essay");
        assertEquals(2, qnARepository.count());
        assertEquals(2, qnAList.size());
        assertEquals("question1",qnAList.get(0).getQuestion());
        assertEquals("answer1",qnAList.get(0).getAnswer());
        assertEquals("question2",qnAList.get(1).getQuestion());
        assertEquals("answer2",qnAList.get(1).getAnswer());
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

        BoardRead read = boardService.readBoard(board.getId());

        assertEquals(board.getId(),read.getBoardId());
        assertEquals(board.getTitle(), read.getTitle());
        assertEquals(board.getContent(), read.getContent());
        assertEquals(board.getEssayTitle(),read.getEssayTitle());
        assertEquals(3, read.getQnaList().size());


    }


}