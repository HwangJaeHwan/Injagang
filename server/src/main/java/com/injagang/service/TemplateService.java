package com.injagang.service;

import com.injagang.domain.Template;
import com.injagang.domain.TemplateQuestion;
import com.injagang.domain.User;
import com.injagang.exception.TemplateNotExistException;
import com.injagang.exception.UnauthorizedException;
import com.injagang.exception.UserNotFoundException;
import com.injagang.repository.TemplateRepository;
import com.injagang.repository.UserRepository;
import com.injagang.request.TemplateCreate;
import com.injagang.response.TemplateInfo;
import com.injagang.response.TemplateList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class TemplateService {

    private final TemplateRepository templateRepository;
    private final UserRepository userRepository;


    public Long addTemplate(Long userId, TemplateCreate templateCreate) {

        adminCheck(userId);

        Template template = Template.builder()
                .title(templateCreate.getTitle())
                .build();

        for (String question : templateCreate.getQuestions()) {

            template.addQuestion(TemplateQuestion.builder()
                    .question(question)
                    .build());

            templateRepository.save(template);

        }


        return template.getId();


    }

    public TemplateInfo readTemplate(Long templateId){

        Template template = templateRepository.findById(templateId).orElseThrow(TemplateNotExistException::new);
        TemplateInfo templateInfo = TemplateInfo.builder()
                .title(template.getTitle())
                .build();

        for (TemplateQuestion question : template.getQuestions()) {
            templateInfo.addQuestion(question.getQuestion());

        }

        return templateInfo;



    }

    public List<TemplateList> templates() {

        return templateRepository.findAll().stream().map(TemplateList::new).collect(Collectors.toList());

    }

    public void delete(Long userId, Long templateId) {

        adminCheck(userId);


        templateRepository.deleteById(templateId);

    }


    private void adminCheck(Long userId){

        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        if (!user.getRole().equals("ADMIN")) {
            throw new UnauthorizedException();
        }


    }

}
