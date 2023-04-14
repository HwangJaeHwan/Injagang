package com.injagang.controller;

import com.injagang.config.data.UserSession;
import com.injagang.request.InterviewWrite;
import com.injagang.service.InterviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileUrlResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;

@Slf4j
@RestController
@RequestMapping("/interview")
@RequiredArgsConstructor
public class InterviewController {


    private final InterviewService interviewService;


    @GetMapping("/{interviewId}")
    public UrlResource playVideo(@PathVariable Long interviewId) throws MalformedURLException {

        return interviewService.playVideo(interviewId);


    }

    @PostMapping("/save")
    public void saveInterview(UserSession userSession, InterviewWrite interviewWrite) throws IOException {

        interviewService.saveInterview(userSession.getUserId(), interviewWrite);

    }

}
