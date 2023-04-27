package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.UserOtt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserOTTRepository extends JpaRepository<UserOtt, Long> {

    @Query(value = "select u.user_id, u.is_deleted from user_ott u where u.user_id = :userId and u.is_deleted = false", nativeQuery = true)
    List<UserOtt> getUserOTTSByUserID(Long userId);

}
