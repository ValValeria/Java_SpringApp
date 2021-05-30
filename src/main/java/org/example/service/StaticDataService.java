package org.example.service;

import org.example.dao.IStaticInfoDao;
import org.example.dao.StaticInfoDao;
import org.example.models.StaticInfo;
import org.hibernate.Criteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;


@Component("staticData")
@Transactional
public class StaticDataService implements IStaticInfoDao {
    private StaticInfoDao staticInfoDao;

    @Inject
    StaticDataService(StaticInfoDao staticInfoDao){
        this.staticInfoDao = staticInfoDao;
    }

    @Override
    public void addStatics(StaticInfo staticInfo) {
        this.staticInfoDao.addStatics(staticInfo);
    }

    @Override
    public List<StaticInfo> viewStatics() {
        return this.staticInfoDao.viewStatics();
    }

    @Override
    public StaticInfo viewLastStatic(String time) {
        return this.staticInfoDao.viewLastStatic(time);
    }

    @Override
    public void updateStatic(StaticInfo staticInfo) {
        this.staticInfoDao.updateStatic(staticInfo);
    }
}