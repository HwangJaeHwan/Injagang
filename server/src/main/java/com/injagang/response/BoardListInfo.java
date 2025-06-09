package com.injagang.response;

import com.injagang.domain.Board;
import lombok.Getter;

@Getter
public class BoardListInfo {

    private Long id;

    private String title;

    private String nickname;

    private Boolean isLock;


    public BoardListInfo(Board board) {
        this.id = board.getId();
        this.title = board.getTitle();
        this.nickname = board.getUser().getNickname();
        this.isLock = board.getPassword() != null;
    }
}
