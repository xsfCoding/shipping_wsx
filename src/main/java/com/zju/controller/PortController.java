package com.zju.controller;

import java.text.SimpleDateFormat;
import java.util.*;
import com.zju.dao.*;
import com.zju.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/PortController")
public class PortController {


    @Autowired
    private QuotationMapper quotationMapper;

    @Autowired
    private VoyageMonthlyReportMapper voyageMonthlyReportMapper;

    @Autowired
    private CompanyDailyReportMapper companyDailyReportMapper;

    @Autowired
    private RouteDailyReportMapper routeDailyReportMapper;

    @Autowired
    private PortDailyReportMapper portDailyReportMapper;

    /**
     * 港口运力比api
     */
    @ResponseBody
    @RequestMapping("/port_compare")
    public Map<String, Object> portCapacity_compare(
            @RequestParam int startingPortKey,
            @RequestParam int destinationPortKey,
            @RequestParam String fromDate,
            @RequestParam String toDate,
            @RequestParam String priceType
    ) {
        DateDimension date = quotationMapper.selectLatestDate();

        List<CompanySchedule> latestCompanySchedules = quotationMapper.selectCompanyQuotationByVoyageAndDate(
                startingPortKey, destinationPortKey, date.getDateKey()
        );

        List<CompanySetSailDates> companySetSailDates = voyageMonthlyReportMapper.selectCompanySetSailDatesByVoyageAndDateRange(
                startingPortKey, destinationPortKey, fromDate, toDate
        );

        List<CompanyMonthlyAVGQuotation> companyMonthlyAVGQuotations =
                voyageMonthlyReportMapper.selectCompanyMonthlyAVGPriceByVoyageAndDateRange(
                        startingPortKey, destinationPortKey, fromDate, toDate, priceType
                );


        HashMap<String, Double[]> monthPrices = new HashMap<>();
        for (CompanyMonthlyAVGQuotation quotation : companyMonthlyAVGQuotations) {
            Double[] prices = monthPrices.get(quotation.getCompanyName());
            if (prices == null) {
                prices = new Double[12];
                Arrays.fill(prices, 0d);
                monthPrices.put(quotation.getCompanyName(), prices);
            }

            for (int i = 0; i <= 11; i++) {
                if (quotation.getMonth() == i) {
                    prices[i] = quotation.getPrice();
                }
            }
        }

        List<HashMap<String, Object>> priceCompare = new ArrayList<>(monthPrices.size());
        for (Map.Entry<String, Double[]> entry : monthPrices.entrySet()) {
            HashMap<String, Object> map = new HashMap<>();
            map.put("company", entry.getKey());
            map.put("prices", entry.getValue());
            priceCompare.add(map);
        }

        HashMap<String, Object> data = new HashMap<>();

        SimpleDateFormat dataFormat = new SimpleDateFormat("yyyy年MM月dd日");
        data.put("newestTime", dataFormat.format(date.getDate()));
        data.put("currentDay", latestCompanySchedules);
        data.put("priceCompare", priceCompare);
        data.put("setSailDays", companySetSailDates);

        return data;
    }

    @ResponseBody
    @RequestMapping("/FirstPage_portInf")
    public Map<String, Object> getFirstPage_portInf(@RequestParam int route) {
        // TODO 航线列表要剔除当日无报价者

        DateDimension date = quotationMapper.selectLatestDate();

        List<PortQuotationAVGWithCount> ports = quotationMapper.selectPortQuotationByStartingPortRouteAndDate(
                1427, route, date.getDateKey());

        SimpleDateFormat dataFormat = new SimpleDateFormat("yyyy年MM月dd日");

        HashMap<String, Object> map = new HashMap<>();
        map.put("newestTime", dataFormat.format(date.getDate()));
        map.put("whole", ports);

        return map;
    }

    @RequestMapping("/Dashboard")
    public Map<String, Object> getDashboard() {
        HashMap<String, Object> json = new HashMap<>();

        AnnuallyCount thisYearQuotationCount = routeDailyReportMapper.selectThisYearQuotationCount();

        int thisYear = thisYearQuotationCount.getYear();
        int lastYear = thisYear - 1;

        json.put("thisYear", String.format("%d年", thisYear));
        json.put("lastYear", String.format("%d年", lastYear));
        json.put("portSummary", getRoutePorts(thisYear));
        json.put("portSummary_port", getPortPrices(thisYear));
        json.put("upPrice", getUpPrice(thisYear, lastYear));
        json.put("upPort", getUpPort(thisYear, lastYear));
        json.put("upLine", getUpLine(thisYearQuotationCount.getCount()));
        json.put("upCompany", getUpCompany(thisYearQuotationCount.getCount()));

        return json;
    }

