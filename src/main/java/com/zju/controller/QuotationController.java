package com.zju.controller;

import java.text.SimpleDateFormat;
import java.util.*;

import com.zju.dao.CompanyDailyReportMapper;
import com.zju.dao.DatabaseDailyReportMapper;
import com.zju.dao.QuotationMapper;
import com.zju.dao.VoyageMonthlyReportMapper;
import com.zju.model.*;
import com.zju.pojo.Summary;
import com.zju.pojo.UpdateInfo;
import com.zju.service.BasicInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/quatationController")
public class QuotationController {
    private final QuotationMapper quotationMapper;

    private final VoyageMonthlyReportMapper voyageMonthlyReportMapper;

    private final CompanyDailyReportMapper companyDailyReportMapper;

    private final BasicInfoService basicInfoService;


    @Autowired
    public QuotationController(QuotationMapper quotationMapper,
                               VoyageMonthlyReportMapper voyageMonthlyReportMapper,
                               CompanyDailyReportMapper companyDailyReportMapper,
                               BasicInfoService basicInfoService) {

        this.quotationMapper = quotationMapper;
        this.voyageMonthlyReportMapper = voyageMonthlyReportMapper;
        this.companyDailyReportMapper = companyDailyReportMapper;
        this.basicInfoService = basicInfoService;
    }

    @RequestMapping("/getPrice_tender")
    @ResponseBody
    public List<CompanyQuoteOnPort> getPrice_tender(
            @RequestParam int startingPortKey,
            @RequestParam int destinationPortKey,
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String priceType) {

        return quotationMapper.selectCompanyQuoteOnPortByVoyageAndDateRange(
                startingPortKey,
                destinationPortKey,
                fromDate,
                toDate,
                priceType);
    }

    @RequestMapping("/getCompanys_ratio_inf")
    @ResponseBody
    public Map<String, Object> getCompanys_ratio_inf(
            @RequestParam int companyA, @RequestParam int companyB) {

        List<HashMap<String, Object>> concreteCompany = new ArrayList<>();
        List<HashMap<String, Object>> data = new ArrayList<>();

        for (int companyKey : new int[]{companyA, companyB}) {

            List<RouteWithCompanyQuotationCount> routeCover =
                    quotationMapper.selectRouteWithQuotationCountByCompany(companyKey);

            List<PortWithCompanyQuotationCount> portCover =
                    quotationMapper.selectDestinationPortWithQuotationCountByCompany(companyKey);

            List<CompanyQuarterAVGQuotation> quoto =
                    voyageMonthlyReportMapper.selectCompanyQuarterAVGQuotation(companyKey);

            HashMap<String, Object> companyInfo = new HashMap<>();
            companyInfo.put("lineCover", routeCover);
            companyInfo.put("portCover", portCover);
            companyInfo.put("shippingCompanyId", companyKey);
            companyInfo.put("shippingCompany", quoto.get(0).getCompanyName());
            companyInfo.put("quoto", quoto);
            concreteCompany.add(companyInfo);


            CompanySummaryReport summaryReport =
                    companyDailyReportMapper.selectCompanySummaryReportByCompany(companyKey);

            Integer[] value = new Integer[]{
                    summaryReport.getQuotationCount(), summaryReport.getRouteCount(), summaryReport.getPortCount()
            };


            HashMap<String, Object> map = new HashMap<>();
            map.put("shippingCompany", summaryReport.getCompanyName());
            map.put("shippingCompanyId", summaryReport.getCompanyKey());
            map.put("value", value);

            data.add(map);
        }


        HashMap<String, Object> json = new HashMap<>();
        json.put("concreteCompany", concreteCompany);

        CompanyReportMax companyReportMax = companyDailyReportMapper.selectCompanyReportMax();
        HashMap[] indicator = new HashMap[3];

        HashMap<String, Object> map = new HashMap<>();
        map.put("max", companyReportMax.getQuotation());
        map.put("text", "报价活跃度");
        indicator[0] = map;

        map = new HashMap<>();
        map.put("max", companyReportMax.getRoute());
        map.put("text", "航线覆盖度");
        indicator[1] = map;

        map = new HashMap<>();
        map.put("max", companyReportMax.getPort());
        map.put("text", "港口覆盖度");
        indicator[2] = map;

        HashMap<String, Object> radar = new HashMap<>();
        radar.put("data", data);
        radar.put("indicator", indicator);
        json.put("radar", radar);
        return json;

    }

    @RequestMapping("/getShippingcompany_information")
    @ResponseBody
    public Map<String, Object> getShippingcompany_information(@RequestParam("id") int id) {

        List<RouteWithCompanyQuotationCount> routeWithCompanyQuotationCounts =
                quotationMapper.selectRouteWithQuotationCountByCompany(id);


        List<PortWithCompanyQuotationCount> portWithCompanyQuotationCounts =
                quotationMapper.selectDestinationPortWithQuotationCountByCompany(id);

        List<Quotation> quotes = quotationMapper.selectQuotationByCompany(id);


        HashMap<String, Object> info = new HashMap<>();

        info.put("detail", quotes);
        info.put("lineCovers", routeWithCompanyQuotationCounts);
        info.put("dischargingports", portWithCompanyQuotationCounts);


        return info;
    }

    @RequestMapping("/summary")
    public Summary getSummary(@RequestParam("startYear") int startYear, @RequestParam("endYear") int endYear) {

        int[] years = new int[endYear - startYear + 1];
        for (int i = 0; i < years.length; i++) {
            years[i] = startYear + i;
        }

        Summary.DatabaseSummary databaseSummary = quotationMapper.selectDatabaseSummary();
        List<Summary.PortSummaryByYear> portSummary = quotationMapper.selectPortSummaryByYearRange(startYear, endYear);
        List<Summary.RouteSummaryByYear> routeSummary = quotationMapper.selectRouteSummaryByYearRange(startYear, endYear);
        List<Summary.CompanySummaryByYear> companySummary = quotationMapper.selectCompanySummaryByYearRange(startYear, endYear);

        return new Summary(years, basicInfoService.getBasicInfo(), databaseSummary, portSummary, routeSummary, companySummary);
    }

    @Autowired
    private DatabaseDailyReportMapper databaseDailyReportMapper;

    @RequestMapping("/update")
    public UpdateInfo getUpdate() {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date today = Calendar.getInstance().getTime();

        final Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, -1);
        Date yesterday = cal.getTime();

        cal.add(Calendar.DATE, -1);
        Date theDayBeforeYesterday = cal.getTime();

        String dateFrom = format.format(theDayBeforeYesterday);
        String dateTo = format.format(yesterday);
        DatabaseUpdateReport updateReport = databaseDailyReportMapper.selectByDateRange(dateFrom, dateTo);

        return new UpdateInfo(updateReport,format.format(yesterday), format.format(today));
    }

}

