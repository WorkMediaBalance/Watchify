package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContentRepository extends JpaRepository<Content, Long> {

    @Query(value = "select * from content c where c.id = :id", nativeQuery = true)
    Content getContentById(@Param("id") Long id);

}
