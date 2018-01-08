package com.zju.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.zju.typehandler.DoubleToStringSerializer;

public class PortQuotationAnnuallyAVGAndIncreasingRate {
    private int portKey;
    private String portName;

    @JsonSerialize(using = DoubleToStringSerializer.class)
    private double price20;

    @JsonSerialize(using = DoubleToStringSerializer.class)
    private double price40;

    @JsonSerialize(using = DoubleToStringSerializer.class)
    private double price40h;

    @JsonSerialize(using = DoubleToStringSerializer.class)
    private double rate20;

    @JsonSerialize(using = DoubleToStringSerializer.class)
    private double rate40;

    @JsonSerialize(using = DoubleToStringSerializer.class)
    private double rate40h;

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

    public double getRate20() {
        return rate20;
    }

    public void setRate20(double rate20) {
        this.rate20 = rate20;
    }

    public double getRate40() {
        return rate40;
    }

    public void setRate40(double rate40) {
        this.rate40 = rate40;
    }

    public double getRate40h() {
        return rate40h;
    }

    public void setRate40h(double rate40h) {
        this.rate40h = rate40h;
    }
}
