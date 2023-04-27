package com.watchify.watchify.api.controller;

import com.watchify.watchify.api.service.MainScheduleService;
import com.watchify.watchify.dto.response.CalenderDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/main")
@RequiredArgsConstructor
public class MainController {

    private final MainScheduleService mainScheduleService;

    @GetMapping("/schedule")
    public ResponseEntity<?> GetWeekSchedule() throws Exception{

        Map<Integer, List<CalenderDTO>> res = mainScheduleService.getMainSchedule();
        return ResponseEntity.status(200).body(res);

    }
}
