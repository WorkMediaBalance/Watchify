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


    // 마지막 에피소드 이후의 컨텐츠만 불러옴
    @Query(value = "select * from turn_content t where t.content_id = :contentId and episode > :lastEp order by t.episode", nativeQuery = true)
    List<TurnContent> getTurnContentAtLastEp(@Param("contentId") Long contentId, @Param("lastEp") int lastEp);

    @Query(value = "select * from turn_content t where t.content_id = :contentId and episode = :ep", nativeQuery = true)
    TurnContent getSpecificTurnContent(Long contentId, int ep);

    // 특정 컨텐츠의 TurnContentPK 값들을 불러옴
    @Query(value = "select id from turn_content t where t.content_id = :contentId ", nativeQuery = true)
    List<Long> getTurnContentListPkByContentId(Long contentId);




}
