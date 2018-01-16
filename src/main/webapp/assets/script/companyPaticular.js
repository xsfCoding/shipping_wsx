/**
 * Created by qtt on 16/8/31.
 */
var companyData = null;

function getCommonData() {
    LoadingMask.showloaddiv();
    $.ajax({
        url: '/BasicInfoController/getBasicInfo',
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            LoadingMask.hideloaddiv();
            commont = data;
            $('#ship').append("<option value=" + 0 + ">" + "AAL||澳亚航运    [-选择船公司-]</option>");
            var shipComp = [];
            for (var i in data.company) {
                var cpmm = {
                    id: i,
                    name: data.company[i]
                };
                shipComp.push(cpmm);

            }
            shipComp.sort(compareAsc('name'));
            for (var i = 0; i < shipComp.length; i++) {
                $('#ship').append("<option value=" + shipComp[i].id + ">" + shipComp[i].name + "</option>");
                // $('li').onclick(function(){
                //     initChartsC();
                //
                // });
            }
            $('#ship').selectpicker('refresh');
        }
    });
}

function initChartsC() {
    var shipid = $("#ship").val();
    // if(shipid == 0) shipid=1;

    if (shipid != "0") {
        LoadingMask.showloaddiv();
        require.config({
            paths: {
                'echarts': 'js/echarts',
                'echarts-x': 'js/echarts-x'

            }
        });
        require(['echarts', 'echarts/chart/pie', 'echarts-x', 'echarts/chart/bar',
            'echarts/chart/map', 'echarts-x/chart/map3d'], function (ec) {

            $.ajax({
                url: '/quatationController/getShippingcompany_information',
                type: "GET",
                data: {'id': shipid},
                success: function (data) {
                    LoadingMask.hideloaddiv();
                    companyData = data;
                    if (data.detail == null || data.dischargingports.length == 0) {
                        alert('未查到相关记录，请重新选择查询条件.');
                    } else {
                        initPieChart(ec, 'pieChart');
                        initBarChart(ec, 'barChart');
                        // initBarChart(ec,'barChart');
                        changeData(ec);
                    }
                }
            });
        });
    }
    else {
        alert("请输入完整的查询条件！");
    }

}

function initPieChart(ec, id) {
    var myChart1 = ec.init(document.getElementById(id), 'macarons');
    var cname = "";
    if (companyData.dischargingports.length > 0) {
        cname = companyData.dischargingports[0].shippingCompany;
    }
    var pieData = ProcessCompanyData.processPortData(companyData, cname);

    var option1 = {
        title: {
            text: '热门港口',
            x: 'center',
            y: 'top'
        },
        color: ['#85b6b2', '#6d4f8d', '#cd5e7e', '#e38980', '#f7db88','#33A6B8', '#D0104C','#DB4D6D','#69B0AC', "#E87A90"],
        tooltip: {
            trigger: 'item',
            /*formatter: "{a} <br/>{b} : {c} ({d}%)"*/
            formatter: function (params) {
                //港口
                var out = '港口：</br>';
                out = out + params.name + '港口报价频次：' + params.value + '(' + params.percent + '%)';
                return out;
            }
        },
        legend: {
            data: pieData.legend,
            orient : 'horizontal',
            x : 'center',
            y:'bottom',
            width:'80%',
            icon:'circle',
        },
        calculable: true,
        series: (function (){
            var series = [];
            for (var i = 0; i < 18; i++) {
                series.push({
                    name: '面积模式',
                    type: 'pie',
                    hoverAnimation:false,
                    startAngle:90+i*2,
                    itemStyle : {normal : {
                        label : {show : i > 16,formatter:'{d}%',},
                        labelLine : {show : i > 16, length:20}
                    }},
                    radius : [i * 6 + 60, i * 6 + 64],
                    data:pieData.chartData,
                })
            }
            return series;
        })()

    };
    myChart1.setOption(option1);

}

