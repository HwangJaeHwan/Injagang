package com.injagang.service;

import com.injagang.domain.ExpectedQuestion;
import com.injagang.domain.QuestionType;
import com.injagang.domain.user.User;
import com.injagang.domain.user.UserType;
import com.injagang.repository.ExpectedQuestionRepository;
import com.injagang.repository.UserRepository;
import com.injagang.response.QuestionResponse;
import com.injagang.request.QuestionWrite;
import com.injagang.request.RandomRequest;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
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


        assertEquals(66, response.size());

    }

    @Test
    @DisplayName("해당 타입의 질문 가져오기")
    void test2() {
        saveQuestions();

        List<QuestionResponse> cs = questionService.questionsByType(QuestionType.CS);
        List<QuestionResponse> situation = questionService.questionsByType(QuestionType.SITUATION);
        List<QuestionResponse> front = questionService.questionsByType(QuestionType.FRONT);
        List<QuestionResponse> back = questionService.questionsByType(QuestionType.BACK);
        List<QuestionResponse> common = questionService.questionsByType(QuestionType.COMMON);
        List<QuestionResponse> university = questionService.questionsByType(QuestionType.UNIVERSITY);


        assertEquals(11, cs.size());
        assertEquals(11, situation.size());
        assertEquals(11, front.size());
        assertEquals(11, back.size());
        assertEquals(11, common.size());
        assertEquals(11, university.size());


    }


    @Test
    @DisplayName("질문 추가하기")
    void test3() {
        User user = User.builder()
                .loginId("test")
                .nickname("test")
                .password("test")
                .email("test@test.com")
                .type(UserType.ADMIN)
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

        QuestionWrite front = new QuestionWrite(QuestionType.FRONT);
        front.addQuestion("front1");
        front.addQuestion("front2");
        front.addQuestion("front3");
        front.addQuestion("front4");
        front.addQuestion("front5");

        QuestionWrite back = new QuestionWrite(QuestionType.BACK);
        back.addQuestion("back1");
        back.addQuestion("back2");
        back.addQuestion("back3");
        back.addQuestion("back4");
        back.addQuestion("back5");
        back.addQuestion("back6");

        QuestionWrite common = new QuestionWrite(QuestionType.COMMON);
        common.addQuestion("common1");
        common.addQuestion("common2");
        common.addQuestion("common3");
        common.addQuestion("common4");
        common.addQuestion("common5");
        common.addQuestion("common6");
        common.addQuestion("common7");

        QuestionWrite university = new QuestionWrite(QuestionType.UNIVERSITY);
        university.addQuestion("university1");
        university.addQuestion("university2");
        university.addQuestion("university3");
        university.addQuestion("university4");
        university.addQuestion("university5");
        university.addQuestion("university6");
        university.addQuestion("university7");
        university.addQuestion("university8");

        questionService.addQuestions(user.getId(),cs);
        questionService.addQuestions(user.getId(),situation);
        questionService.addQuestions(user.getId(),front);
        questionService.addQuestions(user.getId(),back);
        questionService.addQuestions(user.getId(),common);
        questionService.addQuestions(user.getId(),university);



        assertEquals(33, questionRepository.count());

        assertEquals(3,questionRepository.findAllByQuestionType(QuestionType.CS).size());
        assertEquals(4,questionRepository.findAllByQuestionType(QuestionType.SITUATION).size());
        assertEquals(5,questionRepository.findAllByQuestionType(QuestionType.FRONT).size());
        assertEquals(6,questionRepository.findAllByQuestionType(QuestionType.BACK).size());
        assertEquals(7,questionRepository.findAllByQuestionType(QuestionType.COMMON).size());
        assertEquals(8,questionRepository.findAllByQuestionType(QuestionType.UNIVERSITY).size());


    }

    @Test
    @DisplayName("랜덤 선택")
    void test4() {

        saveQuestions();

        List<RandomRequest> requests = new ArrayList<>();


        RandomRequest csRequest = RandomRequest.builder()
                .size(5)
                .questionType(QuestionType.CS)
                .build();

        RandomRequest frontRequest = RandomRequest.builder()
                .size(6)
                .questionType(QuestionType.FRONT)
                .build();

        RandomRequest situationRequest = RandomRequest.builder()
                .size(7)
                .questionType(QuestionType.SITUATION)
                .build();

        RandomRequest backRequest = RandomRequest.builder()
                .size(8)
                .questionType(QuestionType.BACK)
                .build();

        RandomRequest commonRequest = RandomRequest.builder()
                .size(9)
                .questionType(QuestionType.COMMON)
                .build();

        RandomRequest universityRequest = RandomRequest.builder()
                .size(10)
                .questionType(QuestionType.UNIVERSITY)
                .build();

        requests.add(csRequest);
        requests.add(frontRequest);
        requests.add(situationRequest);
        requests.add(backRequest);
        requests.add(commonRequest);
        requests.add(universityRequest);

        List<QuestionResponse> questions = questionService.randomQuestions(requests);


        assertEquals(45, questions.size());



    }

    @Test
    @DisplayName("질문 삭제")
    void test5() {

        User user = User.builder()
                .loginId("test")
                .nickname("test")
                .password("test")
                .email("test@test.com")
                .type(UserType.ADMIN)
                .build();

        userRepository.save(user);

        saveQuestions();

        List<ExpectedQuestion> cs = questionRepository.findAllByQuestionType(QuestionType.CS);
        List<ExpectedQuestion> front = questionRepository.findAllByQuestionType(QuestionType.FRONT);
        List<ExpectedQuestion> situation = questionRepository.findAllByQuestionType(QuestionType.SITUATION);
        List<ExpectedQuestion> back = questionRepository.findAllByQuestionType(QuestionType.BACK);
        List<ExpectedQuestion> common = questionRepository.findAllByQuestionType(QuestionType.COMMON);
        List<ExpectedQuestion> university = questionRepository.findAllByQuestionType(QuestionType.UNIVERSITY);

        List<Long> ids = new ArrayList<>();

        ids.add(cs.get(0).getId());

        ids.add(front.get(0).getId());
        ids.add(front.get(1).getId());

        ids.add(situation.get(0).getId());
        ids.add(situation.get(1).getId());
        ids.add(situation.get(2).getId());

        ids.add(back.get(0).getId());
        ids.add(back.get(1).getId());
        ids.add(back.get(2).getId());
        ids.add(back.get(3).getId());

        ids.add(common.get(0).getId());
        ids.add(common.get(1).getId());
        ids.add(common.get(2).getId());
        ids.add(common.get(3).getId());
        ids.add(common.get(4).getId());

        ids.add(university.get(0).getId());
        ids.add(university.get(1).getId());
        ids.add(university.get(2).getId());
        ids.add(university.get(3).getId());
        ids.add(university.get(4).getId());
        ids.add(university.get(5).getId());




        questionService.delete(user.getId(), ids);

        assertEquals(45, questionRepository.count());
        assertEquals(10, questionRepository.findAllByQuestionType(QuestionType.CS).size());
        assertEquals(9, questionRepository.findAllByQuestionType(QuestionType.FRONT).size());
        assertEquals(8, questionRepository.findAllByQuestionType(QuestionType.SITUATION).size());
        assertEquals(7, questionRepository.findAllByQuestionType(QuestionType.BACK).size());
        assertEquals(6, questionRepository.findAllByQuestionType(QuestionType.COMMON).size());
        assertEquals(5, questionRepository.findAllByQuestionType(QuestionType.UNIVERSITY).size());




    }



    private void saveQuestions() {

        List<ExpectedQuestion> save = new ArrayList<>();

        IntStream.rangeClosed(0,10)
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

        IntStream.rangeClosed(0,10)
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

        IntStream.rangeClosed(0,10)
                .forEach(
                        i->{
                            save.add(
                                    ExpectedQuestion.builder()
                                            .question("FRONT" + i)
                                            .questionType(QuestionType.FRONT)
                                            .build()
                            );


                        }

                );

        IntStream.rangeClosed(0,10)
                .forEach(
                        i->{
                            save.add(
                                    ExpectedQuestion.builder()
                                            .question("BACK" + i)
                                            .questionType(QuestionType.BACK)
                                            .build()
                            );


                        }

                );

        IntStream.rangeClosed(0,10)
                .forEach(
                        i->{
                            save.add(
                                    ExpectedQuestion.builder()
                                            .question("COMMON" + i)
                                            .questionType(QuestionType.COMMON)
                                            .build()
                            );


                        }

                );

        IntStream.rangeClosed(0,10)
                .forEach(
                        i->{
                            save.add(
                                    ExpectedQuestion.builder()
                                            .question("UNIVERSITY" + i)
                                            .questionType(QuestionType.UNIVERSITY)
                                            .build()
                            );


                        }

                );

        questionRepository.saveAll(save);


    }




}