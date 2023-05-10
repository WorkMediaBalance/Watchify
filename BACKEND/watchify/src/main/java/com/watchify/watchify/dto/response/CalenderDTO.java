package com.watchify.watchify.dto.response;

import com.sun.istack.NotNull;
import com.watchify.watchify.db.entity.Content;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class CalenderDTO extends DefaultContentDTO{

    @NotNull
    private LocalDate date; // 봐야되는 날짜
    private LocalDate viewDate; // 실제 본날짜
    private int episode;

    public CalenderDTO(Content content, LocalDate date, LocalDate viewDate, int episode) {
        super(content);
        this.date = date;
        this.viewDate = viewDate;
        this.episode = episode;

    }

}
