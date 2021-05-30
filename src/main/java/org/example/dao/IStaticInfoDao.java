package org.example.dao;

import org.example.models.StaticInfo;

import java.util.List;

public interface IStaticInfoDao{
   void addStatics(StaticInfo staticInfo);
   List<StaticInfo> viewStatics();
   StaticInfo viewLastStatic(String time);
   void updateStatic(StaticInfo staticInfo);
}
