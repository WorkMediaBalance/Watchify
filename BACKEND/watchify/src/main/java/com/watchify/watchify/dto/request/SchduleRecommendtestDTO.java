package com.watchify.watchify.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SchduleRecommendtestDTO {
    private List<Long> contents;
    private List<Long> ottList;

}
