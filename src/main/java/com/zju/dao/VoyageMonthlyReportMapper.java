package com.zju.dao;

import com.zju.model.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface VoyageMonthlyReportMapper {

    List<CompanySetSailDates> selectCompanySetSailDatesByVoyageAndDateRange(@Param("startingPortKey") int startingPortKey, @Param("destinationPortKey") int destinationPortKey, @Param("fromDate") String fromDate, @Param("toDate") String toDate);

    List<CompanyMonthlyAVGQuotation> selectCompanyMonthlyAVGPriceByVoyageAndDateRange(@Param("startingPortKey") int startingPortKey, @Param("destinationPortKey") int destinationPortKey, @Param("fromDate") String fromDate, @Param("toDate") String toDate, @Param("priceType") String priceType);

    List<CompanyQuarterAVGQuotation> selectCompanyQuarterAVGQuotation(@Param("companyKey") int companyKey);

    List<PortQuotationAnnuallyAVGAndIncreasingRate> selectPortQuotationAnnuallyIncreasingRateByYear(@Param("year") int year);

}
