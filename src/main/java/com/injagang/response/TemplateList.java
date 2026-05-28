package com.injagang.response;

import com.injagang.domain.Template;
import com.injagang.domain.TemplateQuestion;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class TemplateList {

    private Long templateId;

    private String title;

    private List<String> questions = new ArrayList<>();

    public TemplateList(Template template) {
        this.templateId = template.getId();
        this.title = template.getTitle();

        for (TemplateQuestion tq : template.getQuestions()) {

            questions.add(tq.getQuestion());

        }
    }
}
