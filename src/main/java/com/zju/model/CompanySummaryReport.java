package com.zju.model;

public class CompanySummaryReport {

    private int companyKey;
    private String companyName;
    private int quotationCount;
    private int routeCount;
    private int portCount;


    public int getCompanyKey() {
        return companyKey;
    }

    public void setCompanyKey(int companyKey) {
        this.companyKey = companyKey;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public int getQuotationCount() {
        return quotationCount;
    }

    public void setQuotationCount(int quotationCount) {
        this.quotationCount = quotationCount;
    }

    public int getRouteCount() {
        return routeCount;
    }

    public void setRouteCount(int routeCount) {
        this.routeCount = routeCount;
    }

    public int getPortCount() {
        return portCount;
    }

    public void setPortCount(int portCount) {
        this.portCount = portCount;
    }
}
