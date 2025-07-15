package com.injagang.service;

import com.injagang.domain.Board;
import com.injagang.domain.Essay;
import com.injagang.domain.Feedback;
import com.injagang.domain.user.User;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.domain.qna.QnA;
import com.injagang.domain.user.UserType;
import com.injagang.exception.*;
import com.injagang.repository.*;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.*;
import com.injagang.response.*;
import io.micrometer.core.annotation.Counted;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

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
    private final PasswordEncoder encoder;


    public BoardList boardList(PageDTO pageDTO, SearchDTO searchDTO) {

        log.info("게시판 리스트 조회 시도 → page={}, type={}, content={}",
                pageDTO.getPage(),
                searchDTO.getType(),
                searchDTO.getContent());

        Page<Board> boards = boardRepository.boardList(pageDTO, searchDTO);

        log.info("게시판 리스트 조회 완료 → elementsOnPage={}, totalElements={}, totalPages={}",
                boards.getNumberOfElements(),
                boards.getTotalElements(),
                boards.getTotalPages());

        return BoardList.builder()
                .totalPage(boards.getTotalPages())
                .boardInfos(boards.map(BoardListInfo::new).getContent())
                .isFirst(boards.isFirst())
                .isLast(boards.isLast())
                .build();
    }


    public BoardRead readBoard(Long userId, Long boardId, String password) {
        log.info("게시글 조회 시도 → boardId={}, userId={}, passwordPresent={}",
                boardId, userId, StringUtils.hasText(password));

        Board board = boardRepository.findByIdWithUser(boardId)
                .orElseThrow(() -> {
                    log.warn("게시글 조회 실패(게시물이 존재하지 않음) → boardId={}", boardId);
                    return new BoardNotFoundException();
                });

        if (userId == null && !board.getUser().getType().equals(UserType.ADMIN)) {
            log.warn("게시글을 열람할 권한 없음 → boardID={}",  board.getId());
            throw new UnauthorizedException();
        }

        if (board.getPassword() != null) {
            if (!StringUtils.hasText(password) || !encoder.matches(password, board.getPassword())) {
                log.warn("비밀번호 불일치 → boardId={}, providedPassword={}", boardId, password);
                throw new InvalidBoardPasswordException();
            }
        }

        List<BoardQnA> boardQnAList = qnARepository.findAllByBoard(board);

        log.info("게시글 조회 성공 → boardId={}", boardId);

        return new BoardRead(userId, board, boardQnAList);
    }

    @Counted("post")
    public Long writeBoard(Long userId, BoardWrite boardWrite) {

        log.info("게시글 작성 시도 → userId={}, essayId={}, title={}",
                userId, boardWrite.getEssayId(), boardWrite.getTitle());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("게시글 작성 실패(사용자 없음) → userId={}", userId);
                    return new UserNotFoundException();
                });

        Essay essay = essayRepository.findById(boardWrite.getEssayId())
                .orElseThrow(() -> {
                    log.warn("게시글 작성 실패(자소서 없음) → essayId={}", boardWrite.getEssayId());
                    return new EssayNotFoundException();
                });

        String password = null;
        if (StringUtils.hasText(boardWrite.getPassword())) {
            password = encoder.encode(boardWrite.getPassword());
        }

        Board board = Board.builder()
                .user(user)
                .title(boardWrite.getTitle())
                .content(boardWrite.getContent())
                .essayTitle(essay.getTitle())
                .password(password)
                .build();

        List<EssayQnA> qnaList = qnARepository.findAllByEssay(essay);
        for (EssayQnA essayQnA : qnaList) {
            board.addQnA(BoardQnA.builder()
                    .question(essayQnA.getQuestion())
                    .answer(essayQnA.getAnswer())
                    .build());
        }

        Board save = boardRepository.save(board);
        log.info("게시글 작성 성공 → boardId={}", save.getId());
        return save.getId();
    }


    public void reviseBoard(Long userId, BoardRevise boardRevise) {

        log.info("게시글 수정 시도 → userId={}, boardId={}", userId, boardRevise.getBoardId());

        Board board = boardRepository.findById(boardRevise.getBoardId())
                .orElseThrow(() -> {
                    log.warn("게시글 수정 실패(게시글이 존재하지 않음) → boardId={}", boardRevise.getBoardId());
                    return new BoardNotFoundException();
                });

        if (!userId.equals(board.getUser().getId())) {
            log.warn("게시글 수정 권한 없음 → userId={}, boardOwnerId={}",
                    userId, board.getUser().getId());
            throw new UnauthorizedException();
        }

        board.reviseTitle(boardRevise.getChangeTitle());
        board.reviseContent(boardRevise.getChangeContent());

        log.info("게시글 수정 성공 → boardId={}", boardRevise.getBoardId());
    }
    @Counted("feedback")
    public void writeFeedback(Long userId, FeedbackWrite feedbackWrite) {

        log.info("피드백 작성 시도 → userId={}, qnaId={}, ", userId, feedbackWrite.getQnaId());

        BoardQnA boardQnA = qnARepository.findBoardQnaById(feedbackWrite.getQnaId())
                .orElseThrow(() -> {
                    log.warn("피드백 작성 실패(QnA 없음) → qnaId={}", feedbackWrite.getQnaId());
                    return new QnaNotFoundException();
                });

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("피드백 작성 실패(사용자 없음) → userId={}", userId);
                    return new UserNotFoundException();
                });

        Feedback feedback = Feedback.builder()
                .feedbackTarget(feedbackWrite.getFeedbackTarget())
                .feedbackContent(feedbackWrite.getFeedbackContent())
                .boardQnA(boardQnA)
                .user(user)
                .build();

        feedbackRepository.save(feedback);

        log.info("피드백 작성 성공 → feedbackId={}", feedback.getId());
    }

    public void reviseFeedback(Long userId, ReviseFeedback reviseFeedback) {

        log.info("피드백 수정 시도 → userId={}, feedbackId={}", userId, reviseFeedback.getFeedbackId());

        Feedback feedback = feedbackRepository.findById(reviseFeedback.getFeedbackId())                .orElseThrow(() -> {
            log.warn("피드백 수정 실패(피드백이 존재하지 않음) → feedbackId={}", reviseFeedback.getFeedbackId());
            return new FeedbackNotFoundException();
        });

        if (!feedback.getUser().getId().equals(userId)) {
            log.warn("피드백 수정 권한 없음 → userId={}, feedbackOwnerId={}",
                    userId, feedback.getUser().getId());
            throw new UnauthorizedException();
        }

        feedback.reviseContent(reviseFeedback.getReviseContent());

        log.info("피드백 수정 성공 → feedbackId={}", reviseFeedback.getFeedbackId());
    }


    public List<FeedbackList> feedbacksByQna(Long userId, Long qnaId) {
        log.info("QnA 피드백 조회 시도 → userId={}, qnaId={}", userId, qnaId);

        QnA qnA = qnARepository.findById(qnaId)
                .orElseThrow(() -> {
                    log.warn("QnA 피드백 조회 실패(QnA 없음) → qnaId={}", qnaId);
                    return new QnaNotFoundException();
                });

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("QnA 피드백 조회 실패(사용자 없음) → userId={}", userId);
                    return new UserNotFoundException();
                });

        List<Feedback> feedbacks = feedbackRepository.findAllByQna(qnA);
        log.info("QnA 피드백 조회 완료 → qnaId={}, feedbackCount={}", qnaId, feedbacks.size());

        return feedbacks.stream()
                .map(f -> new FeedbackList(f, user))
                .collect(Collectors.toList());
    }

    @Counted("post")
    public void deleteBoard(Long userId, Long boardId) {
        log.info("게시글 삭제 시도 → userId={}, boardId={}", userId, boardId);

        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> {
                    log.warn("게시글 삭제 실패(게시글이 존재하지 않음) → boardId={}", boardId);
                    return new BoardNotFoundException();
                });

        if (!board.getUser().getId().equals(userId)) {
            log.warn("게시글 삭제 권한 없음 → userId={}, boardOwnerId={}",
                    userId, board.getUser().getId());
            throw new UnauthorizedException();
        }

        List<BoardQnA> qnAList = qnARepository.findAllByBoard(board);
        feedbackRepository.deleteFeedbacksInQnAs(qnAList);
        qnARepository.deleteBoardQnAsIn(qnAList);
        boardRepository.delete(board);

        log.info("게시글 삭제 성공 → boardId={}", boardId);
    }

    @Counted("feedback")
    public void deleteFeedback(Long userId, Long feedbackId) {

        log.info("피드백 삭제 시도 → userId={}, feedbackId={}", userId, feedbackId);

        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> {
                    log.warn("피드백 삭제 실패(찾을 수 없음) → feedbackId={}", feedbackId);
                    return new FeedbackNotFoundException();
                });

        if (!feedback.getUser().getId().equals(userId)) {
            log.warn("피드백 삭제 권한 없음 → userId={}, feedbackOwnerId={}",
                    userId, feedback.getUser().getId());
            throw new UnauthorizedException();
        }

        feedbackRepository.delete(feedback);

        log.info("피드백 삭제 성공 → feedbackId={}", feedbackId);
    }
}
