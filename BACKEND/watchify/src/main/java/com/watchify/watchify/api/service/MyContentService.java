package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.Content;
import com.watchify.watchify.db.entity.LikeContent;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.entity.WishContent;
import com.watchify.watchify.db.repository.LikeContentRepository;
import com.watchify.watchify.db.repository.UserRepository;
import com.watchify.watchify.db.repository.WishContentRepository;
import com.watchify.watchify.dto.response.DefaultContentDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MyContentService {

    private  final WishContentRepository wishContentRepository;
    private final LikeContentRepository likeContentRepository;

    public List<DefaultContentDTO> getWishList(Long userId) {

        List<WishContent> wishList = wishContentRepository.getMyWishList(userId);
        List<LikeContent> likeList = likeContentRepository.getLikeContent(userId);

        System.out.println("wishList.size() : " + wishList.size());
        System.out.println("likeList.size() : " + likeList.size());

        Map<Long, Integer> likeMapPk = new HashMap<>(); // 내가 좋거나 싫거나한 컨텐츠
        for (LikeContent lc : likeList) {
            likeMapPk.put(lc.getContent().getId(), lc.isLike() == true ? 1 : -1);
        }

        List<DefaultContentDTO> res = new ArrayList<>();
        for (WishContent wc : wishList) {
            DefaultContentDTO defaultContentDTO = new DefaultContentDTO(wc);
            defaultContentDTO.setIsWish(true); // 찜목록 조회라서 무조건 true
            if (likeMapPk.containsKey(defaultContentDTO.getPk())) {
                defaultContentDTO.setIsLike(likeMapPk.get(defaultContentDTO.getPk()));
            }
            res.add(defaultContentDTO);
        }

        return res;
    }
}
