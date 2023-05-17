package com.watchify.watchify.api.service;

import com.watchify.watchify.db.entity.Content;
import com.watchify.watchify.db.entity.UserViewingStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class CommonLogic {

    public HashMap<Long, List<Integer>> makeMyViewStatus(List<UserViewingStatus> myViewStatus) {
        HashMap<Long, List<Integer>> myViewMap = new HashMap<>(); // myViewStatus 를 맵형식으로 관리
        for (UserViewingStatus userViewingStatus : myViewStatus) {
            Content content = userViewingStatus.getTurnContent().getContent();
            Long contentPk = content.getId();
            int ep = userViewingStatus.getTurnContent().getEpisode();
            List<Integer> tmp;
            if (myViewMap.containsKey(contentPk)) {
                tmp = myViewMap.get(contentPk);
            } else {
                tmp = new ArrayList<>();
            }
            tmp.add(ep);
            myViewMap.put(contentPk, tmp);
        }

        return myViewMap;
    }
}
