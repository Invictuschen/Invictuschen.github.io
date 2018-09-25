/**
 * Created by Administrator on 2015/7/21.
 */
var tranLayer = cc.LayerColor.extend({
    ctor:function () {
        this._super(cc.color(0,0,0,255),640,960);

        this.scheduleOnce(this.gotomain,0.6);
        return true;
    },
    gotomain: function () {
        var scene = new cc.Scene();
        var layer = new mainLayer();
        scene.addChild(layer);
        cc.director.runScene(new cc.TransitionFade(0.3, scene));
    }
});