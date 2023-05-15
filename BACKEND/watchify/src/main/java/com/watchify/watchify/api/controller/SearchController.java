package com.watchify.watchify.api.controller;


import com.watchify.watchify.api.service.SearchService;
import com.watchify.watchify.dto.response.HistoryInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;


    @GetMapping("/basic/{word}")
    public ResponseEntity<?> getSearchRes(@PathVariable("word") String word) {



        try {
            List<String> res = searchService.getSearchBasicRes(word);
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to search.");
        }
    }


}
