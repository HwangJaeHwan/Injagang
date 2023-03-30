package com.injagang.controller;

import com.injagang.config.data.UserSession;
import com.injagang.request.BoardWrite;
import com.injagang.response.BoardRead;
import com.injagang.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;


    @GetMapping("/{boardId}")
    public BoardRead readBoard(UserSession userSession, @PathVariable Long boardId) {

        return boardService.readBoard(boardId);


    }

    @PostMapping("/write")
    public void writeBoard(UserSession userSession, @RequestBody @Valid BoardWrite boardWrite) {

        boardService.writeBoard(userSession.getUserId(), boardWrite);


    }
}