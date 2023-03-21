package com.injagang.controller;

import com.injagang.config.data.UserSession;
import com.injagang.request.TemplateCreate;
import com.injagang.response.TemplateInfo;
import com.injagang.response.TemplateList;
import com.injagang.service.TemplateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/template")
@RequiredArgsConstructor
public class TemplateController {

    private final TemplateService templateService;


    @PostMapping("/add")
    public void addTemplate(UserSession userSession, @RequestBody @Valid TemplateCreate templateCreate) {

        templateService.addTemplate(userSession.getUserId(), templateCreate);

    }

    @GetMapping
    public List<TemplateList> Templates(){

        return templateService.templates();

    }

//    @GetMapping("/{templateId}")
//    public TemplateInfo readTemplate(@PathVariable Long templateId) {
//
//        return templateService.readTemplate(templateId);
//
//    }

    @DeleteMapping("/{templateId}")
    public void delete(UserSession userSession,@PathVariable Long templateId) {

        templateService.delete(userSession.getUserId(), templateId);

    }


}
