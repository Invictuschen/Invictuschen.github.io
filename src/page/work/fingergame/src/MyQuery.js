(function(){
    var MyQuery = (function () {
        var MyQuery = function () {
            return MyQuery.fn.init();
        };

        MyQuery.fn = MyQuery.prototype = {
            init: function () {
                return this;
            }
        };

        MyQuery.extend = MyQuery.fn.extend = function () {
            var options, name, src, copy,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length;
            if (length === i) {
                target = this;
                --i;
            }

            for (; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];

                        if (src === copy) {
                            continue;
                        }
                        if (copy!==undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        };
        return MyQuery;
    })();
    window["MyQuery"] = window["$m"] = $m = MyQuery();
})();

///*
// * 方法:Array.remove(dx) 通过遍历,重构数组 功能:删除数组元素. 参数:dx删除元素的下标.
// */
//Array.prototype.arrremove = function(dx) {
//    if (isNaN(dx) || dx > this.length) {
//        return false;
//    }
//    for ( var i = 0, n = 0; i < this.length; i++) {
//        if (this[i] != this[dx]) {
//            this[n++] = this[i];
//        }
//
//    }
//    this.length -= 1;
//};

var playaudios=null;
var MyFct=MyFct||{};
$m.extend(MyFct,{
    /**
     * 获取两点间距离
     * @param PointA
     * @param PointB
     * @returns {number}
     * @constructor
     */
	PointToPoint:function(PointA,PointB) {
		var xdiff = PointA.x - PointB.x;
		var ydiff = PointA.y - PointB.y;
		var leng = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
		return leng;
	},
    /**
     * 判断是不是微信浏览器
     * @returns {boolean}
     * @constructor
     */
	IsWeiXin: function () {
		var ua = window.navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			return true;
		}else{
			return false;
		}
	},
    /**
     * 获取两点间的角度
     * @param newp
     * @param nowp
     * @returns {number}
     */
	getAngle:function(newp,nowp){
		//计算旋转角度
		var x = Math.abs(newp.x-nowp.x);
		var y = Math.abs(newp.y-nowp.y);
		var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		var radina = Math.acos(y/z);
		var angle =  180 / (Math.PI / radina);
		if((newp.x-nowp.x)>=0 && (newp.y-nowp.y)<=0){
			angle=180-angle;
		}
		if((newp.x-nowp.x)<=0 && (newp.y-nowp.y)<=0){
			angle=angle-180;
		}
		if((newp.x-nowp.x)<=0 && (newp.y-nowp.y)>=0){
			angle=0-angle;
		}
		return angle;
	},
    getSetData: function () {
        var bgmusic=cc.sys.localStorage.getItem("bgmusic");
        var esound=cc.sys.localStorage.getItem("esound");

        if(bgmusic&&bgmusic==="0"){
            cc.audioEngine.setMusicVolume(0);
            cc.sys.localStorage.setItem("bgmusic","0");//本地存储
        }else{
            cc.audioEngine.setMusicVolume(0.3);
            cc.sys.localStorage.setItem("bgmusic","1");//本地存储
        }
        //alert(cc.sys.os+"/cc.sys.OS_ANDROID="+cc.sys.OS_ANDROID+"/cc.sys.OS_IOS="+cc.sys.OS_IOS);
        if(cc.sys.os!== cc.sys.OS_ANDROID) {
            if (esound && esound == "0") {
                cc.audioEngine.setEffectsVolume(0);
                cc.sys.localStorage.setItem("esound", "0");//本地存储
            } else {
                cc.sys.localStorage.setItem("esound", "1");//本地存储
            }
        }else{
            cc.audioEngine.setEffectsVolume(0);
            cc.sys.localStorage.setItem("esound", "0");
        }
    },
    playbgmusic: function () {
        if(!global.bgmusic){
            global.bgmusic=true;
        }
        audioEngine.stopMusic(musics.bgmusic);
        audioEngine.playMusic(musics.bgmusic,true);

        //if(playaudios){
        //    clearTimeout(playaudios);
        //    playaudios=null;
        //}
        //playaudios=setTimeout("MyFct.playbgmusic()",34000);
    },
    /**
     * string转byte
     * @param str
     * @returns {*}
     */
    stringToBytes: function (str) {
        var ch, st, re = [];
        for (var i = 0; i < str.length; i++ ) {
            ch = str.charCodeAt(i);
            st = [];
            do {
                st.push( ch & 0xFF );
                ch = ch >> 8;
            }
            while ( ch );
            re = re.concat( st.reverse() );
        }
        return re;
    },
    stringtf16: function (str) {
        var val="";
        for(var i = 0; i < str.length; i++){
            //if(val == "")
            //    val = str.charCodeAt(i).toString(16);
            //else
            //    val += "," + str.charCodeAt(i).toString(16);

            val +=str.charCodeAt(i).toString(16);
        }
        return val;
    },
    timToEnergy: function (tim) {
        var strarr=tim.split(":");
        var energy=0;
        if(strarr.length==3){
            energy=100-parseInt(strarr[0])*20-parseInt(parseInt(strarr[1])/3);
        }else{
            return false;
        }
        return energy;
    },
    energyToTim: function (nenergy) {
        var energy=100-nenergy;
        var tim="";
        var fen=energy*3%60;
        var shi=parseInt(energy*3/60);
        if(shi<10){
            shi="0"+shi;
        }else{
            shi=shi+"";
        }
        if(fen<10){
            fen="0"+fen;
        }else{
            fen=fen+"";
        }
        tim=shi+":"+fen+":"+"00";
        return tim;
    },
    /**
     * 加密
     */
    Encrypt: function (str) {
        var datab=encodeURI(dataa);
        var datac=MyFct.stringToBytes(datab);


        var key_hash = CryptoJS.MD5("upeachbd");
        var key = CryptoJS.enc.Utf8.parse(key_hash);
        var iv  = CryptoJS.enc.Utf8.parse('/CBC/PKCS5Padding');
        var encrypted = CryptoJS.AES.encrypt("upeachbd", key, { iv: iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});


        //var datae=MyFct.stringtf16(datad);
    },
    Decrypt: function (str) {

    },
    getPlayinfo: function (callback) {
        var interface="/bdlott_lnfc_2/services/UserWs/serachUserInfo";
        var data={
            "userId":"{\"userId\":\""+global.userId+"\",\"phoneId\":\""+global.phoneId+"\"}",
            "dataJSON":"{\"userId\":\""+global.userId+"\",\"tokenCode\":\""+global.tokenCode+"\"}"
        };

        var url=global.url+"/bdlott_lnfc_2/services/SjbWs"+interface+"?response=application/json&requestParam="+JSON.stringify(data);
        var httpreq = new HttpReq();
        httpreq.sendRequest(url,null,"GET");
        httpreq.onSuccess=callback;
    },
    /**
     * 获取能量时间和游戏积分接口
     * @param callback
     */
    getPowerAndScore: function (callback) {
        var interface="/bdlott_lnfc_2/services/SjbWs/serachPowerAndScore";
        var data={
            "userId":"{\"userId\":\""+global.userId+"\",\"phoneId\":\""+global.phoneId+"\"}",
            "dataJSON":"{\"userId\":\""+global.userId+"\",\"tokenCode\":\""+global.tokenCode+"\"}"
        };

        var url=global.url+"/bdlott_lnfc_2/services/SjbWs"+interface+"?response=application/json&requestParam="+JSON.stringify(data);
        var httpreq = new HttpReq();
        httpreq.sendRequest(url,null,"GET");
        httpreq.onSuccess=callback;
    },
    /**
     * 投注
     * @constructor
     */
    Betting: function (callback) {
        var interface="/bdlott_lnfc_2/services/SjbWs/bettingSJB";

        var power=MyFct.energyToTim(global.energy);
        var data={
            "userId":"{\"userId\":\""+global.userId+"\",\"phoneId\":\""+global.phoneId+"\"}",
            "dataJSON":"{\"userId\":\""+global.userId+"\",\"tokenCode\":\""+global.tokenCode+"\",\"gameName\":\""+global.gamename+"\",\"powerTime\":\""+power+"\",\"betCode\":\""+global.bettingstr+"\"}"
        };

        var url=global.url+"/bdlott_lnfc_2/services/SjbWs"+interface+"?response=application/json&requestParam="+encodeURIComponent(JSON.stringify(data));
        var httpreq = new HttpReq();
        httpreq.sendRequest(url,data,"GET");
        httpreq.onSuccess=callback;
    },
    /**
     * 用积分购买能量接口
     * @param power
     * @param callback
     * @constructor
     */
    ScoreBuyPower: function (power,callback) {
        var interface="/bdlott_lnfc_2/services/SjbWs/serachScoreBuyPower";

        var data={
            "userId":"{\"userId\":\""+global.userId+"\",\"phoneId\":\""+global.phoneId+"\"}",
            "dataJSON":"{\"userId\":\""+global.userId+"\",\"tokenCode\":\""+global.tokenCode+"\",\"powerTime\":"+power+"}"
        };

        var url=global.url+"/bdlott_lnfc_2/services/SjbWs"+interface+"?response=application/json&requestParam="+JSON.stringify(data);
        var httpreq = new HttpReq();
        httpreq.sendRequest(url,data,"GET");
        httpreq.onSuccess=callback;
    }

});
