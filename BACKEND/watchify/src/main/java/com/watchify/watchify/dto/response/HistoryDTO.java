package com.watchify.watchify.dto.response;

import com.watchify.watchify.db.entity.Content;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class HistoryDTO extends DefaultContentDTO{

    private int firstYear;
    private int firstMonth;
    private int firstDay;
    private boolean isComplete;

    public HistoryDTO(Content content, LocalDate date, boolean isComplete) {
        super(content);
        this.firstYear = date.getYear();
        this.firstMonth = date.getMonthValue();
        this.firstDay = date.getDayOfMonth();
        this.isComplete = isComplete;
    }


}
