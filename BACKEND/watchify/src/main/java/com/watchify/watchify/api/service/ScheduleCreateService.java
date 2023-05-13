package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.Calender;
import com.watchify.watchify.db.entity.TurnContent;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.repository.CalenderRepository;
import com.watchify.watchify.db.repository.UserRepository;
import com.watchify.watchify.dto.request.ScheduleCreateRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleCreateService {

    private final UserRepository userRepository;
    private final CalenderRepository calenderRepository;

    public void createSchedule(Long userId, ScheduleCreateRequestDTO req) {

        User user = userRepository.getUserById(userId);
        List<Integer> weekOfDayTime = req.getPatterns(); // 요일별 패턴 시간
        LocalDate nowDate = req.getStartDate(); // 스케줄 시작 날짜

        // nowDate 이후에 이미 있는 스케줄 있을 경우 (우선적으로 처리해야됨)
        List<Calender> existingSch = calenderRepository.getScheduleAfterStartDate(userId, nowDate);

        ArrayDeque<Calender> existingContent = new ArrayDeque<>(); // 기존에 있는 시정안한 컨텐츠
        for (Calender cl : existingSch) {
            // 기존거 에서 시청한한거 빼고 뽑기
            if (cl.getViewDate() == null) {
                existingContent.add(cl);
            }
        }

        // 기존 스케줄 부터 처리
        int myTime = 0; // now 요일에서 시청 가능한 시간
        while (!existingContent.isEmpty()) {
            myTime = weekOfDayTime.get(nowDate.getDayOfWeek().getValue()-1) * 60 + 20; // 분으로 계산 (20분 여유분)

            if (myTime == 20) {
                // 패턴시간이 0일경우 (20은 여유분 준거)
                nowDate = nowDate.plusDays(1);
                continue;
            }

            while (!existingContent.isEmpty()) {
                Calender ob = existingContent.peekFirst();
                if (ob == null || ob.getTurnContent().getContent().getRuntime() > myTime) {
                    break;
                }

                ob = existingContent.pollFirst();
                Calender newCalender = new Calender(user, ob.getTurnContent(), ob.getOtt(), nowDate);
                myTime -= ob.getTurnContent().getContent().getRuntime();
                calenderRepository.save(newCalender);
            }

            // existingContent 가 다 빠졌거나 남은 myTime이 작거나
            if (!existingContent.isEmpty()) {
                // existingContent 가 있으면 myTime이 작은거라서 다음날로 ㄱㄱ
                nowDate = nowDate.plusDays(1);
            }

        }

        // 기존의 스케줄은 마무리 혰고 이제 작업대 컨텐츠 기준으로 채우기.
        // myTime 이 남아있을 수 있음.
        ArrayDeque newContent = new ArrayDeque<>(); // 컨텐츠











    }

}
