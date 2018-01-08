var shipData = null;
var radarData = null;
var ecc;
var tabChosen = 1;
function getCommonData() {
    // LoadingMask.showloaddiv();
    $
        .ajax({
            url: '/BasicInfoController/getBasicInfo',
            type: "POST",
            contentType: "application/json",
            success: function (data) {
                // LoadingMask.hideloaddiv();
                commont = data;
                $('#shipA').append(
                    "<option value=" + 0 + ">" + "-选择船公司-</option>");
                $('#shipB').append(
                    "<option value=" + 0 + ">" + "-选择船公司-</option>");
                var commpany = [];
                for (var i in data.company) {
                    var comm = {
                        id: i,
                        name: data.company[i]
                    }
                    commpany.push(comm);

                }
                commpany.sort(compareAsc('name'));
                for (var i = 0; i < commpany.length; i++) {
                    $('#shipA').append(
                        "<option value=" + commpany[i].id + ">"
                        + commpany[i].name + "</option>");
                    $('#shipB').append(
                        "<option value=" + commpany[i].id + ">"
                        + commpany[i].name + "</option>");

                }
                $('#shipA').selectpicker('refresh');
                $('#shipB').selectpicker('refresh');
            }
        });
}
function initCharts() {
    // 当船公司和规格同时选择后在查询
    // 修改人：周思硕
    // 修改时间：2016年12月12日10:13:37
    var shipA = $("#shipA").val();
    var shipB = $("#shipB").val();
    var type = $("#priceType").val();
    if (shipA == 0) {
        alert("请选择船公司");
        return;
    }
    if (shipB == 0) {
        alert("请选择船公司");
        return;
    }
    if (type == 0) {
        alert("请选择规格");
        return;
    }
    require.config({
        paths: {
            'echarts': 'js/echarts',
            'echarts-x': 'js/echarts-x'

        }
    });
    require(['echarts', 'echarts/chart/line', 'echarts/chart/venn',
        'echarts/chart/radar', 'echarts/chart/bar', 'echarts-x',
        // ECharts-X 中 map3d 的地图绘制基于 ECharts 中的 map。
        'echarts/chart/map', 'echarts-x/chart/map3d'], function (ec) {
        var company = [];
        company.push(shipA);
        company.push(shipB);
        // ['165','158']
        // LoadingMask.showloaddiv();
        $.ajax({
            // url: 'data/ship_data.json',
            url: '/quatationController/getCompanys_ratio_inf',
            type: "GET",
            data: {
                'companyA': shipA,
                'companyB': shipB
            },
            success: function (data) {
                // LoadingMask.hideloaddiv();
                if (data == "") {
                    alert('未查到相关记录，请重新选择查询条件.')
                } else {
                    shipData = data;
                    initRadarChart(ec, 'radarChart');
                    getChart(tabChosen);
                    changeData(ec);
                }

            }
        });

    });

}

function getChart(type) {
    radarData = ProcessShipData.processRadarData(shipData);
    require.config({
        paths: {
            'echarts': 'js/echarts',
            'echarts-x': 'js/echarts-x'

        }
    });
    require(['echarts', 'echarts/chart/line', 'echarts/chart/venn',
        'echarts/chart/radar', 'echarts/chart/bar', 'echarts-x',
        'echarts/chart/map', 'echarts-x/chart/map3d'], function (ec) {
        ecc = ec;
        tabChosen = type;
        switch (type) {
            case 1:
                initPrice(ec, 'chart1');
                tabInfo("t1", radarData, 0);
                break;
            case 2:
                initLine(ec, 'chart1');
                tabInfo("t2", radarData, 1);
                break;
            case 3:
                initPort(ec, 'chart1');
                tabInfo("t3", radarData, 2);
                break;
//		case 4:
//			initChart4(ec, 'chart1');
//			tabInfo("t4", radarData, 3);
//			break;
//		case 5:
//			initChart5(ec, 'chart1');
//			tabInfo("t5", radarData, 4);
//			break;
        }

    });
}

