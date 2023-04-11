package com.injagang.service;

import com.injagang.domain.ExpectedQuestion;
import com.injagang.domain.QuestionType;
import com.injagang.domain.User;
import com.injagang.exception.UnauthorizedException;
import com.injagang.exception.UserNotFoundException;
import com.injagang.repository.ExpectedQuestionRepository;
import com.injagang.repository.UserRepository;
import com.injagang.response.QuestionResponse;
import com.injagang.request.QuestionWrite;
import com.injagang.request.RandomRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class QuestionService {

    private final UserRepository userRepository;
    private final ExpectedQuestionRepository questionRepository;


    public List<QuestionResponse> questionsByType(QuestionType questionType) {

        if (questionType == null) {

            List<ExpectedQuestion> questions = questionRepository.findAll();

            return questions.stream().map(QuestionResponse::new).collect(Collectors.toList());

        }

        List<ExpectedQuestion> questions = questionRepository.findAllByQuestionType(questionType);

        return questions.stream().map(QuestionResponse::new).collect(Collectors.toList());

    }


    public void addQuestions(Long userId,QuestionWrite questionWrite) {

        adminCheck(userId);

        List<ExpectedQuestion> questions = new ArrayList<>();


        for (String question : questionWrite.getQuestions()) {

            questions.add(ExpectedQuestion.builder()
                    .question(question)
                    .questionType(questionWrite.getQuestionType())
                    .build());

        }

        questionRepository.saveAll(questions);

    }


    public List<QuestionResponse> randomQuestions(RandomRequest request) {

        log.info("size = {}", request.getSize());
        log.info("type = {}", request.getQuestionType());

        List<ExpectedQuestion> questions = questionRepository.findAllByQuestionType(request.getQuestionType());

        Collections.shuffle(questions);

        List<QuestionResponse> random = new ArrayList<>();

        IntStream.range(0, request.getSize())
                .forEach(i-> random.add(new QuestionResponse(questions.get(i))));

        return random;

    }




    public void delete(Long userId, List<Long> ids){

        adminCheck(userId);

        questionRepository.deleteInIds(ids);

    }

    private void adminCheck(Long userId){

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        if (!user.getRole().equals("ADMIN")) {
            throw new UnauthorizedException();
        }

    }


}