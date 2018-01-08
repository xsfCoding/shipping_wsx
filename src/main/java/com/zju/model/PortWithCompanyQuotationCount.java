package com.zju.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class PortWithCompanyQuotationCount {

    @JsonProperty("dischargingPortId")
    private int portKey;

    @JsonProperty("dischargingPort")
    private String portName;
    private double longitude;
    private double latitude;

    @JsonIgnore
    private int companyKey;

    @JsonProperty("shippingCompany")
    private String companyName;

    @JsonProperty("num")
    private int quotationCount;

    public int getPortKey() {
        return portKey;
    }

    public void setPortKey(int portKey) {
        this.portKey = portKey;
    }

    public String getPortName() {
        return portName;
    }

    public void setPortName(String portName) {
        this.portName = portName;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
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
