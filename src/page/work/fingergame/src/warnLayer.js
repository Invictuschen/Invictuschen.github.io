/**
 * Created by Administrator on 2015/6/29.
 */

var warnLayer = cc.LayerColor.extend({
    touchret:false,
    ctor:function () {
        this._super(cc.color(0,0,0,80),640,960);

        var bg=new cc.Scale9Sprite(res.caiquan_25);
        bg.width = 640;
        bg.height = 400;
        bg.x = 320;
        bg.y = 380;
        this.addChild(bg);

        //var warntxta = new cc.LabelTTF("您的能量不足，无法继续游戏了。","dht",30);
        //warntxta.color = cc.color(255,255,255);
        //warntxta.x=320;
        //warntxta.y=520;
        //this.addChild(warntxta,50);
        //var warntxtb = new cc.LabelTTF("先去做点别的事，体力自动恢复后再来吧。","dht",30);
        //warntxtb.color = cc.color(255,255,255);
        //warntxtb.x=320;
        //warntxtb.y=480;
        //this.addChild(warntxtb,50);
        //var warntxtc = new cc.LabelTTF("您也可以通过积分兑换能量 20积分=20能量 40积分=40能量 80积分=80能量\n兑换提示：能量满值为100，超出部分无效。","dht",30,cc.size(580, 70),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        //warntxtc.color = cc.color(255,255,255);
        //warntxtc.x=320;
        //warntxtc.y=440;
        //this.addChild(warntxtc,50);


        var warntxtc = new cc.LabelTTF("您的能量不足，无法继续游戏了。\n" +
            "先去做点别的事，体力自动恢复后再来吧。\n" +
            "您也可以通过积分兑换能量 20积分=20能量 40积分=40能量 80积分=80能量\n" +
            "兑换提示：能量满值为100，超出部分无效。","dht",30,cc.size(580,200),cc.TEXT_ALIGNMENT_LEFT,cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        warntxtc.color = cc.color(255,255,255);
        warntxtc.x=320;
        warntxtc.y=455;
        this.addChild(warntxtc,50);

        var menulist=new cc.Menu();
        menulist.x=0;
        menulist.y=0;
        this.addChild(menulist,5);

        var exchangBtn0 = new cc.MenuItemImage(res.caiquan_n5_1, res.caiquan_n5_2, this.exchangClick.bind(this,20), this);
        exchangBtn0.x=120;
        exchangBtn0.y=310;
        menulist.addChild(exchangBtn0);

        var fontDefStroke = new cc.FontDefinition();
        fontDefStroke.fontName = "dht";
        fontDefStroke.fontSize = 26;
        fontDefStroke.fillStyle = cc.color(255, 255, 255);
        fontDefStroke.strokeEnabled = true;
        fontDefStroke.strokeStyle = cc.color(50, 50, 50);
        var warntxt = new cc.LabelTTF("兑换20能量", fontDefStroke);
        warntxt._strokeSize=2;
        warntxt.x = 120;
        warntxt.y = 310-3;
        this.addChild(warntxt,50);

        var exchangBtn1 = new cc.MenuItemImage(res.caiquan_n5_1, res.caiquan_n5_2, this.exchangClick.bind(this,40), this);
        exchangBtn1.x=320;
        exchangBtn1.y=310;
        menulist.addChild(exchangBtn1);

        var fontDefStroke = new cc.FontDefinition();
        fontDefStroke.fontName = "dht";
        fontDefStroke.fontSize = 26;
        fontDefStroke.fillStyle = cc.color(255, 255, 255);
        fontDefStroke.strokeEnabled = true;
        fontDefStroke.strokeStyle = cc.color(50, 50, 50);
        var warntxt = new cc.LabelTTF("兑换40能量",fontDefStroke);
        warntxt._strokeSize=2;
        warntxt.color = cc.color(255, 255, 255);
        warntxt.x=320;
        warntxt.y=310-3;
        this.addChild(warntxt,50);

        var exchangBtn2 = new cc.MenuItemImage(res.caiquan_n5_1, res.caiquan_n5_2, this.exchangClick.bind(this,80), this);
        exchangBtn2.x=520;
        exchangBtn2.y=310;
        menulist.addChild(exchangBtn2);

        var fontDefStroke = new cc.FontDefinition();
        fontDefStroke.fontName = "dht";
        fontDefStroke.fontSize = 26;
        fontDefStroke.fillStyle = cc.color(255, 255, 255);
        fontDefStroke.strokeEnabled = true;
        fontDefStroke.strokeStyle = cc.color(50, 50, 50);
        var warntxt = new cc.LabelTTF("兑换80能量",fontDefStroke);
        warntxt._strokeSize=2;
        warntxt.color = cc.color(255, 255, 255);
        warntxt.x=520;
        warntxt.y=310-3;
        this.addChild(warntxt,50);

        var overgameBtn = new cc.MenuItemImage(res.caiquan_n5_3, res.caiquan_n5_4, this.overgameClick, this);
        overgameBtn.x=320;
        overgameBtn.y=230;
        menulist.addChild(overgameBtn);

        var closetxt=new cc.Sprite(res.caiquan_nwz_tcyx);
        closetxt.x=320;
        closetxt.y=230;
        this.addChild(closetxt,50);

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
        if(!this.touchret){
            return;
        }
        var pos = touch.getLocation();
    },
    onTouchEnded: function (touch, event) {
        if(!this.touchret){
            return;
        }
        this.touchret=false;
    },
    warninfo: function () {
        if(this.warntxt){
            this.removeChild(this.warntxt);
        }
        this.warntxt = new cc.LabelTTF("积分不足", "dht", 30);
        this.warntxt.color = cc.color(255, 0, 0);
        this.warntxt.x=320;
        this.warntxt.y=365;
        this.addChild(this.warntxt,50);

        var actionByb = cc.moveBy(0.1, cc.p(0, 15));
        var actionByBackb = actionByb.reverse();
        var seqb = cc.sequence(actionByb, actionByBackb).repeat(2);
        this.warntxt.runAction(cc.sequence(seqb,cc.delayTime(0.7),cc.callFunc(function () {
            try{
                this.removeChild(this.warntxt);
            }catch(e){}
        }.bind(this))));
    },
    buyPower: function (power) {
        MyFct.ScoreBuyPower(power,function (ret,data) {
            cc.log("发送成功："+ret+"/data="+data);
        });
    },
    exchangClick: function (type) {
        if(global.score<type){
            this.warninfo();
            return;
        }
        global.score-=type;
        global.energy+=type;
        this.buyPower(type);
        this.getParent().changeEnergy();
        this.getParent().rushGold();
        this.getParent().removeChild(this);
    },
    //fillClick: function () {
    //    var num=100-global.energy;
    //    if(global.score<num){
    //        this.warninfo();
    //        return;
    //    }
    //    global.score=global.score-num;
    //    global.energy=100;
    //    this.buyPower(num);
    //    this.getParent().changeEnergy();
    //    this.getParent().rushGold();
    //    this.getParent().removeChild(this);
    //},
    overgameClick: function () {
        //cc.director.end();
        //window.close();
        window.location.href="res/close.html?type=exit";
    }
});