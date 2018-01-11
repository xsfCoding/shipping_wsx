var boardData = null;
var basicLineData = null;
function initCharts() {
	LoadingMask.showloaddiv();
	$.ajax({
				url : '/PortController/Dashboard',
				type : "POST",
				contentType : "application/json",
				success : function(data) {
					LoadingMask.hideloaddiv();
					boardData = data;
					console.log(boardData);

					// 左上与去年比较数值
					var options = {
						useEasing : true,
						useGrouping : true,
						separator : ',',
						decimal : '.',
						prefix : '',
						suffix : ''
					};

					// 左上与去年比较数值
					var options = {
						useEasing : true,
						useGrouping : true,
						separator : ',',
						decimal : '.',
						prefix : '',
						suffix : ''
					};
					var sum = [ boardData.upPrice.thisYearSummary.sum,
							boardData.upPort.thisYearSummary.sum,
							boardData.upLine.thisYearSummary.sum,
							boardData.upCompany.thisYearSummary.sum ];
					var rate = [ boardData.upPrice.thisYearSummary.rate,
							boardData.upPort.thisYearSummary.rate,
							boardData.upLine.thisYearSummary.rate,
							boardData.upCompany.thisYearSummary.rate ];
					var upPrice = new CountUp("upPrice", 0, sum[0], 0, 2.5,
							options);
					var upPort = new CountUp("upPort", 0, sum[1], 0, 2.5,
							options);
					var upLine = new CountUp("upLine", 0, sum[2], 0, 2.5,
							options);
					var upCompany = new CountUp("upCompany", 0, sum[3], 0, 2.5,
							options);
					upPrice.start();
					upCompany.start();
					upLine.start();
					upPort.start();

					// document.getElementById("upPriceRate").innerHTML = "报价频次同比增长"
					// 		+ rate[0];
					// document.getElementById("upPortRate").innerHTML = "港口数量同比增长"
					// 		+ rate[1];
					// document.getElementById("upLineRate").innerHTML = "航线数量同比增长"
					// 		+ rate[2];
					// document.getElementById("upCompanyRate").innerHTML = "船公司同比增长"
					// 		+ rate[3];

					initLeftMap();
					initUpPrice();
				}
			});

	$.ajax({
		url : '/BasicInfoController/getBasicInfo',
		type : "POST",
		contentType : "application/json",
		success : function(data) {
			basicLineData = data.line;

		}
	});
}

/*
 * 相比去年新增报价对比 1.按照月份,统计去年和今年每个月的报价次数 2.如果今年目前时间是11月 则12月和11月的报价都设置成0
 */

function initUpPrice() {
	var myChartUpPrice = echarts.init(document.getElementById('upChart'));
	var priceData = ProcessData.processUpPrice(boardData.upPrice.detail);

	var option = {
        backgroundColor: '#192469',
            title : {
                text : '相比去年新增报价频次',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#F1F1F3'
                },
                left: '6%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                formatter : "{b}</br>{a0}：{c0}次</br>{a1}：{c1}次"
            },

            legend: {
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 5,
                itemGap: 13,

                right: '4%',
                textStyle: {
                    fontSize: 12,
                    color: '#292f39'
                },
                data : [ boardData.lastYear, boardData.thisYear ],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{

                type : 'category',
                boundaryGap : false,
                data : [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月',
                    '10月', '11月', '12月' ],
                axisLine: {
                    lineStyle: {
                        color: '#0483eb'
                    }
                },


            }],


            yAxis: [{
                type: 'value',

                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#0483eb'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 12
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#17367c'
                    }
                }
            }],



            series: [{
                name : boardData.lastYear,
                type: 'line',
                smooth: false,
                symbolSize:6,
                symbol:'circle',
                stack : '总量1',

                lineStyle: {
                    normal: {
                        width: 2
                    },

                },

                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(112, 161, 250, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(112, 161, 250, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#70a1fa'
                    }
                },
                data : priceData.data2
            },
                {
                    name: boardData.lastYear,
                    type: 'line',
                    smooth: false,
                    symbolSize: 6,
                    symbol: 'circle',
                    stack: '总量2',

                    lineStyle: {
                        normal: {
                            width: 2
                        },

                    },

                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(112, 161, 250, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(112, 161, 250, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#70a1fa'
                        }
                    },
                    data: priceData.data1
                }]
        };
	myChartUpPrice.setOption(option);
}



