var controllerManager = require('../domain/controllerManager');
var code = require('../../../constant/code');
var commonDao = require('../../../dao/commonDao');
var logger = require('pomelo-logger').getLogger('pomelo');

module.exports = function(app) {
    return new Handler(app);
};

var Handler = function(app) {
    this.app = app;
};

Handler.prototype.getGameControllerData = function (msg, session, next){
    next(null, {code: code.OK, msg: {data: controllerManager.getGameControllerData(msg.kindID,msg.level)}})
};

Handler.prototype.updateGameControllerData = function (msg, session, next) {
    controllerManager.updateGameControllerData(msg.data.kind,msg.data.level, msg.data, function (err) {
        next(null, {code: err||code.OK});
    })
};

Handler.prototype.modifyInventoryValue = function (msg, session, next) {
    if (!msg.kind || (typeof msg.count !== 'number')){
        next(null, {code: code.REQUEST_DATA_ERROR});
    }else{
        console.log(msg)
        let gameControllerData = controllerManager.getGameControllerData(msg.kind,msg.level);
        if (!!gameControllerData){
            controllerManager.robotGoldChanged(msg.kind, msg.count,msg.level);
            let saveData = {
                uid: session.uid,
                kind: msg.kind,
                count: msg.count,
                roomLevel:msg.level,
                leftCount: gameControllerData.curInventoryValue,
                createTime: Date.now()
            };
            commonDao.createData("modifyInventoryValueRecordModel", saveData, function (err) {
                if(!!err){
                    logger.error("modifyInventoryValue err:" + err);
                }
            });
            next(null, {code: code.OK});
        }else{
            next(null, {code: code.REQUEST_DATA_ERROR});
        }
    }
};