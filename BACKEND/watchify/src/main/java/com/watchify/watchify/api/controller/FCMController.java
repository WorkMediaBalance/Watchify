package com.watchify.watchify.api.controller;

import com.watchify.watchify.api.service.FCMService;
import com.watchify.watchify.api.service.UserService;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.dto.request.FcmTokenRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/fcm")
@RequiredArgsConstructor
public class FCMController {

    private final UserService userService;
    private final FCMService fcmService;


    @PutMapping("/save")
    public ResponseEntity<?> SaveFCMtoken(HttpServletRequest request, @RequestBody FcmTokenRequestDTO fcmTokenRequestDTO) {
        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        try {
            fcmService.saveFcmToken(userId, fcmTokenRequestDTO.getFcmToken());
            return ResponseEntity.status(200).body("fcm token updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("fcm token updated fail.");
        }
    }

}
