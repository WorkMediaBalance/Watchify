package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.TurnContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TurnContentRepository extends JpaRepository<TurnContent, Long> {

    @Query(value = "select * from turn_content t where t.content_id = :contentId", nativeQuery = true)
    TurnContent getSoloTurnContentById(@Param("contentId") Long contentId);

    @Query(value = "select * from turn_content t where t.content_id = :contentId order by t.episode", nativeQuery = true)
    List<TurnContent> getAllTurnContent(@Param("contentId") Long contentId);



}
