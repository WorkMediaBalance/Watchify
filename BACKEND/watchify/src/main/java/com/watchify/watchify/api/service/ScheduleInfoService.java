package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.Calender;
import com.watchify.watchify.db.repository.CalenderRepository;
import com.watchify.watchify.dto.response.CalenderDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ScheduleInfoService {

    private CalenderRepository calenderRepository;

    @Transactional
    public Map<Integer, List<CalenderDTO>> getScheduleInfo(Long userId, int year, int month) {

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        // 그달에 해당하는 캘린더 값들
        List<Calender> monthOfCalenders = calenderRepository.getSchedule(userId, startDate, endDate);
        monthOfCalenders.sort(Comparator.comparing(Calender :: getDate)); // 날짜순으로 정렬

        for (Calender c : monthOfCalenders) {
            System.out.println(c.getDate());
        }

        Map<Integer, List<CalenderDTO>> a = null;
        return a;





    }

}
