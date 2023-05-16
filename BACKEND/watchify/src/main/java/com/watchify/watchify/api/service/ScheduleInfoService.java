package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.Calender;
import com.watchify.watchify.db.entity.Content;
import com.watchify.watchify.db.entity.LikeContent;
import com.watchify.watchify.db.entity.WishContent;
import com.watchify.watchify.db.repository.CalenderRepository;
import com.watchify.watchify.db.repository.LikeContentRepository;
import com.watchify.watchify.db.repository.WishContentRepository;
import com.watchify.watchify.dto.response.CalenderDTO;
import com.watchify.watchify.dto.response.ScheduleObjDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ScheduleInfoService {

    private final CalenderRepository calenderRepository;
    private final WishContentRepository wishContentRepository;
    private final LikeContentRepository likeContentRepository;

    @Transactional
    public Map<Integer, List<ScheduleObjDTO>> getScheduleInfo(Long userId, int year, int month) {

        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        // 그달에 해당하는 캘린더 값들
        List<Calender> monthOfCalenders = calenderRepository.getSchedule(userId, startDate, endDate);
        monthOfCalenders.sort(Comparator.comparing(Calender :: getDate)); // 날짜순으로 정렬


        List<Long> myWishContentList = wishContentRepository.getContentIdInMyWishList(userId);
        List<LikeContent> myLikeContentList = likeContentRepository.getLikeContent(userId);
        Map<Integer, List<ScheduleObjDTO>> res = new HashMap<>();

        for (int i=0; i<endDate.getDayOfMonth(); i++) {
            LocalDate point = startDate.plusDays(i);
            List<ScheduleObjDTO> scheduleObjDTOList = new ArrayList<>(); // point 일자의 컨텐츠를 담을 리스트
            for (Calender calender : monthOfCalenders) {
                Content thisContent = calender.getTurnContent().getContent();
                if (calender.getDate().isEqual(point)) {
                    ScheduleObjDTO scheduleObjDTO = new ScheduleObjDTO(thisContent, calender.getDate(), calender.getTurnContent().getEpisode());
                    if (calender.isView()) {
                        scheduleObjDTO.watchContent();
                    }

                    scheduleObjDTO.setIsWish(myWishContentList.contains(thisContent.getId()));
                    for (LikeContent lc : myLikeContentList) {
                        if (lc.getContent().equals(thisContent)) {
                            scheduleObjDTO.setLike(lc.getLike());
                            break;
                        }
                    }

                    scheduleObjDTOList.add(scheduleObjDTO);
                }
            }
            if (!scheduleObjDTOList.isEmpty()) {
                res.put(point.getDayOfMonth(), scheduleObjDTOList);
            }
        }

        return res;





    }

}