function tabInfo(id, data, num) {
    var ele = document.getElementById(id);

    var tmp1 = data.legend[0] + "公司的" + data.indicator[num].text + "值为"
        + data.series[0].value[num] + ";<br/>" + data.legend[1] + "公司的"
        + data.indicator[num].text + "值为" + data.series[1].value[num];

    var tmp2 = ".<br/>这说明了在最近一段时间内两个船公司在报价活跃度方面存在一定的差异性。";
    var tmp3 = ".<br/>船公司的航船在航行过程中所到达的所有港口数量即为港口覆盖度的值";
    var tmp4 = ".<br/>上述的值代表了该公司在世界范围内所运营的航线数目";

    switch (num) {
        case 0:
            ele.innerHTML = tmp1 + tmp2;
            break;
        case 1:
            ele.innerHTML = tmp1 + tmp3;
            break;
        case 2:
            ele.innerHTML = tmp1 + tmp4;
            break;

    }

}

function initRadarChart(echarts, id) {
    var myChart1 = echarts.init(document.getElementById(id));
    var radarData = ProcessShipData.processRadarData(shipData);
    var option1 = {

        tooltip: {
            trigger: 'axis'
        },
        legend: {
            orient: 'horizontal',
            x: 'left',
            y: 'top',
            data: radarData.legend
        },
        polar: [{
            indicator: radarData.indicator,
            // 通过修改半径来控制雷达图的大小
            // 修改人：周思硕
            // 修改时间：2016年12月12日10:59:18
            radius: 120
        }],
        calculable: true,
        series: [{
            name: '船公司运力指数对比',
            type: 'radar',
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: 'default'
                    }
                }
            },
            data: radarData.series
        }]
    };

    myChart1.setOption(option1);

}
//报价
function initPrice(echarts, id1) {
    var myChart1 = echarts.init(document.getElementById(id1));
    var type = $("#priceType").val();

    var quoto = ProcessShipData.processBaojia(shipData, type);
    // 报价活跃度
    var option1 = {

        tooltip: {
            trigger: 'axis',
            formatter: "{b}</br>{a0}：${c0}</br>{a1}：${c1}"
        },

        legend: {
            data: quoto.legend
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        calculable: true,
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['第一季度', '第二季度', '第三季度', '第四季度']
        },
        yAxis: {
            type: 'value'
        },
        series: quoto.series

    };

    myChart1.setOption(option1);

    var data = quoto.table.data;
    $('#mytab').bootstrapTable('refreshOptions', {
        columns: quoto.table.columns
    });
    $('#mytab').bootstrapTable('load', data);
}
// 航线
function initLine(echarts, id2) {
    var myChart2 = echarts.init(document.getElementById(id2));
    var lineCover = ProcessShipData.processLineCover(shipData);

    // 航线覆盖度
    var option2 = {

        tooltip: {
            trigger: 'item',
            formatter: "{b}公司覆盖航线: {c}条"
        },

        legend: {
            data: lineCover.legend
        },
        calculable: false,
        series: [{
            name: '韦恩图',
            type: 'venn',
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        textStyle: {
                            fontFamily: 'Arial, Verdana, sans-serif',
                            fontSize: 16,
                            fontStyle: 'italic',
                            fontWeight: 'bolder'
                        }
                    },
                    labelLine: {
                        show: false,
                        length: 10,
                        lineStyle: {
                            // color: 各异,
                            width: 1,
                            type: 'solid'
                        }
                    }
                },
                emphasis: {
                    color: '#cc99cc',
                    borderWidth: 3,
                    borderColor: '#996699'
                }
            },
            data: lineCover.chartData
        }]
    };

    myChart2.setOption(option2);
    var data = lineCover.tableData;
    $('#mytab').bootstrapTable('refreshOptions', {
        columns: [{
            field: 'company',
            title: '公司',
            sortable: true
        }, {
            field: 'routeName',
            title: '航线',
            sortable: true
        }, {
            field: 'percent',
            title: '航线覆盖率',
            sortable: true
        }]
    });
    $('#mytab').bootstrapTable('load', data);
}
// 港口
function initPort(echarts, id3) {
    var myChart3 = echarts.init(document.getElementById(id3));
    var portCover = ProcessShipData.processPortCover(shipData);
    //
    var tmp = portCover.geoCoord.substring(0, portCover.geoCoord.length - 1);
    // console.log(tmp);

    var option3 = {

        "tooltip": {
            formatter: function (params) {
                if (params[0] == "") {
                    return params[1];
                } else {
                    for (var i = 0; i < portCover.chartData.length; i++) {
                        if (params[1] == portCover.chartData[i].name) {
                            var str = params[1] + "港口" + '<br/>';
                            str = str + "报价频次：" + portCover.chartData[i].value
                                + "次";
                            return str;
                        }
                    }
                }
            }
        },
        legend: {

            "x": "left",
            "y": "top",
            data: portCover.legend
        },
        dataRange: {
            min: 0,
            max: 3,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            color: ['red', 'yellow', 'lightskyblue']
        },
        series: [{
            // 将name:'port'改为name:'港口'
            // 修改时间：2016年11月27日21:11:40
            name: '港口',
            type: 'map',
            mapType: 'world',
            hoverable: false,
            roam: true,
            data: [],
            markPoint: {
                symbolSize: 5, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                itemStyle: {
                    normal: {
                        borderColor: '#87cefa',
                        borderWidth: 1, // 标注边线线宽，单位px，默认为1
                        label: {
                            show: false
                        }
                    },
                    emphasis: {
                        borderColor: '#1e90ff',
                        borderWidth: 5,
                        label: {
                            show: false
                        }
                    }
                },
                data: portCover.chartData
            },
            geoCoord: JSON.parse("{"
                + portCover.geoCoord.substring(0,
                    portCover.geoCoord.length - 1) + "}")

        }]
    };
    // console.log(portCover.geoCoord);
    myChart3.setOption(option3);

    var data = portCover.tableData;
    // console.log(data);
    $('#mytab').bootstrapTable('refreshOptions', {
        columns: [{
            field: 'company',
            title: '公司',
            sortable: true
        }, {
            field: 'dischargingPort',
            title: '港口',
            sortable: true
        }, {
            field: 'num',
            title: '频次',
            sortable: true
        }]
    });
    $('#mytab').bootstrapTable('load', data);
}

