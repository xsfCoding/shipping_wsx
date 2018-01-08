var processTotal = {
    processTotalCount: function (data) {
        var summary = {totalCount: null, years: []};
        summary.totalCount = data.summary;
        summary.totalCount.timeLine = data.summary.timeLineStart + '至' + data.summary.timeLineEnd;
        var lastYear = data.summary.timeLineEnd.split('-')[0];
        summary.years.push(lastYear);
        summary.years.push(lastYear - 1);
        summary.years.push(lastYear - 2);
        return summary;
    },
    processUpdateCount:function (data){
        var updateSummary = {updateCount: null, years: []};
        updateSummary.updateCount = data.updateSummary;
        updateSummary.updateCount.timeLine = data.updateDateStart + '至' + data.updateDateEnd;
        return updateSummary;
    },
    processPortTotal: function (data, years) {
        var portData = data.detail.port;
        var coloum1 = [];
        var coloum2 = [];
        coloum1.push({field: 'portName', title: '港口名称', sortable: true, rowspan: 2, align: 'center', valign: 'middle'});
        coloum1.push({
            "field": "totalPrice",
            "title": "报价总数",
            "sortable": true,
            "rowspan": 2,
            "align": "center",
            "valign": "middle"
        });
        coloum1.push({
            "field": "totalCompany",
            "title": "船公司总数",
            "sortable": true,
            "rowspan": 2,
            "align": "center",
            "valign": "middle"
        });
        coloum1.push({
            "field": "totalLine",
            "title": "航线总数",
            "sortable": true,
            "rowspan": 2,
            "align": "center",
            "valign": "middle"
        });
        for (var i = 0; i < years.length; i++) {
            coloum1.push({
                "field": "d" + years[i],
                "title": years[i] + "年详情",
                "sortable": true,
                "colspan": 3,
                "align": "center",
                "valign": "middle"
            });
            coloum2.push({
                "field": "price" + years[i],
                "title": "报价数",
                "sortable": true,
                "editable": true,
                "align": "center"
            });
            coloum2.push({
                "field": "company" + years[i],
                "title": "船公司数",
                "sortable": true,
                "editable": true,
                "align": "center"
            });
            coloum2.push({
                "field": "line" + years[i],
                "title": "航线数",
                "sortable": true,
                "editable": true,
                "align": "center"
            })
        }
        var colmn = [];
        colmn.push(coloum1);
        colmn.push(coloum2);
        var result = [];
        for (var i = 0; i < portData.length; i++) {
            var ret = {
                portName: portData[i].port_name,
                discharging_port_id: portData[i].discharging_port_id,
                totalPrice: portData[i].totalPrice,
                totalCompany: portData[i].totalCompany,
                totalLine: portData[i].totalLine
            };
            for (var j = 0; j < years.length; j++) {
                var price = "price" + years[j];
                var company = "company" + years[j];
                var line = "line" + years[j];
                ret[price] = portData[i].year[years[j]].price;
                ret[company] = portData[i].year[years[j]].company;
                ret[line] = portData[i].year[years[j]].line;
            }
            result.push(ret);
        }
        return {columns: colmn, data: result};
    },
    processLineTotal: function (data, years) {
        var coloum1 = [];
        var coloum2 = [];
        coloum1.push({field: 'lineName', title: '航线名称', sortable: true, rowspan: 2, align: 'center', valign: 'middle'});
        coloum1.push({
            "field": "totalPrice",
            "title": "报价总数",
            "sortable": true,
            "rowspan": 2,
            "align": "center",
            "valign": "middle"
        });
        coloum1.push({
            "field": "totalCompany",
            "title": "船公司总数",
            "sortable": true,
            "rowspan": 2,
            "align": "center",
            "valign": "middle"
        });
        coloum1.push({
            "field": "totalPort",
            "title": "港口总数",
            "sortable": true,
            "rowspan": 2,
            "align": "center",
            "valign": "middle"
        });
        for (var i = 0; i < years.length; i++) {
            coloum1.push({
                "field": "d" + years[i],
                "title": years[i] + "年详情",
                "sortable": true,
                "colspan": 3,
                "align": "center",
                "valign": "middle"
            });
            coloum2.push({
                "field": "price" + years[i],
                "title": "报价数",
                "sortable": true,
                "editable": true,
                "align": "center"
            });
            coloum2.push({
                "field": "company" + years[i],
                "title": "船公司数",
                "sortable": true,
                "editable": true,
                "align": "center"
            });
            coloum2.push({
                "field": "port" + years[i],
                "title": "港口数",
                "sortable": true,
                "editable": true,
                "align": "center"
            })
        }
        var colmn = [];
        colmn.push(coloum1);
        colmn.push(coloum2);
        var lineData = data.detail.line;
        var result = [];
        for (var i = 0; i < lineData.length; i++) {
            var ret = {
                lineName: lineData[i].route_name,
                route_id: lineData[i].route_id,
                totalPrice: lineData[i].totalPrice,
                totalCompany: lineData[i].totalCompany,
                totalPort: lineData[i].totalPort
            };
            for (var j = 0; j < years.length; j++) {
                var price = "price" + years[j];
                var company = "company" + years[j];
                var port = "port" + years[j];
                ret[price] = lineData[i].year[years[j]].price;
                ret[company] = lineData[i].year[years[j]].company;
                ret[port] = lineData[i].year[years[j]].port;
            }
            result.push(ret);
        }
        return {columns: colmn, data: result};
    },
    processCompanyTotal: function (data, years) {
        var coloum1 = [];
        var coloum2 = [];
        coloum1.push({
            field: 'companyName',
            title: '船公司名称',
            sortable: true,
            rowspan: 2,
            align: 'center',
            valign: 'middle'
        });
        coloum1.push({
            "field": "totalPrice",
            "title": "报价总数",
            "sortable": true,
            "rowspan": 2,
            "align": "center",
            "valign": "middle"
        });
        coloum1.push({
            "field": "totalLine",
            "title": "航线总数",
            "sortable": true,
            "rowspan": 2,
            "align": "center",
            "valign": "middle"
        });
        coloum1.push({
            "field": "totalPort",
            "title": "港口总数",
            "sortable": true,
            "rowspan": 2,
            "align": "center",
            "valign": "middle"
        });
        for (var i = 0; i < years.length; i++) {
            coloum1.push({
                "field": "d" + years[i],
                "title": years[i] + "年详情",
                "sortable": true,
                "colspan": 3,
                "align": "center",
                "valign": "middle"
            });
            coloum2.push({
                "field": "price" + years[i],
                "title": "报价数",
                "sortable": true,
                "editable": true,
                "align": "center"
            });
            coloum2.push({
                "field": "line" + years[i],
                "title": "航线数",
                "sortable": true,
                "editable": true,
                "align": "center"
            });
            coloum2.push({
                "field": "port" + years[i],
                "title": "港口数",
                "sortable": true,
                "editable": true,
                "align": "center"
            })
        }
        var colmn = [];
        colmn.push(coloum1);
        colmn.push(coloum2);
        var companyData = data.detail.company;
        var result = [];
        for (var i = 0; i < companyData.length; i++) {
            var ret = {
                companyName: companyData[i].company_name,
                company_id: companyData[i].company_id,
                totalPrice: companyData[i].totalPrice,
                totalLine: companyData[i].totalLine,
                totalPort: companyData[i].totalPort
            };
            for (var j = 0; j < years.length; j++) {
                var price = "price" + years[j];
                var line = "line" + years[j];
                var port = "port" + years[j];
                ret[price] = companyData[i].year[years[j]].price;
                ret[line] = companyData[i].year[years[j]].line;
                ret[port] = companyData[i].year[years[j]].port;
            }
            result.push(ret);
        }
        return {columns: colmn, data: result};
    },
};