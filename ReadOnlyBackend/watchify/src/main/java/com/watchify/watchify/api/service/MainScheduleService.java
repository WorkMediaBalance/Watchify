package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.*;
import com.watchify.watchify.db.repository.*;
import com.watchify.watchify.dto.request.MainRecommendDTO;
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

import java.lang.reflect.Array;
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
    private final ContentOTTRepository contentOTTRepository;

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
                            calenderDTO.setLike(likeContent.getLike());
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
    public HashMap<String, List<DefaultContentDTO>> getmainRecommend(Long userId) {
        HashMap<String, List<DefaultContentDTO>> hash = new HashMap<>();// 추가하기
        // Service 추가하기
        String API_URL = "https://k8a207.p.ssafy.io/v1/recommend/main?id=" + userId;
//        System.out.println(API_URL);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<MainRecommendDTO> response = restTemplate.getForEntity(API_URL, MainRecommendDTO.class);
        MainRecommendDTO mainRecommendDTO = response.getBody();

        int count = 0;
        for (List<Long> value : mainRecommendDTO.getContentPk()){
            count ++;
            List<DefaultContentDTO> l = new ArrayList<>();
            for (Long i : value){
                Content content = contentRepository.getContentById(i);
                DefaultContentDTO defaultContentDTO = new DefaultContentDTO(content);
                l.add(defaultContentDTO);
            }
            if (count == 1){
                hash.put("netflix", l);
            }else if(count == 2){
                hash.put("wavve", l);
            }else if(count == 3){
                hash.put("watcha", l);
            }else{
                hash.put("disney", l);
            }
        }
        return hash;
    }

    @Transactional
    public HashMap<String, List<DefaultContentDTO>> getrecommendnon() {
        HashMap<String, List<DefaultContentDTO>> hash = new HashMap<>();
        List<String> otts = List.of("netflix","watcha","wavve","disney");
        for (String ott: otts){
            List<Long> contentOTTS = contentOTTRepository.findContentOTT(ott);
            List<DefaultContentDTO> defaultContentDTOS = new ArrayList<>();
            for (Long i: contentOTTS){
                Content content = contentRepository.getContentById(i);
                DefaultContentDTO defaultContentDTO = new DefaultContentDTO(content);
                defaultContentDTOS.add(defaultContentDTO);
            }
            hash.put(ott, defaultContentDTOS);
        }
        return hash;
    }
}
