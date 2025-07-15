package com.injagang.service;

import com.injagang.domain.Essay;
import com.injagang.domain.qna.EssayQnA;
import com.injagang.domain.user.User;
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
import io.micrometer.core.annotation.Counted;
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


    @Counted("essay")
    @Transactional
    public Long writeMyEssay(Long userId, EssayWrite essayWrite) {
        // 1) 시작 로그: 요청한 userId, 제목, QnA 개수
        log.info("에세이 작성 시도 → userId={}, title={}, qnaCount={}",
                userId,
                essayWrite.getTitle(),
                essayWrite.getQnaList() != null ? essayWrite.getQnaList().size() : 0);

        // 2) 사용자 조회 실패 시 로그
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("에세이 작성 실패(사용자 없음) → userId={}", userId);
                    return new UserNotFoundException();
                });

        // 3) 에세이 엔티티 생성 및 QnA 추가
        Essay essay = Essay.builder()
                .user(user)
                .title(essayWrite.getTitle())
                .build();

        if (essayWrite.getQnaList() != null) {
            for (QnaRequest qna : essayWrite.getQnaList()) {
                essay.addQnA(EssayQnA.builder()
                        .question(qna.getQuestion())
                        .answer(qna.getAnswer())
                        .build());
            }
        }

        // 4) 저장
        Essay saveEssay = essayRepository.save(essay);

        // 5) 성공 로그: 생성된 에세이 ID, 실제 저장된 QnA 개수
        int savedQnaCount = saveEssay.getQnaList().size();

        log.info("에세이 작성 성공 → essayId={}, savedQnaCount={}",
                saveEssay.getId(),
                savedQnaCount);

        return saveEssay.getId();
    }

    public EssayRead readEssay(Long userId, Long essayId) {

        log.info("에세이 조회 시도 → userId={}, essayId={}", userId, essayId);

        Essay essay = essayRepository.findById(essayId)
                .orElseThrow(() -> {
                    log.warn("에세이 조회 실패 → essayId={}", essayId);
                    return new EssayNotFoundException();
                });

        List<EssayQnA> qnaList = qnARepository.findAllByEssay(essay);

        log.info("에세이 조회 성공 → essayId={}, qnaCount={}", essayId, qnaList.size());

        return new EssayRead(essay, userId, qnaList);
    }

    public List<EssayList> essays(Long userId) {

        log.info("에세이 목록 조회 시도 → userId={}", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("에세이 목록 조회 실패 → userId={}", userId);
                    return new UserNotFoundException();
                });

        List<Essay> essays = essayRepository.findAllByUser(user);

        log.info("에세이 목록 조회 완료 → userId={}, count={}", userId, essays.size());

        return essays.stream()
                .map(EssayList::new)
                .collect(Collectors.toList());
    }
    @Transactional
    public void reviseEssay(Long userId, Long essayId, EssayWrite essayWrite) {

        log.info("에세이 수정 시도 → userId={}, essayId={}", userId, essayId);

        Essay essay = essayRepository.findById(essayId)
                .orElseThrow(() -> {
                    log.warn("에세이 수정 실패(찾을 수 없음) → essayId={}", essayId);
                    return new EssayNotFoundException();
                });

        if (!userId.equals(essay.getUser().getId())) {
            log.warn("에세이 수정 권한 없음 → userId={}, essayOwnerId={}",
                    userId, essay.getUser().getId());
            throw new UnauthorizedException();
        }

        essay.reviseTitle(essayWrite.getTitle());

        qnARepository.deleteEssayQnAByEssay(essay);

        for (QnaRequest qna : essayWrite.getQnaList()) {
            EssayQnA eq = EssayQnA.builder()
                    .question(qna.getQuestion())
                    .answer(qna.getAnswer())
                    .build();
            eq.registerEssay(essay);
            qnARepository.save(eq);
        }

        log.info("에세이 수정 성공 → essayId={}", essayId);
    }

    @Counted("essay")
    @Transactional
    public void deleteEssay(Long userId, Long essayId) {

        log.info("에세이 삭제 시도 → userId={}, essayId={}", userId, essayId);

        Essay essay = essayRepository.findById(essayId)
                .orElseThrow(() -> {
                    log.warn("에세이 삭제 실패(찾을 수 없음) → essayId={}", essayId);
                    return new EssayNotFoundException();
                });

        if (!essay.getUser().getId().equals(userId)) {
            log.warn("에세이 삭제 권한 없음 → userId={}, essayOwnerId={}",
                    userId, essay.getUser().getId());
            throw new UnauthorizedException();
        }

        qnARepository.deleteEssayQnAsIn(qnARepository.findAllByEssay(essay));
        essayRepository.delete(essay);

        log.info("에세이 삭제 성공 → essayId={}", essayId);
    }



}
