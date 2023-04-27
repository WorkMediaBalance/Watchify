package com.watchify.watchify.api.controller;


import com.watchify.watchify.api.service.MyAlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/my")
@RequiredArgsConstructor
public class MyController {

    private final MyAlarmService myAlarmService;

    @PutMapping("/ottalarm")
    public ResponseEntity<?> UpdateMyOTTAlarm() throws Exception {
        myAlarmService.UpdateOttAlarm();
        return ResponseEntity.status(200).body("My OTT alarm updated successfully.");
    }
}
