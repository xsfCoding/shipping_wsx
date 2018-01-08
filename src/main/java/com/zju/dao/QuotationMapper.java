package com.zju.dao;

import java.util.List;

import com.zju.model.*;
import com.zju.pojo.Summary;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface QuotationMapper {

    DateDimension selectLatestDate();

    List<CompanyQuoteOnPort> selectCompanyQuoteOnPortByVoyageAndDateRange(@Param("startingPortKey") int startingPortKey, @Param("destinationPortKey") int destinationPortKey, @Param("dateFrom") String dateFrom, @Param("dateTo") String dateTo, @Param("priceType") String priceType);

    List<PortQuotationAVGWithCount> selectPortQuotationByStartingPortRouteAndDate(@Param("startingPortKey") int startingPortKey, @Param("routeKey") int routeKey, @Param("latestDateKey") int latestDateKey);

    // TODO quotation表中 加入截关，开船字段，然后直接在数据库中统计。本方法可返回当天的多条记录，
    // TODO 在客户端统计了截关开船日期之和，但只使用了一条记录作为最新报价
    List<CompanySchedule> selectCompanyQuotationByVoyageAndDate(@Param("startingPortKey") int startingPortKey, @Param("destinationPortKey") int destinationPortKey, @Param("latestDateKey") int latestDateKey);


    List<PortWithCompanyQuotationCount> selectDestinationPortWithQuotationCountByCompany(@Param("companyKey") int companyKey);

    List<RouteWithCompanyQuotationCount> selectRouteWithQuotationCountByCompany(@Param("companyKey") int companyKey);

    List<Quotation> selectQuotationByCompany(@Param("companyKey") int companyKey);

    List<RoutePortPair> selectRoutePortPairByYear(@Param("year") int year);


    List<Summary.PortSummaryByYear> selectPortSummaryByYearRange(@Param("startYear") int startYear, @Param("endYear") int endYear);

    List<Summary.RouteSummaryByYear> selectRouteSummaryByYearRange(@Param("startYear") int startYear, @Param("endYear") int endYear);

    List<Summary.CompanySummaryByYear> selectCompanySummaryByYearRange(@Param("startYear") int startYear, @Param("endYear") int endYear);

    Summary.DatabaseSummary selectDatabaseSummary();
}