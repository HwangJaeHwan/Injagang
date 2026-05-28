package com.injagang.repository;

import com.injagang.domain.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HashtagRepository extends JpaRepository<Hashtag, Long> {


    boolean existsByHashtag(String hashtag);

    Optional<Hashtag> findByHashtag(String hashtag);


}
