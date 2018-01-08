package com.zju.pojo;

import java.util.HashMap;

public class BasicInfo {
    private HashMap<Integer, String> port;
    private HashMap<Integer, String> company;
    private HashMap<Integer, String> line;
    private HashMap<String, Integer[]> country;


    public HashMap<Integer, String> getPort() {
        return port;
    }

    public void setPort(HashMap<Integer, String> port) {
        this.port = port;
    }

    public HashMap<Integer, String> getCompany() {
        return company;
    }

    public void setCompany(HashMap<Integer, String> company) {
        this.company = company;
    }

    public HashMap<Integer, String> getLine() {
        return line;
    }

    public void setLine(HashMap<Integer, String> line) {
        this.line = line;
    }

    public HashMap<String, Integer[]> getCountry() {
        return country;
    }

    public void setCountry(HashMap<String, Integer[]> country) {
        this.country = country;
    }
}
