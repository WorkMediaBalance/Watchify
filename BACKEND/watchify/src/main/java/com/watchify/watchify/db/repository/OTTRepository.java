package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.OTT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OTTRepository extends JpaRepository<OTT, Long> {

    @Query(value = "select * from ott o where o.name = :name", nativeQuery = true)
    OTT getOTTByName(@Param("name") String name);

}