function initMap(ec, url, title) {

    var myChart = ec.init(document.getElementById('mapChart'));
    myChart.showLoading();
    // 获取选中的规格
    // 修改人：周思硕
    // 修改时间：2016年11月27日17:15:50
    var type = $("#priceType").find("option:selected").text();
    var ecConfig = require('echarts/config');
    var mapData = ProcessShipData.processMap(shipData.concreteCompany);
    var opts = {
        "title": {
            "text": "",
            "subtext": "",
            "sublink": "",
            "x": "left",
            "y": "top",
            "textStyle": {
                "color": "black"
            }
        },
        "dataRange": {
            min: 0,
            max: 200,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            color: ['red', 'yellow', 'lightskyblue']
        },
        "legend": {
            "data": mapData.legend,
            "x": "left",
            "y": "top"
        },
        "tooltip": {
            formatter: function (params) {
                if (params[0] == "") {
                    return params[1];
                } else {
                    for (var i = 0; i < mapData.tooltip.length; i++) {
                        if (params[1] == mapData.tooltip[i].dischargingPort) {
                            var str = params[1] + "港口" + '<br/>';
                            str = str + type + '<br/>';
                            str = str + "报价频次：" + mapData.tooltip[i].value
                                + "次";
                            return str;
                        }
                    }
                }
            }
        },
        "series": mapData.series
    };

    opts.series.push({
        name: '世界地图',
        type: "map3d",
        mapType: 'world',
        roam: true,
        selectedMode: 'single',
        itemStyle: {
            normal: {
                label: {
                    show: false
                }
            },
            emphasis: {
                label: {
                    show: true
                }
            }
        },
        data: [],
        // 自定义名称
        nameMap: countryName
    });

    myChart.on(ecConfig.EVENT.CLICK, function (param) {
        // alert("1111");
        // console.log(param.name);
        // console.log(param.value);
        // console.log(param.data);

    });
    myChart.setOption(opts);
    myChart.hideLoading();

}

function changeData(ec) {

    initMap(ec, 'data/test.json', 'test');

}

function update() {
    initCharts();
    initPrice(ecc, 'chart1');
    initLine(ecc, 'chart1');
    initPort(ecc, 'chart1');
}

getCommonData();
