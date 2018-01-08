package com.zju.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CompanyAnnuallyQuotationCount {

    @JsonIgnore
    private int companyKey;

    @JsonProperty("name")
    private String companyName;

    @JsonProperty("value")
    private int count;

    public int getCompanyKey() {
        return companyKey;
    }

    public void setCompanyKey(int companyKey) {
        this.companyKey = companyKey;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
