package com.zju.dao;

import com.zju.model.MonthlyCount;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PortDailyReportMapper {

    List<MonthlyCount> selectPortMonthlyCountByYear(@Param("year") int year);
}
