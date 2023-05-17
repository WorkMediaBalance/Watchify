package com.watchify.watchify.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ScheduleRecommendReqDTO {
    private List<Long> contentPk;

}
