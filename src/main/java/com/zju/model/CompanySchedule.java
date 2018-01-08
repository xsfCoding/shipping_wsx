package com.zju.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.zju.typehandler.DoubleToStringSerializer;


public class CompanySchedule {
    @JsonIgnore
    private String companyKey;

    private String companyName;
    private String schedule;

    @JsonSerialize(using=DoubleToStringSerializer.class)
    private double price20;

    @JsonSerialize(using=DoubleToStringSerializer.class)
    private double price40;

    @JsonSerialize(using=DoubleToStringSerializer.class)
    private double price40h;

    public String getCompanyKey() {
        return companyKey;
    }

    public void setCompanyKey(String companyKey) {
        this.companyKey = companyKey;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public double getPrice20() {
        return price20;
    }

    public void setPrice20(double price20) {
        this.price20 = price20;
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
}
