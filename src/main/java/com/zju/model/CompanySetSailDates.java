package com.zju.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class CompanySetSailDates {

    @JsonIgnore
    private int companyKey;
    private String company;
    private int d1;
    private int d2;
    private int d3;
    private int d4;
    private int d5;
    private int d6;
    private int d7;

    public int getCompanyKey() {
        return companyKey;
    }

    public void setCompanyKey(int companyKey) {
        this.companyKey = companyKey;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public int getD1() {
        return d1;
    }

    public void setD1(int d1) {
        this.d1 = d1;
    }

    public int getD2() {
        return d2;
    }

    public void setD2(int d2) {
        this.d2 = d2;
    }

    public int getD3() {
        return d3;
    }

    public void setD3(int d3) {
        this.d3 = d3;
    }

    public int getD4() {
        return d4;
    }

    public void setD4(int d4) {
        this.d4 = d4;
    }

    public int getD5() {
        return d5;
    }

    public void setD5(int d5) {
        this.d5 = d5;
    }

    public int getD6() {
        return d6;
    }

    public void setD6(int d6) {
        this.d6 = d6;
    }

    public int getD7() {
        return d7;
    }

    public void setD7(int d7) {
        this.d7 = d7;
    }
}
