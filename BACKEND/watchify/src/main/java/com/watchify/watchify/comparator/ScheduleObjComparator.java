package com.watchify.watchify.comparator;

import com.watchify.watchify.dto.response.ScheduleObjDTO;

import java.util.Comparator;

public class ScheduleObjComparator implements Comparator<ScheduleObjDTO> {

    @Override
    public int compare(ScheduleObjDTO obj1, ScheduleObjDTO obj2) {
        if (obj1.getPk() != obj2.getPk()) {
            return Long.compare(obj1.getPk(), obj2.getPk());
        } else {
            return Integer.compare(obj1.getEpisode(), obj2.getEpisode());
        }
    }
}
