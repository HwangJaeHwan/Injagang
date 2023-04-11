package com.injagang.request;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class DeleteIds {

    private List<Long> ids = new ArrayList<>();


    public void addId(Long id) {
        ids.add(id);
    }


}
