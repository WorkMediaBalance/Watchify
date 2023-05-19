package com.watchify.watchify.api.controller;

import com.watchify.watchify.api.service.*;
import com.watchify.watchify.dto.request.ScheduleCheckRequestDTO;
import com.watchify.watchify.dto.request.ScheduleCreateRequestDTO;
import com.watchify.watchify.dto.response.*;
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

    @PostMapping("/create")
    public ResponseEntity<?> createSchedule(HttpServletRequest request, @RequestBody ScheduleCreateRequestDTO req) {

        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);



        try {
            Map<String, Map<Integer, List<ScheduleObjDTO>>> res = scheduleCreateService.createSchedule(userId, req);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to create schedule");
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

    @PutMapping("/modify")
    public ResponseEntity<?> UpdateSchedule(HttpServletRequest request, @RequestBody ScheduleModifyDTO json) {

        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            scheduleUpdateService.updateScheduleVer2(userId, json);
            return ResponseEntity.status(200).body("succeed to update schedule");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to update schedule");
        }
    }


    @PostMapping("/nonauth/share")
    public ResponseEntity<?> SaveScheduleShare(HttpServletRequest request, @RequestBody String json) {

        String accessToken = request.getHeader("access");

        Long userId = null;
        try {
            userId = userService.findUserIdByAccessToken(accessToken);
        } catch (Exception e) {
//            System.out.println("잘못된 토큰");
        }

        try {
            Map<String, Long> res = scheduleShareService.saveScheduleShare(userId, json);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to save scheduleShare");
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

    @PostMapping("/check")
    public ResponseEntity<?> CheckSchedule(HttpServletRequest request, @RequestBody ScheduleCheckRequestDTO dto) {

        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            scheduleCheckService.checkSchedule(userId, dto);
            return ResponseEntity.status(200).body("succeed to check schedule");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to check schedule");
        }
    }

    @PutMapping("/cancel")
    public ResponseEntity<?> CheckCancelSchedule(HttpServletRequest request, @RequestBody ScheduleCheckRequestDTO dto) {

        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            scheduleCheckService.checkCancelSchedule(userId, dto);
            return ResponseEntity.status(200).body("succeed to check schedule");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to check schedule");
        }
    }
}
