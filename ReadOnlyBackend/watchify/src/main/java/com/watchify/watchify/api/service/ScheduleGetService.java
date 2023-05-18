package com.watchify.watchify.api.service;

import com.watchify.watchify.comparator.ScheduleObjComparator;
import com.watchify.watchify.db.entity.*;
import com.watchify.watchify.db.repository.*;
import com.watchify.watchify.dto.response.HistoryInfoDTO;
import com.watchify.watchify.dto.response.ScheduleObjDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ScheduleGetService {

    private final UserRepository userRepository;
    private final CalenderRepository calenderRepository;
    private final WishContentRepository wishContentRepository;
    private final LikeContentRepository likeContentRepository;
    private final UserViewingStatusRepository userViewingStatusRepository;
    private final CommonLogic commonLogic;


    public Map<String, Map<Integer, List<ScheduleObjDTO>>> getSchedule(Long userId) {

        User user = userRepository.getUserById(userId);
        List<Long> myWishContentList = wishContentRepository.getContentIdInMyWishList(userId);
        List<LikeContent> myLikeContentList = likeContentRepository.getLikeContent(userId);

        List<UserViewingStatus> myViewStatus = userViewingStatusRepository.getMyViewStatue(userId); // 내가 지금까지 본 것들
        HashMap<Long, List<Integer>> myViewMap = commonLogic.makeMyViewStatus(myViewStatus);

        List<Calender> myCalenderList = calenderRepository.getMyCalenderList(userId);

        List<ScheduleObjDTO> scheduleObjDTOList = new ArrayList<>();
        for (Calender calender : myCalenderList) {
            Content content = calender.getTurnContent().getContent();
            LocalDate date = calender.getDate();
            int ep = calender.getTurnContent().getEpisode();

            ScheduleObjDTO scheduleObjDTO = new ScheduleObjDTO(content, date, ep);
            scheduleObjDTO.setIsWish(myWishContentList.contains(content.getId()));
            for (LikeContent lc : myLikeContentList) {
                if (lc.getContent().equals(content)) {
                    scheduleObjDTO.setLike(lc.getLike());
                    break;
                }
            }
            if (myViewMap.containsKey(content.getId())) {
                List<Integer> tmp = myViewMap.get(content.getId());
                if (tmp.contains(scheduleObjDTO.getEpisode())) {
                    scheduleObjDTO.watchContent();
                }
            }
            scheduleObjDTOList.add(scheduleObjDTO);
        }

        // 정렬, pk 순으로 오름차순, 같다면 에피소드 순으로 오름차순
        Collections.sort(scheduleObjDTOList, new ScheduleObjComparator());


        Map<String, Map<Integer, List<ScheduleObjDTO>>> res = new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM"); // 키 값 만들 포멧터
        for (ScheduleObjDTO scheduleObjDTO :scheduleObjDTOList) {
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
}
