package com.injagang.repository;

import com.injagang.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findUserByLoginId(String loginId);

    Optional<User> findUserByNickname(String nickname);
}
