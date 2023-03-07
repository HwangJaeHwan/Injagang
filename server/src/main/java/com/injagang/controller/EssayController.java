package com.injagang.controller;

import com.injagang.config.data.UserSession;
import com.injagang.request.EssayWrite;
import com.injagang.response.EssayList;
import com.injagang.response.EssayRead;
import com.injagang.service.EssayService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/essay")
@RequiredArgsConstructor
public class EssayController {

    private final EssayService essayService;


    @PostMapping("/write")
    public void writeEssay(UserSession userSession, @RequestBody @Valid EssayWrite essayWrite) {

        essayService.writeMyEssay(userSession.getUserId(), essayWrite);

    }

    @GetMapping("/read/{essayId}")
    public EssayRead readEssay(@PathVariable Long essayId) {

        return essayService.readEssay(essayId);


    }

    @GetMapping("/{loginId}")
    public List<EssayList> myEssays(@PathVariable String loginId) {

        return essayService.essays(loginId);

    }


}
