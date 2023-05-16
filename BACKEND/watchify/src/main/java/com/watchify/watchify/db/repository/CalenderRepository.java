package com.watchify.watchify.db.repository;

import com.watchify.watchify.db.entity.Calender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;

public interface CalenderRepository extends JpaRepository<Calender, Long> {

    @Query(value = "select * from calender c where c.user_id = :userId and is_deleted = false and c.date between :startDate and :endDate ORDER BY c.date ASC", nativeQuery = true)
    List<Calender> getSchedule(Long userId, LocalDate startDate, LocalDate endDate);

    @Query(value = "select * from calender c where c.user_id = :userId and is_deleted = false and c.date >= :startDate ORDER BY c.date ASC", nativeQuery = true)
    List<Calender> getScheduleAfterStartDate(Long userId, LocalDate startDate);

    // view_date 가 있는 캘린더 만 == 시청한 켈린더만
    @Query(value = "select * from calender c where c.user_id = :userId and is_deleted = false and view_date is not null", nativeQuery = true)
    List<Calender> getMyViewedCalender(@Param("userId") Long userId);

    @Query(value = "select * from calender c where c.user_id = :userId and is_deleted = false and view_date is not null and c.date between :startDate and :endDate ", nativeQuery = true)
    List<Calender> getSpecificContentViewedCalender(Long userId, LocalDate startDate, LocalDate endDate);


    // 내 전체 달력 조회 ( 삭제한거 빼고)
    @Query(value = "select * from calender c where c.user_id = :userId and is_deleted = false order by c.date", nativeQuery = true)
    List<Calender> getMyCalenderList(@Param("userId") Long userId);


    @Query(value = "select * from calender c where c.user_id = :userId and is_deleted = false and date=:date and turn_content_id=:tcId", nativeQuery = true)
    Calender getSpecificByUserDateTurnContent(Long userId, LocalDate date, Long tcId);


}
