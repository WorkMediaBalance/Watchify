package com.watchify.watchify.FCM;


import com.watchify.watchify.api.service.FCMService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FCMScheduleService {

    private final FCMService fcmService;

    @Scheduled(cron = "0 0 18 * * ?")
    public void contentAlarm() {
        fcmService.sendNotificationContent();
    }

    @Scheduled(cron = "0 0 12 * * ?")
    public void ottAlarm() {fcmService.sendNotificationOTT();}

}
