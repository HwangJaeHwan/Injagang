package com.injagang.repository;

import com.injagang.domain.Essay;
import com.injagang.domain.QuestionAndAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QnARepository extends JpaRepository<QuestionAndAnswer, Long> {

    List<QuestionAndAnswer> findAllByEssay(Essay essay);

}
