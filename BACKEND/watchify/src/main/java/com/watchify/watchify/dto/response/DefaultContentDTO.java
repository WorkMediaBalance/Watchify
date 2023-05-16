package com.watchify.watchify.dto.response;

import com.watchify.watchify.db.entity.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.*;

@Getter
@NoArgsConstructor
public class DefaultContentDTO {
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
    private boolean isWish = false;
    private Double like = -1d;
    private String summarize;
    private int audienceAge;

    public DefaultContentDTO(Content content) {
        this.pk = content.getId();
        this.title = content.getTitle();
        this.runtime = content.getRuntime();
        this.rate = content.getRate();
        this.imgPath = content.getImgPath();
        this.backdropPath = content.getBackdropPath();
        this.season = content.getSeason();
        this.finalEpisode = content.getFinalEpisode();

        List<ContentOTT> contentOTTS = content.getContentOTTS();
        this.ott = new HashMap<>();
        for (ContentOTT cot : contentOTTS) {
            ott.put(cot.getOtt().getName(), cot.getOttUrl() != null ? cot.getOttUrl() : "");
        }

        List<ContentGenre> contentGenres = content.getContentGenres();
        this.genres = new ArrayList<>();
        for (ContentGenre genreObj : contentGenres) {
            if (genreObj.getGenre().getName() != null) {
                genres.add(genreObj.getGenre().getName());
            }
        }

        this.summarize = content.getSummarize();
        this.audienceAge = content.getAudienceAge();
    }

    public DefaultContentDTO(Calender calender) {

    }

    public void setIsWish(boolean flag) { this.isWish = flag;}
    public void setLike(Double like) {this.like = like;}
    public void setOtt(Map<String, String> ott) {this.ott = ott;}


}
