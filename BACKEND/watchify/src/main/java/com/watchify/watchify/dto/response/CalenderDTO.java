package com.watchify.watchify.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class CalenderDTO {
    private Long pk;
    private Date date;
    private boolean isView;
    private boolean isDeleted;
    private Date viewDate;
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

}
