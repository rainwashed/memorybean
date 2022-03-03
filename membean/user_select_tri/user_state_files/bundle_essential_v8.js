window.undefined=window.undefined;
Ext={version:"3.4.0",versionDetail:{major:3,minor:4,patch:0}};
Ext.apply=function(j,h,c){if(c){Ext.apply(j,c)
}if(j&&h&&typeof h=="object"){for(var g in h){j[g]=h[g]
}}return j
};
(function(){var aa=0,I=Object.prototype.toString,H=navigator.userAgent.toLowerCase(),R=function(a){return a.test(H)
},Y=document,T=Y.documentMode,V=Y.compatMode=="CSS1Compat",M=R(/opera/),Z=R(/\bchrome\b/),G=R(/webkit/),e=!Z&&R(/safari/),ab=e&&R(/applewebkit\/4/),ae=e&&R(/version\/3/),L=e&&R(/version\/4/),J=!M&&R(/msie/),N=J&&(R(/msie 7/)||T==7),P=J&&(R(/msie 8/)&&T!=7),Q=J&&R(/msie 9/),K=J&&!N&&!P&&!Q,S=!G&&R(/gecko/),ac=S&&R(/rv:1\.8/),af=S&&R(/rv:1\.9/),F=J&&!V,O=R(/windows|win32/),W=R(/macintosh|mac os x/),X=R(/adobeair/),U=R(/linux/),ad=/^https/i.test(window.location.protocol);
if(K){try{Y.execCommand("BackgroundImageCache",false,true)
}catch(E){}}Ext.apply(Ext,{SSL_SECURE_URL:ad&&J?'javascript:""':"about:blank",isStrict:V,isSecure:ad,isReady:false,enableForcedBoxModel:false,enableGarbageCollector:true,enableListenerCollection:false,enableNestedListenerRemoval:false,USE_NATIVE_JSON:false,applyIf:function(b,a){if(b){for(var c in a){if(!Ext.isDefined(b[c])){b[c]=a[c]
}}}return b
},id:function(b,a){b=Ext.getDom(b,true)||{};
if(!b.id){b.id=(a||"ext-gen")+(++aa)
}return b.id
},extend:function(){var a=function(c){for(var d in c){this[d]=c[d]
}};
var b=Object.prototype.constructor;
return function(c,h,d){if(typeof h=="object"){d=h;
h=c;
c=d.constructor!=b?d.constructor:function(){h.apply(this,arguments)
}
}var j=function(){},g,k=h.prototype;
j.prototype=k;
g=c.prototype=new j();
g.constructor=c;
c.superclass=k;
if(k.constructor==b){k.constructor=h
}c.override=function(l){Ext.override(c,l)
};
g.superclass=g.supr=(function(){return k
});
g.override=a;
Ext.override(c,d);
c.extend=function(l){return Ext.extend(c,l)
};
return c
}
}(),override:function(c,a){if(a){var b=c.prototype;
Ext.apply(b,a);
if(Ext.isIE&&a.hasOwnProperty("toString")){b.toString=a.toString
}}},namespace:function(){var g=arguments.length,d=0,j,h,k,b,c,a;
for(;
d<g;
++d){k=arguments[d];
b=arguments[d].split(".");
a=window[b[0]];
if(a===undefined){a=window[b[0]]={}
}c=b.slice(1);
j=c.length;
for(h=0;
h<j;
++h){a=a[c[h]]=a[c[h]]||{}
}}return a
},urlEncode:function(a,b){var d,g=[],c=encodeURIComponent;
Ext.iterate(a,function(j,h){d=Ext.isEmpty(h);
Ext.each(d?j:h,function(k){g.push("&",c(j),"=",(!Ext.isEmpty(k)&&(k!=j||!d))?(Ext.isDate(k)?Ext.encode(k).replace(/"/g,""):c(k)):"")
})
});
if(!b){g.shift();
b=""
}return b+g.join("")
},urlDecode:function(g,h){if(Ext.isEmpty(g)){return{}
}var b={},c=g.split("&"),a=decodeURIComponent,j,d;
Ext.each(c,function(k){k=k.split("=");
j=a(k[0]);
d=a(k[1]);
b[j]=h||!b[j]?d:[].concat(b[j]).concat(d)
});
return b
},urlAppend:function(b,a){if(!Ext.isEmpty(a)){return b+(b.indexOf("?")===-1?"?":"&")+a
}return b
},toArray:function(){return J?function(d,a,c,b){b=[];
for(var g=0,h=d.length;
g<h;
g++){b.push(d[g])
}return b.slice(a||0,c||b.length)
}:function(c,a,b){return Array.prototype.slice.call(c,a||0,b||c.length)
}
}(),isIterable:function(a){if(Ext.isArray(a)||a.callee){return true
}if(/NodeList|HTMLCollection/.test(I.call(a))){return true
}return((typeof a.nextNode!="undefined"||a.item)&&Ext.isNumber(a.length))
},each:function(a,b,c){if(Ext.isEmpty(a,true)){return
}if(!Ext.isIterable(a)||Ext.isPrimitive(a)){a=[a]
}for(var d=0,g=a.length;
d<g;
d++){if(b.call(c||a[d],a[d],d,a)===false){return d
}}},iterate:function(b,c,d){if(Ext.isEmpty(b)){return
}if(Ext.isIterable(b)){Ext.each(b,c,d);
return
}else{if(typeof b=="object"){for(var a in b){if(b.hasOwnProperty(a)){if(c.call(d||b,a,b[a],b)===false){return
}}}}}},getDom:function(b,c){if(!b||!Y){return null
}if(b.dom){return b.dom
}else{if(typeof b=="string"){var a=Y.getElementById(b);
if(a&&J&&c){if(b==a.getAttribute("id")){return a
}else{return null
}}return a
}else{return b
}}},getBody:function(){return Ext.get(Y.body||Y.documentElement)
},getHead:function(){var a;
return function(){if(a==undefined){a=Ext.get(Y.getElementsByTagName("head")[0])
}return a
}
}(),removeNode:J&&!P?function(){var a;
return function(b){if(b&&b.tagName!="BODY"){(Ext.enableNestedListenerRemoval)?Ext.EventManager.purgeElement(b,true):Ext.EventManager.removeAll(b);
a=a||Y.createElement("div");
a.appendChild(b);
a.innerHTML="";
delete Ext.elCache[b.id]
}}
}():function(a){if(a&&a.parentNode&&a.tagName!="BODY"){(Ext.enableNestedListenerRemoval)?Ext.EventManager.purgeElement(a,true):Ext.EventManager.removeAll(a);
a.parentNode.removeChild(a);
delete Ext.elCache[a.id]
}},isEmpty:function(a,b){return a===null||a===undefined||((Ext.isArray(a)&&!a.length))||(!b?a==="":false)
},isArray:function(a){return I.apply(a)==="[object Array]"
},isDate:function(a){return I.apply(a)==="[object Date]"
},isObject:function(a){return !!a&&Object.prototype.toString.call(a)==="[object Object]"
},isPrimitive:function(a){return Ext.isString(a)||Ext.isNumber(a)||Ext.isBoolean(a)
},isFunction:function(a){return I.apply(a)==="[object Function]"
},isNumber:function(a){return typeof a==="number"&&isFinite(a)
},isString:function(a){return typeof a==="string"
},isBoolean:function(a){return typeof a==="boolean"
},isElement:function(a){return a?!!a.tagName:false
},isDefined:function(a){return typeof a!=="undefined"
},isOpera:M,isWebKit:G,isChrome:Z,isSafari:e,isSafari3:ae,isSafari4:L,isSafari2:ab,isIE:J,isIE6:K,isIE7:N,isIE8:P,isIE9:Q,isGecko:S,isGecko2:ac,isGecko3:af,isBorderBox:F,isLinux:U,isWindows:O,isMac:W,isAir:X});
Ext.ns=Ext.namespace
})();
Ext.ns("Ext.util","Ext.lib","Ext.data","Ext.supports");
Ext.elCache={};
Ext.apply(Function.prototype,{createInterceptor:function(d,e){var g=this;
return !Ext.isFunction(d)?this:function(){var a=this,b=arguments;
d.target=a;
d.method=g;
return(d.apply(e||a||window,b)!==false)?g.apply(a||window,b):null
}
},createCallback:function(){var d=arguments,c=this;
return function(){return c.apply(window,d)
}
},createDelegate:function(j,e,g){var h=this;
return function(){var a=e||arguments;
if(g===true){a=Array.prototype.slice.call(arguments,0);
a=a.concat(e)
}else{if(Ext.isNumber(g)){a=Array.prototype.slice.call(arguments,0);
var b=[g,0].concat(e);
Array.prototype.splice.apply(a,b)
}}return h.apply(j||window,a)
}
},defer:function(l,j,g,h){var k=this.createDelegate(j,g,h);
if(l>0){return setTimeout(k,l)
}k();
return 0
}});
Ext.applyIf(String,{format:function(c){var d=Ext.toArray(arguments,1);
return c.replace(/\{(\d+)\}/g,function(b,a){return d[a]
})
}});
Ext.applyIf(Array.prototype,{indexOf:function(d,g){var e=this.length;
g=g||0;
g+=(g<0)?e:0;
for(;
g<e;
++g){if(this[g]===d){return g
}}return -1
},remove:function(c){var d=this.indexOf(c);
if(d!=-1){this.splice(d,1)
}return this
}});
Ext.util.TaskRunner=function(n){n=n||10;
var m=[],r=[],q=0,l=false,o=function(){l=false;
clearInterval(q);
q=0
},k=function(){if(!l){l=true;
q=setInterval(j,n)
}},p=function(a){r.push(a);
if(a.onStop){a.onStop.apply(a.scope||a)
}},j=function(){var b=r.length,h=new Date().getTime();
if(b>0){for(var e=0;
e<b;
e++){m.remove(r[e])
}r=[];
if(m.length<1){o();
return
}}for(var e=0,g,c,a,d=m.length;
e<d;
++e){g=m[e];
c=h-g.taskRunTime;
if(g.interval<=c){a=g.run.apply(g.scope||g,g.args||[++g.taskRunCount]);
g.taskRunTime=h;
if(a===false||g.taskRunCount===g.repeat){p(g);
return
}}if(g.duration&&g.duration<=(h-g.taskStartTime)){p(g)
}}};
this.start=function(a){m.push(a);
a.taskStartTime=new Date().getTime();
a.taskRunTime=0;
a.taskRunCount=0;
k();
return a
};
this.stop=function(a){p(a);
return a
};
this.stopAll=function(){o();
for(var a=0,b=m.length;
a<b;
a++){if(m[a].onStop){m[a].onStop()
}}m=[];
r=[]
}
};
Ext.TaskMgr=new Ext.util.TaskRunner();
(function(){var d;
function g(a){if(!d){d=new Ext.Element.Flyweight()
}d.dom=a;
return d
}(function(){var b=document,j=b.compatMode=="CSS1Compat",c=Math.max,k=Math.round,a=parseInt;
Ext.lib.Dom={isAncestor:function(l,h){var m=false;
l=Ext.getDom(l);
h=Ext.getDom(h);
if(l&&h){if(l.contains){return l.contains(h)
}else{if(l.compareDocumentPosition){return !!(l.compareDocumentPosition(h)&16)
}else{while(h=h.parentNode){m=h==l||m
}}}}return m
},getViewWidth:function(h){return h?this.getDocumentWidth():this.getViewportWidth()
},getViewHeight:function(h){return h?this.getDocumentHeight():this.getViewportHeight()
},getDocumentHeight:function(){return c(!j?b.body.scrollHeight:b.documentElement.scrollHeight,this.getViewportHeight())
},getDocumentWidth:function(){return c(!j?b.body.scrollWidth:b.documentElement.scrollWidth,this.getViewportWidth())
},getViewportHeight:function(){return Ext.isIE?(Ext.isStrict?b.documentElement.clientHeight:b.body.clientHeight):self.innerHeight
},getViewportWidth:function(){return !Ext.isStrict&&!Ext.isOpera?b.body.clientWidth:Ext.isIE?b.documentElement.clientWidth:self.innerWidth
},getY:function(h){return this.getXY(h)[1]
},getX:function(h){return this.getXY(h)[0]
},getXY:function(A){var B,p,G,D,z,y,E=0,h=0,F,C,x=(b.body||b.documentElement),w=[0,0];
A=Ext.getDom(A);
if(A!=x){if(A.getBoundingClientRect){G=A.getBoundingClientRect();
F=g(document).getScroll();
w=[k(G.left+F.left),k(G.top+F.top)]
}else{B=A;
C=g(A).isStyle("position","absolute");
while(B){p=g(B);
E+=B.offsetLeft;
h+=B.offsetTop;
C=C||p.isStyle("position","absolute");
if(Ext.isGecko){h+=D=a(p.getStyle("borderTopWidth"),10)||0;
E+=z=a(p.getStyle("borderLeftWidth"),10)||0;
if(B!=A&&!p.isStyle("overflow","visible")){E+=z;
h+=D
}}B=B.offsetParent
}if(Ext.isSafari&&C){E-=x.offsetLeft;
h-=x.offsetTop
}if(Ext.isGecko&&!C){y=g(x);
E+=a(y.getStyle("borderLeftWidth"),10)||0;
h+=a(y.getStyle("borderTopWidth"),10)||0
}B=A.parentNode;
while(B&&B!=x){if(!Ext.isOpera||(B.tagName!="TR"&&!g(B).isStyle("display","inline"))){E-=B.scrollLeft;
h-=B.scrollTop
}B=B.parentNode
}w=[E,h]
}}return w
},setXY:function(p,o){(p=Ext.fly(p,"_setXY")).position();
var n=p.translatePoints(o),q=p.dom.style,h;
for(h in n){if(!isNaN(n[h])){q[h]=n[h]+"px"
}}},setX:function(h,l){this.setXY(h,[l,false])
},setY:function(l,h){this.setXY(l,[false,h])
}}
})();
Ext.lib.Event=function(){var G=false,ab={},a=0,S=[],ad,Q=false,W=window,I=document,V=200,N=20,R=0,Y=1,L=2,F=3,J="scrollLeft",P="scrollTop",aa="unload",b="mouseover",K="mouseout",ac=function(){var h;
if(W.addEventListener){h=function(j,l,k,m){if(l=="mouseenter"){k=k.createInterceptor(T);
j.addEventListener(b,k,(m))
}else{if(l=="mouseleave"){k=k.createInterceptor(T);
j.addEventListener(K,k,(m))
}else{j.addEventListener(l,k,(m))
}}return k
}
}else{if(W.attachEvent){h=function(j,l,k,m){j.attachEvent("on"+l,k);
return k
}
}else{h=function(){}
}}return h
}(),Z=function(){var h;
if(W.removeEventListener){h=function(j,l,k,m){if(l=="mouseenter"){l=b
}else{if(l=="mouseleave"){l=K
}}j.removeEventListener(l,k,(m))
}
}else{if(W.detachEvent){h=function(j,l,k){j.detachEvent("on"+l,k)
}
}else{h=function(){}
}}return h
}();
function T(h){return !H(h.currentTarget,c.getRelatedTarget(h))
}function H(j,h){if(j&&j.firstChild){while(h){if(h===j){return true
}h=h.parentNode;
if(h&&(h.nodeType!=1)){h=null
}}}return false
}function O(){var n=false,h=[],k,l,o,m,j=!G||(a>0);
if(!Q){Q=true;
for(l=0;
l<S.length;
++l){o=S[l];
if(o&&(k=I.getElementById(o.id))){if(!o.checkReady||G||k.nextSibling||(I&&I.body)){m=o.override;
k=m?(m===true?o.obj:m):k;
o.fn.call(k,o.obj);
S.remove(o);
--l
}else{h.push(o)
}}}a=(h.length===0)?0:a-1;
if(j){U()
}else{clearInterval(ad);
ad=null
}n=!(Q=false)
}return n
}function U(){if(!ad){var h=function(){O()
};
ad=setInterval(h,N)
}}function M(){var j=I.documentElement,h=I.body;
if(j&&(j[P]||j[J])){return[j[J],j[P]]
}else{if(h){return[h[J],h[P]]
}else{return[0,0]
}}}function X(k,j){k=k.browserEvent||k;
var h=k["page"+j];
if(!h&&h!==0){h=k["client"+j]||0;
if(Ext.isIE){h+=M()[j=="X"?0:1]
}}return h
}var c={extAdapter:true,onAvailable:function(j,l,h,k){S.push({id:j,fn:l,obj:h,override:k,checkReady:false});
a=V;
U()
},addListener:function(h,k,j){h=Ext.getDom(h);
if(h&&j){if(k==aa){if(ab[h.id]===undefined){ab[h.id]=[]
}ab[h.id].push([k,j]);
return j
}return ac(h,k,j,false)
}return false
},removeListener:function(h,m,j){h=Ext.getDom(h);
var k,n,o,l;
if(h&&j){if(m==aa){if((l=ab[h.id])!==undefined){for(k=0,n=l.length;
k<n;
k++){if((o=l[k])&&o[R]==m&&o[Y]==j){ab[h.id].splice(k,1)
}}}return
}Z(h,m,j,false)
}},getTarget:function(h){h=h.browserEvent||h;
return this.resolveTextNode(h.target||h.srcElement)
},resolveTextNode:Ext.isGecko?function(h){if(!h){return
}var j=HTMLElement.prototype.toString.call(h);
if(j=="[xpconnect wrapped native prototype]"||j=="[object XULElement]"){return
}return h.nodeType==3?h.parentNode:h
}:function(h){return h&&h.nodeType==3?h.parentNode:h
},getRelatedTarget:function(h){h=h.browserEvent||h;
return this.resolveTextNode(h.relatedTarget||(/(mouseout|mouseleave)/.test(h.type)?h.toElement:/(mouseover|mouseenter)/.test(h.type)?h.fromElement:null))
},getPageX:function(h){return X(h,"X")
},getPageY:function(h){return X(h,"Y")
},getXY:function(h){return[this.getPageX(h),this.getPageY(h)]
},stopEvent:function(h){this.stopPropagation(h);
this.preventDefault(h)
},stopPropagation:function(h){h=h.browserEvent||h;
if(h.stopPropagation){h.stopPropagation()
}else{h.cancelBubble=true
}},preventDefault:function(h){h=h.browserEvent||h;
if(h.preventDefault){h.preventDefault()
}else{if(h.keyCode){h.keyCode=0
}h.returnValue=false
}},getEvent:function(j){j=j||W.event;
if(!j){var h=this.getEvent.caller;
while(h){j=h.arguments[0];
if(j&&Event==j.constructor){break
}h=h.caller
}}return j
},getCharCode:function(h){h=h.browserEvent||h;
return h.charCode||h.keyCode||0
},getListeners:function(h,j){Ext.EventManager.getListeners(h,j)
},purgeElement:function(j,h,k){Ext.EventManager.purgeElement(j,h,k)
},_load:function(h){G=true;
if(Ext.isIE&&h!==true){Z(W,"load",arguments.callee)
}},_unload:function(m){var p=Ext.lib.Event,o,j,l,q,n,h;
for(q in ab){l=ab[q];
for(o=0,n=l.length;
o<n;
o++){j=l[o];
if(j){try{h=j[F]?(j[F]===true?j[L]:j[F]):W;
j[Y].call(h,p.getEvent(m),j[L])
}catch(k){}}}}Ext.EventManager._unload();
Z(W,aa,p._unload)
}};
c.on=c.addListener;
c.un=c.removeListener;
if(I&&I.body){c._load(true)
}else{ac(W,"load",c._load)
}ac(W,aa,c._unload);
O();
return c
}();
Ext.lib.Ajax=function(){var A=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP"],D="Content-Type";
function z(j){var l=j.conn,h,k={};
function m(n,o){for(h in o){if(o.hasOwnProperty(h)){n.setRequestHeader(h,o[h])
}}}Ext.apply(k,w.headers,w.defaultHeaders);
m(l,k);
delete w.headers
}function C(h,j,k,l){return{tId:h,status:k?-1:0,statusText:k?"transaction aborted":"communication failure",isAbort:k,isTimeout:l,argument:j}
}function x(j,h){(w.headers=w.headers||{})[j]=h
}function c(q,m){var h={},n,o=q.conn,k,j,p=o.status==1223;
try{n=q.conn.getAllResponseHeaders();
Ext.each(n.replace(/\r\n/g,"\n").split("\n"),function(r){k=r.indexOf(":");
if(k>=0){j=r.substr(0,k).toLowerCase();
if(r.charAt(k+1)==" "){++k
}h[j]=r.substr(k+1)
}})
}catch(l){}return{tId:q.tId,status:p?204:o.status,statusText:p?"No Content":o.statusText,getResponseHeader:function(r){return h[r.toLowerCase()]
},getAllResponseHeaders:function(){return n
},responseText:o.responseText,responseXML:o.responseXML,argument:m}
}function s(h){if(h.tId){w.conn[h.tId]=null
}h.conn=null;
h=null
}function B(h,o,m,n){if(!o){s(h);
return
}var k,l;
try{if(h.conn.status!==undefined&&h.conn.status!=0){k=h.conn.status
}else{k=13030
}}catch(j){k=13030
}if((k>=200&&k<300)||(Ext.isIE&&k==1223)){l=c(h,o.argument);
if(o.success){if(!o.scope){o.success(l)
}else{o.success.apply(o.scope,[l])
}}}else{switch(k){case 12002:case 12029:case 12030:case 12031:case 12152:case 13030:l=C(h.tId,o.argument,(m?m:false),n);
if(o.failure){if(!o.scope){o.failure(l)
}else{o.failure.apply(o.scope,[l])
}}break;
default:l=c(h,o.argument);
if(o.failure){if(!o.scope){o.failure(l)
}else{o.failure.apply(o.scope,[l])
}}}}s(h);
l=null
}function u(l,h,n,j,m,k){if(n&&n.readyState==4){clearInterval(m[j]);
m[j]=null;
if(k){clearTimeout(w.timeout[j]);
w.timeout[j]=null
}B(l,h)
}}function a(j,h){w.abort(j,h,true)
}function t(l,h){h=h||{};
var n=l.conn,j=l.tId,m=w.poll,k=h.timeout||null;
if(k){w.conn[j]=n;
w.timeout[j]=setTimeout(a.createCallback(l,h),k)
}m[j]=setInterval(u.createCallback(l,h,n,j,m,k),w.pollInterval)
}function y(h,l,j,m){var k=v()||null;
if(k){k.conn.open(h,l,true);
if(w.useDefaultXhrHeader){x("X-Requested-With",w.defaultXhrHeader)
}if(m&&w.useDefaultHeader&&(!w.headers||!w.headers[D])){x(D,w.defaultPostHeader)
}if(w.defaultHeaders||w.headers){z(k)
}t(k,j);
k.conn.send(m||null)
}return k
}function v(){var h;
try{if(h=b(w.transactionId)){w.transactionId++
}}catch(j){}finally{return h
}}function b(h){var l;
try{l=new XMLHttpRequest()
}catch(j){for(var k=Ext.isIE6?1:0;
k<A.length;
++k){try{l=new ActiveXObject(A[k]);
break
}catch(j){}}}finally{return{conn:l,tId:h}
}}var w={request:function(q,o,n,m,h){if(h){var l=this,p=h.xmlData,k=h.jsonData,j;
Ext.applyIf(l,h);
if(p||k){j=l.headers;
if(!j||!j[D]){x(D,p?"text/xml":"application/json")
}m=p||(!Ext.isPrimitive(k)?Ext.encode(k):k)
}}return y(q||h.method||"POST",o,n,m)
},serializeForm:function(p){var h=p.elements||(document.forms[p]||Ext.getDom(p)).elements,n=false,j=encodeURIComponent,m,o="",k,l;
Ext.each(h,function(q){m=q.name;
k=q.type;
if(!q.disabled&&m){if(/select-(one|multiple)/i.test(k)){Ext.each(q.options,function(r){if(r.selected){l=r.hasAttribute?r.hasAttribute("value"):r.getAttributeNode("value").specified;
o+=String.format("{0}={1}&",j(m),j(l?r.value:r.text))
}})
}else{if(!(/file|undefined|reset|button/i.test(k))){if(!(/radio|checkbox/i.test(k)&&!q.checked)&&!(k=="submit"&&n)){o+=j(m)+"="+j(q.value)+"&";
n=/submit/i.test(k)
}}}}});
return o.substr(0,o.length-1)
},useDefaultHeader:true,defaultPostHeader:"application/x-www-form-urlencoded; charset=UTF-8",useDefaultXhrHeader:true,defaultXhrHeader:"XMLHttpRequest",poll:{},timeout:{},conn:{},pollInterval:50,transactionId:0,abort:function(k,h,n){var l=this,j=k.tId,m=false;
if(l.isCallInProgress(k)){k.conn.abort();
clearInterval(l.poll[j]);
l.poll[j]=null;
clearTimeout(w.timeout[j]);
l.timeout[j]=null;
B(k,h,(m=true),n)
}return m
},isCallInProgress:function(h){return h.conn&&!{0:true,4:true}[h.conn.readyState]
}};
return w
}();
(function(){var k=Ext.lib,b=/width|height|opacity|padding/i,l=/^((width|height)|(top|left))$/,n=/width|height|top$|bottom$|left$|right$/i,c=/\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i,a=function(h){return typeof h!=="undefined"
},m=function(){return new Date()
};
k.Anim={motion:function(t,j,s,r,q,h){return this.run(t,j,s,r,q,h,Ext.lib.Motion)
},run:function(w,j,u,t,s,x,h){h=h||Ext.lib.AnimBase;
if(typeof t=="string"){t=Ext.lib.Easing[t]
}var v=new h(w,j,u,t);
v.animateX(function(){if(Ext.isFunction(s)){s.call(x)
}});
return v
}};
k.AnimBase=function(j,o,h,p){if(j){this.init(j,o,h,p)
}};
k.AnimBase.prototype={doMethod:function(o,p,j){var h=this;
return h.method(h.curFrame,p,j-p,h.totalFrames)
},setAttr:function(o,h,j){if(b.test(o)&&h<0){h=0
}Ext.fly(this.el,"_anim").setStyle(o,h+j)
},getAttr:function(o){var h=Ext.fly(this.el),p=h.getStyle(o),j=l.exec(o)||[];
if(p!=="auto"&&!c.test(p)){return parseFloat(p)
}return(!!(j[2])||(h.getStyle("position")=="absolute"&&!!(j[3])))?h.dom["offset"+j[0].charAt(0).toUpperCase()+j[0].substr(1)]:0
},getDefaultUnit:function(h){return n.test(h)?"px":""
},animateX:function(p,o){var j=this,h=function(){j.onComplete.removeListener(h);
if(Ext.isFunction(p)){p.call(o||j,j)
}};
j.onComplete.addListener(h,j);
j.animate()
},setRunAttr:function(w){var h=this,F=this.attributes[w],E=F.to,j=F.by,D=F.from,C=F.unit,A=(this.runAttrs[w]={}),z;
if(!a(E)&&!a(j)){return false
}var B=a(D)?D:h.getAttr(w);
if(a(E)){z=E
}else{if(a(j)){if(Ext.isArray(B)){z=[];
for(var y=0,x=B.length;
y<x;
y++){z[y]=B[y]+j[y]
}}else{z=B+j
}}}Ext.apply(A,{start:B,end:z,unit:a(C)?C:h.getDefaultUnit(w)})
},init:function(y,u,v,z){var h=this,w=0,B=k.AnimMgr;
Ext.apply(h,{isAnimated:false,startTime:null,el:Ext.getDom(y),attributes:u||{},duration:v||1,method:z||k.Easing.easeNone,useSec:true,curFrame:0,totalFrames:B.fps,runAttrs:{},animate:function(){var p=this,o=p.duration;
if(p.isAnimated){return false
}p.curFrame=0;
p.totalFrames=p.useSec?Math.ceil(B.fps*o):o;
B.registerElement(p)
},stop:function(p){var o=this;
if(p){o.curFrame=o.totalFrames;
o._onTween.fire()
}B.stop(o)
}});
var A=function(){var o=this,p;
o.onStart.fire();
o.runAttrs={};
for(p in this.attributes){this.setRunAttr(p)
}o.isAnimated=true;
o.startTime=m();
w=0
};
var j=function(){var p=this;
p.onTween.fire({duration:m()-p.startTime,curFrame:p.curFrame});
var o=p.runAttrs;
for(var q in o){this.setAttr(q,p.doMethod(q,o[q].start,o[q].end),o[q].unit)
}++w
};
var x=function(){var q=this,o=(m()-q.startTime)/1000,p={duration:o,frames:w,fps:w/o};
q.isAnimated=false;
w=0;
q.onComplete.fire(p)
};
h.onStart=new Ext.util.Event(h);
h.onTween=new Ext.util.Event(h);
h.onComplete=new Ext.util.Event(h);
(h._onStart=new Ext.util.Event(h)).addListener(A);
(h._onTween=new Ext.util.Event(h)).addListener(j);
(h._onComplete=new Ext.util.Event(h)).addListener(x)
}};
Ext.lib.AnimMgr=new function(){var s=this,h=null,j=[],q=0;
Ext.apply(s,{fps:1000,delay:1,registerElement:function(o){j.push(o);
++q;
o._onStart.fire();
s.start()
},unRegister:function(o,p){o._onComplete.fire();
p=p||r(o);
if(p!=-1){j.splice(p,1)
}if(--q<=0){s.stop()
}},start:function(){if(h===null){h=setInterval(s.run,s.delay)
}},stop:function(o){if(!o){clearInterval(h);
for(var p=0,u=j.length;
p<u;
++p){if(j[0].isAnimated){s.unRegister(j[0],0)
}}j=[];
h=null;
q=0
}else{s.unRegister(o)
}},run:function(){var o,p,v,u;
for(p=0,v=j.length;
p<v;
p++){u=j[p];
if(u&&u.isAnimated){o=u.totalFrames;
if(u.curFrame<o||o===null){++u.curFrame;
if(u.useSec){t(u)
}u._onTween.fire()
}else{s.stop(u)
}}}}});
var r=function(o){var p,u;
for(p=0,u=j.length;
p<u;
p++){if(j[p]===o){return p
}}return -1
};
var t=function(A){var p=A.totalFrames,x=A.curFrame,y=A.duration,z=(x*y*1000/p),B=(m()-A.startTime),o=0;
if(B<y*1000){o=Math.round((B/z-1)*x)
}else{o=p-(x+1)
}if(o>0&&isFinite(o)){if(A.curFrame+o>=p){o=p-(x+1)
}A.curFrame+=o
}}
};
k.Bezier=new function(){this.getPosition=function(v,w){var t=v.length,h=[],u=1-w,j,s;
for(j=0;
j<t;
++j){h[j]=[v[j][0],v[j][1]]
}for(s=1;
s<t;
++s){for(j=0;
j<t-s;
++j){h[j][0]=u*h[j][0]+w*h[parseInt(j+1,10)][0];
h[j][1]=u*h[j][1]+w*h[parseInt(j+1,10)][1]
}}return[h[0][0],h[0][1]]
}
};
k.Easing={easeNone:function(j,o,p,h){return p*j/h+o
},easeIn:function(j,o,p,h){return p*(j/=h)*j+o
},easeOut:function(j,o,p,h){return -p*(j/=h)*(j-2)+o
}};
(function(){k.Motion=function(t,u,s,r){if(t){k.Motion.superclass.constructor.call(this,t,u,s,r)
}};
Ext.extend(k.Motion,Ext.lib.AnimBase);
var h=k.Motion.superclass,j=/^points$/i;
Ext.apply(k.Motion.prototype,{setAttr:function(w,s,t){var u=this,v=h.setAttr;
if(j.test(w)){t=t||"px";
v.call(u,"left",s[0],t);
v.call(u,"top",s[1],t)
}else{v.call(u,w,s,t)
}},getAttr:function(s){var q=this,r=h.getAttr;
return j.test(s)?[r.call(q,"left"),r.call(q,"top")]:r.call(q,s)
},doMethod:function(u,r,t){var s=this;
return j.test(u)?k.Bezier.getPosition(s.runAttrs[u],s.method(s.curFrame,0,100,s.totalFrames)/100):h.doMethod.call(s,u,r,t)
},setRunAttr:function(M){if(j.test(M)){var K=this,D=this.el,H=this.attributes.points,O=H.control||[],J=H.from,I=H.to,L=H.by,F=k.Dom,E,B,C,N,G;
if(O.length>0&&!Ext.isArray(O[0])){O=[O]
}else{}Ext.fly(D,"_anim").position();
F.setXY(D,a(J)?J:F.getXY(D));
E=K.getAttr("points");
if(a(I)){C=o.call(K,I,E);
for(B=0,N=O.length;
B<N;
++B){O[B]=o.call(K,O[B],E)
}}else{if(a(L)){C=[E[0]+L[0],E[1]+L[1]];
for(B=0,N=O.length;
B<N;
++B){O[B]=[E[0]+O[B][0],E[1]+O[B][1]]
}}}G=this.runAttrs[M]=[E];
if(O.length>0){G=G.concat(O)
}G[G.length]=C
}else{h.setRunAttr.call(this,M)
}}});
var o=function(s,q){var r=k.Dom.getXY(this.el);
return[s[0]-r[0]+q[0],s[1]-r[1]+q[1]]
}
})()
})();
(function(){var l=Math.abs,a=Math.PI,b=Math.asin,c=Math.pow,k=Math.sin,j=Ext.lib;
Ext.apply(j.Easing,{easeBoth:function(o,p,h,n){return((o/=n/2)<1)?h/2*o*o+p:-h/2*((--o)*(o-2)-1)+p
},easeInStrong:function(o,p,h,n){return h*(o/=n)*o*o*o+p
},easeOutStrong:function(o,p,h,n){return -h*((o=o/n-1)*o*o*o-1)+p
},easeBothStrong:function(o,p,h,n){return((o/=n/2)<1)?h/2*o*o*o*o+p:-h/2*((o-=2)*o*o*o-2)+p
},elasticIn:function(p,s,t,u,r,v){if(p==0||(p/=u)==1){return p==0?s:s+t
}v=v||(u*0.3);
var h;
if(r>=l(t)){h=v/(2*a)*b(t/r)
}else{r=t;
h=v/4
}return -(r*c(2,10*(p-=1))*k((p*u-h)*(2*a)/v))+s
},elasticOut:function(p,s,t,u,r,v){if(p==0||(p/=u)==1){return p==0?s:s+t
}v=v||(u*0.3);
var h;
if(r>=l(t)){h=v/(2*a)*b(t/r)
}else{r=t;
h=v/4
}return r*c(2,-10*p)*k((p*u-h)*(2*a)/v)+t+s
},elasticBoth:function(p,s,t,u,r,v){if(p==0||(p/=u/2)==2){return p==0?s:s+t
}v=v||(u*(0.3*1.5));
var h;
if(r>=l(t)){h=v/(2*a)*b(t/r)
}else{r=t;
h=v/4
}return p<1?-0.5*(r*c(2,10*(p-=1))*k((p*u-h)*(2*a)/v))+s:r*c(2,-10*(p-=1))*k((p*u-h)*(2*a)/v)*0.5+t+s
},backIn:function(p,q,r,h,o){o=o||1.70158;
return r*(p/=h)*p*((o+1)*p-o)+q
},backOut:function(p,q,r,h,o){if(!o){o=1.70158
}return r*((p=p/h-1)*p*((o+1)*p+o)+1)+q
},backBoth:function(p,q,r,h,o){o=o||1.70158;
return((p/=h/2)<1)?r/2*(p*p*(((o*=(1.525))+1)*p-o))+q:r/2*((p-=2)*p*(((o*=(1.525))+1)*p+o)+2)+q
},bounceIn:function(o,p,h,n){return h-j.Easing.bounceOut(n-o,0,h,n)+p
},bounceOut:function(o,p,h,n){if((o/=n)<(1/2.75)){return h*(7.5625*o*o)+p
}else{if(o<(2/2.75)){return h*(7.5625*(o-=(1.5/2.75))*o+0.75)+p
}else{if(o<(2.5/2.75)){return h*(7.5625*(o-=(2.25/2.75))*o+0.9375)+p
}}}return h*(7.5625*(o-=(2.625/2.75))*o+0.984375)+p
},bounceBoth:function(o,p,h,n){return(o<n/2)?j.Easing.bounceIn(o*2,0,h,n)*0.5+p:j.Easing.bounceOut(o*2-n,0,h,n)*0.5+h*0.5+p
}})
})();
(function(){var n=Ext.lib;
n.Anim.color=function(l,t,k,j,h,s){return n.Anim.run(l,t,k,j,h,s,n.ColorAnim)
};
n.ColorAnim=function(l,h,k,j){n.ColorAnim.superclass.constructor.call(this,l,h,k,j)
};
Ext.extend(n.ColorAnim,n.AnimBase);
var c=n.ColorAnim.superclass,m=/color$/i,p=/^transparent|rgba\(0, 0, 0, 0\)$/,a=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,r=/^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,q=/^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i,o=function(h){return typeof h!=="undefined"
};
function b(s){var k=parseInt,l,h=null,j;
if(s.length==3){return s
}Ext.each([r,a,q],function(t,u){l=(u%2==0)?16:10;
j=t.exec(s);
if(j&&j.length==4){h=[k(j[1],l),k(j[2],l),k(j[3],l)];
return false
}});
return h
}Ext.apply(n.ColorAnim.prototype,{getAttr:function(h){var k=this,l=k.el,j;
if(m.test(h)){while(l&&p.test(j=Ext.fly(l).getStyle(h))){l=l.parentNode;
j="fff"
}}else{j=c.getAttr.call(k,h)
}return j
},doMethod:function(z,w,l){var y=this,v,j=Math.floor,k,h,x;
if(m.test(z)){v=[];
l=l||[];
for(k=0,h=w.length;
k<h;
k++){x=w[k];
v[k]=c.doMethod.call(y,z,x,l[k])
}v="rgb("+j(v[0])+","+j(v[1])+","+j(v[2])+")"
}else{v=c.doMethod.call(y,z,w,l)
}return v
},setRunAttr:function(h){var A=this,z=A.attributes[h],y=z.to,B=z.by,w;
c.setRunAttr.call(A,h);
w=A.runAttrs[h];
if(m.test(h)){var x=b(w.start),l=b(w.end);
if(!o(y)&&o(B)){l=b(B);
for(var k=0,j=x.length;
k<j;
k++){l[k]=x[k]+l[k]
}}w.start=x;
w.end=l
}}})
})();
(function(){var c=Ext.lib;
c.Anim.scroll=function(o,q,n,m,r,p){return c.Anim.run(o,q,n,m,r,p,c.Scroll)
};
c.Scroll=function(m,n,l,k){if(m){c.Scroll.superclass.constructor.call(this,m,n,l,k)
}};
Ext.extend(c.Scroll,c.ColorAnim);
var a=c.Scroll.superclass,b="scroll";
Ext.apply(c.Scroll.prototype,{doMethod:function(t,n,s){var p,q=this,o=q.curFrame,r=q.totalFrames;
if(t==b){p=[q.method(o,n[0],s[0]-n[0],r),q.method(o,n[1],s[1]-n[1],r)]
}else{p=a.doMethod.call(q,t,n,s)
}return p
},getAttr:function(k){var j=this;
if(k==b){return[j.el.scrollLeft,j.el.scrollTop]
}else{return a.getAttr.call(j,k)
}},setAttr:function(n,k,l){var m=this;
if(n==b){m.el.scrollLeft=k[0];
m.el.scrollTop=k[1]
}else{a.setAttr.call(m,n,k,l)
}}})
})();
if(Ext.isIE){function e(){var a=Function.prototype;
delete a.createSequence;
delete a.defer;
delete a.createDelegate;
delete a.createCallback;
delete a.createInterceptor;
window.detachEvent("onunload",e)
}window.attachEvent("onunload",e)
}})();
(function(){var m=Ext.util,k=Ext.each,n=true,l=false;
m.Observable=function(){var b=this,a=b.events;
if(b.listeners){b.on(b.listeners);
delete b.listeners
}b.events=a||{}
};
m.Observable.prototype={filterOptRe:/^(?:scope|delay|buffer|single)$/,fireEvent:function(){var c=Array.prototype.slice.call(arguments,0),a=c[0].toLowerCase(),j=this,b=n,g=j.events[a],d,h,e;
if(j.eventsSuspended===n){if(h=j.eventQueue){h.push(c)
}}else{if(typeof g=="object"){if(g.bubble){if(g.fire.apply(g,c.slice(1))===l){return l
}e=j.getBubbleTarget&&j.getBubbleTarget();
if(e&&e.enableBubble){d=e.events[a];
if(!d||typeof d!="object"||!d.bubble){e.enableBubble(a)
}return e.fireEvent.apply(e,c)
}}else{c.shift();
b=g.fire.apply(g,c)
}}}return b
},addListener:function(c,a,b,e){var j=this,g,d,h;
if(typeof c=="object"){e=c;
for(g in e){d=e[g];
if(!j.filterOptRe.test(g)){j.addListener(g,d.fn||d,d.scope||e.scope,d.fn?d:e)
}}}else{c=c.toLowerCase();
h=j.events[c]||n;
if(typeof h=="boolean"){j.events[c]=h=new m.Event(j,c)
}h.addListener(a,b,typeof e=="object"?e:{})
}},removeListener:function(c,a,b){var d=this.events[c.toLowerCase()];
if(typeof d=="object"){d.removeListener(a,b)
}},purgeListeners:function(){var a=this.events,c,b;
for(b in a){c=a[b];
if(typeof c=="object"){c.clearListeners()
}}},addEvents:function(d){var a=this;
a.events=a.events||{};
if(typeof d=="string"){var c=arguments,b=c.length;
while(b--){a.events[c[b]]=a.events[c[b]]||n
}}else{Ext.applyIf(a.events,d)
}},hasListener:function(b){var a=this.events[b.toLowerCase()];
return typeof a=="object"&&a.listeners.length>0
},suspendEvents:function(a){this.eventsSuspended=n;
if(a&&!this.eventQueue){this.eventQueue=[]
}},resumeEvents:function(){var b=this,a=b.eventQueue||[];
b.eventsSuspended=l;
delete b.eventQueue;
k(a,function(c){b.fireEvent.apply(b,c)
})
}};
var p=m.Observable.prototype;
p.on=p.addListener;
p.un=p.removeListener;
m.Observable.releaseCapture=function(a){a.fireEvent=p.fireEvent
};
function o(b,a,c){return function(){if(a.target==arguments[0]){b.apply(c,Array.prototype.slice.call(arguments,0))
}}
}function r(d,c,b,a){b.task=new m.DelayedTask();
return function(){b.task.delay(c.buffer,d,a,Array.prototype.slice.call(arguments,0))
}
}function q(a,d,b,c){return function(){d.removeListener(b,c);
return a.apply(c,arguments)
}
}function s(d,c,b,a){return function(){var e=new m.DelayedTask(),g=Array.prototype.slice.call(arguments,0);
if(!b.tasks){b.tasks=[]
}b.tasks.push(e);
e.delay(c.delay||10,function(){b.tasks.remove(e);
d.apply(a,g)
},a)
}
}m.Event=function(a,b){this.name=b;
this.obj=a;
this.listeners=[]
};
m.Event.prototype={addListener:function(d,e,a){var c=this,b;
e=e||c.obj;
if(!c.isListening(d,e)){b=c.createListener(d,e,a);
if(c.firing){c.listeners=c.listeners.slice(0)
}c.listeners.push(b)
}},createListener:function(d,e,c){c=c||{};
e=e||this.obj;
var b={fn:d,scope:e,options:c},a=d;
if(c.target){a=o(a,c,e)
}if(c.delay){a=s(a,c,b,e)
}if(c.single){a=q(a,this,d,e)
}if(c.buffer){a=r(a,c,b,e)
}b.fireFn=a;
return b
},findListener:function(d,e){var c=this.listeners,a=c.length,b;
e=e||this.obj;
while(a--){b=c[a];
if(b){if(b.fn==d&&b.scope==e){return a
}}}return -1
},isListening:function(a,b){return this.findListener(a,b)!=-1
},removeListener:function(c,d){var e,a,h,b=this,g=l;
if((e=b.findListener(c,d))!=-1){if(b.firing){b.listeners=b.listeners.slice(0)
}a=b.listeners[e];
if(a.task){a.task.cancel();
delete a.task
}h=a.tasks&&a.tasks.length;
if(h){while(h--){a.tasks[h].cancel()
}delete a.tasks
}b.listeners.splice(e,1);
g=n
}return g
},clearListeners:function(){var c=this,b=c.listeners,a=b.length;
while(a--){c.removeListener(b[a].fn,b[a].scope)
}},fire:function(){var c=this,d=c.listeners,b=d.length,e=0,a;
if(b>0){c.firing=n;
var g=Array.prototype.slice.call(arguments,0);
for(;
e<b;
e++){a=d[e];
if(a&&a.fireFn.apply(a.scope||c.obj||window,g)===l){return(c.firing=l)
}}}c.firing=l;
return n
}}
})();
Ext.DomHelper=function(){var y=null,L=/^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,J=/^table|tbody|tr|td$/i,R=/tag|children|cn|html$/i,C=/td|tr|tbody/i,H=/([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi,A=/end/i,E,I="afterbegin",G="afterend",S="beforebegin",F="beforeend",U="<table>",N="</table>",T=U+"<tbody>",M="</tbody>"+N,K=T+"<tr>",z="</tr>"+M;
function O(h,c,e,b,a,g){var d=E.insertHtml(b,Ext.getDom(h),B(c));
return e?Ext.get(d,true):d
}function B(c){var e="",h,d,g,b;
if(typeof c=="string"){e=c
}else{if(Ext.isArray(c)){for(var a=0;
a<c.length;
a++){if(c[a]){e+=B(c[a])
}}}else{e+="<"+(c.tag=c.tag||"div");
for(h in c){d=c[h];
if(!R.test(h)){if(typeof d=="object"){e+=" "+h+'="';
for(g in d){e+=g+":"+d[g]+";"
}e+='"'
}else{e+=" "+({cls:"class",htmlFor:"for"}[h]||h)+'="'+d+'"'
}}}if(L.test(c.tag)){e+="/>"
}else{e+=">";
if((b=c.children||c.cn)){e+=B(b)
}else{if(c.html){e+=c.html
}}e+="</"+c.tag+">"
}}}return e
}function P(b,g,j,d){y.innerHTML=[g,j,d].join("");
var h=-1,a=y,e;
while(++h<b){a=a.firstChild
}if(e=a.nextSibling){var c=document.createDocumentFragment();
while(a){e=a.nextSibling;
c.appendChild(a);
a=e
}a=c
}return a
}function Q(g,d,e,a){var c,b;
y=y||document.createElement("div");
if(g=="td"&&(d==I||d==F)||!C.test(g)&&(d==S||d==G)){return
}b=d==S?e:d==G?e.nextSibling:d==I?e.firstChild:null;
if(d==S||d==G){e=e.parentNode
}if(g=="td"||(g=="tr"&&(d==F||d==I))){c=P(4,K,a,z)
}else{if((g=="tbody"&&(d==F||d==I))||(g=="tr"&&(d==S||d==G))){c=P(3,T,a,M)
}else{c=P(2,U,a,N)
}}e.insertBefore(c,b);
return c
}function D(a){var b=document.createElement("div"),g=document.createDocumentFragment(),d=0,e,c;
b.innerHTML=a;
c=b.childNodes;
e=c.length;
for(;
d<e;
d++){g.appendChild(c[d].cloneNode(true))
}return g
}E={markup:function(a){return B(a)
},applyStyles:function(c,b){if(b){var a;
c=Ext.fly(c);
if(typeof b=="function"){b=b.call()
}if(typeof b=="string"){H.lastIndex=0;
while((a=H.exec(b))){c.setStyle(a[1],a[2])
}}else{if(typeof b=="object"){c.setStyle(b)
}}}},insertHtml:function(a,g,l){var c={},d,k,b,j,h,e;
a=a.toLowerCase();
c[S]=["BeforeBegin","previousSibling"];
c[G]=["AfterEnd","nextSibling"];
if(g.insertAdjacentHTML){if(J.test(g.tagName)&&(e=Q(g.tagName.toLowerCase(),a,g,l))){return e
}c[I]=["AfterBegin","firstChild"];
c[F]=["BeforeEnd","lastChild"];
if((d=c[a])){g.insertAdjacentHTML(d[0],l);
return g[d[1]]
}}else{k=g.ownerDocument.createRange();
j="setStart"+(A.test(a)?"After":"Before");
if(c[a]){k[j](g);
if(!k.createContextualFragment){h=D(l)
}else{h=k.createContextualFragment(l)
}g.parentNode.insertBefore(h,a==S?g:g.nextSibling);
return g[(a==S?"previous":"next")+"Sibling"]
}else{b=(a==I?"first":"last")+"Child";
if(g.firstChild){k[j](g[b]);
if(!k.createContextualFragment){h=D(l)
}else{h=k.createContextualFragment(l)
}if(a==I){g.insertBefore(h,g.firstChild)
}else{g.appendChild(h)
}}else{g.innerHTML=l
}return g[b]
}}throw'Illegal insertion point -> "'+a+'"'
},insertBefore:function(c,a,b){return O(c,a,b,S)
},insertAfter:function(c,a,b){return O(c,a,b,G,"nextSibling")
},insertFirst:function(c,a,b){return O(c,a,b,I,"firstChild")
},append:function(c,a,b){return O(c,a,b,F,"",true)
},overwrite:function(c,a,b){c=Ext.getDom(c);
c.innerHTML=B(a);
return b?Ext.get(c.firstChild):c.firstChild
},createHtml:B};
return E
}();
Ext.Template=function(l){var k=this,p=arguments,n=[],o;
if(Ext.isArray(l)){l=l.join("")
}else{if(p.length>1){for(var m=0,a=p.length;
m<a;
m++){o=p[m];
if(typeof o=="object"){Ext.apply(k,o)
}else{n.push(o)
}}l=n.join("")
}}k.html=l;
if(k.compiled){k.compile()
}};
Ext.Template.prototype={re:/\{([\w\-]+)\}/g,applyTemplate:function(d){var c=this;
return c.compiled?c.compiled(d):c.html.replace(c.re,function(b,a){return d[a]!==undefined?d[a]:""
})
},set:function(e,g){var d=this;
d.html=e;
d.compiled=null;
return g?d.compile():d
},compile:function(){var me=this,sep=Ext.isGecko?"+":",";
function fn(m,name){name="values['"+name+"']";
return"'"+sep+"("+name+" == undefined ? '' : "+name+")"+sep+"'"
}eval("this.compiled = function(values){ return "+(Ext.isGecko?"'":"['")+me.html.replace(/\\/g,"\\\\").replace(/(\r\n|\n)/g,"\\n").replace(/'/g,"\\'").replace(this.re,fn)+(Ext.isGecko?"';};":"'].join('');};"));
return me
},insertFirst:function(d,e,g){return this.doInsert("afterBegin",d,e,g)
},insertBefore:function(d,e,g){return this.doInsert("beforeBegin",d,e,g)
},insertAfter:function(d,e,g){return this.doInsert("afterEnd",d,e,g)
},append:function(d,e,g){return this.doInsert("beforeEnd",d,e,g)
},doInsert:function(l,j,g,h){j=Ext.getDom(j);
var k=Ext.DomHelper.insertHtml(l,j,this.applyTemplate(g));
return h?Ext.get(k,true):k
},overwrite:function(d,e,g){d=Ext.getDom(d);
d.innerHTML=this.applyTemplate(e);
return g?Ext.get(d.firstChild,true):d.firstChild
}};
Ext.Template.prototype.apply=Ext.Template.prototype.applyTemplate;
Ext.Template.from=function(c,d){c=Ext.getDom(c);
return new Ext.Template(c.value||c.innerHTML,d||"")
};
Ext.DomQuery=function(){var cache={},simpleCache={},valueCache={},nonSpace=/\S/,trimRe=/^\s+|\s+$/g,tplRe=/\{(\d+)\}/g,modeRe=/^(\s?[\/>+~]\s?|\s|$)/,tagTokenRe=/^(#)?([\w\-\*]+)/,nthRe=/(\d*)n\+?(\d*)/,nthRe2=/\D/,isIE=window.ActiveXObject?true:false,key=30803;
eval("var batch = 30803;");
function child(parent,index){var i=0,n=parent.firstChild;
while(n){if(n.nodeType==1){if(++i==index){return n
}}n=n.nextSibling
}return null
}function next(n){while((n=n.nextSibling)&&n.nodeType!=1){}return n
}function prev(n){while((n=n.previousSibling)&&n.nodeType!=1){}return n
}function children(parent){var n=parent.firstChild,nodeIndex=-1,nextNode;
while(n){nextNode=n.nextSibling;
if(n.nodeType==3&&!nonSpace.test(n.nodeValue)){parent.removeChild(n)
}else{n.nodeIndex=++nodeIndex
}n=nextNode
}return this
}function byClassName(nodeSet,cls){if(!cls){return nodeSet
}var result=[],ri=-1;
for(var i=0,ci;
ci=nodeSet[i];
i++){if((" "+ci.className+" ").indexOf(cls)!=-1){result[++ri]=ci
}}return result
}function attrValue(n,attr){if(!n.tagName&&typeof n.length!="undefined"){n=n[0]
}if(!n){return null
}if(attr=="for"){return n.htmlFor
}if(attr=="class"||attr=="className"){return n.className
}return n.getAttribute(attr)||n[attr]
}function getNodes(ns,mode,tagName){var result=[],ri=-1,cs;
if(!ns){return result
}tagName=tagName||"*";
if(typeof ns.getElementsByTagName!="undefined"){ns=[ns]
}if(!mode){for(var i=0,ni;
ni=ns[i];
i++){cs=ni.getElementsByTagName(tagName);
for(var j=0,ci;
ci=cs[j];
j++){result[++ri]=ci
}}}else{if(mode=="/"||mode==">"){var utag=tagName.toUpperCase();
for(var i=0,ni,cn;
ni=ns[i];
i++){cn=ni.childNodes;
for(var j=0,cj;
cj=cn[j];
j++){if(cj.nodeName==utag||cj.nodeName==tagName||tagName=="*"){result[++ri]=cj
}}}}else{if(mode=="+"){var utag=tagName.toUpperCase();
for(var i=0,n;
n=ns[i];
i++){while((n=n.nextSibling)&&n.nodeType!=1){}if(n&&(n.nodeName==utag||n.nodeName==tagName||tagName=="*")){result[++ri]=n
}}}else{if(mode=="~"){var utag=tagName.toUpperCase();
for(var i=0,n;
n=ns[i];
i++){while((n=n.nextSibling)){if(n.nodeName==utag||n.nodeName==tagName||tagName=="*"){result[++ri]=n
}}}}}}}return result
}function concat(a,b){if(b.slice){return a.concat(b)
}for(var i=0,l=b.length;
i<l;
i++){a[a.length]=b[i]
}return a
}function byTag(cs,tagName){if(cs.tagName||cs==document){cs=[cs]
}if(!tagName){return cs
}var result=[],ri=-1;
tagName=tagName.toLowerCase();
for(var i=0,ci;
ci=cs[i];
i++){if(ci.nodeType==1&&ci.tagName.toLowerCase()==tagName){result[++ri]=ci
}}return result
}function byId(cs,id){if(cs.tagName||cs==document){cs=[cs]
}if(!id){return cs
}var result=[],ri=-1;
for(var i=0,ci;
ci=cs[i];
i++){if(ci&&ci.id==id){result[++ri]=ci;
return result
}}return result
}function byAttribute(cs,attr,value,op,custom){var result=[],ri=-1,useGetStyle=custom=="{",fn=Ext.DomQuery.operators[op],a,xml,hasXml;
for(var i=0,ci;
ci=cs[i];
i++){if(ci.nodeType!=1){continue
}if(!hasXml){xml=Ext.DomQuery.isXml(ci);
hasXml=true
}if(!xml){if(useGetStyle){a=Ext.DomQuery.getStyle(ci,attr)
}else{if(attr=="class"||attr=="className"){a=ci.className
}else{if(attr=="for"){a=ci.htmlFor
}else{if(attr=="href"){a=ci.getAttribute("href",2)
}else{a=ci.getAttribute(attr)
}}}}}else{a=ci.getAttribute(attr)
}if((fn&&fn(a,value))||(!fn&&a)){result[++ri]=ci
}}return result
}function byPseudo(cs,name,value){return Ext.DomQuery.pseudos[name](cs,value)
}function nodupIEXml(cs){var d=++key,r;
cs[0].setAttribute("_nodup",d);
r=[cs[0]];
for(var i=1,len=cs.length;
i<len;
i++){var c=cs[i];
if(!c.getAttribute("_nodup")!=d){c.setAttribute("_nodup",d);
r[r.length]=c
}}for(var i=0,len=cs.length;
i<len;
i++){cs[i].removeAttribute("_nodup")
}return r
}function nodup(cs){if(!cs){return[]
}var len=cs.length,c,i,r=cs,cj,ri=-1;
if(!len||typeof cs.nodeType!="undefined"||len==1){return cs
}if(isIE&&typeof cs[0].selectSingleNode!="undefined"){return nodupIEXml(cs)
}var d=++key;
cs[0]._nodup=d;
for(i=1;
c=cs[i];
i++){if(c._nodup!=d){c._nodup=d
}else{r=[];
for(var j=0;
j<i;
j++){r[++ri]=cs[j]
}for(j=i+1;
cj=cs[j];
j++){if(cj._nodup!=d){cj._nodup=d;
r[++ri]=cj
}}return r
}}return r
}function quickDiffIEXml(c1,c2){var d=++key,r=[];
for(var i=0,len=c1.length;
i<len;
i++){c1[i].setAttribute("_qdiff",d)
}for(var i=0,len=c2.length;
i<len;
i++){if(c2[i].getAttribute("_qdiff")!=d){r[r.length]=c2[i]
}}for(var i=0,len=c1.length;
i<len;
i++){c1[i].removeAttribute("_qdiff")
}return r
}function quickDiff(c1,c2){var len1=c1.length,d=++key,r=[];
if(!len1){return c2
}if(isIE&&typeof c1[0].selectSingleNode!="undefined"){return quickDiffIEXml(c1,c2)
}for(var i=0;
i<len1;
i++){c1[i]._qdiff=d
}for(var i=0,len=c2.length;
i<len;
i++){if(c2[i]._qdiff!=d){r[r.length]=c2[i]
}}return r
}function quickId(ns,mode,root,id){if(ns==root){var d=root.ownerDocument||root;
return d.getElementById(id)
}ns=getNodes(ns,mode,"*");
return byId(ns,id)
}return{getStyle:function(el,name){return Ext.fly(el).getStyle(name)
},compile:function(path,type){type=type||"select";
var fn=["var f = function(root){\n var mode; ++batch; var n = root || document;\n"],mode,lastPath,matchers=Ext.DomQuery.matchers,matchersLn=matchers.length,modeMatch,lmode=path.match(modeRe);
if(lmode&&lmode[1]){fn[fn.length]='mode="'+lmode[1].replace(trimRe,"")+'";';
path=path.replace(lmode[1],"")
}while(path.substr(0,1)=="/"){path=path.substr(1)
}while(path&&lastPath!=path){lastPath=path;
var tokenMatch=path.match(tagTokenRe);
if(type=="select"){if(tokenMatch){if(tokenMatch[1]=="#"){fn[fn.length]='n = quickId(n, mode, root, "'+tokenMatch[2]+'");'
}else{fn[fn.length]='n = getNodes(n, mode, "'+tokenMatch[2]+'");'
}path=path.replace(tokenMatch[0],"")
}else{if(path.substr(0,1)!="@"){fn[fn.length]='n = getNodes(n, mode, "*");'
}}}else{if(tokenMatch){if(tokenMatch[1]=="#"){fn[fn.length]='n = byId(n, "'+tokenMatch[2]+'");'
}else{fn[fn.length]='n = byTag(n, "'+tokenMatch[2]+'");'
}path=path.replace(tokenMatch[0],"")
}}while(!(modeMatch=path.match(modeRe))){var matched=false;
for(var j=0;
j<matchersLn;
j++){var t=matchers[j];
var m=path.match(t.re);
if(m){fn[fn.length]=t.select.replace(tplRe,function(x,i){return m[i]
});
path=path.replace(m[0],"");
matched=true;
break
}}if(!matched){throw'Error parsing selector, parsing failed at "'+path+'"'
}}if(modeMatch[1]){fn[fn.length]='mode="'+modeMatch[1].replace(trimRe,"")+'";';
path=path.replace(modeMatch[1],"")
}}fn[fn.length]="return nodup(n);\n}";
eval(fn.join(""));
return f
},jsSelect:function(path,root,type){root=root||document;
if(typeof root=="string"){root=document.getElementById(root)
}var paths=path.split(","),results=[];
for(var i=0,len=paths.length;
i<len;
i++){var subPath=paths[i].replace(trimRe,"");
if(!cache[subPath]){cache[subPath]=Ext.DomQuery.compile(subPath);
if(!cache[subPath]){throw subPath+" is not a valid selector"
}}var result=cache[subPath](root);
if(result&&result!=document){results=results.concat(result)
}}if(paths.length>1){return nodup(results)
}return results
},isXml:function(el){var docEl=(el?el.ownerDocument||el:0).documentElement;
return docEl?docEl.nodeName!=="HTML":false
},select:document.querySelectorAll?function(path,root,type){root=root||document;
if(!Ext.DomQuery.isXml(root)){try{var cs=root.querySelectorAll(path);
return Ext.toArray(cs)
}catch(ex){}}return Ext.DomQuery.jsSelect.call(this,path,root,type)
}:function(path,root,type){return Ext.DomQuery.jsSelect.call(this,path,root,type)
},selectNode:function(path,root){return Ext.DomQuery.select(path,root)[0]
},selectValue:function(path,root,defaultValue){path=path.replace(trimRe,"");
if(!valueCache[path]){valueCache[path]=Ext.DomQuery.compile(path,"select")
}var n=valueCache[path](root),v;
n=n[0]?n[0]:n;
if(typeof n.normalize=="function"){n.normalize()
}v=(n&&n.firstChild?n.firstChild.nodeValue:null);
return((v===null||v===undefined||v==="")?defaultValue:v)
},selectNumber:function(path,root,defaultValue){var v=Ext.DomQuery.selectValue(path,root,defaultValue||0);
return parseFloat(v)
},is:function(el,ss){if(typeof el=="string"){el=document.getElementById(el)
}var isArray=Ext.isArray(el),result=Ext.DomQuery.filter(isArray?el:[el],ss);
return isArray?(result.length==el.length):(result.length>0)
},filter:function(els,ss,nonMatches){ss=ss.replace(trimRe,"");
if(!simpleCache[ss]){simpleCache[ss]=Ext.DomQuery.compile(ss,"simple")
}var result=simpleCache[ss](els);
return nonMatches?quickDiff(result,els):result
},matchers:[{re:/^\.([\w\-]+)/,select:'n = byClassName(n, " {1} ");'},{re:/^\:([\w\-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,select:'n = byPseudo(n, "{1}", "{2}");'},{re:/^(?:([\[\{])(?:@)?([\w\-]+)\s?(?:(=|.=)\s?(["']?)(.*?)\4)?[\]\}])/,select:'n = byAttribute(n, "{2}", "{5}", "{3}", "{1}");'},{re:/^#([\w\-]+)/,select:'n = byId(n, "{1}");'},{re:/^@([\w\-]+)/,select:'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'}],operators:{"=":function(a,v){return a==v
},"!=":function(a,v){return a!=v
},"^=":function(a,v){return a&&a.substr(0,v.length)==v
},"$=":function(a,v){return a&&a.substr(a.length-v.length)==v
},"*=":function(a,v){return a&&a.indexOf(v)!==-1
},"%=":function(a,v){return(a%v)==0
},"|=":function(a,v){return a&&(a==v||a.substr(0,v.length+1)==v+"-")
},"~=":function(a,v){return a&&(" "+a+" ").indexOf(" "+v+" ")!=-1
}},pseudos:{"first-child":function(c){var r=[],ri=-1,n;
for(var i=0,ci;
ci=n=c[i];
i++){while((n=n.previousSibling)&&n.nodeType!=1){}if(!n){r[++ri]=ci
}}return r
},"last-child":function(c){var r=[],ri=-1,n;
for(var i=0,ci;
ci=n=c[i];
i++){while((n=n.nextSibling)&&n.nodeType!=1){}if(!n){r[++ri]=ci
}}return r
},"nth-child":function(c,a){var r=[],ri=-1,m=nthRe.exec(a=="even"&&"2n"||a=="odd"&&"2n+1"||!nthRe2.test(a)&&"n+"+a||a),f=(m[1]||1)-0,l=m[2]-0;
for(var i=0,n;
n=c[i];
i++){var pn=n.parentNode;
if(batch!=pn._batch){var j=0;
for(var cn=pn.firstChild;
cn;
cn=cn.nextSibling){if(cn.nodeType==1){cn.nodeIndex=++j
}}pn._batch=batch
}if(f==1){if(l==0||n.nodeIndex==l){r[++ri]=n
}}else{if((n.nodeIndex+l)%f==0){r[++ri]=n
}}}return r
},"only-child":function(c){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if(!prev(ci)&&!next(ci)){r[++ri]=ci
}}return r
},empty:function(c){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){var cns=ci.childNodes,j=0,cn,empty=true;
while(cn=cns[j]){++j;
if(cn.nodeType==1||cn.nodeType==3){empty=false;
break
}}if(empty){r[++ri]=ci
}}return r
},contains:function(c,v){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if((ci.textContent||ci.innerText||"").indexOf(v)!=-1){r[++ri]=ci
}}return r
},nodeValue:function(c,v){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if(ci.firstChild&&ci.firstChild.nodeValue==v){r[++ri]=ci
}}return r
},checked:function(c){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if(ci.checked==true){r[++ri]=ci
}}return r
},not:function(c,ss){return Ext.DomQuery.filter(c,ss,true)
},any:function(c,selectors){var ss=selectors.split("|"),r=[],ri=-1,s;
for(var i=0,ci;
ci=c[i];
i++){for(var j=0;
s=ss[j];
j++){if(Ext.DomQuery.is(ci,s)){r[++ri]=ci;
break
}}}return r
},odd:function(c){return this["nth-child"](c,"odd")
},even:function(c){return this["nth-child"](c,"even")
},nth:function(c,a){return c[a-1]||[]
},first:function(c){return c[0]||[]
},last:function(c){return c[c.length-1]||[]
},has:function(c,ss){var s=Ext.DomQuery.select,r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if(s(ss,ci).length>0){r[++ri]=ci
}}return r
},next:function(c,ss){var is=Ext.DomQuery.is,r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){var n=next(ci);
if(n&&is(n,ss)){r[++ri]=ci
}}return r
},prev:function(c,ss){var is=Ext.DomQuery.is,r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){var n=prev(ci);
if(n&&is(n,ss)){r[++ri]=ci
}}return r
}}}
}();
Ext.query=Ext.DomQuery.select;
Ext.util.DelayedTask=function(m,n,j){var l=this,k,h=function(){clearInterval(k);
k=null;
m.apply(n,j||[])
};
l.delay=function(c,a,b,d){l.cancel();
m=a||m;
n=b||n;
j=d||j;
k=setInterval(h,c)
};
l.cancel=function(){if(k){clearInterval(k);
k=null
}}
};
(function(){var o=document;
Ext.Element=function(b,a){var d=typeof b=="string"?o.getElementById(b):b,c;
if(!d){return null
}c=d.id;
if(!a&&c&&Ext.elCache[c]){return Ext.elCache[c].el
}this.dom=d;
this.id=c||Ext.id(d)
};
var r=Ext.DomHelper,q=Ext.Element,u=Ext.elCache;
q.prototype={set:function(c,a){var e=this.dom,b,d,a=(a!==false)&&!!e.setAttribute;
for(b in c){if(c.hasOwnProperty(b)){d=c[b];
if(b=="style"){r.applyStyles(e,d)
}else{if(b=="cls"){e.className=d
}else{if(a){e.setAttribute(b,d)
}else{e[b]=d
}}}}}return this
},defaultUnit:"px",is:function(a){return Ext.DomQuery.is(this.dom,a)
},focus:function(c,d){var b=this,d=d||b.dom;
try{if(Number(c)){b.focus.defer(c,null,[null,d])
}else{d.focus()
}}catch(a){}return b
},blur:function(){try{this.dom.blur()
}catch(a){}return this
},getValue:function(b){var a=this.dom.value;
return b?parseInt(a,10):a
},addListener:function(b,c,d,a){Ext.EventManager.on(this.dom,b,c,d||this,a);
return this
},removeListener:function(b,c,a){Ext.EventManager.removeListener(this.dom,b,c,a||this);
return this
},removeAllListeners:function(){Ext.EventManager.removeAll(this.dom);
return this
},purgeAllListeners:function(){Ext.EventManager.purgeElement(this,true);
return this
},addUnits:function(a){if(a===""||a=="auto"||a===undefined){a=a||""
}else{if(!isNaN(a)||!n.test(a)){a=a+(this.defaultUnit||"px")
}}return a
},load:function(a,c,b){Ext.Ajax.request(Ext.apply({params:c,url:a.url||a,callback:b,el:this.dom,indicatorText:a.indicatorText||""},Ext.isObject(a)?a:{}));
return this
},isBorderBox:function(){return Ext.isBorderBox||Ext.isForcedBorderBox||p[(this.dom.tagName||"").toLowerCase()]
},remove:function(){var b=this,a=b.dom;
if(a){delete b.dom;
Ext.removeNode(a)
}},hover:function(a,b,d,e){var c=this;
c.on("mouseenter",a,d||c.dom,e);
c.on("mouseleave",b,d||c.dom,e);
return c
},contains:function(a){return !a?false:Ext.lib.Dom.isAncestor(this.dom,a.dom?a.dom:a)
},getAttributeNS:function(a,b){return this.getAttribute(b,a)
},getAttribute:(function(){var c=document.createElement("table"),d=false,a="getAttribute" in c,b=/undefined|unknown/;
if(a){try{c.getAttribute("ext:qtip")
}catch(e){d=true
}return function(v,j){var k=this.dom,h;
if(k.getAttributeNS){h=k.getAttributeNS(j,v)||null
}if(h==null){if(j){if(d&&k.tagName.toUpperCase()=="TABLE"){try{h=k.getAttribute(j+":"+v)
}catch(g){h=""
}}else{h=k.getAttribute(j+":"+v)
}}else{h=k.getAttribute(v)||k[v]
}}return h||""
}
}else{return function(v,j){var k=this.om,g,h;
if(j){h=k[j+":"+v];
g=b.test(typeof h)?undefined:h
}else{g=k[v]
}return g||""
}
}c=null
})(),update:function(a){if(this.dom){this.dom.innerHTML=a
}return this
}};
var l=q.prototype;
q.addMethods=function(a){Ext.apply(l,a)
};
l.on=l.addListener;
l.un=l.removeListener;
l.autoBoxAdjust=true;
var n=/\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,s;
q.get=function(a){var b,c,d;
if(!a){return null
}if(typeof a=="string"){if(!(c=o.getElementById(a))){return null
}if(u[a]&&u[a].el){b=u[a].el;
b.dom=c
}else{b=q.addToCache(new q(c))
}return b
}else{if(a.tagName){if(!(d=a.id)){d=Ext.id(a)
}if(u[d]&&u[d].el){b=u[d].el;
b.dom=a
}else{b=q.addToCache(new q(a))
}return b
}else{if(a instanceof q){if(a!=s){if(Ext.isIE&&(a.id==undefined||a.id=="")){a.dom=a.dom
}else{a.dom=o.getElementById(a.id)||a.dom
}}return a
}else{if(a.isComposite){return a
}else{if(Ext.isArray(a)){return q.select(a)
}else{if(a==o){if(!s){var e=function(){};
e.prototype=q.prototype;
s=new e();
s.dom=o
}return s
}}}}}}return null
};
q.addToCache=function(b,a){a=a||b.id;
u[a]={el:b,data:{},events:{}};
return b
};
q.data=function(a,b,d){a=q.get(a);
if(!a){return null
}var c=u[a.id].data;
if(arguments.length==2){return c[b]
}else{return(c[b]=d)
}};
function m(){if(!Ext.enableGarbageCollector){clearInterval(q.collectorThreadId)
}else{var b,e,c,d;
for(b in u){d=u[b];
if(d.skipGC){continue
}e=d.el;
c=e.dom;
if(!c||!c.parentNode||(!c.offsetParent&&!o.getElementById(b))){if(Ext.enableListenerCollection){Ext.EventManager.removeAll(c)
}delete u[b]
}}if(Ext.isIE){var a={};
for(b in u){a[b]=u[b]
}u=Ext.elCache=a
}}}q.collectorThreadId=setInterval(m,30000);
var t=function(){};
t.prototype=q.prototype;
q.Flyweight=function(a){this.dom=a
};
q.Flyweight.prototype=new t();
q.Flyweight.prototype.isFlyweight=true;
q._flyweights={};
q.fly=function(c,b){var a=null;
b=b||"_global";
if(c=Ext.getDom(c)){(q._flyweights[b]=q._flyweights[b]||new q.Flyweight()).dom=c;
a=q._flyweights[b]
}return a
};
Ext.get=q.get;
Ext.fly=q.fly;
var p=Ext.isStrict?{select:1}:{input:1,select:1,textarea:1};
if(Ext.isIE||Ext.isGecko){p.button=1
}})();
Ext.Element.addMethods(function(){var k="parentNode",g="nextSibling",l="previousSibling",j=Ext.DomQuery,h=Ext.get;
return{findParent:function(a,b,n){var d=this.dom,o=document.body,c=0,e;
if(Ext.isGecko&&Object.prototype.toString.call(d)=="[object XULElement]"){return null
}b=b||50;
if(isNaN(b)){e=Ext.getDom(b);
b=Number.MAX_VALUE
}while(d&&d.nodeType==1&&c<b&&d!=o&&d!=e){if(j.is(d,a)){return n?h(d):d
}c++;
d=d.parentNode
}return null
},findParentNode:function(a,b,d){var c=Ext.fly(this.dom.parentNode,"_internal");
return c?c.findParent(a,b,d):null
},up:function(a,b){return this.findParentNode(a,b,true)
},select:function(a){return Ext.Element.select(a,this.dom)
},query:function(a){return j.select(a,this.dom)
},child:function(c,b){var a=j.selectNode(c,this.dom);
return b?a:h(a)
},down:function(c,b){var a=j.selectNode(" > "+c,this.dom);
return b?a:h(a)
},parent:function(b,a){return this.matchNode(k,k,b,a)
},next:function(b,a){return this.matchNode(g,g,b,a)
},prev:function(b,a){return this.matchNode(l,l,b,a)
},first:function(b,a){return this.matchNode(g,"firstChild",b,a)
},last:function(b,a){return this.matchNode(l,"lastChild",b,a)
},matchNode:function(d,a,e,c){var b=this.dom[a];
while(b){if(b.nodeType==1&&(!e||j.is(b,e))){return !c?h(b):b
}b=b[d]
}return null
}}
}());
Ext.Element.addMethods(function(){var g=Ext.getDom,e=Ext.get,d=Ext.DomHelper;
return{appendChild:function(a){return e(a).appendTo(this)
},appendTo:function(a){g(a).appendChild(this.dom);
return this
},insertBefore:function(a){(a=g(a)).parentNode.insertBefore(this.dom,a);
return this
},insertAfter:function(a){(a=g(a)).parentNode.insertBefore(this.dom,a.nextSibling);
return this
},insertFirst:function(a,b){a=a||{};
if(a.nodeType||a.dom||typeof a=="string"){a=g(a);
this.dom.insertBefore(a,this.dom.firstChild);
return !b?e(a):a
}else{return this.createChild(a,this.dom.firstChild,b)
}},replace:function(a){a=e(a);
this.insertBefore(a);
a.remove();
return this
},replaceWith:function(b){var a=this;
if(b.nodeType||b.dom||typeof b=="string"){b=g(b);
a.dom.parentNode.insertBefore(b,a.dom)
}else{b=d.insertBefore(a.dom,b)
}delete Ext.elCache[a.id];
Ext.removeNode(a.dom);
a.id=Ext.id(a.dom=b);
Ext.Element.addToCache(a.isFlyweight?new Ext.Element(a.dom):a);
return a
},createChild:function(b,c,a){b=b||{tag:"div"};
return c?d.insertBefore(c,b,a!==true):d[!this.dom.firstChild?"overwrite":"append"](this.dom,b,a!==true)
},wrap:function(c,b){var a=d.insertBefore(this.dom,c||{tag:"div"},!b);
a.dom?a.dom.appendChild(this.dom):a.appendChild(this.dom);
return a
},insertHtml:function(c,b,j){var a=d.insertHtml(c,this.dom,b);
return j?Ext.get(a):a
}}
}());
Ext.Element.addMethods(function(){var U=Ext.supports,ac={},H=/(-[a-z])/gi,N=document.defaultView,O=/alpha\(opacity=(.*)\)/i,Y=/^\s+|\s+$/g,R=Ext.Element,K=/\s+/,ah=/\w/g,af="padding",ag="margin",G="border",M="-left",S="-right",I="-top",V="-bottom",aa="-width",Q=Math,F="hidden",ae="isClipped",Z="overflow",W="overflow-x",X="overflow-y",P="originalClip",ab={l:G+M+aa,r:G+S+aa,t:G+I+aa,b:G+V+aa},ad={l:af+M,r:af+S,t:af+I,b:af+V},ai={l:ag+M,r:ag+S,t:ag+I,b:ag+V},L=Ext.Element.data;
function T(b,a){return a.charAt(1).toUpperCase()
}function J(a){return ac[a]||(ac[a]=a=="float"?(U.cssFloat?"cssFloat":"styleFloat"):a.replace(H,T))
}return{adjustWidth:function(c){var b=this;
var a=(typeof c=="number");
if(a&&b.autoBoxAdjust&&!b.isBorderBox()){c-=(b.getBorderWidth("lr")+b.getPadding("lr"))
}return(a&&c<0)?0:c
},adjustHeight:function(c){var b=this;
var a=(typeof c=="number");
if(a&&b.autoBoxAdjust&&!b.isBorderBox()){c-=(b.getBorderWidth("tb")+b.getPadding("tb"))
}return(a&&c<0)?0:c
},addClass:function(b){var a=this,c,g,d,e=[];
if(!Ext.isArray(b)){if(typeof b=="string"&&!this.hasClass(b)){a.dom.className+=" "+b
}}else{for(c=0,g=b.length;
c<g;
c++){d=b[c];
if(typeof d=="string"&&(" "+a.dom.className+" ").indexOf(" "+d+" ")==-1){e.push(d)
}}if(e.length){a.dom.className+=" "+e.join(" ")
}}return a
},removeClass:function(b){var a=this,c,g,h,d,e;
if(!Ext.isArray(b)){b=[b]
}if(a.dom&&a.dom.className){e=a.dom.className.replace(Y,"").split(K);
for(c=0,h=b.length;
c<h;
c++){d=b[c];
if(typeof d=="string"){d=d.replace(Y,"");
g=e.indexOf(d);
if(g!=-1){e.splice(g,1)
}}}a.dom.className=e.join(" ")
}return a
},radioClass:function(b){var a=this.dom.parentNode.childNodes,d,c,e;
b=Ext.isArray(b)?b:[b];
for(c=0,e=a.length;
c<e;
c++){d=a[c];
if(d&&d.nodeType==1){Ext.fly(d,"_internal").removeClass(b)
}}return this.addClass(b)
},toggleClass:function(a){return this.hasClass(a)?this.removeClass(a):this.addClass(a)
},hasClass:function(a){return a&&(" "+this.dom.className+" ").indexOf(" "+a+" ")!=-1
},replaceClass:function(a,b){return this.removeClass(a).addClass(b)
},isStyle:function(b,a){return this.getStyle(b)==a
},getStyle:function(){return N&&N.getComputedStyle?function(a){var c=this.dom,g,d,e,b;
if(c==document){return null
}a=J(a);
e=(g=c.style[a])?g:(d=N.getComputedStyle(c,""))?d[a]:null;
if(a=="marginRight"&&e!="0px"&&!U.correctRightMargin){b=c.style.display;
c.style.display="inline-block";
e=N.getComputedStyle(c,"").marginRight;
c.style.display=b
}if(a=="backgroundColor"&&e=="rgba(0, 0, 0, 0)"&&!U.correctTransparentColor){e="transparent"
}return e
}:function(a){var c=this.dom,e,d;
if(c==document){return null
}if(a=="opacity"){if(c.style.filter.match){if(e=c.style.filter.match(O)){var b=parseFloat(e[1]);
if(!isNaN(b)){return b?b/100:0
}}}return 1
}a=J(a);
return c.style[a]||((d=c.currentStyle)?d[a]:null)
}
}(),getColor:function(g,e,a){var c=this.getStyle(g),d=(typeof a!="undefined")?a:"#",b;
if(!c||(/transparent|inherit/.test(c))){return e
}if(/^r/.test(c)){Ext.each(c.slice(4,c.length-1).split(","),function(h){b=parseInt(h,10);
d+=(b<16?"0":"")+b.toString(16)
})
}else{c=c.replace("#","");
d+=c.length==3?c.replace(/^(\w)(\w)(\w)$/,"$1$1$2$2$3$3"):c
}return(d.length>5?d.toLowerCase():e)
},setStyle:function(a,b){var d,c;
if(typeof a!="object"){d={};
d[a]=b;
a=d
}for(c in a){b=a[c];
c=="opacity"?this.setOpacity(b):this.dom.style[J(c)]=b
}return this
},setOpacity:function(e,g){var b=this,d=b.dom.style;
if(!g||!b.anim){if(Ext.isIE){var c=e<1?"alpha(opacity="+e*100+")":"",a=d.filter.replace(O,"").replace(Y,"");
d.zoom=1;
d.filter=a+(a.length>0?" ":"")+c
}else{d.opacity=e
}}else{b.anim({opacity:{to:e}},b.preanim(arguments,1),null,0.35,"easeIn")
}return b
},clearOpacity:function(){var a=this.dom.style;
if(Ext.isIE){if(!Ext.isEmpty(a.filter)){a.filter=a.filter.replace(O,"").replace(Y,"")
}}else{a.opacity=a["-moz-opacity"]=a["-khtml-opacity"]=""
}return this
},getHeight:function(c){var d=this,a=d.dom,b=Ext.isIE&&d.isStyle("display","none"),e=Q.max(a.offsetHeight,b?0:a.clientHeight)||0;
e=!c?e:e-d.getBorderWidth("tb")-d.getPadding("tb");
return e<0?0:e
},getWidth:function(d){var c=this,a=c.dom,b=Ext.isIE&&c.isStyle("display","none"),e=Q.max(a.offsetWidth,b?0:a.clientWidth)||0;
e=!d?e:e-c.getBorderWidth("lr")-c.getPadding("lr");
return e<0?0:e
},setWidth:function(b,c){var a=this;
b=a.adjustWidth(b);
!c||!a.anim?a.dom.style.width=a.addUnits(b):a.anim({width:{to:b}},a.preanim(arguments,1));
return a
},setHeight:function(c,b){var a=this;
c=a.adjustHeight(c);
!b||!a.anim?a.dom.style.height=a.addUnits(c):a.anim({height:{to:c}},a.preanim(arguments,1));
return a
},getBorderWidth:function(a){return this.addStyles(a,ab)
},getPadding:function(a){return this.addStyles(a,ad)
},clip:function(){var b=this,a=b.dom;
if(!L(a,ae)){L(a,ae,true);
L(a,P,{o:b.getStyle(Z),x:b.getStyle(W),y:b.getStyle(X)});
b.setStyle(Z,F);
b.setStyle(W,F);
b.setStyle(X,F)
}return b
},unclip:function(){var c=this,a=c.dom;
if(L(a,ae)){L(a,ae,false);
var b=L(a,P);
if(b.o){c.setStyle(Z,b.o)
}if(b.x){c.setStyle(W,b.x)
}if(b.y){c.setStyle(X,b.y)
}}return c
},addStyles:function(j,a){var c=0,b=j.match(ah),d,e,g,h=b.length;
for(g=0;
g<h;
g++){d=b[g];
e=d&&parseInt(this.getStyle(a[d]),10);
if(e){c+=Q.abs(e)
}}return c
},margins:ai}
}());
(function(){var u=Ext.lib.Dom,t="left",p="right",r="top",n="bottom",o="position",s="static",q="relative",m="auto",l="z-index";
Ext.Element.addMethods({getX:function(){return u.getX(this.dom)
},getY:function(){return u.getY(this.dom)
},getXY:function(){return u.getXY(this.dom)
},getOffsetsTo:function(b){var c=this.getXY(),a=Ext.fly(b,"_internal").getXY();
return[c[0]-a[0],c[1]-a[1]]
},setX:function(b,a){return this.setXY([b,this.getY()],this.animTest(arguments,a,1))
},setY:function(a,b){return this.setXY([this.getX(),a],this.animTest(arguments,b,1))
},setLeft:function(a){this.setStyle(t,this.addUnits(a));
return this
},setTop:function(a){this.setStyle(r,this.addUnits(a));
return this
},setRight:function(a){this.setStyle(p,this.addUnits(a));
return this
},setBottom:function(a){this.setStyle(n,this.addUnits(a));
return this
},setXY:function(c,b){var a=this;
if(!b||!a.anim){u.setXY(a.dom,c)
}else{a.anim({points:{to:c}},a.preanim(arguments,1),"motion")
}return a
},setLocation:function(b,c,a){return this.setXY([b,c],this.animTest(arguments,a,2))
},moveTo:function(b,c,a){return this.setXY([b,c],this.animTest(arguments,a,2))
},getLeft:function(a){return !a?this.getX():parseInt(this.getStyle(t),10)||0
},getRight:function(b){var a=this;
return !b?a.getX()+a.getWidth():(a.getLeft(true)+a.getWidth())||0
},getTop:function(a){return !a?this.getY():parseInt(this.getStyle(r),10)||0
},getBottom:function(b){var a=this;
return !b?a.getY()+a.getHeight():(a.getTop(true)+a.getHeight())||0
},position:function(c,d,b,e){var a=this;
if(!c&&a.isStyle(o,s)){a.setStyle(o,q)
}else{if(c){a.setStyle(o,c)
}}if(d){a.setStyle(l,d)
}if(b||e){a.setXY([b||false,e||false])
}},clearPositioning:function(a){a=a||"";
this.setStyle({left:a,right:a,top:a,bottom:a,"z-index":"",position:s});
return this
},getPositioning:function(){var a=this.getStyle(t);
var b=this.getStyle(r);
return{position:this.getStyle(o),left:a,right:a?"":this.getStyle(p),top:b,bottom:b?"":this.getStyle(n),"z-index":this.getStyle(l)}
},setPositioning:function(b){var c=this,a=c.dom.style;
c.setStyle(b);
if(b.right==m){a.right=""
}if(b.bottom==m){a.bottom=""
}return c
},translatePoints:function(a,b){b=isNaN(a[1])?b:a[1];
a=isNaN(a[0])?a:a[0];
var e=this,d=e.isStyle(o,q),c=e.getXY(),h=parseInt(e.getStyle(t),10),g=parseInt(e.getStyle(r),10);
h=!isNaN(h)?h:(d?0:e.dom.offsetLeft);
g=!isNaN(g)?g:(d?0:e.dom.offsetTop);
return{left:(a-c[0]+h),top:(b-c[1]+g)}
},animTest:function(a,b,c){return !!b&&this.preanim?this.preanim(a,c):false
}})
})();
Ext.Element.addMethods({isScrollable:function(){var b=this.dom;
return b.scrollHeight>b.clientHeight||b.scrollWidth>b.clientWidth
},scrollTo:function(d,c){this.dom["scroll"+(/top/i.test(d)?"Top":"Left")]=c;
return this
},getScroll:function(){var k=this.dom,l=document,j=l.body,o=l.documentElement,d,m,n;
if(k==l||k==j){if(Ext.isIE&&Ext.isStrict){d=o.scrollLeft;
m=o.scrollTop
}else{d=window.pageXOffset;
m=window.pageYOffset
}n={left:d||(j?j.scrollLeft:0),top:m||(j?j.scrollTop:0)}
}else{n={left:k.scrollLeft,top:k.scrollTop}
}return n
}});
Ext.Element.VISIBILITY=1;
Ext.Element.DISPLAY=2;
Ext.Element.OFFSETS=3;
Ext.Element.ASCLASS=4;
Ext.Element.visibilityCls="x-hide-nosize";
Ext.Element.addMethods(function(){var A=Ext.Element,q="opacity",w="visibility",z="display",B="hidden",s="offsets",v="asclass",t="none",E="nosize",D="originalDisplay",C="visibilityMode",y="isVisible",x=A.data,u=function(a){var b=x(a,D);
if(b===undefined){x(a,D,b="")
}return b
},r=function(a){var b=x(a,C);
if(b===undefined){x(a,C,b=1)
}return b
};
return{originalDisplay:"",visibilityMode:1,setVisibilityMode:function(a){x(this.dom,C,a);
return this
},animate:function(d,b,c,a,e){this.anim(d,{duration:b,callback:c,easing:a},e);
return this
},anim:function(e,d,h,b,g,j){h=h||"run";
d=d||{};
var c=this,a=Ext.lib.Anim[h](c.dom,e,(d.duration||b)||0.35,(d.easing||g)||"easeOut",function(){if(j){j.call(c)
}if(d.callback){d.callback.call(d.scope||c,c,d)
}},c);
d.anim=a;
return a
},preanim:function(b,a){return !b[a]?false:(typeof b[a]=="object"?b[a]:{duration:b[a+1],callback:b[a+2],easing:b[a+3]})
},isVisible:function(){var c=this,a=c.dom,b=x(a,y);
if(typeof b=="boolean"){return b
}b=!c.isStyle(w,B)&&!c.isStyle(z,t)&&!((r(a)==A.ASCLASS)&&c.hasClass(c.visibilityCls||A.visibilityCls));
x(a,y,b);
return b
},setVisible:function(j,b){var e=this,a,c,d,g,h=e.dom,k=r(h);
if(typeof b=="string"){switch(b){case z:k=A.DISPLAY;
break;
case w:k=A.VISIBILITY;
break;
case s:k=A.OFFSETS;
break;
case E:case v:k=A.ASCLASS;
break
}e.setVisibilityMode(k);
b=false
}if(!b||!e.anim){if(k==A.ASCLASS){e[j?"removeClass":"addClass"](e.visibilityCls||A.visibilityCls)
}else{if(k==A.DISPLAY){return e.setDisplayed(j)
}else{if(k==A.OFFSETS){if(!j){e.hideModeStyles={position:e.getStyle("position"),top:e.getStyle("top"),left:e.getStyle("left")};
e.applyStyles({position:"absolute",top:"-10000px",left:"-10000px"})
}else{e.applyStyles(e.hideModeStyles||{position:"",top:"",left:""});
delete e.hideModeStyles
}}else{e.fixDisplay();
h.style.visibility=j?"visible":B
}}}}else{if(j){e.setOpacity(0.01);
e.setVisible(true)
}e.anim({opacity:{to:(j?1:0)}},e.preanim(arguments,1),null,0.35,"easeIn",function(){j||e.setVisible(false).setOpacity(1)
})
}x(h,y,j);
return e
},hasMetrics:function(){var a=this.dom;
return this.isVisible()||(r(a)==A.VISIBILITY)
},toggle:function(b){var a=this;
a.setVisible(!a.isVisible(),a.preanim(arguments,0));
return a
},setDisplayed:function(a){if(typeof a=="boolean"){a=a?u(this.dom):t
}this.setStyle(z,a);
return this
},fixDisplay:function(){var a=this;
if(a.isStyle(z,t)){a.setStyle(w,B);
a.setStyle(z,u(this.dom));
if(a.isStyle(z,t)){a.setStyle(z,"block")
}}},hide:function(a){if(typeof a=="string"){this.setVisible(false,a);
return this
}this.setVisible(false,this.preanim(arguments,0));
return this
},show:function(a){if(typeof a=="string"){this.setVisible(true,a);
return this
}this.setVisible(true,this.preanim(arguments,0));
return this
}}
}());
(function(){var C=null,M=undefined,R=true,H=false,S="setX",U="setY",aa="setXY",O="left",Q="bottom",I="top",P="right",K="height",V="width",T="points",E="hidden",B="absolute",G="visible",W="motion",N="position",J="easeOut",X=new Ext.Element.Flyweight(),F={},D=function(a){return a||{}
},L=function(a){X.dom=a;
X.id=Ext.id(a);
return X
},Y=function(a){if(!F[a]){F[a]=[]
}return F[a]
},Z=function(a,b){F[a]=b
};
Ext.enableFx=R;
Ext.Fx={switchStatements:function(b,a,c){return a.apply(this,c[b])
},slideIn:function(m,p){p=D(p);
var k=this,n=k.dom,g=n.style,d,c,h,a,b,g,l,e,j,o;
m=m||"t";
k.queueFx(p,function(){d=L(n).getXY();
L(n).fixDisplay();
c=L(n).getFxRestore();
h={x:d[0],y:d[1],0:d[0],1:d[1],width:n.offsetWidth,height:n.offsetHeight};
h.right=h.x+h.width;
h.bottom=h.y+h.height;
L(n).setWidth(h.width).setHeight(h.height);
a=L(n).fxWrap(c.pos,p,E);
g.visibility=G;
g.position=B;
function r(){L(n).fxUnwrap(a,c.pos,p);
g.width=c.width;
g.height=c.height;
L(n).afterFx(p)
}e={to:[h.x,h.y]};
j={to:h.width};
o={to:h.height};
function q(y,ad,x,A,v,t,ae,af,s,w,z){var u={};
L(y).setWidth(x).setHeight(A);
if(L(y)[v]){L(y)[v](t)
}ad[ae]=ad[af]="0";
if(s){u.width=s
}if(w){u.height=w
}if(z){u.points=z
}return u
}l=L(n).switchStatements(m.toLowerCase(),q,{t:[a,g,h.width,0,C,C,O,Q,C,o,C],l:[a,g,0,h.height,C,C,P,I,j,C,C],r:[a,g,h.width,h.height,S,h.right,O,I,C,C,e],b:[a,g,h.width,h.height,U,h.bottom,O,I,C,o,e],tl:[a,g,0,0,C,C,P,Q,j,o,e],bl:[a,g,0,0,U,h.y+h.height,P,I,j,o,e],br:[a,g,0,0,aa,[h.right,h.bottom],O,I,j,o,e],tr:[a,g,0,0,S,h.x+h.width,O,Q,j,o,e]});
g.visibility=G;
L(a).show();
arguments.callee.anim=L(a).fxanim(l,p,W,0.5,J,r)
});
return k
},slideOut:function(l,a){a=D(a);
var j=this,m=j.dom,e=m.style,d=j.getXY(),b,c,h,g,k={to:0};
l=l||"t";
j.queueFx(a,function(){c=L(m).getFxRestore();
h={x:d[0],y:d[1],0:d[0],1:d[1],width:m.offsetWidth,height:m.offsetHeight};
h.right=h.x+h.width;
h.bottom=h.y+h.height;
L(m).setWidth(h.width).setHeight(h.height);
b=L(m).fxWrap(c.pos,a,G);
e.visibility=G;
e.position=B;
L(b).setWidth(h.width).setHeight(h.height);
function o(){a.useDisplay?L(m).setDisplayed(H):L(m).hide();
L(m).fxUnwrap(b,c.pos,a);
e.width=c.width;
e.height=c.height;
L(m).afterFx(a)
}function n(y,q,s,p,u,r,v,t,w){var x={};
y[q]=y[s]="0";
x[p]=u;
if(r){x[r]=v
}if(t){x[t]=w
}return x
}g=L(m).switchStatements(l.toLowerCase(),n,{t:[e,O,Q,K,k],l:[e,P,I,V,k],r:[e,O,I,V,k,T,{to:[h.right,h.y]}],b:[e,O,I,K,k,T,{to:[h.x,h.bottom]}],tl:[e,P,Q,V,k,K,k],bl:[e,P,I,V,k,K,k,T,{to:[h.x,h.bottom]}],br:[e,O,I,V,k,K,k,T,{to:[h.x+h.width,h.bottom]}],tr:[e,O,Q,V,k,K,k,T,{to:[h.right,h.y]}]});
arguments.callee.anim=L(b).fxanim(g,a,W,0.5,J,o)
});
return j
},puff:function(a){a=D(a);
var c=this,b=c.dom,g=b.style,e,h,d;
c.queueFx(a,function(){e=L(b).getWidth();
h=L(b).getHeight();
L(b).clearOpacity();
L(b).show();
d=L(b).getFxRestore();
function j(){a.useDisplay?L(b).setDisplayed(H):L(b).hide();
L(b).clearOpacity();
L(b).setPositioning(d.pos);
g.width=d.width;
g.height=d.height;
g.fontSize="";
L(b).afterFx(a)
}arguments.callee.anim=L(b).fxanim({width:{to:L(b).adjustWidth(e*2)},height:{to:L(b).adjustHeight(h*2)},points:{by:[-e*0.5,-h*0.5]},opacity:{to:0},fontSize:{to:200,unit:"%"}},a,W,0.5,J,j)
});
return c
},switchOff:function(a){a=D(a);
var c=this,b=c.dom,e=b.style,d;
c.queueFx(a,function(){L(b).clearOpacity();
L(b).clip();
d=L(b).getFxRestore();
function g(){a.useDisplay?L(b).setDisplayed(H):L(b).hide();
L(b).clearOpacity();
L(b).setPositioning(d.pos);
e.width=d.width;
e.height=d.height;
L(b).afterFx(a)
}L(b).fxanim({opacity:{to:0.3}},C,C,0.1,C,function(){L(b).clearOpacity();
(function(){L(b).fxanim({height:{to:1},points:{by:[0,L(b).getHeight()*0.5]}},a,W,0.3,"easeIn",g)
}).defer(100)
})
});
return c
},highlight:function(e,a){a=D(a);
var c=this,b=c.dom,h=a.attr||"backgroundColor",g={},d;
c.queueFx(a,function(){L(b).clearOpacity();
L(b).show();
function j(){b.style[h]=d;
L(b).afterFx(a)
}d=b.style[h];
g[h]={from:e||"ffff9c",to:a.endColor||L(b).getColor(h)||"ffffff"};
arguments.callee.anim=L(b).fxanim(g,a,"color",1,"easeIn",j)
});
return c
},frame:function(h,d,a){a=D(a);
var e=this,b=e.dom,g,c;
e.queueFx(a,function(){h=h||"#C3DAF9";
if(h.length==6){h="#"+h
}d=d||1;
L(b).show();
var j=L(b).getXY(),l={x:j[0],y:j[1],0:j[0],1:j[1],width:b.offsetWidth,height:b.offsetHeight},m=function(){g=L(document.body||document.documentElement).createChild({style:{position:B,"z-index":35000,border:"0px solid "+h}});
return g.queueFx({},k)
};
arguments.callee.anim={isAnimated:true,stop:function(){d=0;
g.stopFx()
}};
function k(){var n=Ext.isBorderBox?2:1;
c=g.anim({top:{from:l.y,to:l.y-20},left:{from:l.x,to:l.x-20},borderWidth:{from:0,to:10},opacity:{from:1,to:0},height:{from:l.height,to:l.height+20*n},width:{from:l.width,to:l.width+20*n}},{duration:a.duration||1,callback:function(){g.remove();
--d>0?m():L(b).afterFx(a)
}});
arguments.callee.anim={isAnimated:true,stop:function(){c.stop()
}}
}m()
});
return e
},pause:function(a){var b=this.dom,c;
this.queueFx({},function(){c=setTimeout(function(){L(b).afterFx({})
},a*1000);
arguments.callee.anim={isAnimated:true,stop:function(){clearTimeout(c);
L(b).afterFx({})
}}
});
return this
},fadeIn:function(b){b=D(b);
var d=this,c=d.dom,a=b.endOpacity||1;
d.queueFx(b,function(){L(c).setOpacity(0);
L(c).fixDisplay();
c.style.visibility=G;
arguments.callee.anim=L(c).fxanim({opacity:{to:a}},b,C,0.5,J,function(){if(a==1){L(c).clearOpacity()
}L(c).afterFx(b)
})
});
return d
},fadeOut:function(b){b=D(b);
var d=this,c=d.dom,e=c.style,a=b.endOpacity||0;
d.queueFx(b,function(){arguments.callee.anim=L(c).fxanim({opacity:{to:a}},b,C,0.5,J,function(){if(a==0){Ext.Element.data(c,"visibilityMode")==Ext.Element.DISPLAY||b.useDisplay?e.display="none":e.visibility=E;
L(c).clearOpacity()
}L(c).afterFx(b)
})
});
return d
},scale:function(c,b,a){this.shift(Ext.apply({},a,{width:c,height:b}));
return this
},shift:function(a){a=D(a);
var b=this.dom,c={};
this.queueFx(a,function(){for(var d in a){if(a[d]!=M){c[d]={to:a[d]}
}}c.width?c.width.to=L(b).adjustWidth(a.width):c;
c.height?c.height.to=L(b).adjustWidth(a.height):c;
if(c.x||c.y||c.xy){c.points=c.xy||{to:[c.x?c.x.to:L(b).getX(),c.y?c.y.to:L(b).getY()]}
}arguments.callee.anim=L(b).fxanim(c,a,W,0.35,J,function(){L(b).afterFx(a)
})
});
return this
},ghost:function(l,b){b=D(b);
var j=this,a=j.dom,e=a.style,h={opacity:{to:0},points:{}},d=h.points,c,g,k;
l=l||"b";
j.queueFx(b,function(){c=L(a).getFxRestore();
g=L(a).getWidth();
k=L(a).getHeight();
function m(){b.useDisplay?L(a).setDisplayed(H):L(a).hide();
L(a).clearOpacity();
L(a).setPositioning(c.pos);
e.width=c.width;
e.height=c.height;
L(a).afterFx(b)
}d.by=L(a).switchStatements(l.toLowerCase(),function(n,o){return[n,o]
},{t:[0,-k],l:[-g,0],r:[g,0],b:[0,k],tl:[-g,-k],bl:[-g,k],br:[g,k],tr:[g,-k]});
arguments.callee.anim=L(a).fxanim(h,b,W,0.5,J,m)
});
return j
},syncFx:function(){var a=this;
a.fxDefaults=Ext.apply(a.fxDefaults||{},{block:H,concurrent:R,stopFx:H});
return a
},sequenceFx:function(){var a=this;
a.fxDefaults=Ext.apply(a.fxDefaults||{},{block:H,concurrent:H,stopFx:H});
return a
},nextFx:function(){var a=Y(this.dom.id)[0];
if(a){a.call(this)
}},hasActiveFx:function(){return Y(this.dom.id)[0]
},stopFx:function(d){var c=this,a=c.dom.id;
if(c.hasActiveFx()){var b=Y(a)[0];
if(b&&b.anim){if(b.anim.isAnimated){Z(a,[b]);
b.anim.stop(d!==undefined?d:R)
}else{Z(a,[])
}}}return c
},beforeFx:function(a){if(this.hasActiveFx()&&!a.concurrent){if(a.stopFx){this.stopFx();
return R
}return H
}return R
},hasFxBlock:function(){var a=Y(this.dom.id);
return a&&a[0]&&a[0].block
},queueFx:function(a,d){var c=L(this.dom);
if(!c.hasFxBlock()){Ext.applyIf(a,c.fxDefaults);
if(!a.concurrent){var b=c.beforeFx(a);
d.block=a.block;
Y(c.dom.id).push(d);
if(b){c.nextFx()
}}else{d.call(c)
}}return c
},fxWrap:function(a,c,e){var d=this.dom,g,h;
if(!c.wrap||!(g=Ext.getDom(c.wrap))){if(c.fixPosition){h=L(d).getXY()
}var b=document.createElement("div");
b.style.visibility=e;
g=d.parentNode.insertBefore(b,d);
L(g).setPositioning(a);
if(L(g).isStyle(N,"static")){L(g).position("relative")
}L(d).clearPositioning("auto");
L(g).clip();
g.appendChild(d);
if(h){L(g).setXY(h)
}}return g
},fxUnwrap:function(d,a,b){var c=this.dom;
L(c).clearPositioning();
L(c).setPositioning(a);
if(!b.wrap){var e=L(d).dom.parentNode;
e.insertBefore(c,d);
L(d).remove()
}},getFxRestore:function(){var a=this.dom.style;
return{pos:this.getPositioning(),width:a.width,height:a.height}
},afterFx:function(b){var c=this.dom,a=c.id;
if(b.afterStyle){L(c).setStyle(b.afterStyle)
}if(b.afterCls){L(c).addClass(b.afterCls)
}if(b.remove==R){L(c).remove()
}if(b.callback){b.callback.call(b.scope,L(c))
}if(!b.concurrent){Y(a).shift();
L(c).nextFx()
}},fxanim:function(d,c,g,b,e,h){g=g||"run";
c=c||{};
var a=Ext.lib.Anim[g](this.dom,d,(c.duration||b)||0.35,(c.easing||e)||J,h,this);
c.anim=a;
return a
}};
Ext.Fx.resize=Ext.Fx.scale;
Ext.Element.addMethods(Ext.Fx)
})();
Ext.CompositeElementLite=function(c,d){this.elements=[];
this.add(c,d);
this.el=new Ext.Element.Flyweight()
};
Ext.CompositeElementLite.prototype={isComposite:true,getElement:function(d){var c=this.el;
c.dom=d;
c.id=d.id;
return c
},transformElement:function(b){return Ext.getDom(b)
},getCount:function(){return this.elements.length
},add:function(m,h){var l=this,k=l.elements;
if(!m){return this
}if(typeof m=="string"){m=Ext.Element.selectorFunction(m,h)
}else{if(m.isComposite){m=m.elements
}else{if(!Ext.isIterable(m)){m=[m]
}}}for(var n=0,j=m.length;
n<j;
++n){k.push(l.transformElement(m[n]))
}return l
},invoke:function(n,e){var m=this,o=m.elements,k=o.length,l,p;
for(p=0;
p<k;
p++){l=o[p];
if(l){Ext.Element.prototype[n].apply(m.getElement(l),e)
}}return m
},item:function(e){var h=this,j=h.elements[e],g=null;
if(j){g=h.getElement(j)
}return g
},addListener:function(e,n,o,p){var q=this.elements,l=q.length,r,m;
for(r=0;
r<l;
r++){m=q[r];
if(m){Ext.EventManager.on(m,e,n,o||m,p)
}}return this
},each:function(n,o){var m=this,p=m.elements,k=p.length,e,l;
for(e=0;
e<k;
e++){l=p[e];
if(l){l=this.getElement(l);
if(n.call(o||l,l,m,e)===false){break
}}}return m
},fill:function(d){var c=this;
c.elements=[];
c.add(d);
return c
},filter:function(g){var e=[],h=this,j=Ext.isFunction(g)?g:function(a){return a.is(g)
};
h.each(function(a,c,b){if(j(a,b)!==false){e[e.length]=h.transformElement(a)
}});
h.elements=e;
return h
},indexOf:function(b){return this.elements.indexOf(this.transformElement(b))
},replaceElement:function(k,l,h){var d=!isNaN(k)?k:this.indexOf(k),j;
if(d>-1){l=Ext.getDom(l);
if(h){j=this.elements[d];
j.parentNode.insertBefore(l,j);
Ext.removeNode(j)
}this.elements.splice(d,1,l)
}return this
},clear:function(){this.elements=[]
}};
Ext.CompositeElementLite.prototype.on=Ext.CompositeElementLite.prototype.addListener;
Ext.CompositeElementLite.importElementMethods=function(){var g,d=Ext.Element.prototype,e=Ext.CompositeElementLite.prototype;
for(g in d){if(typeof d[g]=="function"){(function(a){e[a]=e[a]||function(){return this.invoke(a,arguments)
}
}).call(e,g)
}}};
Ext.CompositeElementLite.importElementMethods();
if(Ext.DomQuery){Ext.Element.selectorFunction=Ext.DomQuery.select
}Ext.Element.select=function(e,d){var g;
if(typeof e=="string"){g=Ext.Element.selectorFunction(e,d)
}else{if(e.length!==undefined){g=e
}else{throw"Invalid selector"
}}return new Ext.CompositeElementLite(g)
};
Ext.select=Ext.Element.select;
(function(){var j="beforerequest",o="requestcomplete",p="requestexception",m=undefined,q="load",l="POST",k="GET",n=window;
Ext.data.Connection=function(a){Ext.apply(this,a);
this.addEvents(j,o,p);
Ext.data.Connection.superclass.constructor.call(this)
};
Ext.extend(Ext.data.Connection,Ext.util.Observable,{timeout:30000,autoAbort:false,disableCaching:true,disableCachingParam:"_dc",request:function(c){var v=this;
if(v.fireEvent(j,v,c)){if(c.el){if(!Ext.isEmpty(c.indicatorText)){v.indicatorText='<div class="loading-indicator">'+c.indicatorText+"</div>"
}if(v.indicatorText){Ext.getDom(c.el).innerHTML=v.indicatorText
}c.success=(Ext.isFunction(c.success)?c.success:function(){}).createInterceptor(function(r){Ext.getDom(c.el).innerHTML=r.responseText
})
}var e=c.params,g=c.url||v.url,h,b={success:v.handleResponse,failure:v.handleFailure,scope:v,argument:{options:c},timeout:Ext.num(c.timeout,v.timeout)},d,u;
if(Ext.isFunction(e)){e=e.call(c.scope||n,c)
}e=Ext.urlEncode(v.extraParams,Ext.isObject(e)?Ext.urlEncode(e):e);
if(Ext.isFunction(g)){g=g.call(c.scope||n,c)
}if((d=Ext.getDom(c.form))){g=g||d.action;
if(c.isUpload||(/multipart\/form-data/i.test(d.getAttribute("enctype")))){return v.doFormUpload.call(v,c,e,g)
}u=Ext.lib.Ajax.serializeForm(d);
e=e?(e+"&"+u):u
}h=c.method||v.method||((e||c.xmlData||c.jsonData)?l:k);
if(h===k&&(v.disableCaching&&c.disableCaching!==false)||c.disableCaching===true){var a=c.disableCachingParam||v.disableCachingParam;
g=Ext.urlAppend(g,a+"="+(new Date().getTime()))
}c.headers=Ext.applyIf(c.headers||{},v.defaultHeaders||{});
if(c.autoAbort===true||v.autoAbort){v.abort()
}if((h==k||c.xmlData||c.jsonData)&&e){g=Ext.urlAppend(g,e);
e=""
}return(v.transId=Ext.lib.Ajax.request(h,g,b,e,c))
}else{return c.callback?c.callback.apply(c.scope,[c,m,m]):null
}},isLoading:function(a){return a?Ext.lib.Ajax.isCallInProgress(a):!!this.transId
},abort:function(a){if(a||this.isLoading()){Ext.lib.Ajax.abort(a||this.transId)
}},handleResponse:function(b){this.transId=false;
var a=b.argument.options;
b.argument=a?a.argument:null;
this.fireEvent(o,this,b,a);
if(a.success){a.success.call(a.scope,b,a)
}if(a.callback){a.callback.call(a.scope,a,true,b)
}},handleFailure:function(c,a){this.transId=false;
var b=c.argument.options;
c.argument=b?b.argument:null;
this.fireEvent(p,this,c,b,a);
if(b.failure){b.failure.call(b.scope,c,b)
}if(b.callback){b.callback.call(b.scope,b,false,c)
}},doFormUpload:function(b,w,h){var g=Ext.id(),x=document,a=x.createElement("iframe"),e=Ext.getDom(b.form),y=[],z,c="multipart/form-data",d={target:e.target,method:e.method,encoding:e.encoding,enctype:e.enctype,action:e.action};
Ext.fly(a).set({id:g,name:g,cls:"x-hidden",src:Ext.SSL_SECURE_URL});
x.body.appendChild(a);
if(Ext.isIE){document.frames[g].name=g
}Ext.fly(e).set({target:g,method:l,enctype:c,encoding:c,action:h||d.action});
Ext.iterate(Ext.urlDecode(w,false),function(r,s){z=x.createElement("input");
Ext.fly(z).set({type:"hidden",value:s,name:r});
e.appendChild(z);
y.push(z)
});
function A(){var s=this,t={responseText:"",responseXML:null,argument:b.argument},r,v;
try{r=a.contentWindow.document||a.contentDocument||n.frames[g].document;
if(r){if(r.body){if(/textarea/i.test((v=r.body.firstChild||{}).tagName)){t.responseText=v.value
}else{t.responseText=r.body.innerHTML
}}t.responseXML=r.XMLDocument||r
}}catch(B){}Ext.EventManager.removeListener(a,q,A,s);
s.fireEvent(o,s,t,b);
function u(E,F,G){if(Ext.isFunction(E)){E.apply(F,G)
}}u(b.success,b.scope,[t,b]);
u(b.callback,b.scope,[b,true,t]);
if(!s.debugUploads){setTimeout(function(){Ext.removeNode(a)
},100)
}}Ext.EventManager.on(a,q,A,this);
e.submit();
Ext.fly(e).set(d);
Ext.each(y,function(r){Ext.removeNode(r)
})
}})
})();
Ext.Ajax=new Ext.data.Connection({autoAbort:false,serializeForm:function(b){return Ext.lib.Ajax.serializeForm(b)
}});
Ext.util.JSON=new (function(){var useHasOwn=!!{}.hasOwnProperty,isNative=function(){var useNative=null;
return function(){if(useNative===null){useNative=Ext.USE_NATIVE_JSON&&window.JSON&&JSON.toString()=="[object JSON]"
}return useNative
}
}(),pad=function(n){return n<10?"0"+n:n
},doDecode=function(json){return json?eval("("+json+")"):""
},doEncode=function(o){if(!Ext.isDefined(o)||o===null){return"null"
}else{if(Ext.isArray(o)){return encodeArray(o)
}else{if(Ext.isDate(o)){return Ext.util.JSON.encodeDate(o)
}else{if(Ext.isString(o)){return encodeString(o)
}else{if(typeof o=="number"){return isFinite(o)?String(o):"null"
}else{if(Ext.isBoolean(o)){return String(o)
}else{var a=["{"],b,i,v;
for(i in o){if(!o.getElementsByTagName){if(!useHasOwn||o.hasOwnProperty(i)){v=o[i];
switch(typeof v){case"undefined":case"function":case"unknown":break;
default:if(b){a.push(",")
}a.push(doEncode(i),":",v===null?"null":doEncode(v));
b=true
}}}}a.push("}");
return a.join("")
}}}}}}},m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},encodeString=function(s){if(/["\\\x00-\x1f]/.test(s)){return'"'+s.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];
if(c){return c
}c=b.charCodeAt();
return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"'
}return'"'+s+'"'
},encodeArray=function(o){var a=["["],b,i,l=o.length,v;
for(i=0;
i<l;
i+=1){v=o[i];
switch(typeof v){case"undefined":case"function":case"unknown":break;
default:if(b){a.push(",")
}a.push(v===null?"null":Ext.util.JSON.encode(v));
b=true
}}a.push("]");
return a.join("")
};
this.encodeDate=function(o){return'"'+o.getFullYear()+"-"+pad(o.getMonth()+1)+"-"+pad(o.getDate())+"T"+pad(o.getHours())+":"+pad(o.getMinutes())+":"+pad(o.getSeconds())+'"'
};
this.encode=function(){var ec;
return function(o){if(!ec){ec=isNative()?JSON.stringify:doEncode
}return ec(o)
}
}();
this.decode=function(){var dc;
return function(json){if(!dc){dc=isNative()?JSON.parse:doDecode
}return dc(json)
}
}()
})();
Ext.encode=Ext.util.JSON.encode;
Ext.decode=Ext.util.JSON.decode;
Ext.EventManager=function(){var C,O,U=false,S=Ext.isGecko||Ext.isWebKit||Ext.isSafari,P=Ext.lib.Event,M=Ext.lib.Dom,aa=document,N=window,K="DOMContentLoaded",I="complete",X=/^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/,H=[];
function Q(d){var a=false,e=0,g=H.length,c=false,b;
if(d){if(d.getElementById||d.navigator){for(;
e<g;
++e){b=H[e];
if(b.el===d){a=b.id;
break
}}if(!a){a=Ext.id(d);
H.push({id:a,el:d});
c=true
}}else{a=Ext.id(d)
}if(!Ext.elCache[a]){Ext.Element.addToCache(new Ext.Element(d),a);
if(c){Ext.elCache[a].skipGC=true
}}}return a
}function R(l,j,e,k,a,c){l=Ext.getDom(l);
var b=Q(l),d=Ext.elCache[b].events,h;
h=P.on(l,j,a);
d[j]=d[j]||[];
d[j].push([e,a,c,h,k]);
if(l.addEventListener&&j=="mousewheel"){var g=["DOMMouseScroll",a,false];
l.addEventListener.apply(l,g);
Ext.EventManager.addListener(N,"unload",function(){l.removeEventListener.apply(l,g)
})
}if(l==aa&&j=="mousedown"){Ext.EventManager.stoppedMouseDownEvent.addListener(a)
}}function Z(){if(window!=top){return false
}try{aa.documentElement.doScroll("left")
}catch(a){return false
}ab();
return true
}function L(a){if(Ext.isIE&&Z()){return true
}if(aa.readyState==I){ab();
return true
}U||(O=setTimeout(arguments.callee,2));
return false
}var T;
function V(a){T||(T=Ext.query("style, link[rel=stylesheet]"));
if(T.length==aa.styleSheets.length){ab();
return true
}U||(O=setTimeout(arguments.callee,2));
return false
}function D(a){aa.removeEventListener(K,arguments.callee,false);
V()
}function ab(a){if(!U){U=true;
if(O){clearTimeout(O)
}if(S){aa.removeEventListener(K,ab,false)
}if(Ext.isIE&&L.bindIE){aa.detachEvent("onreadystatechange",L)
}P.un(N,"load",arguments.callee)
}if(C&&!Ext.isReady){Ext.isReady=true;
C.fire();
C.listeners=[]
}}function ac(){C||(C=new Ext.util.Event());
if(S){aa.addEventListener(K,ab,false)
}if(Ext.isIE){if(!L()){L.bindIE=true;
aa.attachEvent("onreadystatechange",L)
}}else{if(Ext.isOpera){(aa.readyState==I&&V())||aa.addEventListener(K,D,false)
}else{if(Ext.isWebKit){L()
}}}P.on(N,"load",ab)
}function E(b,a){return function(){var c=Ext.toArray(arguments);
if(a.target==Ext.EventObject.setEvent(c[0]).target){b.apply(this,c)
}}
}function F(b,a,c){return function(d){c.delay(a.buffer,b,null,[new Ext.EventObjectImpl(d)])
}
}function J(a,b,e,c,d){return function(g){Ext.EventManager.removeListener(b,e,c,d);
a(g)
}
}function Y(b,a,c){return function(d){var e=new Ext.util.DelayedTask(b);
if(!c.tasks){c.tasks=[]
}c.tasks.push(e);
e.delay(a.delay||10,b,null,[new Ext.EventObjectImpl(d)])
}
}function W(g,h,b,d,c){var a=(!b||typeof b=="boolean")?{}:b,k=Ext.getDom(g),j;
d=d||a.fn;
c=c||a.scope;
if(!k){throw'Error listening for "'+h+'". Element "'+g+"\" doesn't exist."
}function e(m){if(!Ext){return
}m=Ext.EventObject.setEvent(m);
var l;
if(a.delegate){if(!(l=m.getTarget(a.delegate,k))){return
}}else{l=m.target
}if(a.stopEvent){m.stopEvent()
}if(a.preventDefault){m.preventDefault()
}if(a.stopPropagation){m.stopPropagation()
}if(a.normalized===false){m=m.browserEvent
}d.call(c||k,m,l,a)
}if(a.target){e=E(e,a)
}if(a.delay){e=Y(e,a,d)
}if(a.single){e=J(e,k,h,d,c)
}if(a.buffer){j=new Ext.util.DelayedTask(e);
e=F(e,a,j)
}R(k,h,d,j,e,c);
return e
}var G={addListener:function(g,j,d,e,h){if(typeof j=="object"){var a=j,c,b;
for(c in a){b=a[c];
if(!X.test(c)){if(Ext.isFunction(b)){W(g,c,a,b,a.scope)
}else{W(g,c,b)
}}}}else{W(g,j,h,d,e)
}},removeListener:function(n,j,d,c){n=Ext.getDom(n);
var b=Q(n),g=n&&(Ext.elCache[b].events)[j]||[],a,k,m,l,h,e;
for(k=0,h=g.length;
k<h;
k++){if(Ext.isArray(e=g[k])&&e[0]==d&&(!c||e[2]==c)){if(e[4]){e[4].cancel()
}l=d.tasks&&d.tasks.length;
if(l){while(l--){d.tasks[l].cancel()
}delete d.tasks
}a=e[1];
P.un(n,j,P.extAdapter?e[3]:a);
if(a&&n.addEventListener&&j=="mousewheel"){n.removeEventListener("DOMMouseScroll",a,false)
}if(a&&n==aa&&j=="mousedown"){Ext.EventManager.stoppedMouseDownEvent.removeListener(a)
}g.splice(k,1);
if(g.length===0){delete Ext.elCache[b].events[j]
}for(l in Ext.elCache[b].events){return false
}Ext.elCache[b].events={};
return false
}}},removeAll:function(m){m=Ext.getDom(m);
var a=Q(m),g=Ext.elCache[a]||{},c=g.events||{},h,j,e,l,d,k,b;
for(l in c){if(c.hasOwnProperty(l)){h=c[l];
for(j=0,e=h.length;
j<e;
j++){d=h[j];
if(d[4]){d[4].cancel()
}if(d[0].tasks&&(k=d[0].tasks.length)){while(k--){d[0].tasks[k].cancel()
}delete d.tasks
}b=d[1];
P.un(m,l,P.extAdapter?d[3]:b);
if(m.addEventListener&&b&&l=="mousewheel"){m.removeEventListener("DOMMouseScroll",b,false)
}if(b&&m==aa&&l=="mousedown"){Ext.EventManager.stoppedMouseDownEvent.removeListener(b)
}}}}if(Ext.elCache[a]){Ext.elCache[a].events={}
}},getListeners:function(c,g){c=Ext.getDom(c);
var a=Q(c),e=Ext.elCache[a]||{},b=e.events||{},d=[];
if(b&&b[g]){return b[g]
}else{return null
}},purgeElement:function(k,b,h){k=Ext.getDom(k);
var a=Q(k),d=Ext.elCache[a]||{},c=d.events||{},j,e,g;
if(h){if(c&&c.hasOwnProperty(h)){e=c[h];
for(j=0,g=e.length;
j<g;
j++){Ext.EventManager.removeListener(k,h,e[j][0])
}}}else{Ext.EventManager.removeAll(k)
}if(b&&k&&k.childNodes){for(j=0,g=k.childNodes.length;
j<g;
j++){Ext.EventManager.purgeElement(k.childNodes[j],b,h)
}}},_unload:function(){var e;
for(e in Ext.elCache){Ext.EventManager.removeAll(e)
}delete Ext.elCache;
delete Ext.Element._flyweights;
var a,d,b,c=Ext.lib.Ajax;
(typeof c.conn=="object")?d=c.conn:d={};
for(b in d){a=d[b];
if(a){c.abort({conn:a,tId:b})
}}},onDocumentReady:function(a,b,c){if(Ext.isReady){C||(C=new Ext.util.Event());
C.addListener(a,b,c);
C.fire();
C.listeners=[]
}else{if(!C){ac()
}c=c||{};
c.delay=c.delay||1;
C.addListener(a,b,c)
}},fireDocReady:ab};
G.on=G.addListener;
G.un=G.removeListener;
G.stoppedMouseDownEvent=new Ext.util.Event();
return G
}();
Ext.onReady=Ext.EventManager.onDocumentReady;
(function(){var b=function(){var g=document.body||document.getElementsByTagName("body")[0];
if(!g){return false
}var a=[" ",Ext.isIE?"ext-ie "+(Ext.isIE6?"ext-ie6":(Ext.isIE7?"ext-ie7":(Ext.isIE8?"ext-ie8":"ext-ie9"))):Ext.isGecko?"ext-gecko "+(Ext.isGecko2?"ext-gecko2":"ext-gecko3"):Ext.isOpera?"ext-opera":Ext.isWebKit?"ext-webkit":""];
if(Ext.isSafari){a.push("ext-safari "+(Ext.isSafari2?"ext-safari2":(Ext.isSafari3?"ext-safari3":"ext-safari4")))
}else{if(Ext.isChrome){a.push("ext-chrome")
}}if(Ext.isMac){a.push("ext-mac")
}if(Ext.isLinux){a.push("ext-linux")
}if(Ext.isStrict||Ext.isBorderBox){var e=g.parentNode;
if(e){if(!Ext.isStrict){Ext.fly(e,"_internal").addClass("x-quirks");
if(Ext.isIE&&!Ext.isStrict){Ext.isIEQuirks=true
}}Ext.fly(e,"_internal").addClass(((Ext.isStrict&&Ext.isIE)||(!Ext.enableForcedBoxModel&&!Ext.isIE))?" ext-strict":" ext-border-box")
}}if(Ext.enableForcedBoxModel&&!Ext.isIE){Ext.isForcedBorderBox=true;
a.push("ext-forced-border-box")
}Ext.fly(g,"_internal").addClass(a);
return true
};
if(!b()){Ext.onReady(b)
}})();
(function(){var c=Ext.apply(Ext.supports,{correctRightMargin:true,correctTransparentColor:true,cssFloat:true});
var d=function(){var a=document.createElement("div"),b=document,j,h;
a.innerHTML='<div style="height:30px;width:50px;"><div style="height:20px;width:20px;"></div></div><div style="float:left;background-color:transparent;">';
b.body.appendChild(a);
h=a.lastChild;
if((j=b.defaultView)){if(j.getComputedStyle(a.firstChild.firstChild,null).marginRight!="0px"){c.correctRightMargin=false
}if(j.getComputedStyle(h,null).backgroundColor!="transparent"){c.correctTransparentColor=false
}}c.cssFloat=!!h.style.cssFloat;
b.body.removeChild(a)
};
if(Ext.isReady){d()
}else{Ext.onReady(d)
}})();
Ext.EventObject=function(){var e=Ext.lib.Event,j=/(dbl)?click/,g={3:13,63234:37,63235:39,63232:38,63233:40,63276:33,63277:34,63272:46,63273:36,63275:35},h=Ext.isIE?{1:0,4:1,2:2}:{0:0,1:1,2:2};
Ext.EventObjectImpl=function(a){if(a){this.setEvent(a.browserEvent||a)
}};
Ext.EventObjectImpl.prototype={setEvent:function(a){var b=this;
if(a==b||(a&&a.browserEvent)){return a
}b.browserEvent=a;
if(a){b.button=a.button?h[a.button]:(a.which?a.which-1:-1);
if(j.test(a.type)&&b.button==-1){b.button=0
}b.type=a.type;
b.shiftKey=a.shiftKey;
b.ctrlKey=a.ctrlKey||a.metaKey||false;
b.altKey=a.altKey;
b.keyCode=a.keyCode;
b.charCode=a.charCode;
b.target=e.getTarget(a);
b.xy=e.getXY(a)
}else{b.button=-1;
b.shiftKey=false;
b.ctrlKey=false;
b.altKey=false;
b.keyCode=0;
b.charCode=0;
b.target=null;
b.xy=[0,0]
}return b
},stopEvent:function(){var a=this;
if(a.browserEvent){if(a.browserEvent.type=="mousedown"){Ext.EventManager.stoppedMouseDownEvent.fire(a)
}e.stopEvent(a.browserEvent)
}},preventDefault:function(){if(this.browserEvent){e.preventDefault(this.browserEvent)
}},stopPropagation:function(){var a=this;
if(a.browserEvent){if(a.browserEvent.type=="mousedown"){Ext.EventManager.stoppedMouseDownEvent.fire(a)
}e.stopPropagation(a.browserEvent)
}},getCharCode:function(){return this.charCode||this.keyCode
},getKey:function(){return this.normalizeKey(this.keyCode||this.charCode)
},normalizeKey:function(a){return Ext.isSafari?(g[a]||a):a
},getPageX:function(){return this.xy[0]
},getPageY:function(){return this.xy[1]
},getXY:function(){return this.xy
},getTarget:function(b,a,c){return b?Ext.fly(this.target).findParent(b,a,c):(c?Ext.get(this.target):this.target)
},getRelatedTarget:function(){return this.browserEvent?e.getRelatedTarget(this.browserEvent):null
},getWheelDelta:function(){var b=this.browserEvent;
var a=0;
if(b.wheelDelta){a=b.wheelDelta/120
}else{if(b.detail){a=-b.detail/3
}}return a
},within:function(b,a,d){if(b){var c=this[a?"getRelatedTarget":"getTarget"]();
return c&&((d?(c==Ext.getDom(b)):false)||Ext.fly(b).contains(c))
}return false
}};
return new Ext.EventObjectImpl()
}();
Ext.Loader=Ext.apply({},{load:function(o,p,n,u){var n=n||this,r=document.getElementsByTagName("head")[0],v=document.createDocumentFragment(),w=o.length,q=0,s=this;
var m=function(a){r.appendChild(s.buildScriptTag(o[a],t))
};
var t=function(){q++;
if(w==q&&typeof p=="function"){p.call(n)
}else{if(u===true){m(q)
}}};
if(u===true){m.call(this,0)
}else{Ext.each(o,function(b,a){v.appendChild(this.buildScriptTag(b,t))
},this);
r.appendChild(v)
}},buildScriptTag:function(d,g){var e=document.createElement("script");
e.type="text/javascript";
e.src=d;
if(e.readyState){e.onreadystatechange=function(){if(e.readyState=="loaded"||e.readyState=="complete"){e.onreadystatechange=null;
g()
}}
}else{e.onload=g
}return e
}});
Ext.ns("Ext.grid","Ext.list","Ext.dd","Ext.tree","Ext.form","Ext.menu","Ext.state","Ext.layout.boxOverflow","Ext.app","Ext.ux","Ext.chart","Ext.direct","Ext.slider");
Ext.apply(Ext,function(){var g=Ext,e=0,d=null;
return{emptyFn:function(){},BLANK_IMAGE_URL:Ext.isIE6||Ext.isIE7||Ext.isAir?"http://www.extjs.com/s.gif":"data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",extendX:function(b,a){return Ext.extend(b,a(b.prototype))
},getDoc:function(){return Ext.get(document)
},num:function(a,b){a=Number(Ext.isEmpty(a)||Ext.isArray(a)||typeof a=="boolean"||(typeof a=="string"&&a.trim().length==0)?NaN:a);
return isNaN(a)?b:a
},value:function(a,c,b){return Ext.isEmpty(a,b)?c:a
},escapeRe:function(a){return a.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1")
},sequence:function(a,h,b,c){a[h]=a[h].createSequence(b,c)
},addBehaviors:function(a){if(!Ext.isReady){Ext.onReady(function(){Ext.addBehaviors(a)
})
}else{var j={},b,k,c;
for(k in a){if((b=k.split("@"))[1]){c=b[0];
if(!j[c]){j[c]=Ext.select(c)
}j[c].on(b[1],a[k])
}}j=null
}},getScrollBarWidth:function(c){if(!Ext.isReady){return 0
}if(c===true||d===null){var a=Ext.getBody().createChild('<div class="x-hide-offsets" style="width:100px;height:50px;overflow:hidden;"><div style="height:200px;"></div></div>'),b=a.child("div",true);
var j=b.offsetWidth;
a.setStyle("overflow",(Ext.isWebKit||Ext.isGecko)?"auto":"scroll");
var k=b.offsetWidth;
a.remove();
d=j-k+2
}return d
},combine:function(){var c=arguments,j=c.length,a=[];
for(var b=0;
b<j;
b++){var k=c[b];
if(Ext.isArray(k)){a=a.concat(k)
}else{if(k.length!==undefined&&!k.substr){a=a.concat(Array.prototype.slice.call(k,0))
}else{a.push(k)
}}}return a
},copyTo:function(c,b,a){if(typeof a=="string"){a=a.split(/[,;\s]/)
}Ext.each(a,function(h){if(b.hasOwnProperty(h)){c[h]=b[h]
}},this);
return c
},destroy:function(){Ext.each(arguments,function(a){if(a){if(Ext.isArray(a)){this.destroy.apply(this,a)
}else{if(typeof a.destroy=="function"){a.destroy()
}else{if(a.dom){a.remove()
}}}}},this)
},destroyMembers:function(a,c,m,l){for(var b=1,n=arguments,o=n.length;
b<o;
b++){Ext.destroy(a[n[b]]);
delete a[n[b]]
}},clean:function(b){var a=[];
Ext.each(b,function(c){if(!!c){a.push(c)
}});
return a
},unique:function(c){var b=[],a={};
Ext.each(c,function(h){if(!a[h]){b.push(h)
}a[h]=true
});
return b
},flatten:function(c){var a=[];
function b(h){Ext.each(h,function(j){if(Ext.isArray(j)){b(j)
}else{a.push(j)
}});
return a
}return b(c)
},min:function(c,b){var a=c[0];
b=b||function(j,k){return j<k?-1:1
};
Ext.each(c,function(h){a=b(a,h)==-1?a:h
});
return a
},max:function(c,b){var a=c[0];
b=b||function(j,k){return j>k?1:-1
};
Ext.each(c,function(h){a=b(a,h)==1?a:h
});
return a
},mean:function(a){return a.length>0?Ext.sum(a)/a.length:undefined
},sum:function(b){var a=0;
Ext.each(b,function(c){a+=c
});
return a
},partition:function(c,b){var a=[[],[]];
Ext.each(c,function(l,k,m){a[(b&&b(l,k,m))||(!b&&l)?0:1].push(l)
});
return a
},invoke:function(h,c){var a=[],b=Array.prototype.slice.call(arguments,2);
Ext.each(h,function(l,k){if(l&&typeof l[c]=="function"){a.push(l[c].apply(l,b))
}else{a.push(undefined)
}});
return a
},pluck:function(c,a){var b=[];
Ext.each(c,function(h){b.push(h[a])
});
return b
},zip:function(){var a=Ext.partition(arguments,function(h){return typeof h!="function"
}),j=a[0],b=a[1][0],q=Ext.max(Ext.pluck(j,"length")),n=[];
for(var c=0;
c<q;
c++){n[c]=[];
if(b){n[c]=b.apply(b,Ext.pluck(j,c))
}else{for(var o=0,p=j.length;
o<p;
o++){n[c].push(j[o][c])
}}}return n
},getCmp:function(a){return Ext.ComponentMgr.get(a)
},useShims:g.isIE6||(g.isMac&&g.isGecko2),type:function(a){if(a===undefined||a===null){return false
}if(a.htmlElement){return"element"
}var b=typeof a;
if(b=="object"&&a.nodeName){switch(a.nodeType){case 1:return"element";
case 3:return(/\S/).test(a.nodeValue)?"textnode":"whitespace"
}}if(b=="object"||b=="function"){switch(a.constructor){case Array:return"array";
case RegExp:return"regexp";
case Date:return"date"
}if(typeof a.length=="number"&&typeof a.item=="function"){return"nodelist"
}}return b
},intercept:function(a,h,b,c){a[h]=a[h].createInterceptor(b,c)
},callback:function(h,a,b,c){if(typeof h=="function"){if(c){h.defer(c,a,b||[])
}else{h.apply(a,b||[])
}}}}
}());
Ext.apply(Function.prototype,{createSequence:function(d,e){var g=this;
return(typeof d!="function")?this:function(){var a=g.apply(this||window,arguments);
d.apply(e||this||window,arguments);
return a
}
}});
Ext.applyIf(String,{escape:function(b){return b.replace(/('|\\)/g,"\\$1")
},leftPad:function(h,e,j){var g=String(h);
if(!j){j=" "
}while(g.length<e){g=j+g
}return g
}});
String.prototype.toggle=function(c,d){return this==c?d:c
};
String.prototype.trim=function(){var b=/^\s+|\s+$/g;
return function(){return this.replace(b,"")
}
}();
Date.prototype.getElapsed=function(b){return Math.abs((b||new Date()).getTime()-this.getTime())
};
Ext.applyIf(Number.prototype,{constrain:function(c,d){return Math.min(Math.max(this,c),d)
}});
Ext.lib.Dom.getRegion=function(b){return Ext.lib.Region.getRegion(b)
};
Ext.lib.Region=function(j,g,b,k){var h=this;
h.top=j;
h[1]=j;
h.right=g;
h.bottom=b;
h.left=k;
h[0]=k
};
Ext.lib.Region.prototype={contains:function(c){var d=this;
return(c.left>=d.left&&c.right<=d.right&&c.top>=d.top&&c.bottom<=d.bottom)
},getArea:function(){var b=this;
return((b.bottom-b.top)*(b.right-b.left))
},intersect:function(h){var j=this,l=Math.max(j.top,h.top),k=Math.min(j.right,h.right),b=Math.min(j.bottom,h.bottom),m=Math.max(j.left,h.left);
if(b>=l&&k>=m){return new Ext.lib.Region(l,k,b,m)
}},union:function(h){var j=this,l=Math.min(j.top,h.top),k=Math.max(j.right,h.right),b=Math.max(j.bottom,h.bottom),m=Math.min(j.left,h.left);
return new Ext.lib.Region(l,k,b,m)
},constrainTo:function(c){var d=this;
d.top=d.top.constrain(c.top,c.bottom);
d.bottom=d.bottom.constrain(c.top,c.bottom);
d.left=d.left.constrain(c.left,c.right);
d.right=d.right.constrain(c.left,c.right);
return d
},adjust:function(j,k,b,g){var h=this;
h.top+=j;
h.left+=k;
h.right+=g;
h.bottom+=b;
return h
}};
Ext.lib.Region.getRegion=function(k){var h=Ext.lib.Dom.getXY(k),l=h[1],j=h[0]+k.offsetWidth,b=h[1]+k.offsetHeight,m=h[0];
return new Ext.lib.Region(l,j,b,m)
};
Ext.lib.Point=function(e,g){if(Ext.isArray(e)){g=e[1];
e=e[0]
}var d=this;
d.x=d.right=d.left=d[0]=e;
d.y=d.top=d.bottom=d[1]=g
};
Ext.lib.Point.prototype=new Ext.lib.Region();
Ext.apply(Ext.DomHelper,function(){var o,k="afterbegin",m="afterend",l="beforebegin",p="beforeend",j=/tag|children|cn|html$/i;
function n(b,h,a,g,c,e){b=Ext.getDom(b);
var d;
if(o.useDom){d=q(h,null);
if(e){b.appendChild(d)
}else{(c=="firstChild"?b:b.parentNode).insertBefore(d,b[c]||b)
}}else{d=Ext.DomHelper.insertHtml(g,b,Ext.DomHelper.createHtml(h))
}return a?Ext.get(d,true):d
}function q(h,a){var g,v=document,c,x,e,w;
if(Ext.isArray(h)){g=v.createDocumentFragment();
for(var b=0,d=h.length;
b<d;
b++){q(h[b],g)
}}else{if(typeof h=="string"){g=v.createTextNode(h)
}else{g=v.createElement(h.tag||"div");
c=!!g.setAttribute;
for(var x in h){if(!j.test(x)){e=h[x];
if(x=="cls"){g.className=e
}else{if(c){g.setAttribute(x,e)
}else{g[x]=e
}}}}Ext.DomHelper.applyStyles(g,h.style);
if((w=h.children||h.cn)){q(w,g)
}else{if(h.html){g.innerHTML=h.html
}}}}if(a){a.appendChild(g)
}return g
}o={createTemplate:function(a){var b=Ext.DomHelper.createHtml(a);
return new Ext.Template(b)
},useDom:false,insertBefore:function(c,a,b){return n(c,a,b,l)
},insertAfter:function(c,a,b){return n(c,a,b,m,"nextSibling")
},insertFirst:function(c,a,b){return n(c,a,b,k,"firstChild")
},append:function(c,a,b){return n(c,a,b,p,"",true)
},createDom:q};
return o
}());
Ext.apply(Ext.Template.prototype,{disableFormats:false,re:/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,argsRe:/^\s*['"](.*)["']\s*$/,compileARe:/\\/g,compileBRe:/(\r\n|\n)/g,compileCRe:/'/g,applyTemplate:function(g){var j=this,h=j.disableFormats!==true,k=Ext.util.Format,m=j;
if(j.compiled){return j.compiled(g)
}function l(d,b,p,c){if(p&&h){if(p.substr(0,5)=="this."){return m.call(p.substr(5),g[b],g)
}else{if(c){var q=j.argsRe;
c=c.split(",");
for(var a=0,e=c.length;
a<e;
a++){c[a]=c[a].replace(q,"$1")
}c=[g[b]].concat(c)
}else{c=[g[b]]
}return k[p].apply(k,c)
}}else{return g[b]!==undefined?g[b]:""
}}return j.html.replace(j.re,l)
},compile:function(){var me=this,fm=Ext.util.Format,useF=me.disableFormats!==true,sep=Ext.isGecko?"+":",",body;
function fn(m,name,format,args){if(format&&useF){args=args?","+args:"";
if(format.substr(0,5)!="this."){format="fm."+format+"("
}else{format='this.call("'+format.substr(5)+'", ';
args=", values"
}}else{args="";
format="(values['"+name+"'] == undefined ? '' : "
}return"'"+sep+format+"values['"+name+"']"+args+")"+sep+"'"
}if(Ext.isGecko){body="this.compiled = function(values){ return '"+me.html.replace(me.compileARe,"\\\\").replace(me.compileBRe,"\\n").replace(me.compileCRe,"\\'").replace(me.re,fn)+"';};"
}else{body=["this.compiled = function(values){ return ['"];
body.push(me.html.replace(me.compileARe,"\\\\").replace(me.compileBRe,"\\n").replace(me.compileCRe,"\\'").replace(me.re,fn));
body.push("'].join('');};");
body=body.join("")
}eval(body);
return me
},call:function(g,d,e){return this[g](d,e)
}});
Ext.Template.prototype.apply=Ext.Template.prototype.applyTemplate;
Ext.util.Functions={createInterceptor:function(j,e,g){var h=j;
if(!Ext.isFunction(e)){return j
}else{return function(){var a=this,b=arguments;
e.target=a;
e.method=j;
return(e.apply(g||a||window,b)!==false)?j.apply(a||window,b):null
}
}},createDelegate:function(j,h,e,g){if(!Ext.isFunction(j)){return j
}return function(){var a=e||arguments;
if(g===true){a=Array.prototype.slice.call(arguments,0);
a=a.concat(e)
}else{if(Ext.isNumber(g)){a=Array.prototype.slice.call(arguments,0);
var b=[g,0].concat(e);
Array.prototype.splice.apply(a,b)
}}return j.apply(h||window,a)
}
},defer:function(k,l,j,g,h){k=Ext.util.Functions.createDelegate(k,j,g,h);
if(l>0){return setTimeout(k,l)
}k();
return 0
},createSequence:function(g,d,e){if(!Ext.isFunction(d)){return g
}else{return function(){var a=g.apply(this||window,arguments);
d.apply(e||this||window,arguments);
return a
}
}}};
Ext.defer=Ext.util.Functions.defer;
Ext.createInterceptor=Ext.util.Functions.createInterceptor;
Ext.createSequence=Ext.util.Functions.createSequence;
Ext.createDelegate=Ext.util.Functions.createDelegate;
Ext.apply(Ext.util.Observable.prototype,function(){function b(e){var j=(this.methodEvents=this.methodEvents||{})[e],m,n,l,k=this;
if(!j){this.methodEvents[e]=j={};
j.originalFn=this[e];
j.methodName=e;
j.before=[];
j.after=[];
var a=function(c,d,g){if((n=c.apply(d||k,g))!==undefined){if(typeof n=="object"){if(n.returnValue!==undefined){m=n.returnValue
}else{m=n
}l=!!n.cancel
}else{if(n===false){l=true
}else{m=n
}}}};
this[e]=function(){var d=Array.prototype.slice.call(arguments,0),g;
m=n=undefined;
l=false;
for(var c=0,h=j.before.length;
c<h;
c++){g=j.before[c];
a(g.fn,g.scope,d);
if(l){return m
}}if((n=j.originalFn.apply(k,d))!==undefined){m=n
}for(var c=0,h=j.after.length;
c<h;
c++){g=j.after[c];
a(g.fn,g.scope,d);
if(l){return m
}}return m
}
}return j
}return{beforeMethod:function(e,g,a){b.call(this,e).before.push({fn:g,scope:a})
},afterMethod:function(e,g,a){b.call(this,e).after.push({fn:g,scope:a})
},removeMethodListener:function(e,k,l){var j=this.getMethodEvent(e);
for(var m=0,a=j.before.length;
m<a;
m++){if(j.before[m].fn==k&&j.before[m].scope==l){j.before.splice(m,1);
return
}}for(var m=0,a=j.after.length;
m<a;
m++){if(j.after[m].fn==k&&j.after[m].scope==l){j.after.splice(m,1);
return
}}},relayEvents:function(j,m){var k=this;
function l(c){return function(){return k.fireEvent.apply(k,[c].concat(Array.prototype.slice.call(arguments,0)))
}
}for(var n=0,a=m.length;
n<a;
n++){var o=m[n];
k.events[o]=k.events[o]||true;
j.on(o,l(o),k)
}},enableBubble:function(k){var j=this;
if(!Ext.isEmpty(k)){k=Ext.isArray(k)?k:Array.prototype.slice.call(arguments,0);
for(var l=0,a=k.length;
l<a;
l++){var m=k[l];
m=m.toLowerCase();
var h=j.events[m]||true;
if(typeof h=="boolean"){h=new Ext.util.Event(j,m);
j.events[m]=h
}h.bubble=true
}}}}
}());
Ext.util.Observable.capture=function(g,d,e){g.fireEvent=g.fireEvent.createInterceptor(d,e)
};
Ext.util.Observable.observeClass=function(c,d){if(c){if(!c.fireEvent){Ext.apply(c,new Ext.util.Observable());
Ext.util.Observable.capture(c.prototype,c.fireEvent,c)
}if(typeof d=="object"){c.on(d)
}return c
}};
Ext.apply(Ext.EventManager,function(){var q,k,o,s,t=Ext.lib.Dom,l=/^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/,r=Ext.EventManager._unload,m=0,n=0,p=Ext.isWebKit?Ext.num(navigator.userAgent.match(/AppleWebKit\/(\d+)/)[1])>=525:!((Ext.isGecko&&!Ext.isWindows)||Ext.isOpera);
return{_unload:function(){Ext.EventManager.un(window,"resize",this.fireWindowResize,this);
r.call(Ext.EventManager)
},doResizeEvent:function(){var a=t.getViewHeight(),b=t.getViewWidth();
if(n!=a||m!=b){q.fire(m=b,n=a)
}},onWindowResize:function(a,b,c){if(!q){q=new Ext.util.Event();
k=new Ext.util.DelayedTask(this.doResizeEvent);
Ext.EventManager.on(window,"resize",this.fireWindowResize,this)
}q.addListener(a,b,c)
},fireWindowResize:function(){if(q){k.delay(100)
}},onTextResize:function(d,a,c){if(!o){o=new Ext.util.Event();
var b=new Ext.Element(document.createElement("div"));
b.dom.className="x-text-resize";
b.dom.innerHTML="X";
b.appendTo(document.body);
s=b.dom.offsetHeight;
setInterval(function(){if(b.dom.offsetHeight!=s){o.fire(s,s=b.dom.offsetHeight)
}},this.textResizeInterval)
}o.addListener(d,a,c)
},removeResizeListener:function(a,b){if(q){q.removeListener(a,b)
}},fireResize:function(){if(q){q.fire(t.getViewWidth(),t.getViewHeight())
}},textResizeInterval:50,ieDeferSrc:false,getKeyEvent:function(){return p?"keydown":"keypress"
},useKeydown:p}
}());
Ext.EventManager.on=Ext.EventManager.addListener;
Ext.apply(Ext.EventObjectImpl.prototype,{BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,RETURN:13,SHIFT:16,CTRL:17,CONTROL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGEUP:33,PAGE_DOWN:34,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,isNavKeyPress:function(){var c=this,d=this.normalizeKey(c.keyCode);
return(d>=33&&d<=40)||d==c.RETURN||d==c.TAB||d==c.ESC
},isSpecialKey:function(){var b=this.normalizeKey(this.keyCode);
return(this.type=="keypress"&&this.ctrlKey)||this.isNavKeyPress()||(b==this.BACKSPACE)||(b>=16&&b<=20)||(b>=44&&b<=46)
},getPoint:function(){return new Ext.lib.Point(this.xy[0],this.xy[1])
},hasModifier:function(){return((this.ctrlKey||this.altKey)||this.shiftKey)
}});
Ext.Element.addMethods({swallowEvent:function(g,e){var h=this;
function j(a){a.stopPropagation();
if(e){a.preventDefault()
}}if(Ext.isArray(g)){Ext.each(g,function(a){h.on(a,j)
});
return h
}h.on(g,j);
return h
},relayEvent:function(d,c){this.on(d,function(a){c.fireEvent(d,a)
})
},clean:function(g){var l=this,k=l.dom,j=k.firstChild,m=-1;
if(Ext.Element.data(k,"isCleaned")&&g!==true){return l
}while(j){var h=j.nextSibling;
if(j.nodeType==3&&!(/\S/.test(j.nodeValue))){k.removeChild(j)
}else{j.nodeIndex=++m
}j=h
}Ext.Element.data(k,"isCleaned",true);
return l
},load:function(){var b=this.getUpdater();
b.update.apply(b,arguments);
return this
},getUpdater:function(){return this.updateManager||(this.updateManager=new Ext.Updater(this))
},update:function(html,loadScripts,callback){if(!this.dom){return this
}html=html||"";
if(loadScripts!==true){this.dom.innerHTML=html;
if(typeof callback=="function"){callback()
}return this
}var id=Ext.id(),dom=this.dom;
html+='<span id="'+id+'"></span>';
Ext.lib.Event.onAvailable(id,function(){var DOC=document,hd=DOC.getElementsByTagName("head")[0],re=/(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig,srcRe=/\ssrc=([\'\"])(.*?)\1/i,typeRe=/\stype=([\'\"])(.*?)\1/i,match,attrs,srcMatch,typeMatch,el,s;
while((match=re.exec(html))){attrs=match[1];
srcMatch=attrs?attrs.match(srcRe):false;
if(srcMatch&&srcMatch[2]){s=DOC.createElement("script");
s.src=srcMatch[2];
typeMatch=attrs.match(typeRe);
if(typeMatch&&typeMatch[2]){s.type=typeMatch[2]
}hd.appendChild(s)
}else{if(match[2]&&match[2].length>0){if(window.execScript){window.execScript(match[2])
}else{window.eval(match[2])
}}}}el=DOC.getElementById(id);
if(el){Ext.removeNode(el)
}if(typeof callback=="function"){callback()
}});
dom.innerHTML=html.replace(/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,"");
return this
},removeAllListeners:function(){this.removeAnchor();
Ext.EventManager.removeAll(this.dom);
return this
},createProxy:function(h,j,k){h=(typeof h=="object")?h:{tag:"div",cls:h};
var l=this,g=j?Ext.DomHelper.append(j,h,true):Ext.DomHelper.insertBefore(l.dom,h,true);
if(k&&l.setBox&&l.getBox){g.setBox(l.getBox())
}return g
}});
Ext.Element.prototype.getUpdateManager=Ext.Element.prototype.getUpdater;
Ext.Element.addMethods({getAnchorXY:function(x,s,h){x=(x||"tl").toLowerCase();
h=h||{};
var t=this,A=t.dom==document.body||t.dom==document,q=h.width||A?Ext.lib.Dom.getViewWidth():t.getWidth(),v=h.height||A?Ext.lib.Dom.getViewHeight():t.getHeight(),o,B=Math.round,z=t.getXY(),r=t.getScroll(),u=A?r.left:!s?z[0]:0,w=A?r.top:!s?z[1]:0,y={c:[B(q*0.5),B(v*0.5)],t:[B(q*0.5),0],l:[0,B(v*0.5)],r:[q,B(v*0.5)],b:[B(q*0.5),v],tl:[0,0],bl:[0,v],br:[q,v],tr:[q,0]};
o=y[x];
return[o[0]+u,o[1]+w]
},anchorTo:function(u,p,t,v,m,l){var o=this,r=o.dom,n=!Ext.isEmpty(m),s=function(){Ext.fly(r).alignTo(u,p,t,v);
Ext.callback(l,Ext.fly(r))
},q=this.getAnchor();
this.removeAnchor();
Ext.apply(q,{fn:s,scroll:n});
Ext.EventManager.onWindowResize(s,null);
if(n){Ext.EventManager.on(window,"scroll",s,null,{buffer:!isNaN(m)?m:50})
}s.call(o);
return o
},removeAnchor:function(){var c=this,d=this.getAnchor();
if(d&&d.fn){Ext.EventManager.removeResizeListener(d.fn);
if(d.scroll){Ext.EventManager.un(window,"scroll",d.fn)
}delete d.fn
}return c
},getAnchor:function(){var d=Ext.Element.data,g=this.dom;
if(!g){return
}var e=d(g,"_anchor");
if(!e){e=d(g,"_anchor",{})
}return e
},getAlignToXY:function(ac,m,V){ac=Ext.get(ac);
if(!ac||!ac.dom){throw"Element.alignToXY with an element that doesn't exist"
}V=V||[0,0];
m=(!m||m=="?"?"tl-bl?":(!(/-/).test(m)&&m!==""?"tl-"+m:m||"tl-bl")).toLowerCase();
var o=this,x=o.dom,d,h,X,Y,U,P,N,R=Ext.lib.Dom.getViewWidth()-10,y=Ext.lib.Dom.getViewHeight()-10,ae,ab,aa,Z,O,w,c=document,p=c.documentElement,W=c.body,Q=(p.scrollLeft||W.scrollLeft||0)+5,S=(p.scrollTop||W.scrollTop||0)+5,r=false,ad="",af="",T=m.match(/^([a-z]+)-([a-z]+)(\?)?$/);
if(!T){throw"Element.alignTo with an invalid alignment "+m
}ad=T[1];
af=T[2];
r=!!T[3];
d=o.getAnchorXY(ad,true);
h=ac.getAnchorXY(af,false);
X=h[0]-d[0]+V[0];
Y=h[1]-d[1]+V[1];
if(r){U=o.getWidth();
P=o.getHeight();
N=ac.getRegion();
ae=ad.charAt(0);
ab=ad.charAt(ad.length-1);
aa=af.charAt(0);
Z=af.charAt(af.length-1);
O=((ae=="t"&&aa=="b")||(ae=="b"&&aa=="t"));
w=((ab=="r"&&Z=="l")||(ab=="l"&&Z=="r"));
if(X+U>R+Q){X=w?N.left-U:R+Q-U
}if(X<Q){X=w?N.right:Q
}if(Y+P>y+S){Y=O?N.top-P:y+S-P
}if(Y<S){Y=O?N.bottom:S
}}return[X,Y]
},alignTo:function(l,h,j,g){var k=this;
return k.setXY(k.getAlignToXY(l,h,j),k.preanim&&!!g?k.preanim(arguments,3):false)
},adjustForConstraints:function(g,e,d){return this.getConstrainToXY(e||document,false,d,g)||g
},getConstrainToXY:function(g,h,l,j){var k={top:0,left:0,bottom:0,right:0};
return function(L,a,I,G){L=Ext.get(L);
I=I?Ext.applyIf(I,k):k;
var b,e,c=0,d=0;
if(L.dom==document.body||L.dom==document){b=Ext.lib.Dom.getViewWidth();
e=Ext.lib.Dom.getViewHeight()
}else{b=L.dom.clientWidth;
e=L.dom.clientHeight;
if(!a){var s=L.getXY();
c=s[0];
d=s[1]
}}var x=L.getScroll();
c+=I.left+x.left;
d+=I.top+x.top;
b-=I.right;
e-=I.bottom;
var y=c+b,M=d+e,K=G||(!a?this.getXY():[this.getLeft(true),this.getTop(true)]),E=K[0],F=K[1],J=this.getConstrainOffset(),D=this.dom.offsetWidth+J,w=this.dom.offsetHeight+J;
var H=false;
if((E+D)>y){E=y-D;
H=true
}if((F+w)>M){F=M-w;
H=true
}if(E<c){E=c;
H=true
}if(F<d){F=d;
H=true
}return H?[E,F]:false
}
}(),getConstrainOffset:function(){return 0
},getCenterXY:function(){return this.getAlignToXY(document,"c-c")
},center:function(b){return this.alignTo(b||document,"c-c")
}});
Ext.Element.addMethods({select:function(d,c){return Ext.Element.select(d,c,this.dom)
}});
Ext.apply(Ext.Element.prototype,function(){var g=Ext.getDom,e=Ext.get,d=Ext.DomHelper;
return{insertSibling:function(c,l,k){var b=this,m,n=(l||"before").toLowerCase()=="after",a;
if(Ext.isArray(c)){a=b;
Ext.each(c,function(h){m=Ext.fly(a,"_internal").insertSibling(h,l,k);
if(n){a=m
}});
return m
}c=c||{};
if(c.nodeType||c.dom){m=b.dom.parentNode.insertBefore(g(c),n?b.dom.nextSibling:b.dom);
if(!k){m=e(m)
}}else{if(n&&!b.dom.nextSibling){m=d.append(b.dom.parentNode,c,!k)
}else{m=d[n?"insertAfter":"insertBefore"](b.dom,c,!k)
}}return m
}}
}());
Ext.Element.boxMarkup='<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';
Ext.Element.addMethods(function(){var d="_internal",c=/(\d+\.?\d+)px/;
return{applyStyles:function(a){Ext.DomHelper.applyStyles(this.dom,a);
return this
},getStyles:function(){var a={};
Ext.each(arguments,function(b){a[b]=this.getStyle(b)
},this);
return a
},setOverflow:function(b){var a=this.dom;
if(b=="auto"&&Ext.isMac&&Ext.isGecko2){a.style.overflow="hidden";
(function(){a.style.overflow="auto"
}).defer(1)
}else{a.style.overflow=b
}},boxWrap:function(b){b=b||"x-box";
var a=Ext.get(this.insertHtml("beforeBegin","<div class='"+b+"'>"+String.format(Ext.Element.boxMarkup,b)+"</div>"));
Ext.DomQuery.selectNode("."+b+"-mc",a.dom).appendChild(this.dom);
return a
},setSize:function(b,h,g){var a=this;
if(typeof b=="object"){h=b.height;
b=b.width
}b=a.adjustWidth(b);
h=a.adjustHeight(h);
if(!g||!a.anim){a.dom.style.width=a.addUnits(b);
a.dom.style.height=a.addUnits(h)
}else{a.anim({width:{to:b},height:{to:h}},a.preanim(arguments,2))
}return a
},getComputedHeight:function(){var a=this,b=Math.max(a.dom.offsetHeight,a.dom.clientHeight);
if(!b){b=parseFloat(a.getStyle("height"))||0;
if(!a.isBorderBox()){b+=a.getFrameWidth("tb")
}}return b
},getComputedWidth:function(){var a=Math.max(this.dom.offsetWidth,this.dom.clientWidth);
if(!a){a=parseFloat(this.getStyle("width"))||0;
if(!this.isBorderBox()){a+=this.getFrameWidth("lr")
}}return a
},getFrameWidth:function(a,b){return b&&this.isBorderBox()?0:(this.getPadding(a)+this.getBorderWidth(a))
},addClassOnOver:function(a){this.hover(function(){Ext.fly(this,d).addClass(a)
},function(){Ext.fly(this,d).removeClass(a)
});
return this
},addClassOnFocus:function(a){this.on("focus",function(){Ext.fly(this,d).addClass(a)
},this.dom);
this.on("blur",function(){Ext.fly(this,d).removeClass(a)
},this.dom);
return this
},addClassOnClick:function(b){var a=this.dom;
this.on("mousedown",function(){Ext.fly(a,d).addClass(b);
var g=Ext.getDoc(),h=function(){Ext.fly(a,d).removeClass(b);
g.removeListener("mouseup",h)
};
g.on("mouseup",h)
});
return this
},getViewSize:function(){var b=document,a=this.dom,j=(a==b||a==b.body);
if(j){var h=Ext.lib.Dom;
return{width:h.getViewWidth(),height:h.getViewHeight()}
}else{return{width:a.clientWidth,height:a.clientHeight}
}},getStyleSize:function(){var m=this,q,n,b=document,a=this.dom,p=(a==b||a==b.body),o=a.style;
if(p){var h=Ext.lib.Dom;
return{width:h.getViewWidth(),height:h.getViewHeight()}
}if(o.width&&o.width!="auto"){q=parseFloat(o.width);
if(m.isBorderBox()){q-=m.getFrameWidth("lr")
}}if(o.height&&o.height!="auto"){n=parseFloat(o.height);
if(m.isBorderBox()){n-=m.getFrameWidth("tb")
}}return{width:q||m.getWidth(true),height:n||m.getHeight(true)}
},getSize:function(a){return{width:this.getWidth(a),height:this.getHeight(a)}
},repaint:function(){var a=this.dom;
this.addClass("x-repaint");
setTimeout(function(){Ext.fly(a).removeClass("x-repaint")
},1);
return this
},unselectable:function(){this.dom.unselectable="on";
return this.swallowEvent("selectstart",true).applyStyles("-moz-user-select:none;-khtml-user-select:none;").addClass("x-unselectable")
},getMargins:function(j){var h=this,k,b={t:"top",l:"left",r:"right",b:"bottom"},a={};
if(!j){for(k in h.margins){a[b[k]]=parseFloat(h.getStyle(h.margins[k]))||0
}return a
}else{return h.addStyles.call(h,j,h.margins)
}}}
}());
Ext.Element.addMethods({setBox:function(k,j,g){var l=this,h=k.width,m=k.height;
if((j&&!l.autoBoxAdjust)&&!l.isBorderBox()){h-=(l.getBorderWidth("lr")+l.getPadding("lr"));
m-=(l.getBorderWidth("tb")+l.getPadding("tb"))
}l.setBounds(k.x,k.y,h,m,l.animTest.call(l,arguments,g,2));
return l
},getBox:function(x,l){var v=this,E,A,r,B=v.getBorderWidth,h=v.getPadding,z,D,F,t;
if(!l){E=v.getXY()
}else{A=parseInt(v.getStyle("left"),10)||0;
r=parseInt(v.getStyle("top"),10)||0;
E=[A,r]
}var C=v.dom,b=C.offsetWidth,y=C.offsetHeight,w;
if(!x){w={x:E[0],y:E[1],0:E[0],1:E[1],width:b,height:y}
}else{z=B.call(v,"l")+h.call(v,"l");
D=B.call(v,"r")+h.call(v,"r");
F=B.call(v,"t")+h.call(v,"t");
t=B.call(v,"b")+h.call(v,"b");
w={x:E[0]+z,y:E[1]+F,0:E[0]+z,1:E[1]+F,width:b-(z+D),height:y-(F+t)}
}w.right=w.x+w.width;
w.bottom=w.y+w.height;
return w
},move:function(p,w,v){var s=this,m=s.getXY(),o=m[0],q=m[1],u=[o-w,q],n=[o+w,q],r=[o,q-w],x=[o,q+w],t={l:u,left:u,r:n,right:n,t:r,top:r,up:r,b:x,bottom:x,down:x};
p=p.toLowerCase();
s.moveTo(t[p][0],t[p][1],s.animTest.call(s,arguments,v,2))
},setLeftTop:function(h,j){var e=this,g=e.dom.style;
g.left=e.addUnits(h);
g.top=e.addUnits(j);
return e
},getRegion:function(){return Ext.lib.Dom.getRegion(this.dom)
},setBounds:function(g,j,l,h,m){var k=this;
if(!m||!k.anim){k.setSize(l,h);
k.setLocation(g,j)
}else{k.anim({points:{to:[g,j]},width:{to:k.adjustWidth(l)},height:{to:k.adjustHeight(h)}},k.preanim(arguments,4),"motion")
}return k
},setRegion:function(c,d){return this.setBounds(c.left,c.top,c.right-c.left,c.bottom-c.top,this.animTest.call(this,arguments,d,1))
}});
Ext.Element.addMethods({scrollTo:function(h,n,j){var m=/top/i.test(h),o=this,l=o.dom,k;
if(!j||!o.anim){k="scroll"+(m?"Top":"Left");
l[k]=n
}else{k="scroll"+(m?"Left":"Top");
o.anim({scroll:{to:m?[l[k],n]:[n,l[k]]}},o.preanim(arguments,2),"scroll")
}return o
},scrollIntoView:function(y,v){var l=Ext.getDom(y)||Ext.getBody().dom,w=this.dom,x=this.getOffsetsTo(l),t=x[0]+l.scrollLeft,B=x[1]+l.scrollTop,c=B+w.offsetHeight,z=t+w.offsetWidth,A=l.clientHeight,r=parseInt(l.scrollTop,10),b=parseInt(l.scrollLeft,10),u=r+A,o=b+l.clientWidth;
if(w.offsetHeight>A||B<r){l.scrollTop=B
}else{if(c>u){l.scrollTop=c-A
}}l.scrollTop=l.scrollTop;
if(v!==false){if(w.offsetWidth>l.clientWidth||t<b){l.scrollLeft=t
}else{if(z>o){l.scrollLeft=z-l.clientWidth
}}l.scrollLeft=l.scrollLeft
}return this
},scrollChildIntoView:function(c,d){Ext.fly(c,"_scrollChildIntoView").scrollIntoView(this,d)
},scroll:function(q,y,w){if(!this.isScrollable()){return false
}var v=this.dom,u=v.scrollLeft,h=v.scrollTop,p=v.scrollWidth,r=v.scrollHeight,t=v.clientWidth,z=v.clientHeight,x=false,l,s={l:Math.min(u+y,p-t),r:l=Math.max(u-y,0),t:Math.max(h-y,0),b:Math.min(h+y,r-z)};
s.d=s.b;
s.u=s.t;
q=q.substr(0,1);
if((l=s[q])>-1){x=true;
this.scrollTo(q=="l"||q=="r"?"left":"top",l,this.preanim(arguments,2))
}return x
}});
Ext.Element.addMethods(function(){var n="visibility",h="display",j="hidden",k="none",o="x-masked",l="x-masked-relative",m=Ext.Element.data;
return{isVisible:function(c){var b=!this.isStyle(n,j)&&!this.isStyle(h,k),a=this.dom.parentNode;
if(c!==true||!b){return b
}while(a&&!(/^body/i.test(a.tagName))){if(!Ext.fly(a,"_isVisible").isVisible()){return false
}a=a.parentNode
}return true
},isDisplayed:function(){return !this.isStyle(h,k)
},enableDisplayMode:function(a){this.setVisibilityMode(Ext.Element.DISPLAY);
if(!Ext.isEmpty(a)){m(this.dom,"originalDisplay",a)
}return this
},mask:function(r,d){var b=this,g=b.dom,c=Ext.DomHelper,e="ext-el-mask-msg",s,a;
if(!/^body/i.test(g.tagName)&&b.getStyle("position")=="static"){b.addClass(l)
}if(s=m(g,"maskMsg")){s.remove()
}if(s=m(g,"mask")){s.remove()
}a=c.append(g,{cls:"ext-el-mask"},true);
m(g,"mask",a);
b.addClass(o);
a.setDisplayed(true);
if(typeof r=="string"){var q=c.append(g,{cls:e,cn:{tag:"div"}},true);
m(g,"maskMsg",q);
q.dom.className=d?e+" "+d:e;
q.dom.firstChild.innerHTML=r;
q.setDisplayed(true);
q.center(b)
}if(Ext.isIE&&!(Ext.isIE7&&Ext.isStrict)&&b.getStyle("height")=="auto"){a.setSize(undefined,b.getHeight())
}return a
},unmask:function(){var b=this,a=b.dom,d=m(a,"mask"),c=m(a,"maskMsg");
if(d){if(c){c.remove();
m(a,"maskMsg",undefined)
}d.remove();
m(a,"mask",undefined);
b.removeClass([o,l])
}},isMasked:function(){var a=m(this.dom,"mask");
return a&&a.isVisible()
},createShim:function(){var b=document.createElement("iframe"),a;
b.frameBorder="0";
b.className="ext-shim";
b.src=Ext.SSL_SECURE_URL;
a=Ext.get(this.dom.parentNode.insertBefore(b,this.dom));
a.autoBoxAdjust=false;
return a
}}
}());
Ext.Element.addMethods({addKeyListener:function(e,h,j){var g;
if(typeof e!="object"||Ext.isArray(e)){g={key:e,fn:h,scope:j}
}else{g={key:e.key,shift:e.shift,ctrl:e.ctrl,alt:e.alt,fn:h,scope:j}
}return new Ext.KeyMap(this,g)
},addKeyMap:function(b){return new Ext.KeyMap(this,b)
}});
Ext.CompositeElementLite.importElementMethods();
Ext.apply(Ext.CompositeElementLite.prototype,{addElements:function(g,e){if(!g){return this
}if(typeof g=="string"){g=Ext.Element.selectorFunction(g,e)
}var d=this.elements;
Ext.each(g,function(a){d.push(Ext.get(a))
});
return this
},first:function(){return this.item(0)
},last:function(){return this.item(this.getCount()-1)
},contains:function(b){return this.indexOf(b)!=-1
},removeElement:function(k,j){var l=this,h=this.elements,g;
Ext.each(k,function(a){if((g=(h[a]||h[a=l.indexOf(a)]))){if(j){if(g.dom){g.remove()
}else{Ext.removeNode(g)
}}h.splice(a,1)
}});
return this
}});
Ext.CompositeElement=Ext.extend(Ext.CompositeElementLite,{constructor:function(c,d){this.elements=[];
this.add(c,d)
},getElement:function(b){return b
},transformElement:function(b){return Ext.get(b)
}});
Ext.Element.select=function(g,h,e){var j;
if(typeof g=="string"){j=Ext.Element.selectorFunction(g,e)
}else{if(g.length!==undefined){j=g
}else{throw"Invalid selector"
}}return(h===true)?new Ext.CompositeElement(j):new Ext.CompositeElementLite(j)
};
Ext.select=Ext.Element.select;
Ext.UpdateManager=Ext.Updater=Ext.extend(Ext.util.Observable,function(){var g="beforeupdate",l="update",m="failure";
function h(c){var b=this;
b.transaction=null;
if(c.argument.form&&c.argument.reset){try{c.argument.form.reset()
}catch(a){}}if(b.loadScripts){b.renderer.render(b.el,c,b,j.createDelegate(b,[c]))
}else{b.renderer.render(b.el,c,b);
j.call(b,c)
}}function j(c,b,a){this.fireEvent(b||l,this.el,c);
if(Ext.isFunction(c.argument.callback)){c.argument.callback.call(c.argument.scope,this.el,Ext.isEmpty(a)?true:false,c,c.argument.options)
}}function k(a){j.call(this,a,m,!!(this.transaction=null))
}return{constructor:function(b,c){var a=this;
b=Ext.get(b);
if(!c&&b.updateManager){return b.updateManager
}a.el=b;
a.defaultUrl=null;
a.addEvents(g,l,m);
Ext.apply(a,Ext.Updater.defaults);
a.transaction=null;
a.refreshDelegate=a.refresh.createDelegate(a);
a.updateDelegate=a.update.createDelegate(a);
a.formUpdateDelegate=(a.formUpdate||function(){}).createDelegate(a);
a.renderer=a.renderer||a.getDefaultRenderer();
Ext.Updater.superclass.constructor.call(a)
},setRenderer:function(a){this.renderer=a
},getRenderer:function(){return this.renderer
},getDefaultRenderer:function(){return new Ext.Updater.BasicRenderer()
},setDefaultUrl:function(a){this.defaultUrl=a
},getEl:function(){return this.el
},update:function(o,a,q,c){var d=this,p,e;
if(d.fireEvent(g,d.el,o,a)!==false){if(Ext.isObject(o)){p=o;
o=p.url;
a=a||p.params;
q=q||p.callback;
c=c||p.discardUrl;
e=p.scope;
if(!Ext.isEmpty(p.nocache)){d.disableCaching=p.nocache
}if(!Ext.isEmpty(p.text)){d.indicatorText='<div class="loading-indicator">'+p.text+"</div>"
}if(!Ext.isEmpty(p.scripts)){d.loadScripts=p.scripts
}if(!Ext.isEmpty(p.timeout)){d.timeout=p.timeout
}}d.showLoading();
if(!c){d.defaultUrl=o
}if(Ext.isFunction(o)){o=o.call(d)
}var b=Ext.apply({},{url:o,params:(Ext.isFunction(a)&&e)?a.createDelegate(e):a,success:h,failure:k,scope:d,callback:undefined,timeout:(d.timeout*1000),disableCaching:d.disableCaching,argument:{options:p,url:o,form:null,callback:q,scope:e||window,params:a}},p);
d.transaction=Ext.Ajax.request(b)
}},formUpdate:function(b,e,c,a){var d=this;
if(d.fireEvent(g,d.el,b,e)!==false){if(Ext.isFunction(e)){e=e.call(d)
}b=Ext.getDom(b);
d.transaction=Ext.Ajax.request({form:b,url:e,success:h,failure:k,scope:d,timeout:(d.timeout*1000),argument:{url:e,form:b,callback:a,reset:c}});
d.showLoading.defer(1,d)
}},startAutoRefresh:function(e,d,b,a,n){var c=this;
if(n){c.update(d||c.defaultUrl,b,a,true)
}if(c.autoRefreshProcId){clearInterval(c.autoRefreshProcId)
}c.autoRefreshProcId=setInterval(c.update.createDelegate(c,[d||c.defaultUrl,b,a,true]),e*1000)
},stopAutoRefresh:function(){if(this.autoRefreshProcId){clearInterval(this.autoRefreshProcId);
delete this.autoRefreshProcId
}},isAutoRefreshing:function(){return !!this.autoRefreshProcId
},showLoading:function(){if(this.showLoadIndicator){this.el.dom.innerHTML=this.indicatorText
}},abort:function(){if(this.transaction){Ext.Ajax.abort(this.transaction)
}},isUpdating:function(){return this.transaction?Ext.Ajax.isLoading(this.transaction):false
},refresh:function(a){if(this.defaultUrl){this.update(this.defaultUrl,null,a,true)
}}}
}());
Ext.Updater.defaults={timeout:30,disableCaching:false,showLoadIndicator:true,indicatorText:'<div class="loading-indicator">Loading...</div>',loadScripts:false,sslBlankUrl:Ext.SSL_SECURE_URL};
Ext.Updater.updateElement=function(k,l,j,g){var h=Ext.get(k).getUpdater();
Ext.apply(h,g);
h.update(l,j,g?g.callback:null)
};
Ext.Updater.BasicRenderer=function(){};
Ext.Updater.BasicRenderer.prototype={render:function(j,g,e,h){j.update(g.responseText,e.loadScripts,h)
}};
(function(){Date.useStrict=false;
function c(a){var b=Array.prototype.slice.call(arguments,1);
return a.replace(/\{(\d+)\}/g,function(h,g){return b[g]
})
}Date.formatCodeToRegex=function(b,g){var a=Date.parseCodes[b];
if(a){a=typeof a=="function"?a():a;
Date.parseCodes[b]=a
}return a?Ext.applyIf({c:a.c?c(a.c,g||"{0}"):a.c},a):{g:0,c:null,s:Ext.escapeRe(b)}
};
var d=Date.formatCodeToRegex;
Ext.apply(Date,{parseFunctions:{"M$":function(g,h){var b=new RegExp("\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/");
var a=(g||"").match(b);
return a?new Date(((a[1]||"")+a[2])*1):null
}},parseRegexes:[],formatFunctions:{"M$":function(){return"\\/Date("+this.getTime()+")\\/"
}},y2kYear:50,MILLI:"ms",SECOND:"s",MINUTE:"mi",HOUR:"h",DAY:"d",MONTH:"mo",YEAR:"y",defaults:{},dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNumbers:{Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11},getShortMonthName:function(a){return Date.monthNames[a].substring(0,3)
},getShortDayName:function(a){return Date.dayNames[a].substring(0,3)
},getMonthNumber:function(a){return Date.monthNumbers[a.substring(0,1).toUpperCase()+a.substring(1,3).toLowerCase()]
},formatContainsHourInfo:(function(){var a=/(\\.)/g,b=/([gGhHisucUOPZ]|M\$)/;
return function(g){return b.test(g.replace(a,""))
}
})(),formatCodes:{d:"String.leftPad(this.getDate(), 2, '0')",D:"Date.getShortDayName(this.getDay())",j:"this.getDate()",l:"Date.dayNames[this.getDay()]",N:"(this.getDay() ? this.getDay() : 7)",S:"this.getSuffix()",w:"this.getDay()",z:"this.getDayOfYear()",W:"String.leftPad(this.getWeekOfYear(), 2, '0')",F:"Date.monthNames[this.getMonth()]",m:"String.leftPad(this.getMonth() + 1, 2, '0')",M:"Date.getShortMonthName(this.getMonth())",n:"(this.getMonth() + 1)",t:"this.getDaysInMonth()",L:"(this.isLeapYear() ? 1 : 0)",o:"(this.getFullYear() + (this.getWeekOfYear() == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear() >= 52 && this.getMonth() < 11 ? -1 : 0)))",Y:"String.leftPad(this.getFullYear(), 4, '0')",y:"('' + this.getFullYear()).substring(2, 4)",a:"(this.getHours() < 12 ? 'am' : 'pm')",A:"(this.getHours() < 12 ? 'AM' : 'PM')",g:"((this.getHours() % 12) ? this.getHours() % 12 : 12)",G:"this.getHours()",h:"String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",H:"String.leftPad(this.getHours(), 2, '0')",i:"String.leftPad(this.getMinutes(), 2, '0')",s:"String.leftPad(this.getSeconds(), 2, '0')",u:"String.leftPad(this.getMilliseconds(), 3, '0')",O:"this.getGMTOffset()",P:"this.getGMTOffset(true)",T:"this.getTimezone()",Z:"(this.getTimezoneOffset() * -60)",c:function(){for(var a="Y-m-dTH:i:sP",e=[],k=0,l=a.length;
k<l;
++k){var b=a.charAt(k);
e.push(b=="T"?"'T'":Date.getFormatCode(b))
}return e.join(" + ")
},U:"Math.round(this.getTime() / 1000)"},isValid:function(r,q,a,h,o,m,p){h=h||0;
o=o||0;
m=m||0;
p=p||0;
var b=new Date(r<100?100:r,q-1,a,h,o,m,p).add(Date.YEAR,r<100?r-100:0);
return r==b.getFullYear()&&q==b.getMonth()+1&&a==b.getDate()&&h==b.getHours()&&o==b.getMinutes()&&m==b.getSeconds()&&p==b.getMilliseconds()
},parseDate:function(g,a,h){var b=Date.parseFunctions;
if(b[a]==null){Date.createParser(a)
}return b[a](g,Ext.isDefined(h)?h:Date.useStrict)
},getFormatCode:function(a){var b=Date.formatCodes[a];
if(b){b=typeof b=="function"?b():b;
Date.formatCodes[a]=b
}return b||("'"+String.escape(a)+"'")
},createFormat:function(a){var b=[],k=false,h="";
for(var j=0;
j<a.length;
++j){h=a.charAt(j);
if(!k&&h=="\\"){k=true
}else{if(k){k=false;
b.push("'"+String.escape(h)+"'")
}else{b.push(Date.getFormatCode(h))
}}}Date.formatFunctions[a]=new Function("return "+b.join("+"))
},createParser:function(){var a=["var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,","def = Date.defaults,","results = String(input).match(Date.parseRegexes[{0}]);","if(results){","{1}","if(u != null){","v = new Date(u * 1000);","}else{","dt = (new Date()).clearTime();","y = Ext.num(y, Ext.num(def.y, dt.getFullYear()));","m = Ext.num(m, Ext.num(def.m - 1, dt.getMonth()));","d = Ext.num(d, Ext.num(def.d, dt.getDate()));","h  = Ext.num(h, Ext.num(def.h, dt.getHours()));","i  = Ext.num(i, Ext.num(def.i, dt.getMinutes()));","s  = Ext.num(s, Ext.num(def.s, dt.getSeconds()));","ms = Ext.num(ms, Ext.num(def.ms, dt.getMilliseconds()));","if(z >= 0 && y >= 0){","v = new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms).add(Date.YEAR, y < 100 ? y - 100 : 0);","v = !strict? v : (strict === true && (z <= 364 || (v.isLeapYear() && z <= 365))? v.add(Date.DAY, z) : null);","}else if(strict === true && !Date.isValid(y, m + 1, d, h, i, s, ms)){","v = null;","}else{","v = new Date(y < 100 ? 100 : y, m, d, h, i, s, ms).add(Date.YEAR, y < 100 ? y - 100 : 0);","}","}","}","if(v){","if(zz != null){","v = v.add(Date.SECOND, -v.getTimezoneOffset() * 60 - zz);","}else if(o){","v = v.add(Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));","}","}","return v;"].join("\n");
return function(p){var v=Date.parseRegexes.length,b=1,u=[],q=[],r=false,w="",s=0,t,o;
for(;
s<p.length;
++s){w=p.charAt(s);
if(!r&&w=="\\"){r=true
}else{if(r){r=false;
q.push(String.escape(w))
}else{t=d(w,b);
b+=t.g;
q.push(t.s);
if(t.g&&t.c){if(t.calcLast){o=t.c
}else{u.push(t.c)
}}}}}if(o){u.push(o)
}Date.parseRegexes[v]=new RegExp("^"+q.join("")+"$","i");
Date.parseFunctions[p]=new Function("input","strict",c(a,v,u.join("")))
}
}(),parseCodes:{d:{g:1,c:"d = parseInt(results[{0}], 10);\n",s:"(\\d{2})"},j:{g:1,c:"d = parseInt(results[{0}], 10);\n",s:"(\\d{1,2})"},D:function(){for(var b=[],a=0;
a<7;
b.push(Date.getShortDayName(a)),++a){}return{g:0,c:null,s:"(?:"+b.join("|")+")"}
},l:function(){return{g:0,c:null,s:"(?:"+Date.dayNames.join("|")+")"}
},N:{g:0,c:null,s:"[1-7]"},S:{g:0,c:null,s:"(?:st|nd|rd|th)"},w:{g:0,c:null,s:"[0-6]"},z:{g:1,c:"z = parseInt(results[{0}], 10);\n",s:"(\\d{1,3})"},W:{g:0,c:null,s:"(?:\\d{2})"},F:function(){return{g:1,c:"m = parseInt(Date.getMonthNumber(results[{0}]), 10);\n",s:"("+Date.monthNames.join("|")+")"}
},M:function(){for(var b=[],a=0;
a<12;
b.push(Date.getShortMonthName(a)),++a){}return Ext.applyIf({s:"("+b.join("|")+")"},d("F"))
},m:{g:1,c:"m = parseInt(results[{0}], 10) - 1;\n",s:"(\\d{2})"},n:{g:1,c:"m = parseInt(results[{0}], 10) - 1;\n",s:"(\\d{1,2})"},t:{g:0,c:null,s:"(?:\\d{2})"},L:{g:0,c:null,s:"(?:1|0)"},o:function(){return d("Y")
},Y:{g:1,c:"y = parseInt(results[{0}], 10);\n",s:"(\\d{4})"},y:{g:1,c:"var ty = parseInt(results[{0}], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",s:"(\\d{1,2})"},a:function(){return d("A")
},A:{calcLast:true,g:1,c:"if (/(am)/i.test(results[{0}])) {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",s:"(AM|PM|am|pm)"},g:function(){return d("G")
},G:{g:1,c:"h = parseInt(results[{0}], 10);\n",s:"(\\d{1,2})"},h:function(){return d("H")
},H:{g:1,c:"h = parseInt(results[{0}], 10);\n",s:"(\\d{2})"},i:{g:1,c:"i = parseInt(results[{0}], 10);\n",s:"(\\d{2})"},s:{g:1,c:"s = parseInt(results[{0}], 10);\n",s:"(\\d{2})"},u:{g:1,c:"ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",s:"(\\d+)"},O:{g:1,c:["o = results[{0}];","var sn = o.substring(0,1),","hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),","mn = o.substring(3,5) % 60;","o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"].join("\n"),s:"([+-]\\d{4})"},P:{g:1,c:["o = results[{0}];","var sn = o.substring(0,1),","hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),","mn = o.substring(4,6) % 60;","o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"].join("\n"),s:"([+-]\\d{2}:\\d{2})"},T:{g:0,c:null,s:"[A-Z]{1,4}"},Z:{g:1,c:"zz = results[{0}] * 1;\nzz = (-43200 <= zz && zz <= 50400)? zz : null;\n",s:"([+-]?\\d{1,5})"},c:function(){var b=[],h=[d("Y",1),d("m",2),d("d",3),d("h",4),d("i",5),d("s",6),{c:"ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"},{c:["if(results[8]) {","if(results[8] == 'Z'){","zz = 0;","}else if (results[8].indexOf(':') > -1){",d("P",8).c,"}else{",d("O",8).c,"}","}"].join("\n")}];
for(var a=0,g=h.length;
a<g;
++a){b.push(h[a].c)
}return{g:1,c:b.join(""),s:[h[0].s,"(?:","-",h[1].s,"(?:","-",h[2].s,"(?:","(?:T| )?",h[3].s,":",h[4].s,"(?::",h[5].s,")?","(?:(?:\\.|,)(\\d+))?","(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?",")?",")?",")?"].join("")}
},U:{g:1,c:"u = parseInt(results[{0}], 10);\n",s:"(-?\\d+)"}}})
}());
Ext.apply(Date.prototype,{dateFormat:function(b){if(Date.formatFunctions[b]==null){Date.createFormat(b)
}return Date.formatFunctions[b].call(this)
},getTimezone:function(){return this.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/,"$1$2").replace(/[^A-Z]/g,"")
},getGMTOffset:function(b){return(this.getTimezoneOffset()>0?"-":"+")+String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset())/60),2,"0")+(b?":":"")+String.leftPad(Math.abs(this.getTimezoneOffset()%60),2,"0")
},getDayOfYear:function(){var d=0,h=this.clone(),g=this.getMonth(),j;
for(j=0,h.setDate(1),h.setMonth(0);
j<g;
h.setMonth(++j)){d+=h.getDaysInMonth()
}return d+this.getDate()-1
},getWeekOfYear:function(){var d=86400000,c=7*d;
return function(){var b=Date.UTC(this.getFullYear(),this.getMonth(),this.getDate()+3)/d,g=Math.floor(b/7),a=new Date(g*c).getUTCFullYear();
return g-Math.floor(Date.UTC(a,0,7)/c)+1
}
}(),isLeapYear:function(){var b=this.getFullYear();
return !!((b&3)==0&&(b%100||(b%400==0&&b)))
},getFirstDayOfMonth:function(){var b=(this.getDay()-(this.getDate()-1))%7;
return(b<0)?(b+7):b
},getLastDayOfMonth:function(){return this.getLastDateOfMonth().getDay()
},getFirstDateOfMonth:function(){return new Date(this.getFullYear(),this.getMonth(),1)
},getLastDateOfMonth:function(){return new Date(this.getFullYear(),this.getMonth(),this.getDaysInMonth())
},getDaysInMonth:function(){var b=[31,28,31,30,31,30,31,31,30,31,30,31];
return function(){var a=this.getMonth();
return a==1&&this.isLeapYear()?29:b[a]
}
}(),getSuffix:function(){switch(this.getDate()){case 1:case 21:case 31:return"st";
case 2:case 22:return"nd";
case 3:case 23:return"rd";
default:return"th"
}},clone:function(){return new Date(this.getTime())
},isDST:function(){return new Date(this.getFullYear(),0,1).getTimezoneOffset()!=this.getTimezoneOffset()
},clearTime:function(g){if(g){return this.clone().clearTime()
}var c=this.getDate();
this.setHours(0);
this.setMinutes(0);
this.setSeconds(0);
this.setMilliseconds(0);
if(this.getDate()!=c){for(var d=1,h=this.add(Date.HOUR,d);
h.getDate()!=c;
d++,h=this.add(Date.HOUR,d)){}this.setDate(c);
this.setHours(h.getHours())
}return this
},add:function(d,j){var h=this.clone();
if(!d||j===0){return h
}switch(d.toLowerCase()){case Date.MILLI:h.setMilliseconds(this.getMilliseconds()+j);
break;
case Date.SECOND:h.setSeconds(this.getSeconds()+j);
break;
case Date.MINUTE:h.setMinutes(this.getMinutes()+j);
break;
case Date.HOUR:h.setHours(this.getHours()+j);
break;
case Date.DAY:h.setDate(this.getDate()+j);
break;
case Date.MONTH:var g=this.getDate();
if(g>28){g=Math.min(g,this.getFirstDateOfMonth().add("mo",j).getLastDateOfMonth().getDate())
}h.setDate(g);
h.setMonth(this.getMonth()+j);
break;
case Date.YEAR:h.setFullYear(this.getFullYear()+j);
break
}return h
},between:function(g,e){var d=this.getTime();
return g.getTime()<=d&&d<=e.getTime()
}});
Date.prototype.format=Date.prototype.dateFormat;
if(Ext.isSafari&&(navigator.userAgent.match(/WebKit\/(\d+)/)[1]||NaN)<420){Ext.apply(Date.prototype,{_xMonth:Date.prototype.setMonth,_xDate:Date.prototype.setDate,setMonth:function(g){if(g<=-1){var h=Math.ceil(-g),j=Math.ceil(h/12),e=(h%12)?12-h%12:0;
this.setFullYear(this.getFullYear()-j);
return this._xMonth(e)
}else{return this._xMonth(g)
}},setDate:function(b){return this.setTime(this.getTime()-(this.getDate()-b)*86400000)
}})
}Ext.util.MixedCollection=function(c,d){this.items=[];
this.map={};
this.keys=[];
this.length=0;
this.addEvents("clear","add","replace","remove","sort");
this.allowFunctions=c===true;
if(d){this.getKey=d
}Ext.util.MixedCollection.superclass.constructor.call(this)
};
Ext.extend(Ext.util.MixedCollection,Ext.util.Observable,{allowFunctions:false,add:function(d,g){if(arguments.length==1){g=arguments[0];
d=this.getKey(g)
}if(typeof d!="undefined"&&d!==null){var e=this.map[d];
if(typeof e!="undefined"){return this.replace(d,g)
}this.map[d]=g
}this.length++;
this.items.push(g);
this.keys.push(d);
this.fireEvent("add",this.length-1,g,d);
return g
},getKey:function(b){return b.id
},replace:function(j,h){if(arguments.length==1){h=arguments[0];
j=this.getKey(h)
}var g=this.map[j];
if(typeof j=="undefined"||j===null||typeof g=="undefined"){return this.add(j,h)
}var e=this.indexOfKey(j);
this.items[e]=h;
this.map[j]=h;
this.fireEvent("replace",j,g,h);
return h
},addAll:function(j){if(arguments.length>1||Ext.isArray(j)){var g=arguments.length>1?arguments:j;
for(var k=0,h=g.length;
k<h;
k++){this.add(g[k])
}}else{for(var l in j){if(this.allowFunctions||typeof j[l]!="function"){this.add(l,j[l])
}}}},each:function(j,k){var g=[].concat(this.items);
for(var l=0,h=g.length;
l<h;
l++){if(j.call(k||g[l],g[l],l,h)===false){break
}}},eachKey:function(h,j){for(var e=0,g=this.keys.length;
e<g;
e++){h.call(j||window,this.keys[e],this.items[e],e,g)
}},find:function(h,j){for(var e=0,g=this.items.length;
e<g;
e++){if(h.call(j||window,this.items[e],this.keys[e])){return this.items[e]
}}return null
},insert:function(e,d,g){if(arguments.length==2){g=arguments[1];
d=this.getKey(g)
}if(this.containsKey(d)){this.suspendEvents();
this.removeKey(d);
this.resumeEvents()
}if(e>=this.length){return this.add(d,g)
}this.length++;
this.items.splice(e,0,g);
if(typeof d!="undefined"&&d!==null){this.map[d]=g
}this.keys.splice(e,0,d);
this.fireEvent("add",e,g,d);
return g
},remove:function(b){return this.removeAt(this.indexOf(b))
},removeAt:function(e){if(e<this.length&&e>=0){this.length--;
var g=this.items[e];
this.items.splice(e,1);
var d=this.keys[e];
if(typeof d!="undefined"){delete this.map[d]
}this.keys.splice(e,1);
this.fireEvent("remove",g,d);
return g
}return false
},removeKey:function(b){return this.removeAt(this.indexOfKey(b))
},getCount:function(){return this.length
},indexOf:function(b){return this.items.indexOf(b)
},indexOfKey:function(b){return this.keys.indexOf(b)
},item:function(d){var e=this.map[d],g=e!==undefined?e:(typeof d=="number")?this.items[d]:undefined;
return typeof g!="function"||this.allowFunctions?g:null
},itemAt:function(b){return this.items[b]
},key:function(b){return this.map[b]
},contains:function(b){return this.indexOf(b)!=-1
},containsKey:function(b){return typeof this.map[b]!="undefined"
},clear:function(){this.length=0;
this.items=[];
this.keys=[];
this.map={};
this.fireEvent("clear")
},first:function(){return this.items[0]
},last:function(){return this.items[this.length-1]
},_sort:function(l,s,m){var q,p,r=String(s).toUpperCase()=="DESC"?-1:1,n=[],c=this.keys,o=this.items;
m=m||function(a,b){return a-b
};
for(q=0,p=o.length;
q<p;
q++){n[n.length]={key:c[q],value:o[q],index:q}
}n.sort(function(b,d){var a=m(b[l],d[l])*r;
if(a===0){a=(b.index<d.index?-1:1)
}return a
});
for(q=0,p=n.length;
q<p;
q++){o[q]=n[q].value;
c[q]=n[q].key
}this.fireEvent("sort",this)
},sort:function(d,c){this._sort("value",d,c)
},reorder:function(n){this.suspendEvents();
var h=this.items,o=0,l=h.length,j=[],m=[],k;
for(k in n){j[n[k]]=h[k]
}for(o=0;
o<l;
o++){if(n[o]==undefined){m.push(h[o])
}}for(o=0;
o<l;
o++){if(j[o]==undefined){j[o]=m.shift()
}}this.clear();
this.addAll(j);
this.resumeEvents();
this.fireEvent("sort",this)
},keySort:function(d,c){this._sort("key",d,c||function(g,h){var a=String(g).toUpperCase(),b=String(h).toUpperCase();
return a>b?1:(a<b?-1:0)
})
},getRange:function(j,h){var g=this.items;
if(g.length<1){return[]
}j=j||0;
h=Math.min(typeof h=="undefined"?this.length-1:h,this.length-1);
var l,k=[];
if(j<=h){for(l=j;
l<=h;
l++){k[k.length]=g[l]
}}else{for(l=j;
l>=h;
l--){k[k.length]=g[l]
}}return k
},filter:function(j,e,h,g){if(Ext.isEmpty(e,false)){return this.clone()
}e=this.createValueMatcher(e,h,g);
return this.filterBy(function(a){return a&&e.test(a[j])
})
},filterBy:function(l,m){var k=new Ext.util.MixedCollection();
k.getKey=this.getKey;
var h=this.keys,n=this.items;
for(var o=0,j=n.length;
o<j;
o++){if(l.call(m||this,n[o],h[o])){k.add(h[o],n[o])
}}return k
},findIndex:function(l,g,j,k,h){if(Ext.isEmpty(g,false)){return -1
}g=this.createValueMatcher(g,k,h);
return this.findIndexBy(function(a){return a&&g.test(a[l])
},null,j)
},findIndexBy:function(l,m,k){var h=this.keys,n=this.items;
for(var o=(k||0),j=n.length;
o<j;
o++){if(l.call(m||this,n[o],h[o])){return o
}}return -1
},createValueMatcher:function(l,j,h,g){if(!l.exec){var k=Ext.escapeRe;
l=String(l);
if(j===true){l=k(l)
}else{l="^"+k(l);
if(g===true){l+="$"
}}l=new RegExp(l,h?"":"i")
}return l
},clone:function(){var j=new Ext.util.MixedCollection();
var g=this.keys,k=this.items;
for(var l=0,h=k.length;
l<h;
l++){j.add(g[l],k[l])
}j.getKey=this.getKey;
return j
}});
Ext.util.MixedCollection.prototype.get=Ext.util.MixedCollection.prototype.item;
Ext.AbstractManager=Ext.extend(Object,{typeName:"type",constructor:function(b){Ext.apply(this,b||{});
this.all=new Ext.util.MixedCollection();
this.types={}
},get:function(b){return this.all.get(b)
},register:function(b){this.all.add(b)
},unregister:function(b){this.all.remove(b)
},registerType:function(c,d){this.types[c]=d;
d[this.typeName]=c
},isRegistered:function(b){return this.types[b]!==undefined
},create:function(g,h){var e=g[this.typeName]||g.type||h,j=this.types[e];
if(j==undefined){throw new Error(String.format("The '{0}' type has not been registered with this manager",e))
}return new j(g)
},onAvailable:function(h,j,e){var g=this.all;
g.on("add",function(b,a){if(a.id==h){j.call(e||a,a);
g.un("add",j,e)
}})
}});
Ext.util.Format=function(){var trimRe=/^\s+|\s+$/g,stripTagsRE=/<\/?[^>]+>/gi,stripScriptsRe=/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,nl2brRe=/\r?\n/g;
return{ellipsis:function(value,len,word){if(value&&value.length>len){if(word){var vs=value.substr(0,len-2),index=Math.max(vs.lastIndexOf(" "),vs.lastIndexOf("."),vs.lastIndexOf("!"),vs.lastIndexOf("?"));
if(index==-1||index<(len-15)){return value.substr(0,len-3)+"..."
}else{return vs.substr(0,index)+"..."
}}else{return value.substr(0,len-3)+"..."
}}return value
},undef:function(value){return value!==undefined?value:""
},defaultValue:function(value,defaultValue){return value!==undefined&&value!==""?value:defaultValue
},htmlEncode:function(value){return !value?value:String(value).replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")
},htmlDecode:function(value){return !value?value:String(value).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,'"').replace(/&amp;/g,"&")
},trim:function(value){return String(value).replace(trimRe,"")
},substr:function(value,start,length){return String(value).substr(start,length)
},lowercase:function(value){return String(value).toLowerCase()
},uppercase:function(value){return String(value).toUpperCase()
},capitalize:function(value){return !value?value:value.charAt(0).toUpperCase()+value.substr(1).toLowerCase()
},call:function(value,fn){if(arguments.length>2){var args=Array.prototype.slice.call(arguments,2);
args.unshift(value);
return eval(fn).apply(window,args)
}else{return eval(fn).call(window,value)
}},usMoney:function(v){v=(Math.round((v-0)*100))/100;
v=(v==Math.floor(v))?v+".00":((v*10==Math.floor(v*10))?v+"0":v);
v=String(v);
var ps=v.split("."),whole=ps[0],sub=ps[1]?"."+ps[1]:".00",r=/(\d+)(\d{3})/;
while(r.test(whole)){whole=whole.replace(r,"$1,$2")
}v=whole+sub;
if(v.charAt(0)=="-"){return"-$"+v.substr(1)
}return"$"+v
},date:function(v,format){if(!v){return""
}if(!Ext.isDate(v)){v=new Date(Date.parse(v))
}return v.dateFormat(format||"m/d/Y")
},dateRenderer:function(format){return function(v){return Ext.util.Format.date(v,format)
}
},stripTags:function(v){return !v?v:String(v).replace(stripTagsRE,"")
},stripScripts:function(v){return !v?v:String(v).replace(stripScriptsRe,"")
},fileSize:function(size){if(size<1024){return size+" bytes"
}else{if(size<1048576){return(Math.round(((size*10)/1024))/10)+" KB"
}else{return(Math.round(((size*10)/1048576))/10)+" MB"
}}},math:function(){var fns={};
return function(v,a){if(!fns[a]){fns[a]=new Function("v","return v "+a+";")
}return fns[a](v)
}
}(),round:function(value,precision){var result=Number(value);
if(typeof precision=="number"){precision=Math.pow(10,precision);
result=Math.round(value*precision)/precision
}return result
},number:function(v,format){if(!format){return v
}v=Ext.num(v,NaN);
if(isNaN(v)){return""
}var comma=",",dec=".",i18n=false,neg=v<0;
v=Math.abs(v);
if(format.substr(format.length-2)=="/i"){format=format.substr(0,format.length-2);
i18n=true;
comma=".";
dec=","
}var hasComma=format.indexOf(comma)!=-1,psplit=(i18n?format.replace(/[^\d\,]/g,""):format.replace(/[^\d\.]/g,"")).split(dec);
if(1<psplit.length){v=v.toFixed(psplit[1].length)
}else{if(2<psplit.length){throw ("NumberFormatException: invalid format, formats should have no more than 1 period: "+format)
}else{v=v.toFixed(0)
}}var fnum=v.toString();
psplit=fnum.split(".");
if(hasComma){var cnum=psplit[0],parr=[],j=cnum.length,m=Math.floor(j/3),n=cnum.length%3||3,i;
for(i=0;
i<j;
i+=n){if(i!=0){n=3
}parr[parr.length]=cnum.substr(i,n);
m-=1
}fnum=parr.join(comma);
if(psplit[1]){fnum+=dec+psplit[1]
}}else{if(psplit[1]){fnum=psplit[0]+dec+psplit[1]
}}return(neg?"-":"")+format.replace(/[\d,?\.?]+/,fnum)
},numberRenderer:function(format){return function(v){return Ext.util.Format.number(v,format)
}
},plural:function(v,s,p){return v+" "+(v==1?s:(p?p:s+"s"))
},nl2br:function(v){return Ext.isEmpty(v)?"":v.replace(nl2brRe,"<br/>")
}}
}();
Ext.XTemplate=function(){Ext.XTemplate.superclass.constructor.apply(this,arguments);
var A=this,N=A.html,H=/<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/,R=/^<tpl\b[^>]*?for="(.*?)"/,D=/^<tpl\b[^>]*?if="(.*?)"/,B=/^<tpl\b[^>]*?exec="(.*?)"/,G,I=0,M=[],J="values",C="parent",L="xindex",K="xcount",Q="return ",S="with(values){ ";
N=["<tpl>",N,"</tpl>"].join("");
while((G=N.match(H))){var T=G[0].match(R),U=G[0].match(D),m=G[0].match(B),P=null,O=null,F=null,s=T&&T[1]?T[1]:"";
if(U){P=U&&U[1]?U[1]:null;
if(P){O=new Function(J,C,L,K,S+Q+(Ext.util.Format.htmlDecode(P))+"; }")
}}if(m){P=m&&m[1]?m[1]:null;
if(P){F=new Function(J,C,L,K,S+(Ext.util.Format.htmlDecode(P))+"; }")
}}if(s){switch(s){case".":s=new Function(J,C,S+Q+J+"; }");
break;
case"..":s=new Function(J,C,S+Q+C+"; }");
break;
default:s=new Function(J,C,S+Q+s+"; }")
}}M.push({id:I,target:s,exec:F,test:O,body:G[1]||""});
N=N.replace(G[0],"{xtpl"+I+"}");
++I
}for(var E=M.length-1;
E>=0;
--E){A.compileTpl(M[E])
}A.master=M[M.length-1];
A.tpls=M
};
Ext.extend(Ext.XTemplate,Ext.Template,{re:/\{([\w\-\.\#]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\\]\s?[\d\.\+\-\*\\\(\)]+)?\}/g,codeRe:/\{\[((?:\\\]|.|\n)*?)\]\}/g,applySubTemplate:function(w,o,p,t,u){var q=this,r,m=q.tpls[w],n,v=[];
if((m.test&&!m.test.call(q,o,p,t,u))||(m.exec&&m.exec.call(q,o,p,t,u))){return""
}n=m.target?m.target.call(q,o,p):o;
r=n.length;
p=m.target?o:p;
if(m.target&&Ext.isArray(n)){for(var s=0,r=n.length;
s<r;
s++){v[v.length]=m.compiled.call(q,n[s],p,s+1,r)
}return v.join("")
}return m.compiled.call(q,n,p,t,u)
},compileTpl:function(tpl){var fm=Ext.util.Format,useF=this.disableFormats!==true,sep=Ext.isGecko?"+":",",body;
function fn(m,name,format,args,math){if(name.substr(0,4)=="xtpl"){return"'"+sep+"this.applySubTemplate("+name.substr(4)+", values, parent, xindex, xcount)"+sep+"'"
}var v;
if(name==="."){v="values"
}else{if(name==="#"){v="xindex"
}else{if(name.indexOf(".")!=-1){v=name
}else{v="values['"+name+"']"
}}}if(math){v="("+v+math+")"
}if(format&&useF){args=args?","+args:"";
if(format.substr(0,5)!="this."){format="fm."+format+"("
}else{format='this.call("'+format.substr(5)+'", ';
args=", values"
}}else{args="";
format="("+v+" === undefined ? '' : "
}return"'"+sep+format+v+args+")"+sep+"'"
}function codeFn(m,code){return"'"+sep+"("+code.replace(/\\'/g,"'")+")"+sep+"'"
}if(Ext.isGecko){body="tpl.compiled = function(values, parent, xindex, xcount){ return '"+tpl.body.replace(/(\r\n|\n)/g,"\\n").replace(/'/g,"\\'").replace(this.re,fn).replace(this.codeRe,codeFn)+"';};"
}else{body=["tpl.compiled = function(values, parent, xindex, xcount){ return ['"];
body.push(tpl.body.replace(/(\r\n|\n)/g,"\\n").replace(/'/g,"\\'").replace(this.re,fn).replace(this.codeRe,codeFn));
body.push("'].join('');};");
body=body.join("")
}eval(body);
return this
},applyTemplate:function(b){return this.master.compiled.call(this,b,{},1,1)
},compile:function(){return this
}});
Ext.XTemplate.prototype.apply=Ext.XTemplate.prototype.applyTemplate;
Ext.XTemplate.from=function(b){b=Ext.getDom(b);
return new Ext.XTemplate(b.value||b.innerHTML)
};
Ext.util.CSS=function(){var h=null;
var j=document;
var e=/(-[a-z])/gi;
var g=function(b,a){return a.charAt(1).toUpperCase()
};
return{createStyleSheet:function(d,a){var l;
var m=j.getElementsByTagName("head")[0];
var b=j.createElement("style");
b.setAttribute("type","text/css");
if(a){b.setAttribute("id",a)
}if(Ext.isIE){m.appendChild(b);
l=b.styleSheet;
l.cssText=d
}else{try{b.appendChild(j.createTextNode(d))
}catch(c){b.cssText=d
}m.appendChild(b);
l=b.styleSheet?b.styleSheet:(b.sheet||j.styleSheets[j.styleSheets.length-1])
}this.cacheStyleSheet(l);
return l
},removeStyleSheet:function(a){var b=j.getElementById(a);
if(b){b.parentNode.removeChild(b)
}},swapStyleSheet:function(a,c){this.removeStyleSheet(a);
var b=j.createElement("link");
b.setAttribute("rel","stylesheet");
b.setAttribute("type","text/css");
b.setAttribute("id",a);
b.setAttribute("href",c);
j.getElementsByTagName("head")[0].appendChild(b)
},refreshCache:function(){return this.getRules(true)
},cacheStyleSheet:function(c){if(!h){h={}
}try{var a=c.cssRules||c.rules;
for(var d=a.length-1;
d>=0;
--d){h[a[d].selectorText.toLowerCase()]=a[d]
}}catch(b){}},getRules:function(d){if(h===null||d){h={};
var b=j.styleSheets;
for(var c=0,l=b.length;
c<l;
c++){try{this.cacheStyleSheet(b[c])
}catch(a){}}}return h
},getRule:function(d,b){var c=this.getRules(b);
if(!Ext.isArray(d)){return c[d.toLowerCase()]
}for(var a=0;
a<d.length;
a++){if(c[d[a]]){return c[d[a].toLowerCase()]
}}return null
},updateRule:function(k,b,c){if(!Ext.isArray(k)){var a=this.getRule(k);
if(a){a.style[b.replace(e,g)]=c;
return true
}}else{for(var d=0;
d<k.length;
d++){if(this.updateRule(k[d],b,c)){return true
}}}return false
}}
}();
Ext.util.ClickRepeater=Ext.extend(Ext.util.Observable,{constructor:function(c,d){this.el=Ext.get(c);
this.el.unselectable();
Ext.apply(this,d);
this.addEvents("mousedown","click","mouseup");
if(!this.disabled){this.disabled=true;
this.enable()
}if(this.handler){this.on("click",this.handler,this.scope||this)
}Ext.util.ClickRepeater.superclass.constructor.call(this)
},interval:20,delay:250,preventDefault:true,stopDefault:false,timer:0,enable:function(){if(this.disabled){this.el.on("mousedown",this.handleMouseDown,this);
if(Ext.isIE){this.el.on("dblclick",this.handleDblClick,this)
}if(this.preventDefault||this.stopDefault){this.el.on("click",this.eventOptions,this)
}}this.disabled=false
},disable:function(b){if(b||!this.disabled){clearTimeout(this.timer);
if(this.pressClass){this.el.removeClass(this.pressClass)
}Ext.getDoc().un("mouseup",this.handleMouseUp,this);
this.el.removeAllListeners()
}this.disabled=true
},setDisabled:function(b){this[b?"disable":"enable"]()
},eventOptions:function(b){if(this.preventDefault){b.preventDefault()
}if(this.stopDefault){b.stopEvent()
}},destroy:function(){this.disable(true);
Ext.destroy(this.el);
this.purgeListeners()
},handleDblClick:function(b){clearTimeout(this.timer);
this.el.blur();
this.fireEvent("mousedown",this,b);
this.fireEvent("click",this,b)
},handleMouseDown:function(b){clearTimeout(this.timer);
this.el.blur();
if(this.pressClass){this.el.addClass(this.pressClass)
}this.mousedownTime=new Date();
Ext.getDoc().on("mouseup",this.handleMouseUp,this);
this.el.on("mouseout",this.handleMouseOut,this);
this.fireEvent("mousedown",this,b);
this.fireEvent("click",this,b);
if(this.accelerate){this.delay=400
}this.timer=this.click.defer(this.delay||this.interval,this,[b])
},click:function(b){this.fireEvent("click",this,b);
this.timer=this.click.defer(this.accelerate?this.easeOutExpo(this.mousedownTime.getElapsed(),400,-390,12000):this.interval,this,[b])
},easeOutExpo:function(h,b,c,d){return(h==d)?b+c:c*(-Math.pow(2,-10*h/d)+1)+b
},handleMouseOut:function(){clearTimeout(this.timer);
if(this.pressClass){this.el.removeClass(this.pressClass)
}this.el.on("mouseover",this.handleMouseReturn,this)
},handleMouseReturn:function(){this.el.un("mouseover",this.handleMouseReturn,this);
if(this.pressClass){this.el.addClass(this.pressClass)
}this.click()
},handleMouseUp:function(b){clearTimeout(this.timer);
this.el.un("mouseover",this.handleMouseReturn,this);
this.el.un("mouseout",this.handleMouseOut,this);
Ext.getDoc().un("mouseup",this.handleMouseUp,this);
this.el.removeClass(this.pressClass);
this.fireEvent("mouseup",this,b)
}});
Ext.KeyNav=function(c,d){this.el=Ext.get(c);
Ext.apply(this,d);
if(!this.disabled){this.disabled=true;
this.enable()
}};
Ext.KeyNav.prototype={disabled:false,defaultEventAction:"stopEvent",forceKeyDown:false,relay:function(g){var e=g.getKey(),d=this.keyToHandler[e];
if(d&&this[d]){if(this.doRelay(g,this[d],d)!==true){g[this.defaultEventAction]()
}}},doRelay:function(g,d,e){return d.call(this.scope||this,g,e)
},enter:false,left:false,right:false,up:false,down:false,tab:false,esc:false,pageUp:false,pageDown:false,del:false,home:false,end:false,space:false,keyToHandler:{37:"left",39:"right",38:"up",40:"down",33:"pageUp",34:"pageDown",46:"del",36:"home",35:"end",13:"enter",27:"esc",9:"tab",32:"space"},stopKeyUp:function(c){var d=c.getKey();
if(d>=37&&d<=40){c.stopEvent()
}},destroy:function(){this.disable()
},enable:function(){if(this.disabled){if(Ext.isSafari2){this.el.on("keyup",this.stopKeyUp,this)
}this.el.on(this.isKeydown()?"keydown":"keypress",this.relay,this);
this.disabled=false
}},disable:function(){if(!this.disabled){if(Ext.isSafari2){this.el.un("keyup",this.stopKeyUp,this)
}this.el.un(this.isKeydown()?"keydown":"keypress",this.relay,this);
this.disabled=true
}},setDisabled:function(b){this[b?"disable":"enable"]()
},isKeydown:function(){return this.forceKeyDown||Ext.EventManager.useKeydown
}};
Ext.KeyMap=function(g,d,e){this.el=Ext.get(g);
this.eventName=e||"keydown";
this.bindings=[];
if(d){this.addBinding(d)
}this.enable()
};
Ext.KeyMap.prototype={stopEvent:false,addBinding:function(s){if(Ext.isArray(s)){Ext.each(s,function(a){this.addBinding(a)
},this);
return
}var l=s.key,o=s.fn||s.handler,j=s.scope;
if(s.stopEvent){this.stopEvent=s.stopEvent
}if(typeof l=="string"){var n=[];
var p=l.toUpperCase();
for(var r=0,q=p.length;
r<q;
r++){n.push(p.charCodeAt(r))
}l=n
}var t=Ext.isArray(l);
var m=function(d){if(this.checkModifiers(s,d)){var b=d.getKey();
if(t){for(var a=0,c=l.length;
a<c;
a++){if(l[a]==b){if(this.stopEvent){d.stopEvent()
}o.call(j||window,b,d);
return
}}}else{if(b==l){if(this.stopEvent){d.stopEvent()
}o.call(j||window,b,d)
}}}};
this.bindings.push(m)
},checkModifiers:function(e,l){var k,n,m=["shift","ctrl","alt"];
for(var o=0,j=m.length;
o<j;
++o){n=m[o];
k=e[n];
if(!(k===undefined||(k===l[n+"Key"]))){return false
}}return true
},on:function(h,n,o){var k,j,m,l;
if(typeof h=="object"&&!Ext.isArray(h)){k=h.key;
j=h.shift;
m=h.ctrl;
l=h.alt
}else{k=h
}this.addBinding({key:k,shift:j,ctrl:m,alt:l,fn:n,scope:o})
},handleKeyDown:function(e){if(this.enabled){var h=this.bindings;
for(var g=0,b=h.length;
g<b;
g++){h[g].call(this,e)
}}},isEnabled:function(){return this.enabled
},enable:function(){if(!this.enabled){this.el.on(this.eventName,this.handleKeyDown,this);
this.enabled=true
}},disable:function(){if(this.enabled){this.el.removeListener(this.eventName,this.handleKeyDown,this);
this.enabled=false
}},setDisabled:function(b){this[b?"disable":"enable"]()
}};
Ext.util.TextMetrics=function(){var b;
return{measure:function(a,g,e){if(!b){b=Ext.util.TextMetrics.Instance(a,e)
}b.bind(a);
b.setFixedWidth(e||"auto");
return b.getSize(g)
},createInstance:function(a,d){return Ext.util.TextMetrics.Instance(a,d)
}}
}();
Ext.util.TextMetrics.Instance=function(e,h){var j=new Ext.Element(document.createElement("div"));
document.body.appendChild(j.dom);
j.position("absolute");
j.setLeftTop(-1000,-1000);
j.hide();
if(h){j.setWidth(h)
}var g={getSize:function(a){j.update(a);
var b=j.getSize();
j.update("");
return b
},bind:function(a){j.setStyle(Ext.fly(a).getStyles("font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"))
},setFixedWidth:function(a){j.setWidth(a)
},getWidth:function(a){j.dom.style.width="auto";
return this.getSize(a).width
},getHeight:function(a){return this.getSize(a).height
}};
g.bind(e);
return g
};
Ext.Element.addMethods({getTextWidth:function(g,d,e){return(Ext.util.TextMetrics.measure(this.dom,Ext.value(g,this.dom.innerHTML,true)).width).constrain(d||0,e||1000000)
}});
Ext.util.Cookies={set:function(q,o){var k=arguments;
var l=arguments.length;
var j=(l>2)?k[2]:null;
var m=(l>3)?k[3]:"/";
var p=(l>4)?k[4]:null;
var n=(l>5)?k[5]:false;
document.cookie=q+"="+escape(o)+((j===null)?"":("; expires="+j.toGMTString()))+((m===null)?"":("; path="+m))+((p===null)?"":("; domain="+p))+((n===true)?"; secure":"")
},get:function(l){var g=l+"=";
var j=g.length;
var h=document.cookie.length;
var k=0;
var m=0;
while(k<h){m=k+j;
if(document.cookie.substring(k,m)==g){return Ext.util.Cookies.getCookieVal(m)
}k=document.cookie.indexOf(" ",k)+1;
if(k===0){break
}}return null
},clear:function(b){if(Ext.util.Cookies.get(b)){document.cookie=b+"=; expires=Thu, 01-Jan-70 00:00:01 GMT"
}},getCookieVal:function(c){var d=document.cookie.indexOf(";",c);
if(d==-1){d=document.cookie.length
}return unescape(document.cookie.substring(c,d))
}};
Ext.handleError=function(b){throw b
};
Ext.Error=function(b){this.message=(this.lang[b])?this.lang[b]:b
};
Ext.Error.prototype=new Error();
Ext.apply(Ext.Error.prototype,{lang:{},name:"Ext.Error",getName:function(){return this.name
},getMessage:function(){return this.message
},toJson:function(){return Ext.encode(this)
}});
var jaaulde=window.jaaulde||{};
jaaulde.utils=jaaulde.utils||{};
jaaulde.utils.flashsniffer=(function(){var c=10;
var b=false;
var a=null;
(function(){var e,d,j;
if(navigator.plugins&&navigator.plugins.length){e=navigator.plugins["Shockwave Flash"];
if(e){if(e.description){d=e.description;
try{a=d.match(/(\d+)\./)[1]
}catch(l){}if(!isNaN(a)){b=true
}}}else{if(navigator.plugins["Shockwave Flash 2.0"]){b=true;
a=2
}}}else{if(navigator.mimeTypes&&navigator.mimeTypes.length){e=navigator.mimeTypes["application/x-shockwave-flash"];
if(e&&e.enabledPlugin){b=true
}}else{for(var g=c;
g>=2;
g--){try{j=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+g);
b=true;
a=g;
break
}catch(k){}}if(!b){try{j=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
b=true;
a=2
}catch(h){}}e=null;
d=null;
j=null;
delete e;
delete d;
delete j
}}})();
return{installed:function(){return !!b
},version:function(){return a
},isLatestVersion:function(){return(!!b&&a==c)
},isVersion:function(d){return(!!b&&a==d)
},meetsMinVersion:function(d){return(!!b&&a!==null&&a>=d)
}}
})();
if(typeof jwplayer=="undefined"){var jwplayer=function(b){if(jwplayer.api){return jwplayer.api.selectPlayer(b)
}};
var $jw=jwplayer;
jwplayer.version="5.10.2295 (Licensed version)";
jwplayer.vid=document.createElement("video");
jwplayer.audio=document.createElement("audio");
jwplayer.source=document.createElement("source");
(function(c){c.utils=function(){};
c.utils.typeOf=function(a){var b=typeof a;
if(b==="object"){if(a){if(a instanceof Array){b="array"
}}else{b="null"
}}return b
};
c.utils.extend=function(){var g=c.utils.extend["arguments"];
if(g.length>1){for(var a=1;
a<g.length;
a++){for(var b in g[a]){g[0][b]=g[a][b]
}}return g[0]
}return null
};
c.utils.clone=function(a){var h;
var g=c.utils.clone["arguments"];
if(g.length==1){switch(c.utils.typeOf(g[0])){case"object":h={};
for(var b in g[0]){h[b]=c.utils.clone(g[0][b])
}break;
case"array":h=[];
for(var b in g[0]){h[b]=c.utils.clone(g[0][b])
}break;
default:return g[0];
break
}}return h
};
c.utils.extension=function(a){if(!a){return""
}a=a.substring(a.lastIndexOf("/")+1,a.length);
a=a.split("?")[0];
if(a.lastIndexOf(".")>-1){return a.substr(a.lastIndexOf(".")+1,a.length).toLowerCase()
}return
};
c.utils.html=function(b,a){b.innerHTML=a
};
c.utils.wrap=function(b,a){if(b.parentNode){b.parentNode.replaceChild(a,b)
}a.appendChild(b)
};
c.utils.ajax=function(a,b,k){var h;
if(window.XMLHttpRequest){h=new XMLHttpRequest()
}else{h=new ActiveXObject("Microsoft.XMLHTTP")
}h.onreadystatechange=function(){if(h.readyState===4){if(h.status===200){if(b){if(!c.utils.exists(h.responseXML)){try{if(window.DOMParser){var g=(new DOMParser()).parseFromString(h.responseText,"text/xml");
if(g){h=c.utils.extend({},h,{responseXML:g})
}}else{g=new ActiveXObject("Microsoft.XMLDOM");
g.async="false";
g.loadXML(h.responseText);
h=c.utils.extend({},h,{responseXML:g})
}}catch(e){if(k){k(a)
}}}b(h)
}}else{if(k){k(a)
}}}};
try{h.open("GET",a,true);
h.send(null)
}catch(j){if(k){k(a)
}}return h
};
c.utils.load=function(b,a,g){b.onreadystatechange=function(){if(b.readyState===4){if(b.status===200){if(a){a()
}}else{if(g){g()
}}}}
};
c.utils.find=function(a,b){return a.getElementsByTagName(b)
};
c.utils.append=function(b,a){b.appendChild(a)
};
c.utils.isIE=function(){return((!+"\v1")||(typeof window.ActiveXObject!="undefined"))
};
c.utils.userAgentMatch=function(a){var b=navigator.userAgent.toLowerCase();
return(b.match(a)!==null)
};
c.utils.isIOS=function(){return c.utils.userAgentMatch(/iP(hone|ad|od)/i)
};
c.utils.isIPad=function(){return c.utils.userAgentMatch(/iPad/i)
};
c.utils.isIPod=function(){return c.utils.userAgentMatch(/iP(hone|od)/i)
};
c.utils.isAndroid=function(){return c.utils.userAgentMatch(/android/i)
};
c.utils.isLegacyAndroid=function(){return c.utils.userAgentMatch(/android 2.[012]/i)
};
c.utils.isBlackberry=function(){return c.utils.userAgentMatch(/blackberry/i)
};
c.utils.isMobile=function(){return c.utils.userAgentMatch(/(iP(hone|ad|od))|android/i)
};
c.utils.getFirstPlaylistItemFromConfig=function(g){var b={};
var a;
if(g.playlist&&g.playlist.length){a=g.playlist[0]
}else{a=g
}b.file=a.file;
b.levels=a.levels;
b.streamer=a.streamer;
b.playlistfile=a.playlistfile;
b.provider=a.provider;
if(!b.provider){if(b.file&&(b.file.toLowerCase().indexOf("youtube.com")>-1||b.file.toLowerCase().indexOf("youtu.be")>-1)){b.provider="youtube"
}if(b.streamer&&b.streamer.toLowerCase().indexOf("rtmp://")==0){b.provider="rtmp"
}if(a.type){b.provider=a.type.toLowerCase()
}}if(b.provider=="audio"){b.provider="sound"
}return b
};
c.utils.getOuterHTML=function(b){if(b.outerHTML){return b.outerHTML
}else{try{return new XMLSerializer().serializeToString(b)
}catch(a){return""
}}};
c.utils.setOuterHTML=function(b,h){if(b.outerHTML){b.outerHTML=h
}else{var a=document.createElement("div");
a.innerHTML=h;
var k=document.createRange();
k.selectNodeContents(a);
var j=k.extractContents();
b.parentNode.insertBefore(j,b);
b.parentNode.removeChild(b)
}};
c.utils.hasFlash=function(){if(typeof navigator.plugins!="undefined"&&typeof navigator.plugins["Shockwave Flash"]!="undefined"){return true
}if(typeof window.ActiveXObject!="undefined"){try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
return true
}catch(a){}}return false
};
c.utils.getPluginName=function(a){if(a.lastIndexOf("/")>=0){a=a.substring(a.lastIndexOf("/")+1,a.length)
}if(a.lastIndexOf("-")>=0){a=a.substring(0,a.lastIndexOf("-"))
}if(a.lastIndexOf(".swf")>=0){a=a.substring(0,a.lastIndexOf(".swf"))
}if(a.lastIndexOf(".js")>=0){a=a.substring(0,a.lastIndexOf(".js"))
}return a
};
c.utils.getPluginVersion=function(a){if(a.lastIndexOf("-")>=0){if(a.lastIndexOf(".js")>=0){return a.substring(a.lastIndexOf("-")+1,a.lastIndexOf(".js"))
}else{if(a.lastIndexOf(".swf")>=0){return a.substring(a.lastIndexOf("-")+1,a.lastIndexOf(".swf"))
}else{return a.substring(a.lastIndexOf("-")+1)
}}}return""
};
c.utils.getAbsolutePath=function(b,l){if(!c.utils.exists(l)){l=document.location.href
}if(!c.utils.exists(b)){return undefined
}if(d(b)){return b
}var a=l.substring(0,l.indexOf("://")+3);
var m=l.substring(a.length,l.indexOf("/",a.length+1));
var p;
if(b.indexOf("/")===0){p=b.split("/")
}else{var o=l.split("?")[0];
o=o.substring(a.length+m.length+1,o.lastIndexOf("/"));
p=o.split("/").concat(b.split("/"))
}var q=[];
for(var n=0;
n<p.length;
n++){if(!p[n]||!c.utils.exists(p[n])||p[n]=="."){continue
}else{if(p[n]==".."){q.pop()
}else{q.push(p[n])
}}}return a+m+"/"+q.join("/")
};
function d(b){if(!c.utils.exists(b)){return
}var a=b.indexOf("://");
var g=b.indexOf("?");
return(a>0&&(g<0||(g>a)))
}c.utils.pluginPathType={ABSOLUTE:"ABSOLUTE",RELATIVE:"RELATIVE",CDN:"CDN"};
c.utils.getPluginPathType=function(g){if(typeof g!="string"){return
}g=g.split("?")[0];
var b=g.indexOf("://");
if(b>0){return c.utils.pluginPathType.ABSOLUTE
}var h=g.indexOf("/");
var a=c.utils.extension(g);
if(b<0&&h<0&&(!a||!isNaN(a))){return c.utils.pluginPathType.CDN
}return c.utils.pluginPathType.RELATIVE
};
c.utils.mapEmpty=function(b){for(var a in b){return false
}return true
};
c.utils.mapLength=function(b){var g=0;
for(var a in b){g++
}return g
};
c.utils.log=function(a,b){if(typeof console!="undefined"&&typeof console.log!="undefined"){if(b){console.log(a,b)
}else{console.log(a)
}}};
c.utils.css=function(j,a,k){if(c.utils.exists(j)){for(var h in a){try{if(typeof a[h]==="undefined"){continue
}else{if(typeof a[h]=="number"&&!(h=="zIndex"||h=="opacity")){if(isNaN(a[h])){continue
}if(h.match(/color/i)){a[h]="#"+c.utils.strings.pad(a[h].toString(16),6)
}else{a[h]=Math.ceil(a[h])+"px"
}}}j.style[h]=a[h]
}catch(b){}}}};
c.utils.isYouTube=function(a){return(a.indexOf("youtube.com")>-1||a.indexOf("youtu.be")>-1)
};
c.utils.transform=function(k,l,m,b,a){if(!c.utils.exists(l)){l=1
}if(!c.utils.exists(m)){m=1
}if(!c.utils.exists(b)){b=0
}if(!c.utils.exists(a)){a=0
}if(l==1&&m==1&&b==0&&a==0){k.style.webkitTransform="";
k.style.MozTransform="";
k.style.OTransform=""
}else{var j="scale("+l+","+m+") translate("+b+"px,"+a+"px)";
k.style.webkitTransform=j;
k.style.MozTransform=j;
k.style.OTransform=j
}};
c.utils.stretch=function(v,a,b,y,s,x){if(typeof b=="undefined"||typeof y=="undefined"||typeof s=="undefined"||typeof x=="undefined"){return
}var B=b/s;
var z=y/x;
var t=0;
var u=0;
var A=false;
var C={};
if(a.parentElement){a.parentElement.style.overflow="hidden"
}c.utils.transform(a);
switch(v.toUpperCase()){case c.utils.stretching.NONE:C.width=s;
C.height=x;
C.top=(y-C.height)/2;
C.left=(b-C.width)/2;
break;
case c.utils.stretching.UNIFORM:if(B>z){C.width=s*z;
C.height=x*z;
if(C.width/b>0.95){A=true;
B=Math.ceil(100*b/C.width)/100;
z=1;
C.width=b
}}else{C.width=s*B;
C.height=x*B;
if(C.height/y>0.95){A=true;
B=1;
z=Math.ceil(100*y/C.height)/100;
C.height=y
}}C.top=(y-C.height)/2;
C.left=(b-C.width)/2;
break;
case c.utils.stretching.FILL:if(B>z){C.width=s*B;
C.height=x*B
}else{C.width=s*z;
C.height=x*z
}C.top=(y-C.height)/2;
C.left=(b-C.width)/2;
break;
case c.utils.stretching.EXACTFIT:C.width=s;
C.height=x;
var r=Math.round((s/2)*(1-1/B));
var w=Math.round((x/2)*(1-1/z));
A=true;
C.top=C.left=0;
break;
default:break
}if(A){c.utils.transform(a,B,z,r,w)
}c.utils.css(a,C)
};
c.utils.stretching={NONE:"NONE",FILL:"FILL",UNIFORM:"UNIFORM",EXACTFIT:"EXACTFIT"};
c.utils.deepReplaceKeyName=function(a,o,q){switch(c.utils.typeOf(a)){case"array":for(var m=0;
m<a.length;
m++){a[m]=c.utils.deepReplaceKeyName(a[m],o,q)
}break;
case"object":for(var n in a){var b,l;
if(o instanceof Array&&q instanceof Array){if(o.length!=q.length){continue
}else{b=o;
l=q
}}else{b=[o];
l=[q]
}var p=n;
for(var m=0;
m<b.length;
m++){p=p.replace(new RegExp(o[m],"g"),q[m])
}a[p]=c.utils.deepReplaceKeyName(a[n],o,q);
if(n!=p){delete a[n]
}}break
}return a
};
c.utils.isInArray=function(a,b){if(!(a)||!(a instanceof Array)){return false
}for(var g=0;
g<a.length;
g++){if(b===a[g]){return true
}}return false
};
c.utils.exists=function(a){switch(typeof(a)){case"string":return(a.length>0);
break;
case"object":return(a!==null);
case"undefined":return false
}return true
};
c.utils.empty=function(a){if(typeof a.hasChildNodes=="function"){while(a.hasChildNodes()){a.removeChild(a.firstChild)
}}};
c.utils.parseDimension=function(a){if(typeof a=="string"){if(a===""){return 0
}else{if(a.lastIndexOf("%")>-1){return a
}else{return parseInt(a.replace("px",""),10)
}}}return a
};
c.utils.getDimensions=function(a){if(a&&a.style){return{x:c.utils.parseDimension(a.style.left),y:c.utils.parseDimension(a.style.top),width:c.utils.parseDimension(a.style.width),height:c.utils.parseDimension(a.style.height)}
}else{return{}
}};
c.utils.getElementWidth=function(a){if(!a){return null
}else{if(a==document.body){return c.utils.parentNode(a).clientWidth
}else{if(a.clientWidth>0){return a.clientWidth
}else{if(a.style){return c.utils.parseDimension(a.style.width)
}else{return null
}}}}};
c.utils.getElementHeight=function(a){if(!a){return null
}else{if(a==document.body){return c.utils.parentNode(a).clientHeight
}else{if(a.clientHeight>0){return a.clientHeight
}else{if(a.style){return c.utils.parseDimension(a.style.height)
}else{return null
}}}}};
c.utils.timeFormat=function(a){str="00:00";
if(a>0){str=Math.floor(a/60)<10?"0"+Math.floor(a/60)+":":Math.floor(a/60)+":";
str+=Math.floor(a%60)<10?"0"+Math.floor(a%60):Math.floor(a%60)
}return str
};
c.utils.useNativeFullscreen=function(){return(navigator&&navigator.vendor&&navigator.vendor.indexOf("Apple")==0)
};
c.utils.parentNode=function(a){if(!a){return document.body
}else{if(a.parentNode){return a.parentNode
}else{if(a.parentElement){return a.parentElement
}else{return a
}}}};
c.utils.getBoundingClientRect=function(a){if(typeof a.getBoundingClientRect=="function"){return a.getBoundingClientRect()
}else{return{left:a.offsetLeft+document.body.scrollLeft,top:a.offsetTop+document.body.scrollTop,width:a.offsetWidth,height:a.offsetHeight}
}};
c.utils.translateEventResponse=function(h,k){var a=c.utils.extend({},k);
if(h==c.api.events.JWPLAYER_FULLSCREEN&&!a.fullscreen){a.fullscreen=a.message=="true"?true:false;
delete a.message
}else{if(typeof a.data=="object"){a=c.utils.extend(a,a.data);
delete a.data
}else{if(typeof a.metadata=="object"){c.utils.deepReplaceKeyName(a.metadata,["__dot__","__spc__","__dsh__"],["."," ","-"])
}}}var j=["position","duration","offset"];
for(var b in j){if(a[j[b]]){a[j[b]]=Math.round(a[j[b]]*1000)/1000
}}return a
};
c.utils.saveCookie=function(b,a){document.cookie="jwplayer."+b+"="+a+"; path=/"
};
c.utils.getCookies=function(){var a={};
var b=document.cookie.split("; ");
for(var g=0;
g<b.length;
g++){var h=b[g].split("=");
if(h[0].indexOf("jwplayer.")==0){a[h[0].substring(9,h[0].length)]=h[1]
}}return a
};
c.utils.readCookie=function(a){return c.utils.getCookies()[a]
}
})(jwplayer);
(function(b){b.events=function(){};
b.events.COMPLETE="COMPLETE";
b.events.ERROR="ERROR"
})(jwplayer);
(function(jwplayer){jwplayer.events.eventdispatcher=function(debug){var _debug=debug;
var _listeners;
var _globallisteners;
this.resetEventListeners=function(){_listeners={};
_globallisteners=[]
};
this.resetEventListeners();
this.addEventListener=function(type,listener,count){try{if(!jwplayer.utils.exists(_listeners[type])){_listeners[type]=[]
}if(typeof(listener)=="string"){eval("listener = "+listener)
}_listeners[type].push({listener:listener,count:count})
}catch(err){jwplayer.utils.log("error",err)
}return false
};
this.removeEventListener=function(type,listener){if(!_listeners[type]){return
}try{for(var listenerIndex=0;
listenerIndex<_listeners[type].length;
listenerIndex++){if(_listeners[type][listenerIndex].listener.toString()==listener.toString()){_listeners[type].splice(listenerIndex,1);
break
}}}catch(err){jwplayer.utils.log("error",err)
}return false
};
this.addGlobalListener=function(listener,count){try{if(typeof(listener)=="string"){eval("listener = "+listener)
}_globallisteners.push({listener:listener,count:count})
}catch(err){jwplayer.utils.log("error",err)
}return false
};
this.removeGlobalListener=function(listener){if(!listener){return
}try{for(var globalListenerIndex=0;
globalListenerIndex<_globallisteners.length;
globalListenerIndex++){if(_globallisteners[globalListenerIndex].listener.toString()==listener.toString()){_globallisteners.splice(globalListenerIndex,1);
break
}}}catch(err){jwplayer.utils.log("error",err)
}return false
};
this.sendEvent=function(type,data){if(!jwplayer.utils.exists(data)){data={}
}if(_debug){jwplayer.utils.log(type,data)
}if(typeof _listeners[type]!="undefined"){for(var listenerIndex=0;
listenerIndex<_listeners[type].length;
listenerIndex++){try{_listeners[type][listenerIndex].listener(data)
}catch(err){jwplayer.utils.log("There was an error while handling a listener: "+err.toString(),_listeners[type][listenerIndex].listener)
}if(_listeners[type][listenerIndex]){if(_listeners[type][listenerIndex].count===1){delete _listeners[type][listenerIndex]
}else{if(_listeners[type][listenerIndex].count>0){_listeners[type][listenerIndex].count=_listeners[type][listenerIndex].count-1
}}}}}for(var globalListenerIndex=0;
globalListenerIndex<_globallisteners.length;
globalListenerIndex++){try{_globallisteners[globalListenerIndex].listener(data)
}catch(err){jwplayer.utils.log("There was an error while handling a listener: "+err.toString(),_globallisteners[globalListenerIndex].listener)
}if(_globallisteners[globalListenerIndex]){if(_globallisteners[globalListenerIndex].count===1){delete _globallisteners[globalListenerIndex]
}else{if(_globallisteners[globalListenerIndex].count>0){_globallisteners[globalListenerIndex].count=_globallisteners[globalListenerIndex].count-1
}}}}}
}
})(jwplayer);
(function(d){var c={};
d.utils.animations=function(){};
d.utils.animations.transform=function(b,a){b.style.webkitTransform=a;
b.style.MozTransform=a;
b.style.OTransform=a;
b.style.msTransform=a
};
d.utils.animations.transformOrigin=function(b,a){b.style.webkitTransformOrigin=a;
b.style.MozTransformOrigin=a;
b.style.OTransformOrigin=a;
b.style.msTransformOrigin=a
};
d.utils.animations.rotate=function(b,a){d.utils.animations.transform(b,["rotate(",a,"deg)"].join(""))
};
d.utils.cancelAnimation=function(a){delete c[a.id]
};
d.utils.fadeTo=function(a,r,s,o,p,t){if(c[a.id]!=t&&d.utils.exists(t)){return
}if(a.style.opacity==r){return
}var u=new Date().getTime();
if(t>u){setTimeout(function(){d.utils.fadeTo(a,r,s,o,0,t)
},t-u)
}if(a.style.display=="none"){a.style.display="block"
}if(!d.utils.exists(o)){o=a.style.opacity===""?1:a.style.opacity
}if(a.style.opacity==r&&a.style.opacity!==""&&d.utils.exists(t)){if(r===0){a.style.display="none"
}return
}if(!d.utils.exists(t)){t=u;
c[a.id]=t
}if(!d.utils.exists(p)){p=0
}var n=(s>0)?((u-t)/(s*1000)):0;
n=n>1?1:n;
var b=r-o;
var q=o+(n*b);
if(q>1){q=1
}else{if(q<0){q=0
}}a.style.opacity=q;
if(p>0){c[a.id]=t+p*1000;
d.utils.fadeTo(a,r,s,o,0,c[a.id]);
return
}setTimeout(function(){d.utils.fadeTo(a,r,s,o,0,t)
},10)
}
})(jwplayer);
(function(b){b.utils.arrays=function(){};
b.utils.arrays.indexOf=function(g,e){for(var a=0;
a<g.length;
a++){if(g[a]==e){return a
}}return -1
};
b.utils.arrays.remove=function(g,e){var a=b.utils.arrays.indexOf(g,e);
if(a>-1){g.splice(a,1)
}}
})(jwplayer);
(function(b){b.utils.extensionmap={"3gp":{html5:"video/3gpp",flash:"video"},"3gpp":{html5:"video/3gpp"},"3g2":{html5:"video/3gpp2",flash:"video"},"3gpp2":{html5:"video/3gpp2"},flv:{flash:"video"},f4a:{html5:"audio/mp4"},f4b:{html5:"audio/mp4",flash:"video"},f4v:{html5:"video/mp4",flash:"video"},mov:{html5:"video/quicktime",flash:"video"},m4a:{html5:"audio/mp4",flash:"video"},m4b:{html5:"audio/mp4"},m4p:{html5:"audio/mp4"},m4v:{html5:"video/mp4",flash:"video"},mp4:{html5:"video/mp4",flash:"video"},rbs:{flash:"sound"},aac:{html5:"audio/aac",flash:"video"},mp3:{html5:"audio/mp3",flash:"sound"},ogg:{html5:"audio/ogg"},oga:{html5:"audio/ogg"},ogv:{html5:"video/ogg"},webm:{html5:"video/webm"},m3u8:{html5:"audio/x-mpegurl"},gif:{flash:"image"},jpeg:{flash:"image"},jpg:{flash:"image"},swf:{flash:"image"},png:{flash:"image"},wav:{html5:"audio/x-wav"}}
})(jwplayer);
(function(o){o.utils.mediaparser=function(){};
var m={element:{width:"width",height:"height",id:"id","class":"className",name:"name"},media:{src:"file",preload:"preload",autoplay:"autostart",loop:"repeat",controls:"controls"},source:{src:"file",type:"type",media:"media","data-jw-width":"width","data-jw-bitrate":"bitrate"},video:{poster:"image"}};
var n={};
o.utils.mediaparser.parseMedia=function(a){return p(a)
};
function q(a,b){if(!o.utils.exists(b)){b=m[a]
}else{o.utils.extend(b,m[a])
}return b
}function p(g,d){if(n[g.tagName.toLowerCase()]&&!o.utils.exists(d)){return n[g.tagName.toLowerCase()](g)
}else{d=q("element",d);
var e={};
for(var c in d){if(c!="length"){var a=g.getAttribute(c);
if(o.utils.exists(a)){e[d[c]]=a
}}}var b=g.style["#background-color"];
if(b&&!(b=="transparent"||b=="rgba(0, 0, 0, 0)")){e.screencolor=b
}return e
}}function l(g,c){c=q("media",c);
var b=[];
var d=o.utils.selectors("source",g);
for(var a in d){if(!isNaN(a)){b.push(k(d[a]))
}}var e=p(g,c);
if(o.utils.exists(e.file)){b[0]={file:e.file}
}e.levels=b;
return e
}function k(a,b){b=q("source",b);
var c=p(a,b);
c.width=c.width?c.width:0;
c.bitrate=c.bitrate?c.bitrate:0;
return c
}function j(a,b){b=q("video",b);
var c=l(a,b);
return c
}n.media=l;
n.audio=l;
n.source=k;
n.video=j
})(jwplayer);
(function(b){b.utils.loaderstatus={NEW:"NEW",LOADING:"LOADING",ERROR:"ERROR",COMPLETE:"COMPLETE"};
b.utils.scriptloader=function(g){var e=b.utils.loaderstatus.NEW;
var a=new b.events.eventdispatcher();
b.utils.extend(this,a);
this.load=function(){if(e==b.utils.loaderstatus.NEW){e=b.utils.loaderstatus.LOADING;
var c=document.createElement("script");
c.onload=function(d){e=b.utils.loaderstatus.COMPLETE;
a.sendEvent(b.events.COMPLETE)
};
c.onerror=function(d){e=b.utils.loaderstatus.ERROR;
a.sendEvent(b.events.ERROR)
};
c.onreadystatechange=function(){if(c.readyState=="loaded"||c.readyState=="complete"){e=b.utils.loaderstatus.COMPLETE;
a.sendEvent(b.events.COMPLETE)
}};
document.getElementsByTagName("head")[0].appendChild(c);
c.src=g
}};
this.getStatus=function(){return e
}
}
})(jwplayer);
(function(b){b.utils.selectors=function(a,g){if(!b.utils.exists(g)){g=document
}a=b.utils.strings.trim(a);
var j=a.charAt(0);
if(j=="#"){return g.getElementById(a.substr(1))
}else{if(j=="."){if(g.getElementsByClassName){return g.getElementsByClassName(a.substr(1))
}else{return b.utils.selectors.getElementsByTagAndClass("*",a.substr(1))
}}else{if(a.indexOf(".")>0){var h=a.split(".");
return b.utils.selectors.getElementsByTagAndClass(h[0],h[1])
}else{return g.getElementsByTagName(a)
}}}return null
};
b.utils.selectors.getElementsByTagAndClass=function(o,l,m){var k=[];
if(!b.utils.exists(m)){m=document
}var n=m.getElementsByTagName(o);
for(var p=0;
p<n.length;
p++){if(b.utils.exists(n[p].className)){var q=n[p].className.split(" ");
for(var a=0;
a<q.length;
a++){if(q[a]==l){k.push(n[p])
}}}}return k
}
})(jwplayer);
(function(b){b.utils.strings=function(){};
b.utils.strings.trim=function(a){return a.replace(/^\s*/,"").replace(/\s*$/,"")
};
b.utils.strings.pad=function(g,e,a){if(!a){a="0"
}while(g.length<e){g=a+g
}return g
};
b.utils.strings.serialize=function(a){if(a==null){return null
}else{if(a=="true"){return true
}else{if(a=="false"){return false
}else{if(isNaN(Number(a))||a.length>5||a.length==0){return a
}else{return Number(a)
}}}}};
b.utils.strings.seconds=function(e){e=e.replace(",",".");
var a=e.split(":");
var g=0;
if(e.substr(-1)=="s"){g=Number(e.substr(0,e.length-1))
}else{if(e.substr(-1)=="m"){g=Number(e.substr(0,e.length-1))*60
}else{if(e.substr(-1)=="h"){g=Number(e.substr(0,e.length-1))*3600
}else{if(a.length>1){g=Number(a[a.length-1]);
g+=Number(a[a.length-2])*60;
if(a.length==3){g+=Number(a[a.length-3])*3600
}}else{g=Number(e)
}}}}return g
};
b.utils.strings.xmlAttribute=function(a,g){for(var e=0;
e<a.attributes.length;
e++){if(a.attributes[e].name&&a.attributes[e].name.toLowerCase()==g.toLowerCase()){return a.attributes[e].value.toString()
}}return""
};
b.utils.strings.jsonToString=function(l){var j=j||{};
if(j&&j.stringify){return j.stringify(l)
}var o=typeof(l);
if(o!="object"||l===null){if(o=="string"){l='"'+l.replace(/"/g,'\\"')+'"'
}else{return String(l)
}}else{var k=[],a=(l&&l.constructor==Array);
for(var n in l){var m=l[n];
switch(typeof(m)){case"string":m='"'+m.replace(/"/g,'\\"')+'"';
break;
case"object":if(b.utils.exists(m)){m=b.utils.strings.jsonToString(m)
}break
}if(a){if(typeof(m)!="function"){k.push(String(m))
}}else{if(typeof(m)!="function"){k.push('"'+n+'":'+String(m))
}}}if(a){return"["+String(k)+"]"
}else{return"{"+String(k)+"}"
}}}
})(jwplayer);
(function(l){var k=new RegExp(/^(#|0x)[0-9a-fA-F]{3,6}/);
l.utils.typechecker=function(a,b){b=!l.utils.exists(b)?g(a):b;
return j(a,b)
};
function g(b){var a=["true","false","t","f"];
if(a.toString().indexOf(b.toLowerCase().replace(" ",""))>=0){return"boolean"
}else{if(k.test(b)){return"color"
}else{if(!isNaN(parseInt(b,10))&&parseInt(b,10).toString().length==b.length){return"integer"
}else{if(!isNaN(parseFloat(b))&&parseFloat(b).toString().length==b.length){return"float"
}}}}return"string"
}function j(a,b){if(!l.utils.exists(b)){return a
}switch(b){case"color":if(a.length>0){return h(a)
}return null;
case"integer":return parseInt(a,10);
case"float":return parseFloat(a);
case"boolean":if(a.toLowerCase()=="true"){return true
}else{if(a=="1"){return true
}}return false
}return a
}function h(a){switch(a.toLowerCase()){case"blue":return parseInt("0000FF",16);
case"green":return parseInt("00FF00",16);
case"red":return parseInt("FF0000",16);
case"cyan":return parseInt("00FFFF",16);
case"magenta":return parseInt("FF00FF",16);
case"yellow":return parseInt("FFFF00",16);
case"black":return parseInt("000000",16);
case"white":return parseInt("FFFFFF",16);
default:a=a.replace(/(#|0x)?([0-9A-F]{3,6})$/gi,"$2");
if(a.length==3){a=a.charAt(0)+a.charAt(0)+a.charAt(1)+a.charAt(1)+a.charAt(2)+a.charAt(2)
}return parseInt(a,16)
}return parseInt("000000",16)
}})(jwplayer);
(function(b){b.utils.parsers=function(){};
b.utils.parsers.localName=function(a){if(!a){return""
}else{if(a.localName){return a.localName
}else{if(a.baseName){return a.baseName
}else{return""
}}}};
b.utils.parsers.textContent=function(a){if(!a){return""
}else{if(a.textContent){return a.textContent
}else{if(a.text){return a.text
}else{return""
}}}}
})(jwplayer);
(function(b){b.utils.parsers.jwparser=function(){};
b.utils.parsers.jwparser.PREFIX="jwplayer";
b.utils.parsers.jwparser.parseEntry=function(g,e){for(var a=0;
a<g.childNodes.length;
a++){if(g.childNodes[a].prefix==b.utils.parsers.jwparser.PREFIX){e[b.utils.parsers.localName(g.childNodes[a])]=b.utils.strings.serialize(b.utils.parsers.textContent(g.childNodes[a]));
if(b.utils.parsers.localName(g.childNodes[a])=="file"&&e.levels){delete e.levels
}}if(!e.file&&String(e.link).toLowerCase().indexOf("youtube")>-1){e.file=e.link
}}return e
};
b.utils.parsers.jwparser.getProvider=function(d){if(d.type){return d.type
}else{if(d.file.indexOf("youtube.com/w")>-1||d.file.indexOf("youtube.com/v")>-1||d.file.indexOf("youtu.be/")>-1){return"youtube"
}else{if(d.streamer&&d.streamer.indexOf("rtmp")==0){return"rtmp"
}else{if(d.streamer&&d.streamer.indexOf("http")==0){return"http"
}else{var a=b.utils.strings.extension(d.file);
if(extensions.hasOwnProperty(a)){return extensions[a]
}}}}}return""
}
})(jwplayer);
(function(b){b.utils.parsers.mediaparser=function(){};
b.utils.parsers.mediaparser.PREFIX="media";
b.utils.parsers.mediaparser.parseGroup=function(j,g){var h=false;
for(var k=0;
k<j.childNodes.length;
k++){if(j.childNodes[k].prefix==b.utils.parsers.mediaparser.PREFIX){if(!b.utils.parsers.localName(j.childNodes[k])){continue
}switch(b.utils.parsers.localName(j.childNodes[k]).toLowerCase()){case"content":if(!h){g.file=b.utils.strings.xmlAttribute(j.childNodes[k],"url")
}if(b.utils.strings.xmlAttribute(j.childNodes[k],"duration")){g.duration=b.utils.strings.seconds(b.utils.strings.xmlAttribute(j.childNodes[k],"duration"))
}if(b.utils.strings.xmlAttribute(j.childNodes[k],"start")){g.start=b.utils.strings.seconds(b.utils.strings.xmlAttribute(j.childNodes[k],"start"))
}if(j.childNodes[k].childNodes&&j.childNodes[k].childNodes.length>0){g=b.utils.parsers.mediaparser.parseGroup(j.childNodes[k],g)
}if(b.utils.strings.xmlAttribute(j.childNodes[k],"width")||b.utils.strings.xmlAttribute(j.childNodes[k],"bitrate")||b.utils.strings.xmlAttribute(j.childNodes[k],"url")){if(!g.levels){g.levels=[]
}g.levels.push({width:b.utils.strings.xmlAttribute(j.childNodes[k],"width"),bitrate:b.utils.strings.xmlAttribute(j.childNodes[k],"bitrate"),file:b.utils.strings.xmlAttribute(j.childNodes[k],"url")})
}break;
case"title":g.title=b.utils.parsers.textContent(j.childNodes[k]);
break;
case"description":g.description=b.utils.parsers.textContent(j.childNodes[k]);
break;
case"keywords":g.tags=b.utils.parsers.textContent(j.childNodes[k]);
break;
case"thumbnail":g.image=b.utils.strings.xmlAttribute(j.childNodes[k],"url");
break;
case"credit":g.author=b.utils.parsers.textContent(j.childNodes[k]);
break;
case"player":var a=j.childNodes[k].url;
if(a.indexOf("youtube.com")>=0||a.indexOf("youtu.be")>=0){h=true;
g.file=b.utils.strings.xmlAttribute(j.childNodes[k],"url")
}break;
case"group":b.utils.parsers.mediaparser.parseGroup(j.childNodes[k],g);
break
}}}return g
}
})(jwplayer);
(function(c){c.utils.parsers.rssparser=function(){};
c.utils.parsers.rssparser.parse=function(a){var h=[];
for(var b=0;
b<a.childNodes.length;
b++){if(c.utils.parsers.localName(a.childNodes[b]).toLowerCase()=="channel"){for(var g=0;
g<a.childNodes[b].childNodes.length;
g++){if(c.utils.parsers.localName(a.childNodes[b].childNodes[g]).toLowerCase()=="item"){h.push(d(a.childNodes[b].childNodes[g]))
}}}}return h
};
function d(b){var a={};
for(var g=0;
g<b.childNodes.length;
g++){if(!c.utils.parsers.localName(b.childNodes[g])){continue
}switch(c.utils.parsers.localName(b.childNodes[g]).toLowerCase()){case"enclosure":a.file=c.utils.strings.xmlAttribute(b.childNodes[g],"url");
break;
case"title":a.title=c.utils.parsers.textContent(b.childNodes[g]);
break;
case"pubdate":a.date=c.utils.parsers.textContent(b.childNodes[g]);
break;
case"description":a.description=c.utils.parsers.textContent(b.childNodes[g]);
break;
case"link":a.link=c.utils.parsers.textContent(b.childNodes[g]);
break;
case"category":if(a.tags){a.tags+=c.utils.parsers.textContent(b.childNodes[g])
}else{a.tags=c.utils.parsers.textContent(b.childNodes[g])
}break
}}a=c.utils.parsers.mediaparser.parseGroup(b,a);
a=c.utils.parsers.jwparser.parseEntry(b,a);
return new c.html5.playlistitem(a)
}})(jwplayer);
(function(e){var g={};
var d={};
e.plugins=function(){};
e.plugins.loadPlugins=function(a,b){d[a]=new e.plugins.pluginloader(new e.plugins.model(g),b);
return d[a]
};
e.plugins.registerPlugin=function(a,c,j){var k=e.utils.getPluginName(a);
if(g[k]){g[k].registerPlugin(a,c,j)
}else{e.utils.log("A plugin ("+a+") was registered with the player that was not loaded. Please check your configuration.");
for(var b in d){d[b].pluginFailed()
}}}
})(jwplayer);
(function(b){b.plugins.model=function(a){this.addPlugin=function(g){var e=b.utils.getPluginName(g);
if(!a[e]){a[e]=new b.plugins.plugin(g)
}return a[e]
}
}
})(jwplayer);
(function(b){b.plugins.pluginmodes={FLASH:"FLASH",JAVASCRIPT:"JAVASCRIPT",HYBRID:"HYBRID"};
b.plugins.plugin=function(u){var s="http://lp.longtailvideo.com";
var n=b.utils.loaderstatus.NEW;
var m;
var o;
var a;
var t=new b.events.eventdispatcher();
b.utils.extend(this,t);
function r(){switch(b.utils.getPluginPathType(u)){case b.utils.pluginPathType.ABSOLUTE:return u;
case b.utils.pluginPathType.RELATIVE:return b.utils.getAbsolutePath(u,window.location.href);
case b.utils.pluginPathType.CDN:var d=b.utils.getPluginName(u);
var e=b.utils.getPluginVersion(u);
var c=(window.location.href.indexOf("https://")==0)?s.replace("http://","https://secure"):s;
return c+"/"+b.version.split(".")[0]+"/"+d+"/"+d+(e!==""?("-"+e):"")+".js"
}}function p(c){a=setTimeout(function(){n=b.utils.loaderstatus.COMPLETE;
t.sendEvent(b.events.COMPLETE)
},1000)
}function q(c){n=b.utils.loaderstatus.ERROR;
t.sendEvent(b.events.ERROR)
}this.load=function(){if(n==b.utils.loaderstatus.NEW){if(u.lastIndexOf(".swf")>0){m=u;
n=b.utils.loaderstatus.COMPLETE;
t.sendEvent(b.events.COMPLETE);
return
}n=b.utils.loaderstatus.LOADING;
var c=new b.utils.scriptloader(r());
c.addEventListener(b.events.COMPLETE,p);
c.addEventListener(b.events.ERROR,q);
c.load()
}};
this.registerPlugin=function(d,e,c){if(a){clearTimeout(a);
a=undefined
}if(e&&c){m=c;
o=e
}else{if(typeof e=="string"){m=e
}else{if(typeof e=="function"){o=e
}else{if(!e&&!c){m=d
}}}}n=b.utils.loaderstatus.COMPLETE;
t.sendEvent(b.events.COMPLETE)
};
this.getStatus=function(){return n
};
this.getPluginName=function(){return b.utils.getPluginName(u)
};
this.getFlashPath=function(){if(m){switch(b.utils.getPluginPathType(m)){case b.utils.pluginPathType.ABSOLUTE:return m;
case b.utils.pluginPathType.RELATIVE:if(u.lastIndexOf(".swf")>0){return b.utils.getAbsolutePath(m,window.location.href)
}return b.utils.getAbsolutePath(m,r());
case b.utils.pluginPathType.CDN:if(m.indexOf("-")>-1){return m+"h"
}return m+"-h"
}}return null
};
this.getJS=function(){return o
};
this.getPluginmode=function(){if(typeof m!="undefined"&&typeof o!="undefined"){return b.plugins.pluginmodes.HYBRID
}else{if(typeof m!="undefined"){return b.plugins.pluginmodes.FLASH
}else{if(typeof o!="undefined"){return b.plugins.pluginmodes.JAVASCRIPT
}}}};
this.getNewInstance=function(e,c,d){return new o(e,c,d)
};
this.getURL=function(){return u
}
}
})(jwplayer);
(function(b){b.plugins.pluginloader=function(m,p){var n={};
var a=b.utils.loaderstatus.NEW;
var q=false;
var s=false;
var r=new b.events.eventdispatcher();
b.utils.extend(this,r);
function o(){if(!s){s=true;
a=b.utils.loaderstatus.COMPLETE;
r.sendEvent(b.events.COMPLETE)
}}function l(){if(!s){var c=0;
for(plugin in n){var d=n[plugin].getStatus();
if(d==b.utils.loaderstatus.LOADING||d==b.utils.loaderstatus.NEW){c++
}}if(c==0){o()
}}}this.setupPlugins=function(t,d,e){var c={length:0,plugins:{}};
var j={length:0,plugins:{}};
for(var k in n){var h=n[k].getPluginName();
if(n[k].getFlashPath()){c.plugins[n[k].getFlashPath()]=d.plugins[k];
c.plugins[n[k].getFlashPath()].pluginmode=n[k].getPluginmode();
c.length++
}if(n[k].getJS()){var g=document.createElement("div");
g.id=t.id+"_"+h;
g.style.position="absolute";
g.style.zIndex=j.length+10;
j.plugins[h]=n[k].getNewInstance(t,d.plugins[k],g);
j.length++;
if(typeof j.plugins[h].resize!="undefined"){t.onReady(e(j.plugins[h],g,true));
t.onResize(e(j.plugins[h],g))
}}}t.plugins=j.plugins;
return c
};
this.load=function(){a=b.utils.loaderstatus.LOADING;
q=true;
for(var c in p){if(b.utils.exists(c)){n[c]=m.addPlugin(c);
n[c].addEventListener(b.events.COMPLETE,l);
n[c].addEventListener(b.events.ERROR,l)
}}for(c in n){n[c].load()
}q=false;
l()
};
this.pluginFailed=function(){o()
};
this.getStatus=function(){return a
}
}
})(jwplayer);
(function(c){var d=[];
c.api=function(F){this.container=F;
this.id=F.id;
var x={};
var H={};
var u={};
var G=[];
var C=undefined;
var z=false;
var B=[];
var a=undefined;
var v=c.utils.getOuterHTML(F);
var I={};
var A={};
this.getBuffer=function(){return this.callInternal("jwGetBuffer")
};
this.getContainer=function(){return this.container
};
function E(e,g){return function(j,k,h,m){if(e.renderingMode=="flash"||e.renderingMode=="html5"){var l;
if(k){A[j]=k;
l="jwplayer('"+e.id+"').callback('"+j+"')"
}else{if(!k&&A[j]){delete A[j]
}}C.jwDockSetButton(j,l,h,m)
}return g
}
}this.getPlugin=function(h){var e=this;
var g={};
if(h=="dock"){return c.utils.extend(g,{setButton:E(e,g),show:function(){e.callInternal("jwDockShow");
return g
},hide:function(){e.callInternal("jwDockHide");
return g
},onShow:function(j){e.componentListener("dock",c.api.events.JWPLAYER_COMPONENT_SHOW,j);
return g
},onHide:function(j){e.componentListener("dock",c.api.events.JWPLAYER_COMPONENT_HIDE,j);
return g
}})
}else{if(h=="controlbar"){return c.utils.extend(g,{show:function(){e.callInternal("jwControlbarShow");
return g
},hide:function(){e.callInternal("jwControlbarHide");
return g
},onShow:function(j){e.componentListener("controlbar",c.api.events.JWPLAYER_COMPONENT_SHOW,j);
return g
},onHide:function(j){e.componentListener("controlbar",c.api.events.JWPLAYER_COMPONENT_HIDE,j);
return g
}})
}else{if(h=="display"){return c.utils.extend(g,{show:function(){e.callInternal("jwDisplayShow");
return g
},hide:function(){e.callInternal("jwDisplayHide");
return g
},onShow:function(j){e.componentListener("display",c.api.events.JWPLAYER_COMPONENT_SHOW,j);
return g
},onHide:function(j){e.componentListener("display",c.api.events.JWPLAYER_COMPONENT_HIDE,j);
return g
}})
}else{return this.plugins[h]
}}}};
this.callback=function(e){if(A[e]){return A[e]()
}};
this.getDuration=function(){return this.callInternal("jwGetDuration")
};
this.getFullscreen=function(){return this.callInternal("jwGetFullscreen")
};
this.getHeight=function(){return this.callInternal("jwGetHeight")
};
this.getLockState=function(){return this.callInternal("jwGetLockState")
};
this.getMeta=function(){return this.getItemMeta()
};
this.getMute=function(){return this.callInternal("jwGetMute")
};
this.getPlaylist=function(){var e=this.callInternal("jwGetPlaylist");
if(this.renderingMode=="flash"){c.utils.deepReplaceKeyName(e,["__dot__","__spc__","__dsh__"],["."," ","-"])
}for(var g=0;
g<e.length;
g++){if(!c.utils.exists(e[g].index)){e[g].index=g
}}return e
};
this.getPlaylistItem=function(e){if(!c.utils.exists(e)){e=this.getCurrentItem()
}return this.getPlaylist()[e]
};
this.getPosition=function(){return this.callInternal("jwGetPosition")
};
this.getRenderingMode=function(){return this.renderingMode
};
this.getState=function(){return this.callInternal("jwGetState")
};
this.getVolume=function(){return this.callInternal("jwGetVolume")
};
this.getWidth=function(){return this.callInternal("jwGetWidth")
};
this.setFullscreen=function(e){if(!c.utils.exists(e)){this.callInternal("jwSetFullscreen",!this.callInternal("jwGetFullscreen"))
}else{this.callInternal("jwSetFullscreen",e)
}return this
};
this.setMute=function(e){if(!c.utils.exists(e)){this.callInternal("jwSetMute",!this.callInternal("jwGetMute"))
}else{this.callInternal("jwSetMute",e)
}return this
};
this.lock=function(){return this
};
this.unlock=function(){return this
};
this.load=function(e){this.callInternal("jwLoad",e);
return this
};
this.playlistItem=function(e){this.callInternal("jwPlaylistItem",e);
return this
};
this.playlistPrev=function(){this.callInternal("jwPlaylistPrev");
return this
};
this.playlistNext=function(){this.callInternal("jwPlaylistNext");
return this
};
this.resize=function(g,h){if(this.renderingMode=="html5"){C.jwResize(g,h)
}else{this.container.width=g;
this.container.height=h;
var e=document.getElementById(this.id+"_wrapper");
if(e){e.style.width=g+"px";
e.style.height=h+"px"
}}return this
};
this.play=function(e){if(typeof e=="undefined"){e=this.getState();
if(e==c.api.events.state.PLAYING||e==c.api.events.state.BUFFERING){this.callInternal("jwPause")
}else{this.callInternal("jwPlay")
}}else{this.callInternal("jwPlay",e)
}return this
};
this.pause=function(e){if(typeof e=="undefined"){e=this.getState();
if(e==c.api.events.state.PLAYING||e==c.api.events.state.BUFFERING){this.callInternal("jwPause")
}else{this.callInternal("jwPlay")
}}else{this.callInternal("jwPause",e)
}return this
};
this.stop=function(){this.callInternal("jwStop");
return this
};
this.seek=function(e){this.callInternal("jwSeek",e);
return this
};
this.setVolume=function(e){this.callInternal("jwSetVolume",e);
return this
};
this.loadInstream=function(e,g){a=new c.api.instream(this,C,e,g);
return a
};
this.onBufferChange=function(e){return this.eventListener(c.api.events.JWPLAYER_MEDIA_BUFFER,e)
};
this.onBufferFull=function(e){return this.eventListener(c.api.events.JWPLAYER_MEDIA_BUFFER_FULL,e)
};
this.onError=function(e){return this.eventListener(c.api.events.JWPLAYER_ERROR,e)
};
this.onFullscreen=function(e){return this.eventListener(c.api.events.JWPLAYER_FULLSCREEN,e)
};
this.onMeta=function(e){return this.eventListener(c.api.events.JWPLAYER_MEDIA_META,e)
};
this.onMute=function(e){return this.eventListener(c.api.events.JWPLAYER_MEDIA_MUTE,e)
};
this.onPlaylist=function(e){return this.eventListener(c.api.events.JWPLAYER_PLAYLIST_LOADED,e)
};
this.onPlaylistItem=function(e){return this.eventListener(c.api.events.JWPLAYER_PLAYLIST_ITEM,e)
};
this.onReady=function(e){return this.eventListener(c.api.events.API_READY,e)
};
this.onResize=function(e){return this.eventListener(c.api.events.JWPLAYER_RESIZE,e)
};
this.onComplete=function(e){return this.eventListener(c.api.events.JWPLAYER_MEDIA_COMPLETE,e)
};
this.onSeek=function(e){return this.eventListener(c.api.events.JWPLAYER_MEDIA_SEEK,e)
};
this.onTime=function(e){return this.eventListener(c.api.events.JWPLAYER_MEDIA_TIME,e)
};
this.onVolume=function(e){return this.eventListener(c.api.events.JWPLAYER_MEDIA_VOLUME,e)
};
this.onBeforePlay=function(e){return this.eventListener(c.api.events.JWPLAYER_MEDIA_BEFOREPLAY,e)
};
this.onBeforeComplete=function(e){return this.eventListener(c.api.events.JWPLAYER_MEDIA_BEFORECOMPLETE,e)
};
this.onBuffer=function(e){return this.stateListener(c.api.events.state.BUFFERING,e)
};
this.onPause=function(e){return this.stateListener(c.api.events.state.PAUSED,e)
};
this.onPlay=function(e){return this.stateListener(c.api.events.state.PLAYING,e)
};
this.onIdle=function(e){return this.stateListener(c.api.events.state.IDLE,e)
};
this.remove=function(){if(!z){throw"Cannot call remove() before player is ready";
return
}b(this)
};
function b(e){B=[];
if(c.utils.getOuterHTML(e.container)!=v){c.api.destroyPlayer(e.id,v)
}}this.setup=function(g){if(c.embed){var h=this.id;
b(this);
var e=c(h);
e.config=g;
return new c.embed(e)
}return this
};
this.registerPlugin=function(e,g,h){c.plugins.registerPlugin(e,g,h)
};
this.setPlayer=function(g,e){C=g;
this.renderingMode=e
};
this.stateListener=function(g,e){if(!H[g]){H[g]=[];
this.eventListener(c.api.events.JWPLAYER_PLAYER_STATE,D(g))
}H[g].push(e);
return this
};
this.detachMedia=function(){if(this.renderingMode=="html5"){return this.callInternal("jwDetachMedia")
}};
this.attachMedia=function(){if(this.renderingMode=="html5"){return this.callInternal("jwAttachMedia")
}};
function D(e){return function(h){var j=h.newstate,l=h.oldstate;
if(j==e){var g=H[j];
if(g){for(var k=0;
k<g.length;
k++){if(typeof g[k]=="function"){g[k].call(this,{oldstate:l,newstate:j})
}}}}}
}this.componentListener=function(h,g,e){if(!u[h]){u[h]={}
}if(!u[h][g]){u[h][g]=[];
this.eventListener(g,y(h,g))
}u[h][g].push(e);
return this
};
function y(g,e){return function(h){if(g==h.component){var j=u[g][e];
if(j){for(var k=0;
k<j.length;
k++){if(typeof j[k]=="function"){j[k].call(this,h)
}}}}}
}this.addInternalListener=function(h,g){try{h.jwAddEventListener(g,'function(dat) { jwplayer("'+this.id+'").dispatchEvent("'+g+'", dat); }')
}catch(e){c.utils.log("Could not add internal listener")
}};
this.eventListener=function(g,e){if(!x[g]){x[g]=[];
if(C&&z){this.addInternalListener(C,g)
}}x[g].push(e);
return this
};
this.dispatchEvent=function(e){if(x[e]){var g=_utils.translateEventResponse(e,arguments[1]);
for(var h=0;
h<x[e].length;
h++){if(typeof x[e][h]=="function"){x[e][h].call(this,g)
}}}};
this.dispatchInstreamEvent=function(e){if(a){a.dispatchEvent(e,arguments)
}};
this.callInternal=function(){if(z){var e=arguments[0],h=[];
for(var g=1;
g<arguments.length;
g++){h.push(arguments[g])
}if(typeof C!="undefined"&&typeof C[e]=="function"){if(h.length==2){return(C[e])(h[0],h[1])
}else{if(h.length==1){return(C[e])(h[0])
}else{return(C[e])()
}}}return null
}else{B.push(arguments)
}};
this.playerReady=function(e){z=true;
if(!C){this.setPlayer(document.getElementById(e.id))
}this.container=document.getElementById(this.id);
for(var g in x){this.addInternalListener(C,g)
}this.eventListener(c.api.events.JWPLAYER_PLAYLIST_ITEM,function(h){I={}
});
this.eventListener(c.api.events.JWPLAYER_MEDIA_META,function(h){c.utils.extend(I,h.metadata)
});
this.dispatchEvent(c.api.events.API_READY);
while(B.length>0){this.callInternal.apply(this,B.shift())
}};
this.getItemMeta=function(){return I
};
this.getCurrentItem=function(){return this.callInternal("jwGetPlaylistIndex")
};
function w(g,k,e){var j=[];
if(!k){k=0
}if(!e){e=g.length-1
}for(var h=k;
h<=e;
h++){j.push(g[h])
}return j
}return this
};
c.api.selectPlayer=function(b){var g;
if(!c.utils.exists(b)){b=0
}if(b.nodeType){g=b
}else{if(typeof b=="string"){g=document.getElementById(b)
}}if(g){var a=c.api.playerById(g.id);
if(a){return a
}else{return c.api.addPlayer(new c.api(g))
}}else{if(typeof b=="number"){return c.getPlayers()[b]
}}return null
};
c.api.events={API_READY:"jwplayerAPIReady",JWPLAYER_READY:"jwplayerReady",JWPLAYER_FULLSCREEN:"jwplayerFullscreen",JWPLAYER_RESIZE:"jwplayerResize",JWPLAYER_ERROR:"jwplayerError",JWPLAYER_MEDIA_BEFOREPLAY:"jwplayerMediaBeforePlay",JWPLAYER_MEDIA_BEFORECOMPLETE:"jwplayerMediaBeforeComplete",JWPLAYER_COMPONENT_SHOW:"jwplayerComponentShow",JWPLAYER_COMPONENT_HIDE:"jwplayerComponentHide",JWPLAYER_MEDIA_BUFFER:"jwplayerMediaBuffer",JWPLAYER_MEDIA_BUFFER_FULL:"jwplayerMediaBufferFull",JWPLAYER_MEDIA_ERROR:"jwplayerMediaError",JWPLAYER_MEDIA_LOADED:"jwplayerMediaLoaded",JWPLAYER_MEDIA_COMPLETE:"jwplayerMediaComplete",JWPLAYER_MEDIA_SEEK:"jwplayerMediaSeek",JWPLAYER_MEDIA_TIME:"jwplayerMediaTime",JWPLAYER_MEDIA_VOLUME:"jwplayerMediaVolume",JWPLAYER_MEDIA_META:"jwplayerMediaMeta",JWPLAYER_MEDIA_MUTE:"jwplayerMediaMute",JWPLAYER_PLAYER_STATE:"jwplayerPlayerState",JWPLAYER_PLAYLIST_LOADED:"jwplayerPlaylistLoaded",JWPLAYER_PLAYLIST_ITEM:"jwplayerPlaylistItem",JWPLAYER_INSTREAM_CLICK:"jwplayerInstreamClicked",JWPLAYER_INSTREAM_DESTROYED:"jwplayerInstreamDestroyed"};
c.api.events.state={BUFFERING:"BUFFERING",IDLE:"IDLE",PAUSED:"PAUSED",PLAYING:"PLAYING"};
c.api.playerById=function(a){for(var b=0;
b<d.length;
b++){if(d[b].id==a){return d[b]
}}return null
};
c.api.addPlayer=function(b){for(var a=0;
a<d.length;
a++){if(d[a]==b){return b
}}d.push(b);
return b
};
c.api.destroyPlayer=function(m,p){var n=-1;
for(var a=0;
a<d.length;
a++){if(d[a].id==m){n=a;
continue
}}if(n>=0){try{d[n].callInternal("jwDestroy")
}catch(b){}var q=document.getElementById(d[n].id);
if(document.getElementById(d[n].id+"_wrapper")){q=document.getElementById(d[n].id+"_wrapper")
}if(q){if(p){c.utils.setOuterHTML(q,p)
}else{var e=document.createElement("div");
var o=q.id;
if(q.id.indexOf("_wrapper")==q.id.length-8){newID=q.id.substring(0,q.id.length-8)
}e.setAttribute("id",o);
q.parentNode.replaceChild(e,q)
}}d.splice(n,1)
}return null
};
c.getPlayers=function(){return d.slice(0)
}
})(jwplayer);
var _userPlayerReady=(typeof playerReady=="function")?playerReady:undefined;
playerReady=function(c){var d=jwplayer.api.playerById(c.id);
if(d){d.playerReady(c)
}else{jwplayer.api.selectPlayer(c.id).playerReady(c)
}if(_userPlayerReady){_userPlayerReady.call(this,c)
}};
(function(b){b.api.instream=function(D,x,t,a){var y=D;
var E=x;
var z=t;
var w=a;
var B={};
var r={};
function A(){y.callInternal("jwLoadInstream",t,a)
}function u(d,c){E.jwInstreamAddEventListener(c,'function(dat) { jwplayer("'+y.id+'").dispatchInstreamEvent("'+c+'", dat); }')
}function C(d,c){if(!B[d]){B[d]=[];
u(E,d)
}B[d].push(c);
return this
}function s(d,c){if(!r[d]){r[d]=[];
C(b.api.events.JWPLAYER_PLAYER_STATE,v(d))
}r[d].push(c);
return this
}function v(c){return function(h){var j=h.newstate,e=h.oldstate;
if(j==c){var g=r[j];
if(g){for(var d=0;
d<g.length;
d++){if(typeof g[d]=="function"){g[d].call(this,{oldstate:e,newstate:j,type:h.type})
}}}}}
}this.dispatchEvent=function(c,d){if(B[c]){var e=_utils.translateEventResponse(c,d[1]);
for(var g=0;
g<B[c].length;
g++){if(typeof B[c][g]=="function"){B[c][g].call(this,e)
}}}};
this.onError=function(c){return C(b.api.events.JWPLAYER_ERROR,c)
};
this.onFullscreen=function(c){return C(b.api.events.JWPLAYER_FULLSCREEN,c)
};
this.onMeta=function(c){return C(b.api.events.JWPLAYER_MEDIA_META,c)
};
this.onMute=function(c){return C(b.api.events.JWPLAYER_MEDIA_MUTE,c)
};
this.onComplete=function(c){return C(b.api.events.JWPLAYER_MEDIA_COMPLETE,c)
};
this.onSeek=function(c){return C(b.api.events.JWPLAYER_MEDIA_SEEK,c)
};
this.onTime=function(c){return C(b.api.events.JWPLAYER_MEDIA_TIME,c)
};
this.onVolume=function(c){return C(b.api.events.JWPLAYER_MEDIA_VOLUME,c)
};
this.onBuffer=function(c){return s(b.api.events.state.BUFFERING,c)
};
this.onPause=function(c){return s(b.api.events.state.PAUSED,c)
};
this.onPlay=function(c){return s(b.api.events.state.PLAYING,c)
};
this.onIdle=function(c){return s(b.api.events.state.IDLE,c)
};
this.onInstreamClick=function(c){return C(b.api.events.JWPLAYER_INSTREAM_CLICK,c)
};
this.onInstreamDestroyed=function(c){return C(b.api.events.JWPLAYER_INSTREAM_DESTROYED,c)
};
this.play=function(c){E.jwInstreamPlay(c)
};
this.pause=function(c){E.jwInstreamPause(c)
};
this.seek=function(c){E.jwInstreamSeek(c)
};
this.destroy=function(){E.jwInstreamDestroy()
};
this.getState=function(){return E.jwInstreamGetState()
};
this.getDuration=function(){return E.jwInstreamGetDuration()
};
this.getPosition=function(){return E.jwInstreamGetPosition()
};
A()
}
})(jwplayer);
(function(e){var g=e.utils;
e.embed=function(c){var a={width:400,height:300,components:{controlbar:{position:"over"}}};
var l=g.mediaparser.parseMedia(c.container);
var m=new e.embed.config(g.extend(a,l,c.config),this);
var b=e.plugins.loadPlugins(c.id,m.plugins);
function o(k,h){for(var j in h){if(typeof k[j]=="function"){(k[j]).call(k,h[j])
}}}function n(){if(b.getStatus()==g.loaderstatus.COMPLETE){for(var v=0;
v<m.modes.length;
v++){if(m.modes[v].type&&e.embed[m.modes[v].type]){var k=m.modes[v].config;
var y=m;
if(k){y=g.extend(g.clone(m),k);
var z=["file","levels","playlist"];
for(var w=0;
w<z.length;
w++){var j=z[w];
if(g.exists(k[j])){for(var x=0;
x<z.length;
x++){if(x!=w){var u=z[x];
if(g.exists(y[u])&&!g.exists(k[u])){delete y[u]
}}}}}}var h=new e.embed[m.modes[v].type](document.getElementById(c.id),m.modes[v],y,b,c);
if(h.supportsConfig()){h.embed();
o(c,m.events);
return c
}}}g.log("No suitable players found");
new e.embed.logo(g.extend({hide:true},m.components.logo),"none",c.id)
}}b.addEventListener(e.events.COMPLETE,n);
b.addEventListener(e.events.ERROR,n);
b.load();
return c
};
function d(){if(!document.body){return setTimeout(d,15)
}var c=g.selectors.getElementsByTagAndClass("video","jwplayer");
for(var b=0;
b<c.length;
b++){var a=c[b];
if(a.id==""){a.id="jwplayer_"+Math.round(Math.random()*100000)
}e(a.id).setup({})
}}d()
})(jwplayer);
(function(q){var l=q.utils;
function n(a){var b=[{type:"flash",src:a?a:"/jwplayer/player.swf"},{type:"html5"},{type:"download"}];
if(l.isAndroid()){b[0]=b.splice(1,1,b[0])[0]
}return b
}var u={players:"modes",autoplay:"autostart"};
function t(c){var d=c.toLowerCase();
var a=["left","right","top","bottom"];
for(var b=0;
b<a.length;
b++){if(d==a[b]){return true
}}return false
}function s(a){var b=false;
b=(a instanceof Array)||(typeof a=="object"&&!a.position&&!a.size);
return b
}function m(a){if(typeof a=="string"){if(parseInt(a).toString()==a||a.toLowerCase().indexOf("px")>-1){return parseInt(a)
}}return a
}var o=["playlist","dock","controlbar","logo","display"];
function p(b){var d={};
switch(l.typeOf(b.plugins)){case"object":for(var e in b.plugins){d[l.getPluginName(e)]=e
}break;
case"string":var c=b.plugins.split(",");
for(var a=0;
a<c.length;
a++){d[l.getPluginName(c[a])]=c[a]
}break
}return d
}function r(d,e,g,b){if(l.typeOf(d[e])!="object"){d[e]={}
}var a=d[e][g];
if(l.typeOf(a)!="object"){d[e][g]=a={}
}if(b){if(e=="plugins"){var c=l.getPluginName(g);
a[b]=d[c+"."+b];
delete d[c+"."+b]
}else{a[b]=d[g+"."+b];
delete d[g+"."+b]
}}}q.embed.deserialize=function(a){var g=p(a);
for(var b in g){r(a,"plugins",g[b])
}for(var c in a){if(c.indexOf(".")>-1){var d=c.split(".");
var e=d[0];
var c=d[1];
if(l.isInArray(o,e)){r(a,"components",e,c)
}else{if(g[e]){r(a,"plugins",g[e],c)
}}}}return a
};
q.embed.config=function(h,j){var k=l.extend({},h);
var x;
if(s(k.playlist)){x=k.playlist;
delete k.playlist
}k=q.embed.deserialize(k);
k.height=m(k.height);
k.width=m(k.width);
if(typeof k.plugins=="string"){var g=k.plugins.split(",");
if(typeof k.plugins!="object"){k.plugins={}
}for(var b=0;
b<g.length;
b++){var a=l.getPluginName(g[b]);
if(typeof k[a]=="object"){k.plugins[g[b]]=k[a];
delete k[a]
}else{k.plugins[g[b]]={}
}}}for(var w=0;
w<o.length;
w++){var c=o[w];
if(l.exists(k[c])){if(typeof k[c]!="object"){if(!k.components[c]){k.components[c]={}
}if(c=="logo"){k.components[c].file=k[c]
}else{k.components[c].position=k[c]
}delete k[c]
}else{if(!k.components[c]){k.components[c]={}
}l.extend(k.components[c],k[c]);
delete k[c]
}}if(typeof k[c+"size"]!="undefined"){if(!k.components[c]){k.components[c]={}
}k.components[c].size=k[c+"size"];
delete k[c+"size"]
}}if(typeof k.icons!="undefined"){if(!k.components.display){k.components.display={}
}k.components.display.icons=k.icons;
delete k.icons
}for(var d in u){if(k[d]){if(!k[u[d]]){k[u[d]]=k[d]
}delete k[d]
}}var e;
if(k.flashplayer&&!k.modes){e=n(k.flashplayer);
delete k.flashplayer
}else{if(k.modes){if(typeof k.modes=="string"){e=n(k.modes)
}else{if(k.modes instanceof Array){e=k.modes
}else{if(typeof k.modes=="object"&&k.modes.type){e=[k.modes]
}}}delete k.modes
}else{e=n()
}}k.modes=e;
if(x){k.playlist=x
}return k
}
})(jwplayer);
(function(b){b.embed.download=function(m,h,a,l,j){this.embed=function(){var y=b.utils.extend({},a);
var d={};
var z=a.width?a.width:480;
if(typeof z!="number"){z=parseInt(z,10)
}var w=a.height?a.height:320;
if(typeof w!="number"){w=parseInt(w,10)
}var B,g,v;
var D={};
if(a.playlist&&a.playlist.length){D.file=a.playlist[0].file;
g=a.playlist[0].image;
D.levels=a.playlist[0].levels
}else{D.file=a.file;
g=a.image;
D.levels=a.levels
}if(D.file){B=D.file
}else{if(D.levels&&D.levels.length){B=D.levels[0].file
}}v=B?"pointer":"auto";
var x={display:{style:{cursor:v,width:z,height:w,backgroundColor:"#000",position:"relative",textDecoration:"none",border:"none",display:"block"}},display_icon:{style:{cursor:v,position:"absolute",display:B?"block":"none",top:0,left:0,border:0,margin:0,padding:0,zIndex:3,width:50,height:50,backgroundImage:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALdJREFUeNrs18ENgjAYhmFouDOCcQJGcARHgE10BDcgTOIosAGwQOuPwaQeuFRi2p/3Sb6EC5L3QCxZBgAAAOCorLW1zMn65TrlkH4NcV7QNcUQt7Gn7KIhxA+qNIR81spOGkL8oFJDyLJRdosqKDDkK+iX5+d7huzwM40xptMQMkjIOeRGo+VkEVvIPfTGIpKASfYIfT9iCHkHrBEzf4gcUQ56aEzuGK/mw0rHpy4AAACAf3kJMACBxjAQNRckhwAAAABJRU5ErkJggg==)"}},display_iconBackground:{style:{cursor:v,position:"absolute",display:B?"block":"none",top:((w-50)/2),left:((z-50)/2),border:0,width:50,height:50,margin:0,padding:0,zIndex:2,backgroundImage:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEpJREFUeNrszwENADAIA7DhX8ENoBMZ5KR10EryckCJiIiIiIiIiIiIiIiIiIiIiIh8GmkRERERERERERERERERERERERGRHSPAAPlXH1phYpYaAAAAAElFTkSuQmCC)"}},display_image:{style:{width:z,height:w,display:g?"block":"none",position:"absolute",cursor:v,left:0,top:0,margin:0,padding:0,textDecoration:"none",zIndex:1,border:"none"}}};
var A=function(p,n,q){var o=document.createElement(p);
if(q){o.id=q
}else{o.id=m.id+"_jwplayer_"+n
}b.utils.css(o,x[n].style);
return o
};
d.display=A("a","display",m.id);
if(B){d.display.setAttribute("href",b.utils.getAbsolutePath(B))
}d.display_image=A("img","display_image");
d.display_image.setAttribute("alt","Click to download...");
if(g){d.display_image.setAttribute("src",b.utils.getAbsolutePath(g))
}if(true){d.display_icon=A("div","display_icon");
d.display_iconBackground=A("div","display_iconBackground");
d.display.appendChild(d.display_image);
d.display_iconBackground.appendChild(d.display_icon);
d.display.appendChild(d.display_iconBackground)
}_css=b.utils.css;
_hide=function(n){_css(n,{display:"none"})
};
function c(n){_imageWidth=d.display_image.naturalWidth;
_imageHeight=d.display_image.naturalHeight;
C()
}function C(){b.utils.stretch(b.utils.stretching.UNIFORM,d.display_image,z,w,_imageWidth,_imageHeight)
}d.display_image.onerror=function(n){_hide(d.display_image)
};
d.display_image.onload=c;
m.parentNode.replaceChild(d.display,m);
var e=(a.plugins&&a.plugins.logo)?a.plugins.logo:{};
d.display.appendChild(new b.embed.logo(a.components.logo,"download",m.id));
j.container=document.getElementById(j.id);
j.setPlayer(d.display,"download")
};
this.supportsConfig=function(){if(a){var c=b.utils.getFirstPlaylistItemFromConfig(a);
if(typeof c.file=="undefined"&&typeof c.levels=="undefined"){return true
}else{if(c.file){return k(c.file,c.provider,c.playlistfile)
}else{if(c.levels&&c.levels.length){for(var d=0;
d<c.levels.length;
d++){if(c.levels[d].file&&k(c.levels[d].file,c.provider,c.playlistfile)){return true
}}}}}}else{return true
}};
function k(g,d,n){if(n){return false
}var e=["image","sound","youtube","http"];
if(d&&(e.toString().indexOf(d)>-1)){return true
}if(!d||(d&&d=="video")){var c=b.utils.extension(g);
if(c&&b.utils.extensionmap[c]){return true
}}return false
}}
})(jwplayer);
(function(b){b.embed.flash=function(s,r,n,t,p){function a(e,g,d){var c=document.createElement("param");
c.setAttribute("name",g);
c.setAttribute("value",d);
e.appendChild(c)
}function o(d,c,e){return function(j){if(e){document.getElementById(p.id+"_wrapper").appendChild(c)
}var g=document.getElementById(p.id).getPluginConfig("display");
d.resize(g.width,g.height);
var h={left:g.x,top:g.y};
b.utils.css(c,h)
}
}function u(e){if(!e){return{}
}var c={};
for(var g in e){var h=e[g];
for(var d in h){c[g+"."+d]=h[d]
}}return c
}function q(e,g){if(e[g]){var c=e[g];
for(var h in c){var j=c[h];
if(typeof j=="string"){if(!e[h]){e[h]=j
}}else{for(var d in j){if(!e[h+"."+d]){e[h+"."+d]=j[d]
}}}}delete e[g]
}}function w(g){if(!g){return{}
}var c={},d=[];
for(var k in g){var h=b.utils.getPluginName(k);
var j=g[k];
d.push(k);
for(var e in j){c[h+"."+e]=j[e]
}}c.plugins=d.join(",");
return c
}function v(c){var e=c.netstreambasepath?"":"netstreambasepath="+encodeURIComponent(window.location.href.split("#")[0])+"&";
for(var d in c){if(typeof(c[d])=="object"){e+=d+"="+encodeURIComponent("[[JSON]]"+b.utils.strings.jsonToString(c[d]))+"&"
}else{e+=d+"="+encodeURIComponent(c[d])+"&"
}}return e.substring(0,e.length-1)
}this.embed=function(){n.id=p.id;
var h;
var c=b.utils.extend({},n);
var g=c.width;
var l=c.height;
if(s.id+"_wrapper"==s.parentNode.id){h=document.getElementById(s.id+"_wrapper")
}else{h=document.createElement("div");
h.id=s.id+"_wrapper";
b.utils.wrap(s,h);
b.utils.css(h,{position:"relative",width:g,height:l})
}var e=t.setupPlugins(p,c,o);
if(e.length>0){b.utils.extend(c,w(e.plugins))
}else{delete c.plugins
}var F=["height","width","modes","events"];
for(var C=0;
C<F.length;
C++){delete c[F[C]]
}var d="opaque";
if(c.wmode){d=c.wmode
}q(c,"components");
q(c,"providers");
if(typeof c["dock.position"]!="undefined"){if(c["dock.position"].toString().toLowerCase()=="false"){c.dock=c["dock.position"];
delete c["dock.position"]
}}var m=b.utils.getCookies();
for(var j in m){if(typeof(c[j])=="undefined"){c[j]=m[j]
}}var k="#000000";
var D;
if(b.utils.isIE()){var B='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" bgcolor="'+k+'" width="100%" height="100%" id="'+s.id+'" name="'+s.id+'" tabindex=0"">';
B+='<param name="movie" value="'+r.src+'">';
B+='<param name="allowfullscreen" value="true">';
B+='<param name="allowscriptaccess" value="always">';
B+='<param name="seamlesstabbing" value="true">';
B+='<param name="wmode" value="'+d+'">';
B+='<param name="flashvars" value="'+v(c)+'">';
B+="</object>";
b.utils.setOuterHTML(s,B);
D=document.getElementById(s.id)
}else{var E=document.createElement("object");
E.setAttribute("type","application/x-shockwave-flash");
E.setAttribute("data",r.src);
E.setAttribute("width","100%");
E.setAttribute("height","100%");
E.setAttribute("bgcolor","#000000");
E.setAttribute("id",s.id);
E.setAttribute("name",s.id);
E.setAttribute("tabindex",0);
a(E,"allowfullscreen","true");
a(E,"allowscriptaccess","always");
a(E,"seamlesstabbing","true");
a(E,"wmode",d);
a(E,"flashvars",v(c));
s.parentNode.replaceChild(E,s);
D=E
}p.container=D;
p.setPlayer(D,"flash")
};
this.supportsConfig=function(){if(b.utils.hasFlash()){if(n){var c=b.utils.getFirstPlaylistItemFromConfig(n);
if(typeof c.file=="undefined"&&typeof c.levels=="undefined"){return true
}else{if(c.file){return flashCanPlay(c.file,c.provider)
}else{if(c.levels&&c.levels.length){for(var d=0;
d<c.levels.length;
d++){if(c.levels[d].file&&flashCanPlay(c.levels[d].file,c.provider)){return true
}}}}}}else{return true
}}return false
};
flashCanPlay=function(g,d){var e=["video","http","sound","image"];
if(d&&(e.toString().indexOf(d)<0)){return true
}var c=b.utils.extension(g);
if(!c){return true
}if(b.utils.exists(b.utils.extensionmap[c])&&!b.utils.exists(b.utils.extensionmap[c].flash)){return false
}return true
}
}
})(jwplayer);
(function(b){b.embed.html5=function(m,h,a,l,j){function k(d,c,e){return function(n){var g=document.getElementById(m.id+"_displayarea");
if(e){g.appendChild(c)
}d.resize(g.clientWidth,g.clientHeight);
c.left=g.style.left;
c.top=g.style.top
}
}this.embed=function(){if(b.html5){l.setupPlugins(j,a,k);
m.innerHTML="";
var e=b.utils.extend({screencolor:"0x000000"},a);
var g=["plugins","modes","events"];
for(var d=0;
d<g.length;
d++){delete e[g[d]]
}if(e.levels&&!e.sources){e.sources=a.levels
}if(e.skin&&e.skin.toLowerCase().indexOf(".zip")>0){e.skin=e.skin.replace(/\.zip/i,".xml")
}var c=new (b.html5(m)).setup(e);
j.container=document.getElementById(j.id);
j.setPlayer(c,"html5")
}else{return null
}};
this.supportsConfig=function(){if(!!b.vid.canPlayType){if(a){var c=b.utils.getFirstPlaylistItemFromConfig(a);
if(typeof c.file=="undefined"&&typeof c.levels=="undefined"){return true
}else{if(c.file){return html5CanPlay(b.vid,c.file,c.provider,c.playlistfile)
}else{if(c.levels&&c.levels.length){for(var d=0;
d<c.levels.length;
d++){if(c.levels[d].file&&html5CanPlay(b.vid,c.levels[d].file,c.provider,c.playlistfile)){return true
}}}}}}else{return true
}}return false
};
html5CanPlay=function(e,g,d,n){if(n){return false
}if(d&&d=="youtube"){return true
}if(d&&d!="video"&&d!="http"&&d!="sound"){return false
}if(navigator.userAgent.match(/BlackBerry/i)!==null){return false
}var c=b.utils.extension(g);
if(!b.utils.exists(c)||!b.utils.exists(b.utils.extensionmap[c])){return true
}if(!b.utils.exists(b.utils.extensionmap[c].html5)){return false
}if(b.utils.isLegacyAndroid()&&c.match(/m4v|mp4/)){return true
}return browserCanPlay(e,b.utils.extensionmap[c].html5)
};
browserCanPlay=function(c,d){if(!d){return true
}if(c.canPlayType(d)){return true
}else{if(d=="audio/mp3"&&navigator.userAgent.match(/safari/i)){return c.canPlayType("audio/mpeg")
}else{return false
}}}
}
})(jwplayer);
(function(b){b.embed.logo=function(s,t,A){var v={prefix:"http://l.longtailvideo.com/"+t+"/",file:"",link:"",linktarget:"_top",margin:8,out:0.5,over:1,timeout:5,hide:false,position:"bottom-left"};
_css=b.utils.css;
var C;
var w;
u();
function u(){q();
B();
y()
}function q(){if(v.prefix){var c=b.version.split(/\W/).splice(0,2).join("/");
if(v.prefix.indexOf(c)<0){v.prefix+=c+"/"
}}w=b.utils.extend({},v,s)
}function a(){var c={border:"none",textDecoration:"none",position:"absolute",cursor:"pointer",zIndex:10};
c.display=w.hide?"none":"block";
var d=w.position.toLowerCase().split("-");
for(var e in d){c[d[e]]=w.margin
}return c
}function B(){C=document.createElement("img");
C.id=A+"_jwplayer_logo";
C.style.display="none";
C.onload=function(c){_css(C,a());
z()
};
if(!w.file){return
}if(w.file.indexOf("http://")===0){C.src=w.file
}else{C.src=w.prefix+w.file
}}if(!w.file){return
}function y(){if(w.link){C.onmouseover=x;
C.onmouseout=z;
C.onclick=r
}else{this.mouseEnabled=false
}}function r(c){if(typeof c!="undefined"){c.preventDefault();
c.stopPropagation()
}if(w.link){window.open(w.link,w.linktarget)
}return
}function z(c){if(w.link){C.style.opacity=w.out
}return
}function x(c){if(w.hide){C.style.opacity=w.over
}return
}return C
}
})(jwplayer);
(function(b){b.html5=function(a){var d=a;
this.setup=function(c){b.utils.extend(this,new b.html5.api(d,c));
return this
};
return this
}
})(jwplayer);
(function(g){var h=g.utils;
var e=h.css;
var j=h.isIOS();
g.html5.view=function(ax,ac,aC){var ay=ax;
var al=ac;
var aB=aC;
var c;
var aD;
var aq;
var aw;
var ae;
var U;
var V;
var af=false;
var am=false;
var aj,W;
var aE,b,ap;
function Y(){c=document.createElement("div");
c.id=al.id;
c.className=al.className;
_videowrapper=document.createElement("div");
_videowrapper.id=c.id+"_video_wrapper";
al.id=c.id+"_video";
e(c,{position:"relative",height:aB.height,width:aB.width,padding:0,backgroundColor:k(),zIndex:0});
function k(){if(ay.skin.getComponentSettings("display")&&ay.skin.getComponentSettings("display").backgroundcolor){return ay.skin.getComponentSettings("display").backgroundcolor
}return parseInt("000000",16)
}e(al,{width:"100%",height:"100%",top:0,left:0,zIndex:1,margin:"auto",display:"block"});
e(_videowrapper,{overflow:"hidden",position:"absolute",top:0,left:0,bottom:0,right:0});
h.wrap(al,c);
h.wrap(al,_videowrapper);
aw=document.createElement("div");
aw.id=c.id+"_displayarea";
c.appendChild(aw);
_instreamArea=document.createElement("div");
_instreamArea.id=c.id+"_instreamarea";
e(_instreamArea,{overflow:"hidden",position:"absolute",top:0,left:0,bottom:0,right:0,zIndex:100,background:"000000",display:"none"});
c.appendChild(_instreamArea)
}function Z(){for(var l=0;
l<aB.plugins.order.length;
l++){var k=aB.plugins.order[l];
if(h.exists(aB.plugins.object[k].getDisplayElement)){aB.plugins.object[k].height=h.parseDimension(aB.plugins.object[k].getDisplayElement().style.height);
aB.plugins.object[k].width=h.parseDimension(aB.plugins.object[k].getDisplayElement().style.width);
aB.plugins.config[k].currentPosition=aB.plugins.config[k].position
}}ao()
}function ar(k){am=aB.fullscreen
}function av(k){if(b){return
}switch(k.newstate){case g.api.events.state.PLAYING:if(aB.getMedia()&&aB.getMedia().hasChrome()){aw.style.display="none"
}break;
default:aw.style.display="block";
break
}az()
}function ao(l){var n=aB.getMedia()?aB.getMedia().getDisplayElement():null;
if(h.exists(n)){if(V!=n){if(V&&V.parentNode){V.parentNode.replaceChild(n,V)
}V=n
}for(var m=0;
m<aB.plugins.order.length;
m++){var k=aB.plugins.order[m];
if(h.exists(aB.plugins.object[k].getDisplayElement)){aB.plugins.config[k].currentPosition=aB.plugins.config[k].position
}}}ad(aB.width,aB.height)
}this.setup=function(){if(aB&&aB.getMedia()){al=aB.getMedia().getDisplayElement()
}Y();
Z();
ay.jwAddEventListener(g.api.events.JWPLAYER_PLAYER_STATE,av);
ay.jwAddEventListener(g.api.events.JWPLAYER_MEDIA_LOADED,ao);
ay.jwAddEventListener(g.api.events.JWPLAYER_MEDIA_BEFOREPLAY,ar);
ay.jwAddEventListener(g.api.events.JWPLAYER_MEDIA_META,function(l){az()
});
var k;
if(h.exists(window.onresize)){k=window.onresize
}window.onresize=function(m){if(h.exists(k)){try{k(m)
}catch(n){}}if(ay.jwGetFullscreen()){if(!ai()){var l=h.getBoundingClientRect(document.body);
aB.width=Math.abs(l.left)+Math.abs(l.right);
aB.height=window.innerHeight;
ad(aB.width,aB.height)
}}else{ad(aB.width,aB.height)
}}
};
function X(k){switch(k.keyCode){case 27:if(ay.jwGetFullscreen()){ay.jwSetFullscreen(false)
}break;
case 32:if(ay.jwGetState()!=g.api.events.state.IDLE&&ay.jwGetState()!=g.api.events.state.PAUSED){ay.jwPause()
}else{ay.jwPlay()
}break
}}function ad(q,s){if(c.style.display=="none"){return
}var n=[].concat(aB.plugins.order);
n.reverse();
ae=n.length+2;
if(am&&ai()){try{if(aB.fullscreen&&!aB.getMedia().getDisplayElement().webkitDisplayingFullscreen){aB.fullscreen=false
}}catch(k){}}if(!aB.fullscreen){aD=q;
aq=s;
if(typeof q=="string"&&q.indexOf("%")>0){aD=h.getElementWidth(h.parentNode(c))*parseInt(q.replace("%"),"")/100
}else{aD=q
}if(typeof s=="string"&&s.indexOf("%")>0){aq=h.getElementHeight(h.parentNode(c))*parseInt(s.replace("%"),"")/100
}else{aq=s
}var m={top:0,bottom:0,left:0,right:0,width:aD,height:aq,position:"absolute"};
e(aw,m);
var r={};
var u;
try{u=aB.plugins.object.display.getDisplayElement()
}catch(k){}if(u){r.width=h.parseDimension(u.style.width);
r.height=h.parseDimension(u.style.height)
}var t=h.extend({},m,r,{zIndex:_instreamArea.style.zIndex,display:_instreamArea.style.display});
e(_instreamArea,t);
e(c,{height:aq,width:aD});
var l=an(ab,n);
if(l.length>0){ae+=l.length;
var o=l.indexOf("playlist"),p=l.indexOf("controlbar");
if(o>=0&&p>=0){l[o]=l.splice(p,1,l[o])[0]
}an(au,l,true)
}aj=h.getElementWidth(aw);
W=h.getElementHeight(aw)
}else{if(!ai()&&!j){an(aF,n,true)
}}az()
}var at;
function an(s,n,m){at=0;
var l=[];
for(var o=0;
o<n.length;
o++){var k=n[o];
if(h.exists(aB.plugins.object[k].getDisplayElement)){if(aB.plugins.config[k].currentPosition!=g.html5.view.positions.NONE){var q=s(k,ae--);
if(!q){l.push(k)
}else{var p=q.width;
var r=q.height;
if(m){delete q.width;
delete q.height
}e(aB.plugins.object[k].getDisplayElement(),q);
aB.plugins.object[k].resize(p,r)
}}else{e(aB.plugins.object[k].getDisplayElement(),{display:"none"})
}}}return l
}function ab(l,k){if(h.exists(aB.plugins.object[l].getDisplayElement)){if(aB.plugins.config[l].position&&a(aB.plugins.config[l].position)){if(!h.exists(aB.plugins.object[l].getDisplayElement().parentNode)){c.appendChild(aB.plugins.object[l].getDisplayElement())
}var m=ak(l);
m.zIndex=k;
return m
}}return false
}function au(l,k){if(!h.exists(aB.plugins.object[l].getDisplayElement().parentNode)){aw.appendChild(aB.plugins.object[l].getDisplayElement())
}return{position:"absolute",width:(h.getElementWidth(aw)-h.parseDimension(aw.style.right)),height:(h.getElementHeight(aw)-h.parseDimension(aw.style.bottom)),zIndex:k}
}function aF(l,k){return{position:"fixed",width:aB.width,height:aB.height,zIndex:k}
}var az=this.resizeMedia=function(){aw.style.position="absolute";
var k=aB.getMedia()?aB.getMedia().getDisplayElement():ap;
if(!k){return
}if(k&&k.tagName.toLowerCase()=="video"){if(!k.videoWidth||!k.videoHeight){k.style.width=aw.style.width;
k.style.height=aw.style.height;
return
}k.style.position="absolute";
h.fadeTo(k,1,0.25);
if(k.parentNode){k.parentNode.style.left=aw.style.left;
k.parentNode.style.top=aw.style.top
}if(aB.fullscreen&&ay.jwGetStretching()==g.utils.stretching.EXACTFIT&&!h.isMobile()){var m=document.createElement("div");
h.stretch(g.utils.stretching.UNIFORM,m,h.getElementWidth(aw),h.getElementHeight(aw),aj,W);
h.stretch(g.utils.stretching.EXACTFIT,k,h.parseDimension(m.style.width),h.parseDimension(m.style.height),k.videoWidth?k.videoWidth:400,k.videoHeight?k.videoHeight:300);
e(k,{left:m.style.left,top:m.style.top})
}else{if(!j){h.stretch(ay.jwGetStretching(),k,h.getElementWidth(aw),h.getElementHeight(aw),k.videoWidth?k.videoWidth:400,k.videoHeight?k.videoHeight:300)
}}}else{var l=aB.plugins.object.display.getDisplayElement();
if(l){aB.getMedia().resize(h.parseDimension(l.style.width),h.parseDimension(l.style.height))
}else{aB.getMedia().resize(h.parseDimension(aw.style.width),h.parseDimension(aw.style.height))
}}};
var ak=this.getComponentPosition=function(l){var k={position:"absolute",margin:0,padding:0,top:null};
var m=aB.plugins.config[l].currentPosition.toLowerCase();
switch(m.toUpperCase()){case g.html5.view.positions.TOP:k.top=h.parseDimension(aw.style.top);
k.left=h.parseDimension(aw.style.left);
k.width=h.getElementWidth(aw)-h.parseDimension(aw.style.left)-h.parseDimension(aw.style.right);
k.height=aB.plugins.object[l].height;
aw.style[m]=h.parseDimension(aw.style[m])+aB.plugins.object[l].height+"px";
aw.style.height=h.getElementHeight(aw)-k.height+"px";
break;
case g.html5.view.positions.RIGHT:k.top=h.parseDimension(aw.style.top);
k.right=h.parseDimension(aw.style.right);
k.width=aB.plugins.object[l].width;
k.height=h.getElementHeight(aw)-h.parseDimension(aw.style.top)-h.parseDimension(aw.style.bottom);
aw.style.width=h.getElementWidth(aw)-k.width+"px";
break;
case g.html5.view.positions.BOTTOM:k.left=h.parseDimension(aw.style.left);
k.width=h.getElementWidth(aw)-h.parseDimension(aw.style.left)-h.parseDimension(aw.style.right);
k.height=aB.plugins.object[l].height;
k.bottom=h.parseDimension(aw.style.bottom+at);
at+=k.height;
aw.style.height=h.getElementHeight(aw)-k.height+"px";
break;
case g.html5.view.positions.LEFT:k.top=h.parseDimension(aw.style.top);
k.left=h.parseDimension(aw.style.left);
k.width=aB.plugins.object[l].width;
k.height=h.getElementHeight(aw)-h.parseDimension(aw.style.top)-h.parseDimension(aw.style.bottom);
aw.style[m]=h.parseDimension(aw.style[m])+aB.plugins.object[l].width+"px";
aw.style.width=h.getElementWidth(aw)-k.width+"px";
break;
default:break
}return k
};
this.resize=ad;
var aa,aA,d;
var ah=this.fullscreen=function(k){if(j){return
}var p;
try{p=aB.getMedia().getDisplayElement()
}catch(q){}if(k){aA=aB.width;
d=aB.height
}var o={position:"fixed",width:"100%",height:"100%",top:0,left:0,zIndex:2147483000},n={position:"relative",height:aA,width:d,zIndex:0};
if(ai()&&p&&p.webkitSupportsFullscreen){if(k&&!p.webkitDisplayingFullscreen){try{e(p,o);
h.transform(p);
aa=aw.style.display;
aw.style.display="none";
p.webkitEnterFullscreen()
}catch(l){}}else{if(!k){e(p,n);
az();
if(p.webkitDisplayingFullscreen){try{p.webkitExitFullscreen()
}catch(l){}}aw.style.display=aa
}}af=false
}else{if(k){document.onkeydown=X;
clearInterval(U);
var m=h.getBoundingClientRect(document.body);
aB.width=Math.abs(m.left)+Math.abs(m.right);
aB.height=window.innerHeight;
e(c,o);
o.zIndex=1;
if(aB.getMedia()&&aB.getMedia().getDisplayElement()){e(aB.getMedia().getDisplayElement(),o)
}o.zIndex=2;
e(aw,o);
af=true
}else{document.onkeydown="";
aB.width=aD;
aB.height=aq;
e(c,n);
af=false
}ad(aB.width,aB.height)
}};
function a(k){return([g.html5.view.positions.TOP,g.html5.view.positions.RIGHT,g.html5.view.positions.BOTTOM,g.html5.view.positions.LEFT].toString().indexOf(k.toUpperCase())>-1)
}function ai(){if(ay.jwGetState()!=g.api.events.state.IDLE&&!af&&(aB.getMedia()&&aB.getMedia().getDisplayElement()&&aB.getMedia().getDisplayElement().webkitSupportsFullscreen)&&h.useNativeFullscreen()){return true
}return false
}this.setupInstream=function(l,k){h.css(_instreamArea,{display:"block",position:"absolute"});
aw.style.display="none";
_instreamArea.appendChild(l);
ap=k;
b=true
};
var ag=this.destroyInstream=function(){_instreamArea.style.display="none";
_instreamArea.innerHTML="";
aw.style.display="block";
ap=null;
b=false;
ad(aB.width,aB.height)
}
};
g.html5.view.positions={TOP:"TOP",RIGHT:"RIGHT",BOTTOM:"BOTTOM",LEFT:"LEFT",OVER:"OVER",NONE:"NONE"}
})(jwplayer);
(function(d){var c={backgroundcolor:"",margin:10,font:"Arial,sans-serif",fontsize:10,fontcolor:parseInt("000000",16),fontstyle:"normal",fontweight:"bold",buttoncolor:parseInt("ffffff",16),position:d.html5.view.positions.BOTTOM,idlehide:false,hideplaylistcontrols:false,forcenextprev:false,layout:{left:{position:"left",elements:[{name:"play",type:"button"},{name:"divider",type:"divider"},{name:"prev",type:"button"},{name:"divider",type:"divider"},{name:"next",type:"button"},{name:"divider",type:"divider"},{name:"elapsed",type:"text"}]},center:{position:"center",elements:[{name:"time",type:"slider"}]},right:{position:"right",elements:[{name:"duration",type:"text"},{name:"blank",type:"button"},{name:"divider",type:"divider"},{name:"mute",type:"button"},{name:"volume",type:"slider"},{name:"divider",type:"divider"},{name:"fullscreen",type:"button"}]}}};
_utils=d.utils;
_css=_utils.css;
_hide=function(a){_css(a,{display:"none"})
};
_show=function(a){_css(a,{display:"block"})
};
d.html5.controlbar=function(bc,b){window.controlbar=this;
var bd=bc;
var aR=_utils.extend({},c,bd.skin.getComponentSettings("controlbar"),b);
if(aR.position==d.html5.view.positions.NONE||typeof d.html5.view.positions[aR.position]=="undefined"){return
}if(_utils.mapLength(bd.skin.getComponentLayout("controlbar"))>0){aR.layout=bd.skin.getComponentLayout("controlbar")
}var aN;
var au;
var aO;
var aP;
var a2="none";
var bg;
var be;
var aK;
var bh;
var bi;
var aZ;
var at={};
var a8=false;
var bl={};
var av=-1;
var aV;
var bf=false;
var a9;
var bk;
var ap=false;
var aL=false;
var aJ;
var aY=new d.html5.eventdispatcher();
_utils.extend(this,aY);
function aD(){if(!aV){aV=bd.skin.getSkinElement("controlbar","background");
if(!aV){aV={width:0,height:0,src:null}
}}return aV
}function ax(){aO=0;
aP=0;
au=0;
if(!a8){var e={height:aD().height,backgroundColor:aR.backgroundcolor};
aN=document.createElement("div");
aN.id=bd.id+"_jwplayer_controlbar";
_css(aN,e)
}var g=(bd.skin.getSkinElement("controlbar","capLeft"));
var h=(bd.skin.getSkinElement("controlbar","capRight"));
if(g){a0("capLeft","left",false,aN)
}aT("background",aN,{position:"absolute",height:aD().height,left:(g?g.width:0),zIndex:0},"img");
if(aD().src){at.background.src=aD().src
}aT("elements",aN,{position:"relative",height:aD().height,zIndex:1});
if(h){a0("capRight","right",false,aN)
}}this.getDisplayElement=function(){return aN
};
this.resize=function(e,h){ar();
_utils.cancelAnimation(aN);
bi=e;
aZ=h;
if(aL!=bd.jwGetFullscreen()){aL=bd.jwGetFullscreen();
if(!aL){a()
}bk=undefined
}var g=a1();
aE({id:bd.id,duration:aK,position:be});
a3({id:bd.id,bufferPercent:bh});
return g
};
this.show=function(){if(bf){bf=false;
_show(aN);
ao()
}};
this.hide=function(){if(!bf){bf=true;
_hide(aN);
aQ()
}};
function a7(){var g=["timeSlider","volumeSlider","timeSliderRail","volumeSliderRail"];
for(var e in g){var h=g[e];
if(typeof at[h]!="undefined"){bl[h]=_utils.getBoundingClientRect(at[h])
}}}var bj;
function a(e){if(bf){return
}clearTimeout(a9);
if(aR.position==d.html5.view.positions.OVER||bd.jwGetFullscreen()){switch(bd.jwGetState()){case d.api.events.state.PAUSED:case d.api.events.state.IDLE:if(aN&&aN.style.opacity<1&&(!aR.idlehide||_utils.exists(e))){bj=false;
setTimeout(function(){if(!bj){an()
}},100)
}if(aR.idlehide){a9=setTimeout(function(){aX()
},2000)
}break;
default:bj=true;
if(e){an()
}a9=setTimeout(function(){aX()
},2000);
break
}}else{an()
}}function aX(){if(!bf){aQ();
if(aN.style.opacity==1){_utils.cancelAnimation(aN);
_utils.fadeTo(aN,0,0.1,1,0)
}}}function an(){if(!bf){ao();
if(aN.style.opacity==0){_utils.cancelAnimation(aN);
_utils.fadeTo(aN,1,0.1,0,0)
}}}function aH(e){return function(){if(ap&&bk!=e){bk=e;
aY.sendEvent(e,{component:"controlbar",boundingRect:aw()})
}}
}var ao=aH(d.api.events.JWPLAYER_COMPONENT_SHOW);
var aQ=aH(d.api.events.JWPLAYER_COMPONENT_HIDE);
function aw(){if(aR.position==d.html5.view.positions.OVER||bd.jwGetFullscreen()){return _utils.getDimensions(aN)
}else{return{x:0,y:0,width:0,height:0}
}}function aT(e,g,h,k){var j;
if(!a8){if(!k){k="div"
}j=document.createElement(k);
at[e]=j;
j.id=aN.id+"_"+e;
g.appendChild(j)
}else{j=document.getElementById(aN.id+"_"+e)
}if(_utils.exists(h)){_css(j,h)
}return j
}function ay(){if(bd.jwGetHeight()<=40){aR.layout=_utils.clone(aR.layout);
for(var e=0;
e<aR.layout.left.elements.length;
e++){if(aR.layout.left.elements[e].name=="fullscreen"){aR.layout.left.elements.splice(e,1)
}}for(e=0;
e<aR.layout.right.elements.length;
e++){if(aR.layout.right.elements[e].name=="fullscreen"){aR.layout.right.elements.splice(e,1)
}}ba()
}aB(aR.layout.left);
aB(aR.layout.center);
aB(aR.layout.right)
}function aB(g,k){var e=g.position=="right"?"right":"left";
var h=_utils.extend([],g.elements);
if(_utils.exists(k)){h.reverse()
}var g=aT(g.position+"Group",at.elements,{"float":"left",styleFloat:"left",cssFloat:"left",height:"100%"});
for(var j=0;
j<h.length;
j++){aS(h[j],e,g)
}}function aA(){return au++
}function aS(l,j,g){var m,o,n,p,e;
if(!g){g=at.elements
}if(l.type=="divider"){a0("divider"+aA(),j,true,g,undefined,l.width,l.element);
return
}switch(l.name){case"play":a0("playButton",j,false,g);
a0("pauseButton",j,true,g);
aq("playButton","jwPlay");
aq("pauseButton","jwPause");
break;
case"prev":a0("prevButton",j,true,g);
aq("prevButton","jwPlaylistPrev");
break;
case"stop":a0("stopButton",j,true,g);
aq("stopButton","jwStop");
break;
case"next":a0("nextButton",j,true,g);
aq("nextButton","jwPlaylistNext");
break;
case"elapsed":a0("elapsedText",j,true,g,null,null,bd.skin.getSkinElement("controlbar","elapsedBackground"));
break;
case"time":o=!_utils.exists(bd.skin.getSkinElement("controlbar","timeSliderCapLeft"))?0:bd.skin.getSkinElement("controlbar","timeSliderCapLeft").width;
n=!_utils.exists(bd.skin.getSkinElement("controlbar","timeSliderCapRight"))?0:bd.skin.getSkinElement("controlbar","timeSliderCapRight").width;
m=j=="left"?o:n;
e={height:aD().height,position:"relative","float":"left",styleFloat:"left",cssFloat:"left"};
var k=aT("timeSlider",g,e);
a0("timeSliderCapLeft",j,true,k,"relative");
a0("timeSliderRail",j,false,k,"relative");
a0("timeSliderBuffer",j,false,k,"absolute");
a0("timeSliderProgress",j,false,k,"absolute");
a0("timeSliderThumb",j,false,k,"absolute");
a0("timeSliderCapRight",j,true,k,"relative");
aW("time");
break;
case"fullscreen":a0("fullscreenButton",j,false,g);
a0("normalscreenButton",j,true,g);
aq("fullscreenButton","jwSetFullscreen",true);
aq("normalscreenButton","jwSetFullscreen",false);
break;
case"volume":o=!_utils.exists(bd.skin.getSkinElement("controlbar","volumeSliderCapLeft"))?0:bd.skin.getSkinElement("controlbar","volumeSliderCapLeft").width;
n=!_utils.exists(bd.skin.getSkinElement("controlbar","volumeSliderCapRight"))?0:bd.skin.getSkinElement("controlbar","volumeSliderCapRight").width;
m=j=="left"?o:n;
p=bd.skin.getSkinElement("controlbar","volumeSliderRail").width+o+n;
e={height:aD().height,position:"relative",width:p,"float":"left",styleFloat:"left",cssFloat:"left"};
var h=aT("volumeSlider",g,e);
a0("volumeSliderCapLeft",j,false,h,"relative");
a0("volumeSliderRail",j,false,h,"relative");
a0("volumeSliderProgress",j,false,h,"absolute");
a0("volumeSliderThumb",j,false,h,"absolute");
a0("volumeSliderCapRight",j,false,h,"relative");
aW("volume");
break;
case"mute":a0("muteButton",j,false,g);
a0("unmuteButton",j,true,g);
aq("muteButton","jwSetMute",true);
aq("unmuteButton","jwSetMute",false);
break;
case"duration":a0("durationText",j,true,g,null,null,bd.skin.getSkinElement("controlbar","durationBackground"));
break
}}function a0(m,j,o,e,l,p,n){if(_utils.exists(bd.skin.getSkinElement("controlbar",m))||m.indexOf("Text")>0||m.indexOf("divider")===0){var k={height:"100%",position:l?l:"relative",display:"block","float":"left",styleFloat:"left",cssFloat:"left"};
if((m.indexOf("next")===0||m.indexOf("prev")===0)&&(bd.jwGetPlaylist().length<2||aR.hideplaylistcontrols.toString()=="true")){if(aR.forcenextprev.toString()!="true"){o=false;
k.display="none"
}}var q;
if(m.indexOf("Text")>0){m.innerhtml="00:00";
k.font=aR.fontsize+"px/"+(aD().height+1)+"px "+aR.font;
k.color=aR.fontcolor;
k.textAlign="center";
k.fontWeight=aR.fontweight;
k.fontStyle=aR.fontstyle;
k.cursor="default";
if(n){k.background="url("+n.src+") no-repeat center";
k.backgroundSize="100% "+aD().height+"px"
}k.padding="0 5px"
}else{if(m.indexOf("divider")===0){if(p){if(!isNaN(parseInt(p))){q=parseInt(p)
}}else{if(n){var h=bd.skin.getSkinElement("controlbar",n);
if(h){k.background="url("+h.src+") repeat-x center left";
q=h.width
}}else{k.background="url("+bd.skin.getSkinElement("controlbar","divider").src+") repeat-x center left";
q=bd.skin.getSkinElement("controlbar","divider").width
}}}else{k.background="url("+bd.skin.getSkinElement("controlbar",m).src+") repeat-x center left";
q=bd.skin.getSkinElement("controlbar",m).width
}}if(j=="left"){if(o){aO+=q
}}else{if(j=="right"){if(o){aP+=q
}}}if(_utils.typeOf(e)=="undefined"){e=at.elements
}k.width=q;
if(a8){_css(at[m],k)
}else{var g=aT(m,e,k);
if(_utils.exists(bd.skin.getSkinElement("controlbar",m+"Over"))){g.onmouseover=function(r){g.style.backgroundImage=["url(",bd.skin.getSkinElement("controlbar",m+"Over").src,")"].join("")
};
g.onmouseout=function(r){g.style.backgroundImage=["url(",bd.skin.getSkinElement("controlbar",m).src,")"].join("")
}
}if(m.indexOf("divider")==0){g.setAttribute("class","divider")
}g.innerHTML="&nbsp;"
}}}function aM(){bd.jwAddEventListener(d.api.events.JWPLAYER_PLAYLIST_LOADED,aU);
bd.jwAddEventListener(d.api.events.JWPLAYER_PLAYLIST_ITEM,a5);
bd.jwAddEventListener(d.api.events.JWPLAYER_MEDIA_BUFFER,a3);
bd.jwAddEventListener(d.api.events.JWPLAYER_PLAYER_STATE,a6);
bd.jwAddEventListener(d.api.events.JWPLAYER_MEDIA_TIME,aE);
bd.jwAddEventListener(d.api.events.JWPLAYER_MEDIA_MUTE,aC);
bd.jwAddEventListener(d.api.events.JWPLAYER_MEDIA_VOLUME,bb);
bd.jwAddEventListener(d.api.events.JWPLAYER_MEDIA_COMPLETE,az)
}function aU(){if(!aR.hideplaylistcontrols){if(bd.jwGetPlaylist().length>1||aR.forcenextprev.toString()=="true"){_show(at.nextButton);
_show(at.prevButton)
}else{_hide(at.nextButton);
_hide(at.prevButton)
}a1();
aI()
}}function a5(e){aK=bd.jwGetPlaylist()[e.index].duration;
av=-1;
aE({id:bd.id,duration:aK,position:0});
a3({id:bd.id,bufferProgress:0})
}function aI(){aE({id:bd.id,duration:bd.jwGetDuration(),position:0});
a3({id:bd.id,bufferProgress:0});
aC({id:bd.id,mute:bd.jwGetMute()});
a6({id:bd.id,newstate:d.api.events.state.IDLE});
bb({id:bd.id,volume:bd.jwGetVolume()})
}function aq(g,e,h){if(a8){return
}if(_utils.exists(bd.skin.getSkinElement("controlbar",g))){var j=at[g];
if(_utils.exists(j)){_css(j,{cursor:"pointer"});
if(e=="fullscreen"){j.onmouseup=function(k){k.stopPropagation();
bd.jwSetFullscreen(!bd.jwGetFullscreen())
}
}else{j.onmouseup=function(k){k.stopPropagation();
if(_utils.exists(h)){bd[e](h)
}else{bd[e]()
}}
}}}}function aW(g){if(a8){return
}var e=at[g+"Slider"];
_css(at.elements,{cursor:"pointer"});
_css(e,{cursor:"pointer"});
e.onmousedown=function(h){a2=g
};
e.onmouseup=function(h){h.stopPropagation();
aF(h.pageX)
};
e.onmousemove=function(j){if(a2=="time"){bg=true;
var h=j.pageX-bl[g+"Slider"].left-window.pageXOffset;
_css(at[a2+"SliderThumb"],{left:h})
}}
}function aF(h){bg=false;
var j;
if(a2=="time"){j=h-bl.timeSliderRail.left+window.pageXOffset;
var e=j/bl.timeSliderRail.width*aK;
if(e<0){e=0
}else{if(e>aK){e=aK-3
}}if(bd.jwGetState()==d.api.events.state.PAUSED||bd.jwGetState()==d.api.events.state.IDLE){bd.jwPlay()
}bd.jwSeek(e)
}else{if(a2=="volume"){j=h-bl.volumeSliderRail.left-window.pageXOffset;
var g=Math.round(j/bl.volumeSliderRail.width*100);
if(g<10){g=0
}else{if(g>100){g=100
}}if(bd.jwGetMute()){bd.jwSetMute(false)
}bd.jwSetVolume(g)
}}a2="none"
}function a3(h){if(_utils.exists(h.bufferPercent)){bh=h.bufferPercent
}if(bl.timeSliderRail){var e=bd.skin.getSkinElement("controlbar","timeSliderCapLeft");
var g=bl.timeSliderRail.width;
var j=isNaN(Math.round(g*bh/100))?0:Math.round(g*bh/100);
_css(at.timeSliderBuffer,{width:j,left:e?e.width:0})
}}function aC(e){if(e.mute){_hide(at.muteButton);
_show(at.unmuteButton);
_hide(at.volumeSliderProgress)
}else{_show(at.muteButton);
_hide(at.unmuteButton);
_show(at.volumeSliderProgress)
}}function a6(e){if(e.newstate==d.api.events.state.BUFFERING||e.newstate==d.api.events.state.PLAYING){_show(at.pauseButton);
_hide(at.playButton)
}else{_hide(at.pauseButton);
_show(at.playButton)
}a();
if(e.newstate==d.api.events.state.IDLE){_hide(at.timeSliderBuffer);
_hide(at.timeSliderProgress);
_hide(at.timeSliderThumb);
aE({id:bd.id,duration:bd.jwGetDuration(),position:0})
}else{_show(at.timeSliderBuffer);
if(e.newstate!=d.api.events.state.BUFFERING){_show(at.timeSliderProgress);
_show(at.timeSliderThumb)
}}}function az(e){a3({bufferPercent:0});
aE(_utils.extend(e,{position:0,duration:aK}))
}function aE(e){if(_utils.exists(e.position)){be=e.position
}var k=false;
if(_utils.exists(e.duration)&&e.duration!=aK){aK=e.duration;
k=true
}var h=(be===aK===0)?0:be/aK;
var m=bl.timeSliderRail;
if(m){var j=isNaN(Math.round(m.width*h))?0:Math.round(m.width*h);
var n=bd.skin.getSkinElement("controlbar","timeSliderCapLeft");
var g=j+(n?n.width:0);
if(at.timeSliderProgress){_css(at.timeSliderProgress,{width:j,left:n?n.width:0});
if(!bg){if(at.timeSliderThumb){at.timeSliderThumb.style.left=g+"px"
}}}}if(at.durationText){at.durationText.innerHTML=_utils.timeFormat(aK)
}if(at.elapsedText){var l=_utils.timeFormat(be);
at.elapsedText.innerHTML=l;
if(av!=l.length){k=true;
av=l.length
}}if(k){a1()
}}function ba(){var l=at.elements.childNodes;
var e,h;
for(var j=0;
j<l.length;
j++){var g=l[j].childNodes;
for(var k in g){if(isNaN(parseInt(k,10))){continue
}if(g[k].id.indexOf(aN.id+"_divider")===0&&h&&h.id.indexOf(aN.id+"_divider")===0&&g[k].style.backgroundImage==h.style.backgroundImage){g[k].style.display="none"
}else{if(g[k].id.indexOf(aN.id+"_divider")===0&&e&&e.style.display!="none"){g[k].style.display="block"
}}if(g[k].style.display!="none"){h=g[k]
}e=g[k]
}}}function aG(){if(bd.jwGetFullscreen()){_show(at.normalscreenButton);
_hide(at.fullscreenButton)
}else{_hide(at.normalscreenButton);
_show(at.fullscreenButton)
}if(bd.jwGetState()==d.api.events.state.BUFFERING||bd.jwGetState()==d.api.events.state.PLAYING){_show(at.pauseButton);
_hide(at.playButton)
}else{_hide(at.pauseButton);
_show(at.playButton)
}if(bd.jwGetMute()==true){_hide(at.muteButton);
_show(at.unmuteButton);
_hide(at.volumeSliderProgress)
}else{_show(at.muteButton);
_hide(at.unmuteButton);
_show(at.volumeSliderProgress)
}}function a1(){ba();
aG();
var n={width:bi};
var e={"float":"left",styleFloat:"left",cssFloat:"left"};
if(aR.position==d.html5.view.positions.OVER||bd.jwGetFullscreen()){n.left=aR.margin;
n.width-=2*aR.margin;
n.top=aZ-aD().height-aR.margin;
n.height=aD().height
}var l=bd.skin.getSkinElement("controlbar","capLeft");
var h=bd.skin.getSkinElement("controlbar","capRight");
e.width=n.width-(l?l.width:0)-(h?h.width:0);
var m=_utils.getBoundingClientRect(at.leftGroup).width;
var j=_utils.getBoundingClientRect(at.rightGroup).width;
var k=e.width-m-j-1;
var o=k;
var p=bd.skin.getSkinElement("controlbar","timeSliderCapLeft");
var g=bd.skin.getSkinElement("controlbar","timeSliderCapRight");
if(_utils.exists(p)){o-=p.width
}if(_utils.exists(g)){o-=g.width
}at.timeSlider.style.width=k+"px";
at.timeSliderRail.style.width=o+"px";
_css(aN,n);
_css(at.elements,e);
_css(at.background,e);
a7();
return n
}function bb(e){if(_utils.exists(at.volumeSliderRail)){var j=isNaN(e.volume/100)?1:e.volume/100;
var h=_utils.parseDimension(at.volumeSliderRail.style.width);
var l=isNaN(Math.round(h*j))?0:Math.round(h*j);
var m=_utils.parseDimension(at.volumeSliderRail.style.right);
var k=(!_utils.exists(bd.skin.getSkinElement("controlbar","volumeSliderCapLeft")))?0:bd.skin.getSkinElement("controlbar","volumeSliderCapLeft").width;
_css(at.volumeSliderProgress,{width:l,left:k});
if(at.volumeSliderThumb){var g=(l-Math.round(_utils.parseDimension(at.volumeSliderThumb.style.width)/2));
g=Math.min(Math.max(g,0),h-_utils.parseDimension(at.volumeSliderThumb.style.width));
_css(at.volumeSliderThumb,{left:g})
}if(_utils.exists(at.volumeSliderCapLeft)){_css(at.volumeSliderCapLeft,{left:0})
}}}function ar(){try{var e=(bd.id.indexOf("_instream")>0?bd.id.replace("_instream",""):bd.id);
aJ=document.getElementById(e);
aJ.addEventListener("mousemove",a)
}catch(g){_utils.log("Could not add mouse listeners to controlbar: "+g)
}}function a4(){ax();
ay();
a7();
a8=true;
aM();
aR.idlehide=(aR.idlehide.toString().toLowerCase()=="true");
if(aR.position==d.html5.view.positions.OVER&&aR.idlehide){aN.style.opacity=0;
ap=true
}else{aN.style.opacity=1;
setTimeout((function(){ap=true;
ao()
}),1)
}ar();
aI()
}a4();
return this
}
})(jwplayer);
(function(d){var e=["width","height","state","playlist","item","position","buffer","duration","volume","mute","fullscreen"];
var g=d.utils;
d.html5.controller=function(av,Y,aD,aB){var aw=av,ax=aD,aA=aB,ak=Y,W=true,ac=-1,ai=false,aF=false,T,ag=[],at=false;
var af=(g.exists(ax.config.debug)&&(ax.config.debug.toString().toLowerCase()=="console")),V=new d.html5.eventdispatcher(ak.id,af);
g.extend(this,V);
function X(h){if(at){V.sendEvent(h.type,h)
}else{ag.push(h)
}}function aq(k){if(!at){at=true;
V.sendEvent(d.api.events.JWPLAYER_READY,k);
if(d.utils.exists(window.playerReady)){playerReady(k)
}if(d.utils.exists(window[aD.config.playerReady])){window[aD.config.playerReady](k)
}while(ag.length>0){var h=ag.shift();
V.sendEvent(h.type,h)
}if(aD.config.autostart&&!d.utils.isIOS()){U()
}while(al.length>0){var j=al.shift();
ah(j.method,j.arguments)
}}}ax.addGlobalListener(X);
ax.addEventListener(d.api.events.JWPLAYER_MEDIA_BUFFER_FULL,function(){ax.getMedia().play()
});
ax.addEventListener(d.api.events.JWPLAYER_MEDIA_TIME,function(h){if(h.position>=ax.playlist[ax.item].start&&ac>=0){ax.playlist[ax.item].start=ac;
ac=-1
}});
ax.addEventListener(d.api.events.JWPLAYER_MEDIA_COMPLETE,function(h){setTimeout(ae,25)
});
ax.addEventListener(d.api.events.JWPLAYER_PLAYLIST_LOADED,U);
ax.addEventListener(d.api.events.JWPLAYER_FULLSCREEN,au);
function ad(){try{T=ad;
if(!ai){ai=true;
V.sendEvent(d.api.events.JWPLAYER_MEDIA_BEFOREPLAY);
ai=false;
if(aF){aF=false;
T=null;
return
}}an(ax.item);
if(ax.playlist[ax.item].levels[0].file.length>0){if(W||ax.state==d.api.events.state.IDLE){ax.getMedia().load(ax.playlist[ax.item]);
W=false
}else{if(ax.state==d.api.events.state.PAUSED){ax.getMedia().play()
}}}return true
}catch(h){V.sendEvent(d.api.events.JWPLAYER_ERROR,h);
T=null
}return false
}function aE(){try{if(ax.playlist[ax.item].levels[0].file.length>0){switch(ax.state){case d.api.events.state.PLAYING:case d.api.events.state.BUFFERING:if(ax.getMedia()){ax.getMedia().pause()
}break;
default:if(ai){aF=true
}}}return true
}catch(h){V.sendEvent(d.api.events.JWPLAYER_ERROR,h)
}return false
}function aj(j){try{if(ax.playlist[ax.item].levels[0].file.length>0){if(typeof j!="number"){j=parseFloat(j)
}switch(ax.state){case d.api.events.state.IDLE:if(ac<0){ac=ax.playlist[ax.item].start;
ax.playlist[ax.item].start=j
}if(!ai){ad()
}break;
case d.api.events.state.PLAYING:case d.api.events.state.PAUSED:case d.api.events.state.BUFFERING:ax.seek(j);
break
}}return true
}catch(h){V.sendEvent(d.api.events.JWPLAYER_ERROR,h)
}return false
}function am(j){T=null;
if(!g.exists(j)){j=true
}try{if((ax.state!=d.api.events.state.IDLE||j)&&ax.getMedia()){ax.getMedia().stop(j)
}if(ai){aF=true
}return true
}catch(h){V.sendEvent(d.api.events.JWPLAYER_ERROR,h)
}return false
}function az(){try{if(ax.playlist[ax.item].levels[0].file.length>0){if(ax.config.shuffle){an(a())
}else{if(ax.item+1==ax.playlist.length){an(0)
}else{an(ax.item+1)
}}}if(ax.state!=d.api.events.state.IDLE){var h=ax.state;
ax.state=d.api.events.state.IDLE;
V.sendEvent(d.api.events.JWPLAYER_PLAYER_STATE,{oldstate:h,newstate:d.api.events.state.IDLE})
}ad();
return true
}catch(j){V.sendEvent(d.api.events.JWPLAYER_ERROR,j)
}return false
}function aa(){try{if(ax.playlist[ax.item].levels[0].file.length>0){if(ax.config.shuffle){an(a())
}else{if(ax.item===0){an(ax.playlist.length-1)
}else{an(ax.item-1)
}}}if(ax.state!=d.api.events.state.IDLE){var h=ax.state;
ax.state=d.api.events.state.IDLE;
V.sendEvent(d.api.events.JWPLAYER_PLAYER_STATE,{oldstate:h,newstate:d.api.events.state.IDLE})
}ad();
return true
}catch(j){V.sendEvent(d.api.events.JWPLAYER_ERROR,j)
}return false
}function a(){var h=null;
if(ax.playlist.length>1){while(!g.exists(h)){h=Math.floor(Math.random()*ax.playlist.length);
if(h==ax.item){h=null
}}}else{h=0
}return h
}function ab(j){if(!ax.playlist||!ax.playlist[j]){return false
}try{if(ax.playlist[j].levels[0].file.length>0){var h=ax.state;
if(h!==d.api.events.state.IDLE){if(ax.playlist[ax.item]&&ax.playlist[ax.item].provider==ax.playlist[j].provider){am(false)
}else{am()
}}an(j);
ad()
}return true
}catch(k){V.sendEvent(d.api.events.JWPLAYER_ERROR,k)
}return false
}function an(h){if(!ax.playlist[h]){return
}ax.setActiveMediaProvider(ax.playlist[h]);
if(ax.item!=h){ax.item=h;
W=true;
V.sendEvent(d.api.events.JWPLAYER_PLAYLIST_ITEM,{index:h})
}}function aC(j){try{an(ax.item);
var h=ax.getMedia();
switch(typeof(j)){case"number":h.volume(j);
break;
case"string":h.volume(parseInt(j,10));
break
}ax.setVolume(j);
return true
}catch(k){V.sendEvent(d.api.events.JWPLAYER_ERROR,k)
}return false
}function ar(j){try{an(ax.item);
var h=ax.getMedia();
if(typeof j=="undefined"){h.mute(!ax.mute);
ax.setMute(!ax.mute)
}else{if(j.toString().toLowerCase()=="true"){h.mute(true);
ax.setMute(true)
}else{h.mute(false);
ax.setMute(false)
}}return true
}catch(k){V.sendEvent(d.api.events.JWPLAYER_ERROR,k)
}return false
}function Z(j,k){try{ax.width=j;
ax.height=k;
aA.resize(j,k);
V.sendEvent(d.api.events.JWPLAYER_RESIZE,{width:ax.width,height:ax.height});
return true
}catch(h){V.sendEvent(d.api.events.JWPLAYER_ERROR,h)
}return false
}function ao(j,h){try{if(typeof j=="undefined"){j=!ax.fullscreen
}if(typeof h=="undefined"){h=true
}if(j!=ax.fullscreen){ax.fullscreen=(j.toString().toLowerCase()=="true");
aA.fullscreen(ax.fullscreen);
if(h){V.sendEvent(d.api.events.JWPLAYER_FULLSCREEN,{fullscreen:ax.fullscreen})
}V.sendEvent(d.api.events.JWPLAYER_RESIZE,{width:ax.width,height:ax.height})
}return true
}catch(k){V.sendEvent(d.api.events.JWPLAYER_ERROR,k)
}return false
}function b(j){try{am();
if(ai){aF=false
}ax.loadPlaylist(j);
if(ax.playlist[ax.item].provider){an(ax.item);
if(ax.config.autostart.toString().toLowerCase()=="true"&&!g.isIOS()&&!ai){ad()
}return true
}else{return false
}}catch(h){V.sendEvent(d.api.events.JWPLAYER_ERROR,h)
}return false
}function U(h){if(!g.isIOS()){an(ax.item);
if(ax.config.autostart.toString().toLowerCase()=="true"&&!g.isIOS()){ad()
}}}function au(h){ao(h.fullscreen,false)
}function ap(){try{return ax.getMedia().detachMedia()
}catch(h){return null
}}function ay(){try{var j=ax.getMedia().attachMedia();
if(typeof T=="function"){T()
}}catch(h){return null
}}d.html5.controller.repeatoptions={LIST:"LIST",ALWAYS:"ALWAYS",SINGLE:"SINGLE",NONE:"NONE"};
function ae(){if(ax.state!=d.api.events.state.IDLE){return
}T=ae;
switch(ax.config.repeat.toUpperCase()){case d.html5.controller.repeatoptions.SINGLE:ad();
break;
case d.html5.controller.repeatoptions.ALWAYS:if(ax.item==ax.playlist.length-1&&!ax.config.shuffle){ab(0)
}else{az()
}break;
case d.html5.controller.repeatoptions.LIST:if(ax.item==ax.playlist.length-1&&!ax.config.shuffle){am();
an(0)
}else{az()
}break;
default:am();
break
}}var al=[];
function c(h){return function(){if(at){ah(h,arguments)
}else{al.push({method:h,arguments:arguments})
}}
}function ah(h,j){var k=[];
for(i=0;
i<j.length;
i++){k.push(j[i])
}h.apply(this,k)
}this.play=c(ad);
this.pause=c(aE);
this.seek=c(aj);
this.stop=c(am);
this.next=c(az);
this.prev=c(aa);
this.item=c(ab);
this.setVolume=c(aC);
this.setMute=c(ar);
this.resize=c(Z);
this.setFullscreen=c(ao);
this.load=c(b);
this.playerReady=aq;
this.detachMedia=ap;
this.attachMedia=ay;
this.beforePlay=function(){return ai
};
this.destroy=function(){if(ax.getMedia()){ax.getMedia().destroy()
}}
}
})(jwplayer);
(function(b){b.html5.defaultSkin=function(){this.text='<?xml version="1.0" ?><skin author="LongTail Video" name="Five" version="1.1"><components><component name="controlbar"><settings><setting name="margin" value="20"/><setting name="fontsize" value="11"/><setting name="fontcolor" value="0x000000"/></settings><layout><group position="left"><button name="play"/><divider name="divider"/><button name="prev"/><divider name="divider"/><button name="next"/><divider name="divider"/><text name="elapsed"/></group><group position="center"><slider name="time"/></group><group position="right"><text name="duration"/><divider name="divider"/><button name="blank"/><divider name="divider"/><button name="mute"/><slider name="volume"/><divider name="divider"/><button name="fullscreen"/></group></layout><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAElJREFUOI3t1LERACAMQlFgGvcfxNIhHMK4gsUvUviOmgtNsiAZkBSEKxKEnCYkkQrJn/YwbUNiSDDYRZaQRDaShv+oX9GBZEIuK+8hXVLs+/YAAAAASUVORK5CYII="/><element name="blankButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAYCAYAAAAyJzegAAAAFElEQVQYV2P8//8/AzpgHBUc7oIAGZdH0RjKN8EAAAAASUVORK5CYII="/><element name="capLeft" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAYAAAA7zJfaAAAAQElEQVQIWz3LsRGAMADDQJ0XB5bMINABZ9GENGrszxhjT2WLSqxEJG2JQrTMdV2q5LpOAvyRaVmsi7WdeZ/7+AAaOTq7BVrfOQAAAABJRU5ErkJggg=="/><element name="capRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAYAAAA7zJfaAAAAQElEQVQIWz3LsRGAMADDQJ0XB5bMINABZ9GENGrszxhjT2WLSqxEJG2JQrTMdV2q5LpOAvyRaVmsi7WdeZ/7+AAaOTq7BVrfOQAAAABJRU5ErkJggg=="/><element name="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAYCAIAAAC0rgCNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADhJREFUCB0FwcENgEAAw7Aq+893g8APUILNOQcbFRktVGqUVFRkWNz3xTa2sUaLNUosKlRUvvf5AdbWOTtzmzyWAAAAAElFTkSuQmCC"/><element name="playButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAANUlEQVR42u2RsQkAAAjD/NTTPaW6dXLrINJA1kBpGPMAjDWmOgp1HFQXx+b1KOefO4oxY57R73YnVYCQUCQAAAAASUVORK5CYII="/><element name="pauseButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAIUlEQVQ4jWNgGAWjYOiD/0gYG3/U0FFDB4Oho2AUDAYAAEwiL9HrpdMVAAAAAElFTkSuQmCC"/><element name="prevButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAQklEQVQ4y2NgGAWjYOiD/1AMA/JAfB5NjCJD/YH4PRaLyDa0H4lNNUP/DxlD59PCUBCIp3ZEwYA+NZLUKBgFgwEAAN+HLX9sB8u8AAAAAElFTkSuQmCC"/><element name="nextButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAYCAYAAAAVibZIAAAAQElEQVQ4y2NgGAWjYOiD/0B8Hojl0cT+U2ooCL8HYn9qGwrD/bQw9P+QMXQ+tSMqnpoRBUpS+tRMUqNgFAwGAADxZy1/mHvFnAAAAABJRU5ErkJggg=="/><element name="timeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAOElEQVRIDe3BwQkAIRADwAhhw/nU/kWwUK+KPITMABFh19Y+F0acY8CJvX9wYpXgRElwolSIiMf9ZWEDhtwurFsAAAAASUVORK5CYII="/><element name="timeSliderBuffer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAN0lEQVRIDe3BwQkAMQwDMBcc55mRe9zi7RR+FCwBEWG39vcfGHFm4MTuhhMlwYlVBSdKhYh43AW/LQMKm1spzwAAAABJRU5ErkJggg=="/><element name="timeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAIElEQVRIiWNgGAWjYBTQBfynMR61YCRYMApGwSigMQAAiVWPcbq6UkIAAAAASUVORK5CYII="/><element name="timeSliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAYCAYAAAA/OUfnAAAAO0lEQVQYlWP4//8/Awwz0JgDBP/BeN6Cxf/hnI2btiI4u/fsQ3AOHjqK4Jw4eQbBOX/hEoKDYjSd/AMA4cS4mfLsorgAAAAASUVORK5CYII="/><element name="muteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAJklEQVQ4y2NgGAUjDcwH4v/kaPxPikZkxcNVI9mBQ5XoGAWDFwAAsKAXKQQmfbUAAAAASUVORK5CYII="/><element name="unmuteButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAMklEQVQ4y2NgGAWDHPyntub5xBr6Hwv/Pzk2/yfVG/8psRFE25Oq8T+tQnsIaB4FVAcAi2YVysVY52AAAAAASUVORK5CYII="/><element name="volumeSliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAACVBMVEUAAACmpqampqbBXAu8AAAAAnRSTlMAgJsrThgAAAArSURBVAhbY2AgErBAyA4I2QEhOyBkB4TsYOhAoaCCUCUwDTDtMMNgRuMHAFB5FoGH5T0UAAAAAElFTkSuQmCC"/><element name="volumeSliderProgress" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAACVBMVEUAAAAAAAAAAACDY+nAAAAAAnRSTlMAgJsrThgAAAArSURBVAhbY2AgErBAyA4I2QEhOyBkB4TsYOhAoaCCUCUwDTDtMMNgRuMHAFB5FoGH5T0UAAAAAElFTkSuQmCC"/><element name="volumeSliderCapRight" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAYCAYAAAAyJzegAAAAFElEQVQYV2P8//8/AzpgHBUc7oIAGZdH0RjKN8EAAAAASUVORK5CYII="/><element name="fullscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAQklEQVRIiWNgGAWjYMiD/0iYFDmSLbDHImdPLQtgBpEiR7Zl2NijAA5oEkT/0Whi5UiyAJ8BVMsHNMtoo2AUDAIAAGdcIN3IDNXoAAAAAElFTkSuQmCC"/><element name="normalscreenButton" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAP0lEQVRIx2NgGAWjYMiD/1RSQ5QB/wmIUWzJfzx8qhj+n4DYCAY0DyJ7PBbYU8sHMEvwiZFtODXUjIJRMJgBACpWIN2ZxdPTAAAAAElFTkSuQmCC"/></elements></component><component name="display"><elements><element name="background" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAAAAAClZ7nPAAAAAnRSTlOZpuml+rYAAAASSURBVBhXY2AYJuA/GBwY6jQAyDyoK8QcL4QAAAAASUVORK5CYII="/><element name="playIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAiUlEQVR42u3XSw2AMBREURwgAQlIQAISKgUpSEFKJeCg5b0E0kWBTVcD9ySTsL0Jn9IBAAAA+K2UUrBlW/Rr5ZDoIeeuoFkxJD9ss03aIXXQqB9SttoG7ZA6qNcOKdttiwcJh9RB+iFl4SshkRBuLR72+9cvH0SOKI2HRo7x/Fi1/uoCAAAAwLsD8ki99IlO2dQAAAAASUVORK5CYII="/><element name="muteIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAVUlEQVR42u3WMQrAIAxAUW/g/SdvGmvpoOBeSHgPsjj5QTANAACARCJilIhYM0tEvJM+Ik3Id9E957kQIb+F3OdCPC0hPkQriqWx9hp/x/QGAABQyAPLB22VGrpLDgAAAABJRU5ErkJggg=="/><element name="errorIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAA/0lEQVR42u2U0QmEMBAF7cASLMESUoIlpARLSCkpwRJSgiWkhOvAXD4WsgRkyaG5DbyB+Yvg8KITAAAAAAAYk+u61mwk15EjPtlEfihmqIiZR1Qx80ghjgdUuiHXGHSVsoag0x6x8DUoyjD5KovmEJ9NTDMRPIT0mtdIUkjlonuNohO+Ha99DTmkuGgKCTcvebAzx82ZoCWC3/3aIMWSRucaxcjORSFY4xpFdjYJGp1rFGcyCYZ/RVh6AUnfcNZ2zih3/mGj1jVCdiNDwyrq1rA/xMdeEXvDVdnYc1vDc3uPkDObXrlaxbNHSOohQhr/WOeLEWfWTgAAAAAAADzNF9sHJ7PJ57MlAAAAAElFTkSuQmCC"/><element name="bufferIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACBklEQVR42u3Zv0sCYRzH8USTzOsHHEWGkC1HgaDgkktGDjUYtDQ01RDSljQ1BLU02+rk1NTm2NLq4Nx/0L/h9fnCd3j4cnZe1/U8xiO8h3uurufF0/3COd/3/0UWYiEWYiEWYiGJQ+J8xuPxKhXjEMZANinjIZhkGuVRNioE4wVURo4JkHm0xKWmhRAc1bh1EyCUw5BcBIjHiApKa4CErko6DEJwuRo6IRKzyJD8FJAyI3Zp2zRImiBcRhlfo5RtlxCcE3CcDNpGrhYIT2IhAJKilO0VRmzJ32fAMTpBTS0QMfGwlcuKMRftE0DJ0wCJdcOsCkBdXP3Mh9CEFUBTPS9mDZJBG6io4aqVzMdCokCw9H3kT6j/C/9iDdSeUMNC7DkyyxAs/Rk6Qss8FPWRZgdVtUH4DjxEn1zxh+/zj1wHlf4MQhNGrwqA6sY40U8JonRJwEQh+AO3AvCG6gHv4U7IY4krxkroWoAOkoQMGfCBrgIm+YBGqPENpIJ66CJg3x66Y0gnSUidAEEnNr9jjLiWMn5DiWP0OC/oAsCgkq43xBdGDMQr7YASP/vEkHvdl1+JOCcEV5sC4hGEOzTlPuKgd0b0xD4JkRcOgnRRTjdErkYhAsQVq6IdUuPJtmk7BCL3t/h88cx91pKQkI/pkDx6pmYTIjEoxiHsN1YWYiEWYiEWknhflZ5IErA5nr8AAAAASUVORK5CYII="/></elements></component><component name="dock"><settings><setting name="fontcolor" value="0xffffff"/></settings><elements><element name="button" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAAAAAClZ7nPAAAAAnRSTlOZpuml+rYAAAASSURBVBhXY2AYJuA/GBwY6jQAyDyoK8QcL4QAAAAASUVORK5CYII="/></elements></component><component name="playlist"><settings><setting name="backgroundcolor" value="0xe8e8e8"/></settings><elements><element name="item" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAIAAAC1nk4lAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHBJREFUaN7t2MENwCAMBEEe9N8wSKYC/D8YV7CyJoRkVtVImxkZPQInMxoP0XiIxkM0HsGbjjSNBx544IEHHnjggUe/6UQeey0PIh7XTftGxKPj4eXCtLsHHh+ZxkO0Iw8PR55Ni8ZD9Hu/EAoP0dc5RRg9qeRjVF8AAAAASUVORK5CYII="/><element name="sliderCapTop" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAHCAYAAADnCQYGAAAAFUlEQVQokWP8//8/A7UB46ihI9hQAKt6FPPXhVGHAAAAAElFTkSuQmCC"/><element name="sliderRail" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAAKElEQVQ4y2P4//8/Az68bNmy/+iYkB6GUUNHDR01dNTQUUNHDaXcUABUDOKhcxnsSwAAAABJRU5ErkJggg=="/><element name="sliderThumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAAJUlEQVQ4T2P4//8/Ay4MBP9xYbz6Rg0dNXTU0FFDRw0dNZRyQwHH4NBa7GJsXAAAAABJRU5ErkJggg=="/><element name="sliderCapBottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAHCAYAAADnCQYGAAAAFUlEQVQokWP8//8/A7UB46ihI9hQAKt6FPPXhVGHAAAAAElFTkSuQmCC"/></elements></component></components></skin>';
this.xml=null;
if(window.DOMParser){parser=new DOMParser();
this.xml=parser.parseFromString(this.text,"text/xml")
}else{this.xml=new ActiveXObject("Microsoft.XMLDOM");
this.xml.async="false";
this.xml.loadXML(this.text)
}return this
}
})(jwplayer);
(function(b){_utils=b.utils;
_css=_utils.css;
_hide=function(a){_css(a,{display:"none"})
};
_show=function(a){_css(a,{display:"block"})
};
b.html5.display=function(aL,ak){var aM={icons:true,showmute:false};
var a=_utils.extend({},aM,ak);
var aN=aL;
var Y={};
var aQ;
var az;
var aw;
var ab;
var aB;
var ai;
var aq;
var ah=!_utils.exists(aN.skin.getComponentSettings("display").bufferrotation)?15:parseInt(aN.skin.getComponentSettings("display").bufferrotation,10);
var aD=!_utils.exists(aN.skin.getComponentSettings("display").bufferinterval)?100:parseInt(aN.skin.getComponentSettings("display").bufferinterval,10);
var ar=-1;
var aA=b.api.events.state.IDLE;
var ag=true;
var aR;
var at=false,Z=true;
var aG="";
var aO=false;
var aH=false;
var aJ;
var ax,ad;
var aj=new b.html5.eventdispatcher();
_utils.extend(this,aj);
var an={display:{style:{cursor:"pointer",top:0,left:0,overflow:"hidden"},click:aI},display_icon:{style:{cursor:"pointer",position:"absolute",top:((aN.skin.getSkinElement("display","background").height-aN.skin.getSkinElement("display","playIcon").height)/2),left:((aN.skin.getSkinElement("display","background").width-aN.skin.getSkinElement("display","playIcon").width)/2),border:0,margin:0,padding:0,zIndex:3,display:"none"}},display_iconBackground:{style:{cursor:"pointer",position:"absolute",top:((az-aN.skin.getSkinElement("display","background").height)/2),left:((aQ-aN.skin.getSkinElement("display","background").width)/2),border:0,backgroundImage:(["url(",aN.skin.getSkinElement("display","background").src,")"]).join(""),width:aN.skin.getSkinElement("display","background").width,height:aN.skin.getSkinElement("display","background").height,margin:0,padding:0,zIndex:2,display:"none"}},display_image:{style:{display:"none",width:aQ,height:az,position:"absolute",cursor:"pointer",left:0,top:0,margin:0,padding:0,textDecoration:"none",zIndex:1}},display_text:{style:{zIndex:4,position:"relative",opacity:0.8,backgroundColor:parseInt("000000",16),color:parseInt("ffffff",16),textAlign:"center",fontFamily:"Arial,sans-serif",padding:"0 5px",fontSize:14}}};
aN.jwAddEventListener(b.api.events.JWPLAYER_PLAYER_STATE,aF);
aN.jwAddEventListener(b.api.events.JWPLAYER_MEDIA_MUTE,aF);
aN.jwAddEventListener(b.api.events.JWPLAYER_PLAYLIST_LOADED,af);
aN.jwAddEventListener(b.api.events.JWPLAYER_PLAYLIST_ITEM,aF);
aN.jwAddEventListener(b.api.events.JWPLAYER_ERROR,aE);
ae();
function ae(){Y.display=ao("div","display");
Y.display_text=ao("div","display_text");
Y.display.appendChild(Y.display_text);
Y.display_image=ao("img","display_image");
Y.display_image.onerror=function(c){_hide(Y.display_image)
};
Y.display_image.onload=au;
Y.display_icon=ao("div","display_icon");
Y.display_iconBackground=ao("div","display_iconBackground");
Y.display.appendChild(Y.display_image);
Y.display_iconBackground.appendChild(Y.display_icon);
Y.display.appendChild(Y.display_iconBackground);
aP();
setTimeout((function(){aH=true;
if(a.icons.toString()=="true"){al()
}}),1)
}this.getDisplayElement=function(){return Y.display
};
this.resize=function(c,d){if(aN.jwGetFullscreen()&&_utils.isMobile()){return
}_css(Y.display,{width:c,height:d});
_css(Y.display_text,{width:(c-10),top:((d-_utils.getBoundingClientRect(Y.display_text).height)/2)});
_css(Y.display_iconBackground,{top:((d-aN.skin.getSkinElement("display","background").height)/2),left:((c-aN.skin.getSkinElement("display","background").width)/2)});
if(aQ!=c||az!=d){aQ=c;
az=d;
aR=undefined;
al()
}if(!aN.jwGetFullscreen()){ax=c;
ad=d
}aS();
aF({})
};
this.show=function(){if(aO){aO=false;
aC(aN.jwGetState())
}};
this.hide=function(){if(!aO){ap();
aO=true
}};
function au(c){aw=Y.display_image.naturalWidth;
ab=Y.display_image.naturalHeight;
aS();
if(aN.jwGetState()==b.api.events.state.IDLE||aN.jwGetPlaylist()[aN.jwGetPlaylistIndex()].provider=="sound"){_css(Y.display_image,{display:"block",opacity:0});
_utils.fadeTo(Y.display_image,1,0.1)
}at=false
}function aS(){if(aN.jwGetFullscreen()&&aN.jwGetStretching()==b.utils.stretching.EXACTFIT){var c=document.createElement("div");
_utils.stretch(b.utils.stretching.UNIFORM,c,aQ,az,ax,ad);
_utils.stretch(b.utils.stretching.EXACTFIT,Y.display_image,_utils.parseDimension(c.style.width),_utils.parseDimension(c.style.height),aw,ab);
_css(Y.display_image,{left:c.style.left,top:c.style.top})
}else{_utils.stretch(aN.jwGetStretching(),Y.display_image,aQ,az,aw,ab)
}}function ao(e,d){var c=document.createElement(e);
c.id=aN.id+"_jwplayer_"+d;
_css(c,an[d].style);
return c
}function aP(){for(var c in Y){if(_utils.exists(an[c].click)){Y[c].onclick=an[c].click
}}}function aI(c){if(typeof c.preventDefault!="undefined"){c.preventDefault()
}else{c.returnValue=false
}if(typeof aJ=="function"){aJ(c);
return
}else{if(aN.jwGetState()!=b.api.events.state.PLAYING){aN.jwPlay()
}else{aN.jwPause()
}}}function aa(c){if(aq){ap();
return
}Y.display_icon.style.backgroundImage=(["url(",aN.skin.getSkinElement("display",c).src,")"]).join("");
_css(Y.display_icon,{width:aN.skin.getSkinElement("display",c).width,height:aN.skin.getSkinElement("display",c).height,top:(aN.skin.getSkinElement("display","background").height-aN.skin.getSkinElement("display",c).height)/2,left:(aN.skin.getSkinElement("display","background").width-aN.skin.getSkinElement("display",c).width)/2});
aT();
if(_utils.exists(aN.skin.getSkinElement("display",c+"Over"))){Y.display_icon.onmouseover=function(d){Y.display_icon.style.backgroundImage=["url(",aN.skin.getSkinElement("display",c+"Over").src,")"].join("")
};
Y.display_icon.onmouseout=function(d){Y.display_icon.style.backgroundImage=["url(",aN.skin.getSkinElement("display",c).src,")"].join("")
}
}else{Y.display_icon.onmouseover=null;
Y.display_icon.onmouseout=null
}}function ap(){if(a.icons.toString()=="true"){_hide(Y.display_icon);
_hide(Y.display_iconBackground);
ac()
}}function aT(){if(!aO&&a.icons.toString()=="true"){_show(Y.display_icon);
_show(Y.display_iconBackground);
al()
}}function aE(c){aq=true;
ap();
Y.display_text.innerHTML=c.message;
_show(Y.display_text);
Y.display_text.style.top=((az-_utils.getBoundingClientRect(Y.display_text).height)/2)+"px"
}function am(){Z=false;
Y.display_image.style.display="none"
}function af(){aA=""
}function aF(d){if((d.type==b.api.events.JWPLAYER_PLAYER_STATE||d.type==b.api.events.JWPLAYER_PLAYLIST_ITEM)&&aq){aq=false;
_hide(Y.display_text)
}var c=aN.jwGetState();
if(c==aA){return
}aA=c;
if(ar>=0){clearTimeout(ar)
}if(ag||aN.jwGetState()==b.api.events.state.PLAYING||aN.jwGetState()==b.api.events.state.PAUSED){aC(aN.jwGetState())
}else{ar=setTimeout(aK(aN.jwGetState()),500)
}}function aK(c){return(function(){aC(c)
})
}function aC(c){if(_utils.exists(ai)){clearInterval(ai);
ai=null;
_utils.animations.rotate(Y.display_icon,0)
}switch(c){case b.api.events.state.BUFFERING:if(_utils.isIPod()){am();
ap()
}else{if(aN.jwGetPlaylist()[aN.jwGetPlaylistIndex()].provider=="sound"){ay()
}aB=0;
ai=setInterval(function(){aB+=ah;
_utils.animations.rotate(Y.display_icon,aB%360)
},aD);
aa("bufferIcon");
ag=true
}break;
case b.api.events.state.PAUSED:if(!_utils.isIPod()){if(aN.jwGetPlaylist()[aN.jwGetPlaylistIndex()].provider!="sound"){_css(Y.display_image,{background:"transparent no-repeat center center"})
}aa("playIcon");
ag=true
}break;
case b.api.events.state.IDLE:if(aN.jwGetPlaylist()[aN.jwGetPlaylistIndex()]&&aN.jwGetPlaylist()[aN.jwGetPlaylistIndex()].image){ay()
}else{am()
}aa("playIcon");
ag=true;
break;
default:if(aN.jwGetPlaylist()[aN.jwGetPlaylistIndex()]&&aN.jwGetPlaylist()[aN.jwGetPlaylistIndex()].provider=="sound"){if(_utils.isIPod()){am();
ag=false
}else{ay()
}}else{am();
ag=false
}if(aN.jwGetMute()&&a.showmute){aa("muteIcon")
}else{ap()
}break
}ar=-1
}function ay(){if(aN.jwGetPlaylist()[aN.jwGetPlaylistIndex()]){var c=aN.jwGetPlaylist()[aN.jwGetPlaylistIndex()].image;
if(c){if(c!=aG){aG=c;
at=true;
Y.display_image.src=_utils.getAbsolutePath(c)
}else{if(!(at||Z)){Z=true;
Y.display_image.style.opacity=0;
Y.display_image.style.display="block";
_utils.fadeTo(Y.display_image,1,0.1)
}}}}}function av(c){return function(){if(!aH){return
}if(!aO&&aR!=c){aR=c;
aj.sendEvent(c,{component:"display",boundingRect:_utils.getDimensions(Y.display_iconBackground)})
}}
}var al=av(b.api.events.JWPLAYER_COMPONENT_SHOW);
var ac=av(b.api.events.JWPLAYER_COMPONENT_HIDE);
this.setAlternateClickHandler=function(c){aJ=c
};
this.revertAlternateClickHandler=function(){aJ=undefined
};
return this
}
})(jwplayer);
(function(e){var g=e.utils;
var d=g.css;
e.html5.dock=function(H,P){function c(){return{align:e.html5.view.positions.RIGHT}
}var X=g.extend({},c(),P);
if(X.align=="FALSE"){return
}var ab={};
var V=[];
var aa;
var L;
var ae=false;
var Q=false;
var ad={x:0,y:0,width:0,height:0};
var a;
var W;
var b;
var Y=new e.html5.eventdispatcher();
g.extend(this,Y);
var R=document.createElement("div");
R.id=H.id+"_jwplayer_dock";
R.style.opacity=1;
U();
H.jwAddEventListener(e.api.events.JWPLAYER_PLAYER_STATE,T);
this.getDisplayElement=function(){return R
};
this.setButton=function(h,l,k,j){if(!l&&ab[h]){g.arrays.remove(V,h);
R.removeChild(ab[h].div);
delete ab[h]
}else{if(l){if(!ab[h]){ab[h]={}
}ab[h].handler=l;
ab[h].outGraphic=k;
ab[h].overGraphic=j;
if(!ab[h].div){V.push(h);
ab[h].div=document.createElement("div");
ab[h].div.style.position="absolute";
R.appendChild(ab[h].div);
ab[h].div.appendChild(document.createElement("div"));
ab[h].div.childNodes[0].style.position="relative";
ab[h].div.childNodes[0].style.width="100%";
ab[h].div.childNodes[0].style.height="100%";
ab[h].div.childNodes[0].style.zIndex=10;
ab[h].div.childNodes[0].style.cursor="pointer";
ab[h].div.appendChild(document.createElement("img"));
ab[h].div.childNodes[1].style.position="absolute";
ab[h].div.childNodes[1].style.left=0;
ab[h].div.childNodes[1].style.top=0;
if(H.skin.getSkinElement("dock","button")){ab[h].div.childNodes[1].src=H.skin.getSkinElement("dock","button").src
}ab[h].div.childNodes[1].style.zIndex=9;
ab[h].div.childNodes[1].style.cursor="pointer";
ab[h].div.onmouseover=function(){if(ab[h].overGraphic){ab[h].div.childNodes[0].style.background=ac(ab[h].overGraphic)
}if(H.skin.getSkinElement("dock","buttonOver")){ab[h].div.childNodes[1].src=H.skin.getSkinElement("dock","buttonOver").src
}};
ab[h].div.onmouseout=function(){if(ab[h].outGraphic){ab[h].div.childNodes[0].style.background=ac(ab[h].outGraphic)
}if(H.skin.getSkinElement("dock","button")){ab[h].div.childNodes[1].src=H.skin.getSkinElement("dock","button").src
}};
if(H.skin.getSkinElement("dock","button")){ab[h].div.childNodes[1].src=H.skin.getSkinElement("dock","button").src
}}if(ab[h].outGraphic){ab[h].div.childNodes[0].style.background=ac(ab[h].outGraphic)
}else{if(ab[h].overGraphic){ab[h].div.childNodes[0].style.background=ac(ab[h].overGraphic)
}}if(l){ab[h].div.onclick=function(m){m.preventDefault();
e(H.id).callback(h);
if(ab[h].overGraphic){ab[h].div.childNodes[0].style.background=ac(ab[h].overGraphic)
}if(H.skin.getSkinElement("dock","button")){ab[h].div.childNodes[1].src=H.skin.getSkinElement("dock","button").src
}}
}}}Z(aa,L)
};
function ac(h){return"url("+h+") no-repeat center center"
}function N(h){}function Z(v,j){U();
if(V.length>0){var u=10;
var k=u;
var n=-1;
var m=H.skin.getSkinElement("dock","button").height;
var o=H.skin.getSkinElement("dock","button").width;
var q=v-o-u;
var l,r;
if(X.align==e.html5.view.positions.LEFT){n=1;
q=u
}for(var t=0;
t<V.length;
t++){var h=Math.floor(k/j);
if((k+m+u)>((h+1)*j)){k=((h+1)*j)+u;
h=Math.floor(k/j)
}var s=ab[V[t]].div;
s.style.top=(k%j)+"px";
s.style.left=(q+(H.skin.getSkinElement("dock","button").width+u)*h*n)+"px";
var p={x:g.parseDimension(s.style.left),y:g.parseDimension(s.style.top),width:o,height:m};
if(!l||(p.x<=l.x&&p.y<=l.y)){l=p
}if(!r||(p.x>=r.x&&p.y>=r.y)){r=p
}s.style.width=o+"px";
s.style.height=m+"px";
k+=H.skin.getSkinElement("dock","button").height+u
}ad={x:l.x,y:l.y,width:r.x-l.x+r.width,height:l.y-r.y+r.height}
}if(Q!=H.jwGetFullscreen()||aa!=v||L!=j){aa=v;
L=j;
Q=H.jwGetFullscreen();
a=undefined;
setTimeout(O,1)
}}function ag(h){return function(){if(!ae&&a!=h&&V.length>0){a=h;
Y.sendEvent(h,{component:"dock",boundingRect:ad})
}}
}function T(h){if(g.isMobile()){if(h.newstate==e.api.events.state.IDLE){I()
}else{af()
}}else{S()
}}function S(h){if(ae){return
}clearTimeout(b);
if(P.position==e.html5.view.positions.OVER||H.jwGetFullscreen()){switch(H.jwGetState()){case e.api.events.state.PAUSED:case e.api.events.state.IDLE:if(R&&R.style.opacity<1&&(!P.idlehide||g.exists(h))){M()
}if(P.idlehide){b=setTimeout(function(){K()
},2000)
}break;
default:if(g.exists(h)){M()
}b=setTimeout(function(){K()
},2000);
break
}}else{M()
}}var O=ag(e.api.events.JWPLAYER_COMPONENT_SHOW);
var J=ag(e.api.events.JWPLAYER_COMPONENT_HIDE);
this.resize=Z;
var I=function(){d(R,{display:"block"});
if(ae){ae=false;
O()
}};
var af=function(){d(R,{display:"none"});
if(!ae){J();
ae=true
}};
function K(){if(!ae){J();
if(R.style.opacity==1){g.cancelAnimation(R);
g.fadeTo(R,0,0.1,1,0)
}}}function M(){if(!ae){O();
if(R.style.opacity==0){g.cancelAnimation(R);
g.fadeTo(R,1,0.1,0,0)
}}}function U(){try{W=document.getElementById(H.id);
W.addEventListener("mousemove",S)
}catch(h){g.log("Could not add mouse listeners to dock: "+h)
}}this.hide=af;
this.show=I;
return this
}
})(jwplayer);
(function(b){b.html5.eventdispatcher=function(e,a){var g=new b.events.eventdispatcher(a);
b.utils.extend(this,g);
this.sendEvent=function(d,c){if(!b.utils.exists(c)){c={}
}b.utils.extend(c,{id:e,version:b.version,type:d});
g.sendEvent(d,c)
}
}
})(jwplayer);
(function(d){var c=d.utils;
d.html5.instream=function(K,af,M,a){var U={controlbarseekable:"always",controlbarpausable:true,controlbarstoppable:true,playlistclickable:true};
var Q,ac,X=K,T=af,ai=M,O=a,Y,N,ad,P,am,al,ak,ag,aa,aj=false,ah,an,ae=this;
this.load=function(h,g){ao();
aj=true;
ac=c.extend(U,g);
Q=d.html5.playlistitem(h);
S();
an=document.createElement("div");
an.id=ae.id+"_instream_container";
O.detachMedia();
Y=ak.getDisplayElement();
al=T.playlist[T.item];
am=X.jwGetState();
if(am==d.api.events.state.BUFFERING||am==d.api.events.state.PLAYING){Y.pause()
}N=Y.src?Y.src:Y.currentSrc;
ad=Y.innerHTML;
P=Y.currentTime;
aa=new d.html5.display(ae,c.extend({},T.plugins.config.display));
aa.setAlternateClickHandler(function(j){if(_fakemodel.state==d.api.events.state.PAUSED){ae.jwInstreamPlay()
}else{V(d.api.events.JWPLAYER_INSTREAM_CLICK,j)
}});
an.appendChild(aa.getDisplayElement());
if(!c.isMobile()){ag=new d.html5.controlbar(ae,c.extend({},T.plugins.config.controlbar,{}));
if(T.plugins.config.controlbar.position==d.html5.view.positions.OVER){an.appendChild(ag.getDisplayElement())
}else{var e=T.plugins.object.controlbar.getDisplayElement().parentNode;
e.appendChild(ag.getDisplayElement())
}}ai.setupInstream(an,Y);
ab();
ak.load(Q)
};
this.jwInstreamDestroy=function(g){if(!aj){return
}aj=false;
if(am!=d.api.events.state.IDLE){ak.load(al,false);
ak.stop(false)
}else{ak.stop(true)
}ak.detachMedia();
ai.destroyInstream();
if(ag){try{ag.getDisplayElement().parentNode.removeChild(ag.getDisplayElement())
}catch(e){}}V(d.api.events.JWPLAYER_INSTREAM_DESTROYED,{reason:(g?"complete":"destroyed")},true);
O.attachMedia();
if(am==d.api.events.state.BUFFERING||am==d.api.events.state.PLAYING){Y.play();
if(T.playlist[T.item]==al){T.getMedia().seek(P)
}}return
};
this.jwInstreamAddEventListener=function(g,e){ah.addEventListener(g,e)
};
this.jwInstreamRemoveEventListener=function(g,e){ah.removeEventListener(g,e)
};
this.jwInstreamPlay=function(){if(!aj){return
}ak.play(true)
};
this.jwInstreamPause=function(){if(!aj){return
}ak.pause(true)
};
this.jwInstreamSeek=function(e){if(!aj){return
}ak.seek(e)
};
this.jwInstreamGetState=function(){if(!aj){return undefined
}return _fakemodel.state
};
this.jwInstreamGetPosition=function(){if(!aj){return undefined
}return _fakemodel.position
};
this.jwInstreamGetDuration=function(){if(!aj){return undefined
}return _fakemodel.duration
};
this.playlistClickable=function(){return(!aj||ac.playlistclickable.toString().toLowerCase()=="true")
};
function W(){_fakemodel=new d.html5.model(this,T.getMedia()?T.getMedia().getDisplayElement():T.container,T);
ah=new d.html5.eventdispatcher();
X.jwAddEventListener(d.api.events.JWPLAYER_RESIZE,ab);
X.jwAddEventListener(d.api.events.JWPLAYER_FULLSCREEN,ab)
}function ao(){_fakemodel.setMute(T.mute);
_fakemodel.setVolume(T.volume)
}function S(){if(!ak){ak=new d.html5.mediavideo(_fakemodel,T.getMedia()?T.getMedia().getDisplayElement():T.container);
ak.addGlobalListener(L);
ak.addEventListener(d.api.events.JWPLAYER_MEDIA_META,b);
ak.addEventListener(d.api.events.JWPLAYER_MEDIA_COMPLETE,R);
ak.addEventListener(d.api.events.JWPLAYER_MEDIA_BUFFER_FULL,Z)
}ak.attachMedia()
}function L(e){if(aj){V(e.type,e)
}}function Z(e){if(aj){ak.play()
}}function R(e){if(aj){setTimeout(function(){ae.jwInstreamDestroy(true)
},10)
}}function b(e){if(e.metadata.width&&e.metadata.height){ai.resizeMedia()
}}function V(g,e,h){if(aj||h){ah.sendEvent(g,e)
}}function ab(){var g=T.plugins.object.display.getDisplayElement().style;
if(ag){var e=T.plugins.object.controlbar.getDisplayElement().style;
ag.resize(c.parseDimension(g.width),c.parseDimension(g.height));
_css(ag.getDisplayElement(),c.extend({},e,{zIndex:1001,opacity:1}))
}if(aa){aa.resize(c.parseDimension(g.width),c.parseDimension(g.height));
_css(aa.getDisplayElement(),c.extend({},g,{zIndex:1000}))
}if(ai){ai.resizeMedia()
}}this.jwPlay=function(e){if(ac.controlbarpausable.toString().toLowerCase()=="true"){this.jwInstreamPlay()
}};
this.jwPause=function(e){if(ac.controlbarpausable.toString().toLowerCase()=="true"){this.jwInstreamPause()
}};
this.jwStop=function(){if(ac.controlbarstoppable.toString().toLowerCase()=="true"){this.jwInstreamDestroy();
X.jwStop()
}};
this.jwSeek=function(e){switch(ac.controlbarseekable.toLowerCase()){case"always":this.jwInstreamSeek(e);
break;
case"backwards":if(_fakemodel.position>e){this.jwInstreamSeek(e)
}break
}};
this.jwGetPosition=function(){};
this.jwGetDuration=function(){};
this.jwGetWidth=X.jwGetWidth;
this.jwGetHeight=X.jwGetHeight;
this.jwGetFullscreen=X.jwGetFullscreen;
this.jwSetFullscreen=X.jwSetFullscreen;
this.jwGetVolume=function(){return T.volume
};
this.jwSetVolume=function(e){ak.volume(e);
X.jwSetVolume(e)
};
this.jwGetMute=function(){return T.mute
};
this.jwSetMute=function(e){ak.mute(e);
X.jwSetMute(e)
};
this.jwGetState=function(){return _fakemodel.state
};
this.jwGetPlaylist=function(){return[Q]
};
this.jwGetPlaylistIndex=function(){return 0
};
this.jwGetStretching=function(){return T.config.stretching
};
this.jwAddEventListener=function(e,g){ah.addEventListener(e,g)
};
this.jwRemoveEventListener=function(e,g){ah.removeEventListener(e,g)
};
this.skin=X.skin;
this.id=X.id+"_instream";
W();
return this
}
})(jwplayer);
(function(d){var c={prefix:"",file:"",link:"",linktarget:"_top",margin:8,out:0.5,over:1,timeout:5,hide:true,position:"bottom-left"};
_css=d.utils.css;
d.html5.logo=function(A,w){var x=A;
var a;
var J;
var b;
var F=false;
G();
function G(){z();
x.jwAddEventListener(d.api.events.JWPLAYER_PLAYER_STATE,E);
K();
C()
}function z(){if(c.prefix){var g=A.version.split(/\W/).splice(0,2).join("/");
if(c.prefix.indexOf(g)<0){c.prefix+=g+"/"
}}if(w.position==d.html5.view.positions.OVER){w.position=c.position
}try{if(window.location.href.indexOf("https")==0){c.prefix=c.prefix.replace("http://l.longtailvideo.com","https://securel.longtailvideo.com")
}}catch(e){}J=d.utils.extend({},c,w)
}function K(){b=document.createElement("img");
b.id=x.id+"_jwplayer_logo";
b.style.display="none";
b.onload=function(e){_css(b,D());
y()
};
if(!J.file){return
}if(J.file.indexOf("/")>=0){b.src=J.file
}else{b.src=J.prefix+J.file
}}if(!J.file){return
}this.resize=function(e,g){};
this.getDisplayElement=function(){return b
};
function C(){if(J.link){b.onmouseover=H;
b.onmouseout=y;
b.onclick=v
}else{this.mouseEnabled=false
}}function v(e){if(typeof e!="undefined"){e.stopPropagation()
}if(!F){return
}x.jwPause();
x.jwSetFullscreen(false);
if(J.link){window.open(J.link,J.linktarget)
}return
}function y(e){if(J.link&&F){b.style.opacity=J.out
}return
}function H(e){if(F){b.style.opacity=J.over
}return
}function D(){var e={textDecoration:"none",position:"absolute",cursor:"pointer"};
e.display=(J.hide.toString()=="true"&&!F)?"none":"block";
var g=J.position.toLowerCase().split("-");
for(var h in g){e[g[h]]=parseInt(J.margin)
}return e
}function B(){if(J.hide.toString()=="true"){b.style.display="block";
b.style.opacity=0;
d.utils.fadeTo(b,J.out,0.1,parseFloat(b.style.opacity));
a=setTimeout(function(){I()
},J.timeout*1000)
}F=true
}function I(){F=false;
if(J.hide.toString()=="true"){d.utils.fadeTo(b,0,0.1,parseFloat(b.style.opacity))
}}function E(e){if(e.newstate==d.api.events.state.BUFFERING){clearTimeout(a);
B()
}}return this
}
})(jwplayer);
(function(h){var n={ended:h.api.events.state.IDLE,playing:h.api.events.state.PLAYING,pause:h.api.events.state.PAUSED,buffering:h.api.events.state.BUFFERING};
var l=h.utils;
var j=l.isMobile();
var k,m;
var o={};
h.html5.mediavideo=function(aE,af){var ab={abort:an,canplay:ax,canplaythrough:ax,durationchange:ar,emptied:an,ended:ax,error:ay,loadeddata:ar,loadedmetadata:ar,loadstart:ax,pause:ax,play:an,playing:ax,progress:ah,ratechange:an,seeked:ax,seeking:ax,stalled:ax,suspend:ax,timeupdate:X,volumechange:aB,waiting:ax,canshowcurrentframe:an,dataunavailable:an,empty:an,load:aF,loadedfirstframe:an,webkitfullscreenchange:aC};
var aj={};
var aa=new h.html5.eventdispatcher();
l.extend(this,aa);
var aD=aE,ak=af,aA,aG,ai,a,ag,Y,Z=false,at=false,ao=false,ac,ae,d;
c();
this.load=function(r,q){if(typeof q=="undefined"){q=true
}if(!at){return
}a=r;
ao=(a.duration>0);
aD.duration=a.duration;
l.empty(aA);
aA.style.display="block";
aA.style.opacity=1;
if(k&&m){aA.style.width=k;
aA.style.height=m;
k=_previousHieght=0
}d=0;
aw(r.levels);
if(r.levels&&r.levels.length>0){if(r.levels.length==1||l.isIOS()){aA.src=r.levels[0].file
}else{if(aA.src){aA.removeAttribute("src")
}for(var s=0;
s<r.levels.length;
s++){var p=aA.ownerDocument.createElement("source");
p.src=r.levels[s].file;
aA.appendChild(p);
d++
}}}else{aA.src=r.file
}aA.volume=aD.volume/100;
aA.muted=aD.mute;
if(j){e()
}ac=ae=ai=false;
aD.buffer=0;
if(!l.exists(r.start)){r.start=0
}Y=(r.start>0)?r.start:-1;
au(h.api.events.JWPLAYER_MEDIA_LOADED);
if((!j&&r.levels.length==1)||!Z){aA.load()
}Z=false;
if(q){ap(h.api.events.state.BUFFERING);
au(h.api.events.JWPLAYER_MEDIA_BUFFER,{bufferPercent:0});
al()
}if(aA.videoWidth>0&&aA.videoHeight>0){ar()
}};
this.play=function(){if(!at){return
}al();
if(ae){ap(h.api.events.state.PLAYING)
}else{aA.load();
ap(h.api.events.state.BUFFERING)
}aA.play()
};
this.pause=function(){if(!at){return
}aA.pause();
ap(h.api.events.state.PAUSED)
};
this.seek=function(p){if(!at){return
}if(!ai&&aA.readyState>0){if(!(aD.duration<=0||isNaN(aD.duration))&&!(aD.position<=0||isNaN(aD.position))){aA.currentTime=p;
aA.play()
}}else{Y=p
}};
var am=this.stop=function(s){if(!at){return
}if(!l.exists(s)){s=true
}av();
if(s){ae=false;
var r=navigator.userAgent;
if(aA.webkitSupportsFullscreen){try{aA.webkitExitFullscreen()
}catch(q){}}aA.style.opacity=0;
aq();
if(l.isIE()){aA.src=""
}else{aA.removeAttribute("src")
}l.empty(aA);
aA.load();
Z=true
}if(l.isIPod()){k=aA.style.width;
m=aA.style.height;
aA.style.width=0;
aA.style.height=0
}else{if(l.isIPad()){aA.style.display="none";
try{aA.webkitExitFullscreen()
}catch(p){}}}ap(h.api.events.state.IDLE)
};
this.fullscreen=function(p){if(p===true){this.resize("100%","100%")
}else{this.resize(aD.config.width,aD.config.height)
}};
this.resize=function(p,q){};
this.volume=function(p){if(!j){aA.volume=p/100;
au(h.api.events.JWPLAYER_MEDIA_VOLUME,{volume:(p/100)})
}};
this.mute=function(p){if(!j){aA.muted=p;
au(h.api.events.JWPLAYER_MEDIA_MUTE,{mute:p})
}};
this.getDisplayElement=function(){return aA
};
this.hasChrome=function(){return j&&(aG==h.api.events.state.PLAYING)
};
this.detachMedia=function(){at=false;
return this.getDisplayElement()
};
this.attachMedia=function(){at=true
};
this.destroy=function(){if(aA&&aA.parentNode){av();
for(var p in ab){aA.removeEventListener(p,ad(p,ab[p]),true)
}l.empty(aA);
ak=aA.parentNode;
aA.parentNode.removeChild(aA);
delete o[aD.id];
aA=null
}};
function ad(p,q){if(aj[p]){return aj[p]
}else{aj[p]=function(r){if(l.exists(r.target.parentNode)){q(r)
}};
return aj[p]
}}function c(){aG=h.api.events.state.IDLE;
at=true;
aA=az();
aA.setAttribute("x-webkit-airplay","allow");
if(ak.parentNode){aA.id=ak.id;
ak.parentNode.replaceChild(aA,ak)
}}function az(){var q=o[aD.id];
if(!q){if(ak.tagName.toLowerCase()=="video"){q=ak
}else{q=document.createElement("video")
}o[aD.id]=q;
if(!q.id){q.id=ak.id
}}for(var p in ab){q.addEventListener(p,ad(p,ab[p]),true)
}return q
}function ap(q){if(q==h.api.events.state.PAUSED&&aG==h.api.events.state.IDLE){return
}if(j){switch(q){case h.api.events.state.PLAYING:e();
break;
case h.api.events.state.BUFFERING:case h.api.events.state.PAUSED:aq();
break
}}if(aG!=q){var p=aG;
aD.state=aG=q;
au(h.api.events.JWPLAYER_PLAYER_STATE,{oldstate:p,newstate:q})
}}function an(p){}function aB(q){var p=Math.round(aA.volume*100);
au(h.api.events.JWPLAYER_MEDIA_VOLUME,{volume:p},true);
au(h.api.events.JWPLAYER_MEDIA_MUTE,{mute:aA.muted},true)
}function ah(p){if(!at){return
}var q;
if(l.exists(p)&&p.lengthComputable&&p.total){q=p.loaded/p.total*100
}else{if(l.exists(aA.buffered)&&(aA.buffered.length>0)){var r=aA.buffered.length-1;
if(r>=0){q=aA.buffered.end(r)/aA.duration*100
}}}if(l.useNativeFullscreen()&&l.exists(aA.webkitDisplayingFullscreen)){if(aD.fullscreen!=aA.webkitDisplayingFullscreen){au(h.api.events.JWPLAYER_FULLSCREEN,{fullscreen:aA.webkitDisplayingFullscreen},true)
}}if(ae===false&&aG==h.api.events.state.BUFFERING){au(h.api.events.JWPLAYER_MEDIA_BUFFER_FULL);
ae=true
}if(!ac){if(q==100){ac=true
}if(l.exists(q)&&(q>aD.buffer)){aD.buffer=Math.round(q);
au(h.api.events.JWPLAYER_MEDIA_BUFFER,{bufferPercent:Math.round(q)})
}}}function X(p){if(!at){return
}if(l.exists(p)&&l.exists(p.target)){if(ao>0){if(!isNaN(p.target.duration)&&(isNaN(aD.duration)||aD.duration<1)){if(p.target.duration==Infinity){aD.duration=0
}else{aD.duration=Math.round(p.target.duration*10)/10
}}}if(!ai&&aA.readyState>0){ap(h.api.events.state.PLAYING)
}if(aG==h.api.events.state.PLAYING){if(aA.readyState>0&&(Y>-1||!ai)){ai=true;
try{if(aA.currentTime!=Y&&Y>-1){aA.currentTime=Y;
Y=-1
}}catch(q){}aA.volume=aD.volume/100;
aA.muted=aD.mute
}aD.position=aD.duration>0?(Math.round(p.target.currentTime*10)/10):0;
au(h.api.events.JWPLAYER_MEDIA_TIME,{position:aD.position,duration:aD.duration});
if(aD.position>=aD.duration&&(aD.position>0||aD.duration>0)){g();
return
}}}ah(p)
}function aF(p){}function ax(p){if(!at){return
}if(k&&m){aA.style.width=k;
aA.style.height=m;
k=_previousHieght=0
}if(n[p.type]){if(p.type=="ended"){g()
}else{ap(n[p.type])
}}}function ar(q){if(!at){return
}var r=Math.round(aA.duration*10)/10;
var p={height:aA.videoHeight,width:aA.videoWidth,duration:r};
if(!ao){if((aD.duration<r||isNaN(aD.duration))&&aA.duration!=Infinity){aD.duration=r
}}au(h.api.events.JWPLAYER_MEDIA_META,{metadata:p})
}function ay(p){if(!at){return
}if(aG==h.api.events.state.IDLE){return
}var q="There was an error: ";
if((p.target.error&&p.target.tagName.toLowerCase()=="video")||p.target.parentNode.error&&p.target.parentNode.tagName.toLowerCase()=="video"){var r=!l.exists(p.target.error)?p.target.parentNode.error:p.target.error;
switch(r.code){case r.MEDIA_ERR_ABORTED:l.log("User aborted the video playback.");
return;
case r.MEDIA_ERR_NETWORK:q="A network error caused the video download to fail part-way: ";
break;
case r.MEDIA_ERR_DECODE:q="The video playback was aborted due to a corruption problem or because the video used features your browser did not support: ";
break;
case r.MEDIA_ERR_SRC_NOT_SUPPORTED:q="The video could not be loaded, either because the server or network failed or because the format is not supported: ";
break;
default:q="An unknown error occurred: ";
break
}}else{if(p.target.tagName.toLowerCase()=="source"){d--;
if(d>0){return
}if(l.userAgentMatch(/firefox/i)){l.log("The video could not be loaded, either because the server or network failed or because the format is not supported.");
am(false);
return
}else{q="The video could not be loaded, either because the server or network failed or because the format is not supported: "
}}else{l.log("An unknown error occurred.  Continuing...");
return
}}am(false);
q+=b();
_error=true;
au(h.api.events.JWPLAYER_ERROR,{message:q});
return
}function b(){var q="";
for(var r in a.levels){var s=a.levels[r];
var p=ak.ownerDocument.createElement("source");
q+=h.utils.getAbsolutePath(s.file);
if(r<(a.levels.length-1)){q+=", "
}}return q
}function al(){if(!l.exists(ag)){ag=setInterval(function(){ah()
},100)
}}function av(){clearInterval(ag);
ag=null
}function g(){if(aG==h.api.events.state.PLAYING){am(false);
au(h.api.events.JWPLAYER_MEDIA_BEFORECOMPLETE);
au(h.api.events.JWPLAYER_MEDIA_COMPLETE)
}}function aC(p){if(l.exists(aA.webkitDisplayingFullscreen)){if(aD.fullscreen&&!aA.webkitDisplayingFullscreen){au(h.api.events.JWPLAYER_FULLSCREEN,{fullscreen:false},true)
}}}function aw(q){if(q.length>0&&l.userAgentMatch(/Safari/i)&&!l.userAgentMatch(/Chrome/i)){var s=-1;
for(var r=0;
r<q.length;
r++){switch(l.extension(q[r].file)){case"mp4":if(s<0){s=r
}break;
case"webm":q.splice(r,1);
break
}}if(s>0){var p=q.splice(s,1)[0];
q.unshift(p)
}}}function e(){setTimeout(function(){aA.setAttribute("controls","controls")
},100)
}function aq(){setTimeout(function(){aA.removeAttribute("controls")
},250)
}function au(r,p,q){if(at||q){if(p){aa.sendEvent(r,p)
}else{aa.sendEvent(r)
}}}}
})(jwplayer);
(function(e){var g={ended:e.api.events.state.IDLE,playing:e.api.events.state.PLAYING,pause:e.api.events.state.PAUSED,buffering:e.api.events.state.BUFFERING};
var d=e.utils.css;
e.html5.mediayoutube=function(r,v){var u=new e.html5.eventdispatcher();
e.utils.extend(this,u);
var p=r;
var s=document.getElementById(v.id);
var t=e.api.events.state.IDLE;
var b,c;
function q(j){if(t!=j){var h=t;
p.state=j;
t=j;
u.sendEvent(e.api.events.JWPLAYER_PLAYER_STATE,{oldstate:h,newstate:j})
}}this.getDisplayElement=this.detachMedia=function(){return s
};
this.attachMedia=function(){};
this.play=function(){if(t==e.api.events.state.IDLE){u.sendEvent(e.api.events.JWPLAYER_MEDIA_BUFFER,{bufferPercent:100});
u.sendEvent(e.api.events.JWPLAYER_MEDIA_BUFFER_FULL);
q(e.api.events.state.PLAYING)
}else{if(t==e.api.events.state.PAUSED){q(e.api.events.state.PLAYING)
}}};
this.pause=function(){q(e.api.events.state.PAUSED)
};
this.seek=function(h){};
this.stop=function(h){if(!_utils.exists(h)){h=true
}p.position=0;
q(e.api.events.state.IDLE);
if(h){d(s,{display:"none"})
}};
this.volume=function(h){p.setVolume(h);
u.sendEvent(e.api.events.JWPLAYER_MEDIA_VOLUME,{volume:Math.round(h)})
};
this.mute=function(h){s.muted=h;
u.sendEvent(e.api.events.JWPLAYER_MEDIA_MUTE,{mute:h})
};
this.resize=function(h,j){if(h*j>0&&b){b.width=c.width=h;
b.height=c.height=j
}};
this.fullscreen=function(h){if(h===true){this.resize("100%","100%")
}else{this.resize(p.config.width,p.config.height)
}};
this.load=function(h){a(h);
d(b,{display:"block"});
q(e.api.events.state.BUFFERING);
u.sendEvent(e.api.events.JWPLAYER_MEDIA_BUFFER,{bufferPercent:0});
u.sendEvent(e.api.events.JWPLAYER_MEDIA_LOADED);
this.play()
};
this.hasChrome=function(){return(t!=e.api.events.state.IDLE)
};
function a(h){var l=h.levels[0].file;
l=["http://www.youtube.com/v/",w(l),"&amp;hl=en_US&amp;fs=1&autoplay=1"].join("");
b=document.createElement("object");
b.id=s.id;
b.style.position="absolute";
var j={movie:l,allowfullscreen:"true",allowscriptaccess:"always"};
for(var o in j){var k=document.createElement("param");
k.name=o;
k.value=j[o];
b.appendChild(k)
}c=document.createElement("embed");
b.appendChild(c);
var n={src:l,type:"application/x-shockwave-flash",allowfullscreen:"true",allowscriptaccess:"always",width:b.width,height:b.height};
for(var m in n){c.setAttribute(m,n[m])
}b.appendChild(c);
b.style.zIndex=2147483000;
if(s!=b&&s.parentNode){s.parentNode.replaceChild(b,s)
}s=b
}function w(k){var l=k.split(/\?|\#\!/);
var h="";
for(var j=0;
j<l.length;
j++){if(l[j].substr(0,2)=="v="){h=l[j].substr(2)
}}if(h==""){if(k.indexOf("/v/")>=0){h=k.substr(k.indexOf("/v/")+3)
}else{if(k.indexOf("youtu.be")>=0){h=k.substr(k.indexOf("youtu.be/")+9)
}else{h=k
}}}if(h.indexOf("?")>-1){h=h.substr(0,h.indexOf("?"))
}if(h.indexOf("&")>-1){h=h.substr(0,h.indexOf("&"))
}return h
}this.embed=c;
return this
}
})(jwplayer);
(function(jwplayer){var _configurableStateVariables=["width","height","start","duration","volume","mute","fullscreen","item","plugins","stretching"];
var _utils=jwplayer.utils;
jwplayer.html5.model=function(api,container,options){var _api=api;
var _container=container;
var _cookies=_utils.getCookies();
var _model={id:_container.id,playlist:[],state:jwplayer.api.events.state.IDLE,position:0,buffer:0,container:_container,config:{width:480,height:320,item:-1,skin:undefined,file:undefined,image:undefined,start:0,duration:0,bufferlength:5,volume:_cookies.volume?_cookies.volume:90,mute:_cookies.mute&&_cookies.mute.toString().toLowerCase()=="true"?true:false,fullscreen:false,repeat:"",stretching:jwplayer.utils.stretching.UNIFORM,autostart:false,debug:undefined,screencolor:undefined}};
var _media;
var _eventDispatcher=new jwplayer.html5.eventdispatcher();
var _components=["display","logo","controlbar","playlist","dock"];
jwplayer.utils.extend(_model,_eventDispatcher);
for(var option in options){if(typeof options[option]=="string"){var type=/color$/.test(option)?"color":null;
options[option]=jwplayer.utils.typechecker(options[option],type)
}var config=_model.config;
var path=option.split(".");
for(var edge in path){if(edge==path.length-1){config[path[edge]]=options[option]
}else{if(!jwplayer.utils.exists(config[path[edge]])){config[path[edge]]={}
}config=config[path[edge]]
}}}for(var index in _configurableStateVariables){var configurableStateVariable=_configurableStateVariables[index];
_model[configurableStateVariable]=_model.config[configurableStateVariable]
}var pluginorder=_components.concat([]);
if(jwplayer.utils.exists(_model.plugins)){if(typeof _model.plugins=="string"){var userplugins=_model.plugins.split(",");
for(var userplugin in userplugins){if(typeof userplugins[userplugin]=="string"){pluginorder.push(userplugins[userplugin].replace(/^\s+|\s+$/g,""))
}}}}if(jwplayer.utils.isMobile()){pluginorder=["display","logo","dock","playlist"];
if(!jwplayer.utils.exists(_model.config.repeat)){_model.config.repeat="list"
}}else{if(_model.config.chromeless){pluginorder=["logo","dock","playlist"];
if(!jwplayer.utils.exists(_model.config.repeat)){_model.config.repeat="list"
}}}_model.plugins={order:pluginorder,config:{},object:{}};
if(typeof _model.config.components!="undefined"){for(var component in _model.config.components){_model.plugins.config[component]=_model.config.components[component]
}}var playlistVisible=false;
for(var pluginIndex in _model.plugins.order){var pluginName=_model.plugins.order[pluginIndex];
var pluginConfig=!jwplayer.utils.exists(_model.plugins.config[pluginName])?{}:_model.plugins.config[pluginName];
_model.plugins.config[pluginName]=!jwplayer.utils.exists(_model.plugins.config[pluginName])?pluginConfig:jwplayer.utils.extend(_model.plugins.config[pluginName],pluginConfig);
if(!jwplayer.utils.exists(_model.plugins.config[pluginName].position)){if(pluginName=="playlist"){_model.plugins.config[pluginName].position=jwplayer.html5.view.positions.NONE
}else{_model.plugins.config[pluginName].position=jwplayer.html5.view.positions.OVER
}}else{if(pluginName=="playlist"){playlistVisible=true
}_model.plugins.config[pluginName].position=_model.plugins.config[pluginName].position.toString().toUpperCase()
}}if(_model.plugins.config.controlbar&&playlistVisible){_model.plugins.config.controlbar.hideplaylistcontrols=true
}if(typeof _model.plugins.config.dock!="undefined"){if(typeof _model.plugins.config.dock!="object"){var position=_model.plugins.config.dock.toString().toUpperCase();
_model.plugins.config.dock={position:position}
}if(typeof _model.plugins.config.dock.position!="undefined"){_model.plugins.config.dock.align=_model.plugins.config.dock.position;
_model.plugins.config.dock.position=jwplayer.html5.view.positions.OVER
}if(typeof _model.plugins.config.dock.idlehide=="undefined"){try{_model.plugins.config.dock.idlehide=_model.plugins.config.controlbar.idlehide
}catch(e){}}}function _loadExternal(playlistfile){var loader=new jwplayer.html5.playlistloader();
loader.addEventListener(jwplayer.api.events.JWPLAYER_PLAYLIST_LOADED,function(evt){_model.playlist=new jwplayer.html5.playlist(evt);
_loadComplete(true)
});
loader.addEventListener(jwplayer.api.events.JWPLAYER_ERROR,function(evt){_model.playlist=new jwplayer.html5.playlist({playlist:[]});
_loadComplete(false)
});
loader.load(playlistfile)
}function _loadComplete(){if(_model.config.shuffle){_model.item=_getShuffleItem()
}else{if(_model.config.item>=_model.playlist.length){_model.config.item=_model.playlist.length-1
}else{if(_model.config.item<0){_model.config.item=0
}}_model.item=_model.config.item
}_model.position=0;
_model.duration=_model.playlist.length>0?_model.playlist[_model.item].duration:0;
_eventDispatcher.sendEvent(jwplayer.api.events.JWPLAYER_PLAYLIST_LOADED,{playlist:_model.playlist});
_eventDispatcher.sendEvent(jwplayer.api.events.JWPLAYER_PLAYLIST_ITEM,{index:_model.item})
}_model.loadPlaylist=function(arg){var input;
if(typeof arg=="string"){if(arg.indexOf("[")==0||arg.indexOf("{")=="0"){try{input=eval(arg)
}catch(err){input=arg
}}else{input=arg
}}else{input=arg
}var config;
switch(jwplayer.utils.typeOf(input)){case"object":config=input;
break;
case"array":config={playlist:input};
break;
default:config={file:input};
break
}_model.playlist=new jwplayer.html5.playlist(config);
_model.item=_model.config.item>=0?_model.config.item:0;
if(!_model.playlist[0].provider&&_model.playlist[0].file){_loadExternal(_model.playlist[0].file)
}else{_loadComplete()
}};
function _getShuffleItem(){var result=null;
if(_model.playlist.length>1){while(!jwplayer.utils.exists(result)){result=Math.floor(Math.random()*_model.playlist.length);
if(result==_model.item){result=null
}}}else{result=0
}return result
}function forward(evt){switch(evt.type){case jwplayer.api.events.JWPLAYER_MEDIA_LOADED:_container=_media.getDisplayElement();
break;
case jwplayer.api.events.JWPLAYER_MEDIA_MUTE:this.mute=evt.mute;
break;
case jwplayer.api.events.JWPLAYER_MEDIA_VOLUME:this.volume=evt.volume;
break
}_eventDispatcher.sendEvent(evt.type,evt)
}var _mediaProviders={};
_model.setActiveMediaProvider=function(playlistItem){if(playlistItem.provider=="audio"){playlistItem.provider="sound"
}var provider=playlistItem.provider;
var current=_media?_media.getDisplayElement():null;
if(provider=="sound"||provider=="http"||provider==""){provider="video"
}if(!jwplayer.utils.exists(_mediaProviders[provider])){switch(provider){case"video":_media=new jwplayer.html5.mediavideo(_model,current?current:_container);
break;
case"youtube":_media=new jwplayer.html5.mediayoutube(_model,current?current:_container);
break
}if(!jwplayer.utils.exists(_media)){return false
}_media.addGlobalListener(forward);
_mediaProviders[provider]=_media
}else{if(_media!=_mediaProviders[provider]){if(_media){_media.stop()
}_media=_mediaProviders[provider]
}}return true
};
_model.getMedia=function(){return _media
};
_model.seek=function(pos){_eventDispatcher.sendEvent(jwplayer.api.events.JWPLAYER_MEDIA_SEEK,{position:_model.position,offset:pos});
return _media.seek(pos)
};
_model.setVolume=function(newVol){_utils.saveCookie("volume",newVol);
_model.volume=newVol
};
_model.setMute=function(state){_utils.saveCookie("mute",state);
_model.mute=state
};
_model.setupPlugins=function(){if(!jwplayer.utils.exists(_model.plugins)||!jwplayer.utils.exists(_model.plugins.order)||_model.plugins.order.length==0){jwplayer.utils.log("No plugins to set up");
return _model
}for(var i=0;
i<_model.plugins.order.length;
i++){try{var pluginName=_model.plugins.order[i];
if(jwplayer.utils.exists(jwplayer.html5[pluginName])){if(pluginName=="playlist"){_model.plugins.object[pluginName]=new jwplayer.html5.playlistcomponent(_api,_model.plugins.config[pluginName])
}else{_model.plugins.object[pluginName]=new jwplayer.html5[pluginName](_api,_model.plugins.config[pluginName])
}}else{_model.plugins.order.splice(plugin,plugin+1)
}if(typeof _model.plugins.object[pluginName].addGlobalListener=="function"){_model.plugins.object[pluginName].addGlobalListener(forward)
}}catch(err){jwplayer.utils.log("Could not setup "+pluginName)
}}};
return _model
}
})(jwplayer);
(function(b){b.html5.playlist=function(a){var e=[];
if(a.playlist&&a.playlist instanceof Array&&a.playlist.length>0){for(var g in a.playlist){if(!isNaN(parseInt(g))){e.push(new b.html5.playlistitem(a.playlist[g]))
}}}else{e.push(new b.html5.playlistitem(a))
}return e
}
})(jwplayer);
(function(e){var g={size:180,position:e.html5.view.positions.NONE,itemheight:60,thumbs:true,fontcolor:"#000000",overcolor:"",activecolor:"",backgroundcolor:"#f8f8f8",font:"_sans",fontsize:"",fontstyle:"",fontweight:""};
var d={_sans:"Arial, Helvetica, sans-serif",_serif:"Times, Times New Roman, serif",_typewriter:"Courier New, Courier, monospace"};
_utils=e.utils;
_css=_utils.css;
_hide=function(a){_css(a,{display:"none"})
};
_show=function(a){_css(a,{display:"block"})
};
e.html5.playlistcomponent=function(L,K){var c=L;
var Z=e.utils.extend({},g,c.skin.getComponentSettings("playlist"),K);
if(Z.position==e.html5.view.positions.NONE||typeof e.html5.view.positions[Z.position]=="undefined"){return
}var b;
var T;
var J;
var aa;
var X;
var Y;
var U=-1;
var W={background:undefined,item:undefined,itemOver:undefined,itemImage:undefined,itemActive:undefined};
this.getDisplayElement=function(){return b
};
this.resize=function(h,k){T=h;
J=k;
if(c.jwGetFullscreen()){_hide(b)
}else{var j={display:"block",width:T,height:J};
_css(b,j)
}};
this.show=function(){_show(b)
};
this.hide=function(){_hide(b)
};
function V(){b=document.createElement("div");
b.id=c.id+"_jwplayer_playlistcomponent";
b.style.overflow="hidden";
switch(Z.position){case e.html5.view.positions.RIGHT:case e.html5.view.positions.LEFT:b.style.width=Z.size+"px";
break;
case e.html5.view.positions.TOP:case e.html5.view.positions.BOTTOM:b.style.height=Z.size+"px";
break
}M();
if(W.item){Z.itemheight=W.item.height
}b.style.backgroundColor="#C6C6C6";
c.jwAddEventListener(e.api.events.JWPLAYER_PLAYLIST_LOADED,I);
c.jwAddEventListener(e.api.events.JWPLAYER_PLAYLIST_ITEM,F);
c.jwAddEventListener(e.api.events.JWPLAYER_PLAYER_STATE,S)
}function P(){var h=document.createElement("ul");
_css(h,{width:b.style.width,minWidth:b.style.width,height:b.style.height,backgroundColor:Z.backgroundcolor,backgroundImage:W.background?"url("+W.background.src+")":"",color:Z.fontcolor,listStyle:"none",margin:0,padding:0,fontFamily:d[Z.font]?d[Z.font]:d._sans,fontSize:(Z.fontsize?Z.fontsize:11)+"px",fontStyle:Z.fontstyle,fontWeight:Z.fontweight,overflowY:"auto"});
return h
}function a(h){return function(){var l=Y.getElementsByClassName("item")[h];
var k=Z.fontcolor;
var j=W.item?"url("+W.item.src+")":"";
if(h==c.jwGetPlaylistIndex()){if(Z.activecolor!==""){k=Z.activecolor
}if(W.itemActive){j="url("+W.itemActive.src+")"
}}_css(l,{color:Z.overcolor!==""?Z.overcolor:k,backgroundImage:W.itemOver?"url("+W.itemOver.src+")":j})
}
}function Q(h){return function(){var l=Y.getElementsByClassName("item")[h];
var k=Z.fontcolor;
var j=W.item?"url("+W.item.src+")":"";
if(h==c.jwGetPlaylistIndex()){if(Z.activecolor!==""){k=Z.activecolor
}if(W.itemActive){j="url("+W.itemActive.src+")"
}}_css(l,{color:k,backgroundImage:j})
}
}function N(p){var h=aa[p];
var j=document.createElement("li");
j.className="item";
_css(j,{height:Z.itemheight,display:"block",cursor:"pointer",backgroundImage:W.item?"url("+W.item.src+")":"",backgroundSize:"100% "+Z.itemheight+"px"});
j.onmouseover=a(p);
j.onmouseout=Q(p);
var o=document.createElement("div");
var s=new Image();
var n=0;
var m=0;
var l=0;
if(E()&&(h.image||h["playlist.image"]||W.itemImage)){s.className="image";
if(W.itemImage){n=(Z.itemheight-W.itemImage.height)/2;
m=W.itemImage.width;
l=W.itemImage.height
}else{m=Z.itemheight*4/3;
l=Z.itemheight
}_css(o,{height:l,width:m,"float":"left",styleFloat:"left",cssFloat:"left",margin:"0 5px 0 0",background:"black",overflow:"hidden",margin:n+"px",position:"relative"});
_css(s,{position:"relative"});
o.appendChild(s);
s.onload=function(){e.utils.stretch(e.utils.stretching.FILL,s,m,l,this.naturalWidth,this.naturalHeight)
};
if(h["playlist.image"]){s.src=h["playlist.image"]
}else{if(h.image){s.src=h.image
}else{if(W.itemImage){s.src=W.itemImage.src
}}}j.appendChild(o)
}var t=T-m-n*2;
if(J<Z.itemheight*aa.length){t-=15
}var u=document.createElement("div");
_css(u,{position:"relative",height:"100%",overflow:"hidden"});
var r=document.createElement("span");
if(h.duration>0){r.className="duration";
_css(r,{fontSize:(Z.fontsize?Z.fontsize:11)+"px",fontWeight:(Z.fontweight?Z.fontweight:"bold"),width:"40px",height:Z.fontsize?Z.fontsize+10:20,lineHeight:24,"float":"right",styleFloat:"right",cssFloat:"right"});
r.innerHTML=_utils.timeFormat(h.duration);
u.appendChild(r)
}var k=document.createElement("span");
k.className="title";
_css(k,{padding:"5px 5px 0 "+(n?0:"5px"),height:Z.fontsize?Z.fontsize+10:20,lineHeight:Z.fontsize?Z.fontsize+10:20,overflow:"hidden","float":"left",styleFloat:"left",cssFloat:"left",width:((h.duration>0)?t-50:t)-10+"px",fontSize:(Z.fontsize?Z.fontsize:13)+"px",fontWeight:(Z.fontweight?Z.fontweight:"bold")});
k.innerHTML=h?h.title:"";
u.appendChild(k);
if(h.description){var q=document.createElement("span");
q.className="description";
_css(q,{display:"block","float":"left",styleFloat:"left",cssFloat:"left",margin:0,paddingLeft:k.style.paddingLeft,paddingRight:k.style.paddingRight,lineHeight:(Z.fontsize?Z.fontsize+4:16)+"px",overflow:"hidden",position:"relative"});
q.innerHTML=h.description;
u.appendChild(q)
}j.appendChild(u);
return j
}function I(k){b.innerHTML="";
aa=H();
if(!aa){return
}items=[];
Y=P();
for(var j=0;
j<aa.length;
j++){var l=N(j);
l.onclick=O(j);
Y.appendChild(l);
items.push(l)
}U=c.jwGetPlaylistIndex();
Q(U)();
b.appendChild(Y);
if(_utils.isIOS()&&window.iScroll){Y.style.height=Z.itemheight*aa.length+"px";
var h=new iScroll(b.id)
}}function H(){var j=c.jwGetPlaylist();
var h=[];
for(var k=0;
k<j.length;
k++){if(!j[k]["ova.hidden"]){h.push(j[k])
}}return h
}function O(h){return function(){c.jwPlaylistItem(h);
c.jwPlay(true)
}
}function R(){Y.scrollTop=c.jwGetPlaylistIndex()*Z.itemheight
}function E(){return Z.thumbs.toString().toLowerCase()=="true"
}function F(h){if(U>=0){Q(U)();
U=h.index
}Q(h.index)();
R()
}function S(){if(Z.position==e.html5.view.positions.OVER){switch(c.jwGetState()){case e.api.events.state.IDLE:_show(b);
break;
default:_hide(b);
break
}}}function M(){for(var h in W){W[h]=G(h)
}}function G(h){return c.skin.getSkinElement("playlist",h)
}V();
return this
}
})(jwplayer);
(function(c){c.html5.playlistitem=function(b){var a={author:"",date:"",description:"",image:"",link:"",mediaid:"",tags:"",title:"",provider:"",file:"",streamer:"",duration:-1,start:0,currentLevel:-1,levels:[]};
var g=c.utils.extend({},a,b);
if(g.type){g.provider=g.type;
delete g.type
}if(g.levels.length===0){g.levels[0]=new c.html5.playlistitemlevel(g)
}if(!g.provider){g.provider=d(g.levels[0])
}else{g.provider=g.provider.toLowerCase()
}return g
};
function d(b){if(c.utils.isYouTube(b.file)){return"youtube"
}else{var a=c.utils.extension(b.file);
var h;
if(a&&c.utils.extensionmap[a]){if(a=="m3u8"){return"video"
}h=c.utils.extensionmap[a].html5
}else{if(b.type){h=b.type
}}if(h){var g=h.split("/")[0];
if(g=="audio"){return"sound"
}else{if(g=="video"){return g
}}}}return""
}})(jwplayer);
(function(b){b.html5.playlistitemlevel=function(a){var e={file:"",streamer:"",bitrate:0,width:0};
for(var g in e){if(b.utils.exists(a[g])){e[g]=a[g]
}}return e
}
})(jwplayer);
(function(b){b.html5.playlistloader=function(){var g=new b.html5.eventdispatcher();
b.utils.extend(this,g);
this.load=function(c){b.utils.ajax(c,e,a)
};
function e(d){var j=[];
try{var j=b.utils.parsers.rssparser.parse(d.responseXML.firstChild);
g.sendEvent(b.api.events.JWPLAYER_PLAYLIST_LOADED,{playlist:new b.html5.playlist({playlist:j})})
}catch(c){a("Could not parse the playlist")
}}function a(c){g.sendEvent(b.api.events.JWPLAYER_ERROR,{message:c?c:"Could not load playlist an unknown reason."})
}}
})(jwplayer);
(function(b){b.html5.skin=function(){var a={};
var d=false;
this.load=function(g,c){new b.html5.skinloader(g,function(e){d=true;
a=e;
c()
},function(){new b.html5.skinloader("",function(e){d=true;
a=e;
c()
})
})
};
this.getSkinElement=function(h,g){if(d){try{return a[h].elements[g]
}catch(c){b.utils.log("No such skin component / element: ",[h,g])
}}return null
};
this.getComponentSettings=function(c){if(d&&a&&a[c]){return a[c].settings
}return null
};
this.getComponentLayout=function(c){if(d){return a[c].layout
}return null
}
}
})(jwplayer);
(function(b){b.html5.skinloader=function(D,u,z){var v={};
var G=u;
var y=z;
var E=true;
var A;
var w=D;
var I=false;
function x(){if(typeof w!="string"||w===""){F(b.html5.defaultSkin().xml)
}else{b.utils.ajax(b.utils.getAbsolutePath(w),function(d){try{if(b.utils.exists(d.responseXML)){F(d.responseXML);
return
}}catch(c){B()
}F(b.html5.defaultSkin().xml)
},function(c){F(b.html5.defaultSkin().xml)
})
}}function F(n){var V=n.getElementsByTagName("component");
if(V.length===0){return
}for(var q=0;
q<V.length;
q++){var X=V[q].getAttribute("name");
var Y={settings:{},elements:{},layout:{}};
v[X]=Y;
var R=V[q].getElementsByTagName("elements")[0].getElementsByTagName("element");
for(var T=0;
T<R.length;
T++){H(R[T],X)
}var l=V[q].getElementsByTagName("settings")[0];
if(l&&l.childNodes.length>0){var k=l.getElementsByTagName("setting");
for(var d=0;
d<k.length;
d++){var c=k[d].getAttribute("name");
var o=k[d].getAttribute("value");
var p=/color$/.test(c)?"color":null;
v[X].settings[c]=b.utils.typechecker(o,p)
}}var j=V[q].getElementsByTagName("layout")[0];
if(j&&j.childNodes.length>0){var h=j.getElementsByTagName("group");
for(var r=0;
r<h.length;
r++){var Z=h[r];
v[X].layout[Z.getAttribute("position")]={elements:[]};
for(var e=0;
e<Z.attributes.length;
e++){var W=Z.attributes[e];
v[X].layout[Z.getAttribute("position")][W.name]=W.value
}var g=Z.getElementsByTagName("*");
for(var s=0;
s<g.length;
s++){var U=g[s];
v[X].layout[Z.getAttribute("position")].elements.push({type:U.tagName});
for(var S=0;
S<U.attributes.length;
S++){var m=U.attributes[S];
v[X].layout[Z.getAttribute("position")].elements[s][m.name]=m.value
}if(!b.utils.exists(v[X].layout[Z.getAttribute("position")].elements[s].name)){v[X].layout[Z.getAttribute("position")].elements[s].name=U.tagName
}}}}E=false;
a()
}}function a(){clearInterval(A);
if(!I){A=setInterval(function(){t()
},100)
}}function H(l,d){var e=new Image();
var j=l.getAttribute("name");
var g=l.getAttribute("src");
var c;
if(g.indexOf("data:image/png;base64,")===0){c=g
}else{var h=b.utils.getAbsolutePath(w);
var k=h.substr(0,h.lastIndexOf("/"));
c=[k,d,g].join("/")
}v[d].elements[j]={height:0,width:0,src:"",ready:false,image:e};
e.onload=function(m){C(e,j,d)
};
e.onerror=function(m){I=true;
a();
y()
};
e.src=c
}function B(){for(var g in v){var d=v[g];
for(var h in d.elements){var c=d.elements[h];
var e=c.image;
e.onload=null;
e.onerror=null;
delete c.image;
delete d.elements[h]
}delete v[g]
}}function t(){for(var d in v){if(d!="properties"){for(var c in v[d].elements){if(!v[d].elements[c].ready){return
}}}}if(E===false){clearInterval(A);
G(v)
}}function C(e,c,d){if(v[d]&&v[d].elements[c]){v[d].elements[c].height=e.height;
v[d].elements[c].width=e.width;
v[d].elements[c].src=e.src;
v[d].elements[c].ready=true;
a()
}else{b.utils.log("Loaded an image for a missing element: "+d+"."+c)
}}x()
}
})(jwplayer);
(function(b){b.html5.api=function(B,a){var r={};
var x=document.createElement("div");
B.parentNode.replaceChild(x,B);
x.id=B.id;
r.version=b.version;
r.id=x.id;
var s=new b.html5.model(r,x,a);
var u=new b.html5.view(r,x,s);
var t=new b.html5.controller(r,x,s,u);
r.skin=new b.html5.skin();
r.jwPlay=function(c){if(typeof c=="undefined"){y()
}else{if(c.toString().toLowerCase()=="true"){t.play()
}else{t.pause()
}}};
r.jwPause=function(c){if(typeof c=="undefined"){y()
}else{if(c.toString().toLowerCase()=="true"){t.pause()
}else{t.play()
}}};
function y(){if(s.state==b.api.events.state.PLAYING||s.state==b.api.events.state.BUFFERING){t.pause()
}else{t.play()
}}r.jwStop=t.stop;
r.jwSeek=t.seek;
r.jwPlaylistItem=function(c){if(A){if(A.playlistClickable()){A.jwInstreamDestroy();
return t.item(c)
}}else{return t.item(c)
}};
r.jwPlaylistNext=t.next;
r.jwPlaylistPrev=t.prev;
r.jwResize=t.resize;
r.jwLoad=t.load;
r.jwDetachMedia=t.detachMedia;
r.jwAttachMedia=t.attachMedia;
function v(c){return function(){return s[c]
}
}function z(e,c,d){return function(){var g=s.plugins.object[e];
if(g&&g[c]&&typeof g[c]=="function"){g[c].apply(g,d)
}}
}r.jwGetPlaylistIndex=v("item");
r.jwGetPosition=v("position");
r.jwGetDuration=v("duration");
r.jwGetBuffer=v("buffer");
r.jwGetWidth=v("width");
r.jwGetHeight=v("height");
r.jwGetFullscreen=v("fullscreen");
r.jwSetFullscreen=t.setFullscreen;
r.jwGetVolume=v("volume");
r.jwSetVolume=t.setVolume;
r.jwGetMute=v("mute");
r.jwSetMute=t.setMute;
r.jwGetStretching=function(){return s.stretching.toUpperCase()
};
r.jwGetState=v("state");
r.jwGetVersion=function(){return r.version
};
r.jwGetPlaylist=function(){return s.playlist
};
r.jwAddEventListener=t.addEventListener;
r.jwRemoveEventListener=t.removeEventListener;
r.jwSendEvent=t.sendEvent;
r.jwDockSetButton=function(c,g,e,d){if(s.plugins.object.dock&&s.plugins.object.dock.setButton){s.plugins.object.dock.setButton(c,g,e,d)
}};
r.jwControlbarShow=z("controlbar","show");
r.jwControlbarHide=z("controlbar","hide");
r.jwDockShow=z("dock","show");
r.jwDockHide=z("dock","hide");
r.jwDisplayShow=z("display","show");
r.jwDisplayHide=z("display","hide");
var A;
r.jwLoadInstream=function(c,d){if(!A){A=new b.html5.instream(r,s,u,t)
}setTimeout(function(){A.load(c,d)
},10)
};
r.jwInstreamDestroy=function(){if(A){A.jwInstreamDestroy()
}};
r.jwInstreamAddEventListener=q("jwInstreamAddEventListener");
r.jwInstreamRemoveEventListener=q("jwInstreamRemoveEventListener");
r.jwInstreamGetState=q("jwInstreamGetState");
r.jwInstreamGetDuration=q("jwInstreamGetDuration");
r.jwInstreamGetPosition=q("jwInstreamGetPosition");
r.jwInstreamPlay=q("jwInstreamPlay");
r.jwInstreamPause=q("jwInstreamPause");
r.jwInstreamSeek=q("jwInstreamSeek");
function q(c){return function(){if(A&&typeof A[c]=="function"){return A[c].apply(this,arguments)
}else{_utils.log("Could not call instream method - instream API not initialized")
}}
}r.jwDestroy=function(){t.destroy()
};
r.jwGetLevel=function(){};
r.jwGetBandwidth=function(){};
r.jwGetLockState=function(){};
r.jwLock=function(){};
r.jwUnlock=function(){};
function C(){if(s.config.playlistfile){s.addEventListener(b.api.events.JWPLAYER_PLAYLIST_LOADED,w);
s.loadPlaylist(s.config.playlistfile)
}else{if(typeof s.config.playlist=="string"){s.addEventListener(b.api.events.JWPLAYER_PLAYLIST_LOADED,w);
s.loadPlaylist(s.config.playlist)
}else{s.loadPlaylist(s.config);
setTimeout(w,25)
}}}function w(c){s.removeEventListener(b.api.events.JWPLAYER_PLAYLIST_LOADED,w);
s.setupPlugins();
u.setup();
var c={id:r.id,version:r.version};
t.playerReady(c)
}if(s.config.chromeless&&!b.utils.isIOS()){C()
}else{r.skin.load(s.config.skin,C)
}return r
}
})(jwplayer)
}
/*
 * Shadowbox.js, version 3.0.3
 * http://shadowbox-js.com/
 *
 * Copyright 2007-2010, Michael J. I. Jackson
 * Date: Fri Jan 07 18:38:10 -0800 2011
 */
(function(window,undefined){var S={version:"3.0.3"};
var ua=navigator.userAgent.toLowerCase();
if(ua.indexOf("windows")>-1||ua.indexOf("win32")>-1){S.isWindows=true
}else{if(ua.indexOf("macintosh")>-1||ua.indexOf("mac os x")>-1){S.isMac=true
}else{if(ua.indexOf("linux")>-1){S.isLinux=true
}}}S.isIE=ua.indexOf("msie")>-1;
S.isIE6=ua.indexOf("msie 6")>-1;
S.isIE7=ua.indexOf("msie 7")>-1;
S.isGecko=ua.indexOf("gecko")>-1&&ua.indexOf("safari")==-1;
S.isWebKit=ua.indexOf("applewebkit/")>-1;
var inlineId=/#(.+)$/,galleryName=/^(light|shadow)box\[(.*?)\]/i,inlineParam=/\s*([a-z_]*?)\s*=\s*(.+)\s*/,fileExtension=/[0-9a-z]+$/i,scriptPath=/(.+\/)shadowbox\.js/i;
var open=false,initialized=false,lastOptions={},slideDelay=0,slideStart,slideTimer;
S.current=-1;
S.dimensions=null;
S.ease=function(state){return 1+Math.pow(state-1,3)
};
S.errorInfo={fla:{name:"Flash",url:"http://www.adobe.com/products/flashplayer/"},qt:{name:"QuickTime",url:"http://www.apple.com/quicktime/download/"},wmp:{name:"Windows Media Player",url:"http://www.microsoft.com/windows/windowsmedia/"},f4m:{name:"Flip4Mac",url:"http://www.flip4mac.com/wmv_download.htm"}};
S.gallery=[];
S.onReady=noop;
S.path=null;
S.player=null;
S.playerId="sb-player";
S.options={animate:true,animateFade:true,autoplayMovies:true,continuous:false,enableKeys:true,flashParams:{bgcolor:"#000000",allowfullscreen:true},flashVars:{},flashVersion:"9.0.115",handleOversize:"resize",handleUnsupported:"link",onChange:noop,onClose:noop,beforeClose:function(){return true
},onFinish:noop,onOpen:noop,showMovieControls:true,skipSetup:false,slideshowDelay:0,viewportPadding:20};
S.getCurrent=function(){return S.current>-1?S.gallery[S.current]:null
};
S.hasNext=function(){return S.gallery.length>1&&(S.current!=S.gallery.length-1||S.options.continuous)
};
S.isOpen=function(){return open
};
S.isPaused=function(){return slideTimer=="pause"
};
S.applyOptions=function(options){lastOptions=apply({},S.options);
apply(S.options,options)
};
S.revertOptions=function(){apply(S.options,lastOptions)
};
S.init=function(options,callback){if(initialized){return
}initialized=true;
if(S.skin.options){apply(S.options,S.skin.options)
}if(options){apply(S.options,options)
}if(!S.path){var path,scripts=document.getElementsByTagName("script");
for(var i=0,len=scripts.length;
i<len;
++i){path=scriptPath.exec(scripts[i].src);
if(path){S.path=path[1];
break
}}}if(callback){S.onReady=callback
}bindLoad()
};
S.open=function(obj){if(open){return
}var gc=S.makeGallery(obj);
S.gallery=gc[0];
S.current=gc[1];
obj=S.getCurrent();
if(obj==null){return
}S.applyOptions(obj.options||{});
filterGallery();
if(S.gallery.length){obj=S.getCurrent();
if(S.options.onOpen(obj)===false){return
}open=true;
S.skin.onOpen(obj,load)
}};
S.close=function(){if(!open){return
}var ok=S.options.beforeClose();
if(!ok){return
}open=false;
if(S.player){S.player.remove();
S.player=null
}if(typeof slideTimer=="number"){clearTimeout(slideTimer);
slideTimer=null
}slideDelay=0;
listenKeys(false);
S.options.onClose(S.getCurrent());
S.skin.onClose();
S.revertOptions()
};
S.play=function(){if(!S.hasNext()){return
}if(!slideDelay){slideDelay=S.options.slideshowDelay*1000
}if(slideDelay){slideStart=now();
slideTimer=setTimeout(function(){slideDelay=slideStart=0;
S.next()
},slideDelay);
if(S.skin.onPlay){S.skin.onPlay()
}}};
S.pause=function(){if(typeof slideTimer!="number"){return
}slideDelay=Math.max(0,slideDelay-(now()-slideStart));
if(slideDelay){clearTimeout(slideTimer);
slideTimer="pause";
if(S.skin.onPause){S.skin.onPause()
}}};
S.change=function(index){if(!(index in S.gallery)){if(S.options.continuous){index=(index<0?S.gallery.length+index:0);
if(!(index in S.gallery)){return
}}else{return
}}S.current=index;
if(typeof slideTimer=="number"){clearTimeout(slideTimer);
slideTimer=null;
slideDelay=slideStart=0
}S.options.onChange(S.getCurrent());
load(true)
};
S.next=function(){S.change(S.current+1)
};
S.previous=function(){S.change(S.current-1)
};
S.setDimensions=function(height,width,maxHeight,maxWidth,topBottom,leftRight,padding,preserveAspect){var originalHeight=height,originalWidth=width;
var extraHeight=2*padding+topBottom;
if(height+extraHeight>maxHeight){height=maxHeight-extraHeight
}var extraWidth=2*padding+leftRight;
if(width+extraWidth>maxWidth){width=maxWidth-extraWidth
}var changeHeight=(originalHeight-height)/originalHeight,changeWidth=(originalWidth-width)/originalWidth,oversized=(changeHeight>0||changeWidth>0);
if(preserveAspect&&oversized){if(changeHeight>changeWidth){width=Math.round((originalWidth/originalHeight)*height)
}else{if(changeWidth>changeHeight){height=Math.round((originalHeight/originalWidth)*width)
}}}S.dimensions={height:height+topBottom,width:width+leftRight,innerHeight:height,innerWidth:width,top:Math.floor((maxHeight-(height+extraHeight))/2+padding),left:Math.floor((maxWidth-(width+extraWidth))/2+padding),oversized:oversized};
return S.dimensions
};
S.makeGallery=function(obj){var gallery=[],current=-1;
if(typeof obj=="string"){obj=[obj]
}if(typeof obj.length=="number"){each(obj,function(i,o){if(o.content){gallery[i]=o
}else{gallery[i]={content:o}
}});
current=0
}else{if(obj.tagName){var cacheObj=S.getCache(obj);
obj=cacheObj?cacheObj:S.makeObject(obj)
}if(obj.gallery){gallery=[];
var o;
for(var key in S.cache){o=S.cache[key];
if(o.gallery&&o.gallery==obj.gallery){if(current==-1&&o.content==obj.content){current=gallery.length
}gallery.push(o)
}}if(current==-1){gallery.unshift(obj);
current=0
}}else{gallery=[obj];
current=0
}}each(gallery,function(i,o){gallery[i]=apply({},o)
});
return[gallery,current]
};
S.makeObject=function(link,options){var obj={content:link.href,title:link.getAttribute("title")||"",link:link};
if(options){options=apply({},options);
each(["player","title","height","width","gallery"],function(i,o){if(typeof options[o]!="undefined"){obj[o]=options[o];
delete options[o]
}});
obj.options=options
}else{obj.options={}
}if(!obj.player){obj.player=S.getPlayer(obj.content)
}var rel=link.getAttribute("rel");
if(rel){var match=rel.match(galleryName);
if(match){obj.gallery=escape(match[2])
}each(rel.split(";"),function(i,p){match=p.match(inlineParam);
if(match){obj[match[1]]=match[2]
}})
}return obj
};
S.getPlayer=function(content){if(content.indexOf("#")>-1&&content.indexOf(document.location.href)==0){return"inline"
}var q=content.indexOf("?");
if(q>-1){content=content.substring(0,q)
}var ext,m=content.match(fileExtension);
if(m){ext=m[0].toLowerCase()
}if(ext){if(S.img&&S.img.ext.indexOf(ext)>-1){return"img"
}if(S.swf&&S.swf.ext.indexOf(ext)>-1){return"swf"
}if(S.flv&&S.flv.ext.indexOf(ext)>-1){return"flv"
}if(S.qt&&S.qt.ext.indexOf(ext)>-1){if(S.wmp&&S.wmp.ext.indexOf(ext)>-1){return"qtwmp"
}else{return"qt"
}}if(S.wmp&&S.wmp.ext.indexOf(ext)>-1){return"wmp"
}}return"iframe"
};
function filterGallery(){var err=S.errorInfo,plugins=S.plugins,obj,remove,needed,m,format,replace,inlineEl,flashVersion;
for(var i=0;
i<S.gallery.length;
++i){obj=S.gallery[i];
remove=false;
needed=null;
switch(obj.player){case"flv":case"swf":if(!plugins.fla){needed="fla"
}break;
case"qt":if(!plugins.qt){needed="qt"
}break;
case"wmp":if(S.isMac){if(plugins.qt&&plugins.f4m){obj.player="qt"
}else{needed="qtf4m"
}}else{if(!plugins.wmp){needed="wmp"
}}break;
case"qtwmp":if(plugins.qt){obj.player="qt"
}else{if(plugins.wmp){obj.player="wmp"
}else{needed="qtwmp"
}}break
}if(needed){if(S.options.handleUnsupported=="link"){switch(needed){case"qtf4m":format="shared";
replace=[err.qt.url,err.qt.name,err.f4m.url,err.f4m.name];
break;
case"qtwmp":format="either";
replace=[err.qt.url,err.qt.name,err.wmp.url,err.wmp.name];
break;
default:format="single";
replace=[err[needed].url,err[needed].name]
}obj.player="html";
obj.content='<div class="sb-message">'+sprintf(S.lang.errors[format],replace)+"</div>"
}else{remove=true
}}else{if(obj.player=="inline"){m=inlineId.exec(obj.content);
if(m){inlineEl=get(m[1]);
if(inlineEl){obj.content=inlineEl.innerHTML
}else{remove=true
}}else{remove=true
}}else{if(obj.player=="swf"||obj.player=="flv"){flashVersion=(obj.options&&obj.options.flashVersion)||S.options.flashVersion;
if(S.flash&&!S.flash.hasFlashPlayerVersion(flashVersion)){obj.width=310;
obj.height=177
}}}}if(remove){S.gallery.splice(i,1);
if(i<S.current){--S.current
}else{if(i==S.current){S.current=i>0?i-1:i
}}--i
}}}function listenKeys(on){if(!S.options.enableKeys){return
}(on?addEvent:removeEvent)(document,"keydown",handleKey)
}function handleKey(e){if(e.metaKey||e.shiftKey||e.altKey||e.ctrlKey){return
}var code=keyCode(e),handler;
switch(code){case 81:case 88:case 27:handler=S.close;
break;
case 37:handler=S.previous;
break;
case 39:handler=S.next;
break;
case 32:handler=typeof slideTimer=="number"?S.pause:S.play;
break
}if(handler){preventDefault(e);
handler()
}}function load(changing){listenKeys(false);
var obj=S.getCurrent();
var player=(obj.player=="inline"?"html":obj.player);
if(typeof S[player]!="function"){throw"unknown player "+player
}if(changing){S.player.remove();
S.revertOptions();
S.applyOptions(obj.options||{})
}S.player=new S[player](obj,S.playerId);
if(S.gallery.length>1){var next=S.gallery[S.current+1]||S.gallery[0];
if(next.player=="img"){var a=new Image();
a.src=next.content
}var prev=S.gallery[S.current-1]||S.gallery[S.gallery.length-1];
if(prev.player=="img"){var b=new Image();
b.src=prev.content
}}S.skin.onLoad(changing,waitReady)
}function waitReady(){if(!open){return
}if(typeof S.player.ready!="undefined"){var timer=setInterval(function(){if(open){if(S.player.ready){clearInterval(timer);
timer=null;
S.skin.onReady(show)
}}else{clearInterval(timer);
timer=null
}},10)
}else{S.skin.onReady(show)
}}function show(){if(!open){return
}S.player.append(S.skin.body,S.dimensions);
S.skin.onShow(finish)
}function finish(){if(!open){return
}if(S.player.onLoad){S.player.onLoad()
}S.options.onFinish(S.getCurrent());
if(!S.isPaused()){S.play()
}listenKeys(true)
}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(obj,from){var len=this.length>>>0;
from=from||0;
if(from<0){from+=len
}for(;
from<len;
++from){if(from in this&&this[from]===obj){return from
}}return -1
}
}function now(){return(new Date).getTime()
}function apply(original,extension){for(var property in extension){original[property]=extension[property]
}return original
}function each(obj,callback){var i=0,len=obj.length;
for(var value=obj[0];
i<len&&callback.call(value,i,value)!==false;
value=obj[++i]){}}function sprintf(str,replace){return str.replace(/\{(\w+?)\}/g,function(match,i){return replace[i]
})
}function noop(){}function get(id){return document.getElementById(id)
}function remove(el){el.parentNode.removeChild(el)
}var supportsOpacity=true,supportsFixed=true;
function checkSupport(){var body=document.body,div=document.createElement("div");
supportsOpacity=typeof div.style.opacity==="string";
div.style.position="fixed";
div.style.margin=0;
div.style.top="20px";
body.appendChild(div,body.firstChild);
supportsFixed=div.offsetTop==20;
body.removeChild(div)
}S.getStyle=(function(){var opacity=/opacity=([^)]*)/,getComputedStyle=document.defaultView&&document.defaultView.getComputedStyle;
return function(el,style){var ret;
if(!supportsOpacity&&style=="opacity"&&el.currentStyle){ret=opacity.test(el.currentStyle.filter||"")?(parseFloat(RegExp.$1)/100)+"":"";
return ret===""?"1":ret
}if(getComputedStyle){var computedStyle=getComputedStyle(el,null);
if(computedStyle){ret=computedStyle[style]
}if(style=="opacity"&&ret==""){ret="1"
}}else{ret=el.currentStyle[style]
}return ret
}
})();
S.appendHTML=function(el,html){if(el.insertAdjacentHTML){el.insertAdjacentHTML("BeforeEnd",html)
}else{if(el.lastChild){var range=el.ownerDocument.createRange();
range.setStartAfter(el.lastChild);
var frag=range.createContextualFragment(html);
el.appendChild(frag)
}else{el.innerHTML=html
}}};
S.getWindowSize=function(dimension){if(document.compatMode==="CSS1Compat"){return document.documentElement["client"+dimension]
}return document.body["client"+dimension]
};
S.setOpacity=function(el,opacity){var style=el.style;
if(supportsOpacity){style.opacity=(opacity==1?"":opacity)
}else{style.zoom=1;
if(opacity==1){if(typeof style.filter=="string"&&(/alpha/i).test(style.filter)){style.filter=style.filter.replace(/\s*[\w\.]*alpha\([^\)]*\);?/gi,"")
}}else{style.filter=(style.filter||"").replace(/\s*[\w\.]*alpha\([^\)]*\)/gi,"")+" alpha(opacity="+(opacity*100)+")"
}}};
S.clearOpacity=function(el){S.setOpacity(el,1)
};
function getTarget(e){var target=e.target?e.target:e.srcElement;
return target.nodeType==3?target.parentNode:target
}function getPageXY(e){var x=e.pageX||(e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft)),y=e.pageY||(e.clientY+(document.documentElement.scrollTop||document.body.scrollTop));
return[x,y]
}function preventDefault(e){e.preventDefault()
}function keyCode(e){return e.which?e.which:e.keyCode
}function addEvent(el,type,handler){if(el.addEventListener){el.addEventListener(type,handler,false)
}else{if(el.nodeType===3||el.nodeType===8){return
}if(el.setInterval&&(el!==window&&!el.frameElement)){el=window
}if(!handler.__guid){handler.__guid=addEvent.guid++
}if(!el.events){el.events={}
}var handlers=el.events[type];
if(!handlers){handlers=el.events[type]={};
if(el["on"+type]){handlers[0]=el["on"+type]
}}handlers[handler.__guid]=handler;
el["on"+type]=addEvent.handleEvent
}}addEvent.guid=1;
addEvent.handleEvent=function(event){var result=true;
event=event||addEvent.fixEvent(((this.ownerDocument||this.document||this).parentWindow||window).event);
var handlers=this.events[event.type];
for(var i in handlers){this.__handleEvent=handlers[i];
if(this.__handleEvent(event)===false){result=false
}}return result
};
addEvent.preventDefault=function(){this.returnValue=false
};
addEvent.stopPropagation=function(){this.cancelBubble=true
};
addEvent.fixEvent=function(e){e.preventDefault=addEvent.preventDefault;
e.stopPropagation=addEvent.stopPropagation;
return e
};
function removeEvent(el,type,handler){if(el.removeEventListener){el.removeEventListener(type,handler,false)
}else{if(el.events&&el.events[type]){delete el.events[type][handler.__guid]
}}}var loaded=false,DOMContentLoaded;
if(document.addEventListener){DOMContentLoaded=function(){document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);
S.load()
}
}else{if(document.attachEvent){DOMContentLoaded=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",DOMContentLoaded);
S.load()
}}
}}function doScrollCheck(){if(loaded){return
}try{document.documentElement.doScroll("left")
}catch(e){setTimeout(doScrollCheck,1);
return
}S.load()
}function bindLoad(){if(document.readyState==="complete"){return S.load()
}if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);
window.addEventListener("load",S.load,false)
}else{if(document.attachEvent){document.attachEvent("onreadystatechange",DOMContentLoaded);
window.attachEvent("onload",S.load);
var topLevel=false;
try{topLevel=window.frameElement===null
}catch(e){}if(document.documentElement.doScroll&&topLevel){doScrollCheck()
}}}}S.load=function(){if(loaded){return
}if(!document.body){return setTimeout(S.load,13)
}loaded=true;
checkSupport();
S.onReady();
if(!S.options.skipSetup){S.setup()
}S.skin.init()
};
S.plugins={};
if(navigator.plugins&&navigator.plugins.length){var names=[];
each(navigator.plugins,function(i,p){names.push(p.name)
});
names=names.join(",");
var f4m=names.indexOf("Flip4Mac")>-1;
S.plugins={fla:names.indexOf("Shockwave Flash")>-1,qt:names.indexOf("QuickTime")>-1,wmp:!f4m&&names.indexOf("Windows Media")>-1,f4m:f4m}
}else{var detectPlugin=function(name){var axo;
try{axo=new ActiveXObject(name)
}catch(e){}return !!axo
};
S.plugins={fla:detectPlugin("ShockwaveFlash.ShockwaveFlash"),qt:detectPlugin("QuickTime.QuickTime"),wmp:detectPlugin("wmplayer.ocx"),f4m:false}
}var relAttr=/^(light|shadow)box/i,expando="shadowboxCacheKey",cacheKey=1;
S.cache={};
S.select=function(selector){var links=[];
if(!selector){var rel;
each(document.getElementsByTagName("a"),function(i,el){rel=el.getAttribute("rel");
if(rel&&relAttr.test(rel)){links.push(el)
}})
}else{var length=selector.length;
if(length){if(typeof selector=="string"){if(S.find){links=S.find(selector)
}}else{if(length==2&&typeof selector[0]=="string"&&selector[1].nodeType){if(S.find){links=S.find(selector[0],selector[1])
}}else{for(var i=0;
i<length;
++i){links[i]=selector[i]
}}}}else{links.push(selector)
}}return links
};
S.setup=function(selector,options){each(S.select(selector),function(i,link){S.addCache(link,options)
})
};
S.teardown=function(selector){each(S.select(selector),function(i,link){S.removeCache(link)
})
};
S.addCache=function(link,options){var key=link[expando];
if(key==undefined){key=cacheKey++;
link[expando]=key;
addEvent(link,"click",handleClick)
}S.cache[key]=S.makeObject(link,options)
};
S.removeCache=function(link){removeEvent(link,"click",handleClick);
delete S.cache[link[expando]];
link[expando]=null
};
S.getCache=function(link){var key=link[expando];
return(key in S.cache&&S.cache[key])
};
S.clearCache=function(){for(var key in S.cache){S.removeCache(S.cache[key].link)
}S.cache={}
};
function handleClick(e){S.open(this);
if(S.gallery.length){preventDefault(e)
}}
/*
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 *
 * Modified for inclusion in Shadowbox.js
 */
S.find=(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true;
[0,0].sort(function(){baseHasDuplicate=false;
return 0
});
var Sizzle=function(selector,context,results,seed){results=results||[];
var origContext=context=context||document;
if(context.nodeType!==1&&context.nodeType!==9){return[]
}if(!selector||typeof selector!=="string"){return results
}var parts=[],m,set,checkSet,extra,prune=true,contextXML=isXML(context),soFar=selector;
while((chunker.exec(""),m=chunker.exec(soFar))!==null){soFar=m[3];
parts.push(m[1]);
if(m[2]){extra=m[3];
break
}}if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context)
}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);
while(parts.length){selector=parts.shift();
if(Expr.relative[selector]){selector+=parts.shift()
}set=posProcess(selector,set)
}}}else{if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){var ret=Sizzle.find(parts.shift(),context,contextXML);
context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0]
}if(context){var ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);
set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;
if(parts.length>0){checkSet=makeArray(set)
}else{prune=false
}while(parts.length){var cur=parts.pop(),pop=cur;
if(!Expr.relative[cur]){cur=""
}else{pop=parts.pop()
}if(pop==null){pop=context
}Expr.relative[cur](checkSet,pop,contextXML)
}}else{checkSet=parts=[]
}}if(!checkSet){checkSet=set
}if(!checkSet){throw"Syntax error, unrecognized expression: "+(cur||selector)
}if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet)
}else{if(context&&context.nodeType===1){for(var i=0;
checkSet[i]!=null;
i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&contains(context,checkSet[i]))){results.push(set[i])
}}}else{for(var i=0;
checkSet[i]!=null;
i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i])
}}}}}else{makeArray(checkSet,results)
}if(extra){Sizzle(extra,origContext,results,seed);
Sizzle.uniqueSort(results)
}return results
};
Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;
results.sort(sortOrder);
if(hasDuplicate){for(var i=1;
i<results.length;
i++){if(results[i]===results[i-1]){results.splice(i--,1)
}}}}return results
};
Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set)
};
Sizzle.find=function(expr,context,isXML){var set,match;
if(!expr){return[]
}for(var i=0,l=Expr.order.length;
i<l;
i++){var type=Expr.order[i],match;
if((match=Expr.leftMatch[type].exec(expr))){var left=match[1];
match.splice(1,1);
if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(/\\/g,"");
set=Expr.find[type](match,context,isXML);
if(set!=null){expr=expr.replace(Expr.match[type],"");
break
}}}}if(!set){set=context.getElementsByTagName("*")
}return{set:set,expr:expr}
};
Sizzle.filter=function(expr,set,inplace,not){var old=expr,result=[],curLoop=set,match,anyFound,isXMLFilter=set&&set[0]&&isXML(set[0]);
while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.match[type].exec(expr))!=null){var filter=Expr.filter[type],found,item;
anyFound=false;
if(curLoop===result){result=[]
}if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);
if(!match){anyFound=found=true
}else{if(match===true){continue
}}}if(match){for(var i=0;
(item=curLoop[i])!=null;
i++){if(item){found=filter(item,match,i,curLoop);
var pass=not^!!found;
if(inplace&&found!=null){if(pass){anyFound=true
}else{curLoop[i]=false
}}else{if(pass){result.push(item);
anyFound=true
}}}}}if(found!==undefined){if(!inplace){curLoop=result
}expr=expr.replace(Expr.match[type],"");
if(!anyFound){return[]
}break
}}}if(expr===old){if(anyFound==null){throw"Syntax error, unrecognized expression: "+expr
}else{break
}}old=expr
}return curLoop
};
var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href")
}},relative:{"+":function(checkSet,part){var isPartStr=typeof part==="string",isTag=isPartStr&&!/\W/.test(part),isPartStrNotTag=isPartStr&&!isTag;
if(isTag){part=part.toLowerCase()
}for(var i=0,l=checkSet.length,elem;
i<l;
i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}checkSet[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===part?elem||false:elem===part
}}if(isPartStrNotTag){Sizzle.filter(part,checkSet,true)
}},">":function(checkSet,part){var isPartStr=typeof part==="string";
if(isPartStr&&!/\W/.test(part)){part=part.toLowerCase();
for(var i=0,l=checkSet.length;
i<l;
i++){var elem=checkSet[i];
if(elem){var parent=elem.parentNode;
checkSet[i]=parent.nodeName.toLowerCase()===part?parent:false
}}}else{for(var i=0,l=checkSet.length;
i<l;
i++){var elem=checkSet[i];
if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part
}}if(isPartStr){Sizzle.filter(part,checkSet,true)
}}},"":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;
if(typeof part==="string"&&!/\W/.test(part)){var nodeCheck=part=part.toLowerCase();
checkFn=dirNodeCheck
}checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML)
},"~":function(checkSet,part,isXML){var doneName=done++,checkFn=dirCheck;
if(typeof part==="string"&&!/\W/.test(part)){var nodeCheck=part=part.toLowerCase();
checkFn=dirNodeCheck
}checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML)
}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);
return m?[m]:[]
}},NAME:function(match,context){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);
for(var i=0,l=results.length;
i<l;
i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i])
}}return ret.length===0?null:ret
}},TAG:function(match,context){return context.getElementsByTagName(match[1])
}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(/\\/g,"")+" ";
if(isXML){return match
}for(var i=0,elem;
(elem=curLoop[i])!=null;
i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").replace(/[\t\n]/g," ").indexOf(match)>=0)){if(!inplace){result.push(elem)
}}else{if(inplace){curLoop[i]=false
}}}}return false
},ID:function(match){return match[1].replace(/\\/g,"")
},TAG:function(match,curLoop){return match[1].toLowerCase()
},CHILD:function(match){if(match[1]==="nth"){var test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2]==="even"&&"2n"||match[2]==="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);
match[2]=(test[1]+(test[2]||1))-0;
match[3]=test[3]-0
}match[0]=done++;
return match
},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1].replace(/\\/g,"");
if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name]
}if(match[2]==="~="){match[4]=" "+match[4]+" "
}return match
},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop)
}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);
if(!inplace){result.push.apply(result,ret)
}return false
}}else{if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true
}}return match
},POS:function(match){match.unshift(true);
return match
}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type!=="hidden"
},disabled:function(elem){return elem.disabled===true
},checked:function(elem){return elem.checked===true
},selected:function(elem){elem.parentNode.selectedIndex;
return elem.selected===true
},parent:function(elem){return !!elem.firstChild
},empty:function(elem){return !elem.firstChild
},has:function(elem,i,match){return !!Sizzle(match[3],elem).length
},header:function(elem){return/h\d/i.test(elem.nodeName)
},text:function(elem){return"text"===elem.type
},radio:function(elem){return"radio"===elem.type
},checkbox:function(elem){return"checkbox"===elem.type
},file:function(elem){return"file"===elem.type
},password:function(elem){return"password"===elem.type
},submit:function(elem){return"submit"===elem.type
},image:function(elem){return"image"===elem.type
},reset:function(elem){return"reset"===elem.type
},button:function(elem){return"button"===elem.type||elem.nodeName.toLowerCase()==="button"
},input:function(elem){return/input|select|textarea|button/i.test(elem.nodeName)
}},setFilters:{first:function(elem,i){return i===0
},last:function(elem,i,match,array){return i===array.length-1
},even:function(elem,i){return i%2===0
},odd:function(elem,i){return i%2===1
},lt:function(elem,i,match){return i<match[3]-0
},gt:function(elem,i,match){return i>match[3]-0
},nth:function(elem,i,match){return match[3]-0===i
},eq:function(elem,i,match){return match[3]-0===i
}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];
if(filter){return filter(elem,i,match,array)
}else{if(name==="contains"){return(elem.textContent||elem.innerText||getText([elem])||"").indexOf(match[3])>=0
}else{if(name==="not"){var not=match[3];
for(var i=0,l=not.length;
i<l;
i++){if(not[i]===elem){return false
}}return true
}else{throw"Syntax error, unrecognized expression: "+name
}}}},CHILD:function(elem,match){var type=match[1],node=elem;
switch(type){case"only":case"first":while((node=node.previousSibling)){if(node.nodeType===1){return false
}}if(type==="first"){return true
}node=elem;
case"last":while((node=node.nextSibling)){if(node.nodeType===1){return false
}}return true;
case"nth":var first=match[2],last=match[3];
if(first===1&&last===0){return true
}var doneName=match[0],parent=elem.parentNode;
if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;
for(node=parent.firstChild;
node;
node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count
}}parent.sizcache=doneName
}var diff=elem.nodeIndex-last;
if(first===0){return diff===0
}else{return(diff%first===0&&diff/first>=0)
}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match
},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||elem.nodeName.toLowerCase()===match
},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1
},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];
return result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!==check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false
},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];
if(filter){return filter(elem,i,match,array)
}}}};
var origPOS=Expr.match.POS;
for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+/(?![^\[]*\])(?![^\(]*\))/.source);
Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source)
}var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);
if(results){results.push.apply(results,array);
return results
}return array
};
try{Array.prototype.slice.call(document.documentElement.childNodes,0)
}catch(e){makeArray=function(array,results){var ret=results||[];
if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array)
}else{if(typeof array.length==="number"){for(var i=0,l=array.length;
i<l;
i++){ret.push(array[i])
}}else{for(var i=0;
array[i];
i++){ret.push(array[i])
}}}return ret
}
}var sortOrder;
if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){if(!a.compareDocumentPosition||!b.compareDocumentPosition){if(a==b){hasDuplicate=true
}return a.compareDocumentPosition?-1:1
}var ret=a.compareDocumentPosition(b)&4?-1:a===b?0:1;
if(ret===0){hasDuplicate=true
}return ret
}
}else{if("sourceIndex" in document.documentElement){sortOrder=function(a,b){if(!a.sourceIndex||!b.sourceIndex){if(a==b){hasDuplicate=true
}return a.sourceIndex?-1:1
}var ret=a.sourceIndex-b.sourceIndex;
if(ret===0){hasDuplicate=true
}return ret
}
}else{if(document.createRange){sortOrder=function(a,b){if(!a.ownerDocument||!b.ownerDocument){if(a==b){hasDuplicate=true
}return a.ownerDocument?-1:1
}var aRange=a.ownerDocument.createRange(),bRange=b.ownerDocument.createRange();
aRange.setStart(a,0);
aRange.setEnd(a,0);
bRange.setStart(b,0);
bRange.setEnd(b,0);
var ret=aRange.compareBoundaryPoints(Range.START_TO_END,bRange);
if(ret===0){hasDuplicate=true
}return ret
}
}}}function getText(elems){var ret="",elem;
for(var i=0;
elems[i];
i++){elem=elems[i];
if(elem.nodeType===3||elem.nodeType===4){ret+=elem.nodeValue
}else{if(elem.nodeType!==8){ret+=getText(elem.childNodes)
}}}return ret
}(function(){var form=document.createElement("div"),id="script"+(new Date).getTime();
form.innerHTML="<a name='"+id+"'/>";
var root=document.documentElement;
root.insertBefore(form,root.firstChild);
if(document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);
return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[]
}};
Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");
return elem.nodeType===1&&node&&node.nodeValue===match
}
}root.removeChild(form);
root=form=null
})();
(function(){var div=document.createElement("div");
div.appendChild(document.createComment(""));
if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);
if(match[1]==="*"){var tmp=[];
for(var i=0;
results[i];
i++){if(results[i].nodeType===1){tmp.push(results[i])
}}results=tmp
}return results
}
}div.innerHTML="<a href='#'></a>";
if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2)
}
}div=null
})();
if(document.querySelectorAll){(function(){var oldSizzle=Sizzle,div=document.createElement("div");
div.innerHTML="<p class='TEST'></p>";
if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return
}Sizzle=function(query,context,extra,seed){context=context||document;
if(!seed&&context.nodeType===9&&!isXML(context)){try{return makeArray(context.querySelectorAll(query),extra)
}catch(e){}}return oldSizzle(query,context,extra,seed)
};
for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop]
}div=null
})()
}(function(){var div=document.createElement("div");
div.innerHTML="<div class='test e'></div><div class='test'></div>";
if(!div.getElementsByClassName||div.getElementsByClassName("e").length===0){return
}div.lastChild.className="e";
if(div.getElementsByClassName("e").length===1){return
}Expr.order.splice(1,0,"CLASS");
Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1])
}};
div=null
})();
function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;
i<l;
i++){var elem=checkSet[i];
if(elem){elem=elem[dir];
var match=false;
while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];
break
}if(elem.nodeType===1&&!isXML){elem.sizcache=doneName;
elem.sizset=i
}if(elem.nodeName.toLowerCase()===cur){match=elem;
break
}elem=elem[dir]
}checkSet[i]=match
}}}function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;
i<l;
i++){var elem=checkSet[i];
if(elem){elem=elem[dir];
var match=false;
while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];
break
}if(elem.nodeType===1){if(!isXML){elem.sizcache=doneName;
elem.sizset=i
}if(typeof cur!=="string"){if(elem===cur){match=true;
break
}}else{if(Sizzle.filter(cur,[elem]).length>0){match=elem;
break
}}}elem=elem[dir]
}checkSet[i]=match
}}}var contains=document.compareDocumentPosition?function(a,b){return a.compareDocumentPosition(b)&16
}:function(a,b){return a!==b&&(a.contains?a.contains(b):true)
};
var isXML=function(elem){var documentElement=(elem?elem.ownerDocument||elem:0).documentElement;
return documentElement?documentElement.nodeName!=="HTML":false
};
var posProcess=function(selector,context){var tmpSet=[],later="",match,root=context.nodeType?[context]:context;
while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];
selector=selector.replace(Expr.match.PSEUDO,"")
}selector=Expr.relative[selector]?selector+"*":selector;
for(var i=0,l=root.length;
i<l;
i++){Sizzle(selector,root[i],tmpSet)
}return Sizzle.filter(later,tmpSet)
};
return Sizzle
})();
/*
 * SWFObject v2.1 <http://code.google.com/p/swfobject/>
 * Copyright (c) 2007-2008 Geoff Stearns, Michael Williams, and Bobby van der Sluis
 * This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 *
 * Modified for inclusion in Shadowbox.js
 */
S.flash=(function(){var swfobject=function(){var UNDEF="undefined",OBJECT="object",SHOCKWAVE_FLASH="Shockwave Flash",SHOCKWAVE_FLASH_AX="ShockwaveFlash.ShockwaveFlash",FLASH_MIME_TYPE="application/x-shockwave-flash",EXPRESS_INSTALL_ID="SWFObjectExprInst",win=window,doc=document,nav=navigator,domLoadFnArr=[],regObjArr=[],objIdArr=[],listenersArr=[],script,timer=null,storedAltContent=null,storedAltContentId=null,isDomLoaded=false,isExpressInstallActive=false;
var ua=function(){var w3cdom=typeof doc.getElementById!=UNDEF&&typeof doc.getElementsByTagName!=UNDEF&&typeof doc.createElement!=UNDEF,playerVersion=[0,0,0],d=null;
if(typeof nav.plugins!=UNDEF&&typeof nav.plugins[SHOCKWAVE_FLASH]==OBJECT){d=nav.plugins[SHOCKWAVE_FLASH].description;
if(d&&!(typeof nav.mimeTypes!=UNDEF&&nav.mimeTypes[FLASH_MIME_TYPE]&&!nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)){d=d.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
playerVersion[0]=parseInt(d.replace(/^(.*)\..*$/,"$1"),10);
playerVersion[1]=parseInt(d.replace(/^.*\.(.*)\s.*$/,"$1"),10);
playerVersion[2]=/r/.test(d)?parseInt(d.replace(/^.*r(.*)$/,"$1"),10):0
}}else{if(typeof win.ActiveXObject!=UNDEF){var a=null,fp6Crash=false;
try{a=new ActiveXObject(SHOCKWAVE_FLASH_AX+".7")
}catch(e){try{a=new ActiveXObject(SHOCKWAVE_FLASH_AX+".6");
playerVersion=[6,0,21];
a.AllowScriptAccess="always"
}catch(e){if(playerVersion[0]==6){fp6Crash=true
}}if(!fp6Crash){try{a=new ActiveXObject(SHOCKWAVE_FLASH_AX)
}catch(e){}}}if(!fp6Crash&&a){try{d=a.GetVariable("$version");
if(d){d=d.split(" ")[1].split(",");
playerVersion=[parseInt(d[0],10),parseInt(d[1],10),parseInt(d[2],10)]
}}catch(e){}}}}var u=nav.userAgent.toLowerCase(),p=nav.platform.toLowerCase(),webkit=/webkit/.test(u)?parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,ie=false,windows=p?/win/.test(p):/win/.test(u),mac=p?/mac/.test(p):/mac/.test(u);
/*@cc_on
			ie = true;
			@if (@_win32)
				windows = true;
			@elif (@_mac)
				mac = true;
			@end
		@*/
return{w3cdom:w3cdom,pv:playerVersion,webkit:webkit,ie:ie,win:windows,mac:mac}
}();
var onDomLoad=function(){if(!ua.w3cdom){return
}addDomLoadEvent(main);
if(ua.ie&&ua.win){try{doc.write("<script id=__ie_ondomload defer=true src=//:><\/script>");
script=getElementById("__ie_ondomload");
if(script){addListener(script,"onreadystatechange",checkReadyState)
}}catch(e){}}if(ua.webkit&&typeof doc.readyState!=UNDEF){timer=setInterval(function(){if(/loaded|complete/.test(doc.readyState)){callDomLoadFunctions()
}},10)
}if(typeof doc.addEventListener!=UNDEF){doc.addEventListener("DOMContentLoaded",callDomLoadFunctions,null)
}addLoadEvent(callDomLoadFunctions)
}();
function checkReadyState(){if(script.readyState=="complete"){script.parentNode.removeChild(script);
callDomLoadFunctions()
}}function callDomLoadFunctions(){if(isDomLoaded){return
}if(ua.ie&&ua.win){var s=createElement("span");
try{var t=doc.getElementsByTagName("body")[0].appendChild(s);
t.parentNode.removeChild(t)
}catch(e){return
}}isDomLoaded=true;
if(timer){clearInterval(timer);
timer=null
}var dl=domLoadFnArr.length;
for(var i=0;
i<dl;
i++){domLoadFnArr[i]()
}}function addDomLoadEvent(fn){if(isDomLoaded){fn()
}else{domLoadFnArr[domLoadFnArr.length]=fn
}}function addLoadEvent(fn){if(typeof win.addEventListener!=UNDEF){win.addEventListener("load",fn,false)
}else{if(typeof doc.addEventListener!=UNDEF){doc.addEventListener("load",fn,false)
}else{if(typeof win.attachEvent!=UNDEF){addListener(win,"onload",fn)
}else{if(typeof win.onload=="function"){var fnOld=win.onload;
win.onload=function(){fnOld();
fn()
}
}else{win.onload=fn
}}}}}function main(){var rl=regObjArr.length;
for(var i=0;
i<rl;
i++){var id=regObjArr[i].id;
if(ua.pv[0]>0){var obj=getElementById(id);
if(obj){regObjArr[i].width=obj.getAttribute("width")?obj.getAttribute("width"):"0";
regObjArr[i].height=obj.getAttribute("height")?obj.getAttribute("height"):"0";
if(hasPlayerVersion(regObjArr[i].swfVersion)){if(ua.webkit&&ua.webkit<312){fixParams(obj)
}setVisibility(id,true)
}else{if(regObjArr[i].expressInstall&&!isExpressInstallActive&&hasPlayerVersion("6.0.65")&&(ua.win||ua.mac)){showExpressInstall(regObjArr[i])
}else{displayAltContent(obj)
}}}}else{setVisibility(id,true)
}}}function fixParams(obj){var nestedObj=obj.getElementsByTagName(OBJECT)[0];
if(nestedObj){var e=createElement("embed"),a=nestedObj.attributes;
if(a){var al=a.length;
for(var i=0;
i<al;
i++){if(a[i].nodeName=="DATA"){e.setAttribute("src",a[i].nodeValue)
}else{e.setAttribute(a[i].nodeName,a[i].nodeValue)
}}}var c=nestedObj.childNodes;
if(c){var cl=c.length;
for(var j=0;
j<cl;
j++){if(c[j].nodeType==1&&c[j].nodeName=="PARAM"){e.setAttribute(c[j].getAttribute("name"),c[j].getAttribute("value"))
}}}obj.parentNode.replaceChild(e,obj)
}}function showExpressInstall(regObj){isExpressInstallActive=true;
var obj=getElementById(regObj.id);
if(obj){if(regObj.altContentId){var ac=getElementById(regObj.altContentId);
if(ac){storedAltContent=ac;
storedAltContentId=regObj.altContentId
}}else{storedAltContent=abstractAltContent(obj)
}if(!(/%$/.test(regObj.width))&&parseInt(regObj.width,10)<310){regObj.width="310"
}if(!(/%$/.test(regObj.height))&&parseInt(regObj.height,10)<137){regObj.height="137"
}doc.title=doc.title.slice(0,47)+" - Flash Player Installation";
var pt=ua.ie&&ua.win?"ActiveX":"PlugIn",dt=doc.title,fv="MMredirectURL="+win.location+"&MMplayerType="+pt+"&MMdoctitle="+dt,replaceId=regObj.id;
if(ua.ie&&ua.win&&obj.readyState!=4){var newObj=createElement("div");
replaceId+="SWFObjectNew";
newObj.setAttribute("id",replaceId);
obj.parentNode.insertBefore(newObj,obj);
obj.style.display="none";
var fn=function(){obj.parentNode.removeChild(obj)
};
addListener(win,"onload",fn)
}createSWF({data:regObj.expressInstall,id:EXPRESS_INSTALL_ID,width:regObj.width,height:regObj.height},{flashvars:fv},replaceId)
}}function displayAltContent(obj){if(ua.ie&&ua.win&&obj.readyState!=4){var el=createElement("div");
obj.parentNode.insertBefore(el,obj);
el.parentNode.replaceChild(abstractAltContent(obj),el);
obj.style.display="none";
var fn=function(){obj.parentNode.removeChild(obj)
};
addListener(win,"onload",fn)
}else{obj.parentNode.replaceChild(abstractAltContent(obj),obj)
}}function abstractAltContent(obj){var ac=createElement("div");
if(ua.win&&ua.ie){ac.innerHTML=obj.innerHTML
}else{var nestedObj=obj.getElementsByTagName(OBJECT)[0];
if(nestedObj){var c=nestedObj.childNodes;
if(c){var cl=c.length;
for(var i=0;
i<cl;
i++){if(!(c[i].nodeType==1&&c[i].nodeName=="PARAM")&&!(c[i].nodeType==8)){ac.appendChild(c[i].cloneNode(true))
}}}}}return ac
}function createSWF(attObj,parObj,id){var r,el=getElementById(id);
if(el){if(typeof attObj.id==UNDEF){attObj.id=id
}if(ua.ie&&ua.win){var att="";
for(var i in attObj){if(attObj[i]!=Object.prototype[i]){if(i.toLowerCase()=="data"){parObj.movie=attObj[i]
}else{if(i.toLowerCase()=="styleclass"){att+=' class="'+attObj[i]+'"'
}else{if(i.toLowerCase()!="classid"){att+=" "+i+'="'+attObj[i]+'"'
}}}}}var par="";
for(var j in parObj){if(parObj[j]!=Object.prototype[j]){par+='<param name="'+j+'" value="'+parObj[j]+'" />'
}}el.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+att+">"+par+"</object>";
objIdArr[objIdArr.length]=attObj.id;
r=getElementById(attObj.id)
}else{if(ua.webkit&&ua.webkit<312){var e=createElement("embed");
e.setAttribute("type",FLASH_MIME_TYPE);
for(var k in attObj){if(attObj[k]!=Object.prototype[k]){if(k.toLowerCase()=="data"){e.setAttribute("src",attObj[k])
}else{if(k.toLowerCase()=="styleclass"){e.setAttribute("class",attObj[k])
}else{if(k.toLowerCase()!="classid"){e.setAttribute(k,attObj[k])
}}}}}for(var l in parObj){if(parObj[l]!=Object.prototype[l]){if(l.toLowerCase()!="movie"){e.setAttribute(l,parObj[l])
}}}el.parentNode.replaceChild(e,el);
r=e
}else{var o=createElement(OBJECT);
o.setAttribute("type",FLASH_MIME_TYPE);
for(var m in attObj){if(attObj[m]!=Object.prototype[m]){if(m.toLowerCase()=="styleclass"){o.setAttribute("class",attObj[m])
}else{if(m.toLowerCase()!="classid"){o.setAttribute(m,attObj[m])
}}}}for(var n in parObj){if(parObj[n]!=Object.prototype[n]&&n.toLowerCase()!="movie"){createObjParam(o,n,parObj[n])
}}el.parentNode.replaceChild(o,el);
r=o
}}}return r
}function createObjParam(el,pName,pValue){var p=createElement("param");
p.setAttribute("name",pName);
p.setAttribute("value",pValue);
el.appendChild(p)
}function removeSWF(id){var obj=getElementById(id);
if(obj&&(obj.nodeName=="OBJECT"||obj.nodeName=="EMBED")){if(ua.ie&&ua.win){if(obj.readyState==4){removeObjectInIE(id)
}else{win.attachEvent("onload",function(){removeObjectInIE(id)
})
}}else{obj.parentNode.removeChild(obj)
}}}function removeObjectInIE(id){var obj=getElementById(id);
if(obj){for(var i in obj){if(typeof obj[i]=="function"){obj[i]=null
}}obj.parentNode.removeChild(obj)
}}function getElementById(id){var el=null;
try{el=doc.getElementById(id)
}catch(e){}return el
}function createElement(el){return doc.createElement(el)
}function addListener(target,eventType,fn){target.attachEvent(eventType,fn);
listenersArr[listenersArr.length]=[target,eventType,fn]
}function hasPlayerVersion(rv){var pv=ua.pv,v=rv.split(".");
v[0]=parseInt(v[0],10);
v[1]=parseInt(v[1],10)||0;
v[2]=parseInt(v[2],10)||0;
return(pv[0]>v[0]||(pv[0]==v[0]&&pv[1]>v[1])||(pv[0]==v[0]&&pv[1]==v[1]&&pv[2]>=v[2]))?true:false
}function createCSS(sel,decl){if(ua.ie&&ua.mac){return
}var h=doc.getElementsByTagName("head")[0],s=createElement("style");
s.setAttribute("type","text/css");
s.setAttribute("media","screen");
if(!(ua.ie&&ua.win)&&typeof doc.createTextNode!=UNDEF){s.appendChild(doc.createTextNode(sel+" {"+decl+"}"))
}h.appendChild(s);
if(ua.ie&&ua.win&&typeof doc.styleSheets!=UNDEF&&doc.styleSheets.length>0){var ls=doc.styleSheets[doc.styleSheets.length-1];
if(typeof ls.addRule==OBJECT){ls.addRule(sel,decl)
}}}function setVisibility(id,isVisible){var v=isVisible?"visible":"hidden";
if(isDomLoaded&&getElementById(id)){getElementById(id).style.visibility=v
}else{createCSS("#"+id,"visibility:"+v)
}}function urlEncodeIfNecessary(s){var regex=/[\\\"<>\.;]/;
var hasBadChars=regex.exec(s)!=null;
return hasBadChars?encodeURIComponent(s):s
}var cleanup=function(){if(ua.ie&&ua.win){window.attachEvent("onunload",function(){var ll=listenersArr.length;
for(var i=0;
i<ll;
i++){listenersArr[i][0].detachEvent(listenersArr[i][1],listenersArr[i][2])
}var il=objIdArr.length;
for(var j=0;
j<il;
j++){removeSWF(objIdArr[j])
}for(var k in ua){ua[k]=null
}ua=null;
for(var l in swfobject){swfobject[l]=null
}swfobject=null
})
}}();
return{registerObject:function(objectIdStr,swfVersionStr,xiSwfUrlStr){if(!ua.w3cdom||!objectIdStr||!swfVersionStr){return
}var regObj={};
regObj.id=objectIdStr;
regObj.swfVersion=swfVersionStr;
regObj.expressInstall=xiSwfUrlStr?xiSwfUrlStr:false;
regObjArr[regObjArr.length]=regObj;
setVisibility(objectIdStr,false)
},getObjectById:function(objectIdStr){var r=null;
if(ua.w3cdom){var o=getElementById(objectIdStr);
if(o){var n=o.getElementsByTagName(OBJECT)[0];
if(!n||(n&&typeof o.SetVariable!=UNDEF)){r=o
}else{if(typeof n.SetVariable!=UNDEF){r=n
}}}}return r
},embedSWF:function(swfUrlStr,replaceElemIdStr,widthStr,heightStr,swfVersionStr,xiSwfUrlStr,flashvarsObj,parObj,attObj){if(!ua.w3cdom||!swfUrlStr||!replaceElemIdStr||!widthStr||!heightStr||!swfVersionStr){return
}widthStr+="";
heightStr+="";
if(hasPlayerVersion(swfVersionStr)){setVisibility(replaceElemIdStr,false);
var att={};
if(attObj&&typeof attObj===OBJECT){for(var i in attObj){if(attObj[i]!=Object.prototype[i]){att[i]=attObj[i]
}}}att.data=swfUrlStr;
att.width=widthStr;
att.height=heightStr;
var par={};
if(parObj&&typeof parObj===OBJECT){for(var j in parObj){if(parObj[j]!=Object.prototype[j]){par[j]=parObj[j]
}}}if(flashvarsObj&&typeof flashvarsObj===OBJECT){for(var k in flashvarsObj){if(flashvarsObj[k]!=Object.prototype[k]){if(typeof par.flashvars!=UNDEF){par.flashvars+="&"+k+"="+flashvarsObj[k]
}else{par.flashvars=k+"="+flashvarsObj[k]
}}}}addDomLoadEvent(function(){createSWF(att,par,replaceElemIdStr);
if(att.id==replaceElemIdStr){setVisibility(replaceElemIdStr,true)
}})
}else{if(xiSwfUrlStr&&!isExpressInstallActive&&hasPlayerVersion("6.0.65")&&(ua.win||ua.mac)){isExpressInstallActive=true;
setVisibility(replaceElemIdStr,false);
addDomLoadEvent(function(){var regObj={};
regObj.id=regObj.altContentId=replaceElemIdStr;
regObj.width=widthStr;
regObj.height=heightStr;
regObj.expressInstall=xiSwfUrlStr;
showExpressInstall(regObj)
})
}}},getFlashPlayerVersion:function(){return{major:ua.pv[0],minor:ua.pv[1],release:ua.pv[2]}
},hasFlashPlayerVersion:hasPlayerVersion,createSWF:function(attObj,parObj,replaceElemIdStr){if(ua.w3cdom){return createSWF(attObj,parObj,replaceElemIdStr)
}else{return undefined
}},removeSWF:function(objElemIdStr){if(ua.w3cdom){removeSWF(objElemIdStr)
}},createCSS:function(sel,decl){if(ua.w3cdom){createCSS(sel,decl)
}},addDomLoadEvent:addDomLoadEvent,addLoadEvent:addLoadEvent,getQueryParamValue:function(param){var q=doc.location.search||doc.location.hash;
if(param==null){return urlEncodeIfNecessary(q)
}if(q){var pairs=q.substring(1).split("&");
for(var i=0;
i<pairs.length;
i++){if(pairs[i].substring(0,pairs[i].indexOf("="))==param){return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=")+1)))
}}}return""
},expressInstallCallback:function(){if(isExpressInstallActive&&storedAltContent){var obj=getElementById(EXPRESS_INSTALL_ID);
if(obj){obj.parentNode.replaceChild(storedAltContent,obj);
if(storedAltContentId){setVisibility(storedAltContentId,true);
if(ua.ie&&ua.win){storedAltContent.style.display="block"
}}storedAltContent=null;
storedAltContentId=null;
isExpressInstallActive=false
}}}}
}();
return swfobject
})();
S.lang={code:"en",of:"of",loading:"loading",cancel:"Cancel",next:"Next",previous:"Previous",play:"Play",pause:"Pause",close:"Close",errors:{single:'You must install the <a href="{0}">{1}</a> browser plugin to view this content.',shared:'You must install both the <a href="{0}">{1}</a> and <a href="{2}">{3}</a> browser plugins to view this content.',either:'You must install either the <a href="{0}">{1}</a> or the <a href="{2}">{3}</a> browser plugin to view this content.'}};
var jwControllerHeight=20;
S.flv=function(obj,id){this.obj=obj;
this.id=id;
this.height=obj.height?parseInt(obj.height,10):300;
if(S.options.showMovieControls){this.height+=jwControllerHeight
}this.width=obj.width?parseInt(obj.width,10):300
};
S.flv.ext=["flv","m4v"];
S.flv.prototype={append:function(body,dims){var tmp=document.createElement("div");
tmp.id=this.id;
body.appendChild(tmp);
var height=dims.innerHeight,width=dims.innerWidth,swf=S.path+"player.swf",version=S.options.flashVersion,express=S.path+"expressInstall.swf",flashvars=apply({file:this.obj.content,height:height,width:width,autostart:(S.options.autoplayMovies?"true":"false"),controlbar:(S.options.showMovieControls?"bottom":"none"),backcolor:"0x000000",frontcolor:"0xCCCCCC",lightcolor:"0x557722"},S.options.flashVars),params=S.options.flashParams;
S.flash.embedSWF(swf,this.id,width,height,version,express,flashvars,params)
},remove:function(){S.flash.expressInstallCallback();
S.flash.removeSWF(this.id)
},onWindowResize:function(){var dims=S.dimensions,el=get(this.id);
el.height=dims.innerHeight;
el.width=dims.innerWidth
}};
S.html=function(obj,id){this.obj=obj;
this.id=id;
this.height=obj.height?parseInt(obj.height,10):300;
this.width=obj.width?parseInt(obj.width,10):500
};
S.html.prototype={append:function(body,dims){var div=document.createElement("div");
div.id=this.id;
div.className="html";
div.innerHTML=this.obj.content;
body.appendChild(div)
},remove:function(){var el=get(this.id);
if(el){remove(el)
}}};
S.iframe=function(obj,id){this.obj=obj;
this.id=id;
var overlay=get("sb-overlay");
this.height=obj.height?parseInt(obj.height,10):overlay.offsetHeight;
this.width=obj.width?parseInt(obj.width,10):overlay.offsetWidth
};
S.iframe.prototype={append:function(body,dims){var html='<iframe id="'+this.id+'" name="'+this.id+'" height="100%" width="100%" frameborder="0" marginwidth="0" marginheight="0" style="visibility:hidden" onload="this.style.visibility=\'visible\'" scrolling="auto"';
if(S.isIE){html+=' allowtransparency="true"';
if(S.isIE6){html+=" src=\"javascript:false;document.write('');\""
}}html+="></iframe>";
body.innerHTML=html
},remove:function(){var el=get(this.id);
if(el){remove(el);
if(S.isGecko){delete window.frames[this.id]
}}},onLoad:function(){var win=S.isIE?get(this.id).contentWindow:window.frames[this.id];
win.location.href=this.obj.content
}};
var pre,proxyId="sb-drag-proxy",dragData,dragProxy,dragTarget;
function resetDrag(){dragData={x:0,y:0,startX:null,startY:null}
}function updateProxy(){var dims=S.dimensions;
apply(dragProxy.style,{height:dims.innerHeight+"px",width:dims.innerWidth+"px"})
}function enableDrag(){resetDrag();
var style=["position:absolute","cursor:"+(S.isGecko?"-moz-grab":"move"),"background-color:"+(S.isIE?"#fff;filter:alpha(opacity=0)":"transparent")].join(";");
S.appendHTML(S.skin.body,'<div id="'+proxyId+'" style="'+style+'"></div>');
dragProxy=get(proxyId);
updateProxy();
addEvent(dragProxy,"mousedown",startDrag)
}function disableDrag(){if(dragProxy){removeEvent(dragProxy,"mousedown",startDrag);
remove(dragProxy);
dragProxy=null
}dragTarget=null
}function startDrag(e){preventDefault(e);
var xy=getPageXY(e);
dragData.startX=xy[0];
dragData.startY=xy[1];
dragTarget=get(S.player.id);
addEvent(document,"mousemove",positionDrag);
addEvent(document,"mouseup",endDrag);
if(S.isGecko){dragProxy.style.cursor="-moz-grabbing"
}}function positionDrag(e){var player=S.player,dims=S.dimensions,xy=getPageXY(e);
var moveX=xy[0]-dragData.startX;
dragData.startX+=moveX;
dragData.x=Math.max(Math.min(0,dragData.x+moveX),dims.innerWidth-player.width);
var moveY=xy[1]-dragData.startY;
dragData.startY+=moveY;
dragData.y=Math.max(Math.min(0,dragData.y+moveY),dims.innerHeight-player.height);
apply(dragTarget.style,{left:dragData.x+"px",top:dragData.y+"px"})
}function endDrag(){removeEvent(document,"mousemove",positionDrag);
removeEvent(document,"mouseup",endDrag);
if(S.isGecko){dragProxy.style.cursor="-moz-grab"
}}S.img=function(obj,id){this.obj=obj;
this.id=id;
this.ready=false;
var self=this;
pre=new Image();
pre.onload=function(){self.height=obj.height?parseInt(obj.height,10):pre.height;
self.width=obj.width?parseInt(obj.width,10):pre.width;
self.ready=true;
pre.onload=null;
pre=null
};
pre.src=obj.content
};
S.img.ext=["bmp","gif","jpg","jpeg","png"];
S.img.prototype={append:function(body,dims){var img=document.createElement("img");
img.id=this.id;
img.src=this.obj.content;
img.style.position="absolute";
var height,width;
if(dims.oversized&&S.options.handleOversize=="resize"){height=dims.innerHeight;
width=dims.innerWidth
}else{height=this.height;
width=this.width
}img.setAttribute("height",height);
img.setAttribute("width",width);
body.appendChild(img)
},remove:function(){var el=get(this.id);
if(el){remove(el)
}disableDrag();
if(pre){pre.onload=null;
pre=null
}},onLoad:function(){var dims=S.dimensions;
if(dims.oversized&&S.options.handleOversize=="drag"){enableDrag()
}},onWindowResize:function(){var dims=S.dimensions;
switch(S.options.handleOversize){case"resize":var el=get(this.id);
el.height=dims.innerHeight;
el.width=dims.innerWidth;
break;
case"drag":if(dragTarget){var top=parseInt(S.getStyle(dragTarget,"top")),left=parseInt(S.getStyle(dragTarget,"left"));
if(top+this.height<dims.innerHeight){dragTarget.style.top=dims.innerHeight-this.height+"px"
}if(left+this.width<dims.innerWidth){dragTarget.style.left=dims.innerWidth-this.width+"px"
}updateProxy()
}break
}}};
var qtControllerHeight=16;
S.qt=function(obj,id){this.obj=obj;
this.id=id;
this.height=obj.height?parseInt(obj.height,10):300;
if(S.options.showMovieControls){this.height+=qtControllerHeight
}this.width=obj.width?parseInt(obj.width,10):300
};
S.qt.ext=["dv","mov","moov","movie","mp4","avi","mpg","mpeg"];
S.qt.prototype={append:function(body,dims){var opt=S.options,autoplay=String(opt.autoplayMovies),controls=String(opt.showMovieControls);
var html="<object",movie={id:this.id,name:this.id,height:this.height,width:this.width,kioskmode:"true"};
if(S.isIE){movie.classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B";
movie.codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0"
}else{movie.type="video/quicktime";
movie.data=this.obj.content
}for(var m in movie){html+=" "+m+'="'+movie[m]+'"'
}html+=">";
var params={src:this.obj.content,scale:"aspect",controller:controls,autoplay:autoplay};
for(var p in params){html+='<param name="'+p+'" value="'+params[p]+'">'
}html+="</object>";
body.innerHTML=html
},remove:function(){try{document[this.id].Stop()
}catch(e){}var el=get(this.id);
if(el){remove(el)
}}};
S.swf=function(obj,id){this.obj=obj;
this.id=id;
this.height=obj.height?parseInt(obj.height,10):300;
this.width=obj.width?parseInt(obj.width,10):300
};
S.swf.ext=["swf"];
S.swf.prototype={append:function(body,dims){var tmp=document.createElement("div");
tmp.id=this.id;
body.appendChild(tmp);
var height=dims.innerHeight,width=dims.innerWidth,swf=this.obj.content,version=S.options.flashVersion,express=S.path+"expressInstall.swf",flashvars=S.options.flashVars,params=S.options.flashParams;
S.flash.embedSWF(swf,this.id,width,height,version,express,flashvars,params)
},remove:function(){S.flash.expressInstallCallback();
S.flash.removeSWF(this.id)
},onWindowResize:function(){var dims=S.dimensions,el=get(this.id);
el.height=dims.innerHeight;
el.width=dims.innerWidth
}};
var wmpControllerHeight=(S.isIE?70:45);
S.wmp=function(obj,id){this.obj=obj;
this.id=id;
this.height=obj.height?parseInt(obj.height,10):300;
if(S.options.showMovieControls){this.height+=wmpControllerHeight
}this.width=obj.width?parseInt(obj.width,10):300
};
S.wmp.ext=["asf","avi","mpg","mpeg","wm","wmv"];
S.wmp.prototype={append:function(body,dims){var opt=S.options,autoplay=opt.autoplayMovies?1:0;
var movie='<object id="'+this.id+'" name="'+this.id+'" height="'+this.height+'" width="'+this.width+'"',params={autostart:opt.autoplayMovies?1:0};
if(S.isIE){movie+=' classid="clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6"';
params.url=this.obj.content;
params.uimode=opt.showMovieControls?"full":"none"
}else{movie+=' type="video/x-ms-wmv"';
movie+=' data="'+this.obj.content+'"';
params.showcontrols=opt.showMovieControls?1:0
}movie+=">";
for(var p in params){movie+='<param name="'+p+'" value="'+params[p]+'">'
}movie+="</object>";
body.innerHTML=movie
},remove:function(){if(S.isIE){try{window[this.id].controls.stop();
window[this.id].URL="movie"+now()+".wmv";
window[this.id]=function(){}
}catch(e){}}var el=get(this.id);
if(el){setTimeout(function(){remove(el)
},10)
}}};
var overlayOn=false,visibilityCache=[],pngIds=["sb-nav-close","sb-nav-next","sb-nav-play","sb-nav-pause","sb-nav-previous"],container,overlay,wrapper,doWindowResize=true;
function animate(el,property,to,duration,callback){var isOpacity=(property=="opacity"),anim=isOpacity?S.setOpacity:function(el,value){el.style[property]=""+value+"px"
};
if(duration==0||(!isOpacity&&!S.options.animate)||(isOpacity&&!S.options.animateFade)){anim(el,to);
if(callback){callback()
}return
}var from=parseFloat(S.getStyle(el,property))||0;
var delta=to-from;
if(delta==0){if(callback){callback()
}return
}duration*=1000;
var begin=now(),ease=S.ease,end=begin+duration,time;
var interval=setInterval(function(){time=now();
if(time>=end){clearInterval(interval);
interval=null;
anim(el,to);
if(callback){callback()
}}else{anim(el,from+ease((time-begin)/duration)*delta)
}},10)
}function setSize(){container.style.height=S.getWindowSize("Height")+"px";
container.style.width=S.getWindowSize("Width")+"px"
}function setPosition(){container.style.top=document.documentElement.scrollTop+"px";
container.style.left=document.documentElement.scrollLeft+"px"
}function toggleTroubleElements(on){if(on){each(visibilityCache,function(i,el){el[0].style.visibility=el[1]||""
})
}else{visibilityCache=[];
each(S.options.troubleElements,function(i,tag){each(document.getElementsByTagName(tag),function(j,el){visibilityCache.push([el,el.style.visibility]);
el.style.visibility="hidden"
})
})
}}function toggleNav(id,on){var el=get("sb-nav-"+id);
if(el){el.style.display=on?"":"none"
}}function toggleLoading(on,callback){var loading=get("sb-loading"),playerName=S.getCurrent().player,anim=(playerName=="img"||playerName=="html");
if(on){S.setOpacity(loading,0);
loading.style.display="block";
var wrapped=function(){S.clearOpacity(loading);
if(callback){callback()
}};
if(anim){animate(loading,"opacity",1,S.options.fadeDuration,wrapped)
}else{wrapped()
}}else{var wrapped=function(){loading.style.display="none";
S.clearOpacity(loading);
if(callback){callback()
}};
if(anim){animate(loading,"opacity",0,S.options.fadeDuration,wrapped)
}else{wrapped()
}}}function buildBars(callback){var obj=S.getCurrent();
get("sb-title-inner").innerHTML=obj.title||"";
var close,next,play,pause,previous;
if(S.options.displayNav){close=true;
var len=S.gallery.length;
if(len>1){if(S.options.continuous){next=previous=true
}else{next=(len-1)>S.current;
previous=S.current>0
}}if(S.options.slideshowDelay>0&&S.hasNext()){pause=!S.isPaused();
play=!pause
}}else{close=next=play=pause=previous=false
}toggleNav("close",close);
toggleNav("next",next);
toggleNav("play",play);
toggleNav("pause",pause);
toggleNav("previous",previous);
var counter="";
if(S.options.displayCounter&&S.gallery.length>1){var len=S.gallery.length;
if(S.options.counterType=="skip"){var i=0,end=len,limit=parseInt(S.options.counterLimit)||0;
if(limit<len&&limit>2){var h=Math.floor(limit/2);
i=S.current-h;
if(i<0){i+=len
}end=S.current+(limit-h);
if(end>len){end-=len
}}while(i!=end){if(i==len){i=0
}counter+='<a onclick="Shadowbox.change('+i+');"';
if(i==S.current){counter+=' class="sb-counter-current"'
}counter+=">"+(++i)+"</a>"
}}else{counter=[S.current+1,S.lang.of,len].join(" ")
}}get("sb-counter").innerHTML=counter;
callback()
}function showBars(callback){var titleInner=get("sb-title-inner"),infoInner=get("sb-info-inner"),duration=0.35;
titleInner.style.visibility=infoInner.style.visibility="";
if(titleInner.innerHTML!=""){animate(titleInner,"marginTop",0,duration)
}animate(infoInner,"marginTop",0,duration,callback)
}function hideBars(anim,callback){var title=get("sb-title"),info=get("sb-info"),titleHeight=title.offsetHeight,infoHeight=info.offsetHeight,titleInner=get("sb-title-inner"),infoInner=get("sb-info-inner"),duration=(anim?0.35:0);
animate(titleInner,"marginTop",titleHeight,duration);
animate(infoInner,"marginTop",infoHeight*-1,duration,function(){titleInner.style.visibility=infoInner.style.visibility="hidden";
callback()
})
}function adjustHeight(height,top,anim,callback){var wrapperInner=get("sb-wrapper-inner"),duration=(anim?S.options.resizeDuration:0);
animate(wrapper,"top",top,duration);
animate(wrapperInner,"height",height,duration,callback)
}function adjustWidth(width,left,anim,callback){var duration=(anim?S.options.resizeDuration:0);
animate(wrapper,"left",left,duration);
animate(wrapper,"width",width,duration,callback)
}function setDimensions(height,width){var bodyInner=get("sb-body-inner"),height=parseInt(height),width=parseInt(width),topBottom=wrapper.offsetHeight-bodyInner.offsetHeight,leftRight=wrapper.offsetWidth-bodyInner.offsetWidth,maxHeight=overlay.offsetHeight,maxWidth=overlay.offsetWidth,padding=parseInt(S.options.viewportPadding)||20,preserveAspect=(S.player&&S.options.handleOversize!="drag");
return S.setDimensions(height,width,maxHeight,maxWidth,topBottom,leftRight,padding,preserveAspect)
}var K={};
K.markup='<div id="sb-container"><div id="sb-overlay"></div><div id="sb-wrapper"><div id="sb-title"><div id="sb-title-inner"></div></div><div id="sb-wrapper-inner"><div id="sb-body"><div id="sb-body-inner"></div><div id="sb-loading"><div id="sb-loading-inner"><span>{loading}</span></div></div></div></div><div id="sb-info"><div id="sb-info-inner"><div id="sb-counter"></div><div id="sb-nav"><a id="sb-nav-close" title="{close}" onclick="Shadowbox.close()"></a><a id="sb-nav-next" title="{next}" onclick="Shadowbox.next()"></a><a id="sb-nav-play" title="{play}" onclick="Shadowbox.play()"></a><a id="sb-nav-pause" title="{pause}" onclick="Shadowbox.pause()"></a><a id="sb-nav-previous" title="{previous}" onclick="Shadowbox.previous()"></a></div></div></div></div></div>';
K.options={animSequence:"sync",counterLimit:10,counterType:"default",displayCounter:true,displayNav:true,fadeDuration:0.35,initialHeight:160,initialWidth:320,modal:false,overlayColor:"#000",overlayOpacity:0.5,resizeDuration:0.35,showOverlay:true,troubleElements:["select","object","embed","canvas"]};
K.init=function(){S.appendHTML(document.body,sprintf(K.markup,S.lang));
K.body=get("sb-body-inner");
container=get("sb-container");
overlay=get("sb-overlay");
wrapper=get("sb-wrapper");
if(!supportsFixed){container.style.position="absolute"
}if(!supportsOpacity){var el,m,re=/url\("(.*\.png)"\)/;
each(pngIds,function(i,id){el=get(id);
if(el){m=S.getStyle(el,"backgroundImage").match(re);
if(m){el.style.backgroundImage="none";
el.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,src="+m[1]+",sizingMethod=scale);"
}}})
}var timer;
addEvent(window,"resize",function(){if(timer){clearTimeout(timer);
timer=null
}if(open){timer=setTimeout(K.onWindowResize,10)
}})
};
K.onOpen=function(obj,callback){doWindowResize=false;
container.style.display="block";
setSize();
var dims=setDimensions(S.options.initialHeight,S.options.initialWidth);
adjustHeight(dims.innerHeight,dims.top);
adjustWidth(dims.width,dims.left);
if(S.options.showOverlay){overlay.style.backgroundColor=S.options.overlayColor;
S.setOpacity(overlay,0);
if(!S.options.modal){addEvent(overlay,"click",S.close)
}overlayOn=true
}if(!supportsFixed){setPosition();
addEvent(window,"scroll",setPosition)
}toggleTroubleElements();
container.style.visibility="visible";
if(overlayOn){animate(overlay,"opacity",S.options.overlayOpacity,S.options.fadeDuration,callback)
}else{callback()
}};
K.onLoad=function(changing,callback){toggleLoading(true);
while(K.body.firstChild){remove(K.body.firstChild)
}hideBars(changing,function(){if(!open){return
}if(!changing){wrapper.style.visibility="visible"
}buildBars(callback)
})
};
K.onReady=function(callback){if(!open){return
}var player=S.player,dims=setDimensions(player.height,player.width);
var wrapped=function(){showBars(callback)
};
switch(S.options.animSequence){case"hw":adjustHeight(dims.innerHeight,dims.top,true,function(){adjustWidth(dims.width,dims.left,true,wrapped)
});
break;
case"wh":adjustWidth(dims.width,dims.left,true,function(){adjustHeight(dims.innerHeight,dims.top,true,wrapped)
});
break;
default:adjustWidth(dims.width,dims.left,true);
adjustHeight(dims.innerHeight,dims.top,true,wrapped)
}};
K.onShow=function(callback){toggleLoading(false,callback);
doWindowResize=true
};
K.onClose=function(){if(!supportsFixed){removeEvent(window,"scroll",setPosition)
}removeEvent(overlay,"click",S.close);
wrapper.style.visibility="hidden";
var callback=function(){container.style.visibility="hidden";
container.style.display="none";
toggleTroubleElements(true)
};
if(overlayOn){animate(overlay,"opacity",0,S.options.fadeDuration,callback)
}else{callback()
}};
K.onPlay=function(){toggleNav("play",false);
toggleNav("pause",true)
};
K.onPause=function(){toggleNav("pause",false);
toggleNav("play",true)
};
K.onWindowResize=function(){if(!doWindowResize){return
}setSize();
var player=S.player,dims=setDimensions(player.height,player.width);
adjustWidth(dims.width,dims.left);
adjustHeight(dims.innerHeight,dims.top);
if(player.onWindowResize){player.onWindowResize()
}};
S.skin=K;
window.Shadowbox=S
})(window);
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var F="undefined",t="object",U="Shockwave Flash",Y="ShockwaveFlash.ShockwaveFlash",s="application/x-shockwave-flash",T="SWFObjectExprInst",z="onreadystatechange",Q=window,l=document,v=navigator,V=false,W=[j],q=[],P=[],K=[],n,S,G,D,L=false,a=false,p,I,o=true,O=function(){var ac=typeof l.getElementById!=F&&typeof l.getElementsByTagName!=F&&typeof l.createElement!=F,aj=v.userAgent.toLowerCase(),aa=v.platform.toLowerCase(),ag=aa?/win/.test(aa):/win/.test(aj),ae=aa?/mac/.test(aa):/mac/.test(aj),ah=/webkit/.test(aj)?parseFloat(aj.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,Z=!+"\v1",ai=[0,0,0],ad=null;
if(typeof v.plugins!=F&&typeof v.plugins[U]==t){ad=v.plugins[U].description;
if(ad&&!(typeof v.mimeTypes!=F&&v.mimeTypes[s]&&!v.mimeTypes[s].enabledPlugin)){V=true;
Z=false;
ad=ad.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
ai[0]=parseInt(ad.replace(/^(.*)\..*$/,"$1"),10);
ai[1]=parseInt(ad.replace(/^.*\.(.*)\s.*$/,"$1"),10);
ai[2]=/[a-zA-Z]/.test(ad)?parseInt(ad.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0
}}else{if(typeof Q.ActiveXObject!=F){try{var af=new ActiveXObject(Y);
if(af){ad=af.GetVariable("$version");
if(ad){Z=true;
ad=ad.split(" ")[1].split(",");
ai=[parseInt(ad[0],10),parseInt(ad[1],10),parseInt(ad[2],10)]
}}}catch(ab){}}}return{w3:ac,pv:ai,wk:ah,ie:Z,win:ag,mac:ae}
}(),m=function(){if(!O.w3){return
}if((typeof l.readyState!=F&&l.readyState=="complete")||(typeof l.readyState==F&&(l.getElementsByTagName("body")[0]||l.body))){g()
}if(!L){if(typeof l.addEventListener!=F){l.addEventListener("DOMContentLoaded",g,false)
}if(O.ie&&O.win){l.attachEvent(z,function(){if(l.readyState=="complete"){l.detachEvent(z,arguments.callee);
g()
}});
if(Q==top){(function(){if(L){return
}try{l.documentElement.doScroll("left")
}catch(Z){setTimeout(arguments.callee,0);
return
}g()
})()
}}if(O.wk){(function(){if(L){return
}if(!/loaded|complete/.test(l.readyState)){setTimeout(arguments.callee,0);
return
}g()
})()
}u(g)
}}();
function g(){if(L){return
}try{var ab=l.getElementsByTagName("body")[0].appendChild(E("span"));
ab.parentNode.removeChild(ab)
}catch(ac){return
}L=true;
var Z=W.length;
for(var aa=0;
aa<Z;
aa++){W[aa]()
}}function M(Z){if(L){Z()
}else{W[W.length]=Z
}}function u(aa){if(typeof Q.addEventListener!=F){Q.addEventListener("load",aa,false)
}else{if(typeof l.addEventListener!=F){l.addEventListener("load",aa,false)
}else{if(typeof Q.attachEvent!=F){k(Q,"onload",aa)
}else{if(typeof Q.onload=="function"){var Z=Q.onload;
Q.onload=function(){Z();
aa()
}
}else{Q.onload=aa
}}}}}function j(){if(V){X()
}else{J()
}}function X(){var Z=l.getElementsByTagName("body")[0];
var ac=E(t);
ac.setAttribute("type",s);
var ab=Z.appendChild(ac);
if(ab){var aa=0;
(function(){if(typeof ab.GetVariable!=F){var ad=ab.GetVariable("$version");
if(ad){ad=ad.split(" ")[1].split(",");
O.pv=[parseInt(ad[0],10),parseInt(ad[1],10),parseInt(ad[2],10)]
}}else{if(aa<10){aa++;
setTimeout(arguments.callee,10);
return
}}Z.removeChild(ac);
ab=null;
J()
})()
}else{J()
}}function J(){var ai=q.length;
if(ai>0){for(var ah=0;
ah<ai;
ah++){var aa=q[ah].id;
var ad=q[ah].callbackFn;
var ac={success:false,id:aa};
if(O.pv[0]>0){var ag=c(aa);
if(ag){if(H(q[ah].swfVersion)&&!(O.wk&&O.wk<312)){y(aa,true);
if(ad){ac.success=true;
ac.ref=B(aa);
ad(ac)
}}else{if(q[ah].expressInstall&&C()){var ak={};
ak.data=q[ah].expressInstall;
ak.width=ag.getAttribute("width")||"0";
ak.height=ag.getAttribute("height")||"0";
if(ag.getAttribute("class")){ak.styleclass=ag.getAttribute("class")
}if(ag.getAttribute("align")){ak.align=ag.getAttribute("align")
}var aj={};
var Z=ag.getElementsByTagName("param");
var ae=Z.length;
for(var af=0;
af<ae;
af++){if(Z[af].getAttribute("name").toLowerCase()!="movie"){aj[Z[af].getAttribute("name")]=Z[af].getAttribute("value")
}}R(ak,aj,aa,ad)
}else{r(ag);
if(ad){ad(ac)
}}}}}else{y(aa,true);
if(ad){var ab=B(aa);
if(ab&&typeof ab.SetVariable!=F){ac.success=true;
ac.ref=ab
}ad(ac)
}}}}}function B(ac){var Z=null;
var aa=c(ac);
if(aa&&aa.nodeName=="OBJECT"){if(typeof aa.SetVariable!=F){Z=aa
}else{var ab=aa.getElementsByTagName(t)[0];
if(ab){Z=ab
}}}return Z
}function C(){return !a&&H("6.0.65")&&(O.win||O.mac)&&!(O.wk&&O.wk<312)
}function R(ac,ad,Z,ab){a=true;
G=ab||null;
D={success:false,id:Z};
var ag=c(Z);
if(ag){if(ag.nodeName=="OBJECT"){n=h(ag);
S=null
}else{n=ag;
S=Z
}ac.id=T;
if(typeof ac.width==F||(!/%$/.test(ac.width)&&parseInt(ac.width,10)<310)){ac.width="310"
}if(typeof ac.height==F||(!/%$/.test(ac.height)&&parseInt(ac.height,10)<137)){ac.height="137"
}l.title=l.title.slice(0,47)+" - Flash Player Installation";
var af=O.ie&&O.win?"ActiveX":"PlugIn",ae="MMredirectURL="+Q.location.toString().replace(/&/g,"%26")+"&MMplayerType="+af+"&MMdoctitle="+l.title;
if(typeof ad.flashvars!=F){ad.flashvars+="&"+ae
}else{ad.flashvars=ae
}if(O.ie&&O.win&&ag.readyState!=4){var aa=E("div");
Z+="SWFObjectNew";
aa.setAttribute("id",Z);
ag.parentNode.insertBefore(aa,ag);
ag.style.display="none";
(function(){if(ag.readyState==4){ag.parentNode.removeChild(ag)
}else{setTimeout(arguments.callee,10)
}})()
}w(ac,ad,Z)
}}function r(aa){if(O.ie&&O.win&&aa.readyState!=4){var Z=E("div");
aa.parentNode.insertBefore(Z,aa);
Z.parentNode.replaceChild(h(aa),Z);
aa.style.display="none";
(function(){if(aa.readyState==4){aa.parentNode.removeChild(aa)
}else{setTimeout(arguments.callee,10)
}})()
}else{aa.parentNode.replaceChild(h(aa),aa)
}}function h(ae){var ad=E("div");
if(O.win&&O.ie){ad.innerHTML=ae.innerHTML
}else{var aa=ae.getElementsByTagName(t)[0];
if(aa){var af=aa.childNodes;
if(af){var Z=af.length;
for(var ab=0;
ab<Z;
ab++){if(!(af[ab].nodeType==1&&af[ab].nodeName=="PARAM")&&!(af[ab].nodeType==8)){ad.appendChild(af[ab].cloneNode(true))
}}}}}return ad
}function w(ak,ai,aa){var Z,ac=c(aa);
if(O.wk&&O.wk<312){return Z
}if(ac){if(typeof ak.id==F){ak.id=aa
}if(O.ie&&O.win){var aj="";
for(var ag in ak){if(ak[ag]!=Object.prototype[ag]){if(ag.toLowerCase()=="data"){ai.movie=ak[ag]
}else{if(ag.toLowerCase()=="styleclass"){aj+=' class="'+ak[ag]+'"'
}else{if(ag.toLowerCase()!="classid"){aj+=" "+ag+'="'+ak[ag]+'"'
}}}}}var ah="";
for(var af in ai){if(ai[af]!=Object.prototype[af]){ah+='<param name="'+af+'" value="'+ai[af]+'" />'
}}ac.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+aj+">"+ah+"</object>";
P[P.length]=ak.id;
Z=c(ak.id)
}else{var ab=E(t);
ab.setAttribute("type",s);
for(var ae in ak){if(ak[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="styleclass"){ab.setAttribute("class",ak[ae])
}else{if(ae.toLowerCase()!="classid"){ab.setAttribute(ae,ak[ae])
}}}}for(var ad in ai){if(ai[ad]!=Object.prototype[ad]&&ad.toLowerCase()!="movie"){e(ab,ad,ai[ad])
}}ac.parentNode.replaceChild(ab,ac);
Z=ab
}}return Z
}function e(ab,Z,aa){var ac=E("param");
ac.setAttribute("name",Z);
ac.setAttribute("value",aa);
ab.appendChild(ac)
}function A(aa){var Z=c(aa);
if(Z&&Z.nodeName=="OBJECT"){if(O.ie&&O.win){Z.style.display="none";
(function(){if(Z.readyState==4){b(aa)
}else{setTimeout(arguments.callee,10)
}})()
}else{Z.parentNode.removeChild(Z)
}}}function b(ab){var aa=c(ab);
if(aa){for(var Z in aa){if(typeof aa[Z]=="function"){aa[Z]=null
}}aa.parentNode.removeChild(aa)
}}function c(ab){var Z=null;
try{Z=l.getElementById(ab)
}catch(aa){}return Z
}function E(Z){return l.createElement(Z)
}function k(ab,Z,aa){ab.attachEvent(Z,aa);
K[K.length]=[ab,Z,aa]
}function H(ab){var aa=O.pv,Z=ab.split(".");
Z[0]=parseInt(Z[0],10);
Z[1]=parseInt(Z[1],10)||0;
Z[2]=parseInt(Z[2],10)||0;
return(aa[0]>Z[0]||(aa[0]==Z[0]&&aa[1]>Z[1])||(aa[0]==Z[0]&&aa[1]==Z[1]&&aa[2]>=Z[2]))?true:false
}function x(ae,aa,af,ad){if(O.ie&&O.mac){return
}var ac=l.getElementsByTagName("head")[0];
if(!ac){return
}var Z=(af&&typeof af=="string")?af:"screen";
if(ad){p=null;
I=null
}if(!p||I!=Z){var ab=E("style");
ab.setAttribute("type","text/css");
ab.setAttribute("media",Z);
p=ac.appendChild(ab);
if(O.ie&&O.win&&typeof l.styleSheets!=F&&l.styleSheets.length>0){p=l.styleSheets[l.styleSheets.length-1]
}I=Z
}if(O.ie&&O.win){if(p&&typeof p.addRule==t){p.addRule(ae,aa)
}}else{if(p&&typeof l.createTextNode!=F){p.appendChild(l.createTextNode(ae+" {"+aa+"}"))
}}}function y(ab,Z){if(!o){return
}var aa=Z?"visible":"hidden";
if(L&&c(ab)){c(ab).style.visibility=aa
}else{x("#"+ab,"visibility:"+aa)
}}function N(aa){var ab=/[\\\"<>\.;]/;
var Z=ab.exec(aa)!=null;
return Z&&typeof encodeURIComponent!=F?encodeURIComponent(aa):aa
}var d=function(){if(O.ie&&O.win){window.attachEvent("onunload",function(){var ae=K.length;
for(var ad=0;
ad<ae;
ad++){K[ad][0].detachEvent(K[ad][1],K[ad][2])
}var ab=P.length;
for(var ac=0;
ac<ab;
ac++){A(P[ac])
}for(var aa in O){O[aa]=null
}O=null;
for(var Z in swfobject){swfobject[Z]=null
}swfobject=null
})
}}();
return{registerObject:function(ad,Z,ac,ab){if(O.w3&&ad&&Z){var aa={};
aa.id=ad;
aa.swfVersion=Z;
aa.expressInstall=ac;
aa.callbackFn=ab;
q[q.length]=aa;
y(ad,false)
}else{if(ab){ab({success:false,id:ad})
}}},getObjectById:function(Z){if(O.w3){return B(Z)
}},embedSWF:function(ad,aj,ag,ai,aa,ac,ab,af,ah,ae){var Z={success:false,id:aj};
if(O.w3&&!(O.wk&&O.wk<312)&&ad&&aj&&ag&&ai&&aa){y(aj,false);
M(function(){ag+="";
ai+="";
var al={};
if(ah&&typeof ah===t){for(var an in ah){al[an]=ah[an]
}}al.data=ad;
al.width=ag;
al.height=ai;
var ao={};
if(af&&typeof af===t){for(var am in af){ao[am]=af[am]
}}if(ab&&typeof ab===t){for(var ak in ab){if(typeof ao.flashvars!=F){ao.flashvars+="&"+ak+"="+ab[ak]
}else{ao.flashvars=ak+"="+ab[ak]
}}}if(H(aa)){var ap=w(al,ao,aj);
if(al.id==aj){y(aj,true)
}Z.success=true;
Z.ref=ap
}else{if(ac&&C()){al.data=ac;
R(al,ao,aj,ae);
return
}else{y(aj,true)
}}if(ae){ae(Z)
}})
}else{if(ae){ae(Z)
}}},switchOffAutoHideShow:function(){o=false
},ua:O,getFlashPlayerVersion:function(){return{major:O.pv[0],minor:O.pv[1],release:O.pv[2]}
},hasFlashPlayerVersion:H,createSWF:function(ab,aa,Z){if(O.w3){return w(ab,aa,Z)
}else{return undefined
}},showExpressInstall:function(ab,ac,Z,aa){if(O.w3&&C()){R(ab,ac,Z,aa)
}},removeSWF:function(Z){if(O.w3){A(Z)
}},createCSS:function(ac,ab,aa,Z){if(O.w3){x(ac,ab,aa,Z)
}},addDomLoadEvent:M,addLoadEvent:u,getQueryParamValue:function(ac){var ab=l.location.search||l.location.hash;
if(ab){if(/\?/.test(ab)){ab=ab.split("?")[1]
}if(ac==null){return N(ab)
}var aa=ab.split("&");
for(var Z=0;
Z<aa.length;
Z++){if(aa[Z].substring(0,aa[Z].indexOf("="))==ac){return N(aa[Z].substring((aa[Z].indexOf("=")+1)))
}}}return""
},expressInstallCallback:function(){if(a){var Z=c(T);
if(Z&&n){Z.parentNode.replaceChild(n,Z);
if(S){y(S,true);
if(O.ie&&O.win){n.style.display="block"
}}if(G){G(D)
}}a=false
}}}
}();