package com.watchify.watchify.api.controller;


import com.watchify.watchify.api.service.ContentService;
import com.watchify.watchify.api.service.MyContentService;
import com.watchify.watchify.api.service.UserService;
import com.watchify.watchify.dto.request.ContentLikeRequestDTO;
import com.watchify.watchify.dto.request.PkRequestDTO;
import com.watchify.watchify.dto.response.DefaultContentDTO;
import com.watchify.watchify.dto.response.HistoryDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/readapi/content")
@RequiredArgsConstructor
public class ContentController {

    private final UserService userService;
    private final MyContentService myContentService;
    private final ContentService contentService;
//
    @GetMapping("/nonauth/info/{contentId}")
    public ResponseEntity<?> GetContentInfo(HttpServletRequest request, @PathVariable("contentId") Long contentId) {
        String accessToken = request.getHeader("access");

        Long userId = null;

        try {
            userId = userService.findUserIdByAccessToken(accessToken);
        } catch (Exception e) {
//            System.out.println("잘못된 토큰~");
        }

        try {
            DefaultContentDTO res = contentService.getContentInfo(userId, contentId);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get content.");
        }
    }

}
