//添加弹出框
function addPrompt(obj,txt,ret,callback) {
    if(global.warnlayer){
        return;
    }
    global.warnlayer=true;
    global.warnlayer=new cc.LayerColor(cc.color(0,0,0,80),640,960);
    obj.addChild(global.warnlayer,100);

    var bg=new cc.Scale9Sprite(res.caiquan_25);
    bg.width = 640;
    bg.height = 240;
    bg.x = 320;
    bg.y = 480;
    global.warnlayer.addChild(bg);

    var warntxt = new cc.LabelTTF(txt, "dht", 30);
    warntxt.color = cc.color(255, 255, 255);
    warntxt.x=320;
    warntxt.y=500;
    global.warnlayer.addChild(warntxt,10);
    if(ret){
        var menulist=new cc.Menu();
        menulist.x=0;
        menulist.y=0;
        global.warnlayer.addChild(menulist,5);
        var okBtn = new cc.MenuItemImage(res.caiquan_n5_3, res.caiquan_n5_4, callback, obj);
        okBtn.x=320;
        okBtn.y=420;
        menulist.addChild(okBtn);

        var oktxt=new cc.Sprite(res.caiquan_nwz_tcyx);
        oktxt.x=320;
        oktxt.y=420;
        global.warnlayer.addChild(oktxt,10);
    }
};
var startLayer = cc.Layer.extend({
    statu:0,
    netstatu:0,
    warnlayer:false,
    ctor:function () {
        this._super();

        this.mainscene = ccs.load(res.StartScene_json);
        this.addChild(this.mainscene.node);

        var shark=this.mainscene.action;
        this.mainscene.node.runAction(shark);
        shark.play("animation0",true);

        this.startgamebtn = ccui.helper.seekWidgetByName(this.mainscene.node, "startgame");
        this.startgamebtn.addTouchEventListener(this.startgame,this);
        //this.startgamebtn.setEnabled(false);

        //单独加载音乐文件
        cc.loader.load(musiclist,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                cc.log("Loading music... " + percent + "%");
            }, function () {
                cc.log("music...1000");
                audioEngine.stopAllEffects();
                audioEngine.playMusic(musics.bgmusic,true);
            });

        return true;
    },
    getplayerdata: function () {
        this.statu=0;
        this.netstatu=0;
        MyFct.getPlayinfo(function (ret,data) {
           this.statu++;
           if(this.statu==2){
               this.addbtn();
           }
           if(data==""||!data){
               return;
           }
           var Rdata=JSON.parse(JSON.parse(data)["return"]);
           // if(ret){
               var datajson=JSON.parse(Rdata["dataJSON"]);
               if(!datajson&&Rdata["errorCode"]!="BD0"){
                   return;
               }
               this.netstatu++;
               global.username=datajson["name"];
               global.mygold=datajson["usableBalance"];

           // }else{
           //     cc.log("获取数据报错，请重新进入游戏");
           // }
        }.bind(this));
        MyFct.getPowerAndScore(function (ret,data) {
           this.statu++;
           if(this.statu==2){
               this.addbtn();
           }
           if(data==""||!data){
               return;
           }
           var Rdata=JSON.parse(JSON.parse(data)["return"]);
           // if(ret){
               var datajson=JSON.parse(Rdata["dataJSON"]);
               if(!datajson&&Rdata["errorCode"]!="BD0"){
                   return;
               }
               this.netstatu++;
               global.powerTime=datajson["powerTime"];
               global.score=datajson["score"];
               global.energy=MyFct.timToEnergy(datajson["powerTime"]);
           // }else{
           //     cc.log("获取数据报错，请重新进入游戏");
           // }
        }.bind(this));

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
            //     var txt="网络连接失败，请重新进入游戏！";
            //     addPrompt(that,txt,true,that.okClick);
            // }

        });
    },
    okClick: function () {
        this.removeChild(global.warnlayer);
        global.warnlayer=null;
        window.location.href="res/close.html?type=exit";
    },
    startgame: function (sender, type) {
        if(global.warnlayer){
            return;
        }
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                MyFct.playbgmusic();
                audioEngine.playEffect(musics.s_1);

                var txt="连接网络中……";
                addPrompt(this,txt,false,null);
                this.getplayerdata();

                break;
            default:
                break;
        }
    }
});

var startScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        // var layer = new startLayer();
        var layer = new mainLayer();
        this.addChild(layer);
        //MyFct.playbgmusic();
    }
});

