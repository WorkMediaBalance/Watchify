package com.watchify.watchify.config;
// https://velog.io/@rnqhstlr2297/Spring-Security-OAuth2-%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8

import com.watchify.watchify.auth.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity  // 해당 애노테이션을 붙인 필터(현재 클래스)를 스프링 필터체인에 등록.
public class SecurityConfig {

    // 커스텀한 OAuth2UserService DI.
    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;

    // encoder를 빈으로 등록.
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // WebSecurityConfigurerAdapter가 더이상 쓰이지 않아서 대체
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/user/**").authenticated()
                .antMatchers("/admin/**").hasAnyAuthority("ADMIN")
                .anyRequest().permitAll()

                .and()
                .formLogin() // OAuth2 프로토콜 방식을 사용하지 않는 방식인경우
                .loginPage("/loginForm") // 미인증자일 경우 여기로 이동
                .loginProcessingUrl("/login") // login 주소가 호출되면 시큐리티가 낚아 채서(post로 오는것) 대신 로그인 진행 -> 컨트롤러를 안만들어도 된다.
                .defaultSuccessUrl("/")

                .and()
                .oauth2Login()
                .defaultSuccessUrl("/good")
                .userInfoEndpoint()
                .userService(customOAuth2UserService);

        return http.build();
    }



}
