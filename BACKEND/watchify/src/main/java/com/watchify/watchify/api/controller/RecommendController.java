package com.watchify.watchify.api.controller;

import com.watchify.watchify.api.service.RecommendService;
import com.watchify.watchify.api.service.UserService;
import com.watchify.watchify.dto.request.ContentRecommendDTO;
import com.watchify.watchify.dto.request.SchduleRecommendtestDTO;
import com.watchify.watchify.dto.response.ContentRecommendResDTO;
import com.watchify.watchify.dto.response.DefaultContentDTO;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/recommend")
@RequiredArgsConstructor
public class RecommendController {
    private final RecommendService recommendService;
    private final UserService userService;

    @PostMapping("")
    public ResponseEntity<?> GetRecommendContent(HttpServletRequest request, @RequestBody ContentRecommendDTO contentRecommendDTO) throws Exception{
        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);
        try {
            // Service 단으로 넘기기
            List<ContentRecommendResDTO> contentRecommendResDTOS = recommendService.getContentRecommend(userId, contentRecommendDTO);
            return ResponseEntity.status(200).body(contentRecommendResDTOS);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get main schedule.");
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> GetSceduleRecommend(HttpServletRequest request, @RequestBody SchduleRecommendtestDTO schduleRecommendtestDTO) throws Exception{
        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);
        try {
            List<Long> defaultContentDTOS = recommendService.getSchediledTest(userId,schduleRecommendtestDTO);
            return ResponseEntity.status(200).body(defaultContentDTOS);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get main schedule.");
        }
    }
}