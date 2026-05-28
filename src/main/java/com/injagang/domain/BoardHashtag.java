package com.injagang.domain;

import com.injagang.domain.base.Timestamp;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.FetchType.*;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class BoardHashtag  extends Timestamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_hashtag_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "board_id")
    private Board board;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "hashtag_id")
    private Hashtag hashtag;

    public BoardHashtag(Board board, Hashtag hashtag) {
        this.board = board;
        this.hashtag = hashtag;
    }
}
