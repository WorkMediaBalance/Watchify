package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.*;
import com.watchify.watchify.db.repository.CalenderRepository;
import com.watchify.watchify.db.repository.LikeContentRepository;
import com.watchify.watchify.db.repository.UserViewingStatusRepository;
import com.watchify.watchify.db.repository.WishContentRepository;
import com.watchify.watchify.dto.response.HistoryDTO;
import com.watchify.watchify.dto.response.HistoryInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class HistoryService {

    private final CalenderRepository calenderRepository;
    private final WishContentRepository wishContentRepository;
    private final LikeContentRepository likeContentRepository;
    private final UserViewingStatusRepository userViewingStatusRepository;

    public List<HistoryDTO> getUserHistory(Long userId) {
        List<HistoryDTO> res = new ArrayList<>();

//        List<Calender> myCalenderList = calenderRepository.getMyViewedCalender(userId); // 시청한 것들만 확인
        List<Long> myWishContentList = wishContentRepository.getContentIdInMyWishList(userId);
        List<LikeContent> myLikeContentList = likeContentRepository.getLikeContent(userId);
        List<UserViewingStatus> myViewStatus = userViewingStatusRepository.getMyViewStatue(userId); // 켈린더에서 말고 여기서 가져오자
        HashMap<Content, Integer> checkMap = new HashMap<>();
        HashMap<Content, LocalDate> firstDateMap = new HashMap<>();

        for (UserViewingStatus userViewingStatus : myViewStatus) { // 캘린더를 통해 시청날짜 확인
            Content content = userViewingStatus.getTurnContent().getContent();
//            int contentEp = calender.getTurnContent().getEpisode();
            if (checkMap.containsKey(content)) {
                int cnt = checkMap.get(content);
                checkMap.put(content, cnt + 1);
            } else {
                checkMap.put(content, 1);
            }

            LocalDate bDate = userViewingStatus.getDate();
            if (firstDateMap.containsKey(content)) {
                LocalDate aDate = firstDateMap.get(content);
                if (aDate.isBefore(bDate)) {
                    firstDateMap.put(content, aDate);
                } else {
                    firstDateMap.put(content, bDate);
                }
            } else {
                firstDateMap.put(content, bDate);
            }

        }

        for (Content content : checkMap.keySet()) {
            int finalEp = content.getFinalEpisode();
            int viewCnt = checkMap.get(content);
            LocalDate firstDate = firstDateMap.get(content);
            boolean isComplete;
            if (finalEp <= viewCnt) {
                isComplete = true;
            } else {
                isComplete = false;
            }

//            System.out.println(firstDate);
            HistoryDTO historyDTO = new HistoryDTO(content, firstDate, isComplete);
            historyDTO.setIsWish(myWishContentList.contains(content.getId()));

            for (LikeContent lc : myLikeContentList) {
                if (lc.getContent().equals(content)) {
                    historyDTO.setLike(lc.getLike());
                    break;
                }
            }
            res.add(historyDTO);
        }


        return res;
    }

    public Map<Integer, List<HistoryInfoDTO>> getUserHistoryInfo(Long userId, Long contentId, int year, int month) {
        Map<Integer, List<HistoryInfoDTO>> res = new HashMap<>();

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = LocalDate.of(year, month, startDate.lengthOfMonth());
//        List<Calender> myCalenderList = calenderRepository.getSpecificContentViewedCalender(userId, startDate, endDate);
        List<Long> myWishContentList = wishContentRepository.getContentIdInMyWishList(userId);
        List<LikeContent> myLikeContentList = likeContentRepository.getLikeContent(userId);
        List<UserViewingStatus> myViewStatus = userViewingStatusRepository.getMyViewStatue(userId);

        for (UserViewingStatus userViewingStatus : myViewStatus) {
            LocalDate date = userViewingStatus.getDate(); // 본날짜
            if (date.getYear() != year || date.getMonthValue() != month) {
                continue;
            }
            Content content = userViewingStatus.getTurnContent().getContent();
            TurnContent turnContent = userViewingStatus.getTurnContent();
            int ep = userViewingStatus.getTurnContent().getEpisode();
            int day = date.getDayOfMonth();
            if (!content.getId().equals(contentId)) {
                continue;
            }
            HistoryInfoDTO historyInfoDTO = new HistoryInfoDTO(content, date, ep);
            historyInfoDTO.setIsWish(myWishContentList.contains(content.getId()));

            for (LikeContent lc : myLikeContentList) {
                if (lc.getContent().equals(content)) {
                    historyInfoDTO.setLike(lc.getLike());
                    break;
                }
            }

            List<HistoryInfoDTO> tmp;
            if (res.containsKey(day)) {
                tmp = res.get(day);
            } else {
                tmp = new ArrayList<>();
            }
            tmp.add(historyInfoDTO);
            res.put(day, tmp);
        }

        return res;
    }

    public LocalDate compareDate(LocalDate a, LocalDate b) {
        if (a.compareTo(b) < 0) {
            return a;
        } else {
            return b;
        }
    }
}
