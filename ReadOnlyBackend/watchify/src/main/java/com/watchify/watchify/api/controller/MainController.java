package com.watchify.watchify.api.controller;

import com.watchify.watchify.api.service.MainScheduleService;
import com.watchify.watchify.api.service.UserService;
import com.watchify.watchify.dto.response.CalenderDTO;
import com.watchify.watchify.dto.response.DefaultContentDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/readapi/main")
@RequiredArgsConstructor
public class MainController {

    private final MainScheduleService mainScheduleService;
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

    // 로직 처리 필요
    @GetMapping("/recommend")
    public ResponseEntity<?> GetRecommendMovie(HttpServletRequest request) throws Exception{
        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);
        try {
            // Service 단으로 넘기기
            HashMap<String, List<DefaultContentDTO>> defaultContentDTOS = mainScheduleService.getmainRecommend(userId);
            return ResponseEntity.status(200).body(defaultContentDTOS);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get main schedule.");
        }
    }

    @GetMapping("/recommendnon/nonauth")
    public ResponseEntity<?> GetRecommendNon() throws Exception{
        try {
            // Service 단으로 넘기기
            HashMap<String, List<DefaultContentDTO>> defaultContentsDTOS = mainScheduleService.getrecommendnon();
            return ResponseEntity.status(200).body(defaultContentsDTOS);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get main schedule.");
        }
    }

}
