package org.example.listeners;

import org.example.events.SignupEvent;
import org.example.models.User;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class SignUpEventListener implements ApplicationListener<SignupEvent> {
    private final UserService userService;

    @Autowired
    SignUpEventListener(UserService userService){
        this.userService = userService;
    }

    @Override
    public void onApplicationEvent(SignupEvent signupEvent) {
        User user = signupEvent.getUser();
        userService.createUser(user);
    }
}
