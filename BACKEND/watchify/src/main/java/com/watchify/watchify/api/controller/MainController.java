package com.watchify.watchify.api.controller;

import com.watchify.watchify.api.service.MainScheduleService;
import com.watchify.watchify.api.service.UserService;
import com.watchify.watchify.auth.service.PrincipalDetails;
import com.watchify.watchify.auth.service.TokenService;
import com.watchify.watchify.dto.response.CalenderDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/main")
@RequiredArgsConstructor
public class MainController {

    private final MainScheduleService mainScheduleService;
    private final TokenService tokenService;
    private final UserService userService;

    @GetMapping("/schedule")
    public ResponseEntity<?> GetWeekSchedule(HttpServletRequest request) throws Exception{

        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            Map<Integer, List<CalenderDTO>> res = mainScheduleService.getMainSchedule(userId);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get main schedule.");
        }
    }
}
