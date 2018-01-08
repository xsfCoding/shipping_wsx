package com.zju.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RouteAnnuallyQuotationCount {

    @JsonIgnore
    private int routeKey;

    @JsonProperty("name")
    private String routeName;

    @JsonProperty("value")
    private int count;

    public int getRouteKey() {
        return routeKey;
    }

    public void setRouteKey(int routeKey) {
        this.routeKey = routeKey;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
