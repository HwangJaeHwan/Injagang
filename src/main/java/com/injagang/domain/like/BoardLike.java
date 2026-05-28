package com.injagang.domain.like;

import com.injagang.domain.Board;
import com.injagang.domain.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Where;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DiscriminatorValue("BOARD")
public class BoardLike extends Like{

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    public BoardLike(User user, Board board) {
        super(user);
        this.board = board;
    }
}
