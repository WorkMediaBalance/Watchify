package com.watchify.watchify.api.controller;

import com.watchify.watchify.api.service.ScheduleCreateService;
import com.watchify.watchify.api.service.ScheduleInfoService;
import com.watchify.watchify.api.service.UserService;
import com.watchify.watchify.dto.request.ScheduleCreateRequestDTO;
import com.watchify.watchify.dto.response.CalenderDTO;
import com.watchify.watchify.dto.response.DefaultContentDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final UserService userService;
    private final ScheduleInfoService scheduleInfoService;
    private final ScheduleCreateService scheduleCreateService;

    @GetMapping("/info/{year}/{month}")
    public ResponseEntity<?> getScheduleInfo(HttpServletRequest request, @PathVariable int year, @PathVariable int month) {

        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            Map<Integer, List<CalenderDTO>> res = scheduleInfoService.getScheduleInfo(userId, year, month);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get schedule info");
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createSchedule(HttpServletRequest request, @RequestBody ScheduleCreateRequestDTO req) {

        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            scheduleCreateService.createSchedule(userId, req);
            return ResponseEntity.status(200).body("Scheduled successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to create schedule");
        }

    }
}
