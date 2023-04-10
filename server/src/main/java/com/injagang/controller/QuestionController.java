package com.injagang.controller;

import com.injagang.config.data.UserSession;
import com.injagang.domain.QuestionType;
import com.injagang.request.DeleteIds;
import com.injagang.request.QuestionResponse;
import com.injagang.request.QuestionWrite;
import com.injagang.request.RandomRequest;
import com.injagang.service.AuthService;
import com.injagang.service.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;


    @GetMapping("/add")
    public void addQuestions(UserSession userSession, @RequestBody QuestionWrite questionWrite) {

        questionService.addQuestions(userSession.getUserId(), questionWrite);

    }

    @GetMapping("/random")
    public List<QuestionResponse> random(RandomRequest request) {

        return questionService.randomQuestions(request);

    }


    @GetMapping
    public List<QuestionResponse> questionsByType(@RequestParam(required = false) QuestionType questionType) {

        return questionService.questionsByType(questionType);

    }


    @DeleteMapping
    public void delete(UserSession userSession,@RequestParam DeleteIds ids) {

        questionService.delete(userSession.getUserId(), ids.getIds());


    }


}
