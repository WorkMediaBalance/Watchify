package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContentRepository extends JpaRepository<Content, Long> {

    @Query(value = "select * from content c where c.id = :id", nativeQuery = true)
    Content getContentById(@Param("id") Long id);

    @Query(value = "select title from content where title like concat('%', :word, '%')", nativeQuery = true)
    List<String> getSearchBasic(String word);

    @Query(value = "select * from content where title = :word LIMIT 1", nativeQuery = true)
    Content getSearchRes(String word);

    @Query(value = "select * from content where title like concat('%', :word, '%')", nativeQuery = true)
    List<Content> getSearchAllRes(String word);
}
