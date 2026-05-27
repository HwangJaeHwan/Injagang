package com.injagang.repository;

import com.injagang.domain.like.BoardLike;
import com.injagang.domain.like.FeedbackLike;
import com.injagang.domain.like.Like;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<BoardLike> findByBoardIdAndUserId(Long boardId, Long userId);

    Optional<FeedbackLike> findByFeedbackIdAndUserId(Long feedbackId, Long userId);

    @Query("select count(bl) from BoardLike bl where bl.board.id = :boardId")
    long countByBoardId(@Param("boardId") Long boardId);

    @Query("select count(bl) from BoardLike bl where bl.user.id= :userId and bl.board.id = :boardId")
    long countsBoardLikeByUserIdAndBoardId(Long userId, Long boardId);



}
