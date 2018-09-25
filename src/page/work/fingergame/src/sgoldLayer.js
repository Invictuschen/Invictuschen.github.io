/**
 * Created by Administrator on 2015/6/25.
 */

var sgoldLayer = cc.LayerColor.extend({
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

        var tit=new cc.Sprite(res.caiquan_26);
        tit.x=320;
        tit.y=530+this.mheight;
        this.addChild(tit);

        this.selectbg=new cc.Sprite(res.caiquan_30);
        this.selectbg.x=40+80*global.selectnum;
        if(global.selectnum%2){
            this.selectbg.y=380+this.mheight;
        }else{
            this.selectbg.y=460+this.mheight;
        }
        this.addChild(this.selectbg);

        this.addList();

        this.selectBtn = new cc.Sprite(res.caiquan_29);
        this.selectBtn.x=40+80*global.selectnum;
        this.selectBtn.y=420+this.mheight;
        this.addChild(this.selectBtn);

        var menulist=new cc.Menu();
        menulist.x=0;
        menulist.y=0;
        this.addChild(menulist,5);
        var closebtn = new cc.MenuItemImage(res.caiquan_n5_3, res.caiquan_n5_4, this.closeClick, this);
        closebtn.x=200;
        closebtn.y=280+this.mheight;
        menulist.addChild(closebtn);

        var closetxt=new cc.Sprite(res.caiquan_nwz_tcyx);
        closetxt.x=200;
        closetxt.y=280+this.mheight;
        this.addChild(closetxt,10);

        var okBtn = new cc.MenuItemImage(res.caiquan_n5_1, res.caiquan_n5_2, this.okClick, this);
        okBtn.x=440;
        okBtn.y=280+this.mheight;
        menulist.addChild(okBtn);

        var oktxt=new cc.Sprite(res.caiquan_nwz_qd);
        oktxt.x=440;
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
        if(!this.touchret){
            return;
        }
        var pos = touch.getLocation();

        var snum=parseInt((pos.x-40)/80);
        cc.log(snum);
        if(snum==global.selectnum){
            return;
        }
        audioEngine.playEffect(musics.s_2);
        global.selectnum=snum;
        var newpx= 600,newpy=380;
        if(snum%2){
            newpy=380+this.mheight;
        }else{
            newpy=460+this.mheight;
        }
        newpx=40+80*snum;
        this.selectbg.setPosition(newpx,newpy);
        this.selectBtn.setPosition(newpx,420);
    },
    onTouchEnded: function (touch, event) {
        if(!this.touchret){
            return;
        }
        //var pos = touch.getLocation();
        this.touchret=false;
    },
    addList: function () {
        var data=["0.1元","0.2元","0.3元","0.5元","1元","2元","5元","10元"];
        for(var i=0;i<8;i++){
            var goldtxt = new cc.LabelTTF(data[i], "dht", 24);
            goldtxt.color = cc.color(245, 100, 0);
            this.addChild(goldtxt);
            goldtxt.x = 40+80*i;
            if(i%2){
                goldtxt.y = 380+this.mheight;
            }else{
                goldtxt.y = 460+this.mheight;
            }

            if(i<7){
                var loadbara=new cc.Sprite(res.caiquan_27);
                loadbara.x=80+80*i;
                loadbara.y=420+this.mheight;
                this.addChild(loadbara);
            }

            var loadbarb=new cc.Sprite(res.caiquan_28);
            loadbarb.x=40+80*i;
            loadbarb.y=420+this.mheight;
            this.addChild(loadbarb);

        }
    },
    warninfo: function () {
        if(this.warntxt){
            this.removeChild(this.warntxt);
        }
        var txt="余额不足，请更换投注金额";
        if(global.mygold==0){
            txt="您的投注金额不足，请充值";
        }
        this.warntxt = new cc.LabelTTF(txt, "dht", 24);
        this.warntxt.color = cc.color(255, 0, 0);
        this.warntxt.x=320;
        this.warntxt.y=325+this.mheight;
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
    okClick: function () {
        audioEngine.playEffect(musics.s_3);
        if(global.bettingData[global.selectnum]>global.mygold){
            this.warninfo();
            return;
        }

        var betting=global.bettingData[global.selectnum];
        this.getParent().betting=betting;
        this.getParent().rushRound();
        global.mygold=(global.mygold-betting).toFixed(1);
        //this.getParent().rushGold();
        //this.getParent().rushRound();
        this.getParent().removeChild(this);
    },
    closeClick: function () {
        window.location.href="res/close.html?type=exit";
    }
});