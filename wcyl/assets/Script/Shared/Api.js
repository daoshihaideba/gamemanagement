/*
电话：400-187-6838
手机：13682427674 (WX)
QQ: 1718841401
武汉神彩信息技术有限公司  http://nmi.cn/（简称神彩）成立于2016年，是一家集研发、运营和销售为一体的网络彩票软件开发商与运营商。
*/
var Api = module.exports = {};

Api.hall = require('../API/HallAPI');
Api.account = require('../API/AccountAPI');
Api.room = require('../API/RoomAPI');
Api.http = require('../API/HttpAPI');

Api.roomProto = require('../API/RoomProto');