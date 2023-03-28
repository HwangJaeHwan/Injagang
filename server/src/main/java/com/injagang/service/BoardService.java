package com.injagang.service;

import com.injagang.domain.Board;
import com.injagang.domain.Essay;
import com.injagang.domain.User;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.exception.BoardNotFoundException;
import com.injagang.exception.UserNotFoundException;
import com.injagang.repository.BoardRepository;
import com.injagang.repository.QnARepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.BoardWrite;
import com.injagang.request.QnaRequest;
import com.injagang.response.BoardRead;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final QnARepository qnARepository;



    public BoardRead readBoard(Long boardId) {

        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);
        List<BoardQnA> boardQnAList = qnARepository.findAllByBoard(board);

        return new BoardRead(board, boardQnAList);

    }

    public Long writeBoard(Long userId, BoardWrite boardWrite) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        Board board = Board.builder()
                .user(user)
                .title(boardWrite.getTitle())
                .content(boardWrite.getContent())
                .essayTitle(boardWrite.getEssayTitle())
                .build();

        for (QnaRequest qna : boardWrite.getQnaList()) {

            board.addQnA(BoardQnA.builder()
                    .question(qna.getQuestion())
                    .answer(qna.getAnswer())
                    .build());

        }

        Board save = boardRepository.save(board);

        return save.getId();

    }





}
