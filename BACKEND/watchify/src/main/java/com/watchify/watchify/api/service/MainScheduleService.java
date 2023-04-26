package com.watchify.watchify.api.service;

import com.watchify.watchify.dto.response.MainScheduleDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MainScheduleService {

    @Transactional
    public MainScheduleDTO getMainSchedule() {

        MainScheduleDTO res = new MainScheduleDTO();
        return res;
    }
}
