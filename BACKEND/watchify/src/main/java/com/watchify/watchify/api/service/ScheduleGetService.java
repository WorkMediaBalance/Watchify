package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.Calender;
import com.watchify.watchify.db.entity.Content;
import com.watchify.watchify.db.entity.LikeContent;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.repository.*;
import com.watchify.watchify.dto.response.HistoryInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ScheduleGetService {

    private final UserRepository userRepository;
    private final CalenderRepository calenderRepository;
    private final WishContentRepository wishContentRepository;
    private final LikeContentRepository likeContentRepository;


    public Map<String, Map<Integer, List<HistoryInfoDTO>>> getSchedule(Long userId) {

        User user = userRepository.getUserById(userId);
        List<Long> myWishContentList = wishContentRepository.getContentIdInMyWishList(userId);
        List<LikeContent> myLikeContentList = likeContentRepository.getLikeContent(userId);

        List<Calender> myCalenderList = calenderRepository.getMyCalenderList(userId);

        List<HistoryInfoDTO> historyInfoDTOList = new ArrayList<>();
        for (Calender calender : myCalenderList) {
            Content content = calender.getTurnContent().getContent();
            LocalDate date = calender.getDate();
            int ep = calender.getTurnContent().getEpisode();

            HistoryInfoDTO historyInfoDTO = new HistoryInfoDTO(content, date, ep);
            historyInfoDTO.setIsWish(myWishContentList.contains(content.getId()));
            for (LikeContent lc : myLikeContentList) {
                if (lc.getContent().equals(content)) {
                    historyInfoDTO.setLike(lc.getLike());
                    break;
                }
            }
            historyInfoDTOList.add(historyInfoDTO);
        }


        Map<String, Map<Integer, List<HistoryInfoDTO>>> res = new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM"); // 키 값 만들 포멧터
        for (HistoryInfoDTO historyInfoDTO :historyInfoDTOList) {
            LocalDate date = historyInfoDTO.getDate();
            String key = date.format(formatter);
            int day = date.getDayOfMonth();

            // String Key 값이 있나 없나~
            Map<Integer, List<HistoryInfoDTO>> tmp;
            if (res.containsKey(key)) {
                // 있을경우 Map<Integer, List<HistoryInfoDTO>> 를 또 검사 해봐야함.
                tmp = res.get(key);
                List<HistoryInfoDTO> tmpList;

                if (tmp.containsKey(day)) {
                    tmpList = tmp.get(day);

                } else {
                    tmpList = new ArrayList<>();
                }
                tmpList.add(historyInfoDTO);
                tmp.put(day, tmpList);

            } else {
                tmp = new HashMap<>();
                List<HistoryInfoDTO> tmpList = new ArrayList<>();
                tmpList.add(historyInfoDTO);
                tmp.put(day, tmpList);
            }
            res.put(key, tmp);
        }


        return res;
    }
}
