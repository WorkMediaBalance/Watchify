package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.Calender;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.entity.WishContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface WishContentRepository extends JpaRepository<WishContent, Long> {

    @Query(value = "select * from wish_content wc where wc.user_id = :userId and is_deleted = false order by wc.updated_at desc ", nativeQuery = true)
    List<WishContent> getMyWishList(@Param("userId") Long userId);

    @Query(value = "select * from wish_content wc where wc.user_id = :userId order by wc.updated_at desc ", nativeQuery = true)
    List<WishContent> getAllMyWishList(@Param("userId") Long userId);

    @Query(value = "select content_id from wish_content wc where wc.user_id = :userId and is_deleted = false order by wc.updated_at desc ", nativeQuery = true)
    List<Long> getContentIdInMyWishList(@Param("userId") Long userId);
}
