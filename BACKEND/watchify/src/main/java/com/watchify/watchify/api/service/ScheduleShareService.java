package com.watchify.watchify.api.service;


import com.google.gson.Gson;
import com.watchify.watchify.db.entity.ScheduleShare;
import com.watchify.watchify.db.repository.ScheduleShareRepository;
import com.watchify.watchify.dto.response.HistoryInfoDTO;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ScheduleShareService {

    private final ScheduleShareRepository scheduleShareRepository;
    private final ScheduleGetService scheduleGetService;

    public Map<String, Long> saveScheduleShare(Long userId, String json) {
        Map<String, Long> res = new HashMap<>();

        if (userId == null) {
            ScheduleShare scheduleShare = new ScheduleShare(json);
            res.put("pk", scheduleShare.getId());
            scheduleShareRepository.save(scheduleShare);
            return res;
        }

        Map<String, Map<Integer, List<HistoryInfoDTO>>> data = scheduleGetService.getSchedule(userId);

        Gson gson = new Gson();
        String stringData = gson.toJson(data);

        ScheduleShare scheduleShare = new ScheduleShare(json);
        res.put("pk", scheduleShare.getId());
        scheduleShareRepository.save(scheduleShare);


        return res;
    }

}
