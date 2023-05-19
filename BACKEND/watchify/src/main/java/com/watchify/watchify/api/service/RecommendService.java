package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.Content;
import com.watchify.watchify.db.repository.ContentRepository;
import com.watchify.watchify.dto.request.ContentRecommendDTO;
import com.watchify.watchify.dto.request.MainRecommendDTO;
import com.watchify.watchify.dto.request.SchduleRecommendtestDTO;
import com.watchify.watchify.dto.request.ScheduleRecommendReqDTO;
import com.watchify.watchify.dto.response.ContentRecommendResDTO;
import com.watchify.watchify.dto.response.DefaultContentDTO;
import com.watchify.watchify.dto.response.RecommendDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.StringJoiner;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecommendService {
    private final ContentRepository contentRepository;

    @Transactional
    public List<ContentRecommendResDTO> getContentRecommend(Long userId, ContentRecommendDTO contentRecommendDTO) {
        List<ContentRecommendResDTO> contentRecommendResDTOS = new ArrayList<>(); // 추가하기
        String s = String.join(", ", contentRecommendDTO.getGenres());
        String ottl = String.join(", ", contentRecommendDTO.getOttList());
        int rating = 0;
        if (contentRecommendDTO.isAdult()){
            rating = 1;
        }
        String API_URL = "https://k8a207.p.ssafy.io/v1/recommend?id=" + userId + "&genres=" + s + "&ott="+ ottl + "&rating=" + rating;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<RecommendDTO> response = restTemplate.getForEntity(API_URL, RecommendDTO.class);
        RecommendDTO recommendDTO = response.getBody(); // 여기까지 데이터는 잘 받아와짐 But 변수명 변경 필요

        for (int i = 0; i < 10 ; i++){

            Content content = contentRepository.getContentById(recommendDTO.getContentPk().get(i));
            float score = recommendDTO.getContentRate().get(i);
            ContentRecommendResDTO contentRecommendResDTO = new ContentRecommendResDTO(content, score);
            contentRecommendResDTOS.add(contentRecommendResDTO);
        }
        return contentRecommendResDTOS;
    }

    @Transactional
    public List<Long> getSchediledTest(Long userId,SchduleRecommendtestDTO schduleRecommendtestDTO) {
        HashMap<String, List<Long>> hash = new HashMap<>();// 추가하기
        StringJoiner contents = new StringJoiner(",");
        StringJoiner ottL = new StringJoiner(",");
        for (Long i: schduleRecommendtestDTO.getContents()){
            contents.add(i.toString());
        }

        for (Long i: schduleRecommendtestDTO.getOttList()){
            ottL.add(i.toString());
        }
        // Service 추가하기
        String API_URL = "https://k8a207.p.ssafy.io/v1/recommend/schedule?id="+ userId + "&content_id=" + contents + "&ott_id=" + ottL;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<ScheduleRecommendReqDTO> response = restTemplate.getForEntity(API_URL, ScheduleRecommendReqDTO.class);
        ScheduleRecommendReqDTO scheduleRecommendReqDTO = response.getBody();

        return scheduleRecommendReqDTO.getContentPk();
    }
}
