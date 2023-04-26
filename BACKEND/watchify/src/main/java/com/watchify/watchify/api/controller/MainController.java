package com.watchify.watchify.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/main")
@RequiredArgsConstructor
public class MainController {

    @GetMapping("/schedule")
    public ResponseEntity<?> GetWeekSchedule() throws Exception{
        int res = 1;


        return ResponseEntity.status(200).body(res);

    }
}
