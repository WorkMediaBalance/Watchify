package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.ContentOTT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContentOTTRepository extends JpaRepository<ContentOTT, Long> {

    @Query(value = "select * from contentott c where c.content_id = :contentId order by c.ott_id", nativeQuery = true)
    List<ContentOTT> getContentOTTByContentId(@Param("contentId") Long contentId);

    @Query(value = "SELECT * FROM contentott c JOIN ott ot Join content con WHERE ot.name = :ott ORDER BY con.rate DESC limit 10", nativeQuery = true)
    List<ContentOTT> findContentOTT(@Param("ott") String ott);
}
