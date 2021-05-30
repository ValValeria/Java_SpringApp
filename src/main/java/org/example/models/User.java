package org.example.models;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name="java_user",schema="1oASotOvGd")
public class User {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="email")
    @Min(value=10)
    @Max(value=30)
    @Email(message = "Email is invalid")
    private String email;

    @Column(name="username")
    @Min(value=10)
    @Max(value=30)
    @NotNull
    private String username;

    @Column(name="password")
    @Min(value=5)
    @Max(value=50)
    @NotNull
    private String password;

    @Column(name="status")
    private String status;


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
