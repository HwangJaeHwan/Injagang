package com.injagang.service;

import com.injagang.domain.Essay;
import com.injagang.domain.QuestionAndAnswer;
import com.injagang.domain.User;
import com.injagang.exception.EssayNotFoundException;
import com.injagang.exception.UnauthorizedException;
import com.injagang.exception.UserNotFoundException;
import com.injagang.repository.EssayRepository;
import com.injagang.repository.QnARepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.EssayWrite;
import com.injagang.request.QnA;
import com.injagang.response.EssayList;
import com.injagang.response.EssayRead;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EssayService {

    private final EssayRepository essayRepository;
    private final UserRepository userRepository;
    private final QnARepository qnARepository;


    @Transactional
    public Long writeMyEssay(Long userId, EssayWrite essayWrite) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        Essay essay = Essay.builder()
                .user(user)
                .title(essayWrite.getTitle())
                .build();

        for (QnA qna : essayWrite.getQnaList()) {

            essay.addQuestionAndAnswer(QuestionAndAnswer.builder()
                    .question(qna.getQuestion())
                    .answer(qna.getAnswer())
                    .build());

        }

        Essay save = essayRepository.save(essay);

        return save.getId();

    }

   public EssayRead readEssay(Long essayId){

       Essay essay = essayRepository.findById(essayId).orElseThrow(EssayNotFoundException::new);

       List<QuestionAndAnswer> qnaList = qnARepository.findAllByEssay(essay);

       return new EssayRead(essay, qnaList);


   }

    public List<EssayList> essays(String loginId) {

        User user = userRepository.findUserByLoginId(loginId).orElseThrow(UserNotFoundException::new);

        return essayRepository.findAllByUser(user).stream().map(EssayList::new).collect(Collectors.toList());


    }
    @Transactional
    public void reviseEssay(Long userId,Long essayId, EssayWrite essayWrite) {
        Essay essay = essayRepository.findById(essayId).orElseThrow(EssayNotFoundException::new);

        if (userId != essay.getUser().getId()) {
            throw new UnauthorizedException();
        }

        essay.getQnaList().clear();
        essay.reviseTitle(essayWrite.getTitle());

        qnARepository.deleteAllByEssay(essay);

        for (QnA qna : essayWrite.getQnaList()) {

            essay.addQuestionAndAnswer(QuestionAndAnswer.builder()
                    .question(qna.getQuestion())
                    .answer(qna.getAnswer())
                    .build());

        }


    }


    @Transactional
    public void deleteEssay(Long userId,Long essayId) {

        Essay essay = essayRepository.findById(essayId).orElseThrow(EssayNotFoundException::new);

        if (essay.getUser().getId() != userId) {
            throw new UnauthorizedException();
        }

        essayRepository.delete(essay);

    }



}
