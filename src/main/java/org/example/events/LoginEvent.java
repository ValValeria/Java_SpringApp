package org.example.events;

import org.springframework.context.ApplicationEvent;


public class LoginEvent extends ApplicationEvent {
    private String username;
    private String password;

    public LoginEvent(Object source, String username, String password) {
        super(source);

        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
