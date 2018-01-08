//process Analysis Port
var ProcessMap = {
    processCompanyPriceOfPort: function (data, priceType) {
        priceType = "price"; //TODO by hejunjie 17.03.14

        var shipStr = "";
        var group = null;
        var ret = [];
        var legend = [];
        var timeArray = [];
        var timeFlag = "";
        data.forEach(function (va) {
            var closingTimeEnd = new Date(va.closingTimeEnd).toLocaleString().split(' ')[0];
            if (timeFlag.indexOf(closingTimeEnd) == -1) {
                timeArray.push(closingTimeEnd.replace('/', '-').replace('/', '-'));
                timeFlag = timeFlag + "|" + closingTimeEnd;
            }
        });

        data.forEach(function (va) {
            if (shipStr.indexOf(va.shippingCompany) == -1) {
                shipStr = shipStr + '|' + va.shippingCompany;
                legend.push(va.shippingCompany);
                if (group == null) {
                    group = {};
                    group.name = va.shippingCompany;
                    group.type = "line";
                    group.data = [];
                    group.data.push(va[priceType]);
                } else {
                    ret.push(group);
                    group = {};
                    group.name = va.shippingCompany;
                    group.type = "line";
                    group.data = [];
                    group.data.push(va[priceType]);
                }
            } else {
                if (group.name == va.shippingCompany) {
                    group.data.push(va[priceType]);
                } else {
                    for (var i = 0; i < ret.length; i++) {
                        if (ret[i].name == va.shippingCompany) {
                            ret[i].data.push(va[priceType]);
                        }
                    }
                }
            }

        });
        ret.push(group);
        return {legend: legend, series: ret, time: timeArray};
    },
    processLastCompanyPriceOfPort: function (data, lastTime) {
        var lastData = [];
        data.forEach(function (va) {
            var closingTimeEnd = new Date(va.closingTimeEnd).toLocaleString().split(' ')[0];
            if (closingTimeEnd.replace('/', '-').replace('/', '-') == lastTime.split(' ')[0]) {
                lastData.push(va);
            }
        });
        var d20 = {data: [], name: "20", type: "bar"};
        var d40 = {data: [], name: "40", type: "bar"};
        var d40h = {data: [], name: "40H", type: "bar"};
        var legend = ["20", "40", "40H"];
        var company = [];
        lastData.forEach(function (data) {
            d20.data.push(data.price20);
            d40.data.push(data.price40);
            d40h.data.push(data.price40h);
            company.push(data.shippingCompany);
        });
        var ret = [];
        ret.push(d20);
        ret.push(d40);
        ret.push(d40h);
        return {legend: legend, series: ret, xAxis: company}
    },
    processLastCompanyPriceOfPort1: function (data) {
        var lastData = [];
        data.forEach(function (va) {
            lastData.push(va);
        });
        var d20 = {data: [], name: "20", type: "bar"};
        var d40 = {data: [], name: "40", type: "bar"};
        var d40h = {data: [], name: "40H", type: "bar"};
        var legend = ["20", "40", "40H"];
        var company = [];
        lastData.forEach(function (data) {
            if (company.indexOf(data.companyName) == -1) { // 重复值就不要了？？？？
                d20.data.push(data.price20);
                d40.data.push(data.price40);
                d40h.data.push(data.price40h);
                company.push(data.companyName);
            }

        });
        var ret = [];
        ret.push(d20);
        ret.push(d40);
        ret.push(d40h);
        return {legend: legend, series: ret, xAxis: company}
    },
    processLastStart: function (data, x) {
        var companyArry = [];
        var companys = [];

        // DISTINCT company name
        data.forEach(function (dat) {
            if (companyArry.indexOf(dat.companyName) == -1) {   //说明数组里没有该公司
                companyArry.push(dat.companyName);
            }
        });

        companyArry.forEach(function (company, i) {
            companys.push({
                name: company,
                index: i,
                1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
            });
        });

        data.forEach(function (va) {

            for (var i = 0; i < companys.length; i++) {
                if (companys[i].name == va.companyName) {
                    //va.sailingDate=va.sailingDate.replace(',' , ';');
                    va.schedule.split(',').forEach(function (d) {
                        var sail = (d.split('/'))[x];
                        companys[i][sail] = companys[i][sail] + 1;
                        /*d.split('/').forEach(function(sail){
                         companys[i][sail]=companys[i][sail]+1;
                         })*/

                        /*va.sailingDate=va.sailingDate.replace(',' , ';');
                         va.sailingDate.split(';').forEach(function(d){
                         d.split('/').forEach(function(sail){
                         companyArry[i][sail]=companyArry[i][sail]+1;
                         })
                         });*/
                        /*d.split('/').forEach(function(sail){
                         companys[i][sail]=companys[i][sail]+1;

                         })*/
                    });
                    break;
                }
            }

        });

        var series = [];
        var company = [];
        companys.forEach(function (da) {
            company.push(da.name);
            var ddata = [];

            ddata.push(da.index, 0, da[1]);
            series.push(ddata);
            ddata = [];
            ddata.push(da.index, 1, da[2]);
            series.push(ddata);
            ddata = [];
            ddata.push(da.index, 2, da[3]);
            series.push(ddata);
            ddata = [];
            ddata.push(da.index, 3, da[4]);
            series.push(ddata);
            ddata = [];
            ddata.push(da.index, 4, da[5]);
            series.push(ddata);
            ddata = [];
            ddata.push(da.index, 5, da[6]);
            series.push(ddata);
            ddata = [];
            ddata.push(da.index, 6, da[7]);
            series.push(ddata);
        });
        return {series: series, company: company, type: x}
    },
    processSailingDate: function (data) {
        var companyArry = [];
        data.setSailDays.forEach(function (info, index) {
            companyArry.push(
                {
                    name: info.company,
                    index: index,
                    1: info.d1,
                    2: info.d2,
                    3: info.d3,
                    4: info.d4,
                    5: info.d5,
                    6: info.d6,
                    7: info.d7
                }
            );
        });
        var series = [];
        var company = [];
        companyArry.forEach(function (da) {
            company.push(da.name);
            var ddata = [];
            ddata.push(da.index, 0, da[1]);
            series.push(ddata);
            ddata = [];
            ddata.push(da.index, 1, da[2]);
            series.push(ddata);
            ddata = [];
            ddata.push(da.index, 2, da[3]);
            series.push(ddata);
            ddata = [];
            ddata.push(da.index, 3, da[4]);
            series.push(ddata);
            ddata = [];
            ddata.push(da.index, 4, da[5]);
            series.push(ddata);
            ddata = [];
            ddata.push(da.index, 5, da[6]);
            series.push(ddata);
            ddata = [];
            ddata.push(da.index, 6, da[7]);
            series.push(ddata);
        });
        return {series: series, company: company}

    },
    processMonthlyCompanyPriceOfPort: function (data, type) {
        var yAxis = [];
        var company = [];
        var m1 = {data: [], name: "1月", type: "bar"};
        var m2 = {data: [], name: "2月", type: "bar"};
        var m3 = {data: [], name: "3月", type: "bar"};
        var m4 = {data: [], name: "4月", type: "bar"};
        var m5 = {data: [], name: "5月", type: "bar"};
        var m6 = {data: [], name: "6月", type: "bar"};
        var m7 = {data: [], name: "7月", type: "bar"};
        var m8 = {data: [], name: "8月", type: "bar"};
        var m9 = {data: [], name: "9月", type: "bar"};
        var m10 = {data: [], name: "10月", type: "bar"};
        var m11 = {data: [], name: "11月", type: "bar"};
        var m12 = {data: [], name: "12月", type: "bar"};

        data.forEach(function (va) {
            company.push(va.company);
            // m1.data.push(va["1"]);
            // m1.data.push(va["2"]);
            // m1.data.push(va["3"]);
            // m1.data.push(va["4"]);
            // m1.data.push(va["5"]);
            // m1.data.push(va["6"]);
            // m1.data.push(va["7"]);
            // m1.data.push(va["8"]);
            // m1.data.push(va["9"]);
            // m1.data.push(va["10"]);
            // m1.data.push(va["11"]);
            // m1.data.push(va["12"]);
            var tmp = {
                data: [],
                name: va.company,
                type: "bar"
            };

            for (var i = 0; i <= 11; i++) {
                tmp.data.push(va.prices[i]);

            }
            yAxis.push(tmp);
        });


        // yAxis.push(m1);
        // yAxis.push(m2);
        // yAxis.push(m3);
        // yAxis.push(m4);
        // yAxis.push(m5);
        // yAxis.push(m6);
        // yAxis.push(m7);
        // yAxis.push(m8);
        // yAxis.push(m9);
        // yAxis.push(m10);
        // yAxis.push(m11);
        // yAxis.push(m12);

        return {legend: company, series: yAxis};
    }
};