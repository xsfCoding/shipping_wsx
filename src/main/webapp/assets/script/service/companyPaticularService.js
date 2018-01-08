/**
 * Created by qtt on 16/8/31.
 */
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var ProcessCompanyData = {

    processMap: function (data) {
        // console.log(data);
        var legend = [];
        legend.push(data[0].shippingCompany);
        var series = [];
        var oneflag = true;
        var ret = {
            "name": data[0].shippingCompany,
            "type": "map3d",
            "mapType": "world",
            "roam": {
                "autoRotate": false,
                "focus": "China"
            },
            "baseLayer": {
                "backgroundColor": "",
                "backgroundImage": "asset/earth.jpg"
            },
            "itemStyle": {
                "normal": {
                    "borderWidth": 1,
                    "borderColor": "yellow",
                    "areaStyle": {
                        "color": "rgba(0, 0, 0, 0)"
                    }
                }
            },
            "markPoint": {
                "effect": {
                    "shadowBlur": 0.4
                },
                "orientation": "normal",
                "large": false,
                "symbolSize": 5,
                "symbol": "circle",
                "data": []
            }
        };
        var ret2 = {
            "type": "map3d",
            "name": data[0].shippingCompany,
            "tooltip": {
                "trigger": "item"
            },
            "markLine": {
                "itemStyle": {
                    "normal": {
                        "width": 4,
                        "color": '#FF6600',
                        "opacity": 0.2
                    }
                },
                "effect": {
                    "show": true,
                    "scaleSize": 5,
                    "period": 30,
                    "shadowBlur": 60
                },
                data: []
            }
        };
        data.forEach(function (comp) {
            var point = {
                "name": comp.dischargingPort,
                "geoCoord": [],
                "distance": 0,
                "symbolSize": 1.8,
                "symbol": "pin",
                "value": comp.num,
                "itemStyle": {
                    "normal": {
                        "borderColor": "#87cefa",
                        "borderWidth": 0.1,
                        "label": {
                            "show": true,
                            "textStyle": {
                                "fontSize": 50
                            }
                        }
                    }
                }
            };
            point.geoCoord.push(comp.longitude);
            point.geoCoord.push(comp.latitude);

            ret.markPoint.data.push(point);

            var line = [];
            var geos = {
                geoCoord: [122.039876, 29.835833]
            };
            var geod = {
                geoCoord: []
            };
            geod.geoCoord.push(comp.longitude);
            geod.geoCoord.push(comp.latitude);

            line.push(geos);
            line.push(geod);
            ret2.markLine.data.push(line);
        });
        series.push(ret);
//        series.push(ret2);
        return {legend: legend, series: series};
    },

    processPortData: function (data, comp) {
        var legend = [];
        var chartData = [];

        //排序
        var tmp = data.dischargingports;
        var i = tmp.length, j;
        var tempExchangVal;
        while (i > 0) {
            for (j = 0; j < i - 1; j++) {
                if (tmp[j].num < tmp[j + 1].num) {
                    tempExchangVal = tmp[j];
                    tmp[j] = tmp[j + 1];
                    tmp[j + 1] = tempExchangVal;
                }
            }
            i--;
        }

        var count = 10;
        tmp.forEach(function (entry) {
            if (entry.shippingCompany == comp && count > 0) {

                legend.push(entry.dischargingPort);
                var tmp = {
                    value: entry.num,
                    name: entry.dischargingPort,
                }
                chartData.push(tmp);
                count--;
            }


        });

        return {legend: legend, chartData: chartData};

    },

    processShippingLine: function (data, comp) {
        var legend = [];
        var chartData = [];

        for (var i = 0; i < Math.min(data.length, 10); i++) {
            legend.push(data[i].routeName);
            chartData.push(data[i].num);
        }

        return {legend: legend, chartData: chartData};

    },

    processDetails: function (data, comp) {
        var tableData = [];

        data.detail.forEach(function (entry) {

            if (entry['cutoffDate'] != null) {
                var closingTimeBegin = new Date(entry['cutoffDate']).Format("yyyy-MM-dd");
            }else{
                var closingTimeBegin = "-";
            }

            if(entry['setSailDate']!=null){
                var closingTimeEnd = new Date(entry['setSailDate']).Format("yyyy-MM-dd");
            }else{
                var closingTimeEnd = "-";
            }
            // var sailingDate=new Date(entry['sailingDate']).Format("yyyy-MM-dd");
            var tmp = {
                quotationId: entry['quotationKey'],
                closingTimeBegin: closingTimeBegin,
                closingTimeEnd: closingTimeEnd,
                loadingPort: entry['startingPort'],
                // loadingWharf:entry['loadingWharf'],
                dischargingPort: entry['destinationPort'],
                // sailingDate: sailingDate,
                transshipmentPort: entry['transitPort'],
                voyage: entry['duration'],
                currency: 'USD',//entry['currencyId'],
                price20: entry['price20'],
                price40: entry['price40'],
                price40h: entry['price40h']
            };

            // console.log(tmp);
            tableData.push(tmp);

        });

        return {tableData: tableData};
    },

};