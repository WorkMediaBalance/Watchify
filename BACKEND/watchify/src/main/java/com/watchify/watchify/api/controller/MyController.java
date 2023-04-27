package com.watchify.watchify.api.controller;


import com.watchify.watchify.api.service.MyAlarmService;
import com.watchify.watchify.api.service.MyOttService;
import com.watchify.watchify.dto.response.MyOttDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/my")
@RequiredArgsConstructor
public class MyController {

    private final MyAlarmService myAlarmService;
    private final MyOttService myOttService;

    @PutMapping("/ottalarm")
    public ResponseEntity<?> UpdateMyOTTAlarm() throws Exception {
        try {
            myAlarmService.UpdateOttAlarm();
            return ResponseEntity.status(200).body("My OTT alarm updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("My OTT alarm updated fail.");
        }
    }

    @PutMapping("/contentalarm")
    public ResponseEntity<?> UpdateMyContentAlarm() throws Exception {
        try {
            myAlarmService.UpdateContentAlarm();
            return ResponseEntity.status(200).body("My Content alarm updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("My Content alarm updated fail.");
        }
    }

    @GetMapping("/ott")
    public ResponseEntity<?> GetMyOTT() throws Exception {
        try {
            MyOttDTO res = myOttService.getMyOtt();
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Failed to get my ott information.");
        }
    }

//    @PutMapping("/ott")
//    public ResponseEntity<?> Update() throws Exception {
//
//    }
}
