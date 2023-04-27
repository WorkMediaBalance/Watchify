package com.watchify.watchify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

// 테스트로 security 잠시 꺼두기
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class WatchifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(WatchifyApplication.class, args);
	}

}
