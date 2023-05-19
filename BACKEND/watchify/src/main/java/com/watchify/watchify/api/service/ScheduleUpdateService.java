package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.*;
import com.watchify.watchify.db.repository.CalenderRepository;
import com.watchify.watchify.db.repository.ContentRepository;
import com.watchify.watchify.db.repository.TurnContentRepository;
import com.watchify.watchify.db.repository.UserRepository;
import com.watchify.watchify.dto.response.ScheduleModifyDTO;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ScheduleUpdateService {

    private final UserRepository userRepository;
    private final TurnContentRepository turnContentRepository;
    private final CalenderRepository calenderRepository;
    private final ContentRepository contentRepository;

    public void updateScheduleVer2(Long userId, ScheduleModifyDTO scheduleModifyDTO) {
        LocalDate date = scheduleModifyDTO.getDate();
        Long contentPk = scheduleModifyDTO.getContentId();
        Integer thisEpisode = scheduleModifyDTO.getEpisode();
        TurnContent turnContent = turnContentRepository.getSpecificTurnContent(contentPk, thisEpisode);
        Content thisContent = contentRepository.getContentById(contentPk);

        // 기존 켈린더 오브젝트 (바꿀 값)
        Calender oldCalender = calenderRepository.getSpecificByUserDateTurnContent(userId, date, turnContent.getId());
        LocalDate newDate = scheduleModifyDTO.getNewDate();


        oldCalender.changeDate(newDate);
        calenderRepository.save(oldCalender); // 일단 date 값 무지성으로 변경하고

        // case 1. 단일 에피 소드인 경우
        if (thisContent.getFinalEpisode() <= 1 ) {
            return ; // 정렬이 필요 없어서 종료
        }

        // case 2. 에피소드가 2개 이상인 경우 정렬 필요함. ================
        // 1. contentPk 의 에피소드들중 안 본 것들만 소환
        // calender 에서 가져와야 되는거 : 같은 content 이면서 isView 가 false 인 것들
        // 특정 컨텐츠의 turnContent PK 값 모으기.
        List<Long> turnContentPkList = turnContentRepository.getTurnContentListPkByContentId(contentPk);

        // 내 캘린더 전체 불러오기/
        List<Calender> myAllCalenderList = calenderRepository.getMyCalenderList(userId);

        List<Calender> modifyCalenderList = new ArrayList<>(); // 변경 될 후보들
        List<LocalDate> dateList = new ArrayList<>(); // 후보 날짜
        List<Integer> EpList = new ArrayList<>(); // 후보 에피소드

        for (Calender calender : myAllCalenderList) {
            if (turnContentPkList.contains(calender.getTurnContent().getId()) && !calender.isView()) { // turnContentPkList 안에 있는 값이면 + 아직 안본것들
                modifyCalenderList.add(calender); // 추가.
                dateList.add(calender.getDate());
                EpList.add(calender.getTurnContent().getEpisode());
            }
        }

        dateList.sort(null);
        EpList.sort(null);

        if (dateList.size() != EpList.size()) {

            return ;
        }

        for (int i=0; i < dateList.size(); i++) {
            LocalDate dateA = dateList.get(i);
            Integer episodeA = EpList.get(i);
            for (Calender calender : modifyCalenderList) {
                if (calender.getTurnContent().getEpisode() == episodeA) {
                    calender.changeDate(dateA);
                    calenderRepository.save(calender);
                }
            }
        }
    }

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
