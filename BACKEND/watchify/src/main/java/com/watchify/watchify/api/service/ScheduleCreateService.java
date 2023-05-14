package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.*;
import com.watchify.watchify.db.repository.*;
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
    private final ContentRepository contentRepository;
    private final TurnContentRepository turnContentRepository;
    private final ContentOTTRepository contentOTTRepository;
    private final OTTRepository ottRepository;

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
        int breakFlag  = 0; // 영화가 2시간인데 시청패턴이 최대 1시간인경우 를 위해
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
                breakFlag = 0;
                Calender newCalender = new Calender(user, ob.getTurnContent(), ob.getOtt(), nowDate);
                myTime -= ob.getTurnContent().getContent().getRuntime();
                calenderRepository.save(newCalender);
            }

            // existingContent 가 다 빠졌거나 남은 myTime이 작거나
            if (!existingContent.isEmpty()) {
                // existingContent 가 있으면 myTime이 작은거라서 다음날로 ㄱㄱ
                nowDate = nowDate.plusDays(1);
                breakFlag += 1;
            }

            if (!existingContent.isEmpty() && breakFlag >= 10) {
                existingContent.pollFirst(); // 현재 패턴으로 볼 수 없어서 버림
            }

        }

        // 기존의 스케줄은 마무리 했고 이제 작업대 컨텐츠 기준으로 채우기.
        // myTime 이 남아있을 수 있음.
        ArrayDeque newContents = new ArrayDeque<TurnContent>(); // 컨텐츠 (타입 TurnContent)
        for (Long contentPK : req.getContents()) {
            Content newContent = contentRepository.getContentById(contentPK);

            if (newContent.getFinalEpisode() == 0) {
                TurnContent newTurnContent = turnContentRepository.getSoloTurnContentById(newContent.getId());
                newContents.add(newTurnContent);
            } else {
                List<TurnContent> newTurnContents = turnContentRepository.getAllTurnContent(contentPK);
                for (TurnContent t : newTurnContents) {
                    newContents.add(t);
                }
            }
        }
        // -- 여기 까지 pk(작업대에 있는 컨텐츠들)값들 에피소드별로 newContents 에 담음


        // 이제 newContents 을 가지고 calender 에 등록
        breakFlag = 0;
        while (!newContents.isEmpty()) { // newContents 가 빌때까지
            if (breakFlag >= 10) {
                newContents.pollFirst();
            }
            // 처음에 myTime 의 여유분이 있는 상태로 넘어올 수 있어서 myTime 갱신은 마지막에
            TurnContent thisTurnContent = (TurnContent) newContents.peekFirst();
            int runTime = thisTurnContent.getContent().getRuntime();

            if (myTime < runTime) {
                // 지금(nowDate 에서) 남아 있는 시간이 없다면...
                nowDate = nowDate.plusDays(1); // 하루 지나서
                breakFlag += 1;
                myTime = weekOfDayTime.get(nowDate.getDayOfWeek().getValue()-1) * 60 + 20; // 지금 남은 시간 갱신
                continue;
            }

            // myTime 에 여유가 있다면 캘린더 등록!
            breakFlag = 0;
            thisTurnContent = (TurnContent) newContents.pollFirst(); // 등록할 컨텐츠.
            Content thisContent = thisTurnContent.getContent();
            List<ContentOTT> contentOtts = contentOTTRepository.getContentOTTByContentId(thisContent.getId()); // 해당 컨텐츠를 볼 수 있는 OTT
            OTT thisOTT = null; // 켈린더에 넣을 ott
            for (ContentOTT contentOTT : contentOtts) {
                String ottName = contentOTT.getOtt().getName();
                if (req.getOtt().contains(ottName)) {
                    thisOTT = ottRepository.getOTTByName(ottName);
                    break;
                }
            }
            if (thisOTT != null) { // 의도한대로라면 thisOTT 는 null 이 될 수 없음..!
                Calender thisCalender = new Calender(user, thisTurnContent, thisOTT, nowDate);
                calenderRepository.save(thisCalender);
                myTime -= thisContent.getRuntime(); // 남은 시간 뺴주고
            }
        }

        // 켈린더 끝날짜가 다 끝나면 추천받아서 추가할거 더 추가.
    }
}
