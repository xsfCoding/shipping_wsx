package com.zju.controller;

import com.zju.service.BasicInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zju.pojo.BasicInfo;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/BasicInfoController")
public class BasicInfoController {

    private final BasicInfoService basicInfoService;

    @Autowired
    public BasicInfoController(BasicInfoService basicInfoService) {
        this.basicInfoService = basicInfoService;
    }

    @ResponseBody
    @RequestMapping("/getBasicInfo")
    public BasicInfo getBasicInfo() {
        return basicInfoService.getBasicInfo();





    }

}
