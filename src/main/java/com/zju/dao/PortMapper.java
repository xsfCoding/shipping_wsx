package com.zju.dao;

import com.zju.model.CountryPorts;
import com.zju.model.Port;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PortMapper {

    List<Port> selectAllNames();

    List<CountryPorts> groupByCountry();
}
