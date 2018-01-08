package com.zju.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.zju.typehandler.DoubleToStringSerializer;

import java.util.Date;

/**
 * Created by junjie on 16/03/2017.
 */
public class Quotation {

    private int quotationKey;
    private Date cutoffDate;
    private Date setSailDate;
    private String startingPort;
    private String transitPort;
    private String destinationPort;
    private int duration;

    @JsonSerialize(using=DoubleToStringSerializer.class)
    private double price20;

    @JsonSerialize(using=DoubleToStringSerializer.class)
    private double price40;

    @JsonSerialize(using=DoubleToStringSerializer.class)
    private double price40h;

    public int getQuotationKey() {
        return quotationKey;
    }

    public void setQuotationKey(int quotationKey) {
        this.quotationKey = quotationKey;
    }

    public Date getCutoffDate() {
        return cutoffDate;
    }

    public void setCutoffDate(Date cutoffDate) {
        this.cutoffDate = cutoffDate;
    }

    public Date getSetSailDate() {
        return setSailDate;
    }

    public void setSetSailDate(Date setSailDate) {
        this.setSailDate = setSailDate;
    }

    public String getStartingPort() {
        return startingPort;
    }

    public void setStartingPort(String startingPort) {
        this.startingPort = startingPort;
    }

    public String getTransitPort() {
        return transitPort;
    }

    public void setTransitPort(String transitPort) {
        this.transitPort = transitPort;
    }

    public String getDestinationPort() {
        return destinationPort;
    }

    public void setDestinationPort(String destinationPort) {
        this.destinationPort = destinationPort;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
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
