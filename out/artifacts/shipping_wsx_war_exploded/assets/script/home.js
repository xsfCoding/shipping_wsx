var shipData = null;
var countryData = null;
var route = -1;
function initCharts(route) {
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
        // home +ok
        LoadingMask.showloaddiv();
        $.ajax({
            url: '/PortController/FirstPage_portInf',
            // url: ' data/test2.json',
            type: "GET",
            data: {
                "route": route
            },
            contentType: "application/json",
            success: function (data) {
                LoadingMask.hideloaddiv();
                if (data.whole.length == 0) {
                    alert('未查到相关记录，请重新选择查询条件.');
                } else {
                    shipData = data;
                    changeData(ec, route);
                    lineChart(route, 'route');
                    $('#formModal').modal('hide');
                }

            },
            error: function () {
                LoadingMask.hideloaddiv();
                alert('未查到相关记录，请重新选择查询条件.');
            }
        });
        if (commont == null) {
            LoadingMask.showloaddiv();
            $.ajax({
                url: '/BasicInfoController/getBasicInfo',
                type: "POST",
                contentType: "application/json",
                success: function (data) {
                    LoadingMask.hideloaddiv();
                    commont = data;
                    countryData = data;
                    var lineArray = [];
                    for (var i in data.line) {
                        var line = {
                            id: i,
                            name: data.line[i]
                        };
                        lineArray.push(line);

                    }
                    lineArray.sort(compareAsc('name'));
                    for (var i = 0; i < lineArray.length; i++) {
                        $('#usertype').append(
                            "<option value=" + lineArray[i].id + ">"
                            + lineArray[i].name + "</option>");
                    }
                    $('#usertype').selectpicker('refresh');
                }
            });
        }

    });

}
function initMap(ec, url, title) {
    var myChart = ec.init(document.getElementById('mainMap'));
    myChart.showLoading();
    var ecConfig = require('echarts/config');
    var mapData = ProcessData.processMap(shipData.whole, route);

    if (route == -1)
        titleMap = shipData.newestTime + "港口平均报价展示图";
    else {
        routeCh = countryData.line[route];
        titleMap = shipData.newestTime + routeCh + "航线覆盖港口平均报价展示图";
    }

    var opts = {
        "title": {
            "text": titleMap,
            // "subtext": "",
            // "sublink": "",
            "x": "center",
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
        "roam": {
            focus: "China"
        },
        // "legend": {
        // "data": mapData.legend,
        // "x": "left",
        // "y": "top"
        // },
        "tooltip": { // Option config. Can be overwrited by series or data
            textStyle: {
                color: 'yellow',
                decoration: 'none',
                fontFamily: 'Verdana, sans-serif',
                fontSize: 15,
                fontStyle: 'italic',
                fontWeight: 'bold'
            },
            formatter: function (params) {
                if (params[0] == "") {
                    // 国家
                    return params[1];
                } else {
                    for (var i = 0; i < mapData.tooltip.length; i++) {
                        if (params[1] == mapData.tooltip[i].dischargingPort) {
                            var str = params[1] + "港口最新报价" + '<br/>';
                            str = str + '20规格:$' + mapData.tooltip[i].price20
                                + '<br/>';
                            str = str + '40规格:$' + mapData.tooltip[i].price40
                                + '<br/>';
                            str = str + '40h规格:$' + mapData.tooltip[i].price40h
                                + '<br/>';
                            return str;
                        }
                    }

                }
            }
        },
        // "series": []
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

    var country;
    myChart.on(ecConfig.EVENT.CLICK, function (param) {
        console.log(param.name);
        for (var k in countryName) {
            if (countryName[k] == param.name) {
                country = k;
                break;
            }
        }
        // var helpHtml='<i type="button" class="glyphicon glyphicon-info-sign
        // popover-bottom" data-container="body" '
        // +'data-toggle="popover" data-placement="bottom"
        // data-content="选中国家的所有最新日期港口规格报价。"> </i>';
        // $('#changeHelp').innerHtml=helpHtml;
        mapClick(country);

    });
    // showCountryData(country);
    myChart.setOption(opts);
    myChart.hideLoading();

}

function changeData(ec, route) {
    initMap(ec, 'data/test.json', 'test');
}

function lineChart(index, type) {
    require(['echarts', 'echarts/chart/line', // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
        'echarts/chart/bar'], function (ec) {
        var myChart1 = ec.init(document.getElementById('informa'), 'vintage');

        if (type == 'route') {
            var lineData = ProcessData.processLineChart(shipData.whole);
        } else {
            var lineData = ProcessData.processCountryData(shipData.whole,
                countryData.country, index);
        }

        var option1 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['20规格', '40规格', '40H规格']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: lineData.xAxis
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '20规格',
                type: 'bar',
//				stack : 'price',
                data: lineData.data1
            }, {
                name: '40规格',
                type: 'bar',
//				stack : 'price',
                data: lineData.data2
            }, {
                name: '40H规格',
                type: 'bar',
//				stack : 'price',
                data: lineData.data3
            }]
        };
        myChart1.setOption(option1);
    });
}

function mapClick(country) {
    var lineData = ProcessData.processCountryData(shipData.whole,
        countryData.country, country);

    $('#mytab').bootstrapTable({
        columns: [{
            field: 'dischargingPort',
            title: '目的港',
            sortable: true
        }, {
            field: 'price20',
            title: '20',
            sortable: true
        }, {
            field: 'price40',
            title: '40',
            sortable: true
        }, {
            field: 'price40h',
            title: '40H',
            sortable: true
        }]
    });
    $('#mytab').bootstrapTable('load', lineData.tableData);

    lineChart(country);

    // console.log("showCountryData");

}

/**
 * 选择航线点击确认,根据所选的航线重新请求api加载数据
 */
function searchLine() {
    // 选择的航线是id
    route = $("#usertype").val();
    initCharts(route);
    $('#mytab').html("");
}