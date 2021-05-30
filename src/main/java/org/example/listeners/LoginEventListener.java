package org.example.listeners;

import org.example.events.LoginEvent;
import org.example.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class LoginEventListener implements ApplicationListener<LoginEvent> {

    private final AuthService authService;

    @Autowired
    LoginEventListener(AuthService authService){
        this.authService = authService;
    }

    @Override
    public void onApplicationEvent(LoginEvent loginEvent) {
         this.authService.login(loginEvent.getUsername(),loginEvent.getPassword());
    }
}
