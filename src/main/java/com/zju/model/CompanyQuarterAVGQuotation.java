package com.zju.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.zju.typehandler.DoubleToStringSerializer;

public class CompanyQuarterAVGQuotation {

    @JsonIgnore
    private int companyKey;

    @JsonProperty("shippingCompany")
    private String companyName;

    @JsonProperty("type")
    private int quarter;

    @JsonProperty("num")
    private int count;

    @JsonSerialize(using = DoubleToStringSerializer.class)
    private double price20;

    @JsonSerialize(using = DoubleToStringSerializer.class)
    private double price20rf;

    @JsonSerialize(using = DoubleToStringSerializer.class)
    private double price40;

    @JsonSerialize(using = DoubleToStringSerializer.class)
    private double price40h;

    @JsonSerialize(using = DoubleToStringSerializer.class)
    private double price40rf;

    @JsonSerialize(using = DoubleToStringSerializer.class)
    private double price45;


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

    public int getQuarter() {
        return quarter;
    }

    public void setQuarter(int quarter) {
        this.quarter = quarter;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public double getPrice20() {
        return price20;
    }

    public void setPrice20(double price20) {
        this.price20 = price20;
    }

    public double getPrice20rf() {
        return price20rf;
    }

    public void setPrice20rf(double price20rf) {
        this.price20rf = price20rf;
    }

    public double getPrice40() {
        return price40;
    }

    public void setPrice40(double price40) {
        this.price40 = price40;
    }

    public double getPrice40h() {
        return price40h;
    }

    public void setPrice40h(double price40h) {
        this.price40h = price40h;
    }

    public double getPrice40rf() {
        return price40rf;
    }

    public void setPrice40rf(double price40rf) {
        this.price40rf = price40rf;
    }

    public double getPrice45() {
        return price45;
    }

    public void setPrice45(double price45) {
        this.price45 = price45;
    }
}
