package com.injagang.response;

import com.injagang.domain.Template;
import lombok.Getter;

@Getter
public class TemplateList {

    private Long templateId;

    private String title;


    public TemplateList(Template template) {
        this.templateId = template.getId();
        this.title = template.getTitle();
    }
}
