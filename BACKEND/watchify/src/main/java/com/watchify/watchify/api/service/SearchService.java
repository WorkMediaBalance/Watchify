package com.watchify.watchify.api.service;

import com.watchify.watchify.db.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SearchService {

    private final ContentRepository contentRepository;

    public List<String> getSearchBasicRes(String word) {
        List<String> res = new ArrayList<>();
        res = contentRepository.getSearchBasic(word);
        return res;
    }
}
