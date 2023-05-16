package com.watchify.watchify.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class RecommendDTO {
    private List<Long> contentPk;
    private List<Float> contentRate;

    @Builder
    public RecommendDTO(List<Long> contentPk, List<Float> contentRate){
        this.contentPk = contentPk;
        this.contentRate = contentRate;
    }
}
