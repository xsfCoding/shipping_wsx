package com.zju.model;

public class Port {

    private int portKey;
    private int portId;
    private String name;
    private String nameCN;
    private String nameEN;
    private double longitude;
    private double latitude;
    private String country;
    private String countryCN;
    private String countryEN;

    public int getPortKey() {
        return portKey;
    }

    public void setPortKey(int portKey) {
        this.portKey = portKey;
    }

    public int getPortId() {
        return portId;
    }

    public void setPortId(int portId) {
        this.portId = portId;
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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCountryCN() {
        return countryCN;
    }

    public void setCountryCN(String countryCN) {
        this.countryCN = countryCN;
    }

    public String getCountryEN() {
        return countryEN;
    }

    public void setCountryEN(String countryEN) {
        this.countryEN = countryEN;
    }

    @Override
    public String toString() {
        return "Port{" +
                "portKey=" + portKey +
                ", portId=" + portId +
                ", name='" + name + '\'' +
                ", nameCN='" + nameCN + '\'' +
                ", nameEN='" + nameEN + '\'' +
                ", longitude=" + longitude +
                ", latitude=" + latitude +
                ", country='" + country + '\'' +
                ", countryCN='" + countryCN + '\'' +
                ", countryEN='" + countryEN + '\'' +
                '}';
    }
}
