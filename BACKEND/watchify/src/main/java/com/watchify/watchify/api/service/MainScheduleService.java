package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.*;
import com.watchify.watchify.db.repository.*;
import com.watchify.watchify.dto.response.CalenderDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MainScheduleService {

    private final UserRepository userRepository;
    private final CalenderRepository calenderRepository;

    @Transactional
    public Map<Integer, List<CalenderDTO>> getMainSchedule() {

        Map<Integer, List<CalenderDTO>> res = new HashMap<>();

        // oauth 적용전
        Long userId = userRepository.findById(1L).get().getId();

        // 오늘날짜
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.minusDays(3);
        LocalDate endDate = today.plusDays(3);

        List<Calender> calenders = calenderRepository.getMainSchedule(userId, startDate, endDate);

        for (int i=0; i < 7; i++) {
            // start 날짜 기준 + i 번째 날짜가 있는 값 찾기
            LocalDate point = startDate.plusDays(i);
            List<Calender> filterCalenders = calenders.stream()
                    .filter(calender -> calender.getDate().isEqual(point))
                    .collect(Collectors.toList());

            List<CalenderDTO> calenderDTOS = new ArrayList<>();
            for (Calender calender : filterCalenders) {
                CalenderDTO calenderDTO = new CalenderDTO(calender);
                calenderDTOS.add(calenderDTO);
            }

            res.put(i, calenderDTOS);
        }

        return res;
    }
}