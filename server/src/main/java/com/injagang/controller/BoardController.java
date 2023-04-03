package com.injagang.controller;

import com.injagang.config.data.UserSession;
import com.injagang.request.BoardWrite;
import com.injagang.request.FeedbackWrite;
import com.injagang.request.ReviseFeedback;
import com.injagang.response.BoardRead;
import com.injagang.response.BoardRevise;
import com.injagang.response.FeedbackList;
import com.injagang.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;


    @GetMapping("/{boardId}")
    public BoardRead readBoard(UserSession userSession, @PathVariable Long boardId) {

        return boardService.readBoard(userSession.getUserId(), boardId);


    }

    @PostMapping("/write")
    public void writeBoard(UserSession userSession, @RequestBody @Valid BoardWrite boardWrite) {

        boardService.writeBoard(userSession.getUserId(), boardWrite);


    }

    @PatchMapping("/revise")
    public void reviseBoard(UserSession userSession,@RequestBody @Valid BoardRevise boardRevise) {

        boardService.reviseBoard(userSession.getUserId(), boardRevise);

    }

    @PostMapping("/feedback")
    public void writeFeedback(UserSession userSession,  @RequestBody FeedbackWrite feedbackWrite) {

        boardService.writeFeedback(userSession.getUserId(), feedbackWrite);
    }

    @PatchMapping("/feedback/revise")
    public void reviseFeedback(UserSession userSession, @RequestBody @Valid ReviseFeedback reviseFeedback) {

        boardService.reviseFeedback(userSession.getUserId(), reviseFeedback);

    }

    @GetMapping("/feedback/{qnaId}")
    public List<FeedbackList> feedbacksByQna(UserSession userSession, @PathVariable Long qnaId) {

        return boardService.feedbacksByQna(userSession.getUserId(), qnaId);

    }

}
