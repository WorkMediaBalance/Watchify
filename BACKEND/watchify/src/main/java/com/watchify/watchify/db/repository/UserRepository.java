package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 이메일과 프로바이더를 이용해 기 가입자인지 확인.
    Optional<User> findByEmailAndProvider(String email, String provider);

    Optional<User> findById(Long userid);

    @Query(value = " select * from user u where u.id = :userId and is_deleted = false", nativeQuery = true)
    User getUserById(@Param("userId") Long userId);

    @Query(value = "select  * from user u where is_deleted = false and is_content_alarm = ture", nativeQuery = true)
    List<User> getUsersContentAlarm();

    @Query(value = "select  * from user u where is_deleted = false and is_ott_alarm = ture", nativeQuery = true)
    List<User> getUsersOttAlarm();
}
