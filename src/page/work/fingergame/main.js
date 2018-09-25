window.applicationCache.addEventListener('updateready',function(e){
    if(window.applicationCache.status == window.applicationCache.UPDATEREADY){
        window.applicationCache.swapCache();
        if(confirm("资源已更新您需要重新进入游戏！")){
            window.location.reload();
        }
    }
},false);


var myaudio=null;
cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")){
        document.body.removeChild(document.getElementById("cocosLoading"));
    }
    cc.view.adjustViewPort(true);
    //cc.view.setDesignResolutionSize(640,960,cc.ResolutionPolicy.SHOW_ALL);
    cc.view.setDesignResolutionSize(640,960,cc.ResolutionPolicy.EXACT_FIT);
    cc.view.resizeWithBrowserSize(true);

    //var sys = cc.sys;
    //if(sys.os === sys.OS_IOS || sys.os === sys.OS_OSX){
        cc.view.enableRetina(true);
    //}else{
    //    cc.view.enableRetina(false);
    //}

    //获取参数
    var str = window.location.search.substr(1);
    var strs = str.split("&");
    for(var i=0;i<strs.length;i++)
    {
        if([strs[i].split("=")[0]]=='userId'){
            global.userId=strs[i].split("=")[1];
        }
        if([strs[i].split("=")[0]]=='tokenCode'){
            global.tokenCode=strs[i].split("=")[1];
        }
        if([strs[i].split("=")[0]]=='phoneId'){
            global.phoneId=strs[i].split("=")[1];
        }
    }

    cc.LoaderScene.preload(g_resources, function () {
        MyFct.getSetData();
        cc.director.runScene(new cc.TransitionFade(0.6, new startScene()));
    }, this);
};
cc.game.run();
