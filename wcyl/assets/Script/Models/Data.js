/*
电话：400-187-6838
手机：13682427674 (WX)
QQ: 1718841401
武汉神彩信息技术有限公司  http://nmi.cn/（简称神彩）成立于2016年，是一家集研发、运营和销售为一体的网络彩票软件开发商与运营商。
*/
var Data = module.exports = {};

Data.init = function (datas) {
    this.setDatas(datas);
};

Data.getData = function (key) {
    return this[key];
};

Data.setDatas = function (datas) {
    for (var key in datas) {
        if (datas.hasOwnProperty(key)) {
            this[key] = datas[key];
        }
    }
};
