package com.watchify.watchify.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ContentRecommendDTO {
    private boolean isAdult;
    private List<String> ottList;
    private List<String> genres;

    @Builder
    public ContentRecommendDTO(boolean isAdult ,List<String> ottList, List<String> genres){
        this.isAdult = isAdult;
        this.ottList = ottList;
        this.genres = genres;
    }
}
