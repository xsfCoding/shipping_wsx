package com.zju.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RouteWithCompanyQuotationCount {

    @JsonProperty("route")
    private int routeKey;

    private String routeName;

    @JsonIgnore
    private int companyKey;

    @JsonProperty("shippingCompany")
    private String companyName;

    @JsonProperty("num")
    private int quotationCount;

    public int getRouteKey() {
        return routeKey;
    }

    public void setRouteKey(int routeKey) {
        this.routeKey = routeKey;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

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
}
