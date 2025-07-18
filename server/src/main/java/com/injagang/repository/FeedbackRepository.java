package com.injagang.repository;

import com.injagang.domain.Feedback;
import com.injagang.domain.qna.QnA;
import com.injagang.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    @Query("select f from Feedback f where f.boardQnA = :qnA")
    List<Feedback> findAllByQna(QnA qnA);

    @Modifying
    @Query("update from Feedback f set f.deletedTime = current_timestamp where f.boardQnA.id in :ids")
    void softDeleteFeedbacksInQnAs(@Param("ids") List<Long> ids);

    @Modifying
    @Query("update from Feedback f set f.deletedTime = current_timestamp where f.user.id = :userId")
    void softDeleteAllByUserId(@Param("userId") Long userId);
}
