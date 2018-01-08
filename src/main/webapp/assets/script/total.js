var total = null;
var totalCount = null;
var portTotal = null;
var lineTotal = null;
var companyTotal = null;
function setPortData() {
//portTotal
    $('#portTotal').bootstrapTable('refreshOptions', {
        search: true,//是否搜索
        columns: portTotal.columns
    });
    $('#portTotal').bootstrapTable('load', portTotal.data);
}

//function operateFormatter(value, row, index) {
//    $.each(row,function(i,n){
//
//    });
//    return [
//        '<a  href="javascript:void(0)" onclick="getInfo(',
//        '\'test\'',
//        ')">',
//        row.portName,
//        '</a>  '
//    ].join('');
//}
//function getInfo(row){
//    console.log(row);
//}

window.operateEvents = {
    'click .like': function (e, value, row, index) {
        alert('You click like action, row: ' + JSON.stringify(row));
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        });
    }
};

function setLineData() {
//lineTotal
    $('#lineTotal').bootstrapTable('refreshOptions', {
        search: true,//是否搜索
        columns: lineTotal.columns
    });
    $('#lineTotal').bootstrapTable('load', lineTotal.data);
}
function setCompanyData() {
//companyTotal

    $('#companyTotal').bootstrapTable('refreshOptions', {
        search: true,//是否搜索
        columns: companyTotal.columns
    });
    $('#companyTotal').bootstrapTable('load', companyTotal.data);
}
function tableTab(type) {
    switch (type) {
        case 1:
            setPortData();
            break;
        case 2:
            setLineData();
            break;
        case 3:
            setCompanyData();
            break;
    }
}


function setTableData() {
    console.log(total);
    LoadingMask.showloaddiv();
    $.ajax({
        url: '/quatationController/summary',
        // url: ' data/test2.json',
        type: "GET",
        data: {'startYear': new Date().getFullYear() - 2, 'endYear': new Date().getFullYear()},
        success: function (data) {
            LoadingMask.hideloaddiv();
            console.log(data);
            var summary = processTotal.processTotalCount(data);
            totalCount = [];
            totalCount.push(summary.totalCount);

            portTotal = processTotal.processPortTotal(data, summary.years);
            lineTotal = processTotal.processLineTotal(data, summary.years);
            companyTotal = processTotal.processCompanyTotal(data, summary.years);

            $('#totalCount').bootstrapTable('refreshOptions', {
                pagination: false,//是否分页
                columns: [{
                    field: 'totalPrice',
                    title: '总共报价数',
                    sortable: true
                }, {
                    field: 'totalPort',
                    title: '总共港口个数',
                    sortable: true
                }, {
                    field: 'totalCompany',
                    title: '总共船公司个数',
                    sortable: true
                }, {
                    field: 'totalLine',
                    title: '总共航线个数',
                    sortable: true
                }, {
                    field: 'timeLine',
                    title: '报价数据时间跨度',
                    sortable: true
                }]
            });
            $('#totalCount').bootstrapTable('load', totalCount);
            tableTab(1);
        },
        error: function () {
            LoadingMask.hideloaddiv();
            alert('未查到相关记录，请重新选择查询条件.');
        }
    });

}

function updateTableData() {

    LoadingMask.showloaddiv();
    $.ajax({
        url:'/quatationController/update',
        type: "GET",
        success: function (data) {
            LoadingMask.hideloaddiv();
            console.log(data);

            var updateSummary = processTotal.processUpdateCount(data);
            var updateCount = [];
            updateCount.push(updateSummary.updateCount);

            $('#updateCount').bootstrapTable('refreshOptions', {
                pagination: false,//是否分页
                data: data,
                columns: [{
                    field: 'price',
                    title: '新增报价数',
                    sortable: true
                }, {
                    field: 'port',
                    title: '新增港口个数',
                    sortable: true
                }, {
                    field: 'company',
                    title: '新增船公司个数',
                    sortable: true
                }, {
                    field: 'line',
                    title: '新增航线个数',
                    sortable: true
                }, {
                    field: 'timeLine',
                    title: '新增数据时间跨度',
                    sortable: true
                }]
            });
            $('#updateCount').bootstrapTable('load', updateCount);
            tableTab(1);
        },
        error: function () {
            LoadingMask.hideloaddiv();
            alert('未查到相关记录，请重新选择查询条件.');
        }
    });
}

