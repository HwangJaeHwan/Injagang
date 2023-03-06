package com.injagang.controller;

import com.injagang.request.TemplateCreate;
import com.injagang.response.TemplateInfo;
import com.injagang.response.TemplateList;
import com.injagang.service.TemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController("/template")
@RequiredArgsConstructor
public class TemplateController {

    private final TemplateService templateService;


    @PostMapping("/add")
    public void addTemplate(@RequestBody @Valid TemplateCreate templateCreate) {

        templateService.addTemplate(templateCreate);

    }

    @GetMapping
    public List<TemplateList> Templates(){

        return templateService.templates();

    }

    @GetMapping("/{templateId}")
    public TemplateInfo readTemplate(@PathVariable Long templateId) {

        return templateService.readTemplate(templateId);

    }

    @DeleteMapping("/{templateId}")
    public void delete(@PathVariable Long templateId) {

        templateService.delete(templateId);

    }


}