    private List<HashMap<Integer, List<RoutePortPair>>> getRoutePorts(int thisYear) {
        List<RoutePortPair> pairs = quotationMapper.selectRoutePortPairByYear(thisYear);


        HashMap<Integer, List<RoutePortPair>> routeMap = new HashMap<>();

        for (RoutePortPair pair : pairs) {
            List<RoutePortPair> ports = routeMap.computeIfAbsent(pair.getRouteKey(), k -> new ArrayList<>());
            ports.add(pair);
        }

        List<HashMap<Integer, List<RoutePortPair>>> list = new ArrayList<>();

        for (Map.Entry<Integer, List<RoutePortPair>> entry : routeMap.entrySet()) {
            HashMap<Integer, List<RoutePortPair>> map = new HashMap<>();
            map.put(entry.getKey(), entry.getValue());
            list.add(map);
        }

        return list;
    }


    private List<HashMap<String, Object>> getPortPrices(int thisYear) {
        List<PortQuotationAnnuallyAVGAndIncreasingRate> portAndRates =
                voyageMonthlyReportMapper.selectPortQuotationAnnuallyIncreasingRateByYear(thisYear);

        List<HashMap<String, Object>> ports = new ArrayList<>(portAndRates.size());

        for (PortQuotationAnnuallyAVGAndIncreasingRate p : portAndRates) {
            HashMap<String, Object> info = new HashMap<>();
            HashMap<String, Object> price = new HashMap<>();

            info.put("cname", p.getPortName());
            info.put("discharging_port_id", p.getPortKey());

            HashMap<String, Object> data = new HashMap<>(2);
            data.put("data", String.valueOf(p.getPrice20()));
            data.put("rate", rateToPercentageString(p.getRate20()));
            price.put("20", data);

            data = new HashMap<>(2);
            data.put("data", String.valueOf(p.getPrice40()));
            data.put("rate", rateToPercentageString(p.getRate40()));
            price.put("40", data);

            data = new HashMap<>(2);
            data.put("data", String.valueOf(p.getPrice40h()));
            data.put("rate", rateToPercentageString(p.getRate40h()));
            price.put("40h", data);

            info.put("price", price);

            ports.add(info);
        }
        return ports;
    }


    private HashMap<String, Object> getUpPort(int thisYear, int lastYear) {
        HashMap<String, Object> upPort = new HashMap<>();

        List<MonthlyCount> thisYearMonthlyCounts =
                portDailyReportMapper.selectPortMonthlyCountByYear(thisYear);
        List<MonthlyCount> lastYearMonthlyCounts =
                portDailyReportMapper.selectPortMonthlyCountByYear(lastYear);

        HashMap<String, Object> detail = new HashMap<>();
        HashMap<Integer, Integer> thisYearMap = new HashMap<>();
        HashMap<Integer, Integer> lastYearMap = new HashMap<>();

        for (int i = 1; i <= 12; i++) {
            thisYearMap.put(i, 0);
            lastYearMap.put(i, 0);
        }

        thisYearMonthlyCounts.forEach(c -> thisYearMap.put(c.getMonth(), c.getCount()));
        lastYearMonthlyCounts.forEach(c -> lastYearMap.put(c.getMonth(), c.getCount()));
        detail.put("thisyear", thisYearMap);
        detail.put("lastyear", lastYearMap);

        upPort.put("detail", detail);

        int thisYearQuotationAmount = thisYearMonthlyCounts.stream().mapToInt(MonthlyCount::getCount).sum();
        int lastYearQuotationAMount = lastYearMonthlyCounts.stream().mapToInt(MonthlyCount::getCount).sum();

        double increasingRate = Math.max(lastYearQuotationAMount, thisYearQuotationAmount) * 1.0d / lastYearQuotationAMount - 1;
        HashMap<String, Object> thisYearSummary = new HashMap<>();
        thisYearSummary.put("rate", rateToPercentageString(increasingRate));
        thisYearSummary.put("sum", thisYearQuotationAmount);
        upPort.put("thisYearSummary", thisYearSummary);

        return upPort;
    }

