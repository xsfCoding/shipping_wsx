package com.zju.model;

public class Route {

    private int routeKey;
    private int routeId;
    private String name;
    private String nameCN;
    private String nameEN;

    public int getRouteKey() {
        return routeKey;
    }

    public void setRouteKey(int routeKey) {
        this.routeKey = routeKey;
    }

    public int getRouteId() {
        return routeId;
    }

    public void setRouteId(int routeId) {
        this.routeId = routeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameCN() {
        return nameCN;
    }

    public void setNameCN(String nameCN) {
        this.nameCN = nameCN;
    }

    public String getNameEN() {
        return nameEN;
    }

    public void setNameEN(String nameEN) {
        this.nameEN = nameEN;
    }

    @Override
    public String toString() {
        return "Route{" +
                "routeKey=" + routeKey +
                ", routeId=" + routeId +
                ", name='" + name + '\'' +
                ", nameCN='" + nameCN + '\'' +
                ", nameEN='" + nameEN + '\'' +
                '}';
    }
}
