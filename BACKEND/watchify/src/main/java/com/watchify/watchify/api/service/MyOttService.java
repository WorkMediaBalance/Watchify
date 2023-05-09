package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.OTT;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.entity.UserOTT;
import com.watchify.watchify.db.repository.OTTRepository;
import com.watchify.watchify.db.repository.UserOTTRepository;
import com.watchify.watchify.db.repository.UserRepository;
import com.watchify.watchify.dto.request.OttDateRequestDTO;
import com.watchify.watchify.dto.request.UserOttRequestDTO;
import com.watchify.watchify.dto.response.OttDateDTO;
import com.watchify.watchify.dto.response.UserOttDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MyOttService {

    private final UserRepository userRepository;
    private final UserOTTRepository userOTTRepository;
    private final OTTRepository ottRepository;
    private final LocalDateService localDateService;

    @Transactional
    public UserOttDTO getMyOttInfo(Long userId) {

        List<UserOTT> userOtts = userOTTRepository.getUserOTTSByUserId(userId);
        List<OTT> otts = ottRepository.findAll();
        UserOttDTO userOttDTO = new UserOttDTO();
        for (OTT ott : otts) {
            for (UserOTT userOtt : userOtts) {
                if (ott.getName().equals(userOtt.getOtt().getName())) {
                    OttDateDTO ottDateDTO = new OttDateDTO(userOtt.getStart(), userOtt.getEnd());
                    userOttDTO.setOf(ott.getName(), ottDateDTO);
                }
            }
        }

        return userOttDTO;
    }

    @Transactional
    public void updateMyOttInfo(Long userId, UserOttRequestDTO userOttDTO) {
        User user = userRepository.findById(userId).get();
        List<UserOTT> userOtts = userOTTRepository.getUserOTTSByUserIdNotOver(userId);
        List<OTT> otts = ottRepository.findAll();
        for (OTT ott : otts) {
            OttDateRequestDTO ottDateDTO = userOttDTO.getOf(ott.getName());
            if (ottDateDTO.getStart() == null) {
                // start가 null 이면 구독 그냥 안한것과 같음
            } else {
                String std = ottDateDTO.getStart();
                String end = ottDateDTO.getEnd();
                LocalDate startDate = localDateService.stringToLocalDate(std);
                LocalDate endDate = localDateService.stringToLocalDate(end);
                boolean flag = true;
                for (UserOTT userOtt : userOtts) {
                    if (userOtt.getOtt().getName().equals(ott.getName())) {
                        // DB 에 있으면 수정
                        userOtt.setStart(startDate);
                        userOtt.setEnd(endDate);
                        userOTTRepository.save(userOtt);
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    // DB에 없을때는 생성
                    UserOTT newUserOtt = new UserOTT(user, ott);
                    newUserOtt.setStart(startDate);
                    newUserOtt.setEnd(endDate);
                    userOTTRepository.save(newUserOtt);
                }
            }
        }
    }
}
