package org.example.config;

import org.example.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final String[] ROLES = new String[]{"admin", "user"};
    AuthService authService;

    @Autowired
    public void registerGlobalAuthentication(AuthenticationManagerBuilder auth, AuthService authService) throws Exception {
        auth.userDetailsService(authService).passwordEncoder(passwordEncoder());

        this.authService = authService;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        super.configure(web);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/public/**", "/upload/**","/api/**", "/**").permitAll()
                .anyRequest().permitAll()
                .and();

        http.authorizeRequests().antMatchers("/admin/**",
                "/public/js/admin.js").hasAnyRole(ROLES);

        http.logout()
                .permitAll()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout")
                .invalidateHttpSession(true);

        http.sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
