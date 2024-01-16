var api = module.exports;

api.roomMessageNotify = function (data){
    var router = 'game.gameHandler.roomMessageNotify';
    Global.NetworkManager.notify(router, data);

};

api.gameMessageNotify = function (data){
    var router = 'game.gameHandler.gameMessageNotify';
    Global.NetworkManager.notify(router, data);

};
