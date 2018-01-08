$(function () {
    $("[data-toggle='tooltip']").tooltip();
});

//添加人：周思硕
//添加时间：2016年11月1日21:53:20
function getPortData() {
    // LoadingMask.showloaddiv();
    $.ajax({
        url: '/BasicInfoController/getBasicInfo',
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            // LoadingMask.hideloaddiv();
            commont = data;
            portData = data;
            $('#portStartName').append("<option value=" + 0 + ">" + "未选择</option>");
            $('#portStartName').append("<option value=" + 1427 + ">" + "宁波</option>");
            $('#portEndName').append("<option value=" + 0 + ">" + "未选择</option>");
            var portData = [];
            for (var i in data.port) {
                var portt = {
                    id: i,
                    name: data.port[i]
                };
                portData.push(portt);
            }
            portData.sort(compareAsc('name'));
            for (var i = 0; i < portData.length; i++) {
                $('#portEndName').append("<option value=" + portData[i].id + ">" + portData[i].name + "</option>");
            }
            $('#portEndName').selectpicker('refresh');
            $('#portStartName').selectpicker('refresh');
        }
    });
}

function getPortPriceData() {
    var startingPortKey = $("#portStartName").val();
    var destinationPortKey = $("#portEndName").val();
    var fromDate = $("#timeStart").val();
    var toDate = $("#timeEnd").val();
    var priceType = $("#priceType").val();

    var params = {
        startingPortKey: startingPortKey,
        destinationPortKey: destinationPortKey,
        fromDate: fromDate,
        toDate: toDate,
        priceType: priceType
    };

    if (startingPortKey && destinationPortKey && priceType && fromDate && toDate) {
        // LoadingMask.showloaddiv();
        $.ajax({
            url: '/PortController/port_compare',
            type: "GET",
            data: params,
            success: function (data) {
                // LoadingMask.hideloaddiv();

                var lastStart = ProcessMap.processLastStart(data.currentDay, 0);
                var lastEnd = ProcessMap.processLastStart(data.currentDay, 1);
                initLastStartData('LastStart', lastStart);
                initLastStartData('LastEnd', lastEnd);

                initMonthlyCompanyPriceOfPort(data.priceCompare, params.priceType);

                var processLastCompanyPriceOfPort = ProcessMap.processLastCompanyPriceOfPort1(data.currentDay);
                initLastCompanyPriceOfPort('barChart', processLastCompanyPriceOfPort);
                document.getElementById('new').innerHTML = data.newestTime + '所有船公司最新报价';

                var processSailingDateOfPort = ProcessMap.processSailingDate(data);
                initSailingDateOfPort('heatmapChart', processSailingDateOfPort);
            }
        });

        $.ajax({
            url: '/quatationController/getPrice_tender',
            type: "GET",
            data: params,
            success: function (data) {
                LoadingMask.hideloaddiv();
                var processCompanyPriceOfPort = ProcessMap.processCompanyPriceOfPort(data, priceType);
                initCompanyPriceOfPort('lineChart', processCompanyPriceOfPort);

                // LoadingMask.hideloaddiv();
            }
        });

    }
    else {
        alert("请输入完整的查询条件！");
    }


}

function initCompanyPriceOfPort(id, data) {
    var myChart1 = echarts.init(document.getElementById(id), 'vintage');
    var option1 = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                if (params.length == 0) {
                    return 0;
                }
                var out = params[0].name + "报价：" + '</br>';
                for (var i = 0; i < params.length; i++) {
                    if (params[i].data == null) {
                        continue;
                    }
                    out = out + params[i].seriesName + ' : $' + params[i].data + '</br>'
                }
                return out;
            }
        },
        legend: {
            data: data.legend
        },
        calculable: true,
        dataZoom: {
            show: true,
            realtime: true,
            start: 20,
            end: 80
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                name: '时间',
                boundaryGap: false,
                data: data.time
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '价格',
                scale: 'true'
            }
        ],
        series: data.series
    };
    myChart1.setOption(option1);
}

function initLastCompanyPriceOfPort(id, data) {
    var myChart2 = echarts.init(document.getElementById(id), 'vintage');
    var option2 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
                if (params.length == 0) {
                    return 0;
                } else if (params[0].data == undefined) {
                    return 0;
                }
                var out = params[0].name + "报价：" + '</br>';
                for (var i = 0; i < params.length; i++) {
                    out = out + params[i].seriesName + ' : $' + params[i].data + '</br>'
                }
                return out;
            }
        },
        legend: {
            data: data.legend
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                name: '公司',
                data: data.xAxis
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '价格',
                scale: 'true'
            }
        ],

        series: data.series
    };
    myChart2.setOption(option2);
}

