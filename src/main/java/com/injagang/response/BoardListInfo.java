package com.injagang.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class BoardListInfo {

    private Long id;

    private String title;

    private String nickname;

    private Boolean isLock;

    private Boolean isNotice;

    private String content;

    private long viewCount;

    private LocalDateTime createdAt;

    private Integer qnaCount;

    private long likes;

    private List<String> hashtags = new ArrayList<>();

    @Builder
    public BoardListInfo(Long id, String title, String nickname, Boolean isLock, Boolean isNotice, String content,
                         long viewCount, LocalDateTime createdAt, Integer qnaCount, long likes, List<String> hashtags) {
        this.id = id;
        this.title = title;
        this.nickname = nickname;
        this.isLock = isLock;
        this.isNotice = isNotice;
        this.content = content;
        this.viewCount = viewCount;
        this.createdAt = createdAt;
        this.qnaCount = qnaCount;
        this.likes = likes;
        this.hashtags = hashtags;
    }
}
