package com.watchify.watchify.config;
// https://velog.io/@rnqhstlr2297/Spring-Security-OAuth2-%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8 xxxx
// https://velog.io/@jkijki12/Spring-Boot-OAuth2-JWT-%EC%A0%81%EC%9A%A9%ED%95%B4%EB%B3%B4%EB%A6%AC%EA%B8%B0
import com.watchify.watchify.auth.CustomOAuth2UserService;
import com.watchify.watchify.auth.JwtAuthFilter;
import com.watchify.watchify.auth.OAuth2SuccessHandler;
import com.watchify.watchify.auth.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity  // 해당 애노테이션을 붙인 필터(현재 클래스)를 스프링 필터체인에 등록.
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler successHandler;
    private final TokenService tokenService;

    // WebSecurityConfigurerAdapter가 더이상 쓰이지 않아서 대체
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                // rest api이기 때문에 http 로그인 페이지 폼이 없고 csrf 보안이 필요없다.
                // 또한 토큰기반 인증을 할꺼니까 세션도 생성을 하지 않는다.
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                    .authorizeRequests()
                    .antMatchers("/token/**").permitAll()
                    .antMatchers("/auth/kakao/callback").permitAll()
                    .antMatchers("/**").permitAll()
                    .anyRequest().authenticated()

                .and()
                    .addFilterBefore(new JwtAuthFilter(tokenService),
                            UsernamePasswordAuthenticationFilter.class)
                    .oauth2Login() // oauth2Login 설정을 시작한다는 뜻이다.
                        // 토큰이 만료되었을 경우 /token/expired 로 이동하여 리프레시 한다.
                        // 위에서 .antMatchers("/token/**").permitAll() 설정으로
                        // /token/expired 은 별도의 권한 없이 접근 가능!
                        .loginPage("/token/expired") // login 페이지 url을 직접 설정해준다는 뜻이다.
                        .successHandler(successHandler) // 로그인 성공 시, handler를 설정해준다.
                        .userInfoEndpoint() // oauth2 로그인 성공 후 설정을 시작한다는 말이다.
                        .userService(oAuth2UserService); // oAuth2UserService에서 처리하겠다는 말이다.

        http.addFilterBefore(new JwtAuthFilter(tokenService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
