package com.watchify.watchify.api.service;


import com.google.gson.Gson;
import com.watchify.watchify.db.entity.Calender;
import com.watchify.watchify.db.entity.Content;
import com.watchify.watchify.db.entity.ScheduleShare;
import com.watchify.watchify.db.entity.TurnContent;
import com.watchify.watchify.db.repository.CalenderRepository;
import com.watchify.watchify.db.repository.ScheduleShareRepository;
import com.watchify.watchify.db.repository.TurnContentRepository;
import com.watchify.watchify.dto.response.HistoryInfoDTO;
import com.watchify.watchify.dto.response.ScheduleObjDTO;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ScheduleShareService {

    private final ScheduleShareRepository scheduleShareRepository;
    private final ScheduleGetService scheduleGetService;
    private final TurnContentRepository turnContentRepository;
    private final CalenderRepository calenderRepository;


    public Map<String, Long> saveScheduleShare(Long userId, String json) {
        Map<String, Long> res = new HashMap<>();

        if (userId == null) {
            ScheduleShare scheduleShare = new ScheduleShare(json);
            scheduleShareRepository.save(scheduleShare);
            res.put("pk", scheduleShare.getId());
            return res;
        }

        Map<String, Map<Integer, List<ScheduleObjDTO>>> data = scheduleGetService.getSchedule(userId);

        Gson gson = new Gson();
        String stringData = gson.toJson(data);

        ScheduleShare scheduleShare = new ScheduleShare(stringData);
        scheduleShareRepository.save(scheduleShare);
        res.put("pk", scheduleShare.getId());


        return res;
    }

    public Map<String, Map<Integer, List<ScheduleObjDTO>>> getShareSchedule(Long pk) {

        ScheduleShare scheduleShare = scheduleShareRepository.findById(pk).get();
        String data = scheduleShare.getSchedule();



        List<ScheduleObjDTO> scheduleObjDTOList = new ArrayList<>();

        JSONObject rootObject = new JSONObject(data);


        // Goson 으로 만들 문자열이라서 파싱 과정이 좀 다름!
        for (String yearMonth : rootObject.keySet()) {
            JSONObject yearObject = rootObject.getJSONObject(yearMonth);

            // 일 별로 반복
            for (String day : yearObject.keySet()) {
                JSONArray contentArray = yearObject.getJSONArray(day);

                // 내용 처리
                for (int i = 0; i < contentArray.length(); i++) {
                    JSONObject contentObject = contentArray.getJSONObject(i);
                    JSONObject dateObj = contentObject.getJSONObject("date");
                    int yearData = dateObj.getInt("year");
                    int monthData = dateObj.getInt("month");
                    int dayData = dateObj.getInt("day");
                    Boolean isView = contentObject.getBoolean("isView");

                    LocalDate date = LocalDate.of(yearData, monthData, dayData);
                    Long contentId = contentObject.getLong("pk");
                    Integer episode = contentObject.getInt("episode");


                    TurnContent turnContent = turnContentRepository.getSpecificTurnContent(contentId, episode);
                    Content content = turnContent.getContent();

                    // 객체 반환용
                    ScheduleObjDTO scheduleObjDTO = new ScheduleObjDTO(content, date, turnContent.getEpisode(), isView);
                    scheduleObjDTOList.add(scheduleObjDTO);
                }
            }
        }

        Map<String, Map<Integer, List<ScheduleObjDTO>>> res = new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM"); // 키 값 만들 포멧터
        for (ScheduleObjDTO scheduleObjDTO :scheduleObjDTOList) {
            LocalDate date = scheduleObjDTO.getDate();
            String key = date.format(formatter);
            int day = date.getDayOfMonth();

            // String Key 값이 있나 없나~
            Map<Integer, List<ScheduleObjDTO>> tmp;
            if (res.containsKey(key)) {
                // 있을경우 Map<Integer, List<HistoryInfoDTO>> 를 또 검사 해봐야함.
                tmp = res.get(key);
                List<ScheduleObjDTO> tmpList;

                if (tmp.containsKey(day)) {
                    tmpList = tmp.get(day);

                } else {
                    tmpList = new ArrayList<>();
                }
                tmpList.add(scheduleObjDTO);
                tmp.put(day, tmpList);

            } else {
                tmp = new HashMap<>();
                List<ScheduleObjDTO> tmpList = new ArrayList<>();
                tmpList.add(scheduleObjDTO);
                tmp.put(day, tmpList);
            }
            res.put(key, tmp);
        }


        return res;
    }

}
