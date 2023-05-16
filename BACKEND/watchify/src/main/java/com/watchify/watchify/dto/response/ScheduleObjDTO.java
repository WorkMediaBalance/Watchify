package com.watchify.watchify.dto.response;


import com.watchify.watchify.db.entity.Content;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class ScheduleObjDTO extends DefaultContentDTO {

    private LocalDate date; // 시청날짜
    private int episode;
    private boolean isView = false; // 봤냐 안봤냐

    public ScheduleObjDTO(Content content, LocalDate date, int episode) {
        super(content);
        this.date = date;
        this.episode = episode;
    }

    public ScheduleObjDTO(Content content, LocalDate date, int episode, boolean isView) {
        super(content);
        this.date = date;
        this.episode = episode;
        this.isView = isView;
    }

    public void watchContent() {this.isView = true;}
}