function initBarChart(ec, id) {
    var myChart2 = ec.init(document.getElementById(id), 'macarons');
    var cname = "";
    if (companyData.dischargingports.length > 0) {
        cname = companyData.dischargingports[0].shippingCompany;
    }
    var barData = ProcessCompanyData.processShippingLine(companyData.lineCovers, cname);

    var option2 = {
        title: {
            text: '热门航线',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                //航线
                var out = '航线：</br>';
                out = out + params.name + '航线报价频次：' + params.data;
                return out;
            }
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        yAxis: [
            {
                type: 'category',
                show: false,
                data: barData.legend
            }
        ],
        xAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                // name: 'ECharts例子个数统计',
                type: 'bar',
                barGap: '40%',
                barCategoryGap: '50%',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#f15b6c','#b7ba6b','#33a3dc','#ffe600','#f58f98','#76becc',
                                '#ffc20e','#deab8a','#6f599c','#11264f','#aa2116'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'left',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data: barData.chartData
            }
        ]
    };

    myChart2.setOption(option2);
}

function getChart(type) {
    require.config({
        paths: {
            'echarts': 'js/echarts',
            'echarts-x': 'js/echarts-x'

        }
    });
    require(['echarts', 'echarts/chart/bar', 'echarts/chart/pie', 'echarts-x',
        'echarts/chart/map', 'echarts-x/chart/map3d'], function (ec) {
        switch (type) {
            case 1:
                initPieChart(ec, 'pieChart');
                break;
            case 2:
                initBarChart(ec, 'barChart');
                break;
        }

    });
}

function initMap(ec, url, title) {

    var myChart = ec.init(document.getElementById('mapChart'));
    myChart.showLoading();
    var ecConfig = require('echarts/config');
    var mapData = ProcessCompanyData.processMap(companyData.dischargingports);
    // $('.filter-option .pull-left').value(mapData.legend);

    var obj= {
        name: '世界地图',
        type: "map3d",
        mapType: 'world',
        roam: {
            autoRotate: true,
            autoRotate: 2,
        },
        selectedMode: 'single',
        itemStyle: {
            normal: {label: {show: false}},
            emphasis: {label: {show: true}}
        },
        data: [],
        // 自定义名称
        nameMap: countryName,
        baseLayer: {

            backgroundColor: '',
            backgroundImage:'../../asset/earth.jpg',
            quality: 'high',
            heightImage: '../../asset/earth.jpg'
        },
        // light: {
        //     show: true,
        //     // Use the system time
        //     // time: '2013-08-07 18:09:09',
        //     sunIntensity: 1
        // },
        background: '../../asset/background.jpg',
        surfaceLayers: [{
            type: 'texture',
            distance: 3,
            image: '../../asset/clouds.png'
        }],
        itemStyle: {
            normal: {
                label: {
                    show: true
                },
                borderWidth: 1,
                borderColor: 'yellow',
                areaStyle: {
                    color: 'rgba(0, 0, 0, 0)'
                }
            }
        },
    };
    console.log(companyData.dischargingports);
    var tmp = $.extend({}, mapData.series[0], obj);
    var tmp2 = new Array();
    tmp2.push(tmp);

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

        dataRange: {
            min: 0,
            max: 200,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            color: ['#fff731', '#d6a33c', '#d63b14']
        },
        "legend": {
            "data": mapData.legend,
            "x": "left",
            "y": "top"
        },
        "tooltip": {
            "trigger": "item",
            formatter: function (params) {
                if (params[0] == "") {
                    return params[1];
                } else {
                    var out = params.seriesName + '</br>';
                    out = out + params.name + '港口报价频次：' + params.percent + '次</br>';
                }
                return out;
            }
        },

        "series": tmp2,
    };


    myChart.setOption(opts);
    myChart.hideLoading();

}

function changeData(ec) {

    initMap(ec, 'data/test.json', 'test');

}

getCommonData();
// initChartsC();
$(function () {
    LoadingMask.showloaddiv();
    require.config({
        paths: {
            'echarts': 'js/echarts',
            'echarts-x': 'js/echarts-x'

        }
    });
    require(['echarts', 'echarts/chart/pie', 'echarts-x', 'echarts/chart/bar',
        'echarts/chart/map', 'echarts-x/chart/map3d'], function (ec) {

        $.ajax({
            url: '/quatationController/getShippingcompany_information',
            type: "GET",
            data: {'id': 1},
            success: function (data) {
                LoadingMask.hideloaddiv();
                companyData = data;
                if (data.detail == null || data.dischargingports.length == 0) {
                    alert('未查到相关记录，请重新选择查询条件.');
                } else {
                    initPieChart(ec, 'pieChart');
                    initBarChart(ec, 'barChart');
                    // initBarChart(ec,'barChart');
                    changeData(ec);
                }
            }
        });
    });

})