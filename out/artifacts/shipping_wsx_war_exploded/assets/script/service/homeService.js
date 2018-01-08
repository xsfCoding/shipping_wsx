var ProcessData = {
	processMap : function(data, route) {
		// console.log(data);
		var tooltip = [];
		var series = [];
		var oneflag = true;
		var color="#ffff00";
		data.forEach(function(port) {
			var ret = {
				"name" : port.dischargingPort,
				"type" : "map3d",
				"mapType" : "world",
				"roam" : {
					"autoRotate" : 30,
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
			// port.portCover.forEach(function (port) {
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
			point.geoCoord.push(port.lng);
			point.geoCoord.push(port.lat);

			ret.markPoint.data.push(point);
			// });
			series.push(ret);

			// processLine
			// if (oneflag) {
			// color = '#FF6600';
			// } else {
			// color = '#3300FF';
			// }
			// var ret2 = {
			// "type": "map3d",
			// "name": port.dischargingPort,
			// // "tooltip": {
			// // "trigger": "item"
			// // },
			// "markLine": {
			// "itemStyle": {
			// "normal": {
			// "width": 4,
			// "color": color,
			// "opacity": 0.2
			// }
			// },
			// "effect": {
			// "show": true,
			// "scaleSize": 5,
			// "period": 30,
			// "shadowBlur": 60
			// },
			// data: []
			// }
			// };
			// oneflag = false;
			//
			//
			// // port.portCover.forEach(function (port) {
			// var line = [];
			// var geos = {
			// geoCoord: [122.039876, 29.835833]
			// };
			// var geod = {
			// geoCoord: []
			// };
			// geod.geoCoord.push(port.lng);
			// geod.geoCoord.push(port.lat);
			//            
			// line.push(geos);
			// line.push(geod);
			// ret2.markLine.data.push(line);
			// // });
			//
			// // series.push(ret2);

			var toolt = {
				"dischargingPort" : port.dischargingPort,
				"price20" : port.price20,
				"price40" : port.price40,
				"price40h" : port.price40h,
			};
			tooltip.push(toolt);
            
			if (route != -1) {
				var lineTest = {
					"type" : "map3d",
					"name" : port.dischargingPort,
					"markLine" : {
						"itemStyle" : {
							"normal" : {
								"width" : 10,
								"color" : color,
								"opacity" : 0.8
							}
						},
						"effect" : {
							"show" : true,
							"scaleSize" : 3,
							"period" : 36000,
						// "shadowBlur": 60
						},
						"data" : port.routeLine
					// [
					// [{"geoCoord": [122.039876,29.835833]},
					// {"geoCoord": ["76.26206539404055","9.979275402258605"]}],
					// [{"geoCoord": ["76.26206539404055","9.979275402258605"]},
					// {"geoCoord":
					// ["39.19626051693247","-6.138212153117344"]}],
					// [{"geoCoord":
					// ["39.19626051693247","-6.138212153117344"]},
					// {"geoCoord":
					// ["73.26206539404055","11.979275402258605"]}],
					// [{"geoCoord":
					// ["73.26206539404055","11.979275402258605"]},
					// {"geoCoord":
					// ["112.26206539404055","14.979275402258605"]}],
					//                		      
					// ]
					}
				};
				// console.log(port.routeLine)
				series.push(lineTest);
			}

		});

		return {
			tooltip : tooltip,
			series : series
		};
	},
	processLineChart : function(data) {
		var xAxis = [];
		var data1 = [];
		var data2 = [];
		var data3 = [];

		// data.forEach(function (port) {
		var dt = (data.length > 5) ? 5 : data.length;
		for (var i = 0; i < dt; i++) {
			var port = data[i];
			var tmp = port.dischargingPort;
			xAxis.push(tmp);

			var tmp1 = port.price20;
			data1.push(tmp1);

			var tmp2 = port.price40;
			data2.push(tmp2);

			var tmp3 = port.price40h;
			data3.push(tmp3);
		}
		// });

		return {
			xAxis : xAxis,
			data1 : data1,
			data2 : data2,
			data3 : data3
		};
	},
	processCountryData : function(data1, data2, country) {
		var tableData = [];
		var lineDatax = [];
		var lineData1 = [];
		var lineData2 = [];
		var lineData3 = [];

		var countryNameCh = countryName[country];
		if(country=='Indonesia'){
			countryNameCh='印度尼西亚'
		}
		var tmp = data2[countryNameCh];
		// console.log(tmp);
//		if(country=='India'){
//			for(var i=0;i<data2['印度尼西亚'].length;i++){
//				tmp.push(data2['印度尼西亚'][i]);
//			}
//		}
		for (var i = 0; i < data1.length; i++) {
			var entry = data1[i];
			for (var j = 0; j < tmp.length; j++) {
				if (entry['dischargingPortId'] == tmp[j]) {
					var d = {
						dischargingPort : entry['dischargingPort'],
						price20 : entry['price20'],
						price40 : entry['price40'],
						price40h : entry['price40h']
					};
					tableData.push(d);

					lineDatax.push(entry['dischargingPort']);
					lineData1.push(entry['price20']);
					lineData2.push(entry['price40']);
					lineData3.push(entry['price40h']);

				}
			}

		}

		// console.log(tableData);
		return {
			tableData : tableData,
			xAxis : lineDatax,
			data1 : lineData1,
			data2 : lineData2,
			data3 : lineData3
		};
	},
}