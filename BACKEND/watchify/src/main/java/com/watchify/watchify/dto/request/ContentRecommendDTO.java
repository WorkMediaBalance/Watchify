package com.watchify.watchify.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ContentRecommendDTO {
    private boolean isAdult;
    private List<Integer> contentPk;
    private List<Integer> contentRate;

    @Builder
    public ContentRecommendDTO(boolean isAdult ,List<Integer> contentPk, List<Integer> contentRate){
        this.isAdult = isAdult;
        this.contentPk = contentPk;
        this.contentRate = contentRate;
    }
}
