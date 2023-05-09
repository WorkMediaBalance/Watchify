package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.OTT;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.entity.UserOTT;
import com.watchify.watchify.db.repository.OTTRepository;
import com.watchify.watchify.db.repository.UserOTTRepository;
import com.watchify.watchify.db.repository.UserRepository;
import com.watchify.watchify.dto.response.OttDateDTO;
import com.watchify.watchify.dto.response.UserOttDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MyOttService {

    private final UserRepository userRepository;
    private final UserOTTRepository userOTTRepository;
    private final OTTRepository ottRepository;

    @Transactional
    public UserOttDTO getMyOttInfo(Long userId) {

        List<UserOTT> userOtts = userOTTRepository.getUserOTTSByUserId(userId);
        UserOttDTO userOttDTO = new UserOttDTO();
        for (UserOTT userOtt : userOtts) {
            userOttDTO.setOf(userOtt.getOtt().getName(), true);
        }
        return userOttDTO;
    }

    @Transactional
    public void updateMyOttInfo(Long userId, UserOttDTO userOttDTO) {
        User user = userRepository.findById(userId).get();
        List<UserOTT> userOtts = userOTTRepository.getUserOTTSByUserIdNotOver(userId);
        List<OTT> otts = ottRepository.findAll();
        for (OTT ott : otts) {
            OttDateDTO ottDateDTO = userOttDTO.getOf(ott.getName());
            if (ottDateDTO.getStart() == null) {
                // start가 null 이면 구독 그냥 안한것과 같음
            } else {
                for (UserOTT userOtt : userOtts) {
                    boolean flag = true;
                    if (userOtt.getOtt().getName().equals(ott.getName())) {
                        // DB 에 있으면 수정
                        // 일반적으로 자
                        LocalDate startDate = LocalDate.parse(userOttDTO.getOf())
                        userOtt

                        flag = false;
                        break;
                    }
                }
            }
        }
    }
}
