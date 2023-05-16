package com.watchify.watchify.api.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.watchify.watchify.db.entity.Calender;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.entity.UserOTT;
import com.watchify.watchify.db.repository.CalenderRepository;
import com.watchify.watchify.db.repository.UserOTTRepository;
import com.watchify.watchify.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class FCMService {

    private final UserRepository userRepository;
    private final CalenderRepository calenderRepository;
    private final UserOTTRepository userOTTRepository;

    @Transactional
    public void saveFcmToken(Long userId, String fcmToken) {
        if (userId != null) {
            User user = userRepository.getUserById(userId);
            user.updateFcmToken(fcmToken);
            userRepository.save(user);
        }
    }

    @Async
    @Transactional
    // 매일 저녁 6시 컨텐츠 시청 알림
    // 1. 켈린더에 컨텐츠 봐야할 목록들 보여주고
    // 2. 없으면 알람 안보냄
    public void sendNotificationContent() {

        // 모든 유저를 뽑기, isDeleted == false , isContentAlarm == true 를 만족하는 유저
        List<User> users = userRepository.getUsersContentAlarm();

        LocalDate today = LocalDate.now();
        String subTitle = "님, 오늘 시청할 컨텐츠들이예요!";

        for (User user : users) {
            if (user.getFcmToken() == null) {
                continue;
            }

            // fcm 토큰이 정상적으로 있는 유저들만
            String userNick = user.getNickName();
            String title = userNick + subTitle;

            // 오늘 볼 컨텐츠 뽑기
            List<Calender> calenders = calenderRepository.getSchedule(user.getId(), today, today);
            String body = null;
            for (Calender calender : calenders) {
                if (calender.getViewDate() != null) {
                    // 오늘 볼 컨텐츠의 viewDate 값이 null 이면
                    // == 아직 안봤으면
                    body = calender.getTurnContent().getContent().getTitle() + "보러 가기!!";
                    break;
                }
            }

            // 볼 컨텐츠가 없으면 패스
            if (body == null) {
                continue;
            }

            Notification notification = new Notification(title, body);
            Message message = Message.builder()
                    .setNotification(notification)
                    .setToken(user.getFcmToken())
                    .putData("flag", "content").build(); // 컨텐츠 알람 이기때문에 flag에 content, 사전 얘기 된부분분

            try{
               String response = FirebaseMessaging.getInstance().send(message);
            }catch (Exception e){
                log.warn(user.getEmail() + ": 알림 전송에 실패하였습니다.");
            }
        }
    }


    @Async
    @Transactional
    // 알람 해지 하루 전날에 알려주는 동작
    public void sendNotificationOTT() {
        // 모든 유저를 뽑기, isDeleted == false , isContentAlarm == true 를 만족하는 유저
        List<User> users = userRepository.getUsersOttAlarm();

        String subTitle = "님, OTT 만료시간이 얼마 안남았어요!";

        LocalDate today = LocalDate.now();
        LocalDate tomorrow =  today.plusDays(1); // 내일 날짜

        for (User user : users) {

            if (user.getFcmToken() == null) {
                continue;
            }

            String title = user.getNickName() + subTitle;
            List<UserOTT> userOtts = userOTTRepository.getUserOTTSByUserIdNotOver(user.getId());
            String body = null;
            for (UserOTT userOtt : userOtts) {
                if (userOtt.getEnd() != null && userOtt.getEnd() == tomorrow) {
                    body = "확인하러 가기!!";
                    break;
                }
            }

            if (body == null) {
                continue;
            }

            Notification notification = new Notification(title, body);
            Message message = Message.builder()
                    .setNotification(notification)
                    .setToken(user.getFcmToken())
                    .putData("flag", "ott").build(); // ott 알람 이기때문에 flag에 ott, 사전 얘기 된부분분

            try{
                String response = FirebaseMessaging.getInstance().send(message);
            }catch (Exception e){
                log.warn(user.getEmail() + ": 알림 전송에 실패하였습니다.");
            }


        }

    }
}
