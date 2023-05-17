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
        User user = userRepository.findById(userId).get(); // 유저
        List<UserOTT> userOtts = userOTTRepository.getUserOTTSByUserIdNotOver(userId); // 유저OTT 들 조회
        List<OTT> otts = ottRepository.findAll(); // 모든 디폴트 OTT 조회

        for (OTT ott : otts) {
            OttDateRequestDTO ottDateDTO = userOttDTO.getOf(ott.getName()); // ott(넷플 등) 의 start 와 end 가 있는 객체 얘로 수정해야됨
            LocalDate start = ottDateDTO.getStart();
            LocalDate end = ottDateDTO.getEnd();
            boolean flag = true;
            for (UserOTT userOTT : userOtts) {
                if (userOTT.getOtt().getName().equals(ott.getName())) { // 이건 DB 에 있는 경우
                    userOTT.setStart(start);
                    userOTT.setEnd(end);
                    userOTTRepository.save(userOTT);
                    flag = false;
                    break;
                }
            }
            if (flag == true) { // 이건 DB 에 없는 경우
                UserOTT newUserOtt = new UserOTT(user, ott);
                newUserOtt.setStart(start);
                newUserOtt.setEnd(end);
                userOTTRepository.save(newUserOtt);
            }
        }
    }
}
