package com.injagang.service;

import com.injagang.domain.Board;
import com.injagang.domain.Feedback;
import com.injagang.domain.notification.Notification;
import com.injagang.domain.notification.NotificationType;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.qna.QnA;
import com.injagang.domain.user.User;
import com.injagang.exception.*;
import com.injagang.repository.*;
import com.injagang.repository.board.BoardRepository;
import com.injagang.request.FeedbackWrite;
import com.injagang.request.ReviseFeedback;
import com.injagang.response.FeedbackList;
import io.micrometer.core.annotation.Counted;
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
public class FeedbackService {

    private final UserRepository userRepository;
    private final QnARepository qnARepository;
    private final BoardRepository boardRepository;
    private final NotificationRepository notificationRepository;
    private final FeedbackRepository feedbackRepository;


    @Counted("feedback")
    public void writeFeedback(Long userId, FeedbackWrite feedbackWrite) {

        log.info("피드백 작성 시도 → userId={}, qnaId={}, ", userId, feedbackWrite.getQnaId());

        Board board = boardRepository.findById(feedbackWrite.getBoardId()).orElseThrow(BoardNotFoundException::new);

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

        if (!board.getUser().getId().equals(userId)) {

            Notification notification = notificationRepository.save(Notification.builder()
                    .recipient(board.getUser())
                    .actor(user)
                    .board(board)
                    .type(NotificationType.BOARD)
                    .anchorId(feedback.getId())
                    .readAt(null)
                    .build());

            log.info("피드백 알림 작성 성공 → notificationId={}",notification.getId());

        }


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
