package com.zju.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


public class Summary {
    @JsonProperty("summary")
    private DatabaseSummary databaseSummary;

    private Detail detail;

    public Summary(int[] years,
                   BasicInfo basicInfo,
                   DatabaseSummary databaseSummary,
                   List<PortSummaryByYear> portSummaryByYear,
                   List<RouteSummaryByYear> routeSummaryByYear,
                   List<CompanySummaryByYear> companySummaryByYear) {

        this.databaseSummary = databaseSummary;
        detail = new Detail(years, basicInfo, portSummaryByYear, routeSummaryByYear, companySummaryByYear);
    }


    public DatabaseSummary getDatabaseSummary() {
        return databaseSummary;
    }

    public Detail getDetail() {
        return detail;
    }

    public static class Detail {
        @JsonProperty("port")
        private List<PortSummary> portSummary;

        @JsonProperty("line")
        private List<RouteSummary> routeSummary;

        @JsonProperty("company")
        private List<CompanySummary> companySummary;

        @JsonIgnore
        private int[] years;

        @JsonIgnore
        private BasicInfo basicInfo;


        Detail(int[] years, BasicInfo basicInfo, List<PortSummaryByYear> portSummaryByYear,
               List<RouteSummaryByYear> routeSummaryByYear,
               List<CompanySummaryByYear> companySummaryByYear) {

            this.basicInfo = basicInfo;
            this.years = years;
            this.portSummary = genPortSummary(portSummaryByYear);
            this.routeSummary = genRouteSummary(routeSummaryByYear);
            this.companySummary = genCompanySummary(companySummaryByYear);
        }

        public List<PortSummary> getPortSummary() {
            return portSummary;
        }

        public void setPortSummary(List<PortSummary> portSummary) {
            this.portSummary = portSummary;
        }

        public List<RouteSummary> getRouteSummary() {
            return routeSummary;
        }

        public void setRouteSummary(List<RouteSummary> routeSummary) {
            this.routeSummary = routeSummary;
        }

        public List<CompanySummary> getCompanySummary() {
            return companySummary;
        }

        public void setCompanySummary(List<CompanySummary> companySummary) {
            this.companySummary = companySummary;
        }

        private List<RouteSummary> genRouteSummary(List<RouteSummaryByYear> routeSummaryByYear) {

            HashMap<Integer, List<RouteSummaryByYear>> map = new HashMap<>();

            for (RouteSummaryByYear summaryByYear : routeSummaryByYear) {
                List<RouteSummaryByYear> years = map.computeIfAbsent(summaryByYear.getRouteKey(), k -> new ArrayList<>());
                years.add(summaryByYear);
            }

            List<RouteSummary> routeSummaryList = new ArrayList<>(map.size());
            map.forEach((k, v) -> routeSummaryList.add(new RouteSummary(years, basicInfo, v)));

            return routeSummaryList;
        }

        private List<PortSummary> genPortSummary(List<PortSummaryByYear> portSummaryByYear) {

            HashMap<Integer, List<PortSummaryByYear>> map = new HashMap<>();

            for (PortSummaryByYear summaryByYear : portSummaryByYear) {
                List<PortSummaryByYear> years = map.computeIfAbsent(summaryByYear.getPortKey(), k -> new ArrayList<>());
                years.add(summaryByYear);
            }

            List<PortSummary> portSummaryList = new ArrayList<>(map.size());
            map.forEach((k, v) -> portSummaryList.add(new PortSummary(years, basicInfo, v)));

            return portSummaryList;
        }

        private List<CompanySummary> genCompanySummary(List<CompanySummaryByYear> companySummaryByYear) {

            HashMap<Integer, List<CompanySummaryByYear>> map = new HashMap<>();

            for (CompanySummaryByYear summaryByYear : companySummaryByYear) {
                List<CompanySummaryByYear> years = map.computeIfAbsent(summaryByYear.getCompanyKey(), k -> new ArrayList<>());
                years.add(summaryByYear);
            }

            List<CompanySummary> companySummaryList = new ArrayList<>(map.size());
            map.forEach((k, v) -> companySummaryList.add(new CompanySummary(years, basicInfo, v)));

            return companySummaryList;
        }

    }

    public static class RouteSummary {

