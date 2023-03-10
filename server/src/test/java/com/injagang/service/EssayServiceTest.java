package com.injagang.service;

import com.injagang.domain.Essay;
import com.injagang.domain.QuestionAndAnswer;
import com.injagang.domain.User;
import com.injagang.repository.EssayRepository;
import com.injagang.repository.QnARepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.EssayWrite;
import com.injagang.request.QnA;
import com.injagang.response.EssayList;
import com.injagang.response.EssayRead;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class EssayServiceTest {


    @Autowired
    UserRepository userRepository;

    @Autowired
    EssayRepository essayRepository;

    @Autowired
    QnARepository qnARepository;

    @Autowired
    EssayService essayService;

    @BeforeEach
    void clean() {
        essayRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("자소서 쓰기")
    void test() {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);


        EssayWrite essayWrite = EssayWrite.builder()
                .title("test essay")
                .build();

        QnA qnA1 = QnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        essayWrite.addQna(qnA1);

        QnA qnA2 = QnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        essayWrite.addQna(qnA2);


        QnA qnA3 = QnA.builder()
                .question("question3")
                .answer("answer3")
                .build();

        essayWrite.addQna(qnA3);


        Long essayId = essayService.writeMyEssay(user.getId(), essayWrite);

        Essay essay = essayRepository.findById(essayId).get();

        assertThat(essay.getTitle()).isEqualTo("test essay");
        assertEquals(3, qnARepository.count());
        assertEquals(3, qnARepository.findAllByEssay(essay).size());


    }

    @Test
    @DisplayName("자소서 읽기")
    void writeEssay() {


        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);

        Essay essay = Essay.builder()
                .title("test title")
                .user(user)
                .build();


        QuestionAndAnswer qna1 = QuestionAndAnswer.builder()
                .question("question1")
                .answer("answer1")
                .build();

        essay.addQuestionAndAnswer(qna1);

        QuestionAndAnswer qna2 = QuestionAndAnswer.builder()
                .question("question2")
                .answer("answer2")
                .build();

        essay.addQuestionAndAnswer(qna2);

        QuestionAndAnswer qna3 = QuestionAndAnswer.builder()
                .question("question3")
                .answer("answer3")
                .build();

        essay.addQuestionAndAnswer(qna3);

        essayRepository.save(essay);

        EssayRead read = essayService.readEssay(essay.getId());

        assertEquals(essay.getId(), read.getEssayId());
        assertThat(essay.getTitle()).isEqualTo(read.getTitle());
        assertEquals(3, read.getQnaList().size());


    }

    @Test
    @DisplayName("자소서 리스트")
    void test3() {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);

        Essay essay1 = Essay.builder()
                .title("test title1")
                .user(user)
                .build();


        QuestionAndAnswer qna1 = QuestionAndAnswer.builder()
                .question("question1")
                .answer("answer1")
                .build();

        essay1.addQuestionAndAnswer(qna1);
        essayRepository.save(essay1);

        Essay essay2 = Essay.builder()
                .title("test title2")
                .user(user)
                .build();


        QuestionAndAnswer qna2 = QuestionAndAnswer.builder()
                .question("question2")
                .answer("answer2")
                .build();

        essay2.addQuestionAndAnswer(qna2);
        essayRepository.save(essay2);

        Essay essay3 = Essay.builder()
                .title("test title3")
                .user(user)
                .build();


        QuestionAndAnswer qna3 = QuestionAndAnswer.builder()
                .question("question3")
                .answer("answer3")
                .build();

        essay3.addQuestionAndAnswer(qna3);
        essayRepository.save(essay3);


        List<EssayList> essays = essayService.essays(user.getId());

        assertEquals(3, essays.size());


    }

    @Test
    @DisplayName("자소서 수정")
    void test4() {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);

        Essay essay = Essay.builder()
                .user(user)
                .title("before")
                .build();

        QuestionAndAnswer qna1 = QuestionAndAnswer.builder()
                .question("questionBefore1")
                .answer("answerBefore1")
                .build();

        QuestionAndAnswer qna2 = QuestionAndAnswer.builder()
                .question("questionBefore2")
                .answer("answerBefore2")
                .build();

        QuestionAndAnswer qna3 = QuestionAndAnswer.builder()
                .question("questionBefore3")
                .answer("answerBefore3")
                .build();

        essay.addQuestionAndAnswer(qna1);
        essay.addQuestionAndAnswer(qna2);
        essay.addQuestionAndAnswer(qna3);

        essayRepository.save(essay);


        EssayWrite revise = EssayWrite.builder()
                .title("after")
                .build();

        QnA reviseQna1 = QnA.builder()
                .question("questionAfter1")
                .answer("answerAfter1")
                .build();

        QnA reviseQna2 = QnA.builder()
                .question("questionAfter2")
                .answer("answerAfter2")
                .build();

        QnA reviseQna3 = QnA.builder()
                .question("questionAfter3")
                .answer("answerAfter3")
                .build();

        revise.addQna(reviseQna1);
        revise.addQna(reviseQna2);
        revise.addQna(reviseQna3);

        essayService.reviseEssay(user.getId(),essay.getId(), revise);

        Essay change = essayRepository.findById(essay.getId()).get();
        List<QuestionAndAnswer> qnaList = qnARepository.findAllByEssay(change);
        assertEquals(3, qnARepository.count());
        assertEquals("after", change.getTitle());
        assertEquals("questionAfter1", qnaList.get(0).getQuestion());
        assertEquals("answerAfter1", qnaList.get(0).getAnswer());
        assertEquals("questionAfter2", qnaList.get(1).getQuestion());
        assertEquals("answerAfter2", qnaList.get(1).getAnswer());
        assertEquals("questionAfter3", qnaList.get(2).getQuestion());
        assertEquals("answerAfter3", qnaList.get(2).getAnswer());


    }

    @Test
    @DisplayName("자소서 삭제")
    void test5() {

        User user = User.builder()
                .loginId("test")
                .password("test")
                .nickname("test")
                .build();

        userRepository.save(user);

        Essay essay = Essay.builder()
                .title("test title1")
                .user(user)
                .build();


        QuestionAndAnswer qna1 = QuestionAndAnswer.builder()
                .question("question1")
                .answer("answer1")
                .build();

        essay.addQuestionAndAnswer(qna1);
        essayRepository.save(essay);

        essayService.deleteEssay(user.getId(),essay.getId());


        assertEquals(0, essayRepository.count());
        assertEquals(0, qnARepository.count());

    }
}