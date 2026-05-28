package com.injagang.controller;

import com.injagang.request.FeedbackWrite;
import com.injagang.request.ReviseFeedback;
import com.injagang.resolver.data.UserSession;
import com.injagang.response.FeedbackList;
import com.injagang.service.FeedbackService;
import com.injagang.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/feedbacks")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;
    private final LikeService likeService;

    @PostMapping()
    public void writeFeedback(UserSession userSession, @RequestBody @Valid FeedbackWrite feedbackWrite) {

        feedbackService.writeFeedback(userSession.getUserId(), feedbackWrite);
    }

    @PatchMapping("/revise")
    public void reviseFeedback(UserSession userSession, @RequestBody @Valid ReviseFeedback reviseFeedback) {

        feedbackService.reviseFeedback(userSession.getUserId(), reviseFeedback);

    }

    @DeleteMapping("/{feedbackId}")
    public void deleteFeedback(UserSession userSession, @PathVariable Long feedbackId) {
        feedbackService.deleteFeedback(userSession.getUserId(),feedbackId);
    }

    @GetMapping("/{qnaId}")
    public List<FeedbackList> feedbacksByQna(UserSession userSession, @PathVariable Long qnaId) {

        return feedbackService.feedbacksByQna(userSession.getUserId(), qnaId);

    }

    @PostMapping("/{feedbackId}/like")
    public boolean feedbackLike(UserSession userSession,@PathVariable Long feedbackId) {

        return likeService.toggleFeedbackLike(feedbackId, userSession.getUserId());
    }
}
