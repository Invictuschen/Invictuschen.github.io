/**
 * Created by Administrator on 2015/6/28.
 */

var resultLayer = cc.LayerColor.extend({
    touchret:false,
    type:null,
    mheight:60,
    ctor:function (type,wingold) {
        this._super(cc.color(0,0,0,80),640,960);

        this.type=type;

        var bg=new cc.Scale9Sprite(res.caiquan_25);
        bg.width = 640;
        bg.height = 200;
        bg.x = 320;
        bg.y = 400+this.mheight;
        this.addChild(bg);

        var menulist=new cc.Menu();
        menulist.x=0;
        menulist.y=0;
        this.addChild(menulist,5);

        var txt="",imgsrc=res.caiquan_31;
        var ss=this.getParent();
        if(this.type=="win"){
            audioEngine.playEffect(musics.s_10);
            var goldtxta = new cc.LabelTTF("恭喜！您可以兑换", "dht", 30);
            goldtxta.color = cc.color(255, 255, 255);
            goldtxta.x=240;
            goldtxta.y=410+this.mheight;
            this.addChild(goldtxta,50);

            var goldtxtb = new cc.LabelTTF(wingold+"", "dht", 30);
            goldtxtb.color = cc.color(255, 255, 0);
            goldtxtb.x=415;
            goldtxtb.y=410+this.mheight;
            this.addChild(goldtxtb,50);

            var goldtxtb = new cc.LabelTTF("奖金", "dht", 30);
            goldtxtb.color = cc.color(255, 255, 255);
            goldtxtb.x=500;
            goldtxtb.y=410+this.mheight;
            this.addChild(goldtxtb,50);

            imgsrc=res.caiquan_31;

            var exchangBtn = new cc.MenuItemImage(res.caiquan_n5_1, res.caiquan_n5_2, this.exchangClick, this);
            exchangBtn.x=160;
            exchangBtn.y=350+this.mheight;

            var exchangtxt=new cc.Sprite(res.caiquan_nwz_dhjl);
            exchangtxt.x=160;
            exchangtxt.y=350+this.mheight;

            var nextBtn = new cc.MenuItemImage(res.caiquan_n5_1, res.caiquan_n5_2, this.nextClick, this);
            nextBtn.x=480;
            nextBtn.y=350+this.mheight;

            var nexttxt=new cc.Sprite(res.caiquan_nwz_jrxyg);
            nexttxt.x=480;
            nexttxt.y=350+this.mheight;

            if(global.level>=10){
                exchangBtn.x=320;
                exchangtxt.x=320;
            }else{
                menulist.addChild(nextBtn);
                this.addChild(nexttxt,10);
            }
            menulist.addChild(exchangBtn);
            this.addChild(exchangtxt,10);

            var goldtxtm = new cc.LabelTTF("+"+wingold, "dht", 32);
            goldtxtm.color = cc.color(255, 255, 0);
            goldtxtm.x=415;
            goldtxtm.y=410+this.mheight;
            goldtxtm.setOpacity(1);
            this.addChild(goldtxtm,50);

            audioEngine.playEffect(musics.s_13);
            var fadein = cc.fadeIn(0.2);
            var actionto = cc.moveTo(0.5, cc.p(113, 286));
            var seqb = cc.sequence(fadein, actionto);
            goldtxtm.runAction(cc.sequence(seqb,cc.callFunc(function () {
                try{
                    this.removeChild(goldtxtm);
                }catch(e){}
                this.getParent().rushRound();
                this.touchret=true;
            }.bind(this))));
        }
        if(this.type=="draw"){
            audioEngine.playEffect(musics.s_11);
            var goldtxta = new cc.LabelTTF("打个平手！获得", "dht", 30);
            goldtxta.color = cc.color(255, 255, 255);
            goldtxta.x=250;
            goldtxta.y=410+this.mheight;
            this.addChild(goldtxta,50);

            var goldtxtb = new cc.LabelTTF(wingold+"", "dht", 30);
            goldtxtb.color = cc.color(255, 255, 0);
            goldtxtb.x=400;
            goldtxtb.y=410+this.mheight;
            this.addChild(goldtxtb,50);

            var goldtxtb = new cc.LabelTTF("分！", "dht", 30);
            goldtxtb.color = cc.color(255, 255, 255);
            goldtxtb.x=480;
            goldtxtb.y=410+this.mheight;
            this.addChild(goldtxtb,50);

            var goldtxtm = new cc.LabelTTF("+"+wingold, "dht", 32);
            goldtxtm.color = cc.color(255, 255, 0);
            goldtxtm.x=400;
            goldtxtm.y=410+this.mheight;
            this.addChild(goldtxtm,50);
            var fadein = cc.fadeIn(0.2);
            var actionto = cc.moveTo(0.5, cc.p(570, 780));
            var seqb = cc.sequence(fadein, actionto);
            goldtxtm.runAction(cc.sequence(seqb,cc.callFunc(function () {
                try{
                    this.removeChild(goldtxtm);
                }catch(e){}
                this.getParent().rushGold();
                this.touchret=true;
            }.bind(this))));

            imgsrc=res.caiquan_32;
        }
        if(this.type=="los"){
            audioEngine.playEffect(musics.s_12);
            txt="太遗憾了！再接再厉！";

            var goldtxt = new cc.LabelTTF(txt, "dht", 30);
            goldtxt.color = cc.color(255, 255, 255);
            goldtxt.x=320;
            goldtxt.y=410+this.mheight;
            this.addChild(goldtxt,50);

            imgsrc=res.caiquan_33;
            this.touchret=true;
        }

        var tit=new cc.Sprite(imgsrc);
        tit.setAnchorPoint(0.5,0);
        tit.x=320;
        tit.y=430+this.mheight;
        this.addChild(tit,5);

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
            return true;
        }
        return false;
    },
    onTouchMoved: function (touch, event) {
        if(!this.touchret){
            return;
        }
        var pos = touch.getLocation();
    },
    onTouchEnded: function (touch, event) {
        if(!this.touchret){
            return;
        }
        if(this.type!="win"&&this.touchret){
            this.touchret=false;
            var that=this;
            global.bettingstr+="("+global.bettingData[global.selectnum]+")#";//%23
            MyFct.Betting(function (ret,data) {
                // if(!ret){
                //     var txt="投注无效,网络连接失败，请重新进入游戏！";
                //     addPrompt(that,txt,true,that.closeClick);
                // }else{
                    var scene = new cc.Scene();
                    var layer = new tranLayer();
                    scene.addChild(layer);
                    cc.director.runScene(new cc.TransitionFade(0.3, scene));
                    that.getplaydata();
                // }
                cc.log("发送成功："+ret+"/data="+data);
            });

        }
    },
    exchangClick: function () {
        var that=this;
        global.bettingstr+="("+global.bettingData[global.selectnum]+")#";//%23
        MyFct.Betting(function (ret,data) {
            // if(!ret){
            //     var txt="投注无效,网络连接失败，请重新进入游戏！";
            //     addPrompt(that,txt,true,that.closeClick);
            // }else{
                var gold=that.getParent().wingold;
                global.mygold=(global.mygold+gold).toFixed(1);
                var scene = new cc.Scene();
                var layer = new mainLayer();
                scene.addChild(layer);
                cc.director.runScene(new cc.TransitionFade(1.2, scene));
                that.getplaydata();
            // }
            cc.log("发送成功："+ret+"/data="+data);
        });
    },
    getplaydata: function () {
        var that=this;
        cc.async.parallel([
            function(cb){
                MyFct.getPlayinfo(function (ret,data) {
                    if(data==""||!data){
                        cb(null, false);
                        return;
                    }
                    var Rdata=JSON.parse(JSON.parse(data)["return"]);
                    // if(ret){
                        var datajson=JSON.parse(Rdata["dataJSON"]);
                        if(!datajson&&Rdata["errorCode"]!="BD0"){
                            cb(null, false);
                            return;
                        }
                        global.username=datajson["name"];
                        global.mygold=datajson["usableBalance"];
                        cb(null, true);
                    // }else{
                    //     cc.log("获取数据报错，请重新进入游戏");
                    //     cb(null, false);
                    // }
                });
            },
            function(cb){
                MyFct.getPowerAndScore(function (ret,data) {
                    if(data==""||!data){
                        cb(null, false);
                        return;
                    }
                    var Rdata=JSON.parse(JSON.parse(data)["return"]);
                    // if(ret){
                        var datajson=JSON.parse(Rdata["dataJSON"]);
                        if(!datajson&&Rdata["errorCode"]!="BD0"){
                            cb(null, false);
                            return;
                        }
                        global.powerTime=datajson["powerTime"];
                        global.score=datajson["score"];
                        global.energy=MyFct.timToEnergy(datajson["powerTime"]);
                        cb(null, true);
                    // }else{
                    //     cc.log("获取数据报错，请重新进入游戏");
                    //     cb(null, false);
                    // }
                });
            }
        ], function(err, results){
            that.removeChild(global.warnlayer);
            global.warnlayer=null;
            // if(results[0]&&results[1]){
                var scene = new cc.Scene();
                var layer = new mainLayer();
                scene.addChild(layer);
                cc.director.runScene(new cc.TransitionFade(1.2, scene));
            // }else{
            //     var txt="投注无效,网络连接失败，请重新进入游戏！";
            //     addPrompt(that,txt,true,that.closeClick);
            // }

        });
    },
    nextClick: function () {
        if(global.level>=10){
            this.exchangClick();
            return;
        }
        global.level++;
        this.getParent().nextlevel();
        this.getParent().removeChild(this);
    },
    closeClick: function () {
        window.location.href="res/close.html?type=exit";
    }
});