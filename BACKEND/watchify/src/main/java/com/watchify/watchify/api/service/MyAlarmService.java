package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MyAlarmService {

    private final UserRepository userRepository;

    @Transactional
    public void UpdateOttAlarm(Long userId) {
        // oauth 적용전
        User user = userRepository.findById(userId).get();
        user.updateOttAlarm();
        userRepository.save(user);
    }

    @Transactional
    public void UpdateContentAlarm(Long userId) {
        // oauth 적용전
        User user = userRepository.findById(userId).get();
        user.updateContentAlarm();
        userRepository.save(user);
    }

}
