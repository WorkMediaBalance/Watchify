package com.watchify.watchify.dto.response;

import lombok.Getter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
public class MainScheduleDTO {
//    private Map<Integer, List<CalenderDTO>> _0;
    private Map<Integer, List<Integer>> _0;

    public MainScheduleDTO() {
        List<Integer> tmp = new ArrayList<>();
        tmp.add(100);

        Map<Integer, List<Integer>> res = new HashMap<>();
        res.put(0, tmp);
        this._0 = res;
    }

}
