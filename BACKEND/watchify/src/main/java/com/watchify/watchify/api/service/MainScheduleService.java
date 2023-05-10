package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.*;
import com.watchify.watchify.db.repository.*;
import com.watchify.watchify.dto.response.CalenderDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MainScheduleService {

    private final CalenderRepository calenderRepository;
    private final WishContentRepository wishContentRepository;
    private final LikeContentRepository likeContentRepository;

    @Transactional
    public Map<Integer, List<CalenderDTO>> getMainSchedule(Long userId) {

        Map<Integer, List<CalenderDTO>> res = new HashMap<>();

        // 오늘날짜
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.minusDays(3);
        LocalDate endDate = today.plusDays(3);

        List<Calender> calenders = calenderRepository.getSchedule(userId, startDate, endDate);
        List<WishContent> wishContents = wishContentRepository.getMyWishList(userId);
        List<LikeContent> likeContents = likeContentRepository.getLikeContent(userId);

        for (int i=0; i < 7; i++) {
            // start 날짜 기준 + i 번째 날짜가 있는 값 찾기
            LocalDate point = startDate.plusDays(i);
            List<Calender> filterCalenders = calenders.stream()
                    .filter(calender -> calender.getDate().isEqual(point))
                    .collect(Collectors.toList());

            List<CalenderDTO> calenderDTOS = new ArrayList<>();
            for (Calender calender : filterCalenders) {
                Content thisContent = calender.getTurnContent().getContent();
                CalenderDTO calenderDTO = new CalenderDTO(thisContent, calender.getDate(), calender.getViewDate(), calender.getTurnContent().getEpisode());
                calenderDTOS.add(calenderDTO);

                for (WishContent wishContent : wishContents) {
                    if (wishContent.getContent().equals(thisContent)) {
                        if (wishContent.isDeleted() != true) {
                            calenderDTO.setIsWish(true);
                        }
                        break;
                    }
                }

                for (LikeContent likeContent : likeContents) {
                    if (likeContent.getContent().equals(thisContent)) {
                        if (likeContent.isDeleted() != true) {
                            calenderDTO.setIsLike(likeContent.isLike() ? 1 : -1);
                        }
                    }
                }

            }

            res.put(i, calenderDTOS);
        }

        return res;
    }
}
