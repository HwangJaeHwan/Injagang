package com.injagang.domain;

import com.injagang.domain.base.Timestamp;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import static javax.persistence.GenerationType.*;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Hashtag extends Timestamp {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "hashtag_id")
    private Long id;
    @Column(unique = true, nullable = false)
    private String hashtag;

    public Hashtag(String hashtag) {
        this.hashtag = hashtag;
    }
}
