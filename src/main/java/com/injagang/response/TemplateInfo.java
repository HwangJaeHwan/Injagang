package com.injagang.response;

import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class TemplateInfo {

    private String title;

    private List<String> questions = new ArrayList<>();


    @Builder
    public TemplateInfo(String title) {
        this.title = title;
    }


    public void addQuestion(String question){
        questions.add(question);
    }
}
