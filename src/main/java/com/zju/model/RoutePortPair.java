package com.zju.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RoutePortPair {

    @JsonProperty("route")
    private int routeKey;

    @JsonProperty("discharging_port_id")
    private int portKey;

    @JsonProperty("cname")
    private String portName;

    private double longitude;
    private double latitude;

    public int getRouteKey() {
        return routeKey;
    }

    public void setRouteKey(int routeKey) {
        this.routeKey = routeKey;
    }

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
}
