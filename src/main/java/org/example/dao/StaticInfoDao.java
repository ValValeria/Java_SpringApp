package org.example.dao;

import org.example.models.StaticInfo;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class StaticInfoDao implements IStaticInfoDao{
    SessionFactory sessionFactory;

    @Autowired
    StaticInfoDao(SessionFactory sessionFactory){
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void addStatics(StaticInfo staticInfo) {
        Session session = sessionFactory.getCurrentSession();
        session.save(staticInfo);
    }

    @Override
    public List viewStatics() {
        Session session = sessionFactory.getCurrentSession();
        return session.createQuery("from StaticInfo S ORDER BY S.id DESC").list();
    }

    @Override
    public StaticInfo viewLastStatic(String time) {
        Session session = sessionFactory.getCurrentSession();

        Query query = session.createQuery("from StaticInfo S where S.date=:date");
        query.setString("date", time);
        query.setMaxResults(1);

        List<StaticInfo> staticInfo = query.list();

        if(staticInfo.size()>0){
            return staticInfo.get(0);
        }

        return null;
    }


    @Override
    public void updateStatic(StaticInfo staticInfo) {
        Session session = sessionFactory.getCurrentSession();
        session.update(staticInfo);
    }
}
