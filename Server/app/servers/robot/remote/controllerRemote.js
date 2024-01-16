var code = require('../../../constant/code');
var controllerManager = require('../domain/controllerManager');
var commonDao = require('../../../dao/commonDao');
var logger = require('pomelo-logger').getLogger('pomelo');

module.exports = function (app) {
    return new controllerRemote(app);
};

var controllerRemote = function (app) {
    this.app = app;
};
var pro = controllerRemote.prototype;

pro.getCurRobotWinRate = function(kind,level, cb){
    cb(null, controllerManager.getCurRobotWinRate(kind,level));
};

pro.robotGoldChanged = function (kind, count,level, cb) {
    controllerManager.robotGoldChanged(kind, count,level);
    cb();
};

pro.getGameControllerData = function (kindID,level, cb){
    cb(null, controllerManager.getGameControllerData(kindID,level));
};

pro.updateGameControllerData = function (kind,level, data, cb) {
    controllerManager.updateGameControllerData(kind,level, data, function (err) {
        cb(err);
    })
};

pro.modifyInventoryValue = function (uid, kind, count,roomLevel, cb) {
    if (!kind || (typeof count !== 'number')){
        cb(code.REQUEST_DATA_ERROR);
    }else{
        let gameControllerData = controllerManager.getGameControllerData(kind,roomLevel);
        if (!!gameControllerData){
            controllerManager.robotGoldChanged(kind, count,roomLevel);
            let saveData = {
                uid: uid,
                kind: kind,
                count: count,
                roomLevel:roomLevel,
                leftCount: gameControllerData.curInventoryValue+count,
                createTime: Date.now()
            };
            commonDao.createData("modifyInventoryValueRecordModel", saveData, function (err) {
                if(!!err){
                    logger.error("modifyInventoryValue err:" + err);
                }
            });
            cb(code.OK);
        }else{
            cb(code.REQUEST_DATA_ERROR);
        }
    }
};
