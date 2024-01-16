
function createList(kindID,level) {
    if(level==null)  var level = parseInt($("#gameLevel").val() || 1);
    let requestData = {
        route: "getGameControllerData",
        kind: kindID,
        level:level
    };
    // 请求数据
    apiRetransmissionToGameServer(requestData,
        function (data) {
            let controlData = data.msg.recordArr[0];
            if (controlData) {
                $('#dataList').datagrid('loadData', controlData.robotWinRateArr);

                $("#startInventoryValue").val(controlData.curInventoryValue.toFixed(2));
                $("#minInventoryValue").val(controlData.minInventoryValue.toFixed(2));
                $("#extractionRatio").val(controlData.extractionRatio);

                $('#enable').val(!!controlData.robotEnable ? 1 : 0);
                $('#maxRobotCount').val(controlData.maxRobotCount);
            } else {
                $('#dataList').datagrid('loadData', []);

                $("#startInventoryValue").val("无数据");
                $("#minInventoryValue").val("无数据");
                $("#extractionRatio").val("无数据");

                $('#enable').val(0);
                $('#maxRobotCount').val("无数据");
            }
        });
}

function deleteData(info) {
    var dataList = $('#dataList');
    var rows = dataList.datagrid('getRows');
    for (var i = 0; i < rows.length; ++i) {
        if (rows[i].index === info.index) {
            rows.splice(i, 1);
            break;
        }
    }
    dataList.datagrid('loadData', rows);
}

function addData(info, cb) {
    var dataList = $('#dataList');
    var rows = dataList.datagrid('getRows');
    rows.push(info);
    rows.sort(function (a, b) {
        return a.inventoryValue - b.inventoryValue;
    });
    dataList.datagrid('loadData', rows);
    cb();
}

function updateData(info, cb) {
    var dataList = $('#dataList');
    var rows = dataList.datagrid('getRows');
    for (var i = 0; i < rows.length; ++i) {
        if (rows[i].index === info.index) {
            rows[i] = info;
            break;
        }
    }
    rows.sort(function (a, b) {
        return a.inventoryValue - b.inventoryValue;
    });
    dataList.datagrid('loadData', rows);
    cb();
}

function updateClick(index) {
    var rows = $('#dataList').datagrid('getRows');
    var info = rows[index];
    window.open('./gameControllerAdd.html?info=' + encodeURI(JSON.stringify(info)), "_blank", "height=400,width=800,scrollbars=no,location=no");
}

function execModify(kind,level, count, cb) {
    let data = {
        kind: kind,
        count: count,
        level:level,
        route: "modifyInventoryValue"
    };
    apiRetransmissionToGameServer(data, function (data) {
        if (data.code === 0) {
            cb();
            createList(kind,level);
        }
    })
}

$(document).ready(function () {
    var parameters = parseQueryString(window.location.href);
    var kindID = parseInt(parameters.gameType);
    var level = parseInt(parameters.level);
    // 初始化数据列名
    var dataList = $('#dataList');
    
    dataList.datagrid({
        nowrap: true,
        autoRowHeight: false,
        striped: true,
        pagination: true,
        showFooter: true,
        pageSize: 20,
        pageList: [20],
        rownumbers: true,
        onBeforeSelect: function () {
            return false;
        },
        singleSelect: true,
        columns: [[
            { field: 'ck', checkbox: true },
            {
                field: 'inventoryValue', title: '库存值',
                formatter: function (value, row, index) {
                    return '<a href="#" onclick="updateClick(' + index + ')" class="l">' + value + '</a>';
                }
            },
            {
                field: 'winRate', title: '胜率增加值',
                formatter: function (value) {
                    return Math.floor(value * 100).toString()
                }
            },
        ]]
    });

    createList(kindID,level);
    var select = $("#gameLevel");
    for (let x = 1; x < 9; x++) {
        option = '<option value ="' + x + '">';
        switch (x) {
            case 1:
                var text = '初级场';
                break;
            case 2:
                var text = '中级场';
                break;
            case 3:
                var text = '高级场';
                break;
            case 4:
                var text = '土豪场';
                break;
            case 5:
                var text = '财大气粗';
                break;
            case 6:
                var text = '腰缠万贯';
                break;
            case 7:
                var text = '挥金如土';
                break;
            case 8:
                var text = '富贵逼人';
                break;

        }
        option += text + '</option>';
        select.append(option);
    }
    $('#btnModify').click(function () {
        var enable = parseInt($('#enable').val()) === 1;
        var match = parseInt($('#match').val()) === 1;
        var maxRobotCount = parseInt($('#maxRobotCount').val() || "0");
        if (maxRobotCount < 0) {
            alert("机器人数量不能小于0");
            return;
        }

        var saveData = {
            kind: kindID,
            level:  parseInt($("#gameLevel").val() || 1),
            curInventoryValue: parseInt($("#startInventoryValue").val() || 0),
            minInventoryValue: parseInt($("#minInventoryValue").val() || 0),
            extractionRatio: parseFloat($("#extractionRatio").val() || 0),
            robotWinRateArr: $('#dataList').datagrid('getRows'),
            robotEnable: enable ? 1 : 0,
            robotMatchEnable: 1,
            maxRobotCount: maxRobotCount
        };
        let requestData = {
            route: "updateGameControllerData",
            kind: kindID,
            level:  parseInt($("#gameLevel").val() || 1),
            data: JSON.stringify(saveData)
        };
        apiRetransmissionToGameServer(requestData, function () {
            alert("修改成功");
            createList(kindID,parseInt($("#gameLevel").val() || 1));
        });
    });

    $('#btnAdd').click(function () {
        window.open('./gameControllerAdd.html', "_blank", "height=400,width=800,scrollbars=no,location=no");
    });

    $('#btnAddValue').click(function () {
        var level =   parseInt($("#gameLevel").val() || 1);
        window.open('./inventoryValueModify.html?kindID=' + kindID+'&level='+ level,"_blank", "height=200,width=800,scrollbars=no,location=no");
    });

    $('#btnDelete').click(function () {
        var rows = $('#dataList').datagrid('getChecked');
        if (rows.length > 0) {
            deleteData(rows[0]);
        } else {
            alert("请选择操作对象");
        }
    });
    $('#gameLevel').change(function(){
         var level = $(this).val();
         createList(kindID,level);
    });
});