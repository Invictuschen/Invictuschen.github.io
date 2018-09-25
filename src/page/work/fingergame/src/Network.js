/**
 * Created by gallme-user on 2015/5/20.
 */

//XXX:Html5 XMLHttpRequest 请求
var HttpReq = function() {
    this.state = [ 'Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete' ];
    this.xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");
    this.__url = null;
    this.__headertype = null;
    this.__headervalue = null;

    this["onLoading"] = function() {
    };
    this["onLoaded"] = function() {
    };
    this["onInteractive"] = function() {
    };
    this["onComplete"] = function() {
    };
    this["onSuccess"] = function() {
    };
    this["onFailure"] = function() {
    };
    this["onError"] = function() {
    };
};
HttpReq.prototype.sendRequest = function(url, parameters, method){

    this.__url = url;
    if (!method || !method.toUpperCase)
        this.__method = 'GET';
    if (method.toUpperCase() == 'POST') {
        this.__method = 'POST';
    } else if (method.toUpperCase() == 'DELETE') {
        this.__method = 'DELETE';
    } else if (method.toUpperCase() == 'PUT') {
        this.__method = 'PUT';
    } else {
        this.__method = 'GET';
    }
    this.__parameters = parameters;
    try {
        if (this.__method == 'POST') {
            this.xhr.open("POST", this.__url);
        } else if (this.__method == 'DELETE') {
            this.xhr.open("DELETE", this.__url);
        } else if (this.__method == 'PUT') {
            this.xhr.open("PUT", this.__url);
        } else {
            this.xhr.open("GET", this.__url);
        }
        if (this.__headertype && this.__headervalue) {
            for(var i=0;i<this.__headertype.length;i++){
                this.xhr.setRequestHeader(this.__headertype[i], this.__headervalue[i]);
            }
        }
        this.xhr.send(this.__parameters);
    } catch (e) {
        console.log("报错了：" + e);
    }

    var me=this;
    this.xhr.onreadystatechange = function () {
        var currentState = me.state[me.xhr.readyState];
        me["on" + currentState]();
        if (currentState == 'Complete') {
            if(me.xhr.status >= 200 && me.xhr.status < 300){
                me.onSuccess(true, me.xhr.responseText);
            } else {
                me.onSuccess(false, me.xhr.responseText);
                me.onFailure(false);
            }
            me.xhr.onreadystatechange = function() {
            };
        }
    };
};
