package com.watchify.watchify.api.service;

import com.watchify.watchify.comparator.ScheduleObjComparator;
import com.watchify.watchify.db.entity.*;
import com.watchify.watchify.db.repository.*;
import com.watchify.watchify.dto.request.SchduleRecommendtestDTO;
import com.watchify.watchify.dto.request.ScheduleCreateRequestDTO;
import com.watchify.watchify.dto.response.ScheduleObjDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ScheduleCreateService {

    private final UserRepository userRepository;
    private final CalenderRepository calenderRepository;
    private final ContentRepository contentRepository;
    private final TurnContentRepository turnContentRepository;
    private final ContentOTTRepository contentOTTRepository;
    private final OTTRepository ottRepository;
    private final UserViewingStatusRepository userViewingStatusRepository;
    private final WishContentRepository wishContentRepository;
    private final LikeContentRepository likeContentRepository;
    private final CommonLogic commonLogic;
    private final RecommendService recommendService;

    public Map<String, Map<Integer, List<ScheduleObjDTO>>> createSchedule(Long userId, ScheduleCreateRequestDTO req) {


        User user = userRepository.getUserById(userId);
        List<Long> myWishContentList = wishContentRepository.getContentIdInMyWishList(userId);
        List<LikeContent> myLikeContentList = likeContentRepository.getLikeContent(userId);
        List<Integer> weekOfDayTime = req.getPatterns(); // 요일별 패턴 시간
        LocalDate nowDate = req.getStartDate(); // 스케줄 시작 날짜
        int startMonth = nowDate.getMonthValue();
        int lastDay = nowDate.getDayOfMonth(); // 여기까지 스케줄짤거임
        int maxMyTime = 0;
        for (int time : req.getPatterns()) {
            if (time > maxMyTime) { maxMyTime = time; }
        }

        Map<String, Map<Integer, List<ScheduleObjDTO>>> res = new HashMap<>();
        if (maxMyTime == 0) { // 패턴이 모두 0인 경우 == 악성유저..!
            return res;
        }

        maxMyTime = maxMyTime * 60 + 10;

        List<UserViewingStatus> myViewStatus = userViewingStatusRepository.getMyViewStatue(userId); // 내가 지금까지 본 것들
        HashMap<Long, List<Integer>> myViewMap = commonLogic.makeMyViewStatus(myViewStatus);

        //수정안, 캘린더에 기존 데이터는 삭제
        List<Calender> existingSch = calenderRepository.getMyCalenderList(userId);
        for (Calender calender : existingSch) {
            calender.updateDelete(true);
            calenderRepository.save(calender);
        }


        int myTime = weekOfDayTime.get(nowDate.getDayOfWeek().getValue()-1) * 60 + 10; // now 요일에서 시청 가능한 시간
        int breakFlag  = 0; // 영화가 2시간인데 시청패턴이 최대 1시간인경우 를 위해

        // myTime 이 남아있을 수 있음.

        LinkedList<TurnContent> newContents = makeNewContents(req.getContents(), myViewMap); // 메서드오 관리
        // -- 여기 까지 pk(작업대에 있는 컨텐츠들)값들 에피소드별로 newContents (type : TurnContent) 에 담음


        // 이제 newContents 을 가지고 calender 에 등록 하고 HistoryInfoDTO 생성
        List<ScheduleObjDTO> scheduleObjDTOS = new ArrayList<>();

        breakFlag = 0;
        while (!newContents.isEmpty()) { // newContents 가 빌때까지
            if (breakFlag >= 10) {
                newContents.pollFirst();
                breakFlag = 0;
                continue;
            }
            // 처음에 myTime 의 여유분이 있는 상태로 넘어올 수 있어서 myTime 갱신은 마지막에
            TurnContent thisTurnContent = newContents.peekFirst(); // 빼지 않고 조회만 remove(thisContent 로 빼면됨)
            int runTime = thisTurnContent.getContent().getRuntime();

            if (runTime > maxMyTime) { // 내 스케줄 상 들어갈 수 없는 컨텐츠 인경우
                newContents.pollFirst();
                continue;
            }

            if (myTime < runTime) {
                // 지금(nowDate 에서) 남아 있는 시간이 없다면...

                // 05.18 추가 : runTime 시간만큼은 없지만 다른 건텐츠는 들어갈 수 있어서 찾자.
                    // 검색
                TurnContent alterTurnContent = null;
                for (TurnContent turnContent : newContents) {
                    int runTimeA = turnContent.getContent().getRuntime();
                    if (runTimeA <= myTime) {
                        alterTurnContent = turnContent;
                        break;
                    }
                }


                if (alterTurnContent == null) { // 적절한 값을 못찾았을 경우
                    nowDate = nowDate.plusDays(1); // 하루 지나서
                    breakFlag += 1;
                    myTime = weekOfDayTime.get(nowDate.getDayOfWeek().getValue()-1) * 60 + 10; // 지금 남은 시간 갱신
                    continue;
                } else {
                    thisTurnContent = alterTurnContent; //  턴 컨텐츠 갱신
                }
            }

            // myTime 에 여유가 있다면 캘린더 등록!
            breakFlag = 0;
            // thisContent 가 갱신 돼서 첫번째 값이던 나중값이던 왓을 거임
            newContents.remove(thisTurnContent); // 그 값을 찾아서 제거, 등록할거니깐
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
            // 의도한대로라면 thisOTT 는 null 이 될 수 없음..!
            // 하지만 에초에 DB 에 ott 가 없는 경우가 있네???
            Calender thisCalender = new Calender(user, thisTurnContent, thisOTT, nowDate);
            calenderRepository.save(thisCalender);

            ScheduleObjDTO scheduleObjDTO = new ScheduleObjDTO(thisContent, nowDate, thisTurnContent.getEpisode());
            scheduleObjDTO.setIsWish(myWishContentList.contains(thisContent.getId()));
            for (LikeContent lc : myLikeContentList) {
                if (lc.getContent().equals(thisContent)) {
                    scheduleObjDTO.setLike(lc.getLike());
                    break;
                }
            }

            scheduleObjDTOS.add(scheduleObjDTO);

            myTime -= thisContent.getRuntime(); // 남은 시간 뺴주고

        }

        // 켈린더 끝날짜가 다 끝나면 추천받아서 추가할거 더 추가 해도 됨
        int lastDayOfMonth = nowDate.lengthOfMonth(); // 그달의 마지막 날 05.19 수정 그날 마지막날까지 스케줄링 -> 시작일 -1 일까지 스케줄링
        Map<String, Long> ottMatchId = new HashMap<>();
        ottMatchId.put("netflix", 1l);
        ottMatchId.put("watcha", 2l);
        ottMatchId.put("wavve", 3l);
        ottMatchId.put("disney", 4l);
        List<Long> ottIdList = new ArrayList<>();
        for (String name : req.getOtt()) { ottIdList.add(ottMatchId.get(name)); }

        // 잠깐 테스트 -> 작업대에 아무것도 안넣을경우 장고에서 오류가 나옴
        if (req.getContents().size() == 0) {
            req.getContents().add(1l);
        }

        SchduleRecommendtestDTO schduleRecommendtestDTO = new SchduleRecommendtestDTO(req.getContents(), ottIdList);
        List<Long> returnRec = recommendService.getSchediledTest(userId, schduleRecommendtestDTO); // 장고 추천 결과

        List<Long> recoContentId = new ArrayList<>();
        for (Long pk : returnRec) {
            if (req.getContents().contains(pk)) { continue; } // 중복이면 패스
            recoContentId.add(pk);
        }

        LinkedList<TurnContent> RedNewContents = makeNewContents(recoContentId, myViewMap);

        // ==========================================================================================
        // 추천 받은 걸로 달의 마지막 날까지 채우기

        breakFlag = 0;
        while (!RedNewContents.isEmpty()) { // RedNewContents 가 빌때까지
            if (breakFlag >= 10) {
                RedNewContents.pollFirst();
                breakFlag = 0;
                continue;
            }
            // 처음에 myTime 의 여유분이 있는 상태로 넘어올 수 있어서 myTime 갱신은 마지막에
            TurnContent thisTurnContent = RedNewContents.peekFirst(); // 빼지 않고 조회만 remove(thisContent 로 빼면됨)
            int runTime = thisTurnContent.getContent().getRuntime();

            if (runTime > maxMyTime) {
                RedNewContents.pollFirst();
                continue;
            }

            if (myTime < runTime) {
                // 지금(nowDate 에서) 남아 있는 시간이 없다면...

                // 05.18 추가 : runTime 시간만큼은 없지만 다른 건텐츠는 들어갈 수 있어서 찾자.
                // 검색
                TurnContent alterTurnContent = null;
                for (TurnContent turnContent : RedNewContents) {
                    int runTimeA = turnContent.getContent().getRuntime();
                    if (runTimeA <= myTime) {
                        alterTurnContent = turnContent;
                        break;
                    }
                }


                if (alterTurnContent == null) { // 적절한 값을 못찾았을 경우
                    nowDate = nowDate.plusDays(1); // 하루 지나서
                    if (nowDate.getDayOfMonth() == lastDay) {
                        break;
                    }
                    breakFlag += 1;
                    myTime = weekOfDayTime.get(nowDate.getDayOfWeek().getValue()-1) * 60 + 10; // 지금 남은 시간 갱신
                    continue;
                } else {
                    thisTurnContent = alterTurnContent; //  턴 컨텐츠 갱신
                }
            }

            // myTime 에 여유가 있다면 캘린더 등록!
            breakFlag = 0;
            // thisContent 가 갱신 돼서 첫번째 값이던 나중값이던 왓을 거임
            RedNewContents.remove(thisTurnContent); // 그 값을 찾아서 제거, 등록할거니깐
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
            // 의도한대로라면 thisOTT 는 null 이 될 수 없음..!
            // 하지만 에초에 DB 에 ott 가 없는 경우가 있네???
            Calender thisCalender = new Calender(user, thisTurnContent, thisOTT, nowDate);
            calenderRepository.save(thisCalender);

            ScheduleObjDTO scheduleObjDTO = new ScheduleObjDTO(thisContent, nowDate, thisTurnContent.getEpisode());
            scheduleObjDTO.setIsWish(myWishContentList.contains(thisContent.getId()));
            for (LikeContent lc : myLikeContentList) {
                if (lc.getContent().equals(thisContent)) {
                    scheduleObjDTO.setLike(lc.getLike());
                    break;
                }
            }
            scheduleObjDTOS.add(scheduleObjDTO);

            myTime -= thisContent.getRuntime(); // 남은 시간 뺴주고
        }
        // ==========================================================================================


        // 정렬, pk 순으로 오름차순, 같다면 에피소드 순으로 오름차순
        Collections.sort(scheduleObjDTOS, new ScheduleObjComparator());

        // res 만들기
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM"); // 키 값 만들 포멧터
        for (ScheduleObjDTO scheduleObjDTO :scheduleObjDTOS) {
            LocalDate date = scheduleObjDTO.getDate();
            String key = date.format(formatter);
            int day = date.getDayOfMonth();

            // String Key 값이 있나 없나~
            Map<Integer, List<ScheduleObjDTO>> tmp;
            if (res.containsKey(key)) {
                // 있을경우 Map<Integer, List<HistoryInfoDTO>> 를 또 검사 해봐야함.
                tmp = res.get(key);
                List<ScheduleObjDTO> tmpList;

                if (tmp.containsKey(day)) {
                    tmpList = tmp.get(day);

                } else {
                    tmpList = new ArrayList<>();
                }
                tmpList.add(scheduleObjDTO);
                tmp.put(day, tmpList);

            } else {
                tmp = new HashMap<>();
                List<ScheduleObjDTO> tmpList = new ArrayList<>();
                tmpList.add(scheduleObjDTO);
                tmp.put(day, tmpList);
            }
            res.put(key, tmp);
        }

        return res;
    }

    public LinkedList<TurnContent> makeNewContents(List<Long> contentPkList, HashMap<Long, List<Integer>> myViewMap) {

        LinkedList<TurnContent> newContents = new LinkedList<>(); // 링크드 리스트로 변경
        for (Long contentPK : contentPkList) {
            Content newContent = contentRepository.getContentById(contentPK); // 작업대에 있는 컨텐츠
            int finalEp = newContent.getFinalEpisode();

            if (finalEp == 0) {
                if (!myViewMap.containsKey(contentPK)) {
                    TurnContent newTurnContent = turnContentRepository.getSoloTurnContentById(newContent.getId());
                    newContents.add(newTurnContent);
                }
            } else {
                List<TurnContent> turnContentList = turnContentRepository.getAllTurnContent(contentPK);
                if (myViewMap.containsKey(contentPK)) {
                    List<Integer> tmp = myViewMap.get(contentPK);
                    for (TurnContent turnContent : turnContentList) {
                        int i = turnContent.getEpisode();
                        if (!tmp.contains(i)) {
                            newContents.add(turnContent);
                        }
                    }
                } else {
                    for (TurnContent turnContent : turnContentList) {
                        newContents.add(turnContent);
                    }
                }

            }
        }

        return newContents;
    }
}
