package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.repository.UserRepository;
import com.watchify.watchify.dto.response.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public Optional<User> FindUserByEmailProvider(String email, String provider) {
        Optional<User> userOptional =  userRepository.findByEmailAndProvider(email, provider);
        return userOptional;
    }

    // 맨 처음 로그인시 유저 저장
    @Transactional
    public void InitialUserSave(UserDTO userDto) {
        User newUser = new User(userDto);
        userRepository.save(newUser);
    }

    // 유저 재가입 or 탈퇴시 isDeleted 변경
    @Transactional
    public void UpdateUserIsDeleted(User user) {
        user.UpdateIsDeleted();
        userRepository.save(user);
    }

}
