package com.zju.model;

import java.util.Arrays;
public class CountryPorts {
    private String countryName;
    private Integer[] portKeys;

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public Integer[] getPortKeys() {
        return portKeys;
    }

    public void setPortKeys(Integer[] portKeys) {
        this.portKeys = portKeys;
    }

    @Override
    public String toString() {
        return "CountryPorts{" +
                "countryName='" + countryName + '\'' +
                ", portKeys=" + Arrays.toString(portKeys) +
                '}';
    }
}
