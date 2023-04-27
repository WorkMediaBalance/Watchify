package com.watchify.watchify.api.service;


import com.watchify.watchify.db.entity.UserOtt;
import com.watchify.watchify.db.repository.UserOTTRepository;
import com.watchify.watchify.db.repository.UserRepository;
import com.watchify.watchify.dto.response.MyOttDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MyOttService {

    private final UserRepository userRepository;
    private final UserOTTRepository userOTTRepository;

    @Transactional
    public MyOttDTO getMyOtt() {
        // oauth 적용전
        Long userId = 1l;

        List<UserOtt> userOtts = userOTTRepository.getUserOTTSByUserID(userId);
        MyOttDTO res = new MyOttDTO(userOtts);

        return res;
    }
}
