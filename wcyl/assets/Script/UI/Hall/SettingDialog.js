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
        progressMusic: cc.ProgressBar,
        sliderMusic: cc.Slider,
        progressSound: cc.ProgressBar,
        sliderSound: cc.Slider
    },

    // use this for initialization
    onLoad: function () {
        var musicVolume = cc.sys.localStorage.getItem('MusicVolume');
        var soundVolume = cc.sys.localStorage.getItem('SoundVolume');
		if(this.dialogParameters) {
			this.callback = this.dialogParameters.callback;
			if(this.dialogParameters.rotate) {
				this.node.getChildByName('mask').rotation = 90;
				this.node.rotation = 90;
			}
		}

        this.progressMusic.progress = musicVolume;
        this.sliderMusic.progress = musicVolume;
        this.progressSound.progress = soundVolume;
        this.sliderSound.progress = soundVolume;
    },

    onBtnClk: function (event, param) {
        switch (param) {
            case 'close':
            case 'confirm':
                Global.DialogManager.destroyDialog(this);
                break;
            case 'music_slider':
                this.progressMusic.progress = event.progress;
                Global.AudioManager.setMusicVolume(this.progressMusic.progress);
				if(this.callback) {
					this.callback();
				}
                break;
            case 'sound_slider':
                this.progressSound.progress = event.progress;
                Global.AudioManager.setSoundVolume(this.progressSound.progress);
				if(this.callback) {
					this.callback();
				}
                break;
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
