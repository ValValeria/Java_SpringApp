package org.example.service;

import org.example.models.User;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import javax.inject.Inject;
import java.util.HashSet;
import java.util.Set;


@Service
public class AuthService implements UserDetailsService {
    private UserService userService;
    private int userId;

    @Inject
    public AuthService(UserService userService){
        this.userService = userService;
    }

    public boolean login(String username, String password){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(16);
        User user = userService.findUserByUsername(username);

        if(user != null && passwordEncoder.matches(password, user.getPassword())) {
            this.userId = user.getId();
            boolean isAuthenticated = SecurityContextHolder.getContext().getAuthentication().isAuthenticated();

            if(!isAuthenticated){
                SecurityContext context = SecurityContextHolder.createEmptyContext();
                Authentication authentication =
                        new TestingAuthenticationToken(username, user.getPassword(), user.getStatus());
                context.setAuthentication(authentication);
                SecurityContextHolder.setContext(context);
            }

            return true;
        }

        return false;
    }

    public int getUserId() {
        return userId;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userService.findUserByUsername(username);
        Set<GrantedAuthority> roles = new HashSet();
        roles.add(new SimpleGrantedAuthority(user.getStatus()));
        
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(), roles
        );

        return userDetails;
    }
}
