package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.Calender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;

public interface CalenderRepository extends JpaRepository<Calender, Long> {

    @Query(value = "select * from calender c where c.user_id = :userId and is_deleted = false and c.date between :startDate and :endDate ORDER BY c.date ASC", nativeQuery = true)
    List<Calender> getSchedule(Long userId, LocalDate startDate, LocalDate endDate);

    @Query(value = "select * from calender c where c.user_id = :userId and is_deleted = false and c.date >= :startDate ORDER BY c.date ASC", nativeQuery = true)
    List<Calender> getScheduleAfterStartDate(Long userId, LocalDate startDate);

}
