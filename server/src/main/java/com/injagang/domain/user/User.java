package com.injagang.domain.user;

import com.injagang.domain.base.Timestamp;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.LocalDate;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name ="users")
@NoArgsConstructor(access = PROTECTED)
public class User extends Timestamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String loginId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false)
    private LocalDate birthday;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserType type;

    private String provider;

    private String providerId;

    @Column(nullable = false)
    private Boolean terms = false;

    @Column(nullable = false)
    private Boolean policy = false;

    @Builder
    public User(String loginId, String password, String nickname, LocalDate birthday, UserType type, String provider,
                String providerId, Boolean terms, Boolean policy) {
        this.loginId = loginId;
        this.password = password;
        this.nickname = nickname;
        this.birthday = birthday;
        this.type = type;
        this.provider = provider;
        this.providerId = providerId;
        this.terms = terms;
        this.policy = policy;
    }

    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

    public void changePassword(String newPassword) {
        password = newPassword;
    }
}
