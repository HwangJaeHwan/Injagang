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
    public EssayRead readEssay(UserSession userSession,@PathVariable Long essayId) {

        return essayService.readEssay(userSession.getUserId(), essayId);


    }

    @GetMapping("/{userId}")
    public List<EssayList> myEssays(@PathVariable Long userId) {

        return essayService.essays(userId);
    }


    @PatchMapping("/revise/{essayId}")
    public void reviseEssay(UserSession userSession,@PathVariable Long essayId,@RequestBody EssayWrite essayWrite) {

        essayService.reviseEssay(userSession.getUserId(),essayId, essayWrite);


    }

    @DeleteMapping("/delete/{essayId}")
    public void deleteEssay(UserSession userSession, @PathVariable Long essayId) {

        essayService.deleteEssay(userSession.getUserId(), essayId);


    }


}
