package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.UserOTT;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserOTTRepository extends JpaRepository<UserOTT, Long> {

    @Query(value = "select * from userott uo where uo.user_id = :userId and is_deleted = false", nativeQuery = true)
    List<UserOTT> getUserOTTSByUserId(@Param("userId") Long userId);

    @Query(value = "select * from userott uo where uo.user_id = :userId and is_deleted = false and is_overed = false", nativeQuery = true)
    List<UserOTT> getUserOTTSByUserIdNotOver(@Param("userId") Long userId);

}
