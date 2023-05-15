package com.watchify.watchify.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class MainRecommendNonDTO {
    private List<String> OttList;

    @Builder
    public MainRecommendNonDTO(List<String> OttList){
        this.OttList = OttList;
    }
}