package com.watchify.watchify.db.entity;

public enum EnumContentType {
    DRAMA("드라마"),
    MOVIE("영화");

    private String value;

    EnumContentType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
