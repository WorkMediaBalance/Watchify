package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.UserDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserDayRepository extends JpaRepository<UserDay, Long> {

    @Query(value = "select * from user_day ud where ud.user_id = :userId order by day_id asc ", nativeQuery = true)
    List<UserDay> getUserDayByUserId(@Param("userId") Long userId);

}
