package com.watchify.watchify.dto.response;

import com.sun.istack.NotNull;
import com.watchify.watchify.db.entity.Calender;
import com.watchify.watchify.db.entity.Content;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.security.PrivateKey;
import java.time.LocalDate;
import java.util.Date;

@Getter
@NoArgsConstructor
public class CalenderDTO extends DefaultContentDTO{

    @NotNull
    private LocalDate date; // 등록날짜
    private LocalDate viewDate;
    Private int episode;

    public CalenderDTO(Content content, LocalDate date, LocalDate viewDate, int episode) {
        super(content);
        this.date = date;
        this.viewDate = viewDate;
        this.episode = episode;

    }

}