/*
 * 相比去年增加港口 1.按照月份统计每个月的港口覆盖数作对比
 */
function initUpPort() {
	var myChartUpPrice = echarts.init(document.getElementById('upChart'));
	var portData = ProcessData.processUpPort(boardData.upPort.detail);

    var option = {

        backgroundColor: '#23243a',
        title : {
            text : '相比去年港口覆盖个数',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                color: '#F1F1F3'
            },
            left: '6%'
        },
        tooltip: { //提示框组件
            trigger: 'axis',
            formatter: '{b}<br />{a0}: {c0}<br />{a1}: {c1}',
            axisPointer: {
                type: 'shadow',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12,
            }
        },
        grid: {
            left: '1%',
            right: '4%',
            bottom: '6%',
            top:30,
            padding:'0 0 10 0',
            containLabel: true,
        },
        legend: {//图例组件，颜色和名字
            right:10,
            top:0,
            itemGap: 16,
            itemWidth: 18,
            itemHeight: 10,
            data : [ boardData.lastYear, boardData.thisYear ],
            textStyle: {
                color: '#a8aab0',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12,
            }
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,//坐标轴两边留白
                data : [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月',
                    '10月', '11月', '12月' ],
                axisLabel: { //坐标轴刻度标签的相关设置。
                    interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                    margin:15,
                    textStyle: {
                        color: '#078ceb',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑',
                        fontSize: 12,
                    }
                },
                axisTick:{//坐标轴刻度相关设置。
                    show: false,
                },
                axisLine:{//坐标轴轴线相关设置
                    lineStyle:{
                        color:'#fff',
                        opacity:0.2
                    }
                },
                splitLine: { //坐标轴在 grid 区域中的分隔线。
                    show: false,
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitNumber: 5,
                axisLabel: {
                    textStyle: {
                        color: '#a8aab0',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑',
                        fontSize: 12,
                    }
                },
                axisLine:{
                    show: false
                },
                axisTick:{
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#fff'],
                        opacity:0.06
                    }
                }

            }
        ],
        series : [
            {
                name:boardData.lastYear,
                type:'bar',
                data:portData.data2,
                barWidth: 10,
                barGap:0,//柱间距离
                label: {//图形上的文本标签
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#a8aab0',
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            fontSize: 12,
                        },
                    },
                },
                itemStyle: {//图形样式
                    normal: {
                        barBorderRadius: [5, 5, 0, 0],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 1, color: 'rgba(127, 128, 225, 0.7)'
                        },{
                            offset: 0.9, color: 'rgba(72, 73, 181, 0.7)'
                        },{
                            offset: 0.31, color: 'rgba(0, 208, 208, 0.7)'
                        },{
                            offset: 0.15, color: 'rgba(0, 208, 208, 0.7)'
                        }, {
                            offset: 0, color: 'rgba(104, 253, 255, 0.7)'
                        }], false),
                    },
                },
            },
            {
                name:boardData.thisYear,
                type:'bar',
                data:portData.data1,
                barWidth: 10,
                barGap:0.2,//柱间距离
                label: {//图形上的文本标签
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#a8aab0',
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            fontSize: 12,
                        },
                    },
                },
                itemStyle: {//图形样式
                    normal: {
                        barBorderRadius: [5, 5, 0, 0],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 1, color: 'rgba(127, 128, 225, 0.7)'
                        },{
                            offset: 0.9, color: 'rgba(72, 73, 181, 0.7)'
                        },{
                            offset: 0.25, color: 'rgba(226, 99, 74, 0.7)'
                        }, {
                            offset: 0, color: 'rgba(253, 200, 106, 0.7)'
                        }], false),
                    },
                },
            }
        ]
    };

	myChartUpPrice.setOption(option);
}

/*
 * 相比去年每个航线在报价中的占比 取前十 1.航线次数/报价总次数 百分比
 */
