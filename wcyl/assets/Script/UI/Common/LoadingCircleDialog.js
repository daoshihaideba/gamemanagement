cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        circle: cc.Node,
        loadingBg: cc.Node,
        loadingGroup: cc.ProgressBar,
        progressText: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        this.loadingCoinAnimationNode = null;
        this.loadingState = false;

    },

    addLoadingCircle: function (needLoad, cb) {
        cc.log('显示loading');
        if(this.loadingState) return;
        this.node.active = true;
        if (needLoad) {
            this.loadingState = true;
            this.progressText.string = 0+'%';
            this.loadingBg.active = true;
            this.loadingGroup.node.active = true;
            var self =this;
            this.loadingGroup.progress = 0;
            cc.loader.loadResDir(needLoad, function (completedCount, totalCount) {
                self.loadingGroup.progress = completedCount/totalCount;
                self.progressText.string = (completedCount/totalCount * 100).toFixed(0) + '%';
            }, function (err) {
                if (err) {
                    console.error(err)
                } else {
                    cb && cb();
                }
            })
        } else {
            this.loadingBg.active = false;
            this.loadingGroup.node.active = false;
            if (!this.loadingCoinAnimationNode) {
                Global.Animation.createFrameAnimationNode("Loading/loading_coin", function (err, node) {
                    if (!err) {
                        this.loadingCoinAnimationNode = node;
                        this.loadingCoinAnimationNode.parent = this.node;
                        if (this.node.active) {
                            this.loadingCoinAnimationNode.startAnimation(true);
                        }
                    }
                }.bind(this));
            } else {
                this.loadingCoinAnimationNode.active = true;
                this.loadingCoinAnimationNode.startAnimation(true);
            }
        }

    },

    removeLoadingCircle: function () {
        cc.log('移除loading');

        // this.circle.stopAllActions();
        if (!!this.loadingCoinAnimationNode) {
            this.loadingCoinAnimationNode.stopAnimation();
            this.loadingCoinAnimationNode.active = false;
        }
        this.loadingState = false;
        this.node.active = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
