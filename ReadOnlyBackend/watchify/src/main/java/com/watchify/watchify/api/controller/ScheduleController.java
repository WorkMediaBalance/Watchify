package com.watchify.watchify.api.controller;

import com.watchify.watchify.api.service.*;
import com.watchify.watchify.dto.request.ScheduleCheckRequestDTO;
import com.watchify.watchify.dto.request.ScheduleCreateRequestDTO;
import com.watchify.watchify.dto.response.CalenderDTO;
import com.watchify.watchify.dto.response.DefaultContentDTO;
import com.watchify.watchify.dto.response.HistoryInfoDTO;
import com.watchify.watchify.dto.response.ScheduleObjDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/readapi/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final UserService userService;
    private final ScheduleInfoService scheduleInfoService;
    private final ScheduleCreateService scheduleCreateService;
    private final ScheduleGetService scheduleGetService;
    private final ScheduleUpdateService scheduleUpdateService;
    private final ScheduleShareService scheduleShareService;
    private final ScheduleCheckService scheduleCheckService;

    @GetMapping("/info/{year}/{month}")
    public ResponseEntity<?> getScheduleInfo(HttpServletRequest request, @PathVariable int year, @PathVariable int month) {

        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            Map<Integer, List<ScheduleObjDTO>> res = scheduleInfoService.getScheduleInfo(userId, year, month);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get schedule info");
        }
    }

    @GetMapping("/info/all")
    public ResponseEntity<?> GetScheduleInfoAll(HttpServletRequest request) {

        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            Map<String, Map<Integer, List<ScheduleObjDTO>>> res = scheduleGetService.getSchedule(userId);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get schedule");
        }
    }

    @GetMapping("/nonauth/share/{pk}")
    public ResponseEntity<?> getScheduleShare(@PathVariable("pk") Long pk) {

        Map<String, Map<Integer, List<ScheduleObjDTO>>> res = scheduleShareService.getShareSchedule(pk);
        try {

            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to save scheduleShare");
        }
    }

}
