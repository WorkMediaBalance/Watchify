package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.*;
import com.watchify.watchify.db.repository.*;
import com.watchify.watchify.dto.request.ScheduleCheckRequestDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@AllArgsConstructor
public class ScheduleCheckService {

    private final UserViewingStatusRepository userViewingStatusRepository;
    private final TurnContentRepository turnContentRepository;
    private final UserRepository userRepository;
    private final CalenderRepository calenderRepository;

    public void checkSchedule(Long userId, ScheduleCheckRequestDTO dto) {
        Long pk = dto.getPk();
        int ep = dto.getEpisode();
        LocalDate date = dto.getDate();

        User user = userRepository.getUserById(userId);
        TurnContent turnContent = turnContentRepository.getSpecificTurnContent(pk, ep);
        UserViewingStatus userViewingStatus = new UserViewingStatus(user, turnContent);

        // calender 에서도 view_date 갱신, 히스토리에서 써야됨
        // date 와 turnContent, user 를 이용해서 해당 캘린더를 찾자.
        Calender calender = calenderRepository.getSpecificByUserDateTurnContent(userId, date, turnContent.getId());
        calender.watchThis();


        userViewingStatusRepository.save(userViewingStatus);
        calenderRepository.save(calender);
    }

    public void checkCancelSchedule(Long userId, ScheduleCheckRequestDTO dto) {
        Long pk = dto.getPk();
        int ep = dto.getEpisode();
        LocalDate date = dto.getDate();

        TurnContent turnContent = turnContentRepository.getSpecificTurnContent(pk, ep);

        // check 하면서 등록한 DB가 2곳 userViewingStatus, calender
        // 2곳다 deleted 시켜준다.
        // 단 calender 는 viewDate 랑 isView 를 취소시키는 작업임

        UserViewingStatus userViewingStatus = userViewingStatusRepository.getByUserTurnContent(userId, turnContent.getId());
        userViewingStatus.deleted();

        Calender calender = calenderRepository.getSpecificByUserDateTurnContent(userId, date, turnContent.getId());
        calender.cancelWatchThis();

        userViewingStatusRepository.save(userViewingStatus);
        calenderRepository.save(calender);
    }
}
