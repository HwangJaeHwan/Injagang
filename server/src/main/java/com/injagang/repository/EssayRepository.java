package com.injagang.repository;

import com.injagang.domain.Essay;
import com.injagang.domain.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EssayRepository extends JpaRepository<Essay, Long> {

    @Query("select distinct e from Essay e join fetch e.qnaList where e.user =:user")
    List<Essay> findAllByUser(@Param("user") User user);
}
