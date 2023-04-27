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
    public void UpdateOttAlarm() {
        System.out.println("여기서 오류가 난거 같은데 1");
        // oauth 적용전
        User user = userRepository.findById(1L).get();
        System.out.println("여기서 오류가 난거 같은데 2");
        user.updateOttAlarm();
        userRepository.save(user);
        System.out.println("여기서 오류가 난거 같은데 3");
    }
}
