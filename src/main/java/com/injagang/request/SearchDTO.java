package com.injagang.request;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SearchDTO {

    private String type;

    private String content;

    @Builder
    public SearchDTO(String type, String content) {
        this.type = type;
        this.content = content;
    }



}
