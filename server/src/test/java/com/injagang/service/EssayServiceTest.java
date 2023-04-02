package com.injagang.service;

import com.injagang.domain.Essay;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.domain.User;
import com.injagang.repository.*;
import com.injagang.request.EssayWrite;
import com.injagang.request.QnaRequest;
import com.injagang.response.EssayList;
import com.injagang.response.EssayRead;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.TestInstance.*;

@SpringBootTest
@TestInstance(Lifecycle.PER_CLASS)
class EssayServiceTest {


    @Autowired
    UserRepository userRepository;

    @Autowired
    EssayRepository essayRepository;

    @Autowired
    QnARepository qnARepository;

    @Autowired
    BoardRepository boardRepository;

    @Autowired
    FeedbackRepository feedbackRepository;

    @Autowired
    EssayService essayService;

    @AfterAll
    void after() {
        qnARepository.deleteAll();
        essayRepository.deleteAll();
        userRepository.deleteAll();
    }

    @BeforeEach
    void clean() {
        qnARepository.deleteAll();
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

        QnaRequest qnaRequest1 = QnaRequest.builder()
                .question("question1")
                .answer("answer1")
                .build();

        essayWrite.addQna(qnaRequest1);

        QnaRequest qnaRequest2 = QnaRequest.builder()
                .question("question2")
                .answer("answer2")
                .build();

        essayWrite.addQna(qnaRequest2);


        QnaRequest qnaRequest3 = QnaRequest.builder()
                .question("question3")
                .answer("answer3")
                .build();

        essayWrite.addQna(qnaRequest3);


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


        EssayQnA qna1 = EssayQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        essay.addQnA(qna1);

        EssayQnA qna2 = EssayQnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        essay.addQnA(qna2);

        EssayQnA qna3 = EssayQnA.builder()
                .question("question3")
                .answer("answer3")
                .build();

        essay.addQnA(qna3);

        essayRepository.save(essay);

        EssayRead read = essayService.readEssay(user.getId(), essay.getId());

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


        EssayQnA qna1 = EssayQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        essay1.addQnA(qna1);
        essayRepository.save(essay1);

        Essay essay2 = Essay.builder()
                .title("test title2")
                .user(user)
                .build();


        EssayQnA qna2 = EssayQnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        essay2.addQnA(qna2);
        essayRepository.save(essay2);

        Essay essay3 = Essay.builder()
                .title("test title3")
                .user(user)
                .build();


        EssayQnA qna3 = EssayQnA.builder()
                .question("question3")
                .answer("answer3")
                .build();

        essay3.addQnA(qna3);
        essayRepository.save(essay3);


        List<EssayList> essays = essayService.essays(user.getId());

        assertEquals(3, essays.size());
        assertThat(essays.get(0).getTitle()).isEqualTo("test title1");
        assertThat(essays.get(0).getQuestions().get(0)).isEqualTo("question1");
        assertThat(essays.get(1).getTitle()).isEqualTo("test title2");
        assertThat(essays.get(1).getQuestions().get(0)).isEqualTo("question2");
        assertThat(essays.get(2).getTitle()).isEqualTo("test title3");
        assertThat(essays.get(2).getQuestions().get(0)).isEqualTo("question3");


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

        EssayQnA qna1 = EssayQnA.builder()
                .question("questionBefore1")
                .answer("answerBefore1")
                .build();

        EssayQnA qna2 = EssayQnA.builder()
                .question("questionBefore2")
                .answer("answerBefore2")
                .build();

        EssayQnA qna3 = EssayQnA.builder()
                .question("questionBefore3")
                .answer("answerBefore3")
                .build();

        essay.addQnA(qna1);
        essay.addQnA(qna2);
        essay.addQnA(qna3);

        essayRepository.save(essay);


        EssayWrite revise = EssayWrite.builder()
                .title("after")
                .build();

        QnaRequest reviseQna1 = QnaRequest.builder()
                .question("questionAfter1")
                .answer("answerAfter1")
                .build();

        QnaRequest reviseQna2 = QnaRequest.builder()
                .question("questionAfter2")
                .answer("answerAfter2")
                .build();

        QnaRequest reviseQna3 = QnaRequest.builder()
                .question("questionAfter3")
                .answer("answerAfter3")
                .build();

        revise.addQna(reviseQna1);
        revise.addQna(reviseQna2);
        revise.addQna(reviseQna3);

        essayService.reviseEssay(user.getId(),essay.getId(), revise);

        Essay change = essayRepository.findById(essay.getId()).get();
        List<EssayQnA> qnaList = qnARepository.findAllByEssay(change);
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


        EssayQnA qna1 = EssayQnA.builder()
                .question("question1")
                .answer("answer1")
                .build();

        EssayQnA qna2 = EssayQnA.builder()
                .question("question2")
                .answer("answer2")
                .build();

        essay.addQnA(qna1);
        essay.addQnA(qna2);
        essayRepository.save(essay);

        essayService.deleteEssay(user.getId(),essay.getId());


        assertEquals(0, essayRepository.count());
        assertEquals(0, qnARepository.count());

    }
}