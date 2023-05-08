package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.TurnContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TurnContentRepository extends JpaRepository<TurnContent, Long> {

    @Query(value = "select * from turn_content t where t.id = :id", nativeQuery = true)
    TurnContent getTurnContentById(Long id);

}
