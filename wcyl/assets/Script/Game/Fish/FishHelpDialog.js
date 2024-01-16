let fishConfig = require('./API/fishConfig');
cc.Class({
    extends: cc.Component,

    properties: {
        fishInfoItem: cc.Node
    },

    start () {
        for (let i = 0; i < fishConfig.fishType.length; ++i){
            let fishInfo = fishConfig.fishType[i];
            if(fishInfo.bomb || fishInfo.yiwangdajin){
                continue;
            }
            let node = cc.instantiate(this.fishInfoItem);
            if(fishInfo.minMultiple == fishInfo.maxMultiple){
                node.getChildByName("Label").getComponent(cc.Label).string = fishInfo.minMultiple + "倍";
            }else{
                node.getChildByName("Label").getComponent(cc.Label).string = fishInfo.minMultiple +'-'+fishInfo.maxMultiple + "倍";
            }
           
            let sprite = node.getChildByName("fishSprite").getComponent(cc.Sprite);
            let src ="Fish/help/fish_baike_" + fishInfo.resIndex;
            Global.CCHelper.updateSpriteFrame(src , sprite, function () {
                if (sprite.node.width > this.fishInfoItem.width - 10) {
                    sprite.node.scale = (this.fishInfoItem.width - 10)/sprite.node.width;
                }
            }.bind(this));
            node.active = true;
            node.parent = this.fishInfoItem.parent;
        }
        Global.CCHelper.createSpriteNode("Fish/help/baike_task_0").parent = this.fishInfoItem.parent;
        Global.CCHelper.createSpriteNode("Fish/help/baike_task_1").parent = this.fishInfoItem.parent;
        Global.CCHelper.createSpriteNode("Fish/help/baike_task_2").parent = this.fishInfoItem.parent;
    },

    onBtnClick(){
        Global.DialogManager.destroyDialog(this, true);
    }
});
