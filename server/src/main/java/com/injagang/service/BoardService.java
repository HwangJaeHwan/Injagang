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
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.*;
import com.injagang.response.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
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


    public BoardList boardList(PageDTO pageDTO, SearchDTO searchDTO) {

        log.info("search type = {}", searchDTO.getType());
        log.info("search content = {}", searchDTO.getContent());

        Page<Board> boards = boardRepository.boardList(pageDTO, searchDTO);
        log.info("first = {}",boards.isFirst());
        log.info("last = {}",boards.isLast());

        return BoardList.builder()
                .totalPage(boards.getTotalPages())
                .boardInfos(boards.map(BoardListInfo::new).getContent())
                .isFirst(boards.isFirst())
                .isLast(boards.isLast())
                .build();

    }



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

    public void reviseBoard(Long userId, BoardRevise boardRevise) {


        Board board = boardRepository.findById(boardRevise.getBoardId()).orElseThrow(BoardNotFoundException::new);

        if (userId != board.getUser().getId()) {
            throw new UnauthorizedException();
        }

        board.reviseTitle(boardRevise.getChangeTitle());
        board.reviseContent(boardRevise.getChangeContent());


    }

    public void writeFeedback(Long userId, FeedbackWrite feedbackWrite) {

        BoardQnA boardQnA = qnARepository.findBoardQnaById(feedbackWrite.getQnaId()).orElseThrow(QnaNotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        Feedback feedback = Feedback.builder()
                .feedbackTarget(feedbackWrite.getFeedbackTarget())
                .feedbackContent(feedbackWrite.getFeedbackContent())
                .boardQnA(boardQnA)
                .user(user)
                .build();

        feedbackRepository.save(feedback);

    }

    public void reviseFeedback(Long userId,ReviseFeedback reviseFeedback) {

        Feedback feedback = feedbackRepository.findById(reviseFeedback.getFeedbackId()).orElseThrow(FeedbackNotFoundException::new);

        if (feedback.getUser().getId() != userId) {
            throw new UnauthorizedException();
        }


        feedback.reviseContent(reviseFeedback.getReviseContent());


    }


    public List<FeedbackList> feedbacksByQna(Long userId, Long qnaId) {

        QnA qnA = qnARepository.findById(qnaId).orElseThrow(QnaNotFoundException::new);
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        List<Feedback> feedbacks = feedbackRepository.findAllByQna(qnA);

        return feedbacks.stream().map(f -> new FeedbackList(f, user)).collect(Collectors.toList());



    }

    public void deleteBoard(Long userId, Long boardId){

        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);

        if (board.getUser().getId() != userId) {
            throw new UnauthorizedException();
        }

        List<BoardQnA> qnAList = qnARepository.findAllByBoard(board);

        feedbackRepository.deleteFeedbacksInQnAs(qnAList);

        qnARepository.deleteBoardQnAsIn(qnAList);

        boardRepository.delete(board);

    }








}
