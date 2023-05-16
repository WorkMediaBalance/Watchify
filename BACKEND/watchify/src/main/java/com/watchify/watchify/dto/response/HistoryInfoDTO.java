package com.watchify.watchify.dto.response;

import com.watchify.watchify.db.entity.Content;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class HistoryInfoDTO extends DefaultContentDTO {

    private LocalDate date; // 시청날짜
    private int episode;

    public HistoryInfoDTO(Content content, LocalDate date, int episode) {
        super(content);
        this.date = date;
        this.episode = episode;
    }
}
