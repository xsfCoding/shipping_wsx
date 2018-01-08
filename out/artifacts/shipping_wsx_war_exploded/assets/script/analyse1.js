function initMap(url,title){
    require.config({
        paths: {
            'echarts': 'js/echarts',
            'echarts-x': 'js/echarts-x'
        }
    });

    require([
        'echarts',
        'echarts-x',
        // ECharts-X 中 map3d 的地图绘制基于 ECharts 中的 map。
        'echarts/chart/map',
        'echarts-x/chart/map3d'
    ], function (ec) {
        var myChart = ec.init(document.getElementById('lineMap'));
        myChart.showLoading();
        var ecConfig = require('echarts/config');
        $.ajax({
            url: url,
            success: function (data) {
                var markPointStyle = {
                    normal: {
                        color: 'red'
                    }
                };
                var max = -Infinity;
                var min = Infinity;
                // Airport: [name, city, country, longitude, latitude]
                var airports = data.airports.map(function (item) {
                    return {

                        geoCoord: [item[3], item[4]],
                        distance: Math.random(),
                        symbolSize : Math.random()+2,
                        value:Math.random()+1
                    }
                });

                // Route: [airlineIndex, sourceAirportIndex, destinationAirportIndex]
                var routesGroupByAirline = {};
                data.routes.forEach(function (route) {
                    var airline = data.airlines[route[0]];
                    var airlineName = airline[0];
                    if (!routesGroupByAirline[airlineName]) {
                        routesGroupByAirline[airlineName] = [];
                    }
                    routesGroupByAirline[airlineName].push(route);
                })

                var opts = {
                    title: {
                        text: title,
                        subtext: 'Data from openflights.org',
                        sublink: 'http://openflights.org/data.html',
                        x:'center',
                        y:'top',
                        textStyle: {
                            color: 'black'
                        }
                    },
                    dataRange: {
                        min: 0,
                        max: max,
                        text:['High','Low'],
                        realtime: false,
                        calculable : true,
                        color: ['red','yellow','lightskyblue']
                    },
//                    legend: {
//                        show: true,
//                        data: data.airlines.map(function (item) {
//                            // Airline name
//                            return item[0];
//                        }),
//                        selected: {},
//                        x: 'left',
//                        orient: 'vertical',
//                        textStyle: {
//                            color: 'white'
//                        }
//                    },
                    tooltip: {
                        formatter: '{b}'
                    },
                    series: [{
                        type: 'map3d',
                        mapType: 'world',
                        roam:{autoRotate:false,
                            focus:"China"},
                        baseLayer: {
                            backgroundColor: '',
                            backgroundImage: 'asset/earth.jpg'
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 1,
                                borderColor: 'yellow',
                                areaStyle: {
                                    color: 'rgba(0, 0, 0, 0)'
                                }
                            }
                        },
                        markPoint: {
                            effect: {
                                shadowBlur: 0.4,
                                show:true
                            },
//                                symbol:'triangle',
                            large: true,
//                                symbolSize: 10,
                            data: airports
                        }
                    }]
                };

//                opts.legend.data.forEach(function (name) {
//                    if (name.indexOf('American Airlines') >= 0) {
//                        opts.legend.selected[name] = true;
//                    } else {
//                        opts.legend.selected[name] = false;
//                    }
//                });

                var lineStyle={
                    width: 8,
                    // 线的透明度
                    opacity: 0.7
                };

                data.airlines.forEach(function (item) {
                    var airlineName = item[0];
                    var routes = routesGroupByAirline[airlineName];
                    var i=1;
                    if (routes) {
                        opts.series.push({
                            type: 'map3d',
                            name: airlineName,
//                            roam:{autoRotate:false},
                            tooltip : {
                                trigger: 'item',
                                formatter: function (v) {
                                    return v[1].replace(':', ' > ');
                                }
                            },
                            markLine: {
                                itemStyle: {
                                    normal: {

                                        width: 4,
                                        color:'red',
                                        // 线的透明度
                                        opacity: 0.2
                                    }
                                },
                                effect: {
                                    show: true
//                                    loop: true,
//                                    period: 15,
//                                    scaleSize : 2,
//                                    color : null,
//                                    shadowColor : null,
//                                    shadowBlur : null

                                },
                                data: routes.map(function (item) {
                                    var rey=[{
                                        // Source airport
                                        geoCoord: airports[item[1]].geoCoord
                                    }, {
                                        // Destination Airport
                                        geoCoord: airports[i].geoCoord
                                    }
//                                        ,{
//                                        itemStyle:{
//                                            width: 8,
//                                            // 线的透明度
//                                            opacity: 0.7
//                                        }
//                                    }
                                    ];
                                    i++;
                                    return  rey
                                })
                            }
                        });
                    }
                });

                //MAP_SELECTED
                myChart.on(ecConfig.EVENT.CLICK, function (param) {
                    var name = param.name;

                    lineChart()
                });

                myChart.setOption(opts);
                myChart.hideLoading();
            }
        });
    })
}

function changeData(){

    initMap('data/test.json','test');

}
function lineChart(){

    require([
        'echarts',
        'echarts/chart/line',   // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
        'echarts/chart/bar'
    ], function (ec) {
        var testLine = ec.init(document.getElementById('informa'));
        var option = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        testLine.setOption(option);
    });

}


