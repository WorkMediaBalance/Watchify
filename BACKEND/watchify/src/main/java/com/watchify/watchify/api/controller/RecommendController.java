package com.watchify.watchify.api.controller;

import com.watchify.watchify.api.service.RecommendService;
import com.watchify.watchify.api.service.UserService;
import com.watchify.watchify.dto.request.ContentRecommendDTO;
import com.watchify.watchify.dto.response.DefaultContentDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/recommend")
@RequiredArgsConstructor
public class RecommendController {
    private final RecommendService recommendService;
    private final UserService userService;

    @GetMapping("")
    public ResponseEntity<?> GetRecommendContent(HttpServletRequest request, @RequestBody ContentRecommendDTO contentRecommendDTO) throws Exception{
        String accessToken = request.getHeader("access");
        long userId = userService.findUserIdByAccessToken(accessToken);
        System.out.println(userId);
        try {
            // Service 단으로 넘기기
            List<DefaultContentDTO> defaultContentDTOS = recommendService.getContentRecommend(userId, contentRecommendDTO);
            return ResponseEntity.status(200).body(defaultContentDTOS);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get main schedule.");
        }
    }
}