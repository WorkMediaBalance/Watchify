package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.Content;
import com.watchify.watchify.db.entity.ContentGenre;
import com.watchify.watchify.db.repository.*;
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

import java.util.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecommendService {
    private final ContentRepository contentRepository;
    private final WishContentRepository wishContentRepository;
    private final LikeContentRepository likeContentRepository;
    private final TurnContentRepository turnContentRepository;
    private final ContentOTTRepository contentOTTRepository;
    private final ContentGenreRepository contentGenreRepository;

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
        System.out.println(API_URL);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<RecommendDTO> response = restTemplate.getForEntity(API_URL, RecommendDTO.class);
        RecommendDTO recommendDTO = response.getBody(); // 여기까지 데이터는 잘 받아와짐 But 변수명 변경 필요

        for (int i = 0; i < 10 ; i++){
            System.out.println(i);
            System.out.println(recommendDTO.getContentPk().get(i));
            System.out.println(recommendDTO.getContentRate().get(i));
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
        System.out.println(API_URL);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<ScheduleRecommendReqDTO> response = restTemplate.getForEntity(API_URL, ScheduleRecommendReqDTO.class);
        ScheduleRecommendReqDTO scheduleRecommendReqDTO = response.getBody();
        System.out.println("장고 추천 사이즈 : " + scheduleRecommendReqDTO.getContentPk().size());
        return scheduleRecommendReqDTO.getContentPk();
    }

    @Transactional
    public void deletedata() {
        List<Integer> s = Arrays.asList(12591, 16044, 16052, 16046, 16047, 16048, 12603, 12618, 16053, 16054, 16055, 16056, 22818, 22820, 16059, 16066, 14015, 16064, 14037, 16065, 22095, 16068, 8262, 16069, 16071, 16072, 16073, 16074, 16075, 22827, 16082, 22828, 16077, 16087, 16080, 16090, 16081, 16086, 14102, 16085, 22831, 16099, 16091, 16094, 16096, 14075, 16097, 16098, 14097, 16102, 16103, 16104, 16108, 22838, 16105, 17748, 22129, 14141, 14149, 16130, 16124, 22841, 16125, 16126, 16128, 16129, 2287, 16137, 17159, 16134, 16135, 16138, 16139, 16140, 15219, 16142, 16141, 15201, 15204, 15214, 16144, 15243, 16158, 16153, 16154, 22870, 15254, 22151, 16157, 15284, 22160, 16159, 16160, 15279, 16162, 15288, 16174, 22873, 15298, 15301, 16163, 16166, 16167, 15321, 16173, 15322, 15323, 16185, 16176, 16179, 16180, 16181, 22885, 16182, 16183, 15351, 16184, 22176, 16187, 16188, 16189, 16192, 16195, 22886, 15385, 15384, 16199, 16200, 16201, 16207, 16209, 16210, 16211, 16212, 16214, 16216, 16217, 16225, 22897, 16227, 16228, 16230, 16231, 16234, 16235, 560, 16482, 16246, 16236, 16237, 16240, 16241, 16249, 16242, 16243, 16244, 22909, 16245, 16247, 16251, 16252, 16253, 16254, 16255, 16258, 16259, 16260, 16261, 16263, 16267, 16265, 16266, 16268, 16270, 16272, 21178, 22918, 16274, 16276, 16279, 16277, 16278, 16280, 16283, 16284, 16285, 16286, 16287, 16289, 16298, 16303, 16305, 16306, 16307, 12619, 13997, 16309, 16310, 16311, 16312, 16313, 16314, 16315, 16316, 16317, 16318, 16320, 16321, 16323, 16324, 16325, 16328, 16331, 16332, 16334, 16338, 16339, 16340, 30217, 16343, 16345, 16348, 16350, 16353, 16354, 16356, 16357, 16362, 16363, 20629);
        // Service 추가하기
        for (int a : s){
            Long longValue = Long.valueOf(a);
            System.out.println(longValue);
            wishContentRepository.deleteById(longValue);
            likeContentRepository.deleteById(longValue);
            turnContentRepository.deleteById(longValue);
            contentOTTRepository.deleteById(longValue);
            contentGenreRepository.deleteById(longValue);
            contentRepository.deleteById(longValue);
        }
    }
}
