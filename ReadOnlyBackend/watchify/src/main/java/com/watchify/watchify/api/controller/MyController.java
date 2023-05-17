package com.watchify.watchify.api.controller;


import com.watchify.watchify.S3.S3Service;
import com.watchify.watchify.api.service.*;
import com.watchify.watchify.dto.request.NickNameRequestDTO;
import com.watchify.watchify.dto.request.UserOttRequestDTO;
import com.watchify.watchify.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/readapi/my")
@RequiredArgsConstructor
public class MyController {

    private final MyAlarmService myAlarmService;
    private final UserService userService;
    private final MyProfileService myProfileService;
    private final MyContentService myContentService;
    private final MyPatternService myPatternService;
    private final MyOttService myOttService;
    private final HistoryService historyService;

    @GetMapping("/wishlist")
    public ResponseEntity<?> GetMyWishList(HttpServletRequest request) {
        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            List<DefaultContentDTO> res = myContentService.getWishList(userId);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get wish content");
        }
    }

    @GetMapping("/pattern")
    public ResponseEntity<?> GetMyPattern(HttpServletRequest request) {
        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            UserPatternDTO res = myPatternService.getMyPattern(userId);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get my patterns");
        }
    }

    @GetMapping("/alarminfo")
    public ResponseEntity<?> GetMyAlarmInfo(HttpServletRequest request) {
        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            UserAlarmInfoDTO res = myAlarmService.getMyAlarmInfo(userId);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get my alarm info");
        }
    }

    @GetMapping("/ott")
    public ResponseEntity<?> GetMyOtt(HttpServletRequest request) {
        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            UserOttDTO res = myOttService.getMyOttInfo(userId);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get my ott info");
        }
    }


    @GetMapping("/basicinfo")
    public ResponseEntity<?> GetUserInfo(HttpServletRequest request) {
        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            UserBasicInfoDTO res = userService.getUserBasicInfo(userId);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to user info");
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> GetMyHistory(HttpServletRequest request) {
        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            List<HistoryDTO> res = historyService.getUserHistory(userId);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to check history.");
        }
    }

    @GetMapping("/history/{contentId}/{year}/{month}")
    public ResponseEntity<?> GetMyHistoryInfo(HttpServletRequest request,
                                              @PathVariable("contentId") Long contentId,
                                              @PathVariable("year") int year,
                                              @PathVariable("month") int month) {
        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);
        historyService.getUserHistoryInfo(userId, contentId, year, month);
        try {
            Map<Integer, List<HistoryInfoDTO>> res = historyService.getUserHistoryInfo(userId, contentId, year, month);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to check history Info.");
        }
    }
}
