package com.injagang.service;

import com.injagang.domain.ExpectedQuestion;
import com.injagang.domain.QuestionType;
import com.injagang.domain.user.User;
import com.injagang.domain.user.UserType;
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

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class QuestionService {

    private final UserRepository userRepository;
    private final ExpectedQuestionRepository questionRepository;


    @Transactional(readOnly = true)
    public List<QuestionResponse> questionsByType(QuestionType questionType) {

        log.info("질문 목록 조회 시도 → type={}", questionType);

        List<ExpectedQuestion> questions;

        if (questionType == null) {
            questions = questionRepository.findAll();
        } else {
            questions = questionRepository.findAllByQuestionType(questionType);
        }

        log.info("질문 목록 조회 완료 → type={}, count={}", questionType, questions.size());

        return questions.stream()
                .map(QuestionResponse::new)
                .collect(Collectors.toList());
    }


    public void addQuestions(Long userId, QuestionWrite questionWrite) {
        int count = questionWrite.getQuestions().size();

        log.info("질문 추가 시도 → userId={}, questionType={}, questionsCount={}",
                userId, questionWrite.getQuestionType(), count);

        adminCheck(userId);

        List<ExpectedQuestion> questions = new ArrayList<>();

        for (String q : questionWrite.getQuestions()) {
            questions.add(ExpectedQuestion.builder()
                    .question(q)
                    .questionType(questionWrite.getQuestionType())
                    .build());
        }
        questionRepository.saveAll(questions);

        log.info("질문 추가 성공 → addedCount={}", questions.size());
    }


    @Transactional(readOnly = true)
    public List<QuestionResponse> randomQuestions(List<RandomRequest> requests) {

        log.info("랜덤 질문 조회 시도 → requests={}", requests);

        int totalRequested = requests.stream()
                .mapToInt(RandomRequest::getSize)
                .sum();

        Map<QuestionType, Integer> remaining = new HashMap<>();

        for (RandomRequest req : requests) {
            remaining.put(req.getQuestionType(), req.getSize());
        }

        List<ExpectedQuestion> allQuestions = questionRepository.findAll();
        Collections.shuffle(allQuestions);

        List<QuestionResponse> result = new ArrayList<>();

        for (ExpectedQuestion eq : allQuestions) {
            if (result.size() >= totalRequested) break;
            Integer rem = remaining.get(eq.getQuestionType());
            if (rem != null && rem > 0) {
                result.add(new QuestionResponse(eq));
                remaining.put(eq.getQuestionType(), rem - 1);
            }
        }

        log.info("랜덤 질문 조회 완료 → requestedTotal={}, returnedCount={}", totalRequested, result.size());

        return result;
    }



    public void delete(Long userId, List<Long> ids) {

        log.info("문항 삭제 시도 → userId={}, ids={}", userId, ids);

        adminCheck(userId);
        questionRepository.deleteInIds(ids);

        log.info("문항 삭제 성공 → deletedCount={}", ids.size());
    }

    private void adminCheck(Long userId) {

        log.info("관리자 권한 체크 → userId={}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("관리자 권한 체크 실패 → userId={}", userId);
                    return new UserNotFoundException();
                });
        if (!user.getType().equals(UserType.ADMIN)) {
            log.warn("관리자 권한 없음 → userId={}", userId);
            throw new UnauthorizedException();
        }

        log.info("관리자 권한 확인 성공 → userId={}", userId);
    }


}