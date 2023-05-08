package com.watchify.watchify.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ContentDTO {
    private Long pk;
    private String title;
    private int runtime;
    private double rate;
    private String imgPath;
    private String backdropPath;
    private String type;
    private int season;
    private int finalEpisode;
}
