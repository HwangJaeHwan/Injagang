package com.injagang.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
public class BoardList {

    private int totalPage;

    private List<BoardListInfo> boardInfos;

    private Boolean isFirst;

    private Boolean isLast;


    @Builder
    public BoardList(int totalPage, List<BoardListInfo> boardInfos, Boolean isFirst, Boolean isLast) {
        this.totalPage = totalPage;
        this.boardInfos = boardInfos;
        this.isFirst = isFirst;
        this.isLast = isLast;
    }
}
