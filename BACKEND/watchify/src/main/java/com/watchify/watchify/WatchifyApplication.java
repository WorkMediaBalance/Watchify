package com.watchify.watchify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

// 테스트로 security 잠시 꺼두기
//@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
@EnableCaching
public class WatchifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(WatchifyApplication.class, args);
	}

}
