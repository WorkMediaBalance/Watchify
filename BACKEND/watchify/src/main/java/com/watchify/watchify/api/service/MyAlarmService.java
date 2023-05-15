package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.repository.UserRepository;
import com.watchify.watchify.dto.response.UserAlarmInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MyAlarmService {

    private final UserRepository userRepository;

    @Transactional
    public void updateOttAlarm(Long userId) {
        User user = userRepository.findById(userId).get();
        user.updateOttAlarm();
        userRepository.save(user);
    }

    @Transactional
    public void updateContentAlarm(Long userId) {
        User user = userRepository.findById(userId).get();
        user.updateContentAlarm();
        userRepository.save(user);
    }

    @Transactional
    public UserAlarmInfoDTO getMyAlarmInfo(Long userId) {
        User user = userRepository.findById(userId).get();
        UserAlarmInfoDTO userAlarmInfoDTO = new UserAlarmInfoDTO();
        userAlarmInfoDTO.setOtt(user.isOttAlarm());
        userAlarmInfoDTO.setContent(user.isContentAlarm());
        return userAlarmInfoDTO;
    }

}
