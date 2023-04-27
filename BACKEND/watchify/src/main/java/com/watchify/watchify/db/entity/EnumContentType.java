package com.watchify.watchify.db.entity;

public enum EnumContentType {
    DRAMA("드라마"),
    MOVIE("영화"),
    TV_PROGRAM("TV 프로그램"),
    OTHER("기타");

    private String value;

    EnumContentType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
