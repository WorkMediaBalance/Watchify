package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.Calender;
import com.watchify.watchify.db.entity.Content;
import com.watchify.watchify.db.entity.LikeContent;
import com.watchify.watchify.db.repository.CalenderRepository;
import com.watchify.watchify.db.repository.LikeContentRepository;
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

    public List<HistoryDTO> getUserHistory(Long userId) {
        List<HistoryDTO> res = new ArrayList<>();

        List<Calender> myCalenderList = calenderRepository.getMyViewedCalender(userId);
        List<Long> myWishContentList = wishContentRepository.getContentIdInMyWishList(userId);
        List<LikeContent> myLikeContentList = likeContentRepository.getLikeContent(userId);
        HashMap<Content, Integer> checkMap = new HashMap<>();
        HashMap<Content, LocalDate> firstDateMap = new HashMap<>();

        for (Calender calender : myCalenderList) {
            Content content = calender.getTurnContent().getContent();
            int contentEp = calender.getTurnContent().getEpisode();
            if (checkMap.containsKey(content)) {
                int cnt = checkMap.get(content);
                checkMap.put(content, cnt + 1);
            } else {
                checkMap.put(content, 1);
            }

            if (contentEp <= 1) {
                LocalDate bDate = calender.getViewDate();
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
        List<Calender> myCalenderList = calenderRepository.getSpecificContentViewedCalender(userId, startDate, endDate);
        List<Long> myWishContentList = wishContentRepository.getContentIdInMyWishList(userId);
        List<LikeContent> myLikeContentList = likeContentRepository.getLikeContent(userId);

        for (Calender calender : myCalenderList) {
            LocalDate date = calender.getViewDate(); // 본날짜
            Content content = calender.getTurnContent().getContent();
            int ep = calender.getTurnContent().getEpisode();
            int day = date.getDayOfMonth();
            if (content.getId() != contentId) {
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
}
