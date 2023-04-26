package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.Content;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {

}
