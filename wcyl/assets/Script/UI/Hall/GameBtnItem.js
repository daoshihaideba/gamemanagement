// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        imgBtn1: cc.Sprite,
        imgBtn2: cc.Sprite,
        loading: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
      this.loading.active = false;
    },

    updateUI: function (data, callback) {
        this.data = data;
        this.callback = callback;

        Global.CCHelper.updateSpriteFrame('Hall/btn_game_' + data.game1, this.imgBtn1);
        if (!!data.game2) {
            Global.CCHelper.updateSpriteFrame('Hall/btn_game_' + data.game2, this.imgBtn2);
        }
    },
    checkUpdate: function (kindId, node) {
        //子游戏热更新还没想好怎么写，先留着
        if (cc.sys.isNative) {
            var needLoad = null;
            switch (kindId) {
                case Global.Enum.gameType.ZJH:
                    needLoad = 'ZhaJinHua';
                    break;
                case Global.Enum.gameType.NN:
                    needLoad = 'Niuniu';

                    break;
                case Global.Enum.gameType.TTZ:
                    needLoad = 'TuiTongZi';

                    break;
                case Global.Enum.gameType.LHD:
                    needLoad = 'LongHuDou';

                    break;
                case Global.Enum.gameType.HHDZ:
                    needLoad = 'HongHeiDaZhan';

                    break;
                case Global.Enum.gameType.BJL:
                    needLoad = 'BaiJiaLe';

                    break;
                case Global.Enum.gameType.FISH:
                    needLoad = 'Fish';

                    break;
                case Global.Enum.gameType.SSS:
                    needLoad = 'ThirteenWater';

                    break;
                case Global.Enum.gameType.DDZ:
                    needLoad = 'DDZ';

                    break;
                case Global.Enum.gameType.BJ:
                    needLoad = 'BlackJack';

                    break;
                case Global.Enum.gameType.BRNN:
                    needLoad = 'BaiRenNiuNiu';

                    break;
                case Global.Enum.gameType.DZ:
                    needLoad = 'DeZhouPoker';

                    break;
                case Global.Enum.gameType.PDK:
                    needLoad = 'PaoDeKuai';

                    break;
                default:
                    this.callback(kindId);
                    return false;
            }
            this.loading.parent = node;
            this.loading.active = true;
            var gameloading = this.loading.getChildByName("gameloading");
            var text = this.loading.getChildByName("text").getComponent("cc.Label");
            gameloading.runAction(cc.repeatForever(cc.rotateBy(2, 360)));
            var self = this;
            // cc.loader.downloader.loadSubpackage(needLoad, function (completedCount, totalCount) {
            //     console.log(completedCount,totalCount)
            //     text.string = totalCount / completedCount;
            // }, function (err) {
            //     if (err) {
            //         return console.error(err);
            //     } else {
            //         if (!!self.callback) {
            //             self.callback(kindId);
            //         }
            //     }
            //     gameloading.stopAllActions();
            //     self.loading.active =false;
            //     //console.log('load subpackage successfully.');
            // });
        }else{
            this.callback(kindId);
        }


    },
    onBtnClk: function (event, param) {
        let game = '';
        switch (param) {
            case 'game1':
                game = this.data.game1;
                break;
            case 'game2':
                game = this.data.game2;
                break;
        }
        this.checkUpdate(game, event.target);

    }

    // start: function () {
    //
    // },

    // update (dt) {},
});
