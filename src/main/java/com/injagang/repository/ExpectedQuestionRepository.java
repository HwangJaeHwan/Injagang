package com.injagang.repository;

import com.injagang.domain.ExpectedQuestion;
import com.injagang.domain.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpectedQuestionRepository extends JpaRepository<ExpectedQuestion, Long> {

    List<ExpectedQuestion> findAllByQuestionType(QuestionType questionType);


    @Modifying
    @Query("delete from ExpectedQuestion e where e.id in :ids")
    void deleteInIds(@Param("ids") List<Long> ids);

}
