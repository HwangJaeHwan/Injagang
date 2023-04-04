package com.injagang.request;

import lombok.Builder;
import lombok.Data;

@Data
public class PageDTO {

    private int page;
    private String sort;

    public PageDTO() {
        this.page = 1;
        this.sort = "createdTime";
    }
    @Builder
    public PageDTO(int page, String sort) {
        this.page = page;
        this.sort = sort;
    }

    public int getPage() {
        return Math.max(1, page);
    }

    public long getOffset(){
        return (long) (Math.max(1, page) - 1) * 15;
    }

}
