package com.injagang.repository;

import com.injagang.domain.Board;
import com.injagang.domain.Essay;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.domain.qna.QnA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QnARepository extends JpaRepository<QnA, Long> {

    List<EssayQnA> findAllByEssay(Essay essay);

    List<BoardQnA> findAllByBoard(Board board);
    Optional<BoardQnA> findBoardQnaById(Long boardQnaId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("delete from EssayQnA q where q in :qnas")
    void deleteByEssayQnAsIn(@Param("qnas") List<EssayQnA> qnAs);

}
