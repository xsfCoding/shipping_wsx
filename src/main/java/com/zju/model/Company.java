package com.zju.model;

public class Company {

    private int companyKey;
    private int companyId;
    private String name;
    private String nameCN;
    private String nameEN;

    public int getCompanyKey() {
        return companyKey;
    }

    public void setCompanyKey(int companyKey) {
        this.companyKey = companyKey;
    }

    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
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
        return "Company{" +
                "companyKey=" + companyKey +
                ", companyId=" + companyId +
                ", name='" + name + '\'' +
                ", nameCN='" + nameCN + '\'' +
                ", nameEN='" + nameEN + '\'' +
                '}';
    }
}