        @JsonProperty("route_id")
        private int routeKey;

        @JsonProperty("totalCompany")
        private int companyCount;

        @JsonProperty("totalPort")
        private int portCount;

        @JsonProperty("totalPrice")
        private int quotationCount;

        @JsonProperty("route_name")
        private String routeName;

        private HashMap<Integer, RouteSummaryByYear> year;

        RouteSummary(int[] years, BasicInfo basicInfo, List<RouteSummaryByYear> summaryByYear) {
            year = new HashMap<>(years.length);
            for (Integer y : years) {
                year.put(y, new RouteSummaryByYear());
            }

            routeKey = summaryByYear.get(0).getRouteKey();
            routeName = basicInfo.getLine().get(routeKey);

            for (RouteSummaryByYear summary : summaryByYear) {
                companyCount += summary.getCompanyCount();
                portCount += summary.getPortCount();
                quotationCount += summary.getQuotationCount();

                year.put(summary.getYear(), summary);
            }
        }

        public int getRouteKey() {
            return routeKey;
        }

        public int getCompanyCount() {
            return companyCount;
        }

        public int getPortCount() {
            return portCount;
        }

        public int getQuotationCount() {
            return quotationCount;
        }

        public HashMap<Integer, RouteSummaryByYear> getYear() {
            return year;
        }

        public String getRouteName() {
            return routeName;
        }
    }

    public static class PortSummary {
        @JsonProperty("discharging_port_id")
        private int portKey;

        @JsonProperty("totalCompany")
        private int companyCount;

        @JsonProperty("totalLine")
        private int routeCount;

        @JsonProperty("totalPrice")
        private int quotationCount;

        @JsonProperty("port_name")
        private String portName;

        private HashMap<Integer, PortSummaryByYear> year;

        PortSummary(int[] years, BasicInfo basicInfo, List<PortSummaryByYear> summaryByYear) {

            year = new HashMap<>(years.length);
            for (Integer y : years) {
                year.put(y, new PortSummaryByYear());
            }

            portKey = summaryByYear.get(0).getPortKey();
            portName = basicInfo.getPort().get(portKey);


            for (PortSummaryByYear summary : summaryByYear) {
                companyCount += summary.getCompanyCount();
                routeCount += summary.getRouteCount();
                quotationCount += summary.getQuotationCount();

                year.put(summary.getYear(), summary);
            }
        }

        public int getPortKey() {
            return portKey;
        }

        public int getCompanyCount() {
            return companyCount;
        }

        public int getRouteCount() {
            return routeCount;
        }

        public int getQuotationCount() {
            return quotationCount;
        }

        public HashMap<Integer, PortSummaryByYear> getYear() {
            return year;
        }

        public String getPortName() {
            return portName;
        }
    }

    public static class CompanySummary {
        @JsonProperty("company_id")
        private int companyKey;

        @JsonProperty("totalPort")
        private int portCount;

        @JsonProperty("totalLine")
        private int routeCount;

        @JsonProperty("totalPrice")
        private int quotationCount;

        @JsonProperty("company_name")
        private String companyName;

        private HashMap<Integer, CompanySummaryByYear> year;

        CompanySummary(int[] years, BasicInfo basicInfo, List<CompanySummaryByYear> summaryByYear) {
            year = new HashMap<>(years.length);
            for (Integer y : years) {
                year.put(y, new CompanySummaryByYear());
            }

            companyKey = summaryByYear.get(0).getCompanyKey();
            companyName = basicInfo.getCompany().get(companyKey);

            for (CompanySummaryByYear summary : summaryByYear) {
                portCount += summary.getPortCount();
                routeCount += summary.getRouteCount();
                quotationCount += summary.getQuotationCount();

                year.put(summary.getYear(), summary);
            }
        }

        public int getCompanyKey() {
            return companyKey;
        }

        public int getPortCount() {
            return portCount;
        }

        public int getRouteCount() {
            return routeCount;
        }

        public int getQuotationCount() {
            return quotationCount;
        }

        public HashMap<Integer, CompanySummaryByYear> getYear() {
            return year;
        }

        public String getCompanyName() {
            return companyName;
        }
    }

    public static class CompanySummaryByYear {
        @JsonIgnore
        private int companyKey;

