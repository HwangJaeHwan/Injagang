package com.injagang.response;


import com.injagang.domain.Board;
import com.injagang.domain.qna.BoardQnA;
import com.injagang.domain.qna.QnA;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class BoardRead {


    private Long boardId;

    private String title;

    private Long userId;

    private String nickname;

    private String content;

    private String essayTitle;

    private boolean owner = false;

    private long viewCount;

    private long likes;

    private boolean liked;

    private LocalDateTime createdAt;

    private List<QnAInfo> qnaList = new ArrayList<>();

    private List<String> hashtags = new ArrayList<>();


    public BoardRead(Long userId, Board board, long likes, boolean liked,List<BoardQnA> qna, List<String> hashtags) {

        this.boardId = board.getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.essayTitle = board.getEssayTitle();
        this.userId = board.getUser().getId();
        this.nickname = board.getUser().getNickname();
        this.viewCount = board.getViewCount();
        this.likes = likes;
        this.liked = liked;
        this.createdAt = board.getCreatedTime();

                getHashtags().addAll(hashtags);


        if (userId != null && userId.equals(board.getUser().getId())) {
            owner = true;
        }


        for (QnA qnA : qna) {

            qnaList.add(QnAInfo.builder()
                    .qnaId(qnA.getId())
                    .question(qnA.getQuestion())
                    .answer(qnA.getAnswer())
                    .build()
            );

        }


    }



}
