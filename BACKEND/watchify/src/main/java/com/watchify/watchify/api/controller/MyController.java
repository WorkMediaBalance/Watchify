package com.watchify.watchify.api.controller;


import com.watchify.watchify.api.service.MyAlarmService;
import com.watchify.watchify.api.service.MyProfileService;
import com.watchify.watchify.api.service.UserService;
import com.watchify.watchify.dto.request.NickNameRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/my")
@RequiredArgsConstructor
public class MyController {

    private final MyAlarmService myAlarmService;
    private final UserService userService;
    private final MyProfileService myProfileService;

    @PutMapping("/ottalarm")
    public ResponseEntity<?> UpdateMyOTTAlarm(HttpServletRequest request) throws Exception {

        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            myAlarmService.UpdateOttAlarm(userId);
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
            myAlarmService.UpdateContentAlarm(userId);
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
}
