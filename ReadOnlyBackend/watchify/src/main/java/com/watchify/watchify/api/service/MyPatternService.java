package com.watchify.watchify.api.service;


import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.entity.UserDay;
import com.watchify.watchify.db.repository.UserDayRepository;
import com.watchify.watchify.dto.response.UserPatternDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MyPatternService {

    private final UserDayRepository userDayRepository;

    @Transactional
    public UserPatternDTO getMyPattern(Long userid) {

        List<UserDay> userDays = userDayRepository.getUserDayByUserId(userid);
        List<Integer> patterns = new ArrayList<>();
        for (UserDay userDay : userDays) {
            patterns.add(userDay.getTime());
        }

        return new UserPatternDTO(patterns);
    }

    @Transactional
    public void updateMyPattern(Long userId, UserPatternDTO userPatternDTO) {

        List<UserDay> userDays = userDayRepository.getUserDayByUserId(userId);
        for (int i=0; i < 7; i++) {
            int time = userPatternDTO.getPattern().get(i);
            UserDay userDay = userDays.get(i);
            userDay.setTime(time);
            userDayRepository.save(userDay);
        }
    }
}
