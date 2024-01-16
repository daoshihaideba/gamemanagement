cc.Class({
    extends: cc.Component,

    properties: {
        goldAnimationWidgetPrefab: cc.Prefab,
        gainGoldLabelNode: cc.Node,
        fishExplosiveAnimationPrefab: cc.Prefab,
        bombLineAnimationPrefab: cc.Prefab,
        tideNoticeAnimationPrefab: cc.Prefab,
        bossIncomingAnimationPrefab:cc.Prefab,
        tideFrameAnimationPrefab:cc.Prefab,
        quanpingBomb:cc.Node,
        eff_get_moneyPrefab:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
       
        this.quanpingBomb.getComponent(dragonBones.ArmatureDisplay).addEventListener(dragonBones.EventObject.COMPLETE, function (event) {
            this.quanpingBomb.active = false;
        }, this);
        this.quanpingBomb.active = false;
    },

    fishCapture: function (gainGold, fishCtrl, gainCannonCtrl,r,num) {
        let fishTypeInfo = fishCtrl.fishTypeInfo;
        let pos = this.node.convertToNodeSpaceAR(fishCtrl.node.parent.convertToWorldSpaceAR(fishCtrl.node.position));
        let goldCount = (fishTypeInfo.minMultiple + Math.round(Math.random() * (fishTypeInfo.maxMultiple - fishTypeInfo.minMultiple))) / 10;
        if (goldCount < 5) goldCount = 5;
        let len = goldCount / 5 * 150;
        
        for (let i = 0; i < goldCount; ++i) {
            let node = cc.instantiate(this.goldAnimationWidgetPrefab);
            let offset = (Math.random() - 0.5) * len;
            node.position = new cc.Vec2(pos.x + offset, pos.y);
            node.parent = this.node;
            let ctrl = node.getComponent("SpriteFrameAnimationWidgetCtrl");
            ctrl.initAnimation();
            ctrl.startAnimation();
            let jumpAction = cc.jumpTo(1, node.position, 100, 2);
            let endPos = this.node.convertToNodeSpaceAR(gainCannonCtrl.getUserHeadWorldPos());
            let time = Global.Utils.getDist(node.position, endPos) / 2000;
            if (i === 0) {
                node.runAction(cc.sequence([cc.delayTime(i * 0.05), jumpAction, cc.delayTime(0.1), cc.moveTo(time, endPos), cc.callFunc(function () {
                    node.destroy();
                    if(r){
                        if(num>0){
                            gainCannonCtrl.goldChange(num, true);
                        }
                    }else{
                        gainCannonCtrl.goldChange(gainGold, true);
                    }
                    
                })]));
            } else {
                node.runAction(cc.sequence([cc.delayTime(i * 0.05), jumpAction, cc.delayTime(0.1), cc.moveTo(time, endPos), cc.removeSelf()]));
            }
        }
        Global.AudioManager.playSound("Fish/Sound/goldShow");
        // let goldLabelNode = cc.instantiate(this.gainGoldLabelNode);
        // goldLabelNode.active = true;
        // goldLabelNode.parent = this.node;
        // goldLabelNode.position = pos;
        // goldLabelNode.y += 100;
        // goldLabelNode.getComponent(cc.Label).string = "+" + parseFloat(gainGold.toFixed(2));
        // goldLabelNode.runAction(cc.sequence([cc.delayTime(1), cc.fadeTo(0.5, 0), cc.removeSelf()]));
    },
    quanpingBombAnimation:function(call){
       this.quanpingBomb.active = true;
       this.quanpingBomb.getComponent(dragonBones.ArmatureDisplay).playAnimation("action",1);
       Global.AudioManager.playSound("Fish/Sound/bomb");
       this.quanpingBomb.runAction(cc.sequence(cc.delayTime(2),cc.callFunc(function(){
          call && call();
       })))
    },
    fishCaptureGoldCount: function (fishCtrl, gainGold) {
        if(!gainGold) return;
        Global.AudioManager.playSound("Fish/Sound/fishdiescore");
        var pos = this.node.convertToNodeSpaceAR(fishCtrl.node.parent.convertToWorldSpaceAR(fishCtrl.node.position));
        var goldLabelNode = cc.instantiate(this.gainGoldLabelNode);
        goldLabelNode.active = true,
        goldLabelNode.parent = this.node,
        goldLabelNode.position = pos,
        goldLabelNode.y += 50,
        goldLabelNode.getComponent(cc.Label).string = "+" + parseFloat(gainGold.toFixed(2)),
        goldLabelNode.scale = 0.01;
        var action = cc.scaleTo(0.2, 1);
        action.easing(cc.easeBackOut()),
        goldLabelNode.runAction(cc.sequence([action, cc.delayTime(1), cc.fadeTo(0.5, 0), cc.removeSelf()]))
    },
    eff_get_moneyAnimation: function(num){
        let eff_get_money = cc.instantiate(this.eff_get_moneyPrefab);
        eff_get_money.parent = this.node;
        eff_get_money.getChildByName("goldChange").getComponent("cc.Label").string = num;
        eff_get_money.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).playAnimation("eff_get_money",1);
        Global.AudioManager.playSound("Fish/Sound/Bigdie01");
        eff_get_money.runAction(cc.sequence(cc.delayTime(3),cc.removeSelf()));
    },
    
    //爆炸
    bigFishCapture: function (fishCtrl) {
        if (fishCtrl.fishTypeInfo.fishBoomEffect) {
            let x = Global.Utils.getRandomNum(1,4);
            if(Global.Utils.getRandomNum(0,1)){
                Global.AudioManager.playSound("Fish/Sound/F_die0"+x);
            }else{
                Global.AudioManager.playSound("Fish/Sound/M_die0"+x);
            }
            var node = cc.instantiate(this.fishExplosiveAnimationPrefab);
            node.position = this.node.convertToNodeSpaceAR(fishCtrl.node.parent.convertToWorldSpaceAR(fishCtrl.node.position));
            node.parent = this.node;
            var Ctrl = node.getComponent("SpriteFrameAnimationWidgetCtrl");
            Ctrl.initAnimation();
            Ctrl.startAnimation(false);
            node.runAction(cc.sequence([cc.scaleTo(0.4, 3), cc.removeSelf()]));
        }
    },
    //鱼潮提示
    tideNotice: function (time) {
        var node = cc.instantiate(this.tideNoticeAnimationPrefab);
        node.parent = this.node;
        var Ctr = node.getComponent(dragonBones.ArmatureDisplay);
        Ctr.playAnimation("action",1);
        node.runAction(cc.sequence([cc.delayTime(time), cc.removeSelf()]));
    },
    //潮水动画
    tideFrame: function () {
        var node = cc.instantiate(this.tideFrameAnimationPrefab);
        node.x = this.node.parent.width / 2 + node.width / 2;
        node.parent = this.node;
        var Ctrl = node.getComponent("SpriteFrameAnimationWidgetCtrl");
        Ctrl.initAnimation();
        Ctrl.startAnimation(true);
        node.runAction(cc.sequence([cc.moveTo(1, cc.v2(- 1 * node.x, 0)),cc.delayTime(2), cc.removeSelf()]));
    },
    bossIncoming: function () {
        Global.AudioManager.playSound("Fish/Sound/bosscoming");
        var node = cc.instantiate(this.bossIncomingAnimationPrefab);
        node.parent = this.node;
        var Ctr = node.getComponent(dragonBones.ArmatureDisplay);
        Ctr.playAnimation("action",1);
        node.runAction(cc.sequence([cc.delayTime(5), cc.removeSelf(),cc.callFunc(function(){
            Global.AudioManager.startPlayBgMusic("Fish/Sound/boss");
        },this)]));
    },
    //爆炸线
    multipleFishCapture: function (fishCtrl) {
        Global.AudioManager.playSound("Fish/Sound/slotr");
        for (var x = 0; x < fishCtrl.length - 1; ++x) {
            var pos1 = this.node.convertToNodeSpaceAR(fishCtrl[x].node.parent.convertToWorldSpaceAR(fishCtrl[x].node.position));
            var pos2 = this.node.convertToNodeSpaceAR(fishCtrl[x + 1].node.parent.convertToWorldSpaceAR(fishCtrl[x + 1].node.position));
            var node = cc.instantiate(this.bombLineAnimationPrefab);
            node.position = pos1;
            node.height = Global.Utils.getDist(pos1, pos2);
            var o = Global.Utils.getUnitVector(pos1, pos2);
            var rotation = Math.acos(o.x) / Math.PI * -180;
            o.y < 0 && (rotation *= -1);
            rotation += 90;
            node.rotation = rotation;
            node.parent = this.node;
            var ctrl = node.getComponent("SpriteFrameAnimationWidgetCtrl");
            ctrl.initAnimation();
            ctrl.startAnimation(true);
            node.getChildByName("bombHead").runAction(cc.repeatForever(cc.rotateBy(0.5, 360)));
            node.runAction(cc.sequence([cc.delayTime(1.5), cc.removeSelf()]));
        }
    }
    // update (dt) {},
});