function initLastStartData(id, realdata) {
    var myChart3 = echarts.init(document.getElementById(id), 'vintage');
    var company = realdata.company;
    var day = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

    var data = realdata.series;

    var option3 = {
        tooltip: {
            position: 'top',
            formatter: function (params) {
                var out = '船期：' + '</br>';
                if (params.data[2] == 0) {
                    return;
                }
                if (realdata.type == 0) {
                    switch (params.data[1]) {
                        case 0:
                            out = out + '周一开船，频次' + params.data[2];
                            break;
                        case 1:
                            out = out + '周二开船，频次' + params.data[2];
                            break;
                        case 2:
                            out = out + '周三开船，频次' + params.data[2];
                            break;
                        case 3:
                            out = out + '周四开船，频次' + params.data[2];
                            break;
                        case 4:
                            out = out + '周五开船，频次' + params.data[2];
                            break;
                        case 5:
                            out = out + '周六开船，频次' + params.data[2];
                            break;
                        case 6:
                            out = out + '周日开船，频次' + params.data[2];
                            break;
                    }
                } else {
                    switch (params.data[1]) {
                        case 0:
                            out = out + '周一截关，频次' + params.data[2];
                            break;
                        case 1:
                            out = out + '周二截关，频次' + params.data[2];
                            break;
                        case 2:
                            out = out + '周三截关，频次' + params.data[2];
                            break;
                        case 3:
                            out = out + '周四截关，频次' + params.data[2];
                            break;
                        case 4:
                            out = out + '周五截关，频次' + params.data[2];
                            break;
                        case 5:
                            out = out + '周六截关，频次' + params.data[2];
                            break;
                        case 6:
                            out = out + '周日截关，频次' + params.data[2];
                            break;
                    }
                }
                return out;
            }
        },
        animation: false,
        grid: {
            height: '60%',
            y: '10%'
        },
        xAxis: {
            type: 'category',
            data: company,
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: day,
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: 0,
            max: 5,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%'
        },
        series: [{
            name: '船期',
            type: 'heatmap',
            data: data,
            label: {
                normal: {
                    show: true
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 255, 0.5)'
                }
            }
        }]
    };
    myChart3.setOption(option3);
}

function initSailingDateOfPort(id, realdata) {
    var myChart3 = echarts.init(document.getElementById(id), 'vintage');
    var company = realdata.company;
    var day = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

    var data = realdata.series;

    var option3 = {
        tooltip: {
            position: 'top',
            formatter: function (params) {
                var out = params.name + '：' + '</br>';
                if (params.data[2] == 0) {
                    return;
                }
                switch (params.data[1]) {
                    case 0:
                        out = out + '周一开船，频次' + params.data[2];
                        break;
                    case 1:
                        out = out + '周二开船，频次' + params.data[2];
                        break;
                    case 2:
                        out = out + '周三开船，频次' + params.data[2];
                        break;
                    case 3:
                        out = out + '周四开船，频次' + params.data[2];
                        break;
                    case 4:
                        out = out + '周五开船，频次' + params.data[2];
                        break;
                    case 5:
                        out = out + '周六开船，频次' + params.data[2];
                        break;
                    case 6:
                        out = out + '周日开船，频次' + params.data[2];
                        break;
                }
                return out;
            }
        },
        animation: false,
        grid: {
            height: '60%',
            y: '10%'
        },
        xAxis: {
            type: 'category',
            data: company,
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: day,
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%'
        },
        series: [{
            name: '船期',
            type: 'heatmap',
            data: data,
            label: {
                normal: {
                    show: true
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 255, 0.5)'
                }
            }
        }]
    };
    myChart3.setOption(option3);
}

function initMonthlyCompanyPriceOfPort(d, type) {
    var myChart2 = echarts.init(document.getElementById('lineChart1'), 'vintage');
    var data = ProcessMap.processMonthlyCompanyPriceOfPort(d, type);

    var option2 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
                if (params.length == 0) {
                    return 0;
                }
                var out = params[0].name + "报价：" + '</br>';
                for (var i = 0; i < params.length; i++) {
                    out = out + params[i].seriesName + ': $' + params[i].data + '</br>'
                }
                return out;
            }
        },
        legend: {
            data: data.legend
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                name: '月份',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '价格',
                scale: 'true'
            }
        ],

        series: data.series
    };
    myChart2.setOption(option2);
}


