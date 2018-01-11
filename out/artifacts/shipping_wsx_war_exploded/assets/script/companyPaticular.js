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
            $('#ship').append("<option value=" + 0 + ">" + "-选择船公司-</option>");
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
            }
            $('#ship').selectpicker('refresh');
        }
    });
}
function initChartsC() {
    var shipid = $("#ship").val();
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
                        // initBarChart(ec,'barChart');
                        changeData(ec);
                        setTableData(shipid);
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
            text: '十大热门港口',
            x: 'center'
        },
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
            x: 'center',
            y: 'bottom',
            data: pieData.legend
        },
        calculable: true,
        series: [
            {
                name: '面积模式',
                type: 'pie',
                radius: [30, 110],
                // center : ['75%', 200],
                roseType: 'area',
                x: '100%',               // for funnel
                max: 40,                // for funnel
                sort: 'ascending',     // for funnel
                data: pieData.chartData
            }
        ]
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
            text: '十大热门航线',
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
                                '#26C0C0', '#F0805A', '#F4E001', '#C6E579', '#D7504B', '#60C0DD', '#F3A43B',
                                '#FAD860', '#9BCA63', '#FE8463', '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',

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

function setTableData(shipid) {
    var details = ProcessCompanyData.processDetails(companyData, shipid);
    var tableData = details.tableData;

    $('#mytab').bootstrapTable('refreshOptions', {
        columns: [{
            field: 'quotationId',
            title: '价格表ID',
            sortable: true
        }, {
            field: 'closingTimeBegin',
            title: '截关开始日期',
            sortable: true
        }, {
            field: 'closingTimeEnd',
            title: '截关结束日期',
            sortable: true
        }, {
            field: 'loadingPort',
            title: '起运港',
            sortable: true
        },
        //     {
        //     field: 'loadingWharf',
        //     title: '装载码头',
        //     sortable: true
        // },
            {
            field: 'dischargingPort',
            title: '目的港',
            sortable: true
        },
        //     {
        //     field: 'sailingDate',
        //     title: '船期',
        //     sortable: true
        // },
            {
            field: 'transshipmentPort',
            title: '中转港',
            sortable: true
        }, {
            field: 'voyage',
            title: '航程',
            sortable: true
        }, {
            field: 'currency',
            title: '货币',
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
    $('#mytab').bootstrapTable('load', tableData);
}

function initMap(ec, url, title) {

    var myChart = ec.init(document.getElementById('mapChart'));
    myChart.showLoading();
    var ecConfig = require('echarts/config');
    var mapData = ProcessCompanyData.processMap(companyData.dischargingports);
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
            color: ['red', 'yellow', 'lightskyblue']
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
        "series": mapData.series
    };

    opts.series.push(
        {
            name: '世界地图',
            type: "map3d",
            mapType: 'world',
            roam: true,
            selectedMode: 'single',
            itemStyle: {
                normal: {label: {show: false}},
                emphasis: {label: {show: true}}
            },
            data: [],
            // 自定义名称
            nameMap: countryName
        }
    );

    myChart.setOption(opts);
    myChart.hideLoading();

}

function changeData(ec) {

    initMap(ec, 'data/test.json', 'test');

}

getCommonData()