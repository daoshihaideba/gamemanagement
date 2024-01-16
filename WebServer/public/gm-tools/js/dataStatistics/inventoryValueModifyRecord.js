
var PAGE_SIZE = 20;


function createList() {
    var dataList = $('#dataList');
    var dataPager = dataList.datagrid("getPager");

    var matchData = {
    };

    // 请求数据
    apiAdminGetRecord("modifyInventoryValueRecordModel", 0, PAGE_SIZE, matchData,
        function (data) {
            var msg = data.msg;
            var recordDataArr = msg.recordArr;
            dataList.datagrid('loadData', recordDataArr);

            dataPager.pagination({
                total: msg.totalCount,
                onSelectPage: function (pageNo, pageSize) {
                    var start = (pageNo - 1) * pageSize;
                    apiAdminGetRecord("modifyInventoryValueRecordModel", start, PAGE_SIZE, matchData, function (data) {
                        $("#dataList").datagrid("loadData", data.msg.recordArr);
                        dataPager.pagination('refresh', {
                            total: data.msg.totalCount,
                            pageNumber: pageNo
                        });
                    });
                }
            });
        });
}

$(document).ready(function () {
    var parameters = parseQueryString(window.location.href);
    if (!!parameters.uid) $('#txtSearch').val(parameters.uid.split("?")[0]);

    // 初始化数据列名
    var dataList = $('#dataList');
    dataList.datagrid({
        nowrap: true,
        autoRowHeight: false,
        striped: true,
        pagination: true,
        showFooter: true,
        pageSize: PAGE_SIZE,
        pageList: [PAGE_SIZE],
        rownumbers: true,
        onBeforeSelect: function () {
            return false;
        },
        columns: [[
            { field: 'uid', title: '修改者ID' },
            {
                field: 'createTime', title: '时间',
                formatter: function (value) {
                    if (!!value || value === 0) {
                        return new Date(value || 0).toLocaleString();
                    }
                }
            },
            {
                field: 'kind', title: '游戏类型',
                formatter: function (value) {
                    if (!!value || value === 0) {
                        if (value === enumeration.gameType.HHDZ) {
                            return "红黑大战";
                        } else if (value === enumeration.gameType.BJL) {
                            return "百家乐";
                        } else if (value === enumeration.gameType.LHD) {
                            return "龙虎斗";
                        } else if (value === enumeration.gameType.TTZ) {
                            return "推筒子";
                        } else if (value === enumeration.gameType.ZJH) {
                            return "扎金花";
                        } else if (value === enumeration.gameType.NN) {
                            return "牛牛";
                        } else if (value === enumeration.gameType.FISH) {
                            return "捕鱼";
                        } else if (value === enumeration.gameType.SSS) {
                            return "十三张";
                        } else if (value === enumeration.gameType.BRNN) {
                            return "百人牛牛";
                        } else if (value === enumeration.gameType.BJ) {
                            return "21点";
                        } else if (value === enumeration.gameType.DZ) {
                            return "德州扑克";
                        } else if (value === enumeration.gameType.PDK) {
                            return "跑得快";
                        } else if (value === enumeration.gameType.DDZ) {
                            return "斗地主";
                        }
                    }
                }
            }, {
                field: 'roomLevel', title: '场次',
                formatter: function (value) {
                    var text = '';
                    switch (value) {
                        case 1:
                            text = '初级场';
                            break;
                        case 2:
                            text = '中级场';
                            break;
                        case 3:
                            text = '高级场';
                            break;
                        case 4:
                            text = '土豪场';
                            break;
                        case 5:
                            text = '财大气粗';
                            break;
                        case 6:
                            text = '腰缠万贯';
                            break;
                        case 7:
                            text = '挥金如土';
                            break;
                        case 8:
                            text = '富贵逼人';
                            break;
                        default:
                            text = '未知';
                            break;

                    }
                      return text;
                }
            },
            {
                field: 'count', title: '增加库存值',
                formatter: function (value) {
                    if (!!value || value === 0) {
                        return value.toFixed(2);
                    }
                }
            },
            {
                field: 'leftCount', title: '修改后库存值',
                formatter: function (value) {
                    if (!!value || value === 0) {
                        return value.toFixed(2);
                    }
                }
            }
        ]]
    });

    createList();

    $('#applyDateStr').datebox({ request: true });
    $('#applyDateEnd').datebox({ request: true });

    $('#btnQuery').click(function () {
        createList();
    });

    $('#btnExportData').click(function () {
        alert('导出数据影响服务器性能，单次最多1000条');
        var uid = $('#txtSearch').val() || null;
        var startTime = dateBoxTimeToIntTime($('#applyDateStr').datebox("getValue")) || 0;
        var endTime = (dateBoxTimeToIntTime($('#applyDateEnd').datebox("getValue"))) || Date.now();
        endTime += (24 * 60 * 60 * 1000);
        var channel = $('#channel').val() || null;

        var matchData = {
            rechargeTime: { $gte: startTime, $lte: endTime }
        };
        if (!!uid) matchData.uid = uid;
        if (!!channel) matchData.channel = channel;

        apiAdminGetRecord("modifyInventoryValueRecordModel", 0, 1000, matchData, function (data) {
            var exportDataArr = [];
            for (var i = 0; i < data.msg.recordDataArr.length; ++i) {
                var recordData = data.msg.recordDataArr[i];
                var exportData = {
                    '用户ID': recordData.uid,
                    '充值金额': recordData.rechargeMoney,
                    '商品ID': recordData.purchaseItemID,
                    '充值平台': recordData.platform,
                    '订单ID': recordData.userOrderID,
                    '平台订单ID': recordData.platformReturnOrderID,
                    '充值时间': new Date(recordData.rechargeTime).toLocaleString()
                };
                exportDataArr.push(exportData);
            }
            JSONToExcelConvertor(exportDataArr, '充值记录', true);
        });
    });
});