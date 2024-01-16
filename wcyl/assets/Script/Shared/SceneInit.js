cc.Class({
    extends: cc.Component,

    properties: {
        sceneType: '',
        initText: cc.Label,
        initGroup: cc.Node
    },

    initGlobal: function(){
        this.initText.string = '初始化中';

        Global.Constant = require('./Constant');
        Global.MessageCallback = require('./MessageCallback');
        Global.DialogManager = require('./DialogManager');
        Global.AudioManager = require('./AudioManager');
        Global.NetworkManager = require('./NetworkManager');

        Global.CCHelper = require('./CCHelper');
        Global.Utils = require('./utils');

        Global.NetworkLogic = require('./NetworkLogic');

        Global.Enum = require('./enumeration');
        Global.Code = require('./code');

        Global.API = require('./Api');

        Global.Player = require('../Models/Player');
        Global.PlayerWechat = require('../Models/PlayerWechat');
        Global.GameTypes = require('../Models/GameTypes');
        Global.Data = require('../Models/Data');

        Global.Animation = require('./Animation');
        Global.AgentProfit = require('../Models/AgentProfit');
    },

    onLoad: function () {
        // 初始设置
        cc.debug.setDisplayStats(false);
        //cc.game.setFrameRate(30);
        // 初始化全局变量
        this.initGlobal();
        // 适配处理
        Global.CCHelper.screenAdaptation(new cc.Size(1280, 720), this.node.getComponent(cc.Canvas));

        // 初始化界面管理器
        Global.DialogManager.init(this.node);

        //音乐音效初始化
        Global.AudioManager.init();

        // 初始化网络
        Global.NetworkLogic.init();

        cc.game.on(cc.game.EVENT_HIDE, this.onEventHide.bind(this));
        cc.game.on(cc.game.EVENT_HIDE, this.onEventShow.bind(this));

        if (false && cc.sys.isNative) {
            Global.DialogManager.createDialog('Update/UpdateDialog', {cb: function () {
                this.enterGame();
            }.bind(this)});
        } else {
            this.enterGame();
        }
    },

    onDestroy: function () {
        cc.game.off(cc.game.EVENT_HIDE, this.onEventHide.bind(this));
        cc.game.off(cc.game.EVENT_HIDE, this.onEventShow.bind(this));

        Global.NetworkLogic.deInit();
    },

    onEventHide: function () {
        Global.MessageCallback.emitMessage("GAME_EVENT", cc.game.EVENT_HIDE);
    },

    onEventShow: function () {
        Global.MessageCallback.emitMessage("GAME_EVENT", cc.game.EVENT_SHOW);
    },

    enterGame: function () {
        let cb = function () {
            this.initGroup.destroy();
        }.bind(this);

        if (Global.CCHelper.isWechatBrowser()) {
            Global.GameTypes.setState(this.locationParams.state);
            Global.DialogManager.createDialog('Login/LoginDialog', null, cb);
        } else {
            Global.GameTypes.setState(this.sceneType);
            Global.DialogManager.createDialog('Login/LoginDialog', null, cb);
        }
    }
});
