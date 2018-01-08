package com.zju.service.impl;

import com.zju.dao.CompanyMapper;
import com.zju.dao.PortMapper;
import com.zju.dao.RouteMapper;
import com.zju.pojo.BasicInfo;
import com.zju.service.BasicInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class BasicInfoServiceImpl implements BasicInfoService {

    private final CompanyMapper companyMapper;
    private final RouteMapper routeMapper;
    private final PortMapper portMapper;

    @Autowired
    public BasicInfoServiceImpl(CompanyMapper companyMapper, RouteMapper routeMapper, PortMapper portMapper) {
        this.companyMapper = companyMapper;
        this.routeMapper = routeMapper;
        this.portMapper = portMapper;
    }


    @Override
    public BasicInfo getBasicInfo() {
        HashMap<Integer,String> portIdNameMap= new HashMap<>();
        HashMap<Integer,String> routeIdNameMap= new HashMap<>();
        HashMap<Integer,String> companyIdNameMap=new HashMap<>();
        HashMap<String,Integer[]> countryNamePortIdsMap=new HashMap<>();

        portMapper.selectAllNames().forEach(port ->
            portIdNameMap.put(port.getPortKey(),port.getName())
        );

        routeMapper.selectAllNames().forEach(route ->
            routeIdNameMap.put(route.getRouteKey(),route.getName())
        );

        companyMapper.selectAllName().forEach(company ->
            companyIdNameMap.put(company.getCompanyKey(),company.getName())
        );

        portMapper.groupByCountry().forEach(countryPorts ->
            countryNamePortIdsMap.put(countryPorts.getCountryName(),countryPorts.getPortKeys())
        );

        BasicInfo basicInfo = new BasicInfo();

        basicInfo.setPort(portIdNameMap);
        basicInfo.setCompany(companyIdNameMap);
        basicInfo.setLine(routeIdNameMap);
        basicInfo.setCountry(countryNamePortIdsMap);

        return basicInfo;
    }
}
