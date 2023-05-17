package com.watchify.watchify.api.service;


import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MyProfileService {

    private final UserRepository userRepository;

    @Transactional
    public void updateProfileNickName(Long userid, String nickName) {
        Optional<User> optionalUser = userRepository.findById(userid);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.updateNickName(nickName);
            userRepository.save(user);
        }
    }

}
