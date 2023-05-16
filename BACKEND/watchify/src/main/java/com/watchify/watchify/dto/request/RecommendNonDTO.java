package com.watchify.watchify.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class RecommendNonDTO {
    private List<Long> netflix;
    private List<Long> watcha;
    private List<Long> wavve;
    private List<Long> disney_plus;

}
