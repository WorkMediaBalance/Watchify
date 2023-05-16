package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.UserViewingStatus;
import com.watchify.watchify.db.entity.WishContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserViewingStatusRepository extends JpaRepository<UserViewingStatus, Long> {

    @Query(value = "select * from user_viewing_status where user_id = :userId and is_deleted = false", nativeQuery = true)
    List<UserViewingStatus> getMyViewStatue(Long userId);

    @Query(value = "select * from user_viewing_status where user_id = :userId and turn_content_id =:tcId and is_deleted = false", nativeQuery = true)
    UserViewingStatus getByUserTurnContent(Long userId, Long tcId);
}
