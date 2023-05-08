package com.watchify.watchify.dto.response;

import com.watchify.watchify.db.entity.ContentGenre;
import com.watchify.watchify.db.entity.ContentOTT;
import com.watchify.watchify.db.entity.Genre;
import com.watchify.watchify.db.entity.WishContent;
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
    private int isLike = 0;
    private String summarize;
    private int audienceAge;

    public DefaultContentDTO(WishContent wishContent) {
        this.pk = wishContent.getContent().getId();
        this.title = wishContent.getContent().getTitle();
        this.runtime = wishContent.getContent().getRuntime();
        this.rate = wishContent.getContent().getRate();
        this.imgPath = wishContent.getContent().getImgPath();
        this.backdropPath = wishContent.getContent().getBackdropPath();
        this.season = wishContent.getContent().getSeason();
        this.finalEpisode = wishContent.getContent().getFinalEpisode();

        List<ContentOTT> contentOTTS = wishContent.getContent().getContentOTTS();
        this.ott = new HashMap<>();
        for (ContentOTT cot : contentOTTS) {
            ott.put(cot.getOtt().getName(), cot.getOttUrl() != null ? cot.getOttUrl() : "");
        }

        List<ContentGenre> contentGenres = wishContent.getContent().getContentGenres();
        this.genres = new ArrayList<>();
        for (ContentGenre genreObj : contentGenres) {
            if (genreObj.getGenre().getName() != null) {
                genres.add(genreObj.getGenre().getName());
            }
        }

        this.summarize = wishContent.getContent().getSummarize();
        this.audienceAge = wishContent.getContent().getAudienceAge();
    }

    public void setIsWish(boolean flag) { this.isWish = flag;}
    public void setIsLike(int flag) {this.isLike = flag;}

}
