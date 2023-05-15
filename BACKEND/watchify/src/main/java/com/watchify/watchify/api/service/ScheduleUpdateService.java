package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.Calender;
import com.watchify.watchify.db.entity.TurnContent;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.repository.CalenderRepository;
import com.watchify.watchify.db.repository.TurnContentRepository;
import com.watchify.watchify.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ScheduleUpdateService {

    private final UserRepository userRepository;
    private final TurnContentRepository turnContentRepository;
    private final CalenderRepository calenderRepository;

    public void updateSchedule(Long userId, String json) {

        User user = userRepository.getUserById(userId);


        //수정전 캘린더에 기존 데이터는 삭제
        List<Calender> existingSch = calenderRepository.getMyCalenderList(userId);
        for (Calender calender : existingSch) {
            calender.updateDelete(true);
            calenderRepository.save(calender);
        }

        JSONObject rootObject = new JSONObject(json);

        // 년+월 별로 반복
        for (String yearMonth : rootObject.keySet()) {
            JSONObject yearObject = rootObject.getJSONObject(yearMonth);

            // 일 별로 반복
            for (String day : yearObject.keySet()) {
                JSONArray contentArray = yearObject.getJSONArray(day);

                // 내용 처리
                for (int i = 0; i < contentArray.length(); i++) {
                    JSONObject contentObject = contentArray.getJSONObject(i);
                    String stringDate = contentObject.getString("date");
                    Long contentId = contentObject.getLong("pk");
                    Integer episode = contentObject.getInt("episode");

                    LocalDate date = LocalDate.parse(stringDate);
                    TurnContent turnContent = turnContentRepository.getSpecificTurnContent(contentId, episode);

                    // calender 에 들어갈 ott 가 크게 의미가 없어졌음.. ott 가 없는것도 있고 ott 를 구독하고 있지 않은 유저도 스케줄을 짤순있으니
                    Calender calender = new Calender(user, turnContent, null, date);
                    calenderRepository.save(calender);
                }
            }
        }


    }
}
