package com.injagang.repository;

import com.injagang.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findUserByLoginId(String loginId);
    @Query(
            value = "SELECT EXISTS(SELECT 1 FROM users WHERE login_id = :loginId)",
            nativeQuery = true
    )
    Boolean existsByLoginId(String loginId);

    Optional<User> findUserByNickname(String nickname);
    @Query(
            value = "SELECT EXISTS(SELECT 1 FROM users WHERE nickname = :nickname)",
            nativeQuery = true
    )
    Boolean existsByNickname(String nickname);
}
