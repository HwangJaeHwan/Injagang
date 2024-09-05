package com.injagang.service;

import com.injagang.domain.Essay;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.domain.User;
import com.injagang.exception.EssayNotFoundException;
import com.injagang.exception.UnauthorizedException;
import com.injagang.exception.UserNotFoundException;
import com.injagang.repository.EssayRepository;
import com.injagang.repository.QnARepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.EssayWrite;
import com.injagang.request.QnaRequest;
import com.injagang.response.EssayList;
import com.injagang.response.EssayRead;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

        for (QnaRequest qna : essayWrite.getQnaList()) {

            essay.addQnA(EssayQnA.builder()
                    .question(qna.getQuestion())
                    .answer(qna.getAnswer())
                    .build());

        }

        Essay save = essayRepository.save(essay);

        return save.getId();

    }

    public EssayRead readEssay(Long userId, Long essayId) {

        Essay essay = essayRepository.findById(essayId).orElseThrow(EssayNotFoundException::new);

        List<EssayQnA> qnaList = qnARepository.findAllByEssay(essay);

        return new EssayRead(essay, userId, qnaList);


    }

    public List<EssayList> essays(Long userId) {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        return essayRepository.findAllByUser(user).stream().map(EssayList::new).collect(Collectors.toList());


    }
    @Transactional
    public void reviseEssay(Long userId,Long essayId, EssayWrite essayWrite) {
        Essay essay = essayRepository.findById(essayId).orElseThrow(EssayNotFoundException::new);

        if (userId != essay.getUser().getId()) {
            throw new UnauthorizedException();
        }

        essay.reviseTitle(essayWrite.getTitle());

//        List<EssayQnA> deleteQna = qnARepository.findAllByEssay(essay);

//        qnARepository.deleteEssayQnAsIn(deleteQna);

        qnARepository.deleteEssayQnAByEssay(essay);

        List<EssayQnA> newQnAs = new ArrayList<>();

        for (QnaRequest qna : essayWrite.getQnaList()) {

            EssayQnA essayQnA = EssayQnA.builder()
                    .question(qna.getQuestion())
                    .answer(qna.getAnswer())
                    .build();

            essayQnA.registerEssay(essay);
            newQnAs.add(essayQnA);

        }

        qnARepository.saveAll(newQnAs);


    }


    @Transactional
    public void deleteEssay(Long userId,Long essayId) {

        Essay essay = essayRepository.findById(essayId).orElseThrow(EssayNotFoundException::new);

        if (essay.getUser().getId() != userId) {
            throw new UnauthorizedException();
        }

        List<EssayQnA> deleteQna = qnARepository.findAllByEssay(essay);

        qnARepository.deleteEssayQnAsIn(deleteQna);
        essayRepository.delete(essay);

    }



}
