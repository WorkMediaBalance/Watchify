package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.Content;
import com.watchify.watchify.db.entity.LikeContent;
import com.watchify.watchify.db.entity.User;
import com.watchify.watchify.db.entity.WishContent;
import com.watchify.watchify.db.repository.ContentRepository;
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

    private final WishContentRepository wishContentRepository;
    private final LikeContentRepository likeContentRepository;
    private final ContentRepository contentRepository;
    private final UserRepository userRepository;

    public List<DefaultContentDTO> getWishList(Long userId) {

        List<WishContent> wishList = wishContentRepository.getMyWishList(userId);
        List<LikeContent> likeList = likeContentRepository.getLikeContent(userId);

        Map<Long, Integer> likeMapPk = new HashMap<>(); // 내가 좋거나 싫거나한 컨텐츠
        for (LikeContent lc : likeList) {
            likeMapPk.put(lc.getContent().getId(), lc.isLike() == true ? 1 : -1);
        }

        List<DefaultContentDTO> res = new ArrayList<>();
        for (WishContent wc : wishList) {
            Content content = wc.getContent();
            DefaultContentDTO defaultContentDTO = new DefaultContentDTO(content);
            defaultContentDTO.setIsWish(true); // 찜목록 조회라서 무조건 true
            if (likeMapPk.containsKey(defaultContentDTO.getPk())) {
                defaultContentDTO.setIsLike(likeMapPk.get(defaultContentDTO.getPk()));
            }
            res.add(defaultContentDTO);
        }

        return res;
    }

    @Transactional
    public void switchWishContent(Long userId, Long contentPk) {
        User user = userRepository.findById(userId).get();
        Content thisContent = contentRepository.getContentById(contentPk);
        List<WishContent> wishContents = wishContentRepository.getAllMyWishList(userId);

        boolean flag = true;
        for (WishContent wishContent : wishContents) {
            if (wishContent.getContent().equals(thisContent)) {
                wishContent.switchDeleted();
                wishContentRepository.save(wishContent);
                flag = false;
                break;
            }
        }
        if (flag == true) {
            WishContent wishContent = new WishContent(user, thisContent);
            wishContentRepository.save(wishContent);
        }

    }
}
