/**
 * Created by Administrator on 2015/6/30.
 */

var audioEngine = cc.audioEngine;
var global={
    url:"http://61.161.154.89:8080",//后台服务器地址
    // url:"localhost:63342:8080",
    username:null,//用户名
    userId:"BD12345678x220151012133939LW001381",//userId BD12345678Bk20150422144248X3001278 BD12345678x220151012133939LW001381
    tokenCode:"DB20151012133939574kzripfC000002",//tokenCode  DB20150422144450624W9ZrQ0q000000 DB20151012133939574kzripfC000002
    phoneId:"123456789",//phoneId  123456789
    gamename:"STJZB",
    powerTime:"00:00:00",
    warnlayer:null,
    mygold:10,//金币
    energy:100,//能量
    score:0,//积分
    level:1,//当前关
    reduceEnergy:10,//每回合减少的体力能量
    selectnum:3,//默认选择第三个投注
    bettingData:[0.1,0.2,0.3,0.5,1,2,5,10],//投注的内容
    bettingstr:null,

    bgmusic:false
};