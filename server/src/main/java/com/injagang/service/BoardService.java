package com.injagang.service;

import com.injagang.domain.Board;
import com.injagang.domain.Essay;
import com.injagang.domain.Feedback;
import com.injagang.domain.User;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.exception.BoardNotFoundException;
import com.injagang.exception.QnaNotFoundException;
import com.injagang.exception.UnauthorizedException;
import com.injagang.exception.UserNotFoundException;
import com.injagang.repository.BoardRepository;
import com.injagang.repository.FeedbackRepository;
import com.injagang.repository.QnARepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.BoardWrite;
import com.injagang.request.FeedbackWrite;
import com.injagang.request.QnaRequest;
import com.injagang.response.BoardRead;
import com.injagang.response.BoardRevise;
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

    private final FeedbackRepository feedbackRepository;



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

    public void reviseBoard(Long boardId, Long userId,BoardRevise boardRevise) {


        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);

        if (userId != board.getUser().getId()) {
            throw new UnauthorizedException();
        }

        board.reviseTitle(boardRevise.getChangeTitle());
        board.reviseContent(boardRevise.getChangeContent());


    }

    public void writeFeedback(Long boardQnaId, FeedbackWrite feedbackWrite) {

        BoardQnA boardQnA = qnARepository.findBoardQnaById(boardQnaId).orElseThrow(QnaNotFoundException::new);

        Feedback feedback = Feedback.builder()
                .feedbackTarget(feedbackWrite.getFeedbackTarget())
                .feedbackContent(feedbackWrite.getFeedbackContent())
                .boardQnA(boardQnA)
                .build();

        feedbackRepository.save(feedback);

    }





}
