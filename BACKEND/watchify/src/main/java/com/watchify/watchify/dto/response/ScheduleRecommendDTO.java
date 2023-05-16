package com.watchify.watchify.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ScheduleRecommendDTO {
    private List<Integer> contentPk;

    @Builder
    public ScheduleRecommendDTO(List<Integer> contentPk){
        this.contentPk = contentPk;
    }
}
