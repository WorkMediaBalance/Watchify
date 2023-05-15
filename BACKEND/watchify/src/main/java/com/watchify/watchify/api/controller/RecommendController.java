package com.watchify.watchify.api.controller;

import com.watchify.watchify.api.service.RecommendService;
import com.watchify.watchify.dto.request.ContentRecommendDTO;
import com.watchify.watchify.dto.request.MainRecommendNonDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/recommend")
@RequiredArgsConstructor
public class RecommendController {
    private final RecommendService recommendService;

    @GetMapping("")
    public ResponseEntity<?> GetRecommendContent(@RequestBody ContentRecommendDTO contentRecommendDTO) throws Exception{
        try {
            // Service 단으로 넘기기
            return ResponseEntity.status(200).body("OK");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get main schedule.");
        }
    }
}