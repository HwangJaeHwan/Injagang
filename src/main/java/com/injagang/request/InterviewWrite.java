package com.injagang.request;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class InterviewWrite {

    private String title;
    private MultipartFile interview;




}
