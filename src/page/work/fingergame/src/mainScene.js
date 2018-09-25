/**
 * Created by Administrator on 2015/6/24.
 */
var mainLayer = cc.Layer.extend({
    touchret:true,
    wingold:0,//回合赢的金币
    betting:0.0,//回合投注金币
    playtype:0,
    gesture:null,
    defgesture:null,
    recordret:false,
    gesturedata:[res.caiquan_36,res.caiquan_34,res.caiquan_35],
    recordData:null,
    ctor:function () {
        this._super();

        global.level=1;
        global.bettingstr="";
        this.recordData=[];

        this.mainscene = ccs.load(res.MainScene_json);
        this.addChild(this.mainscene.node);

        var shark=this.mainscene.action;
        this.mainscene.node.runAction(shark);

        this.defenseffect = ccui.helper.seekWidgetByName(this.mainscene.node, "defenseffect");
        this.attackeffect = ccui.helper.seekWidgetByName(this.mainscene.node, "attackeffect");
        //this.defenseffect.visible = false;
        this.attackeffect.visible = false;

        var closebtn = ccui.helper.seekWidgetByName(this.mainscene.node, "closebtn");
        closebtn.addTouchEventListener(this.closeClick,this);
        
        var defensebtn = ccui.helper.seekWidgetByName(this.mainscene.node, "defensebtn");
        defensebtn.addTouchEventListener(this.defenseClick,this);

        var attackbtn = ccui.helper.seekWidgetByName(this.mainscene.node, "attackbtn");
        attackbtn.addTouchEventListener(this.attackClick,this);

        this.defensetit = ccui.helper.seekWidgetByName(this.mainscene.node, "defensetit");
        this.defensetit.addTouchEventListener(this.defenseClick,this);
        this.attacktit = ccui.helper.seekWidgetByName(this.mainscene.node, "attacktit");
        this.attacktit.addTouchEventListener(this.attackClick,this);

        var startbtn = ccui.helper.seekWidgetByName(this.mainscene.node, "startbtn");
        startbtn.addTouchEventListener(this.startClick,this);

        this.recordbtn = ccui.helper.seekWidgetByName(this.mainscene.node, "recordbtn");
        this.recordbtn.addTouchEventListener(this.recordClick,this);
        this.recordtxt = ccui.helper.seekWidgetByName(this.mainscene.node, "recordtxt");

        var shitoubtn = ccui.helper.seekWidgetByName(this.mainscene.node, "shitoubtn");
        shitoubtn.addTouchEventListener(this.selectType.bind(this,0),this);
        var bubtn = ccui.helper.seekWidgetByName(this.mainscene.node, "bubtn");
        bubtn.addTouchEventListener(this.selectType.bind(this,1),this);
        var jiandaobtn = ccui.helper.seekWidgetByName(this.mainscene.node, "jiandaobtn");
        jiandaobtn.addTouchEventListener(this.selectType.bind(this,2),this);

        var helpbtn = ccui.helper.seekWidgetByName(this.mainscene.node, "gameinfobtn");
        helpbtn.addTouchEventListener(this.helpLayer,this);
        var setbtn = ccui.helper.seekWidgetByName(this.mainscene.node, "setbtn");
        setbtn.addTouchEventListener(this.setLayer,this);

        //选择手势的背景
        this.selectbg=new cc.Sprite(res.caiquan_41);
        this.selectbg.x=-100;
        this.selectbg.y=90;
        this.addChild(this.selectbg,10);
        //手势
        this.Gestureobj=new cc.Sprite(res.caiquan_36);
        this.Gestureobj.x=150;
        this.Gestureobj.y=510;
        this.Gestureobj.setScaleX(-1);
        this.addChild(this.Gestureobj,10);

        var layer = new sgoldLayer();
        this.addChild(layer,100);

        this.recordlayer=new cc.LayerColor(cc.color(0,0,0,160),640,220);
        this.recordlayer.x=-640;
        this.recordlayer.y=0;
        this.addChild(this.recordlayer,20);

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this)
        });
        cc.eventManager.addListener(listener, this.recordlayer);

        this.rushGold();
        this.rushRound();


        this.changeEnergy(false);
        if(global.energy<global.reduceEnergy){
            var layer = new warnLayer();
            this.addChild(layer,100);
        }

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
    changeEnergy: function (ret) {
        if(ret){
            if(global.energy<global.reduceEnergy){
                var layer = new warnLayer();
                this.addChild(layer,100);
                return;
            }
            global.energy-=global.reduceEnergy;

            var energytxt = new cc.LabelTTF("-"+global.reduceEnergy, "dht", 32);
            energytxt.color = cc.color(255, 0, 0);
            energytxt.x=200;
            energytxt.y=820;
            energytxt.setOpacity(1);
            this.addChild(energytxt,50);

            var fadein = cc.fadeIn(0.2);
            var actionto = cc.moveTo(0.3, cc.p(240, 820));
            var seqb = cc.sequence(fadein, actionto);
            energytxt.runAction(cc.sequence(seqb,cc.delayTime(0.5),cc.callFunc(function () {
                try{
                    this.removeChild(energytxt);
                }catch(e){}
            }.bind(this))));
        }
        //能量进度条
        var Loading0 = ccui.helper.seekWidgetByName(this.mainscene.node, "Loading0");
        var loadtxt0 = ccui.helper.seekWidgetByName(this.mainscene.node, "loadtxt0");
        Loading0.setPercent(global.energy);
        loadtxt0.setString(global.energy+"/100");
    },
    rushGold: function () {
        global.mygold=Math.round(global.mygold*10)/10;
        global.score=Math.round(global.score*10)/10;
        //金币
        var glodtxt = ccui.helper.seekWidgetByName(this.mainscene.node, "glodtxt");
        glodtxt.setString(global.mygold);
        //积分
        var pointstxt = ccui.helper.seekWidgetByName(this.mainscene.node, "pointstxt");
        pointstxt.setString(global.score);
    },
    rushRound: function () {
        this.wingold=Math.round(this.wingold*10)/10;
        //回合赢的金币
        var winglodtxt = ccui.helper.seekWidgetByName(this.mainscene.node, "winglodtxt");
        winglodtxt.setString(this.wingold);
        //回合押注
        var bettingtxt = ccui.helper.seekWidgetByName(this.mainscene.node, "bettingtxt");
        bettingtxt.setString(this.betting);
    },
    defenseClick: function (sender, type) {
        if(!this.touchret||this.defGestureobj){
            return;
        }
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this.playtype=0;
                this.Gestureobj.setPosition(150,510);
                this.Gestureobj.setScaleX(-1);
                this.defenseffect.visible = true;
                this.attackeffect.visible = false;
                audioEngine.playEffect(musics.s_4);
                break;
            default:
                break;
        }
    },
    attackClick: function (sender, type) {
        if(!this.touchret||this.defGestureobj){
            return;
        }
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                this.playtype=1;
                this.Gestureobj.setPosition(490,510);
                this.Gestureobj.setScaleX(1);
                this.defenseffect.visible = false;
                this.attackeffect.visible = true;
                audioEngine.playEffect(musics.s_4);
                break;
            default:
                break;
        }
    },
    startClick: function (sender, type) {
        if(!this.touchret){
            return;
        }
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                audioEngine.playEffect(musics.s_7);
                if(typeof this.gesture=="number"){
                    if(global.level===1){
                        var closebtn = ccui.helper.seekWidgetByName(this.mainscene.node, "closebtn");
                        var closetxt = ccui.helper.seekWidgetByName(this.mainscene.node, "closetxt");
                        closebtn.visible = false;
                        closetxt.visible = false;
                        if(global.energy<global.reduceEnergy){
                            var layer = new warnLayer();
                            this.addChild(layer,100);
                            return;
                        }else{
                            this.changeEnergy(true);
                        }
                    }
                    this.rushGold();

                    this.touchret=false;
                    this.mainscene.action.gotoFrameAndPause(0);
                    this.defgesture=parseInt(Math.random()*3);
                    //对手手势

                    this.defGestureobj=new cc.Sprite(res.caiquan_36);
                    this.addChild(this.defGestureobj,10);

                   var sound8=audioEngine.playEffect(musics.s_8,true);

                    if(this.playtype==1){
                        this.defGestureobj.x=150;
                        this.defGestureobj.y=510;
                        this.defGestureobj.setScaleX(-1);

                        var actionBy = cc.moveBy(0.2, cc.p(10, 15));
                        var actionByBack = actionBy.reverse();
                        var seq = cc.sequence(actionBy, actionByBack).repeat(3);
                        var action = cc.sequence(seq,cc.callFunc(function(){
                            audioEngine.stopEffect(sound8);
                            this.Gestureobj.initWithFile(this.gesturedata[this.gesture]);
                            this.defGestureobj.initWithFile(this.gesturedata[this.defgesture]);
                            audioEngine.playEffect(musics.s_9);
                        }.bind(this)),cc.delayTime(0.5),cc.callFunc(this.showResult.bind(this)));
                        this.Gestureobj.runAction(action);

                        var actionByb = cc.moveBy(0.2, cc.p(-10, 15));
                        var actionByBackb = actionByb.reverse();
                        var seqb = cc.sequence(actionByb, actionByBackb).repeat(3);
                        this.defGestureobj.runAction(seqb);
                    }else{
                        this.defGestureobj.x=490;
                        this.defGestureobj.y=510;
                        var actionBy = cc.moveBy(0.2, cc.p(10, 15));
                        var actionByBack = actionBy.reverse();
                        var seq = cc.sequence(actionBy, actionByBack).repeat(3);
                        var action = cc.sequence(seq,cc.callFunc(function () {
                            audioEngine.stopEffect(sound8);
                            this.Gestureobj.initWithFile(this.gesturedata[this.gesture]);
                            this.defGestureobj.initWithFile(this.gesturedata[this.defgesture]);
                            audioEngine.playEffect(musics.s_9);
                        }.bind(this)),cc.delayTime(0.5),cc.callFunc(this.showResult.bind(this)));
                        this.defGestureobj.runAction(action);

                        var actionByb = cc.moveBy(0.2, cc.p(-10, 15));
                        var actionByBackb = actionByb.reverse();
                        var seqb = cc.sequence(actionByb, actionByBackb).repeat(3);
                        this.Gestureobj.runAction(seqb);
                    }
                }else{
                    this.mainscene.action.play("animation0",false);
                }
                break;
            default:
                break;
        }
    },
    addRecords: function (type) {
        var leng=this.recordData.length-1;
        var numx=parseInt(leng%3);
        var numy=parseInt(leng/3);
        //for(var i=0;i<9;i++){
        //    numx=parseInt(i%3);
        //    numy=parseInt(i/3);

        var records=new cc.Sprite(res.caiquan_22);
        records.x=110+numx*210;
        records.y=180-numy*70;
        this.recordlayer.addChild(records);

        var  ordernum= new cc.LabelTTF((this.recordData.length)+"", "dht", 24);
        ordernum.color = cc.color(255, 255, 255);
        ordernum.x=40+numx*210;
        ordernum.y=180-numy*70;
        this.recordlayer.addChild(ordernum);

        var myobj=new cc.Sprite(this.gesturedata[this.recordData[leng][0]]);
        myobj.x=95+numx*210;
        myobj.y=180-numy*70;
        myobj.setScale(-0.2,0.2);
        this.recordlayer.addChild(myobj);

        var vsobj=new cc.Sprite(res.caiquan_23);
        vsobj.x=140+numx*210;
        vsobj.y=180-numy*70;
        //vsobj.setScale(0.2);
        this.recordlayer.addChild(vsobj);

        var defobj=new cc.Sprite(this.gesturedata[this.recordData[leng][1]]);
        defobj.x=175+numx*210;
        defobj.y=180-numy*70;
        defobj.setScale(0.2);
        this.recordlayer.addChild(defobj);
        //}
        var btimg="";
        switch (this.recordData[leng][0]){
            case 0:
                btimg+=1;
                break;
            case 1:
                btimg+=3;
                break;
            case 2:
                btimg+=2;
                break;
            default :
                break;
        }
        switch (type){
            case "win":
                btimg+=1;
                break;
            case "draw":
                btimg+=2;
                break;
            case "los":
                btimg+=3;
                break;
            default :
                break;
        }
        global.bettingstr+=btimg;

    },
    selectType: function (selectType, sender, type) {
        if(!this.touchret){
            return;
        }
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                audioEngine.playEffect(musics.s_6);
                if(selectType==0){
                    this.selectbg.setPosition(110,90);
                }
                if(selectType==1){
                    this.selectbg.setPosition(320,90);
                }
                if(selectType==2){
                    this.selectbg.setPosition(530,90);
                }
                this.gesture=selectType;
                this.mainscene.action.gotoFrameAndPause(0);
                break;
            default:
                break;
        }
    },
    recordClick: function (sender, type) {
        cc.log("recordClick");
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                if(this.recordret){
                    this.recordret=false;
                    this.recordlayer.stopAllActions();
                    var actionTo = cc.moveTo(0.3, cc.p(-640, 0));
                    this.recordlayer.runAction(actionTo);
                    this.recordbtn.setScaleX(1);
                    this.recordtxt.setString("点击查看");
                }else{
                    this.recordret=true;
                    this.recordlayer.stopAllActions();
                    var actionTo = cc.moveTo(0.3, cc.p(0, 0));
                    this.recordlayer.runAction(actionTo);
                    this.recordbtn.setScaleX(-1);
                    this.recordtxt.setString("点击退出");
                }
                break;
            default:
                break;
        }
    },
    showResult: function () {
        this.recordData.push([this.gesture,this.defgesture]);

        var type="win";
        if(this.gesture==0&&this.defgesture==0){
            type="draw";
        }
        if(this.gesture==0&&this.defgesture==1){
            type="los";
        }
        if(this.gesture==0&&this.defgesture==2){
            type="win";
        }
        if(this.gesture==1&&this.defgesture==0){
            type="win";
        }
        if(this.gesture==1&&this.defgesture==1){
            type="draw";
        }
        if(this.gesture==1&&this.defgesture==2){
            type="los";
        }
        if(this.gesture==2&&this.defgesture==0){
            type="los";
        }
        if(this.gesture==2&&this.defgesture==1){
            type="win";
        }
        if(this.gesture==2&&this.defgesture==2){
            type="draw";
        }
        var nwingold=0;
        if(type=="win"){
            nwingold=this.betting*Math.pow(2,global.level);
            //this.wingold+=nwingold;
            this.wingold=nwingold;
            this.rushRound();
        }else{
            this.wingold=0;
            this.rushRound();
            this.betting=0;
        }
        if(type=="draw"){
            nwingold=0.5*global.bettingData[global.selectnum]*Math.pow(2,global.level);
            global.score+=nwingold;
        }
        this.addRecords(type);

        var layer = new resultLayer(type,nwingold);
        this.addChild(layer,100);
    },
    nextlevel: function () {
        this.touchret=true;
        this.rushRound();
        var leveltit = ccui.helper.seekWidgetByName(this.mainscene.node, "guanka");
        leveltit.initWithFile("res/caiquan_sz_"+global.level+".png");

        this.Gestureobj.initWithFile(this.gesturedata[0]);
        this.defGestureobj.initWithFile(this.gesturedata[0]);

        this.removeChild(this.defGestureobj);
        this.defGestureobj=null;

        this.mainscene.action.play("animation1",true);
    },
    helpLayer: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                audioEngine.playEffect(musics.s_5);
                var helpLayer=ccs.load(res.gameInfoLayer_json);
                this.addChild(helpLayer.node,100);

                var listener = cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: this.onTouchBegan.bind(this),
                    onTouchMoved: this.onTouchMoved.bind(this),
                    onTouchEnded: this.onTouchEnded.bind(this)
                });
                cc.eventManager.addListener(listener, helpLayer.node);
                //ScrollView
                //var ScrollView = ccui.helper.seekWidgetByName(helpLayer.node, "ScrollView");
                //var infotit = ccui.helper.seekWidgetByName(helpLayer.node, "infotit");
                //infotit.setFontName("dht");
                //var gameinfo0 = ccui.helper.seekWidgetByName(helpLayer.node, "gameinfo0");
                //gameinfo0.setFontName("dht");
                //gameinfo0.setTextColor(cc.color(255,0,0));
                //
                //var gameinfo1 = ccui.helper.seekWidgetByName(helpLayer.node, "gameinfo1");
                //gameinfo1.setFontName("dht");
                //var gameinfo2 = ccui.helper.seekWidgetByName(helpLayer.node, "gameinfo2");
                //gameinfo2.setFontName("dht");
                //var gameinfo3 = ccui.helper.seekWidgetByName(helpLayer.node, "gameinfo3");
                //gameinfo3.setFontName("dht");


                var closebtn = ccui.helper.seekWidgetByName(helpLayer.node, "closebtn");
                closebtn.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:
                            this.removeChild(helpLayer.node);
                            break;
                        default:
                            break;
                    }
                }.bind(this),this);
                break;
            default:
                break;
        }
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
        var pos = touch.getLocation();
    },
    onTouchEnded: function (touch, event) {
        var pos = touch.getLocation();
    },
    setLayer: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                audioEngine.playEffect(musics.s_5);
                var layer = new setLayer();
                this.addChild(layer,100);
                break;
            default:
                break;
        }
    },
    closeClick: function () {
        window.location.href="res/close.html?type=exit";
    }
});