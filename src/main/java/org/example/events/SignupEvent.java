package org.example.events;

import org.example.models.User;
import org.springframework.context.ApplicationEvent;

public class SignupEvent extends ApplicationEvent {
    private User user;

    public SignupEvent(Object source, User user) {
        super(source);

        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
