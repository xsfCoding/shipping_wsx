package com.zju.model;


import com.fasterxml.jackson.annotation.JsonProperty;

public class DatabaseUpdateReport {

    @JsonProperty("port")
    private int newPortCount;

    @JsonProperty("line")
    private int newRouteCount;

    @JsonProperty("company")
    private int newCompanyCount;

    @JsonProperty("price")
    private int newQuotationCount;

    public int getNewPortCount() {
        return newPortCount;
    }

    public void setNewPortCount(int newPortCount) {
        this.newPortCount = newPortCount;
    }

    public int getNewRouteCount() {
        return newRouteCount;
    }

    public void setNewRouteCount(int newRouteCount) {
        this.newRouteCount = newRouteCount;
    }

    public int getNewCompanyCount() {
        return newCompanyCount;
    }

    public void setNewCompanyCount(int newCompanyCount) {
        this.newCompanyCount = newCompanyCount;
    }

    public int getNewQuotationCount() {
        return newQuotationCount;
    }

    public void setNewQuotationCount(int newQuotationCount) {
        this.newQuotationCount = newQuotationCount;
    }
}
