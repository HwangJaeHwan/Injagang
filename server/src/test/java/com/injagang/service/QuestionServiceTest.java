package com.injagang.service;

import com.injagang.domain.ExpectedQuestion;
import com.injagang.domain.QuestionType;
import com.injagang.domain.User;
import com.injagang.repository.ExpectedQuestionRepository;
import com.injagang.repository.UserRepository;
import com.injagang.response.QuestionResponse;
import com.injagang.request.QuestionWrite;
import com.injagang.request.RandomRequest;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class QuestionServiceTest {


    @Autowired
    UserRepository userRepository;

    @Autowired
    ExpectedQuestionRepository questionRepository;

    @Autowired
    QuestionService questionService;

    @AfterAll
    void after() {
        userRepository.deleteAll();
        questionRepository.deleteAll();
    }

    @BeforeEach
    void clean() {
        userRepository.deleteAll();
        questionRepository.deleteAll();
    }


    @Test
    @DisplayName("모든 질문 가져오기")
    void test1() {

        saveQuestions();

        List<QuestionResponse> response = questionService.questionsByType(null);


        assertEquals(40, response.size());

    }

    @Test
    @DisplayName("해당 타입의 질문 가져오기")
    void test2() {
        saveQuestions();

        List<QuestionResponse> cs = questionService.questionsByType(QuestionType.CS);
        List<QuestionResponse> situation = questionService.questionsByType(QuestionType.SITUATION);
        List<QuestionResponse> job = questionService.questionsByType(QuestionType.JOB);
        List<QuestionResponse> personality = questionService.questionsByType(QuestionType.PERSONALITY);


        assertEquals(10, cs.size());
        assertEquals(10, situation.size());
        assertEquals(10, job.size());
        assertEquals(10, personality.size());


    }


    @Test
    @DisplayName("질문 추가하기")
    void test3() {
        User user = User.builder()
                .loginId("test")
                .nickname("test")
                .password("test")
                .email("test@test.com")
                .role("ADMIN")
                .build();

        userRepository.save(user);

        QuestionWrite cs = new QuestionWrite(QuestionType.CS);
        cs.addQuestion("cs1");
        cs.addQuestion("cs2");
        cs.addQuestion("cs3");

        QuestionWrite situation = new QuestionWrite(QuestionType.SITUATION);
        situation.addQuestion("situation1");
        situation.addQuestion("situation2");
        situation.addQuestion("situation3");
        situation.addQuestion("situation4");

        QuestionWrite job = new QuestionWrite(QuestionType.JOB);
        job.addQuestion("job1");
        job.addQuestion("job2");
        job.addQuestion("job3");
        job.addQuestion("job4");
        job.addQuestion("job5");

        QuestionWrite personality = new QuestionWrite(QuestionType.PERSONALITY);
        personality.addQuestion("personality1");
        personality.addQuestion("personality2");
        personality.addQuestion("personality3");
        personality.addQuestion("personality4");
        personality.addQuestion("personality5");
        personality.addQuestion("personality6");

        questionService.addQuestions(user.getId(),cs);
        questionService.addQuestions(user.getId(),situation);
        questionService.addQuestions(user.getId(),job);
        questionService.addQuestions(user.getId(),personality);



        assertEquals(18, questionRepository.count());

        assertEquals(3,questionRepository.findAllByQuestionType(QuestionType.CS).size());
        assertEquals(4,questionRepository.findAllByQuestionType(QuestionType.SITUATION).size());
        assertEquals(5,questionRepository.findAllByQuestionType(QuestionType.JOB).size());
        assertEquals(6,questionRepository.findAllByQuestionType(QuestionType.PERSONALITY).size());


    }

    @Test
    @DisplayName("랜덤 선택")
    void test4() {

        saveQuestions();

        RandomRequest csRequest = RandomRequest.builder()
                .size(5)
                .questionType(QuestionType.CS)
                .build();

        RandomRequest jobRequest = RandomRequest.builder()
                .size(6)
                .questionType(QuestionType.JOB)
                .build();

        RandomRequest situationRequest = RandomRequest.builder()
                .size(7)
                .questionType(QuestionType.SITUATION)
                .build();

        RandomRequest personalityRequest = RandomRequest.builder()
                .size(8)
                .questionType(QuestionType.PERSONALITY)
                .build();

        List<QuestionResponse> cs = questionService.randomQuestions(csRequest);
        List<QuestionResponse> job = questionService.randomQuestions(jobRequest);
        List<QuestionResponse> situation = questionService.randomQuestions(situationRequest);
        List<QuestionResponse> personality = questionService.randomQuestions(personalityRequest);


        assertEquals(5, cs.size());
        assertEquals(6, job.size());
        assertEquals(7, situation.size());
        assertEquals(8, personality.size());


    }

    @Test
    @DisplayName("질문 삭제")
    void test5() {

        User user = User.builder()
                .loginId("test")
                .nickname("test")
                .password("test")
                .email("test@test.com")
                .role("ADMIN")
                .build();

        userRepository.save(user);

        saveQuestions();

        List<ExpectedQuestion> cs = questionRepository.findAllByQuestionType(QuestionType.CS);
        List<ExpectedQuestion> job = questionRepository.findAllByQuestionType(QuestionType.JOB);
        List<ExpectedQuestion> situation = questionRepository.findAllByQuestionType(QuestionType.SITUATION);
        List<ExpectedQuestion> personality = questionRepository.findAllByQuestionType(QuestionType.PERSONALITY);

        List<Long> ids = new ArrayList<>();

        ids.add(cs.get(0).getId());

        ids.add(job.get(0).getId());
        ids.add(job.get(1).getId());

        ids.add(situation.get(0).getId());
        ids.add(situation.get(1).getId());
        ids.add(situation.get(2).getId());

        ids.add(personality.get(0).getId());
        ids.add(personality.get(1).getId());
        ids.add(personality.get(2).getId());
        ids.add(personality.get(3).getId());




        questionService.delete(user.getId(), ids);

        assertEquals(30, questionRepository.count());
        assertEquals(9, questionRepository.findAllByQuestionType(QuestionType.CS).size());
        assertEquals(8, questionRepository.findAllByQuestionType(QuestionType.JOB).size());
        assertEquals(7, questionRepository.findAllByQuestionType(QuestionType.SITUATION).size());
        assertEquals(6, questionRepository.findAllByQuestionType(QuestionType.PERSONALITY).size());




    }



    private void saveQuestions() {
//        CS, SITUATION, JOB, PERSONALITY;

        List<ExpectedQuestion> save = new ArrayList<>();

        IntStream.rangeClosed(0,9)
                        .forEach(
                                i->{
                                    save.add(
                                            ExpectedQuestion.builder()
                                                    .question("CS" + i)
                                                    .questionType(QuestionType.CS)
                                                    .build()
                                    );


                                }

                        );

        IntStream.rangeClosed(0,9)
                .forEach(
                        i->{
                            save.add(
                                    ExpectedQuestion.builder()
                                            .question("SITUATION" + i)
                                            .questionType(QuestionType.SITUATION)
                                            .build()
                            );


                        }

                );

        IntStream.rangeClosed(0,9)
                .forEach(
                        i->{
                            save.add(
                                    ExpectedQuestion.builder()
                                            .question("JOB" + i)
                                            .questionType(QuestionType.JOB)
                                            .build()
                            );


                        }

                );

        IntStream.rangeClosed(0,9)
                .forEach(
                        i->{
                            save.add(
                                    ExpectedQuestion.builder()
                                            .question("PERSONALITY" + i)
                                            .questionType(QuestionType.PERSONALITY)
                                            .build()
                            );


                        }

                );

        questionRepository.saveAll(save);


    }




}