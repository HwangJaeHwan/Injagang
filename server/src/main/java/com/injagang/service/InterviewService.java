package com.injagang.service;

import com.injagang.domain.Interview;
import com.injagang.domain.User;
import com.injagang.exception.UserNotFoundException;
import com.injagang.repository.InterviewRepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.InterviewWrite;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileUrlResource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class InterviewService {

    private final UserRepository userRepository;
    private final InterviewRepository interviewRepository;
    private String file = "zz";


    public void saveInterview(Long userId, InterviewWrite interviewWrite) throws IOException {

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        MultipartFile video = interviewWrite.getInterview();
        video.transferTo(new File(file + video.getOriginalFilename()));

        Interview interview = Interview.builder()
                .title(interviewWrite.getTitle())
                .user(user)
                .path(file + video.getOriginalFilename())
                .build();

        interviewRepository.save(interview);

    }

    public UrlResource playVideo(Long interviewId) throws MalformedURLException {

        Interview interview = interviewRepository.findById(interviewId).orElseThrow(RuntimeException::new);
        
        return new UrlResource(file + interview.getPath());

    }

}
