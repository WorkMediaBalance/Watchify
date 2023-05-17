package com.watchify.watchify.api.controller;


import com.watchify.watchify.api.service.SearchService;
import com.watchify.watchify.api.service.UserService;
import com.watchify.watchify.dto.response.DefaultContentDTO;
import com.watchify.watchify.dto.response.HistoryInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;
    private final UserService userService;


    @GetMapping("/basic/{word}")
    public ResponseEntity<?> getSearchBasic(@PathVariable("word") String word) {
        try {
            List<String> res = searchService.getSearchBasicRes(word);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to search.");
        }
    }

    @GetMapping("/result/{word}")
    public ResponseEntity<?> getSearchRes(HttpServletRequest request, @PathVariable("word") String word) {

        String accessToken = request.getHeader("access");
        Long userId = null;
        if (accessToken != null) {
            userId = userService.findUserIdByAccessToken(accessToken);
        }

        try {
            List<DefaultContentDTO> res = searchService.getSearchResult(userId, word);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to search.");
        }
    }


}
