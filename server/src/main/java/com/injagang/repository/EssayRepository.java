package com.injagang.repository;

import com.injagang.domain.Essay;
import com.injagang.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EssayRepository extends JpaRepository<Essay, Long> {

    List<Essay> findAllByUser(User user);
}
