//process Analysis Port
var ProcessShipData = {
	processRadarData : function(data) {
		// console.log(data);
		var legend = [];
		var series = [];
		var indicator = data.radar.indicator;
		data.radar.data.forEach(function(name) {
			legend.push(name.shippingCompany);
			var ret = {
				value : name.value,
				name : name.shippingCompany
			};
			series.push(ret);
		});
		// console.log(indicator);
		// console.log(series);
		return {
			legend : legend,
			indicator : indicator,
			series : series
		}
	},
	processBaojia : function(data, type) {
		// console.log(data.concreteCompany);
		var legend = [];
		var series = [];
		var table = {
			data : [],
			columns : []
		};
		data.concreteCompany.forEach(function(company) {
			legend.push(company.shippingCompany);
			var retseries = {
				name : company.shippingCompany,
				type : 'line',
				data : []
			};
			company.quoto.forEach(function(pri) {
				table.data.push(pri);
				retseries.data.push(pri[type]);
			});
			series.push(retseries);
		});
		table.columns = [ {
			field : 'shippingCompany',
			title : '公司',
			sortable : true
		}, {
			field : 'type',
			title : '季度',
			sortable : true
		}, {
			field : 'num',
			title : '报价频次',
			sortable : true
		}, {
			field : 'price20',
			title : '20规格',
			sortable : true
		}, {
			field : 'price20rf',
			title : '20rf规格',
			sortable : true
		}, {
			field : 'price40',
			title : '40规格',
			sortable : true
		}, {
			field : 'price40h',
			title : '40h规格',
			sortable : true
		}, {
			field : 'price40rf',
			title : '40rf规格',
			sortable : true
		}, {
			field : 'price45',
			title : '45规格',
			sortable : true
		} ];

		return {
			legend : legend,
			series : series,
			table : table
		};
	},
	processLineCover : function(data) {
		// console.log(data.concreteCompany);
		var chartData = [];
		var tableData = [];

		var routCommon = []; // 公共路线
		var routAll = []; // 全部路线

		// 添加人：周思硕
		// 添加时间：2016年11月28日11:20:35
		var legend = [];
		data.concreteCompany.forEach(function(company) {

			// 添加时间：2016年11月28日11:21:39
			legend.push(company.shippingCompany);
			// chartData
			var tmp = {
				value : {},
				name : company.shippingCompany
			};
			// tableData
			var tmp1 = {
				company : company.shippingCompany,
				routeName : {},
				percent : 0
			};

			var count = 0; // 路线数目
			var routNum = 0; // 船公司所有航线次数

			company.lineCover.forEach(function(t) {

				count++;
				if (routAll.indexOf(t['route']) > -1) {

					routCommon.push(t['route']);
				} else {
					routAll.push(t['route']);
				}

				routNum += t['num'];

			});
			tmp.value = count;
			chartData.push(tmp);

			// console.log(company.lineCover);
			company.lineCover.forEach(function(para) {
				tmp1.routeName = para['routeName'];
				tmp1.percent = (para['num'] / routNum).toFixed(4) * 100 + '%';
				tableData.push(tmp1);

				console.log(tmp1);
			});

		});

		var common = {
			value : routCommon.length,
			name : '公共'
		};
		chartData.push(common);

		return {
			legend : legend,
			chartData : chartData,
			tableData : tableData
		};

	},
	processPortCover : function(data) {
		var chartData = [];
		var geoCoord = '';
		var legend = [];
		var tableData = [];

		var number = 1; // 区分不同船公司
		data.concreteCompany.forEach(function(company) {

			legend.push(company.shippingCompany);

			company.portCover
					.forEach(function(para) {
						var dataEntry = {
							name : para['dischargingPort'],
							value : number

						};
						chartData.push(dataEntry);

						if (para['longitude'] != -1 && para['latitude'] != -1) {
							geoCoord += '"' + para['dischargingPort'] + '" : ['
									+ para['longitude'] + ','
									+ para['latitude'] + '],';

						}

						// tableData
						var tmp = {
							dischargingPort : para['dischargingPort'],
							dischargingPortId : para['dischargingPortId'],
							num : para['num'],
							company : company.shippingCompany
						};
						tableData.push(tmp);

					});

			number++;
		});

		// console.log(geoCoord);
		// console.log(chartData);
		return {
			legend : legend,
			chartData : chartData,
			geoCoord : geoCoord,
			tableData : tableData
		};

	},
	processThcPrice : function() {

	},
	processMap : function(data) {
		// console.log(data);
		var legend = [];
		var series = [];
		// 添加时间：2016年11月27日20:11:29
		var tooltip = [];
		var oneflag = true;
		data.forEach(function(comp) {
			legend.push(comp.shippingCompany);
			var ret = {
				"name" : comp.shippingCompany,
				"type" : "map3d",
				"mapType" : "world",
				"roam" : {
					"autoRotate" : false,
					"focus" : "China"
				},
				"baseLayer" : {
					"backgroundColor" : "",
					"backgroundImage" : "asset/earth.jpg"
				},
				"itemStyle" : {
					"normal" : {
						"borderWidth" : 1,
						"borderColor" : "yellow",
						"areaStyle" : {
							"color" : "rgba(0, 0, 0, 0)"
						}
					}
				},
				"markPoint" : {
					"clickable" : false,
					"effect" : {
						"shadowBlur" : 0.4
					},
					"orientation" : "normafl",
					"large" : false,
					"symbolSize" : 5,
					"symbol" : "circle",
					"data" : []
				}
			};
			comp.portCover.forEach(function(port) {
				var point = {
					"name" : port.dischargingPort,
					"geoCoord" : [],
					"distance" : 0,
					"symbolSize" : 1.8,
					"symbol" : "pin",
					"value" : port.num,
					"itemStyle" : {
						"normal" : {
							"borderColor" : "#87cefa",
							"borderWidth" : 0.1,
							"label" : {
								"show" : true,
								"textStyle" : {
									"fontSize" : 50
								}
							}
						}
					}
				};
				point.geoCoord.push(port.longitude);
				point.geoCoord.push(port.latitude);

				ret.markPoint.data.push(point);
			});
			// processLine
			if (oneflag) {
				color = '#FF6600';
			} else {
				color = '#3300FF';
			}
			var ret2 = {
				"type" : "map3d",
				"name" : comp.shippingCompany,
				"tooltip" : {
					"trigger" : "item"
				},
				"markLine" : {
					"itemStyle" : {
						"normal" : {
							"width" : 4,
							"color" : color,
							"opacity" : 0.2
						}
					},
					"effect" : {
						"show" : true,
						"scaleSize" : 5,
						"period" : 30,
						"shadowBlur" : 60
					},
					data : []
				}
			};
			oneflag = false;
			comp.portCover.forEach(function(port) {
				var line = [];
				var geos = {
					geoCoord : [ 122.039876, 29.835833 ]
				};
				var geod = {
					geoCoord : []
				};
				geod.geoCoord.push(port.longitude);
				geod.geoCoord.push(port.latitude);

				line.push(geos);
				line.push(geod);
				ret2.markLine.data.push(line);

				var toolt = {
					"dischargingPort" : port.dischargingPort,
					"value" : port.num,
				};
				tooltip.push(toolt);
			});

			series.push(ret);
			// series.push(ret2);

		});
		return {
			tooltip : tooltip,
			legend : legend,
			series : series
		};
	}
};