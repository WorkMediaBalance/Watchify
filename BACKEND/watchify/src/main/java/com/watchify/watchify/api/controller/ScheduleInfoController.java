package com.watchify.watchify.api.controller;

import com.watchify.watchify.api.service.ScheduleInfoService;
import com.watchify.watchify.api.service.UserService;
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
@RequestMapping("/api/my")
@RequiredArgsConstructor
public class ScheduleInfoController {

    private final UserService userService;
    private final ScheduleInfoService scheduleInfoService;

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
}