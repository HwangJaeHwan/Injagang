package com.injagang.service;

import com.injagang.domain.Board;
import com.injagang.domain.Feedback;
import com.injagang.domain.like.BoardLike;
import com.injagang.domain.like.FeedbackLike;
import com.injagang.domain.user.User;
import com.injagang.exception.BoardNotFoundException;
import com.injagang.exception.UserNotFoundException;
import com.injagang.repository.FeedbackRepository;
import com.injagang.repository.LikeRepository;
import com.injagang.repository.UserRepository;
import com.injagang.repository.board.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LikeService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final FeedbackRepository feedbackRepository;
    private final LikeRepository likeRepository;


    public boolean toggleBoardLike(Long boardId, Long userId) {
        Optional<BoardLike> existing = likeRepository.findByBoardIdAndUserId(boardId, userId);

        if (existing.isPresent()) {
            likeRepository.delete(existing.get());
            return false;
        } else {

            User user = userRepository.findById(userId)
                    .orElseThrow(UserNotFoundException::new);

            Board board = boardRepository.findById(boardId)
                    .orElseThrow(BoardNotFoundException::new);


            likeRepository.save(new BoardLike(user, board));
            return true;
        }
    }

    public boolean toggleFeedbackLike(Long feedbackId, Long userId) {
        Optional<FeedbackLike> existing = likeRepository.findByFeedbackIdAndUserId(feedbackId, userId);

        if (existing.isPresent()) {
            likeRepository.delete(existing.get());
            return false;
        } else {

            User user = userRepository.findById(userId)
                    .orElseThrow(UserNotFoundException::new);

            Feedback feedback = feedbackRepository.findById(feedbackId)
                    .orElseThrow(BoardNotFoundException::new);


            likeRepository.save(new FeedbackLike(user, feedback));

            return true;
        }
    }

}
