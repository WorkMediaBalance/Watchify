package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.LikeContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LikeContentRepository extends JpaRepository<LikeContent, Long> {

    @Query(value = "select * from like_content lc where lc.user_id = :userId and is_deleted = false", nativeQuery = true)
    List<LikeContent> getLikeContent(@Param("userId") Long userId);

    @Query(value = "select * from like_content lc where lc.user_id = :userId and lc.content_id = :contentId", nativeQuery = true)
    LikeContent getSpecificLikeContent(@Param("userId") Long userId, @Param("contentId") Long contentId);


}
