package com.injagang.domain.like;

import com.injagang.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.*;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name = "likes")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@NoArgsConstructor(access = PROTECTED)
public abstract class Like {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "like_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Like(User user) {
        this.user = user;
    }
}
