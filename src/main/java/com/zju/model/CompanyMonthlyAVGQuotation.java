package com.zju.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.zju.typehandler.DoubleToStringSerializer;

public class CompanyMonthlyAVGQuotation {

    private int companyKey;
    private String companyName;
    private int month;

    @JsonSerialize(using=DoubleToStringSerializer.class)
    private double price;


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

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
