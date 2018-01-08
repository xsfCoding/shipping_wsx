package com.zju.model;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.zju.typehandler.DoubleToStringSerializer;

public class PortQuotationAVGWithCount {
    private String country;

    private String dischargingPort;
    private int dischargingPortId;
    private double lat;
    private double lng;
    private int num;

    @JsonSerialize(using=DoubleToStringSerializer.class)
    private double price20;

    @JsonSerialize(using=DoubleToStringSerializer.class)
    private double price40;

    @JsonSerialize(using=DoubleToStringSerializer.class)
    private double price40h; //TODO 类型转换为double int 等

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getDischargingPort() {
        return dischargingPort;
    }

    public void setDischargingPort(String dischargingPort) {
        this.dischargingPort = dischargingPort;
    }

    public int getDischargingPortId() {
        return dischargingPortId;
    }

    public void setDischargingPortId(int dischargingPortId) {
        this.dischargingPortId = dischargingPortId;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
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