        @JsonIgnore
        private int year;

        @JsonProperty("port")
        private int portCount;

        @JsonProperty("line")
        private int routeCount;

        @JsonProperty("price")
        private int quotationCount;


        public int getYear() {
            return year;
        }

        public void setYear(int year) {
            this.year = year;
        }

        public int getCompanyKey() {
            return companyKey;
        }

        public void setCompanyKey(int companyKey) {
            this.companyKey = companyKey;
        }

        public int getPortCount() {
            return portCount;
        }

        public void setPortCount(int portCount) {
            this.portCount = portCount;
        }

        public int getRouteCount() {
            return routeCount;
        }

        public void setRouteCount(int routeCount) {
            this.routeCount = routeCount;
        }

        public int getQuotationCount() {
            return quotationCount;
        }

        public void setQuotationCount(int quotationCount) {
            this.quotationCount = quotationCount;
        }
    }

    public static class PortSummaryByYear {
        @JsonIgnore
        private int portKey;

        @JsonIgnore
        private int year;

        @JsonProperty("company")
        private int companyCount;

        @JsonProperty("line")
        private int routeCount;

        @JsonProperty("price")
        private int quotationCount;

        public int getYear() {
            return year;
        }

        public void setYear(int year) {
            this.year = year;
        }

        public int getPortKey() {
            return portKey;
        }

        public void setPortKey(int portKey) {
            this.portKey = portKey;
        }

        public int getCompanyCount() {
            return companyCount;
        }

        public void setCompanyCount(int companyCount) {
            this.companyCount = companyCount;
        }

        public int getRouteCount() {
            return routeCount;
        }

        public void setRouteCount(int routeCount) {
            this.routeCount = routeCount;
        }

        public int getQuotationCount() {
            return quotationCount;
        }

        public void setQuotationCount(int quotationCount) {
            this.quotationCount = quotationCount;
        }
    }

    public static class RouteSummaryByYear {
        @JsonIgnore
        private int routeKey;

        @JsonIgnore
        private int year;

        @JsonProperty("company")
        private int companyCount;

        @JsonProperty("port")
        private int portCount;

        @JsonProperty("price")
        private int quotationCount;

        public int getYear() {
            return year;
        }

        public void setYear(int year) {
            this.year = year;
        }

        public int getRouteKey() {
            return routeKey;
        }

        public void setRouteKey(int routeKey) {
            this.routeKey = routeKey;
        }

        public int getCompanyCount() {
            return companyCount;
        }

        public void setCompanyCount(int companyCount) {
            this.companyCount = companyCount;
        }

        public int getPortCount() {
            return portCount;
        }

        public void setPortCount(int portCount) {
            this.portCount = portCount;
        }

        public int getQuotationCount() {
            return quotationCount;
        }

        public void setQuotationCount(int quotationCount) {
            this.quotationCount = quotationCount;
        }
    }

    public static class DatabaseSummary {
        @JsonProperty("totalPort")
        private int portCount;

        @JsonProperty("totalLine")
        private int routeCount;

        @JsonProperty("totalCompany")
        private int companyCount;

        @JsonProperty("totalPrice")
        private int quotationCount;

        @JsonProperty("timeLineStart")
        private String earliestDate;

        @JsonProperty("timeLineEnd")
        private String latestDate;

        public int getPortCount() {
            return portCount;
        }

        public void setPortCount(int portCount) {
            this.portCount = portCount;
        }

        public int getRouteCount() {
            return routeCount;
        }

        public void setRouteCount(int routeCount) {
            this.routeCount = routeCount;
        }

        public int getCompanyCount() {
            return companyCount;
        }

        public void setCompanyCount(int companyCount) {
            this.companyCount = companyCount;
        }

        public int getQuotationCount() {
            return quotationCount;
        }

        public void setQuotationCount(int quotationCount) {
            this.quotationCount = quotationCount;
        }

        public String getEarliestDate() {
            return earliestDate;
        }

        public void setEarliestDate(String earliestDate) {
            this.earliestDate = earliestDate;
        }

        public String getLatestDate() {
            return latestDate;
        }

        public void setLatestDate(String latestDate) {
            this.latestDate = latestDate;
        }
    }
}
