package com.watchify.watchify.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class SchduleRecommendtestDTO {
    private List<Long> contents;
    private List<Long> ottList;
}
