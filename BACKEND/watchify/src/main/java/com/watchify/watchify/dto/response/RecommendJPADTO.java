package com.watchify.watchify.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class RecommendJPADTO {
    private int id;
    private List<String> genres;
}
