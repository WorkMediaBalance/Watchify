package com.watchify.watchify.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class LocalDateService {

    public LocalDate stringToLocalDate(String date) {
        if (date == null) {
            return null;
        }
        return LocalDate.parse(date);
    }
}
