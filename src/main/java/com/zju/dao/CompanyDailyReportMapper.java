package com.zju.dao;

import com.zju.model.AnnuallyCount;
import com.zju.model.CompanyAnnuallyQuotationCount;
import com.zju.model.CompanyReportMax;
import com.zju.model.CompanySummaryReport;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CompanyDailyReportMapper {

    CompanySummaryReport selectCompanySummaryReportByCompany(@Param("companyKey") int companyKey);

    CompanyReportMax selectCompanyReportMax();


    List<CompanyAnnuallyQuotationCount> selectCompanyAnnuallyTopTenQuotationByYear(@Param("year") int year);
    List<AnnuallyCount> selectCompanyAmountOfRecentTwoYears();
}
