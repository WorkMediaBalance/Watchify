package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.Content;
import com.watchify.watchify.db.repository.ContentRepository;
import com.watchify.watchify.dto.request.ContentRecommendDTO;
import com.watchify.watchify.dto.response.DefaultContentDTO;
import com.watchify.watchify.dto.response.RecommendDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecommendService {
    private static ContentRepository contentRepository;
    @Transactional
    public List<DefaultContentDTO> getContentRecommend(Long userId, ContentRecommendDTO contentRecommendDTO) {
        List<DefaultContentDTO> defaultContentDTOS = new ArrayList<>(); // 추가하기
        String s = String.join(", ", contentRecommendDTO.getGenres());
        int rating = 0;
        if (contentRecommendDTO.isAdult()){
            rating = 1;
        }
        String API_URL = "https://k8a207.p.ssafy.io/v1/recommend?id=" + userId + "&genres=" + s + "&rating=" + rating;
        System.out.println(API_URL);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<RecommendDTO> response = restTemplate.getForEntity(API_URL, RecommendDTO.class);
        RecommendDTO recommendDTO = response.getBody(); // 여기까지 데이터는 잘 받아와짐 But 변수명 변경 필요
        System.out.println(recommendDTO.getContentPk());

        // 하나씩 들고오기
        for (Long p: recommendDTO.getContentPk()){
            Content content = contentRepository.getContentById(p); // 값을 가져온다.
            DefaultContentDTO defaultContentDTO = new DefaultContentDTO(content);
            defaultContentDTOS.add(defaultContentDTO); // List 형태 추가
        }

        return defaultContentDTOS;
    }
}
