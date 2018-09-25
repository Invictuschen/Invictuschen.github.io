/**
 * Created by Administrator on 2015/7/9.
 */

var setLayer = cc.LayerColor.extend({
    touchret:false,
    mheight:0,
    ctor:function () {
        this._super(cc.color(0,0,0,80),640,960);

        var bg=new cc.Scale9Sprite(res.caiquan_25);
        bg.width = 640;
        bg.height = 300;
        bg.x = 320;
        bg.y = 420+this.mheight;
        this.addChild(bg);

        var tit=new cc.Sprite(res.caiquan_48);
        tit.x=320;
        tit.y=530+this.mheight;
        this.addChild(tit);

        var bgmusic=cc.sys.localStorage.getItem("bgmusic");
        var esound=cc.sys.localStorage.getItem("esound");

        var musictxt = new cc.LabelTTF("游戏音乐：", "dht", 24);
        musictxt.color = cc.color(255, 255, 255);
        musictxt.x=100;
        musictxt.y=420;
        this.addChild(musictxt);
        var musiccheckBox = new ccui.CheckBox();
        musiccheckBox.setTouchEnabled(true);
        musiccheckBox.loadTextures(res.caiquan_49,
            res.caiquan_49,
            res.caiquan_50,
            res.caiquan_49,
            res.caiquan_50);
        musiccheckBox.x = 200;
        musiccheckBox.y = 420;
        musiccheckBox.addEventListener(this.musicSelected.bind(this), this);
        this.addChild(musiccheckBox);
        if(bgmusic=="1"){
            musiccheckBox.setSelected(true);
        }

        if(cc.sys.os == cc.sys.OS_ANDROID) {
            musictxt.x=100+200;
            musictxt.y=420;
            musiccheckBox.x = 200+200;
            musiccheckBox.y = 420;
        }else{
            var effecttxt = new cc.LabelTTF("游戏音效：", "dht", 24);
            effecttxt.color = cc.color(255, 255, 255);
            effecttxt.x=420;
            effecttxt.y=420;
            this.addChild(effecttxt);
            var effectcheckBox = new ccui.CheckBox();
            effectcheckBox.setTouchEnabled(true);
            effectcheckBox.loadTextures(res.caiquan_49,
                res.caiquan_49,
                res.caiquan_50,
                res.caiquan_49,
                res.caiquan_50);
            effectcheckBox.x = 520;
            effectcheckBox.y = 420;
            effectcheckBox.addEventListener(this.effectSelected.bind(this), this);
            this.addChild(effectcheckBox);
            //if(cc.sys.os === cc.sys.OS_ANDROID){
            //    alert("setEnabled");
            //    effectcheckBox.setEnabled(false);
            //}
            if(esound=="1"){
                effectcheckBox.setSelected(true);
            }
        }

        var menulist=new cc.Menu();
        menulist.x=0;
        menulist.y=0;
        this.addChild(menulist,5);
        var okBtn = new cc.MenuItemImage(res.caiquan_n5_1, res.caiquan_n5_2, this.okClick, this);
        okBtn.x=320;
        okBtn.y=280+this.mheight;
        menulist.addChild(okBtn);

        var oktxt=new cc.Sprite(res.caiquan_nwz_qd);
        oktxt.x=320;
        oktxt.y=280+this.mheight;
        this.addChild(oktxt,10);

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this)
        });
        cc.eventManager.addListener(listener, this);

        return true;
    },
    onTouchBegan: function (touch, event) {
        var pos = touch.getLocation();
        var target = event.getCurrentTarget();
        var locationInNode = target.convertToNodeSpace(pos);
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);

        if (cc.rectContainsPoint(rect, locationInNode)) {
            this.touchret=true;
            return true;
        }
        return false;
    },
    onTouchMoved: function (touch, event) {
        var pos = touch.getLocation();
    },
    onTouchEnded: function (touch, event) {
        //var pos = touch.getLocation();
        this.touchret=false;
    },
    musicSelected: function (sender, type) {
        switch (type) {
            case  ccui.CheckBox.EVENT_UNSELECTED:
                cc.log("musicUnselected");
                audioEngine.setMusicVolume(0);
                audioEngine.stopMusic();
                cc.sys.localStorage.setItem("bgmusic","0");//本地存储
                global.bgmusic=false;
                break;
            case ccui.CheckBox.EVENT_SELECTED:
                cc.log("musicSelected");
                audioEngine.setMusicVolume(0.3);
                MyFct.playbgmusic();
                cc.sys.localStorage.setItem("bgmusic","1");//本地存储
                break;

            default:
                break;
        }
    },
    effectSelected: function (sender, type) {
        switch (type) {
            case  ccui.CheckBox.EVENT_UNSELECTED:
                cc.log("effectUnselected");
                audioEngine.setEffectsVolume(0);
                cc.sys.localStorage.setItem("esound","0");//本地存储
                break;
            case ccui.CheckBox.EVENT_SELECTED:
                cc.log("effectSelected");
                audioEngine.setEffectsVolume(1);
                cc.sys.localStorage.setItem("esound","1");//本地存储
                break;

            default:
                break;
        }
    },
    okClick: function () {
        this.getParent().removeChild(this);
    }
});