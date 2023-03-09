package com.injagang.response;

import com.injagang.domain.Essay;
import lombok.Getter;

@Getter
public class EssayList {


    private Long essayId;

    private String title;

    public EssayList(Essay essay) {
        this.essayId = essay.getId();
        this.title = essay.getTitle();

    }
}
