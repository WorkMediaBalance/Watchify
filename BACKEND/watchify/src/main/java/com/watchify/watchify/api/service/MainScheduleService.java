package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.*;
import com.watchify.watchify.db.repository.*;
import com.watchify.watchify.dto.request.RecommendNonDTO;
import com.watchify.watchify.dto.response.CalenderDTO;
import com.watchify.watchify.dto.response.DefaultContentDTO;
import com.watchify.watchify.dto.response.RecommendDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MainScheduleService {

    private final CalenderRepository calenderRepository;
    private final WishContentRepository wishContentRepository;
    private final LikeContentRepository likeContentRepository;
    private final ContentRepository contentRepository;

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
                        break;
                    }
                }

            }

            res.put(i, calenderDTOS);
        }

        return res;
    }

    @Transactional
    public List<DefaultContentDTO> getmainRecommend(Long userId) {
        List<DefaultContentDTO> defaultContentDTOS = new ArrayList<>(); // 추가하기
        // Service 추가하기
        String API_URL = "https://k8a207/ai/recommend?id={id}&genres={genres}";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<RecommendDTO> response = restTemplate.getForEntity(API_URL, RecommendDTO.class);
        RecommendDTO recommendDTO = response.getBody();

        // 하나씩 들고오기
        for (Long p: recommendDTO.getContentPk()){
            Content content = contentRepository.getContentById(p); // 값을 가져온다.
            DefaultContentDTO defaultContentDTO = new DefaultContentDTO(content);
            defaultContentDTOS.add(defaultContentDTO); // List 형태 추가
        }

        return defaultContentDTOS;
    }

//    @Transactional
//    public List<DefaultContentDTO> getrecommendnon() {
//
//    }
}
