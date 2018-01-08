package com.zju.model;

import java.util.Date;

public class CompanyQuoteOnPort {
    private Date closingTimeEnd;
    private String shippingCompany;
    private int price;

    public Date getClosingTimeEnd() {
        return closingTimeEnd;
    }

    public void setClosingTimeEnd(Date closingTimeEnd) {
        this.closingTimeEnd = closingTimeEnd;
    }

    public String getShippingCompany() {
        return shippingCompany;
    }

    public void setShippingCompany(String shippingCompany) {
        this.shippingCompany = shippingCompany;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
