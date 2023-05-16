package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.Content;
import com.watchify.watchify.db.entity.LikeContent;
import com.watchify.watchify.db.repository.ContentRepository;
import com.watchify.watchify.db.repository.LikeContentRepository;
import com.watchify.watchify.db.repository.WishContentRepository;
import com.watchify.watchify.dto.response.DefaultContentDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ContentService {

    private final ContentRepository contentRepository;
    private final WishContentRepository wishContentRepository;
    private final LikeContentRepository likeContentRepository;

    public DefaultContentDTO getContentInfo(Long userId, Long contentId) {
        DefaultContentDTO res = new DefaultContentDTO();

        Content content = contentRepository.getContentById(contentId);
        if (content == null) {
            return res;
        }

        res = new DefaultContentDTO(content);
        if (userId == null) {
            return res;
        }

        List<Long> myWishContentList = wishContentRepository.getContentIdInMyWishList(userId);
        List<LikeContent> myLikeContentList = likeContentRepository.getLikeContent(userId);
        res.setIsWish(myWishContentList.contains(content.getId()));

        for (LikeContent lc : myLikeContentList) {
            if (lc.getContent().equals(content)) {
                res.setLike(lc.getLike());
                break;
            }
        }


        return res;
    }
}
