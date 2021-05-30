package org.example.dao;

import org.example.models.User;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;

@Component
public class UserDao implements IUserDao{
    private SessionFactory sessionFactory;

    @Autowired
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public User findUser(String email, String password) {
        Query query = sessionFactory.getCurrentSession().createQuery("from User where email=:email and password=:password");
        query.setString("email",email);
        query.setMaxResults(1);
        query.setString("password",password);
        query.setCacheable(true);
        SortedSet<User> set = new TreeSet<>(query.list());

        if(set.size()>0){
            return set.first();
        }

        return null;
    }

    public User findUserByUsername(String username) {
        Query query = sessionFactory.getCurrentSession().createQuery("from User where username=:username");
        query.setString("username",username);
        query.setMaxResults(1);

        HashSet<User> set = new HashSet<User>(query.list());

        if(set.size()>0){
            return (User) set.toArray()[0];
        }

        return null;
    }

    public User findUserByEmail(String email) {
        Query query = sessionFactory.getCurrentSession().createQuery("from User where email=:email");
        query.setString("email",email);
        query.setMaxResults(1);

        SortedSet<User> set = new TreeSet<>(query.list());

        if(set.size()>0){
            return set.first();
        }

        return null;
    }

    public User createUser(User user){
        Session session = sessionFactory.getCurrentSession();
        session.save(user);
        return user;
    }
}
