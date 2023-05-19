package com.watchify.watchify.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
public class TestController {
    @GetMapping("/test")
    public String index() {
        return "hi Oauth2 zzz";
    }

    @GetMapping("oauth2/test")
    public String test1() {
        LocalDate today = LocalDate.now();

        for (int i = 0; i < 7; i++) {

        }

        return "hi Oauth2 zzz";
    }
}
