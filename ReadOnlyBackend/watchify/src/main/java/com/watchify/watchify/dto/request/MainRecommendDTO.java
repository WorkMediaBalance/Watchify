package com.watchify.watchify.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class MainRecommendDTO {
    private List<List<Long>> contentPk;
}
