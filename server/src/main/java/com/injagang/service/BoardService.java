package com.injagang.service;

import com.injagang.domain.Board;
import com.injagang.domain.Essay;
import com.injagang.domain.Feedback;
import com.injagang.domain.User;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.domain.qna.QnA;
import com.injagang.exception.*;
import com.injagang.repository.*;
import com.injagang.request.BoardWrite;
import com.injagang.request.FeedbackWrite;
import com.injagang.request.QnaRequest;
import com.injagang.request.ReviseFeedback;
import com.injagang.response.BoardRead;
import com.injagang.response.BoardRevise;
import com.injagang.response.FeedbackList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final QnARepository qnARepository;

    private final EssayRepository essayRepository;

    private final FeedbackRepository feedbackRepository;



    public BoardRead readBoard(Long userId,Long boardId) {

        Board board = boardRepository.findByIdWithUser(boardId).orElseThrow(BoardNotFoundException::new);


        List<BoardQnA> boardQnAList = qnARepository.findAllByBoard(board);

        return new BoardRead(userId,board, boardQnAList);

    }

    public Long writeBoard(Long userId, BoardWrite boardWrite) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Essay essay = essayRepository.findById(boardWrite.getEssayId()).orElseThrow(EssayNotFoundException::new);



        Board board = Board.builder()
                .user(user)
                .title(boardWrite.getTitle())
                .content(boardWrite.getContent())
                .essayTitle(essay.getTitle())
                .build();


        List<EssayQnA> qnaList = qnARepository.findAllByEssay(essay);

        for (EssayQnA essayQnA : qnaList) {

            board.addQnA(BoardQnA.builder()
                    .question(essayQnA.getQuestion())
                    .answer(essayQnA.getAnswer())
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

    public void writeFeedback(Long boardQnaId, Long userId, FeedbackWrite feedbackWrite) {

        BoardQnA boardQnA = qnARepository.findBoardQnaById(boardQnaId).orElseThrow(QnaNotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        Feedback feedback = Feedback.builder()
                .feedbackTarget(feedbackWrite.getFeedbackTarget())
                .feedbackContent(feedbackWrite.getFeedbackContent())
                .boardQnA(boardQnA)
                .user(user)
                .build();

        feedbackRepository.save(feedback);

    }

    public void reviseFeedback(Long userId, ReviseFeedback reviseFeedback) {

        Feedback feedback = feedbackRepository.findById(reviseFeedback.getFeedbackId()).orElseThrow(FeedbackNotFoundException::new);

        if (feedback.getUser().getId() != userId) {
            throw new UnauthorizedException();
        }


        feedback.reviseContent(reviseFeedback.getReviseContent());


    }


    public List<FeedbackList> feedbacksByQna(Long qnaId, Long userId) {

        QnA qnA = qnARepository.findById(qnaId).orElseThrow(QnaNotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        List<Feedback> feedbacks = feedbackRepository.findAllByQna(qnA);

        return feedbacks.stream().map(f -> new FeedbackList(f, user)).collect(Collectors.toList());



    }





}
