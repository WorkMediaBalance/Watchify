package com.watchify.watchify.api.controller;


import com.watchify.watchify.api.service.*;
import com.watchify.watchify.dto.request.NickNameRequestDTO;
import com.watchify.watchify.dto.response.DefaultContentDTO;
import com.watchify.watchify.dto.response.UserAlarmInfoDTO;
import com.watchify.watchify.dto.response.UserPatternDTO;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/my")
@RequiredArgsConstructor
public class MyController {

    private final MyAlarmService myAlarmService;
    private final UserService userService;
    private final MyProfileService myProfileService;
    private final MyContentService myContentService;
    private final MyPatternService myPatternService;

    @PutMapping("/ottalarm")
    public ResponseEntity<?> UpdateMyOTTAlarm(HttpServletRequest request) throws Exception {

        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            myAlarmService.updateOttAlarm(userId);
            return ResponseEntity.status(200).body("My OTT alarm updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("My OTT alarm updated fail.");
        }
    }

    @PutMapping("/contentalarm")
    public ResponseEntity<?> UpdateMyContentAlarm(HttpServletRequest request) throws Exception {

        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            myAlarmService.updateContentAlarm(userId);
            return ResponseEntity.status(200).body("My Content alarm updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("My Content alarm updated fail.");
        }
    }

    @PutMapping("/profilename")
    public ResponseEntity<?> UpdateMyProfileName(HttpServletRequest request, @RequestBody NickNameRequestDTO nickNameReq) throws Exception {

        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);
        String nickName = nickNameReq.getNickName();

        try {
            myProfileService.updateProfileNickName(userId, nickName);
            return ResponseEntity.status(200).body("My profile nickName updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("My profile nickName updated fail.");
        }
    }

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

    @PutMapping("/pattern")
    public ResponseEntity<?> UpdateMyPattern(HttpServletRequest request, @RequestBody UserPatternDTO userPatternDTO) {
        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            myPatternService.updateMyPattern(userId, userPatternDTO);
            return ResponseEntity.status(200).body("My pattern updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to update my patterns");
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
}
