package com.injagang.domain.user;

import com.injagang.domain.base.Timestamp;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    private String loginId;

    private String password;

    private String nickname;

    private String email;

    @Enumerated(EnumType.STRING)
    private UserType type;

    private String provider;

    private String providerId;

    @Builder
    public User(String loginId, String password, String nickname, String email,
                UserType type, String provider, String providerId) {
        this.loginId = loginId;
        this.password = password;
        this.nickname = nickname;
        this.email = email;
        this.type = type;
        this.provider = provider;
        this.providerId = providerId;
    }

    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

    public void changePassword(String newPassword) {
        password = newPassword;
    }
}