function initUpLine() {
	var myChartUpPrice = echarts.init(document.getElementById('upChart'));
	var lineData = ProcessData.processUpLine(boardData.upLine.detail);

	var option = {
        backgroundColor: '#000066',
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            itemWidth: 14,
            itemHeight: 14,
            align: 'left',
            data : lineData.data1,
            textStyle: {
                color: '#FFFFFF'
            }
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                hoverAnimation: false,
                legendHoverLink:false,
                radius: ['40%', '42%'],
                color: ['#915872', '#3077b7', '#9a8169', '#3f8797','#5b8144','#307889','#9c6a79'
                ],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },

                },
                tooltip: {
                    show:false,


                },

                data:[
                    {value:435, name:''},
                    {value:679, name:''},
                    {value:848, name:''},
                    {value:348, name:''},
                    {value:679, name:''},
                    {value:848, name:''},
                    {value:348, name:''}
                ]
            },
            {
                name:'访问来源',
                type:'pie',
                radius: ['42%', '55%'],
                color: ['#d74e67', '#0092ff', '#eba954', '#21b6b9','#60a900','#01949b',' #f17677'],
                label: {
                    normal: {
                        formatter: '{b}\n{d}%'
                    },

                },
                data : boardData.upLine.detail,
            }
        ]
    };
	myChartUpPrice.setOption(option);
}



/*
 * 相比去年每个公司在报价中的占比 取前十 1.公司报价/报价总额 百分比
 */
function initUpCompany() {
	var myChartUpPrice = echarts.init(document.getElementById('upChart'));
	var company = ProcessData.processUpCompany(boardData);
    var count = 0;
        option = {
            backgroundColor:'#333366',
            title: {
                text: '船公司数量',
                x: 'center',
                y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#F1F1F3'
                },

            },
            tooltip: {
                trigger: 'item',
                formatter : "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data : company.legend,
                textStyle: {
                    color: '#FFFFFF'
                }
            },
            calculable: true,
            series: [
                {
                    color: ['#fe8eae', '#fea1cc', '#fca8e1', '#de9cfd', '#d0a8fc', '#fcba61', '#f5d978', '#f5ed78', '#c8f578', '#9df174', '#6fea8e', '#78f597', '#65db99', '#78f5af', '#7bebc3', '#78f5d7', '#78f4f5', '#78d6f5', '#78bff5', '#7899f5'],
                    type: 'pie',
                    radius: [60, 160],
                    center: ['50%', '50%'],
                    roseType: 'radius',
                    data: company.series

                }
            ]
        }
	myChartUpPrice.setOption(option);
}

/*
 * 标注每个港口的一个价格增幅情况
 */
function initLeftMap() {
	var myChartMap = echarts.init(document.getElementById('selaMap'));
	var portMap = ProcessData.processLeftMap(boardData);
	var option = {

		tooltip : {
			formatter : function(e) {
				// console.log(e);
				for (var i = 0; i < portMap.tooltip.length; i++) {
					if (e.name == portMap.tooltip[i].name) {
						var str = e.name + '港口<br/>';
						str = str + "20规格：均价" + portMap.tooltip[i].price20
								+ " 与去年相比增长" + portMap.tooltip[i].price20Rate
								+ "<br/>";
						str = str + "40规格：均价" + portMap.tooltip[i].price40
								+ " 与去年相比增长" + portMap.tooltip[i].price40Rate
								+ "<br/>";
						str = str + "40H规格：均价" + portMap.tooltip[i].price40h
								+ " 与去年相比增长" + portMap.tooltip[i].price40hRate
								+ "<br/>";
						return str;
					}
				}
			}
		},
		toolbox : {
			show : true,
			orient : 'vertical',
			left : 'right',
			feature : {
				saveAsImage : {}
			}
		},
		geo : {
			map : 'world',
			label : {
				emphasis : {
					show : false
				}
			},
			roam : true

		},

		legend : {
			data : [],
			left : 'left'
		},
		series : [

		]
	};
	var legend = [];
	for (var j = 0; j < boardData.portSummary.length; j++) {
		var port = boardData.portSummary[j];
		for ( var k in port) {
			var legStr = basicLineData[k].split("||")[1] + "航线";
			legend.push(legStr);
			var ret = {
				name : legStr,
				type : 'scatter',
				coordinateSystem : 'geo',
				data : [],
				symbolSize : function(val) {
					return 50 / 10;
				},
				label : {
					normal : {
						formatter : '{b}',
						position : 'right',
						show : false
					},
					emphasis : {
						show : true
					}
				}
			};
			for (var i = 0; i < port[k].length; i++) {
				var geo = [];
				geo.push(port[k][i].longitude);
				geo.push(port[k][i].latitude);

				var data = {
					name : port[k][i].cname,
					value : geo,
					detail : port[k][i]
				};
				ret.data.push(data);
			}
			option.series.push(ret);
		}
	}
	;
	option.legend.data = legend;

	myChartMap.setOption(option);
};

// initLeftMap();
