package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 이메일과 프로바이더를 이용해 기 가입자인지 확인.
    Optional<User> findByEmailAndProvider(String email, String provider);

    Optional<User> findById(Long userid);

}
