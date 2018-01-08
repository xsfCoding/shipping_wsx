package com.zju.dao;

import com.zju.model.AnnuallyCount;
import com.zju.model.MonthlyCount;
import com.zju.model.RouteAnnuallyQuotationCount;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RouteDailyReportMapper {

    List<RouteAnnuallyQuotationCount> selectRouteAnnuallyQuotationAmountByYear(@Param("year") int year);

    List<AnnuallyCount> selectRouteAmountOfRecentTwoYears();

    List<MonthlyCount> selectMonthlyQuotationCountByYear(@Param("year") int year);

    AnnuallyCount selectThisYearQuotationCount();
}
