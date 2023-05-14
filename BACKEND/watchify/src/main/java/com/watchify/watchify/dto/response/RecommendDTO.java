package com.watchify.watchify.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class RecommendDTO {
    private List<Integer> contentPk;
    private List<Integer> contentRate;

    @Builder
    public RecommendDTO(List<Integer> contentPk, List<Integer> contentRate){
        this.contentPk = contentPk;
        this.contentRate = contentRate;
    }
}
