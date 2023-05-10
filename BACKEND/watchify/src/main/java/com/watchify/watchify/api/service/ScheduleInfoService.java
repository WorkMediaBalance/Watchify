package com.watchify.watchify.api.service;

import com.watchify.watchify.dto.response.CalenderDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ScheduleInfoService {

    private Cla

    @Transactional
    public Map<Integer, List<CalenderDTO>> getScheduleInfo(Long userId, int year, int month) {

    }

}
