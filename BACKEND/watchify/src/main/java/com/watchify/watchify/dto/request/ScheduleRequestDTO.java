package com.watchify.watchify.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Map;

@Getter
@NoArgsConstructor
public class ScheduleRequestDTO {
    private Long pk;
    private String title;
    private Integer runtime;
    private double rate;
    private String imgPath;
    private String backdropPath;
    private int season;
    private int finalEpisode;
    private Map<String, String> ott;
    private ArrayList<String> genres;
    private boolean isWish;
    private Double like;
    private String summarize;
    private int audienceAge;
    private int episode;
    private LocalDate date;

}
