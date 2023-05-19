package com.watchify.watchify.api.controller;

import com.watchify.watchify.S3.AwsS3;
import com.watchify.watchify.S3.S3Service;
import com.watchify.watchify.api.service.UserService;
import com.watchify.watchify.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/image")
public class S3Controller {

    private final UserService userService;
    private final S3Service s3Service;

    @PostMapping("/test")
    public ResponseEntity<?> updateUserImage(HttpServletRequest request, @RequestParam("image")MultipartFile multipartFile) throws IOException {
        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);

        User user = userService.returnUserById(userId);


        // 유저프로필은 userimages/ 하위에 저장
        AwsS3 awsS3 = s3Service.upload(multipartFile, "userimages");


        return ResponseEntity.status(200).body("good?");
    }
}
