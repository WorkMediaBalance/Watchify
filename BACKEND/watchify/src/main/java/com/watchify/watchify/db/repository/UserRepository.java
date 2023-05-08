package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
