package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.Content;
import com.watchify.watchify.db.entity.LikeContent;
import com.watchify.watchify.db.entity.WishContent;
import com.watchify.watchify.db.repository.ContentRepository;
import com.watchify.watchify.db.repository.LikeContentRepository;
import com.watchify.watchify.db.repository.WishContentRepository;
import com.watchify.watchify.dto.response.DefaultContentDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SearchService {

    private final ContentRepository contentRepository;
    private final WishContentRepository wishContentRepository;
    private final LikeContentRepository likeContentRepository;

    public List<String> getSearchBasicRes(String word) {
        List<String> res = contentRepository.getSearchBasic(word);
        return res;
    }

    public List<DefaultContentDTO> getSearchResult(Long userId, String word) {
        List<DefaultContentDTO> res = new ArrayList<>();
        Content content = contentRepository.getSearchRes(word);
        List<Long> wishContentList = wishContentRepository.getContentIdInMyWishList(userId);
        List<LikeContent> likeContentList = likeContentRepository.getLikeContent(userId);

        if (content == null) {
            return res;
        }

        DefaultContentDTO defaultContentDTO = new DefaultContentDTO(content);

        if (userId == null) {
            res.add(defaultContentDTO);
            return res;
        }

        defaultContentDTO.setIsWish(wishContentList.contains(content.getId()));
        for (LikeContent lc : likeContentList) {
            if (lc.getContent().equals(content)) {
                defaultContentDTO.setIsLike(lc.isLike() ? 1 : -1);
                break;
            }
        }

        res.add(defaultContentDTO);
        return res;
    }
}
