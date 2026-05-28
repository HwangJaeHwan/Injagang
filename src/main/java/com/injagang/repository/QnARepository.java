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
    @Query("SELECT count(bq) FROM BoardQnA bq WHERE bq.deletedTime is null")
    long countBoardQnA();

    @Query("select count(eq) from EssayQnA eq")
    long countEssayQnA();

    @Modifying
    @Query("delete from EssayQnA q where q.essay = :essay")
    void deleteEssayQnAByEssay(@Param("essay") Essay essay);

    @Modifying
    @Query("update from BoardQnA q set q.deletedTime=current_timestamp where q.id in :ids")
    void softDeleteBoardQnAsIn(@Param("ids") List<Long> ids);


}
