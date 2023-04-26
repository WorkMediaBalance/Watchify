package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {

}
