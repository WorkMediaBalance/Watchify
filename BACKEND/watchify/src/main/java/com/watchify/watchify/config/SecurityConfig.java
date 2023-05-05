package com.watchify.watchify.config;
// https://velog.io/@rnqhstlr2297/Spring-Security-OAuth2-%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8 xxxx
// https://velog.io/@jkijki12/Spring-Boot-OAuth2-JWT-%EC%A0%81%EC%9A%A9%ED%95%B4%EB%B3%B4%EB%A6%AC%EA%B8%B0
import com.watchify.watchify.auth.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
@EnableWebSecurity // << ??
public class SecurityConfig {

    private final TokenService tokenService;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final CustomAuthorizationRequestRepository customAuthorizationRequestRepository;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
    private final CustomAuthenticationFailureHandler customAuthenticationFailureHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Disable CORS support
        http.cors().configurationSource(corsConfigurationSource());

        // Disable CSRF protection
        // RESTful API 상태가 없는 인증방식으로 csrf 불필요
        http.csrf().disable();

        http.addFilterAfter(new JwtAuthFilter(tokenService), LogoutFilter.class);

        http.exceptionHandling(handle ->
                handle
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint) // jwt 인증 실패
                        .accessDeniedHandler(jwtAccessDeniedHandler)); // 권한없는 리소스에 접근시

        // 세션 생성x
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);


        http.oauth2Login(oauth2 ->
                oauth2
                        .authorizationEndpoint(
                                endpoint -> endpoint.authorizationRequestRepository(customAuthorizationRequestRepository))
                        .userInfoEndpoint()
                        .userService(customOAuth2UserService)
                        .and()
                        .successHandler(customAuthenticationSuccessHandler)
                        .failureHandler(customAuthenticationFailureHandler));


        http.authorizeRequests(request ->
                request
                        .requestMatchers(CorsUtils::isPreFlightRequest).permitAll() // << ??
                        .antMatchers("/oauth2/login/**").permitAll()
                        .anyRequest().authenticated());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.addAllowedOrigin("http://localhost:3000");
        corsConfiguration.addAllowedOrigin("http://localhost:8080");
        corsConfiguration.addAllowedOrigin("https://k8a207.p.ssafy.io");

        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }
}
