package org.example.models;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name="java_letters",schema="1oASotOvGd")
public class Letter {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="email")
    @Size(min=10,max=30)
    @Email(message = "Invalid email")
    @NotNull
    private String email;

    @Column(name="username")
    @Size(min=10,max=30)
    @NotNull
    private String username;


    @Column(name="message")
    @Size(min=10,max=30)
    @NotNull
    private String message;

    @Column(name="date")
    @Size(min=10,max=30)
    private String date;

    @Column(name="status")
    @Size(min=3,max=30)
    private String status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
