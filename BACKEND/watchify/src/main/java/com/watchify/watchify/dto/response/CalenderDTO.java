package com.watchify.watchify.dto.response;

import com.watchify.watchify.db.entity.Calender;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Getter
@NoArgsConstructor
public class CalenderDTO {
    private Long pk;
    private LocalDate date;
    private boolean isView;
    private boolean isDeleted;
    private LocalDate viewDate;
    private String title;
    private String imgPath;
    private String imgName;
    private String type;
    private int season;
    private int episode;
    private String horizontalImgPath;
    private String horizontalImgName;
    private int runtime;
    private String ott;



    public CalenderDTO(Calender calender) {
        this.pk = calender.getId();
        this.date = calender.getDate();
        this.isView = calender.isView();
        this.isDeleted = calender.isDeleted();
        this.viewDate = calender.getViewDate();
        this.title = calender.getTurnContent().getContent().getTitle();
        this.imgPath = calender.getTurnContent().getContent().getImgPath();
        this.imgName = calender.getTurnContent().getContent().getImgName();
        this.type = calender.getTurnContent().getContent().getType().getValue();
        this.season = calender.getTurnContent().getContent().getSeason() != null ? calender.getTurnContent().getContent().getSeason() : 0;
        this.episode = calender.getTurnContent().getEpisode();
        this.horizontalImgPath = calender.getTurnContent().getContent().getHorizontialImgPath();
        this.horizontalImgName = calender.getTurnContent().getContent().getHorizontialImgName();
        this.runtime = calender.getTurnContent().getContent().getRuntime();
        this.ott = calender.getOtt().getName();
    }

}