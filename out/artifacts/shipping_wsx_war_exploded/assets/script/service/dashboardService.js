var ProcessData = {
    processUpPrice: function (data) {
        var data1 = [];
        var data2 = [];
        var thisYear = data.thisyear;
        var lastYear = data.lastyear;
        var m;
        for (var i = 12; i >= 1; i--) {
            if (thisYear[i] <= 0) {
                m = i;
            }
            else {
                data1.push(thisYear[i]);
            }
        }
        if (!m) m = 13;
        for (var j = 1; j < m; j++) {
            data2.push(lastYear[j]);
        }

        return {data1: data1, data2: data2};
    },
    processUpPort: function (data) {
        var data1 = [];
        var data2 = [];

        var thisYear = data.thisyear;

        var lastYear = data.lastyear;
        for (var i = 1; i <= 12; i++) {
            data1.push(thisYear[i]);
            data2.push(lastYear[i]);
        }

        return {data1: data1, data2: data2};
    },
    processUpLine: function (data) {
        var data1 = [];

        data.forEach(function (entry) {
            data1.push(entry["name"]);
        });

        return {data1: data1};
    },
    processUpCompany: function (data) {
        var legend = [];
        var series = [];
        data.upCompany.detail.forEach(function (company) {
            legend.push(company.name);
            var retseries = {
                name: company.name,
                value: company.value
            };
            series.push(retseries);
        });
        return {legend: legend, series: series};
    },

    processLeftMap: function (data) {
        var tooltip = [];
        data.portSummary_port.forEach(function (total_port) {
            var toolt = {
                "name": total_port.cname,
                "price20": total_port.price[20].data,
                "price20Rate": total_port.price[20].rate,
                "price40": total_port.price[40].data,
                "price40Rate": total_port.price[40].rate,
                "price40h": total_port.price["40h"].data,
                "price40hRate": total_port.price["40h"].rate,
            }
            tooltip.push(toolt);

        });
        return {tooltip: tooltip};
    }
}