    private HashMap<String, Object> getUpPrice(int thisYear, int lastYear) {
        HashMap<String, Object> upPrice = new HashMap<>();

        List<MonthlyCount> thisYearMonthlyCounts =
                routeDailyReportMapper.selectMonthlyQuotationCountByYear(thisYear);
        List<MonthlyCount> lastYearMonthlyCounts =
                routeDailyReportMapper.selectMonthlyQuotationCountByYear(lastYear);

        HashMap<String, Object> detail = new HashMap<>();
        HashMap<Integer, Integer> thisYearMap = new HashMap<>();
        HashMap<Integer, Integer> lastYearMap = new HashMap<>();

        for (int i = 1; i <= 12; i++) {
            thisYearMap.put(i, 0);
            lastYearMap.put(i, 0);
        }

        thisYearMonthlyCounts.forEach(c -> thisYearMap.put(c.getMonth(), c.getCount()));
        lastYearMonthlyCounts.forEach(c -> lastYearMap.put(c.getMonth(), c.getCount()));
        detail.put("thisyear", thisYearMap);
        detail.put("lastyear", lastYearMap);

        upPrice.put("detail", detail);

        int thisYearQuotationAmount = thisYearMonthlyCounts.stream().mapToInt(MonthlyCount::getCount).sum();
        int lastYearQuotationAMount = lastYearMonthlyCounts.stream().mapToInt(MonthlyCount::getCount).sum();

        double increasingRate = Math.max(lastYearQuotationAMount, thisYearQuotationAmount) * 1.0d / lastYearQuotationAMount - 1;
        HashMap<String, Object> thisYearSummary = new HashMap<>();
        thisYearSummary.put("rate", rateToPercentageString(increasingRate));
        thisYearSummary.put("sum", thisYearQuotationAmount);
        upPrice.put("thisYearSummary", thisYearSummary);

        return upPrice;
    }

    private HashMap<String, Object> getUpCompany(int thisYearQuotationCount) {
        List<AnnuallyCount> companyAnnuallyCounts = companyDailyReportMapper.selectCompanyAmountOfRecentTwoYears();
        AnnuallyCount thisYear = companyAnnuallyCounts.get(0);
        AnnuallyCount lastYear = companyAnnuallyCounts.get(1);

        List<CompanyAnnuallyQuotationCount> thisYearCompanyTopTen =
                companyDailyReportMapper.selectCompanyAnnuallyTopTenQuotationByYear(thisYear.getYear());

        double increasingRate = Math.max(thisYear.getCount(), lastYear.getCount()) * 1.0d / lastYear.getCount() - 1;


        HashMap<String, Object> upCompany = new HashMap<>();


        HashMap<String, Object> thisYearSummary = new HashMap<>();
        thisYearSummary.put("rate", rateToPercentageString(increasingRate));
        thisYearSummary.put("sum", thisYear.getCount());
        upCompany.put("thisYearSummary", thisYearSummary);


        int topTenSum = thisYearCompanyTopTen.stream().mapToInt(CompanyAnnuallyQuotationCount::getCount).sum();
        int othersSum = thisYearQuotationCount - topTenSum;
        CompanyAnnuallyQuotationCount others = new CompanyAnnuallyQuotationCount();
        others.setCompanyName("其他");
        others.setCount(othersSum);
        thisYearCompanyTopTen.add(others);

        upCompany.put("detail", thisYearCompanyTopTen);

        return upCompany;
    }

    private HashMap<String, Object> getUpLine(int thisYearQuotationCount) {
        List<AnnuallyCount> routeAnnuallyCounts = routeDailyReportMapper.selectRouteAmountOfRecentTwoYears();
        AnnuallyCount thisYear = routeAnnuallyCounts.get(0);
        AnnuallyCount lastYear = routeAnnuallyCounts.get(1);

        List<RouteAnnuallyQuotationCount> thisYearRouteTopTen =
                routeDailyReportMapper.selectRouteAnnuallyQuotationAmountByYear(thisYear.getYear());

        double increasingRate = Math.max(thisYear.getCount(), lastYear.getCount()) * 1.0d / lastYear.getCount() - 1;


        HashMap<String, Object> upLine = new HashMap<>();


        HashMap<String, Object> thisYearSummary = new HashMap<>();
        thisYearSummary.put("rate", rateToPercentageString(increasingRate));
        thisYearSummary.put("sum", thisYear.getCount());
        upLine.put("thisYearSummary", thisYearSummary);

        int topTenSum = thisYearRouteTopTen.stream().mapToInt(RouteAnnuallyQuotationCount::getCount).sum();
        int othersSum = thisYearQuotationCount - topTenSum;
        RouteAnnuallyQuotationCount others = new RouteAnnuallyQuotationCount();
        others.setRouteName("其他");
        others.setCount(othersSum);
        thisYearRouteTopTen.add(others);

        upLine.put("detail", thisYearRouteTopTen);

        return upLine;
    }


    private String rateToPercentageString(double rate) {
        return String.format("%.2f%%", rate * 100);
    }
}
