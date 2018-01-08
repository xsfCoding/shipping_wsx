package com.zju.dao;

import com.zju.model.DatabaseUpdateReport;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Date;

@Mapper
public interface DatabaseDailyReportMapper {

    DatabaseUpdateReport selectByDateRange(@Param("dateFrom") String dateFrom, @Param("dateTo") String dateTo);
}
