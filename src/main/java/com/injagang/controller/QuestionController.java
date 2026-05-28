package com.injagang.controller;

import com.injagang.resolver.data.UserSession;
import com.injagang.domain.QuestionType;
import com.injagang.request.DeleteIds;
import com.injagang.response.QuestionResponse;
import com.injagang.request.QuestionWrite;
import com.injagang.request.RandomRequest;
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


    @PostMapping("/add")
    public void addQuestions(UserSession userSession, @RequestBody QuestionWrite questionWrite) {

        questionService.addQuestions(userSession.getUserId(), questionWrite);

    }

    @PostMapping("/random")
    public List<QuestionResponse> random( @RequestBody List<RandomRequest> requests) {

        return questionService.randomQuestions(requests);

    }


    @GetMapping
    public List<QuestionResponse> questionsByType(@RequestParam(required = false) QuestionType questionType) {

        return questionService.questionsByType(questionType);

    }


    @DeleteMapping
    public void delete(UserSession userSession,@RequestBody DeleteIds ids) {

        questionService.delete(userSession.getUserId(), ids.getIds());


    }


}
