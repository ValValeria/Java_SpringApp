package org.example.service;

import org.example.dao.UserDao;
import org.example.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserService {
    private UserDao userDao;

    @Autowired
    UserService(UserDao userDao){
        this.userDao = userDao;
    }

    @Transactional
    @Cacheable("user")
    public User findUser(String username, String password){
        return userDao.findUser(username,password);
    }

    @Transactional
    @Cacheable("user")
    public User findUserByEmail(String email){
        return userDao.findUserByEmail(email);
    }

    @Transactional
    @Cacheable("user")
    public User findUserByUsername(String username){
        return userDao.findUserByUsername(username);
    }

    @Transactional
    public User createUser(User user){
        return userDao.createUser(user);
    }
}
