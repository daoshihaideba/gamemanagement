var messageCallback = require('./MessageCallback');

var pomelo = window.pomelo;

var networkManager = module.exports = {};

networkManager.init = function (params,cb) {
    pomelo.init({
        host: params.host,
        port: params.port,
        log: true
    }, cb);
};

networkManager.disconnect = function () {
    pomelo.disconnect();
};

networkManager.request = function (route, msg, cbSuccess, cbFail) {
    //console.log('Send:' + route);
    //console.log(msg);
    pomelo.request(route, msg, function (data) {
        //console.log('Receive:' + (((typeof cbSuccess) === 'string')?cbSuccess:route));
        //console.log(data);

        if (data.code !== Global.Code.OK) {
            Global.DialogManager.removeLoadingCircle();

            if (!!cbFail && (typeof (cbFail) === 'function')){
                cbFail(data);
                return;
            }
            if (!!Global.Code[data.code]) {
                Global.DialogManager.addPopDialog(Global.Code[data.code]);
            } else {
                Global.DialogManager.addPopDialog('游戏错误，错误码：' + data.code);
            }
        }else{
            if (!!cbSuccess){
                if (typeof(cbSuccess) === 'function') {
                    cbSuccess(data);
                }else{
                    messageCallback.emitMessage(cbSuccess, data);
                }
            }
        }
    });
};

networkManager.send = function (route, msg, cbRoute, cbFail) {
    this.request(route, msg, cbRoute, cbFail);
};

networkManager.notify = function (route, msg){
    //console.log('Notify:' + route);
    //console.log(msg);
    pomelo.notify(route, msg);
};

networkManager.addReceiveListen = function (route, cbRoute) {
    cbRoute = cbRoute || route;
    let pushCallback = function (msg) {
        if (!!cbRoute){
            //console.log('push:' + cbRoute);
            //console.log(msg);
            messageCallback.emitMessage(cbRoute, msg);
        }
    };
    pomelo.on(route, pushCallback);
    return pushCallback;
};

networkManager.removeListener = function (route, callback){
    pomelo.removeListener(route, callback);
};

networkManager.removeAllListeners = function (){
    pomelo.removeAllListeners();
};