package org.example.dao;

import org.example.models.User;

public interface IUserDao {
    User findUser(String email, String password);
}
