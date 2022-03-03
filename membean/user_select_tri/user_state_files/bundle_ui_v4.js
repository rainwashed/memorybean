Ext.ns("Ext.ux");
Ext.ux.Carousel=Ext.extend(Ext.util.Observable,{interval:3,transitionDuration:1,transitionType:"carousel",transitionEasing:"easeOut",itemSelector:"img",activeSlide:0,autoPlay:false,showCloseButton:false,showPlayButton:false,pauseOnNavigate:false,wrap:false,freezeOnHover:false,navigationOnHover:false,hideNavigation:false,constructor:function(b,a){a=a||{};
Ext.apply(this,a);
Ext.ux.Carousel.superclass.constructor.call(this,a);
this.addEvents("beforeprev","prev","beforenext","next","change","play","pause","freeze","unfreeze");
this.el=Ext.get(b);
this.slides=this.els=[];
if(this.autoPlay||this.showPlayButton){this.wrap=true
}if(this.autoPlay&&a.showPlayButton===undefined){this.showPlayButton=true
}if(a.showCloseButton){this.showCloseButton=true
}this.initMarkup();
this.initEvents();
if(this.carouselSize>0){this.refresh()
}},initMarkup:function(){var a=Ext.DomHelper;
this.carouselSize=0;
this.els.container=a.append(this.el,{cls:"ux-carousel-container"},true);
this.slideWidth=this.slideWidth||this.el.getWidth(true);
this.slideHeight=this.slideHeight||this.el.getHeight(true);
this.els.container.setStyle({width:this.slideWidth+"px",height:this.slideHeight+"px"});
this.els.slidesWrap=a.append(this.els.container,{cls:"ux-carousel-slides-wrap"},true);
this.els.navigation=a.append(this.els.container,{cls:"ux-carousel-nav"},true).hide();
this.els.caption=a.append(this.els.navigation,{tag:"h2",cls:"ux-carousel-caption"},true);
if(this.showPlayButton){this.els.navPlay=a.append(this.els.navigation,{tag:"a",href:"#",cls:"ux-carousel-nav-play"},true)
}if(this.showCloseButton){this.els.navClose=a.append(this.els.navigation,{tag:"a",href:"#",cls:"ux-carousel-nav-close"},true)
}this.els.navNext=a.append(this.els.navigation,{tag:"a",href:"#",cls:"ux-carousel-nav-next"},true);
this.els.navPrev=a.append(this.els.navigation,{tag:"a",href:"#",cls:"ux-carousel-nav-prev"},true);
if(this.navWidth){this.els.caption.setWidth(this.slideWidth-this.navWidth)
}else{this.els.caption.setWidth((this.slideWidth-(this.els.navNext.getWidth()*2)-(this.showPlayButton?this.els.navPlay.getWidth():0)-(this.showCloseButton?this.els.navClose.getWidth():0))-60+"px")
}this.el.select(this.itemSelector).appendTo(this.els.slidesWrap).each(function(b){b=b.wrap({cls:"ux-carousel-slide"});
this.slides.push(b);
b.setWidth(this.slideWidth+"px").setHeight(this.slideHeight+"px")
},this);
this.carouselSize=this.slides.length;
if(this.navigationOnHover){this.els.navigation.setStyle("top",(-1*this.els.navigation.getHeight())+"px")
}this.el.clip()
},initEvents:function(){this.els.navPrev.on("click",function(a){a.preventDefault();
var b=a.getTarget();
b.blur();
if(Ext.fly(b).hasClass("ux-carousel-nav-disabled")){return
}this.prev()
},this);
this.els.navNext.on("click",function(a){a.preventDefault();
var b=a.getTarget();
b.blur();
if(Ext.fly(b).hasClass("ux-carousel-nav-disabled")){return
}this.next()
},this);
if(this.showPlayButton){this.els.navPlay.on("click",function(a){a.preventDefault();
a.getTarget().blur();
if(this.playing){this.pause()
}else{this.play()
}},this)
}if(this.showCloseButton){this.els.navClose.on("click",function(a){a.preventDefault();
a.getTarget().blur();
this.close()
},this)
}if(this.freezeOnHover){this.els.container.on("mouseenter",function(){if(this.playing){this.fireEvent("freeze",this.slides[this.activeSlide]);
Ext.TaskMgr.stop(this.playTask)
}},this);
this.els.container.on("mouseleave",function(){if(this.playing){this.fireEvent("unfreeze",this.slides[this.activeSlide]);
Ext.TaskMgr.start(this.playTask)
}},this,{buffer:(this.interval/2)*1000})
}if(this.navigationOnHover){this.els.container.on("mouseenter",function(){if(!this.navigationShown){this.navigationShown=true;
this.els.navigation.stopFx(false).shift({y:this.els.container.getY(),duration:this.transitionDuration})
}},this);
this.els.container.on("mouseleave",function(){if(this.navigationShown){this.navigationShown=false;
this.els.navigation.stopFx(false).shift({y:this.els.navigation.getHeight()-this.els.container.getY(),duration:this.transitionDuration})
}},this)
}if(this.interval&&this.autoPlay){this.play()
}},prev:function(){if(this.fireEvent("beforeprev")===false){return
}if(this.pauseOnNavigate){this.pause()
}this.setSlide(this.activeSlide-1);
this.fireEvent("prev",this.activeSlide);
return this
},next:function(){if(this.fireEvent("beforenext")===false){return
}if(this.pauseOnNavigate){this.pause()
}this.setSlide(this.activeSlide+1);
this.fireEvent("next",this.activeSlide);
return this
},play:function(){if(!this.playing){this.playTask=this.playTask||{run:function(){this.playing=true;
this.setSlide(this.activeSlide+1)
},interval:this.interval*1000,scope:this};
this.playTaskBuffer=this.playTaskBuffer||new Ext.util.DelayedTask(function(){Ext.TaskMgr.start(this.playTask)
},this);
this.playTaskBuffer.delay(this.interval*1000);
this.playing=true;
this.els.navPlay.addClass("ux-carousel-playing");
this.fireEvent("play")
}return this
},pause:function(){if(this.playing){Ext.TaskMgr.stop(this.playTask);
this.playTaskBuffer.cancel();
this.playing=false;
this.els.navPlay.removeClass("ux-carousel-playing");
this.fireEvent("pause")
}return this
},clear:function(){this.els.slidesWrap.update("");
this.slides=[];
this.carouselSize=0;
this.pause();
return this
},add:function(b,a){var c=Ext.fly(b).appendTo(this.els.slidesWrap).wrap({cls:"ux-carousel-slide"});
c.setWidth(this.slideWidth+"px").setHeight(this.slideHeight+"px");
this.slides.push(c);
if(a){this.refresh()
}return this
},refresh:function(){this.carouselSize=this.slides.length;
this.els.slidesWrap.setWidth((this.slideWidth*this.carouselSize)+"px");
if(this.carouselSize>0){if(!this.hideNavigation){this.els.navigation.show()
}this.activeSlide=0;
this.setSlide(0,true)
}return this
},setSlide:function(b,a){if(!this.wrap&&!this.slides[b]){return
}else{if(this.wrap){if(b<0){b=this.carouselSize-1
}else{if(b>this.carouselSize-1){b=0
}}}}if(!this.slides[b]){return
}this.els.caption.update(this.slides[b].child(":first-child",true).title||"");
var d=b*this.slideWidth;
if(!a){switch(this.transitionType){case"fade":this.slides[b].setOpacity(0);
this.slides[this.activeSlide].stopFx(false).fadeOut({duration:this.transitionDuration/2,callback:function(){this.els.slidesWrap.setStyle("left",(-1*d)+"px");
this.slides[this.activeSlide].setOpacity(1);
this.slides[b].fadeIn({duration:this.transitionDuration/2})
},scope:this});
break;
default:var c=(-1*d)+this.els.container.getX();
this.els.slidesWrap.stopFx(false);
this.els.slidesWrap.shift({duration:this.transitionDuration,x:c,easing:this.transitionEasing});
break
}}else{this.els.slidesWrap.setStyle("left","0")
}this.activeSlide=b;
this.updateNav();
this.fireEvent("change",this.slides[b],b)
},updateNav:function(){this.els.navPrev.removeClass("ux-carousel-nav-disabled");
this.els.navNext.removeClass("ux-carousel-nav-disabled");
if(!this.wrap){if(this.activeSlide===0){this.els.navPrev.addClass("ux-carousel-nav-disabled")
}if(this.activeSlide===this.carouselSize-1){this.els.navNext.addClass("ux-carousel-nav-disabled")
}}},close:function(){this.fireEvent("close",this);
this.el.hide()
}});
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.ComponentMgr=function(){var c=new Ext.util.MixedCollection();
var b={};
var a={};
return{register:function(d){c.add(d)
},unregister:function(d){c.remove(d)
},get:function(d){return c.get(d)
},onAvailable:function(f,e,d){c.on("add",function(g,h){if(h.id==f){e.call(d||h,h);
c.un("add",e,d)
}})
},all:c,types:b,ptypes:a,isRegistered:function(d){return b[d]!==undefined
},isPluginRegistered:function(d){return a[d]!==undefined
},registerType:function(e,d){b[e]=d;
d.xtype=e
},create:function(d,e){return d.render?d:new b[d.xtype||e](d)
},registerPlugin:function(e,d){a[e]=d;
d.ptype=e
},createPlugin:function(e,f){var d=a[e.ptype||f];
if(d.init){return d
}else{return new d(e)
}}}
}();
Ext.reg=Ext.ComponentMgr.registerType;
Ext.preg=Ext.ComponentMgr.registerPlugin;
Ext.create=Ext.ComponentMgr.create;
Ext.Component=function(b){b=b||{};
if(b.initialConfig){if(b.isAction){this.baseAction=b
}b=b.initialConfig
}else{if(b.tagName||b.dom||Ext.isString(b)){b={applyTo:b,id:b.id||b}
}}this.initialConfig=b;
Ext.apply(this,b);
this.addEvents("added","disable","enable","beforeshow","show","beforehide","hide","removed","beforerender","render","afterrender","beforedestroy","destroy","beforestaterestore","staterestore","beforestatesave","statesave");
this.getId();
Ext.ComponentMgr.register(this);
Ext.Component.superclass.constructor.call(this);
if(this.baseAction){this.baseAction.addComponent(this)
}this.initComponent();
if(this.plugins){if(Ext.isArray(this.plugins)){for(var c=0,a=this.plugins.length;
c<a;
c++){this.plugins[c]=this.initPlugin(this.plugins[c])
}}else{this.plugins=this.initPlugin(this.plugins)
}}if(this.stateful!==false){this.initState()
}if(this.applyTo){this.applyToMarkup(this.applyTo);
delete this.applyTo
}else{if(this.renderTo){this.render(this.renderTo);
delete this.renderTo
}}};
Ext.Component.AUTO_ID=1000;
Ext.extend(Ext.Component,Ext.util.Observable,{disabled:false,hidden:false,autoEl:"div",disabledClass:"x-item-disabled",allowDomMove:true,autoShow:false,hideMode:"display",hideParent:false,rendered:false,tplWriteMode:"overwrite",bubbleEvents:[],ctype:"Ext.Component",actionMode:"el",getActionEl:function(){return this[this.actionMode]
},initPlugin:function(a){if(a.ptype&&!Ext.isFunction(a.init)){a=Ext.ComponentMgr.createPlugin(a)
}else{if(Ext.isString(a)){a=Ext.ComponentMgr.createPlugin({ptype:a})
}}a.init(this);
return a
},initComponent:function(){if(this.listeners){this.on(this.listeners);
delete this.listeners
}this.enableBubble(this.bubbleEvents)
},render:function(b,a){if(!this.rendered&&this.fireEvent("beforerender",this)!==false){if(!b&&this.el){this.el=Ext.get(this.el);
b=this.el.dom.parentNode;
this.allowDomMove=false
}this.container=Ext.get(b);
if(this.ctCls){this.container.addClass(this.ctCls)
}this.rendered=true;
if(a!==undefined){if(Ext.isNumber(a)){a=this.container.dom.childNodes[a]
}else{a=Ext.getDom(a)
}}this.onRender(this.container,a||null);
if(this.autoShow){this.el.removeClass(["x-hidden","x-hide-"+this.hideMode])
}if(this.cls){this.el.addClass(this.cls);
delete this.cls
}if(this.style){this.el.applyStyles(this.style);
delete this.style
}if(this.overCls){this.el.addClassOnOver(this.overCls)
}this.fireEvent("render",this);
var c=this.getContentTarget();
if(this.html){c.update(Ext.DomHelper.markup(this.html));
delete this.html
}if(this.contentEl){var d=Ext.getDom(this.contentEl);
Ext.fly(d).removeClass(["x-hidden","x-hide-display"]);
c.appendChild(d)
}if(this.tpl){if(!this.tpl.compile){this.tpl=new Ext.XTemplate(this.tpl)
}if(this.data){this.tpl[this.tplWriteMode](c,this.data);
delete this.data
}}this.afterRender(this.container);
if(this.hidden){this.doHide()
}if(this.disabled){this.disable(true)
}if(this.stateful!==false){this.initStateEvents()
}this.fireEvent("afterrender",this)
}return this
},update:function(b,d,a){var c=this.getContentTarget();
if(this.tpl&&typeof b!=="string"){this.tpl[this.tplWriteMode](c,b||{})
}else{var e=Ext.isObject(b)?Ext.DomHelper.markup(b):b;
c.update(e,d,a)
}},onAdded:function(a,b){this.ownerCt=a;
this.initRef();
this.fireEvent("added",this,a,b)
},onRemoved:function(){this.removeRef();
this.fireEvent("removed",this,this.ownerCt);
delete this.ownerCt
},initRef:function(){if(this.ref&&!this.refOwner){var d=this.ref.split("/"),c=d.length,b=0,a=this;
while(a&&b<c){a=a.ownerCt;
++b
}if(a){a[this.refName=d[--b]]=this;
this.refOwner=a
}}},removeRef:function(){if(this.refOwner&&this.refName){delete this.refOwner[this.refName];
delete this.refOwner
}},initState:function(){if(Ext.state.Manager){var b=this.getStateId();
if(b){var a=Ext.state.Manager.get(b);
if(a){if(this.fireEvent("beforestaterestore",this,a)!==false){this.applyState(Ext.apply({},a));
this.fireEvent("staterestore",this,a)
}}}}},getStateId:function(){return this.stateId||((/^(ext-comp-|ext-gen)/).test(String(this.id))?null:this.id)
},initStateEvents:function(){if(this.stateEvents){for(var a=0,b;
b=this.stateEvents[a];
a++){this.on(b,this.saveState,this,{delay:100})
}}},applyState:function(a){if(a){Ext.apply(this,a)
}},getState:function(){return null
},saveState:function(){if(Ext.state.Manager&&this.stateful!==false){var b=this.getStateId();
if(b){var a=this.getState();
if(this.fireEvent("beforestatesave",this,a)!==false){Ext.state.Manager.set(b,a);
this.fireEvent("statesave",this,a)
}}}},applyToMarkup:function(a){this.allowDomMove=false;
this.el=Ext.get(a);
this.render(this.el.dom.parentNode)
},addClass:function(a){if(this.el){this.el.addClass(a)
}else{this.cls=this.cls?this.cls+" "+a:a
}return this
},removeClass:function(a){if(this.el){this.el.removeClass(a)
}else{if(this.cls){this.cls=this.cls.split(" ").remove(a).join(" ")
}}return this
},onRender:function(b,a){if(!this.el&&this.autoEl){if(Ext.isString(this.autoEl)){this.el=document.createElement(this.autoEl)
}else{var c=document.createElement("div");
Ext.DomHelper.overwrite(c,this.autoEl);
this.el=c.firstChild
}if(!this.el.id){this.el.id=this.getId()
}}if(this.el){this.el=Ext.get(this.el);
if(this.allowDomMove!==false){b.dom.insertBefore(this.el.dom,a);
if(c){Ext.removeNode(c);
c=null
}}}},getAutoCreate:function(){var a=Ext.isObject(this.autoCreate)?this.autoCreate:Ext.apply({},this.defaultAutoCreate);
if(this.id&&!a.id){a.id=this.id
}return a
},afterRender:Ext.emptyFn,destroy:function(){if(!this.isDestroyed){if(this.fireEvent("beforedestroy",this)!==false){this.destroying=true;
this.beforeDestroy();
if(this.ownerCt&&this.ownerCt.remove){this.ownerCt.remove(this,false)
}if(this.rendered){this.el.remove();
if(this.actionMode=="container"||this.removeMode=="container"){this.container.remove()
}}if(this.focusTask&&this.focusTask.cancel){this.focusTask.cancel()
}this.onDestroy();
Ext.ComponentMgr.unregister(this);
this.fireEvent("destroy",this);
this.purgeListeners();
this.destroying=false;
this.isDestroyed=true
}}},deleteMembers:function(){var b=arguments;
for(var c=0,a=b.length;
c<a;
++c){delete this[b[c]]
}},beforeDestroy:Ext.emptyFn,onDestroy:Ext.emptyFn,getEl:function(){return this.el
},getContentTarget:function(){return this.el
},getId:function(){return this.id||(this.id="ext-comp-"+(++Ext.Component.AUTO_ID))
},getItemId:function(){return this.itemId||this.getId()
},focus:function(b,a){if(a){this.focusTask=new Ext.util.DelayedTask(this.focus,this,[b,false]);
this.focusTask.delay(Ext.isNumber(a)?a:10);
return this
}if(this.rendered&&!this.isDestroyed){this.el.focus();
if(b===true){this.el.dom.select()
}}return this
},blur:function(){if(this.rendered){this.el.blur()
}return this
},disable:function(a){if(this.rendered){this.onDisable()
}this.disabled=true;
if(a!==true){this.fireEvent("disable",this)
}return this
},onDisable:function(){this.getActionEl().addClass(this.disabledClass);
this.el.dom.disabled=true
},enable:function(){if(this.rendered){this.onEnable()
}this.disabled=false;
this.fireEvent("enable",this);
return this
},onEnable:function(){this.getActionEl().removeClass(this.disabledClass);
this.el.dom.disabled=false
},setDisabled:function(a){return this[a?"disable":"enable"]()
},show:function(){if(this.fireEvent("beforeshow",this)!==false){this.hidden=false;
if(this.autoRender){this.render(Ext.isBoolean(this.autoRender)?Ext.getBody():this.autoRender)
}if(this.rendered){this.onShow()
}this.fireEvent("show",this)
}return this
},onShow:function(){this.getVisibilityEl().removeClass("x-hide-"+this.hideMode)
},hide:function(){if(this.fireEvent("beforehide",this)!==false){this.doHide();
this.fireEvent("hide",this)
}return this
},doHide:function(){this.hidden=true;
if(this.rendered){this.onHide()
}},onHide:function(){this.getVisibilityEl().addClass("x-hide-"+this.hideMode)
},getVisibilityEl:function(){return this.hideParent?this.container:this.getActionEl()
},setVisible:function(a){return this[a?"show":"hide"]()
},isVisible:function(){return this.rendered&&this.getVisibilityEl().isVisible()
},cloneConfig:function(b){b=b||{};
var c=b.id||Ext.id();
var a=Ext.applyIf(b,this.initialConfig);
a.id=c;
return new this.constructor(a)
},getXType:function(){return this.constructor.xtype
},isXType:function(b,a){if(Ext.isFunction(b)){b=b.xtype
}else{if(Ext.isObject(b)){b=b.constructor.xtype
}}return !a?("/"+this.getXTypes()+"/").indexOf("/"+b+"/")!=-1:this.constructor.xtype==b
},getXTypes:function(){var a=this.constructor;
if(!a.xtypes){var d=[],b=this;
while(b&&b.constructor.xtype){d.unshift(b.constructor.xtype);
b=b.constructor.superclass
}a.xtypeChain=d;
a.xtypes=d.join("/")
}return a.xtypes
},findParentBy:function(a){for(var b=this.ownerCt;
(b!=null)&&!a(b,this);
b=b.ownerCt){}return b||null
},findParentByType:function(b,a){return this.findParentBy(function(d){return d.isXType(b,a)
})
},bubble:function(c,b,a){var d=this;
while(d){if(c.apply(b||d,a||[d])===false){break
}d=d.ownerCt
}return this
},getPositionEl:function(){return this.positionEl||this.el
},purgeListeners:function(){Ext.Component.superclass.purgeListeners.call(this);
if(this.mons){this.on("beforedestroy",this.clearMons,this,{single:true})
}},clearMons:function(){Ext.each(this.mons,function(a){a.item.un(a.ename,a.fn,a.scope)
},this);
this.mons=[]
},createMons:function(){if(!this.mons){this.mons=[];
this.on("beforedestroy",this.clearMons,this,{single:true})
}},mon:function(f,b,d,c,a){this.createMons();
if(Ext.isObject(b)){var i=/^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;
var h=b;
for(var g in h){if(i.test(g)){continue
}if(Ext.isFunction(h[g])){this.mons.push({item:f,ename:g,fn:h[g],scope:h.scope});
f.on(g,h[g],h.scope,h)
}else{this.mons.push({item:f,ename:g,fn:h[g],scope:h.scope});
f.on(g,h[g])
}}return
}this.mons.push({item:f,ename:b,fn:d,scope:c});
f.on(b,d,c,a)
},mun:function(g,c,f,e){var h,d;
this.createMons();
for(var b=0,a=this.mons.length;
b<a;
++b){d=this.mons[b];
if(g===d.item&&c==d.ename&&f===d.fn&&e===d.scope){this.mons.splice(b,1);
g.un(c,f,e);
h=true;
break
}}return h
},nextSibling:function(){if(this.ownerCt){var a=this.ownerCt.items.indexOf(this);
if(a!=-1&&a+1<this.ownerCt.items.getCount()){return this.ownerCt.items.itemAt(a+1)
}}return null
},previousSibling:function(){if(this.ownerCt){var a=this.ownerCt.items.indexOf(this);
if(a>0){return this.ownerCt.items.itemAt(a-1)
}}return null
},getBubbleTarget:function(){return this.ownerCt
}});
Ext.reg("component",Ext.Component);
Ext.Action=Ext.extend(Object,{constructor:function(a){this.initialConfig=a;
this.itemId=a.itemId=(a.itemId||a.id||Ext.id());
this.items=[]
},isAction:true,setText:function(a){this.initialConfig.text=a;
this.callEach("setText",[a])
},getText:function(){return this.initialConfig.text
},setIconClass:function(a){this.initialConfig.iconCls=a;
this.callEach("setIconClass",[a])
},getIconClass:function(){return this.initialConfig.iconCls
},setDisabled:function(a){this.initialConfig.disabled=a;
this.callEach("setDisabled",[a])
},enable:function(){this.setDisabled(false)
},disable:function(){this.setDisabled(true)
},isDisabled:function(){return this.initialConfig.disabled
},setHidden:function(a){this.initialConfig.hidden=a;
this.callEach("setVisible",[!a])
},show:function(){this.setHidden(false)
},hide:function(){this.setHidden(true)
},isHidden:function(){return this.initialConfig.hidden
},setHandler:function(b,a){this.initialConfig.handler=b;
this.initialConfig.scope=a;
this.callEach("setHandler",[b,a])
},each:function(b,a){Ext.each(this.items,b,a)
},callEach:function(e,b){var d=this.items;
for(var c=0,a=d.length;
c<a;
c++){d[c][e].apply(d[c],b)
}},addComponent:function(a){this.items.push(a);
a.on("destroy",this.removeComponent,this)
},removeComponent:function(a){this.items.remove(a)
},execute:function(){this.initialConfig.handler.apply(this.initialConfig.scope||window,arguments)
}});
(function(){Ext.Layer=function(d,c){d=d||{};
var e=Ext.DomHelper,g=d.parentEl,f=g?Ext.getDom(g):document.body;
if(c){this.dom=Ext.getDom(c)
}if(!this.dom){var h=d.dh||{tag:"div",cls:"x-layer"};
this.dom=e.append(f,h)
}if(d.cls){this.addClass(d.cls)
}this.constrain=d.constrain!==false;
this.setVisibilityMode(Ext.Element.VISIBILITY);
if(d.id){this.id=this.dom.id=d.id
}else{this.id=Ext.id(this.dom)
}this.zindex=d.zindex||this.getZIndex();
this.position("absolute",this.zindex);
if(d.shadow){this.shadowOffset=d.shadowOffset||4;
this.shadow=new Ext.Shadow({offset:this.shadowOffset,mode:d.shadow})
}else{this.shadowOffset=0
}this.useShim=d.shim!==false&&Ext.useShims;
this.useDisplay=d.useDisplay;
this.hide()
};
var a=Ext.Element.prototype;
var b=[];
Ext.extend(Ext.Layer,Ext.Element,{getZIndex:function(){return this.zindex||parseInt((this.getShim()||this).getStyle("z-index"),10)||11000
},getShim:function(){if(!this.useShim){return null
}if(this.shim){return this.shim
}var d=b.shift();
if(!d){d=this.createShim();
d.enableDisplayMode("block");
d.dom.style.display="none";
d.dom.style.visibility="visible"
}var c=this.dom.parentNode;
if(d.dom.parentNode!=c){c.insertBefore(d.dom,this.dom)
}d.setStyle("z-index",this.getZIndex()-2);
this.shim=d;
return d
},hideShim:function(){if(this.shim){this.shim.setDisplayed(false);
b.push(this.shim);
delete this.shim
}},disableShadow:function(){if(this.shadow){this.shadowDisabled=true;
this.shadow.hide();
this.lastShadowOffset=this.shadowOffset;
this.shadowOffset=0
}},enableShadow:function(c){if(this.shadow){this.shadowDisabled=false;
if(Ext.isDefined(this.lastShadowOffset)){this.shadowOffset=this.lastShadowOffset;
delete this.lastShadowOffset
}if(c){this.sync(true)
}}},sync:function(d){var m=this.shadow;
if(!this.updating&&this.isVisible()&&(m||this.useShim)){var g=this.getShim(),k=this.getWidth(),i=this.getHeight(),e=this.getLeft(true),n=this.getTop(true);
if(m&&!this.shadowDisabled){if(d&&!m.isVisible()){m.show(this)
}else{m.realign(e,n,k,i)
}if(g){if(d){g.show()
}var j=m.el.getXY(),f=g.dom.style,c=m.el.getSize();
f.left=(j[0])+"px";
f.top=(j[1])+"px";
f.width=(c.width)+"px";
f.height=(c.height)+"px"
}}else{if(g){if(d){g.show()
}g.setSize(k,i);
g.setLeftTop(e,n)
}}}},destroy:function(){this.hideShim();
if(this.shadow){this.shadow.hide()
}this.removeAllListeners();
Ext.removeNode(this.dom);
delete this.dom
},remove:function(){this.destroy()
},beginUpdate:function(){this.updating=true
},endUpdate:function(){this.updating=false;
this.sync(true)
},hideUnders:function(c){if(this.shadow){this.shadow.hide()
}this.hideShim()
},constrainXY:function(){if(this.constrain){var i=Ext.lib.Dom.getViewWidth(),d=Ext.lib.Dom.getViewHeight();
var n=Ext.getDoc().getScroll();
var m=this.getXY();
var j=m[0],g=m[1];
var c=this.shadowOffset;
var k=this.dom.offsetWidth+c,e=this.dom.offsetHeight+c;
var f=false;
if((j+k)>i+n.left){j=i-k-c;
f=true
}if((g+e)>d+n.top){g=d-e-c;
f=true
}if(j<n.left){j=n.left;
f=true
}if(g<n.top){g=n.top;
f=true
}if(f){if(this.avoidY){var l=this.avoidY;
if(g<=l&&(g+e)>=l){g=l-e-5
}}m=[j,g];
this.storeXY(m);
a.setXY.call(this,m);
this.sync()
}}return this
},getConstrainOffset:function(){return this.shadowOffset
},isVisible:function(){return this.visible
},showAction:function(){this.visible=true;
if(this.useDisplay===true){this.setDisplayed("")
}else{if(this.lastXY){a.setXY.call(this,this.lastXY)
}else{if(this.lastLT){a.setLeftTop.call(this,this.lastLT[0],this.lastLT[1])
}}}},hideAction:function(){this.visible=false;
if(this.useDisplay===true){this.setDisplayed(false)
}else{this.setLeftTop(-10000,-10000)
}},setVisible:function(h,g,j,k,i){if(h){this.showAction()
}if(g&&h){var f=function(){this.sync(true);
if(k){k()
}}.createDelegate(this);
a.setVisible.call(this,true,true,j,f,i)
}else{if(!h){this.hideUnders(true)
}var f=k;
if(g){f=function(){this.hideAction();
if(k){k()
}}.createDelegate(this)
}a.setVisible.call(this,h,g,j,f,i);
if(h){this.sync(true)
}else{if(!g){this.hideAction()
}}}return this
},storeXY:function(c){delete this.lastLT;
this.lastXY=c
},storeLeftTop:function(d,c){delete this.lastXY;
this.lastLT=[d,c]
},beforeFx:function(){this.beforeAction();
return Ext.Layer.superclass.beforeFx.apply(this,arguments)
},afterFx:function(){Ext.Layer.superclass.afterFx.apply(this,arguments);
this.sync(this.isVisible())
},beforeAction:function(){if(!this.updating&&this.shadow){this.shadow.hide()
}},setLeft:function(c){this.storeLeftTop(c,this.getTop(true));
a.setLeft.apply(this,arguments);
this.sync();
return this
},setTop:function(c){this.storeLeftTop(this.getLeft(true),c);
a.setTop.apply(this,arguments);
this.sync();
return this
},setLeftTop:function(d,c){this.storeLeftTop(d,c);
a.setLeftTop.apply(this,arguments);
this.sync();
return this
},setXY:function(i,g,j,k,h){this.fixDisplay();
this.beforeAction();
this.storeXY(i);
var f=this.createCB(k);
a.setXY.call(this,i,g,j,f,h);
if(!g){f()
}return this
},createCB:function(e){var d=this;
return function(){d.constrainXY();
d.sync(true);
if(e){e()
}}
},setX:function(f,g,i,j,h){this.setXY([f,this.getY()],g,i,j,h);
return this
},setY:function(j,f,h,i,g){this.setXY([this.getX(),j],f,h,i,g);
return this
},setSize:function(i,j,g,l,m,k){this.beforeAction();
var f=this.createCB(m);
a.setSize.call(this,i,j,g,l,f,k);
if(!g){f()
}return this
},setWidth:function(h,g,j,k,i){this.beforeAction();
var f=this.createCB(k);
a.setWidth.call(this,h,g,j,f,i);
if(!g){f()
}return this
},setHeight:function(i,g,k,l,j){this.beforeAction();
var f=this.createCB(l);
a.setHeight.call(this,i,g,k,f,j);
if(!g){f()
}return this
},setBounds:function(n,l,o,g,m,j,k,i){this.beforeAction();
var f=this.createCB(k);
if(!m){this.storeXY([n,l]);
a.setXY.call(this,[n,l]);
a.setSize.call(this,o,g,m,j,f,i);
f()
}else{a.setBounds.call(this,n,l,o,g,m,j,f,i)
}return this
},setZIndex:function(c){this.zindex=c;
this.setStyle("z-index",c+2);
if(this.shadow){this.shadow.setZIndex(c+1)
}if(this.shim){this.shim.setStyle("z-index",c)
}return this
}})
})();
Ext.Shadow=function(d){Ext.apply(this,d);
if(typeof this.mode!="string"){this.mode=this.defaultMode
}var e=this.offset,c={h:0},b=Math.floor(this.offset/2);
switch(this.mode.toLowerCase()){case"drop":c.w=0;
c.l=c.t=e;
c.t-=1;
if(Ext.isIE){c.l-=this.offset+b;
c.t-=this.offset+b;
c.w-=b;
c.h-=b;
c.t+=1
}break;
case"sides":c.w=(e*2);
c.l=-e;
c.t=e-1;
if(Ext.isIE){c.l-=(this.offset-b);
c.t-=this.offset+b;
c.l+=1;
c.w-=(this.offset-b)*2;
c.w-=b+1;
c.h-=1
}break;
case"frame":c.w=c.h=(e*2);
c.l=c.t=-e;
c.t+=1;
c.h-=2;
if(Ext.isIE){c.l-=(this.offset-b);
c.t-=(this.offset-b);
c.l+=1;
c.w-=(this.offset+b+1);
c.h-=(this.offset+b);
c.h+=1
}break
}this.adjusts=c
};
Ext.Shadow.prototype={offset:4,defaultMode:"drop",show:function(a){a=Ext.get(a);
if(!this.el){this.el=Ext.Shadow.Pool.pull();
if(this.el.dom.nextSibling!=a.dom){this.el.insertBefore(a)
}}this.el.setStyle("z-index",this.zIndex||parseInt(a.getStyle("z-index"),10)-1);
if(Ext.isIE){this.el.dom.style.filter="progid:DXImageTransform.Microsoft.alpha(opacity=50) progid:DXImageTransform.Microsoft.Blur(pixelradius="+(this.offset)+")"
}this.realign(a.getLeft(true),a.getTop(true),a.getWidth(),a.getHeight());
this.el.dom.style.display="block"
},isVisible:function(){return this.el?true:false
},realign:function(b,q,p,f){if(!this.el){return
}var m=this.adjusts,j=this.el.dom,r=j.style,g=0,o=(p+m.w),e=(f+m.h),i=o+"px",n=e+"px",k,c;
r.left=(b+m.l)+"px";
r.top=(q+m.t)+"px";
if(r.width!=i||r.height!=n){r.width=i;
r.height=n;
if(!Ext.isIE){k=j.childNodes;
c=Math.max(0,(o-12))+"px";
k[0].childNodes[1].style.width=c;
k[1].childNodes[1].style.width=c;
k[2].childNodes[1].style.width=c;
k[1].style.height=Math.max(0,(e-12))+"px"
}}},hide:function(){if(this.el){this.el.dom.style.display="none";
Ext.Shadow.Pool.push(this.el);
delete this.el
}},setZIndex:function(a){this.zIndex=a;
if(this.el){this.el.setStyle("z-index",a)
}}};
Ext.Shadow.Pool=function(){var b=[],a=Ext.isIE?'<div class="x-ie-shadow"></div>':'<div class="x-shadow"><div class="xst"><div class="xstl"></div><div class="xstc"></div><div class="xstr"></div></div><div class="xsc"><div class="xsml"></div><div class="xsmc"></div><div class="xsmr"></div></div><div class="xsb"><div class="xsbl"></div><div class="xsbc"></div><div class="xsbr"></div></div></div>';
return{pull:function(){var c=b.shift();
if(!c){c=Ext.get(Ext.DomHelper.insertHtml("beforeBegin",document.body.firstChild,a));
c.autoBoxAdjust=false
}return c
},push:function(c){b.push(c)
}}
}();
Ext.BoxComponent=Ext.extend(Ext.Component,{initComponent:function(){Ext.BoxComponent.superclass.initComponent.call(this);
this.addEvents("resize","move")
},boxReady:false,deferHeight:false,setSize:function(b,d){if(typeof b=="object"){d=b.height;
b=b.width
}if(Ext.isDefined(b)&&Ext.isDefined(this.boxMinWidth)&&(b<this.boxMinWidth)){b=this.boxMinWidth
}if(Ext.isDefined(d)&&Ext.isDefined(this.boxMinHeight)&&(d<this.boxMinHeight)){d=this.boxMinHeight
}if(Ext.isDefined(b)&&Ext.isDefined(this.boxMaxWidth)&&(b>this.boxMaxWidth)){b=this.boxMaxWidth
}if(Ext.isDefined(d)&&Ext.isDefined(this.boxMaxHeight)&&(d>this.boxMaxHeight)){d=this.boxMaxHeight
}if(!this.boxReady){this.width=b;
this.height=d;
return this
}if(this.cacheSizes!==false&&this.lastSize&&this.lastSize.width==b&&this.lastSize.height==d){return this
}this.lastSize={width:b,height:d};
var c=this.adjustSize(b,d),f=c.width,a=c.height,e;
if(f!==undefined||a!==undefined){e=this.getResizeEl();
if(!this.deferHeight&&f!==undefined&&a!==undefined){e.setSize(f,a)
}else{if(!this.deferHeight&&a!==undefined){e.setHeight(a)
}else{if(f!==undefined){e.setWidth(f)
}}}this.onResize(f,a,b,d);
this.fireEvent("resize",this,f,a,b,d)
}return this
},setWidth:function(a){return this.setSize(a)
},setHeight:function(a){return this.setSize(undefined,a)
},getSize:function(){return this.getResizeEl().getSize()
},getWidth:function(){return this.getResizeEl().getWidth()
},getHeight:function(){return this.getResizeEl().getHeight()
},getOuterSize:function(){var a=this.getResizeEl();
return{width:a.getWidth()+a.getMargins("lr"),height:a.getHeight()+a.getMargins("tb")}
},getPosition:function(a){var b=this.getPositionEl();
if(a===true){return[b.getLeft(true),b.getTop(true)]
}return this.xy||b.getXY()
},getBox:function(a){var c=this.getPosition(a);
var b=this.getSize();
b.x=c[0];
b.y=c[1];
return b
},updateBox:function(a){this.setSize(a.width,a.height);
this.setPagePosition(a.x,a.y);
return this
},getResizeEl:function(){return this.resizeEl||this.el
},setAutoScroll:function(a){if(this.rendered){this.getContentTarget().setOverflow(a?"auto":"")
}this.autoScroll=a;
return this
},setPosition:function(a,f){if(a&&typeof a[1]=="number"){f=a[1];
a=a[0]
}this.x=a;
this.y=f;
if(!this.boxReady){return this
}var b=this.adjustPosition(a,f);
var e=b.x,d=b.y;
var c=this.getPositionEl();
if(e!==undefined||d!==undefined){if(e!==undefined&&d!==undefined){c.setLeftTop(e,d)
}else{if(e!==undefined){c.setLeft(e)
}else{if(d!==undefined){c.setTop(d)
}}}this.onPosition(e,d);
this.fireEvent("move",this,e,d)
}return this
},setPagePosition:function(a,c){if(a&&typeof a[1]=="number"){c=a[1];
a=a[0]
}this.pageX=a;
this.pageY=c;
if(!this.boxReady){return
}if(a===undefined||c===undefined){return
}var b=this.getPositionEl().translatePoints(a,c);
this.setPosition(b.left,b.top);
return this
},afterRender:function(){Ext.BoxComponent.superclass.afterRender.call(this);
if(this.resizeEl){this.resizeEl=Ext.get(this.resizeEl)
}if(this.positionEl){this.positionEl=Ext.get(this.positionEl)
}this.boxReady=true;
Ext.isDefined(this.autoScroll)&&this.setAutoScroll(this.autoScroll);
this.setSize(this.width,this.height);
if(this.x||this.y){this.setPosition(this.x,this.y)
}else{if(this.pageX||this.pageY){this.setPagePosition(this.pageX,this.pageY)
}}},syncSize:function(){delete this.lastSize;
this.setSize(this.autoWidth?undefined:this.getResizeEl().getWidth(),this.autoHeight?undefined:this.getResizeEl().getHeight());
return this
},onResize:function(d,b,a,c){},onPosition:function(a,b){},adjustSize:function(a,b){if(this.autoWidth){a="auto"
}if(this.autoHeight){b="auto"
}return{width:a,height:b}
},adjustPosition:function(a,b){return{x:a,y:b}
}});
Ext.reg("box",Ext.BoxComponent);
Ext.Spacer=Ext.extend(Ext.BoxComponent,{autoEl:"div"});
Ext.reg("spacer",Ext.Spacer);
Ext.SplitBar=function(c,e,b,d,a){this.el=Ext.get(c,true);
this.el.dom.unselectable="on";
this.resizingEl=Ext.get(e,true);
this.orientation=b||Ext.SplitBar.HORIZONTAL;
this.minSize=0;
this.maxSize=2000;
this.animate=false;
this.useShim=false;
this.shim=null;
if(!a){this.proxy=Ext.SplitBar.createProxy(this.orientation)
}else{this.proxy=Ext.get(a).dom
}this.dd=new Ext.dd.DDProxy(this.el.dom.id,"XSplitBars",{dragElId:this.proxy.id});
this.dd.b4StartDrag=this.onStartProxyDrag.createDelegate(this);
this.dd.endDrag=this.onEndProxyDrag.createDelegate(this);
this.dragSpecs={};
this.adapter=new Ext.SplitBar.BasicLayoutAdapter();
this.adapter.init(this);
if(this.orientation==Ext.SplitBar.HORIZONTAL){this.placement=d||(this.el.getX()>this.resizingEl.getX()?Ext.SplitBar.LEFT:Ext.SplitBar.RIGHT);
this.el.addClass("x-splitbar-h")
}else{this.placement=d||(this.el.getY()>this.resizingEl.getY()?Ext.SplitBar.TOP:Ext.SplitBar.BOTTOM);
this.el.addClass("x-splitbar-v")
}this.addEvents("resize","moved","beforeresize","beforeapply");
Ext.SplitBar.superclass.constructor.call(this)
};
Ext.extend(Ext.SplitBar,Ext.util.Observable,{onStartProxyDrag:function(a,e){this.fireEvent("beforeresize",this);
this.overlay=Ext.DomHelper.append(document.body,{cls:"x-drag-overlay",html:"&#160;"},true);
this.overlay.unselectable();
this.overlay.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));
this.overlay.show();
Ext.get(this.proxy).setDisplayed("block");
var c=this.adapter.getElementSize(this);
this.activeMinSize=this.getMinimumSize();
this.activeMaxSize=this.getMaximumSize();
var d=c-this.activeMinSize;
var b=Math.max(this.activeMaxSize-c,0);
if(this.orientation==Ext.SplitBar.HORIZONTAL){this.dd.resetConstraints();
this.dd.setXConstraint(this.placement==Ext.SplitBar.LEFT?d:b,this.placement==Ext.SplitBar.LEFT?b:d,this.tickSize);
this.dd.setYConstraint(0,0)
}else{this.dd.resetConstraints();
this.dd.setXConstraint(0,0);
this.dd.setYConstraint(this.placement==Ext.SplitBar.TOP?d:b,this.placement==Ext.SplitBar.TOP?b:d,this.tickSize)
}this.dragSpecs.startSize=c;
this.dragSpecs.startPoint=[a,e];
Ext.dd.DDProxy.prototype.b4StartDrag.call(this.dd,a,e)
},onEndProxyDrag:function(c){Ext.get(this.proxy).setDisplayed(false);
var b=Ext.lib.Event.getXY(c);
if(this.overlay){Ext.destroy(this.overlay);
delete this.overlay
}var a;
if(this.orientation==Ext.SplitBar.HORIZONTAL){a=this.dragSpecs.startSize+(this.placement==Ext.SplitBar.LEFT?b[0]-this.dragSpecs.startPoint[0]:this.dragSpecs.startPoint[0]-b[0])
}else{a=this.dragSpecs.startSize+(this.placement==Ext.SplitBar.TOP?b[1]-this.dragSpecs.startPoint[1]:this.dragSpecs.startPoint[1]-b[1])
}a=Math.min(Math.max(a,this.activeMinSize),this.activeMaxSize);
if(a!=this.dragSpecs.startSize){if(this.fireEvent("beforeapply",this,a)!==false){this.adapter.setElementSize(this,a);
this.fireEvent("moved",this,a);
this.fireEvent("resize",this,a)
}}},getAdapter:function(){return this.adapter
},setAdapter:function(a){this.adapter=a;
this.adapter.init(this)
},getMinimumSize:function(){return this.minSize
},setMinimumSize:function(a){this.minSize=a
},getMaximumSize:function(){return this.maxSize
},setMaximumSize:function(a){this.maxSize=a
},setCurrentSize:function(b){var a=this.animate;
this.animate=false;
this.adapter.setElementSize(this,b);
this.animate=a
},destroy:function(a){Ext.destroy(this.shim,Ext.get(this.proxy));
this.dd.unreg();
if(a){this.el.remove()
}this.purgeListeners()
}});
Ext.SplitBar.createProxy=function(b){var c=new Ext.Element(document.createElement("div"));
document.body.appendChild(c.dom);
c.unselectable();
var a="x-splitbar-proxy";
c.addClass(a+" "+(b==Ext.SplitBar.HORIZONTAL?a+"-h":a+"-v"));
return c.dom
};
Ext.SplitBar.BasicLayoutAdapter=function(){};
Ext.SplitBar.BasicLayoutAdapter.prototype={init:function(a){},getElementSize:function(a){if(a.orientation==Ext.SplitBar.HORIZONTAL){return a.resizingEl.getWidth()
}else{return a.resizingEl.getHeight()
}},setElementSize:function(b,a,c){if(b.orientation==Ext.SplitBar.HORIZONTAL){if(!b.animate){b.resizingEl.setWidth(a);
if(c){c(b,a)
}}else{b.resizingEl.setWidth(a,true,0.1,c,"easeOut")
}}else{if(!b.animate){b.resizingEl.setHeight(a);
if(c){c(b,a)
}}else{b.resizingEl.setHeight(a,true,0.1,c,"easeOut")
}}}};
Ext.SplitBar.AbsoluteLayoutAdapter=function(a){this.basic=new Ext.SplitBar.BasicLayoutAdapter();
this.container=Ext.get(a)
};
Ext.SplitBar.AbsoluteLayoutAdapter.prototype={init:function(a){this.basic.init(a)
},getElementSize:function(a){return this.basic.getElementSize(a)
},setElementSize:function(b,a,c){this.basic.setElementSize(b,a,this.moveSplitter.createDelegate(this,[b]))
},moveSplitter:function(a){var b=Ext.SplitBar;
switch(a.placement){case b.LEFT:a.el.setX(a.resizingEl.getRight());
break;
case b.RIGHT:a.el.setStyle("right",(this.container.getWidth()-a.resizingEl.getLeft())+"px");
break;
case b.TOP:a.el.setY(a.resizingEl.getBottom());
break;
case b.BOTTOM:a.el.setY(a.resizingEl.getTop()-a.el.getHeight());
break
}}};
Ext.SplitBar.VERTICAL=1;
Ext.SplitBar.HORIZONTAL=2;
Ext.SplitBar.LEFT=1;
Ext.SplitBar.RIGHT=2;
Ext.SplitBar.TOP=3;
Ext.SplitBar.BOTTOM=4;
Ext.Container=Ext.extend(Ext.BoxComponent,{bufferResize:50,autoDestroy:true,forceLayout:false,defaultType:"panel",resizeEvent:"resize",bubbleEvents:["add","remove"],initComponent:function(){Ext.Container.superclass.initComponent.call(this);
this.addEvents("afterlayout","beforeadd","beforeremove","add","remove");
var a=this.items;
if(a){delete this.items;
this.add(a)
}},initItems:function(){if(!this.items){this.items=new Ext.util.MixedCollection(false,this.getComponentId);
this.getLayout()
}},setLayout:function(a){if(this.layout&&this.layout!=a){this.layout.setContainer(null)
}this.layout=a;
this.initItems();
a.setContainer(this)
},afterRender:function(){Ext.Container.superclass.afterRender.call(this);
if(!this.layout){this.layout="auto"
}if(Ext.isObject(this.layout)&&!this.layout.layout){this.layoutConfig=this.layout;
this.layout=this.layoutConfig.type
}if(Ext.isString(this.layout)){this.layout=new Ext.Container.LAYOUTS[this.layout.toLowerCase()](this.layoutConfig)
}this.setLayout(this.layout);
if(this.activeItem!==undefined&&this.layout.setActiveItem){var a=this.activeItem;
delete this.activeItem;
this.layout.setActiveItem(a)
}if(!this.ownerCt){this.doLayout(false,true)
}if(this.monitorResize===true){Ext.EventManager.onWindowResize(this.doLayout,this,[false])
}},getLayoutTarget:function(){return this.el
},getComponentId:function(a){return a.getItemId()
},add:function(b){this.initItems();
var e=arguments.length>1;
if(e||Ext.isArray(b)){var a=[];
Ext.each(e?arguments:b,function(g){a.push(this.add(g))
},this);
return a
}var f=this.lookupComponent(this.applyDefaults(b));
var d=this.items.length;
if(this.fireEvent("beforeadd",this,f,d)!==false&&this.onBeforeAdd(f)!==false){this.items.add(f);
f.onAdded(this,d);
this.onAdd(f);
this.fireEvent("add",this,f,d)
}return f
},onAdd:function(a){},onAdded:function(a,b){this.ownerCt=a;
this.initRef();
this.cascade(function(d){d.initRef()
});
this.fireEvent("added",this,a,b)
},insert:function(e,b){var d=arguments,g=d.length,a=[],f,h;
this.initItems();
if(g>2){for(f=g-1;
f>=1;
--f){a.push(this.insert(e,d[f]))
}return a
}h=this.lookupComponent(this.applyDefaults(b));
e=Math.min(e,this.items.length);
if(this.fireEvent("beforeadd",this,h,e)!==false&&this.onBeforeAdd(h)!==false){if(h.ownerCt==this){this.items.remove(h)
}this.items.insert(e,h);
h.onAdded(this,e);
this.onAdd(h);
this.fireEvent("add",this,h,e)
}return h
},applyDefaults:function(b){var a=this.defaults;
if(a){if(Ext.isFunction(a)){a=a.call(this,b)
}if(Ext.isString(b)){b=Ext.ComponentMgr.get(b);
Ext.apply(b,a)
}else{if(!b.events){Ext.applyIf(b.isAction?b.initialConfig:b,a)
}else{Ext.apply(b,a)
}}}return b
},onBeforeAdd:function(a){if(a.ownerCt){a.ownerCt.remove(a,false)
}if(this.hideBorders===true){a.border=(a.border===true)
}},remove:function(a,b){this.initItems();
var d=this.getComponent(a);
if(d&&this.fireEvent("beforeremove",this,d)!==false){this.doRemove(d,b);
this.fireEvent("remove",this,d)
}return d
},onRemove:function(a){},doRemove:function(e,d){var b=this.layout,a=b&&this.rendered;
if(a){b.onRemove(e)
}this.items.remove(e);
e.onRemoved();
this.onRemove(e);
if(d===true||(d!==false&&this.autoDestroy)){e.destroy()
}if(a){b.afterRemove(e)
}},removeAll:function(c){this.initItems();
var e,f=[],b=[];
this.items.each(function(g){f.push(g)
});
for(var d=0,a=f.length;
d<a;
++d){e=f[d];
this.remove(e,c);
if(e.ownerCt!==this){b.push(e)
}}return b
},getComponent:function(a){if(Ext.isObject(a)){a=a.getItemId()
}return this.items.get(a)
},lookupComponent:function(a){if(Ext.isString(a)){return Ext.ComponentMgr.get(a)
}else{if(!a.events){return this.createComponent(a)
}}return a
},createComponent:function(a,d){if(a.render){return a
}var b=Ext.create(Ext.apply({ownerCt:this},a),d||this.defaultType);
delete b.initialConfig.ownerCt;
delete b.ownerCt;
return b
},canLayout:function(){var a=this.getVisibilityEl();
return a&&a.dom&&!a.isStyle("display","none")
},doLayout:function(f,e){var j=this.rendered,h=e||this.forceLayout;
if(this.collapsed||!this.canLayout()){this.deferLayout=this.deferLayout||!f;
if(!h){return
}f=f&&!this.deferLayout
}else{delete this.deferLayout
}if(j&&this.layout){this.layout.layout()
}if(f!==true&&this.items){var d=this.items.items;
for(var b=0,a=d.length;
b<a;
b++){var g=d[b];
if(g.doLayout){g.doLayout(false,h)
}}}if(j){this.onLayout(f,h)
}this.hasLayout=true;
delete this.forceLayout
},onLayout:Ext.emptyFn,shouldBufferLayout:function(){var a=this.hasLayout;
if(this.ownerCt){return a?!this.hasLayoutPending():false
}return a
},hasLayoutPending:function(){var a=false;
this.ownerCt.bubble(function(b){if(b.layoutPending){a=true;
return false
}});
return a
},onShow:function(){Ext.Container.superclass.onShow.call(this);
if(Ext.isDefined(this.deferLayout)){delete this.deferLayout;
this.doLayout(true)
}},getLayout:function(){if(!this.layout){var a=new Ext.layout.AutoLayout(this.layoutConfig);
this.setLayout(a)
}return this.layout
},beforeDestroy:function(){var a;
if(this.items){while(a=this.items.first()){this.doRemove(a,true)
}}if(this.monitorResize){Ext.EventManager.removeResizeListener(this.doLayout,this)
}Ext.destroy(this.layout);
Ext.Container.superclass.beforeDestroy.call(this)
},cascade:function(f,e,b){if(f.apply(e||this,b||[this])!==false){if(this.items){var d=this.items.items;
for(var c=0,a=d.length;
c<a;
c++){if(d[c].cascade){d[c].cascade(f,e,b)
}else{f.apply(e||d[c],b||[d[c]])
}}}}return this
},findById:function(c){var a=null,b=this;
this.cascade(function(d){if(b!=d&&d.id===c){a=d;
return false
}});
return a
},findByType:function(b,a){return this.findBy(function(d){return d.isXType(b,a)
})
},find:function(b,a){return this.findBy(function(d){return d[b]===a
})
},findBy:function(d,c){var a=[],b=this;
this.cascade(function(e){if(b!=e&&d.call(c||e,e,b)===true){a.push(e)
}});
return a
},get:function(a){return this.getComponent(a)
}});
Ext.Container.LAYOUTS={};
Ext.reg("container",Ext.Container);
Ext.layout.ContainerLayout=Ext.extend(Object,{monitorResize:false,activeItem:null,constructor:function(a){this.id=Ext.id(null,"ext-layout-");
Ext.apply(this,a)
},type:"container",IEMeasureHack:function(j,f){var a=j.dom.childNodes,b=a.length,m,l=[],k,g,h;
for(g=0;
g<b;
g++){m=a[g];
k=Ext.get(m);
if(k){l[g]=k.getStyle("display");
k.setStyle({display:"none"})
}}h=j?j.getViewSize(f):{};
for(g=0;
g<b;
g++){m=a[g];
k=Ext.get(m);
if(k){k.setStyle({display:l[g]})
}}return h
},getLayoutTargetSize:Ext.EmptyFn,layout:function(){var a=this.container,b=a.getLayoutTarget();
if(!(this.hasLayout||Ext.isEmpty(this.targetCls))){b.addClass(this.targetCls)
}this.onLayout(a,b);
a.fireEvent("afterlayout",a,this)
},onLayout:function(a,b){this.renderAll(a,b)
},isValidParent:function(b,a){return a&&b.getPositionEl().dom.parentNode==(a.dom||a)
},renderAll:function(e,f){var b=e.items.items,d,g,a=b.length;
for(d=0;
d<a;
d++){g=b[d];
if(g&&(!g.rendered||!this.isValidParent(g,f))){this.renderItem(g,d,f)
}}},renderItem:function(d,a,b){if(d){if(!d.rendered){d.render(b,a);
this.configureItem(d)
}else{if(!this.isValidParent(d,b)){if(Ext.isNumber(a)){a=b.dom.childNodes[a]
}b.dom.insertBefore(d.getPositionEl().dom,a||null);
d.container=b;
this.configureItem(d)
}}}},getRenderedItems:function(f){var e=f.getLayoutTarget(),g=f.items.items,a=g.length,d,h,b=[];
for(d=0;
d<a;
d++){if((h=g[d]).rendered&&this.isValidParent(h,e)&&h.shouldLayout!==false){b.push(h)
}}return b
},configureItem:function(b){if(this.extraCls){var a=b.getPositionEl?b.getPositionEl():b;
a.addClass(this.extraCls)
}if(b.doLayout&&this.forceLayout){b.doLayout()
}if(this.renderHidden&&b!=this.activeItem){b.hide()
}},onRemove:function(b){if(this.activeItem==b){delete this.activeItem
}if(b.rendered&&this.extraCls){var a=b.getPositionEl?b.getPositionEl():b;
a.removeClass(this.extraCls)
}},afterRemove:function(a){if(a.removeRestore){a.removeMode="container";
delete a.removeRestore
}},onResize:function(){var c=this.container,a;
if(c.collapsed){return
}if(a=c.bufferResize&&c.shouldBufferLayout()){if(!this.resizeTask){this.resizeTask=new Ext.util.DelayedTask(this.runLayout,this);
this.resizeBuffer=Ext.isNumber(a)?a:50
}c.layoutPending=true;
this.resizeTask.delay(this.resizeBuffer)
}else{this.runLayout()
}},runLayout:function(){var a=this.container;
this.layout();
a.onLayout();
delete a.layoutPending
},setContainer:function(b){if(this.monitorResize&&b!=this.container){var a=this.container;
if(a){a.un(a.resizeEvent,this.onResize,this)
}if(b){b.on(b.resizeEvent,this.onResize,this)
}}this.container=b
},parseMargins:function(b){if(Ext.isNumber(b)){b=b.toString()
}var c=b.split(" "),a=c.length;
if(a==1){c[1]=c[2]=c[3]=c[0]
}else{if(a==2){c[2]=c[0];
c[3]=c[1]
}else{if(a==3){c[3]=c[1]
}}}return{top:parseInt(c[0],10)||0,right:parseInt(c[1],10)||0,bottom:parseInt(c[2],10)||0,left:parseInt(c[3],10)||0}
},fieldTpl:(function(){var a=new Ext.Template('<div class="x-form-item {itemCls}" tabIndex="-1">','<label for="{id}" style="{labelStyle}" class="x-form-item-label">{label}{labelSeparator}</label>','<div class="x-form-element" id="x-form-el-{id}" style="{elementStyle}">','</div><div class="{clearCls}"></div>',"</div>");
a.disableFormats=true;
return a.compile()
})(),destroy:function(){if(this.resizeTask&&this.resizeTask.cancel){this.resizeTask.cancel()
}if(this.container){this.container.un(this.container.resizeEvent,this.onResize,this)
}if(!Ext.isEmpty(this.targetCls)){var a=this.container.getLayoutTarget();
if(a){a.removeClass(this.targetCls)
}}}});
Ext.layout.AutoLayout=Ext.extend(Ext.layout.ContainerLayout,{type:"auto",monitorResize:true,onLayout:function(d,f){Ext.layout.AutoLayout.superclass.onLayout.call(this,d,f);
var e=this.getRenderedItems(d),a=e.length,b,g;
for(b=0;
b<a;
b++){g=e[b];
if(g.doLayout){g.doLayout(true)
}}}});
Ext.Container.LAYOUTS.auto=Ext.layout.AutoLayout;
Ext.layout.FitLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,type:"fit",getLayoutTargetSize:function(){var a=this.container.getLayoutTarget();
if(!a){return{}
}return a.getStyleSize()
},onLayout:function(a,b){Ext.layout.FitLayout.superclass.onLayout.call(this,a,b);
if(!a.collapsed){this.setItemSize(this.activeItem||a.items.itemAt(0),this.getLayoutTargetSize())
}},setItemSize:function(b,a){if(b&&a.height>0){b.setSize(a)
}}});
Ext.Container.LAYOUTS.fit=Ext.layout.FitLayout;
Ext.layout.CardLayout=Ext.extend(Ext.layout.FitLayout,{deferredRender:false,layoutOnCardChange:false,renderHidden:true,type:"card",setActiveItem:function(d){var a=this.activeItem,b=this.container;
d=b.getComponent(d);
if(d&&a!=d){if(a){a.hide();
if(a.hidden!==true){return false
}a.fireEvent("deactivate",a)
}var c=d.doLayout&&(this.layoutOnCardChange||!d.rendered);
this.activeItem=d;
delete d.deferLayout;
d.show();
this.layout();
if(c){d.doLayout()
}d.fireEvent("activate",d)
}},renderAll:function(a,b){if(this.deferredRender){this.renderItem(this.activeItem,undefined,b)
}else{Ext.layout.CardLayout.superclass.renderAll.call(this,a,b)
}}});
Ext.Container.LAYOUTS.card=Ext.layout.CardLayout;
Ext.layout.AnchorLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,type:"anchor",defaultAnchor:"100%",parseAnchorRE:/^(r|right|b|bottom)$/i,getLayoutTargetSize:function(){var b=this.container.getLayoutTarget(),a={};
if(b){a=b.getViewSize();
if(Ext.isIE&&Ext.isStrict&&a.width==0){a=b.getStyleSize()
}a.width-=b.getPadding("lr");
a.height-=b.getPadding("tb")
}return a
},onLayout:function(l,v){Ext.layout.AnchorLayout.superclass.onLayout.call(this,l,v);
var o=this.getLayoutTargetSize(),j=o.width,n=o.height,p=v.getStyle("overflow"),m=this.getRenderedItems(l),s=m.length,f=[],h,a,u,k,g,c,e,d,t=0,r,b;
if(j<20&&n<20){return
}if(l.anchorSize){if(typeof l.anchorSize=="number"){a=l.anchorSize
}else{a=l.anchorSize.width;
u=l.anchorSize.height
}}else{a=l.initialConfig.width;
u=l.initialConfig.height
}for(r=0;
r<s;
r++){k=m[r];
b=k.getPositionEl();
if(!k.anchor&&k.items&&!Ext.isNumber(k.width)&&!(Ext.isIE6&&Ext.isStrict)){k.anchor=this.defaultAnchor
}if(k.anchor){g=k.anchorSpec;
if(!g){d=k.anchor.split(" ");
k.anchorSpec=g={right:this.parseAnchor(d[0],k.initialConfig.width,a),bottom:this.parseAnchor(d[1],k.initialConfig.height,u)}
}c=g.right?this.adjustWidthAnchor(g.right(j)-b.getMargins("lr"),k):undefined;
e=g.bottom?this.adjustHeightAnchor(g.bottom(n)-b.getMargins("tb"),k):undefined;
if(c||e){f.push({component:k,width:c||undefined,height:e||undefined})
}}}for(r=0,s=f.length;
r<s;
r++){h=f[r];
h.component.setSize(h.width,h.height)
}if(p&&p!="hidden"&&!this.adjustmentPass){var q=this.getLayoutTargetSize();
if(q.width!=o.width||q.height!=o.height){this.adjustmentPass=true;
this.onLayout(l,v)
}}delete this.adjustmentPass
},parseAnchor:function(c,g,b){if(c&&c!="none"){var e;
if(this.parseAnchorRE.test(c)){var f=b-g;
return function(a){if(a!==e){e=a;
return a-f
}}
}else{if(c.indexOf("%")!=-1){var d=parseFloat(c.replace("%",""))*0.01;
return function(a){if(a!==e){e=a;
return Math.floor(a*d)
}}
}else{c=parseInt(c,10);
if(!isNaN(c)){return function(a){if(a!==e){e=a;
return a+c
}}
}}}}return false
},adjustWidthAnchor:function(b,a){return b
},adjustHeightAnchor:function(b,a){return b
}});
Ext.Container.LAYOUTS.anchor=Ext.layout.AnchorLayout;
Ext.layout.ColumnLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,type:"column",extraCls:"x-column",scrollOffset:0,targetCls:"x-column-layout-ct",isValidParent:function(b,a){return this.innerCt&&b.getPositionEl().dom.parentNode==this.innerCt.dom
},getLayoutTargetSize:function(){var b=this.container.getLayoutTarget(),a;
if(b){a=b.getViewSize();
if(Ext.isIE&&Ext.isStrict&&a.width==0){a=b.getStyleSize()
}a.width-=b.getPadding("lr");
a.height-=b.getPadding("tb")
}return a
},renderAll:function(a,b){if(!this.innerCt){this.innerCt=b.createChild({cls:"x-column-inner"});
this.innerCt.createChild({cls:"x-clear"})
}Ext.layout.ColumnLayout.superclass.renderAll.call(this,a,this.innerCt)
},onLayout:function(e,j){var f=e.items.items,g=f.length,l,b,a,n=[];
this.renderAll(e,j);
var q=this.getLayoutTargetSize();
if(q.width<1&&q.height<1){return
}var o=q.width-this.scrollOffset,d=q.height,p=o;
this.innerCt.setWidth(o);
for(b=0;
b<g;
b++){l=f[b];
a=l.getPositionEl().getMargins("lr");
n[b]=a;
if(!l.columnWidth){p-=(l.getWidth()+a)
}}p=p<0?0:p;
for(b=0;
b<g;
b++){l=f[b];
a=n[b];
if(l.columnWidth){l.setSize(Math.floor(l.columnWidth*p)-a)
}}if(Ext.isIE){if(b=j.getStyle("overflow")&&b!="hidden"&&!this.adjustmentPass){var k=this.getLayoutTargetSize();
if(k.width!=q.width){this.adjustmentPass=true;
this.onLayout(e,j)
}}}delete this.adjustmentPass
}});
Ext.Container.LAYOUTS.column=Ext.layout.ColumnLayout;
Ext.layout.BorderLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,rendered:false,type:"border",targetCls:"x-border-layout-ct",getLayoutTargetSize:function(){var a=this.container.getLayoutTarget();
return a?a.getViewSize():{}
},onLayout:function(f,H){var g,A,E,l,v=f.items.items,B=v.length;
if(!this.rendered){g=[];
for(A=0;
A<B;
A++){E=v[A];
l=E.region;
if(E.collapsed){g.push(E)
}E.collapsed=false;
if(!E.rendered){E.render(H,A);
E.getPositionEl().addClass("x-border-panel")
}this[l]=l!="center"&&E.split?new Ext.layout.BorderLayout.SplitRegion(this,E.initialConfig,l):new Ext.layout.BorderLayout.Region(this,E.initialConfig,l);
this[l].render(H,E)
}this.rendered=true
}var u=this.getLayoutTargetSize();
if(u.width<20||u.height<20){if(g){this.restoreCollapsed=g
}return
}else{if(this.restoreCollapsed){g=this.restoreCollapsed;
delete this.restoreCollapsed
}}var r=u.width,C=u.height,q=r,z=C,o=0,p=0,x=this.north,t=this.south,k=this.west,D=this.east,E=this.center,G,y,d,F;
if(!E&&Ext.layout.BorderLayout.WARN!==false){throw"No center region defined in BorderLayout "+f.id
}if(x&&x.isVisible()){G=x.getSize();
y=x.getMargins();
G.width=r-(y.left+y.right);
G.x=y.left;
G.y=y.top;
o=G.height+G.y+y.bottom;
z-=o;
x.applyLayout(G)
}if(t&&t.isVisible()){G=t.getSize();
y=t.getMargins();
G.width=r-(y.left+y.right);
G.x=y.left;
F=(G.height+y.top+y.bottom);
G.y=C-F+y.top;
z-=F;
t.applyLayout(G)
}if(k&&k.isVisible()){G=k.getSize();
y=k.getMargins();
G.height=z-(y.top+y.bottom);
G.x=y.left;
G.y=o+y.top;
d=(G.width+y.left+y.right);
p+=d;
q-=d;
k.applyLayout(G)
}if(D&&D.isVisible()){G=D.getSize();
y=D.getMargins();
G.height=z-(y.top+y.bottom);
d=(G.width+y.left+y.right);
G.x=r-d+y.left;
G.y=o+y.top;
q-=d;
D.applyLayout(G)
}if(E){y=E.getMargins();
var j={x:p+y.left,y:o+y.top,width:q-(y.left+y.right),height:z-(y.top+y.bottom)};
E.applyLayout(j)
}if(g){for(A=0,B=g.length;
A<B;
A++){g[A].collapse(false)
}}if(Ext.isIE&&Ext.isStrict){H.repaint()
}if(A=H.getStyle("overflow")&&A!="hidden"&&!this.adjustmentPass){var a=this.getLayoutTargetSize();
if(a.width!=u.width||a.height!=u.height){this.adjustmentPass=true;
this.onLayout(f,H)
}}delete this.adjustmentPass
},destroy:function(){var b=["north","south","east","west"],a,c;
for(a=0;
a<b.length;
a++){c=this[b[a]];
if(c){if(c.destroy){c.destroy()
}else{if(c.split){c.split.destroy(true)
}}}}Ext.layout.BorderLayout.superclass.destroy.call(this)
}});
Ext.layout.BorderLayout.Region=function(b,a,c){Ext.apply(this,a);
this.layout=b;
this.position=c;
this.state={};
if(typeof this.margins=="string"){this.margins=this.layout.parseMargins(this.margins)
}this.margins=Ext.applyIf(this.margins||{},this.defaultMargins);
if(this.collapsible){if(typeof this.cmargins=="string"){this.cmargins=this.layout.parseMargins(this.cmargins)
}if(this.collapseMode=="mini"&&!this.cmargins){this.cmargins={left:0,top:0,right:0,bottom:0}
}else{this.cmargins=Ext.applyIf(this.cmargins||{},c=="north"||c=="south"?this.defaultNSCMargins:this.defaultEWCMargins)
}}};
Ext.layout.BorderLayout.Region.prototype={collapsible:false,split:false,floatable:true,minWidth:50,minHeight:50,defaultMargins:{left:0,top:0,right:0,bottom:0},defaultNSCMargins:{left:5,top:5,right:5,bottom:5},defaultEWCMargins:{left:5,top:0,right:5,bottom:0},floatingZIndex:100,isCollapsed:false,render:function(b,c){this.panel=c;
c.el.enableDisplayMode();
this.targetEl=b;
this.el=c.el;
var a=c.getState,d=this.position;
c.getState=function(){return Ext.apply(a.call(c)||{},this.state)
}.createDelegate(this);
if(d!="center"){c.allowQueuedExpand=false;
c.on({beforecollapse:this.beforeCollapse,collapse:this.onCollapse,beforeexpand:this.beforeExpand,expand:this.onExpand,hide:this.onHide,show:this.onShow,scope:this});
if(this.collapsible||this.floatable){c.collapseEl="el";
c.slideAnchor=this.getSlideAnchor()
}if(c.tools&&c.tools.toggle){c.tools.toggle.addClass("x-tool-collapse-"+d);
c.tools.toggle.addClassOnOver("x-tool-collapse-"+d+"-over")
}}},getCollapsedEl:function(){if(!this.collapsedEl){if(!this.toolTemplate){var b=new Ext.Template('<div class="x-tool x-tool-{id}">&#160;</div>');
b.disableFormats=true;
b.compile();
Ext.layout.BorderLayout.Region.prototype.toolTemplate=b
}this.collapsedEl=this.targetEl.createChild({cls:"x-layout-collapsed x-layout-collapsed-"+this.position,id:this.panel.id+"-xcollapsed"});
this.collapsedEl.enableDisplayMode("block");
if(this.collapseMode=="mini"){this.collapsedEl.addClass("x-layout-cmini-"+this.position);
this.miniCollapsedEl=this.collapsedEl.createChild({cls:"x-layout-mini x-layout-mini-"+this.position,html:"&#160;"});
this.miniCollapsedEl.addClassOnOver("x-layout-mini-over");
this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
this.collapsedEl.on("click",this.onExpandClick,this,{stopEvent:true})
}else{if(this.collapsible!==false&&!this.hideCollapseTool){var a=this.expandToolEl=this.toolTemplate.append(this.collapsedEl.dom,{id:"expand-"+this.position},true);
a.addClassOnOver("x-tool-expand-"+this.position+"-over");
a.on("click",this.onExpandClick,this,{stopEvent:true})
}if(this.floatable!==false||this.titleCollapse){this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
this.collapsedEl.on("click",this[this.floatable?"collapseClick":"onExpandClick"],this)
}}}return this.collapsedEl
},onExpandClick:function(a){if(this.isSlid){this.panel.expand(false)
}else{this.panel.expand()
}},onCollapseClick:function(a){this.panel.collapse()
},beforeCollapse:function(c,a){this.lastAnim=a;
if(this.splitEl){this.splitEl.hide()
}this.getCollapsedEl().show();
var b=this.panel.getEl();
this.originalZIndex=b.getStyle("z-index");
b.setStyle("z-index",100);
this.isCollapsed=true;
this.layout.layout()
},onCollapse:function(a){this.panel.el.setStyle("z-index",1);
if(this.lastAnim===false||this.panel.animCollapse===false){this.getCollapsedEl().dom.style.visibility="visible"
}else{this.getCollapsedEl().slideIn(this.panel.slideAnchor,{duration:0.2})
}this.state.collapsed=true;
this.panel.saveState()
},beforeExpand:function(a){if(this.isSlid){this.afterSlideIn()
}var b=this.getCollapsedEl();
this.el.show();
if(this.position=="east"||this.position=="west"){this.panel.setSize(undefined,b.getHeight())
}else{this.panel.setSize(b.getWidth(),undefined)
}b.hide();
b.dom.style.visibility="hidden";
this.panel.el.setStyle("z-index",this.floatingZIndex)
},onExpand:function(){this.isCollapsed=false;
if(this.splitEl){this.splitEl.show()
}this.layout.layout();
this.panel.el.setStyle("z-index",this.originalZIndex);
this.state.collapsed=false;
this.panel.saveState()
},collapseClick:function(a){if(this.isSlid){a.stopPropagation();
this.slideIn()
}else{a.stopPropagation();
this.slideOut()
}},onHide:function(){if(this.isCollapsed){this.getCollapsedEl().hide()
}else{if(this.splitEl){this.splitEl.hide()
}}},onShow:function(){if(this.isCollapsed){this.getCollapsedEl().show()
}else{if(this.splitEl){this.splitEl.show()
}}},isVisible:function(){return !this.panel.hidden
},getMargins:function(){return this.isCollapsed&&this.cmargins?this.cmargins:this.margins
},getSize:function(){return this.isCollapsed?this.getCollapsedEl().getSize():this.panel.getSize()
},setPanel:function(a){this.panel=a
},getMinWidth:function(){return this.minWidth
},getMinHeight:function(){return this.minHeight
},applyLayoutCollapsed:function(a){var b=this.getCollapsedEl();
b.setLeftTop(a.x,a.y);
b.setSize(a.width,a.height)
},applyLayout:function(a){if(this.isCollapsed){this.applyLayoutCollapsed(a)
}else{this.panel.setPosition(a.x,a.y);
this.panel.setSize(a.width,a.height)
}},beforeSlide:function(){this.panel.beforeEffect()
},afterSlide:function(){this.panel.afterEffect()
},initAutoHide:function(){if(this.autoHide!==false){if(!this.autoHideHd){this.autoHideSlideTask=new Ext.util.DelayedTask(this.slideIn,this);
this.autoHideHd={mouseout:function(a){if(!a.within(this.el,true)){this.autoHideSlideTask.delay(500)
}},mouseover:function(a){this.autoHideSlideTask.cancel()
},scope:this}
}this.el.on(this.autoHideHd);
this.collapsedEl.on(this.autoHideHd)
}},clearAutoHide:function(){if(this.autoHide!==false){this.el.un("mouseout",this.autoHideHd.mouseout);
this.el.un("mouseover",this.autoHideHd.mouseover);
this.collapsedEl.un("mouseout",this.autoHideHd.mouseout);
this.collapsedEl.un("mouseover",this.autoHideHd.mouseover)
}},clearMonitor:function(){Ext.getDoc().un("click",this.slideInIf,this)
},slideOut:function(){if(this.isSlid||this.el.hasActiveFx()){return
}this.isSlid=true;
var b=this.panel.tools,c,a;
if(b&&b.toggle){b.toggle.hide()
}this.el.show();
a=this.panel.collapsed;
this.panel.collapsed=false;
if(this.position=="east"||this.position=="west"){c=this.panel.deferHeight;
this.panel.deferHeight=false;
this.panel.setSize(undefined,this.collapsedEl.getHeight());
this.panel.deferHeight=c
}else{this.panel.setSize(this.collapsedEl.getWidth(),undefined)
}this.panel.collapsed=a;
this.restoreLT=[this.el.dom.style.left,this.el.dom.style.top];
this.el.alignTo(this.collapsedEl,this.getCollapseAnchor());
this.el.setStyle("z-index",this.floatingZIndex+2);
this.panel.el.replaceClass("x-panel-collapsed","x-panel-floating");
if(this.animFloat!==false){this.beforeSlide();
this.el.slideIn(this.getSlideAnchor(),{callback:function(){this.afterSlide();
this.initAutoHide();
Ext.getDoc().on("click",this.slideInIf,this)
},scope:this,block:true})
}else{this.initAutoHide();
Ext.getDoc().on("click",this.slideInIf,this)
}},afterSlideIn:function(){this.clearAutoHide();
this.isSlid=false;
this.clearMonitor();
this.el.setStyle("z-index","");
this.panel.el.replaceClass("x-panel-floating","x-panel-collapsed");
this.el.dom.style.left=this.restoreLT[0];
this.el.dom.style.top=this.restoreLT[1];
var a=this.panel.tools;
if(a&&a.toggle){a.toggle.show()
}},slideIn:function(a){if(!this.isSlid||this.el.hasActiveFx()){Ext.callback(a);
return
}this.isSlid=false;
if(this.animFloat!==false){this.beforeSlide();
this.el.slideOut(this.getSlideAnchor(),{callback:function(){this.el.hide();
this.afterSlide();
this.afterSlideIn();
Ext.callback(a)
},scope:this,block:true})
}else{this.el.hide();
this.afterSlideIn()
}},slideInIf:function(a){if(!a.within(this.el)){this.slideIn()
}},anchors:{west:"left",east:"right",north:"top",south:"bottom"},sanchors:{west:"l",east:"r",north:"t",south:"b"},canchors:{west:"tl-tr",east:"tr-tl",north:"tl-bl",south:"bl-tl"},getAnchor:function(){return this.anchors[this.position]
},getCollapseAnchor:function(){return this.canchors[this.position]
},getSlideAnchor:function(){return this.sanchors[this.position]
},getAlignAdj:function(){var a=this.cmargins;
switch(this.position){case"west":return[0,0];
break;
case"east":return[0,0];
break;
case"north":return[0,0];
break;
case"south":return[0,0];
break
}},getExpandAdj:function(){var b=this.collapsedEl,a=this.cmargins;
switch(this.position){case"west":return[-(a.right+b.getWidth()+a.left),0];
break;
case"east":return[a.right+b.getWidth()+a.left,0];
break;
case"north":return[0,-(a.top+a.bottom+b.getHeight())];
break;
case"south":return[0,a.top+a.bottom+b.getHeight()];
break
}},destroy:function(){if(this.autoHideSlideTask&&this.autoHideSlideTask.cancel){this.autoHideSlideTask.cancel()
}Ext.destroyMembers(this,"miniCollapsedEl","collapsedEl","expandToolEl")
}};
Ext.layout.BorderLayout.SplitRegion=function(b,a,c){Ext.layout.BorderLayout.SplitRegion.superclass.constructor.call(this,b,a,c);
this.applyLayout=this.applyFns[c]
};
Ext.extend(Ext.layout.BorderLayout.SplitRegion,Ext.layout.BorderLayout.Region,{splitTip:"Drag to resize.",collapsibleSplitTip:"Drag to resize. Double click to hide.",useSplitTips:false,splitSettings:{north:{orientation:Ext.SplitBar.VERTICAL,placement:Ext.SplitBar.TOP,maxFn:"getVMaxSize",minProp:"minHeight",maxProp:"maxHeight"},south:{orientation:Ext.SplitBar.VERTICAL,placement:Ext.SplitBar.BOTTOM,maxFn:"getVMaxSize",minProp:"minHeight",maxProp:"maxHeight"},east:{orientation:Ext.SplitBar.HORIZONTAL,placement:Ext.SplitBar.RIGHT,maxFn:"getHMaxSize",minProp:"minWidth",maxProp:"maxWidth"},west:{orientation:Ext.SplitBar.HORIZONTAL,placement:Ext.SplitBar.LEFT,maxFn:"getHMaxSize",minProp:"minWidth",maxProp:"maxWidth"}},applyFns:{west:function(c){if(this.isCollapsed){return this.applyLayoutCollapsed(c)
}var d=this.splitEl.dom,b=d.style;
this.panel.setPosition(c.x,c.y);
var a=d.offsetWidth;
b.left=(c.x+c.width-a)+"px";
b.top=(c.y)+"px";
b.height=Math.max(0,c.height)+"px";
this.panel.setSize(c.width-a,c.height)
},east:function(c){if(this.isCollapsed){return this.applyLayoutCollapsed(c)
}var d=this.splitEl.dom,b=d.style;
var a=d.offsetWidth;
this.panel.setPosition(c.x+a,c.y);
b.left=(c.x)+"px";
b.top=(c.y)+"px";
b.height=Math.max(0,c.height)+"px";
this.panel.setSize(c.width-a,c.height)
},north:function(c){if(this.isCollapsed){return this.applyLayoutCollapsed(c)
}var d=this.splitEl.dom,b=d.style;
var a=d.offsetHeight;
this.panel.setPosition(c.x,c.y);
b.left=(c.x)+"px";
b.top=(c.y+c.height-a)+"px";
b.width=Math.max(0,c.width)+"px";
this.panel.setSize(c.width,c.height-a)
},south:function(c){if(this.isCollapsed){return this.applyLayoutCollapsed(c)
}var d=this.splitEl.dom,b=d.style;
var a=d.offsetHeight;
this.panel.setPosition(c.x,c.y+a);
b.left=(c.x)+"px";
b.top=(c.y)+"px";
b.width=Math.max(0,c.width)+"px";
this.panel.setSize(c.width,c.height-a)
}},render:function(a,c){Ext.layout.BorderLayout.SplitRegion.superclass.render.call(this,a,c);
var d=this.position;
this.splitEl=a.createChild({cls:"x-layout-split x-layout-split-"+d,html:"&#160;",id:this.panel.id+"-xsplit"});
if(this.collapseMode=="mini"){this.miniSplitEl=this.splitEl.createChild({cls:"x-layout-mini x-layout-mini-"+d,html:"&#160;"});
this.miniSplitEl.addClassOnOver("x-layout-mini-over");
this.miniSplitEl.on("click",this.onCollapseClick,this,{stopEvent:true})
}var b=this.splitSettings[d];
this.split=new Ext.SplitBar(this.splitEl.dom,c.el,b.orientation);
this.split.tickSize=this.tickSize;
this.split.placement=b.placement;
this.split.getMaximumSize=this[b.maxFn].createDelegate(this);
this.split.minSize=this.minSize||this[b.minProp];
this.split.on("beforeapply",this.onSplitMove,this);
this.split.useShim=this.useShim===true;
this.maxSize=this.maxSize||this[b.maxProp];
if(c.hidden){this.splitEl.hide()
}if(this.useSplitTips){this.splitEl.dom.title=this.collapsible?this.collapsibleSplitTip:this.splitTip
}if(this.collapsible){this.splitEl.on("dblclick",this.onCollapseClick,this)
}},getSize:function(){if(this.isCollapsed){return this.collapsedEl.getSize()
}var a=this.panel.getSize();
if(this.position=="north"||this.position=="south"){a.height+=this.splitEl.dom.offsetHeight
}else{a.width+=this.splitEl.dom.offsetWidth
}return a
},getHMaxSize:function(){var b=this.maxSize||10000;
var a=this.layout.center;
return Math.min(b,(this.el.getWidth()+a.el.getWidth())-a.getMinWidth())
},getVMaxSize:function(){var b=this.maxSize||10000;
var a=this.layout.center;
return Math.min(b,(this.el.getHeight()+a.el.getHeight())-a.getMinHeight())
},onSplitMove:function(b,a){var c=this.panel.getSize();
this.lastSplitSize=a;
if(this.position=="north"||this.position=="south"){this.panel.setSize(c.width,a);
this.state.height=a
}else{this.panel.setSize(a,c.height);
this.state.width=a
}this.layout.layout();
this.panel.saveState();
return false
},getSplitBar:function(){return this.split
},destroy:function(){Ext.destroy(this.miniSplitEl,this.split,this.splitEl);
Ext.layout.BorderLayout.SplitRegion.superclass.destroy.call(this)
}});
Ext.Container.LAYOUTS.border=Ext.layout.BorderLayout;
Ext.layout.FormLayout=Ext.extend(Ext.layout.AnchorLayout,{labelSeparator:":",trackLabels:true,type:"form",onRemove:function(d){Ext.layout.FormLayout.superclass.onRemove.call(this,d);
if(this.trackLabels){d.un("show",this.onFieldShow,this);
d.un("hide",this.onFieldHide,this)
}var b=d.getPositionEl(),a=d.getItemCt&&d.getItemCt();
if(d.rendered&&a){if(b&&b.dom){b.insertAfter(a)
}Ext.destroy(a);
Ext.destroyMembers(d,"label","itemCt");
if(d.customItemCt){Ext.destroyMembers(d,"getItemCt","customItemCt")
}}},setContainer:function(a){Ext.layout.FormLayout.superclass.setContainer.call(this,a);
if(a.labelAlign){a.addClass("x-form-label-"+a.labelAlign)
}if(a.hideLabels){Ext.apply(this,{labelStyle:"display:none",elementStyle:"padding-left:0;",labelAdjust:0})
}else{this.labelSeparator=Ext.isDefined(a.labelSeparator)?a.labelSeparator:this.labelSeparator;
a.labelWidth=a.labelWidth||100;
if(Ext.isNumber(a.labelWidth)){var b=Ext.isNumber(a.labelPad)?a.labelPad:5;
Ext.apply(this,{labelAdjust:a.labelWidth+b,labelStyle:"width:"+a.labelWidth+"px;",elementStyle:"padding-left:"+(a.labelWidth+b)+"px"})
}if(a.labelAlign=="top"){Ext.apply(this,{labelStyle:"width:auto;",labelAdjust:0,elementStyle:"padding-left:0;"})
}}},isHide:function(a){return a.hideLabel||this.container.hideLabels
},onFieldShow:function(a){a.getItemCt().removeClass("x-hide-"+a.hideMode);
if(a.isComposite){a.doLayout()
}},onFieldHide:function(a){a.getItemCt().addClass("x-hide-"+a.hideMode)
},getLabelStyle:function(e){var b="",c=[this.labelStyle,e];
for(var d=0,a=c.length;
d<a;
++d){if(c[d]){b+=c[d];
if(b.substr(-1,1)!=";"){b+=";"
}}}return b
},renderItem:function(e,a,d){if(e&&(e.isFormField||e.fieldLabel)&&e.inputType!="hidden"){var b=this.getTemplateArgs(e);
if(Ext.isNumber(a)){a=d.dom.childNodes[a]||null
}if(a){e.itemCt=this.fieldTpl.insertBefore(a,b,true)
}else{e.itemCt=this.fieldTpl.append(d,b,true)
}if(!e.getItemCt){Ext.apply(e,{getItemCt:function(){return e.itemCt
},customItemCt:true})
}e.label=e.getItemCt().child("label.x-form-item-label");
if(!e.rendered){e.render("x-form-el-"+e.id)
}else{if(!this.isValidParent(e,d)){Ext.fly("x-form-el-"+e.id).appendChild(e.getPositionEl())
}}if(this.trackLabels){if(e.hidden){this.onFieldHide(e)
}e.on({scope:this,show:this.onFieldShow,hide:this.onFieldHide})
}this.configureItem(e)
}else{Ext.layout.FormLayout.superclass.renderItem.apply(this,arguments)
}},getTemplateArgs:function(c){var a=!c.fieldLabel||c.hideLabel,b=(c.itemCls||this.container.itemCls||"")+(c.hideLabel?" x-hide-label":"");
if(Ext.isIE9&&Ext.isIEQuirks&&c instanceof Ext.form.TextField){b+=" x-input-wrapper"
}return{id:c.id,label:c.fieldLabel,itemCls:b,clearCls:c.clearCls||"x-form-clear-left",labelStyle:this.getLabelStyle(c.labelStyle),elementStyle:this.elementStyle||"",labelSeparator:a?"":(Ext.isDefined(c.labelSeparator)?c.labelSeparator:this.labelSeparator)}
},adjustWidthAnchor:function(a,d){if(d.label&&!this.isHide(d)&&(this.container.labelAlign!="top")){var b=Ext.isIE6||(Ext.isIE&&!Ext.isStrict);
return a-this.labelAdjust+(b?-3:0)
}return a
},adjustHeightAnchor:function(a,b){if(b.label&&!this.isHide(b)&&(this.container.labelAlign=="top")){return a-b.label.getHeight()
}return a
},isValidParent:function(b,a){return a&&this.container.getEl().contains(b.getPositionEl())
}});
Ext.Container.LAYOUTS.form=Ext.layout.FormLayout;
Ext.layout.AccordionLayout=Ext.extend(Ext.layout.FitLayout,{fill:true,autoWidth:true,titleCollapse:true,hideCollapseTool:false,collapseFirst:false,animate:false,sequence:false,activeOnTop:false,type:"accordion",renderItem:function(a){if(this.animate===false){a.animCollapse=false
}a.collapsible=true;
if(this.autoWidth){a.autoWidth=true
}if(this.titleCollapse){a.titleCollapse=true
}if(this.hideCollapseTool){a.hideCollapseTool=true
}if(this.collapseFirst!==undefined){a.collapseFirst=this.collapseFirst
}if(!this.activeItem&&!a.collapsed){this.setActiveItem(a,true)
}else{if(this.activeItem&&this.activeItem!=a){a.collapsed=true
}}Ext.layout.AccordionLayout.superclass.renderItem.apply(this,arguments);
a.header.addClass("x-accordion-hd");
a.on("beforeexpand",this.beforeExpand,this)
},onRemove:function(a){Ext.layout.AccordionLayout.superclass.onRemove.call(this,a);
if(a.rendered){a.header.removeClass("x-accordion-hd")
}a.un("beforeexpand",this.beforeExpand,this)
},beforeExpand:function(c,b){var a=this.activeItem;
if(a){if(this.sequence){delete this.activeItem;
if(!a.collapsed){a.collapse({callback:function(){c.expand(b||true)
},scope:this});
return false
}}else{a.collapse(this.animate)
}}this.setActive(c);
if(this.activeOnTop){c.el.dom.parentNode.insertBefore(c.el.dom,c.el.dom.parentNode.firstChild)
}this.layout()
},setItemSize:function(f,e){if(this.fill&&f){var d=0,c,b=this.getRenderedItems(this.container),a=b.length,g;
for(c=0;
c<a;
c++){if((g=b[c])!=f&&!g.hidden){d+=g.header.getHeight()
}}e.height-=d;
f.setSize(e)
}},setActiveItem:function(a){this.setActive(a,true)
},setActive:function(c,b){var a=this.activeItem;
c=this.container.getComponent(c);
if(a!=c){if(c.rendered&&c.collapsed&&b){c.expand()
}else{if(a){a.fireEvent("deactivate",a)
}this.activeItem=c;
c.fireEvent("activate",c)
}}}});
Ext.Container.LAYOUTS.accordion=Ext.layout.AccordionLayout;
Ext.layout.Accordion=Ext.layout.AccordionLayout;
Ext.layout.TableLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:false,type:"table",targetCls:"x-table-layout-ct",tableAttrs:null,setContainer:function(a){Ext.layout.TableLayout.superclass.setContainer.call(this,a);
this.currentRow=0;
this.currentColumn=0;
this.cells=[]
},onLayout:function(d,f){var e=d.items.items,a=e.length,g,b;
if(!this.table){f.addClass("x-table-layout-ct");
this.table=f.createChild(Ext.apply({tag:"table",cls:"x-table-layout",cellspacing:0,cn:{tag:"tbody"}},this.tableAttrs),null,true)
}this.renderAll(d,f)
},getRow:function(a){var b=this.table.tBodies[0].childNodes[a];
if(!b){b=document.createElement("tr");
this.table.tBodies[0].appendChild(b)
}return b
},getNextCell:function(i){var a=this.getNextNonSpan(this.currentColumn,this.currentRow);
var f=this.currentColumn=a[0],e=this.currentRow=a[1];
for(var h=e;
h<e+(i.rowspan||1);
h++){if(!this.cells[h]){this.cells[h]=[]
}for(var d=f;
d<f+(i.colspan||1);
d++){this.cells[h][d]=true
}}var g=document.createElement("td");
if(i.cellId){g.id=i.cellId
}var b="x-table-layout-cell";
if(i.cellCls){b+=" "+i.cellCls
}g.className=b;
if(i.colspan){g.colSpan=i.colspan
}if(i.rowspan){g.rowSpan=i.rowspan
}this.getRow(e).appendChild(g);
return g
},getNextNonSpan:function(a,c){var b=this.columns;
while((b&&a>=b)||(this.cells[c]&&this.cells[c][a])){if(b&&a>=b){c++;
a=0
}else{a++
}}return[a,c]
},renderItem:function(e,a,d){if(!this.table){this.table=d.createChild(Ext.apply({tag:"table",cls:"x-table-layout",cellspacing:0,cn:{tag:"tbody"}},this.tableAttrs),null,true)
}if(e&&!e.rendered){e.render(this.getNextCell(e));
this.configureItem(e)
}else{if(e&&!this.isValidParent(e,d)){var b=this.getNextCell(e);
b.insertBefore(e.getPositionEl().dom,null);
e.container=Ext.get(b);
this.configureItem(e)
}}},isValidParent:function(b,a){return b.getPositionEl().up("table",5).dom.parentNode===(a.dom||a)
},destroy:function(){delete this.table;
Ext.layout.TableLayout.superclass.destroy.call(this)
}});
Ext.Container.LAYOUTS.table=Ext.layout.TableLayout;
Ext.layout.AbsoluteLayout=Ext.extend(Ext.layout.AnchorLayout,{extraCls:"x-abs-layout-item",type:"absolute",onLayout:function(a,b){b.position();
this.paddingLeft=b.getPadding("l");
this.paddingTop=b.getPadding("t");
Ext.layout.AbsoluteLayout.superclass.onLayout.call(this,a,b)
},adjustWidthAnchor:function(b,a){return b?b-a.getPosition(true)[0]+this.paddingLeft:b
},adjustHeightAnchor:function(b,a){return b?b-a.getPosition(true)[1]+this.paddingTop:b
}});
Ext.Container.LAYOUTS.absolute=Ext.layout.AbsoluteLayout;
Ext.layout.BoxLayout=Ext.extend(Ext.layout.ContainerLayout,{defaultMargins:{left:0,top:0,right:0,bottom:0},padding:"0",pack:"start",monitorResize:true,type:"box",scrollOffset:0,extraCls:"x-box-item",targetCls:"x-box-layout-ct",innerCls:"x-box-inner",constructor:function(a){Ext.layout.BoxLayout.superclass.constructor.call(this,a);
if(Ext.isString(this.defaultMargins)){this.defaultMargins=this.parseMargins(this.defaultMargins)
}var d=this.overflowHandler;
if(typeof d=="string"){d={type:d}
}var c="none";
if(d&&d.type!=undefined){c=d.type
}var b=Ext.layout.boxOverflow[c];
if(b[this.type]){b=b[this.type]
}this.overflowHandler=new b(this,d)
},onLayout:function(b,g){Ext.layout.BoxLayout.superclass.onLayout.call(this,b,g);
var d=this.getLayoutTargetSize(),h=this.getVisibleItems(b),c=this.calculateChildBoxes(h,d),f=c.boxes,i=c.meta;
if(d.width>0){var j=this.overflowHandler,a=i.tooNarrow?"handleOverflow":"clearOverflow";
var e=j[a](c,d);
if(e){if(e.targetSize){d=e.targetSize
}if(e.recalculate){h=this.getVisibleItems(b);
c=this.calculateChildBoxes(h,d);
f=c.boxes
}}}this.layoutTargetLastSize=d;
this.childBoxCache=c;
this.updateInnerCtSize(d,c);
this.updateChildBoxes(f);
this.handleTargetOverflow(d,b,g)
},updateChildBoxes:function(c){for(var b=0,e=c.length;
b<e;
b++){var d=c[b],a=d.component;
if(d.dirtySize){a.setSize(d.width,d.height)
}if(isNaN(d.left)||isNaN(d.top)){continue
}a.setPosition(d.left,d.top)
}},updateInnerCtSize:function(c,g){var h=this.align,f=this.padding,e=c.width,a=c.height;
if(this.type=="hbox"){var b=e,d=g.meta.maxHeight+f.top+f.bottom;
if(h=="stretch"){d=a
}else{if(h=="middle"){d=Math.max(a,d)
}}}else{var d=a,b=g.meta.maxWidth+f.left+f.right;
if(h=="stretch"){b=e
}else{if(h=="center"){b=Math.max(e,b)
}}}this.innerCt.setSize(b||undefined,d||undefined)
},handleTargetOverflow:function(d,a,c){var e=c.getStyle("overflow");
if(e&&e!="hidden"&&!this.adjustmentPass){var b=this.getLayoutTargetSize();
if(b.width!=d.width||b.height!=d.height){this.adjustmentPass=true;
this.onLayout(a,c)
}}delete this.adjustmentPass
},isValidParent:function(b,a){return this.innerCt&&b.getPositionEl().dom.parentNode==this.innerCt.dom
},getVisibleItems:function(f){var f=f||this.container,e=f.getLayoutTarget(),g=f.items.items,a=g.length,d,h,b=[];
for(d=0;
d<a;
d++){if((h=g[d]).rendered&&this.isValidParent(h,e)&&h.hidden!==true&&h.collapsed!==true&&h.shouldLayout!==false){b.push(h)
}}return b
},renderAll:function(a,b){if(!this.innerCt){this.innerCt=b.createChild({cls:this.innerCls});
this.padding=this.parseMargins(this.padding)
}Ext.layout.BoxLayout.superclass.renderAll.call(this,a,this.innerCt)
},getLayoutTargetSize:function(){var b=this.container.getLayoutTarget(),a;
if(b){a=b.getViewSize();
if(Ext.isIE&&Ext.isStrict&&a.width==0){a=b.getStyleSize()
}a.width-=b.getPadding("lr");
a.height-=b.getPadding("tb")
}return a
},renderItem:function(a){if(Ext.isString(a.margins)){a.margins=this.parseMargins(a.margins)
}else{if(!a.margins){a.margins=this.defaultMargins
}}Ext.layout.BoxLayout.superclass.renderItem.apply(this,arguments)
},destroy:function(){Ext.destroy(this.overflowHandler);
Ext.layout.BoxLayout.superclass.destroy.apply(this,arguments)
}});
Ext.layout.boxOverflow.None=Ext.extend(Object,{constructor:function(b,a){this.layout=b;
Ext.apply(this,a||{})
},handleOverflow:Ext.emptyFn,clearOverflow:Ext.emptyFn});
Ext.layout.boxOverflow.none=Ext.layout.boxOverflow.None;
Ext.layout.boxOverflow.Menu=Ext.extend(Ext.layout.boxOverflow.None,{afterCls:"x-strip-right",noItemsMenuText:'<div class="x-toolbar-no-items">(None)</div>',constructor:function(a){Ext.layout.boxOverflow.Menu.superclass.constructor.apply(this,arguments);
this.menuItems=[]
},createInnerElements:function(){if(!this.afterCt){this.afterCt=this.layout.innerCt.insertSibling({cls:this.afterCls},"before")
}},clearOverflow:function(a,f){var e=f.width+(this.afterCt?this.afterCt.getWidth():0),b=this.menuItems;
this.hideTrigger();
for(var c=0,d=b.length;
c<d;
c++){b.pop().component.show()
}return{targetSize:{height:f.height,width:e}}
},showTrigger:function(){this.createMenu();
this.menuTrigger.show()
},hideTrigger:function(){if(this.menuTrigger!=undefined){this.menuTrigger.hide()
}},beforeMenuShow:function(g){var b=this.menuItems,a=b.length,f,e;
var c=function(i,h){return i.isXType("buttongroup")&&!(h instanceof Ext.Toolbar.Separator)
};
this.clearMenu();
g.removeAll();
for(var d=0;
d<a;
d++){f=b[d].component;
if(e&&(c(f,e)||c(e,f))){g.add("-")
}this.addComponentToMenu(g,f);
e=f
}if(g.items.length<1){g.add(this.noItemsMenuText)
}},createMenuConfig:function(c,a){var b=Ext.apply({},c.initialConfig),d=c.toggleGroup;
Ext.copyTo(b,c,["iconCls","icon","itemId","disabled","handler","scope","menu"]);
Ext.apply(b,{text:c.overflowText||c.text,hideOnClick:a});
if(d||c.enableToggle){Ext.apply(b,{group:d,checked:c.pressed,listeners:{checkchange:function(f,e){c.toggle(e)
}}})
}delete b.ownerCt;
delete b.xtype;
delete b.id;
return b
},addComponentToMenu:function(b,a){if(a instanceof Ext.Toolbar.Separator){b.add("-")
}else{if(Ext.isFunction(a.isXType)){if(a.isXType("splitbutton")){b.add(this.createMenuConfig(a,true))
}else{if(a.isXType("button")){b.add(this.createMenuConfig(a,!a.menu))
}else{if(a.isXType("buttongroup")){a.items.each(function(c){this.addComponentToMenu(b,c)
},this)
}}}}}},clearMenu:function(){var a=this.moreMenu;
if(a&&a.items){a.items.each(function(b){delete b.menu
})
}},createMenu:function(){if(!this.menuTrigger){this.createInnerElements();
this.menu=new Ext.menu.Menu({ownerCt:this.layout.container,listeners:{scope:this,beforeshow:this.beforeMenuShow}});
this.menuTrigger=new Ext.Button({iconCls:"x-toolbar-more-icon",cls:"x-toolbar-more",menu:this.menu,renderTo:this.afterCt})
}},destroy:function(){Ext.destroy(this.menu,this.menuTrigger)
}});
Ext.layout.boxOverflow.menu=Ext.layout.boxOverflow.Menu;
Ext.layout.boxOverflow.HorizontalMenu=Ext.extend(Ext.layout.boxOverflow.Menu,{constructor:function(){Ext.layout.boxOverflow.HorizontalMenu.superclass.constructor.apply(this,arguments);
var c=this,b=c.layout,a=b.calculateChildBoxes;
b.calculateChildBoxes=function(d,h){var k=a.apply(b,arguments),j=k.meta,e=c.menuItems;
var i=0;
for(var f=0,g=e.length;
f<g;
f++){i+=e[f].width
}j.minimumWidth+=i;
j.tooNarrow=j.minimumWidth>h.width;
return k
}
},handleOverflow:function(d,g){this.showTrigger();
var j=g.width-this.afterCt.getWidth(),k=d.boxes,e=0,q=false;
for(var n=0,c=k.length;
n<c;
n++){e+=k[n].width
}var a=j-e,f=0;
for(var n=0,c=this.menuItems.length;
n<c;
n++){var m=this.menuItems[n],l=m.component,b=m.width;
if(b<a){l.show();
a-=b;
f++;
q=true
}else{break
}}if(q){this.menuItems=this.menuItems.slice(f)
}else{for(var h=k.length-1;
h>=0;
h--){var p=k[h].component,o=k[h].left+k[h].width;
if(o>=j){this.menuItems.unshift({component:p,width:k[h].width});
p.hide()
}else{break
}}}if(this.menuItems.length==0){this.hideTrigger()
}return{targetSize:{height:g.height,width:j},recalculate:q}
}});
Ext.layout.boxOverflow.menu.hbox=Ext.layout.boxOverflow.HorizontalMenu;
Ext.layout.boxOverflow.Scroller=Ext.extend(Ext.layout.boxOverflow.None,{animateScroll:true,scrollIncrement:100,wheelIncrement:3,scrollRepeatInterval:400,scrollDuration:0.4,beforeCls:"x-strip-left",afterCls:"x-strip-right",scrollerCls:"x-strip-scroller",beforeScrollerCls:"x-strip-scroller-left",afterScrollerCls:"x-strip-scroller-right",createWheelListener:function(){this.layout.innerCt.on({scope:this,mousewheel:function(a){a.stopEvent();
this.scrollBy(a.getWheelDelta()*this.wheelIncrement*-1,false)
}})
},handleOverflow:function(a,b){this.createInnerElements();
this.showScrollers()
},clearOverflow:function(){this.hideScrollers()
},showScrollers:function(){this.createScrollers();
this.beforeScroller.show();
this.afterScroller.show();
this.updateScrollButtons()
},hideScrollers:function(){if(this.beforeScroller!=undefined){this.beforeScroller.hide();
this.afterScroller.hide()
}},createScrollers:function(){if(!this.beforeScroller&&!this.afterScroller){var a=this.beforeCt.createChild({cls:String.format("{0} {1} ",this.scrollerCls,this.beforeScrollerCls)});
var b=this.afterCt.createChild({cls:String.format("{0} {1}",this.scrollerCls,this.afterScrollerCls)});
a.addClassOnOver(this.beforeScrollerCls+"-hover");
b.addClassOnOver(this.afterScrollerCls+"-hover");
a.setVisibilityMode(Ext.Element.DISPLAY);
b.setVisibilityMode(Ext.Element.DISPLAY);
this.beforeRepeater=new Ext.util.ClickRepeater(a,{interval:this.scrollRepeatInterval,handler:this.scrollLeft,scope:this});
this.afterRepeater=new Ext.util.ClickRepeater(b,{interval:this.scrollRepeatInterval,handler:this.scrollRight,scope:this});
this.beforeScroller=a;
this.afterScroller=b
}},destroy:function(){Ext.destroy(this.beforeScroller,this.afterScroller,this.beforeRepeater,this.afterRepeater,this.beforeCt,this.afterCt)
},scrollBy:function(b,a){this.scrollTo(this.getScrollPosition()+b,a)
},getItem:function(a){if(Ext.isString(a)){a=Ext.getCmp(a)
}else{if(Ext.isNumber(a)){a=this.items[a]
}}return a
},getScrollAnim:function(){return{duration:this.scrollDuration,callback:this.updateScrollButtons,scope:this}
},updateScrollButtons:function(){if(this.beforeScroller==undefined||this.afterScroller==undefined){return
}var d=this.atExtremeBefore()?"addClass":"removeClass",c=this.atExtremeAfter()?"addClass":"removeClass",a=this.beforeScrollerCls+"-disabled",b=this.afterScrollerCls+"-disabled";
this.beforeScroller[d](a);
this.afterScroller[c](b);
this.scrolling=false
},atExtremeBefore:function(){return this.getScrollPosition()===0
},scrollLeft:function(a){this.scrollBy(-this.scrollIncrement,a)
},scrollRight:function(a){this.scrollBy(this.scrollIncrement,a)
},scrollToItem:function(d,b){d=this.getItem(d);
if(d!=undefined){var a=this.getItemVisibility(d);
if(!a.fullyVisible){var c=d.getBox(true,true),e=c.x;
if(a.hiddenRight){e-=(this.layout.innerCt.getWidth()-c.width)
}this.scrollTo(e,b)
}}},getItemVisibility:function(e){var d=this.getItem(e).getBox(true,true),a=d.x,c=d.x+d.width,f=this.getScrollPosition(),b=this.layout.innerCt.getWidth()+f;
return{hiddenLeft:a<f,hiddenRight:c>b,fullyVisible:a>f&&c<b}
}});
Ext.layout.boxOverflow.scroller=Ext.layout.boxOverflow.Scroller;
Ext.layout.boxOverflow.VerticalScroller=Ext.extend(Ext.layout.boxOverflow.Scroller,{scrollIncrement:75,wheelIncrement:2,handleOverflow:function(a,b){Ext.layout.boxOverflow.VerticalScroller.superclass.handleOverflow.apply(this,arguments);
return{targetSize:{height:b.height-(this.beforeCt.getHeight()+this.afterCt.getHeight()),width:b.width}}
},createInnerElements:function(){var a=this.layout.innerCt;
if(!this.beforeCt){this.beforeCt=a.insertSibling({cls:this.beforeCls},"before");
this.afterCt=a.insertSibling({cls:this.afterCls},"after");
this.createWheelListener()
}},scrollTo:function(a,b){var d=this.getScrollPosition(),c=a.constrain(0,this.getMaxScrollBottom());
if(c!=d&&!this.scrolling){if(b==undefined){b=this.animateScroll
}this.layout.innerCt.scrollTo("top",c,b?this.getScrollAnim():false);
if(b){this.scrolling=true
}else{this.scrolling=false;
this.updateScrollButtons()
}}},getScrollPosition:function(){return parseInt(this.layout.innerCt.dom.scrollTop,10)||0
},getMaxScrollBottom:function(){return this.layout.innerCt.dom.scrollHeight-this.layout.innerCt.getHeight()
},atExtremeAfter:function(){return this.getScrollPosition()>=this.getMaxScrollBottom()
}});
Ext.layout.boxOverflow.scroller.vbox=Ext.layout.boxOverflow.VerticalScroller;
Ext.layout.boxOverflow.HorizontalScroller=Ext.extend(Ext.layout.boxOverflow.Scroller,{handleOverflow:function(a,b){Ext.layout.boxOverflow.HorizontalScroller.superclass.handleOverflow.apply(this,arguments);
return{targetSize:{height:b.height,width:b.width-(this.beforeCt.getWidth()+this.afterCt.getWidth())}}
},createInnerElements:function(){var a=this.layout.innerCt;
if(!this.beforeCt){this.afterCt=a.insertSibling({cls:this.afterCls},"before");
this.beforeCt=a.insertSibling({cls:this.beforeCls},"before");
this.createWheelListener()
}},scrollTo:function(a,b){var d=this.getScrollPosition(),c=a.constrain(0,this.getMaxScrollRight());
if(c!=d&&!this.scrolling){if(b==undefined){b=this.animateScroll
}this.layout.innerCt.scrollTo("left",c,b?this.getScrollAnim():false);
if(b){this.scrolling=true
}else{this.scrolling=false;
this.updateScrollButtons()
}}},getScrollPosition:function(){return parseInt(this.layout.innerCt.dom.scrollLeft,10)||0
},getMaxScrollRight:function(){return this.layout.innerCt.dom.scrollWidth-this.layout.innerCt.getWidth()
},atExtremeAfter:function(){return this.getScrollPosition()>=this.getMaxScrollRight()
}});
Ext.layout.boxOverflow.scroller.hbox=Ext.layout.boxOverflow.HorizontalScroller;
Ext.layout.HBoxLayout=Ext.extend(Ext.layout.BoxLayout,{align:"top",type:"hbox",calculateChildBoxes:function(q,b){var E=q.length,Q=this.padding,C=Q.top,T=Q.left,x=C+Q.bottom,N=T+Q.right,a=b.width-this.scrollOffset,e=b.height,n=Math.max(0,e-x),O=this.pack=="start",V=this.pack=="center",z=this.pack=="end",K=0,P=0,S=0,k=0,W=0,G=[],j,I,L,U,v,h,R,H,c,w,p,M;
for(R=0;
R<E;
R++){j=q[R];
L=j.height;
I=j.width;
h=!j.hasLayout&&typeof j.doLayout=="function";
if(typeof I!="number"){if(j.flex&&!I){S+=j.flex
}else{if(!I&&h){j.doLayout()
}U=j.getSize();
I=U.width;
L=U.height
}}v=j.margins;
w=v.left+v.right;
K+=w+(I||0);
k+=w+(j.flex?j.minWidth||0:I);
W+=w+(j.minWidth||I||0);
if(typeof L!="number"){if(h){j.doLayout()
}L=j.getHeight()
}P=Math.max(P,L+v.top+v.bottom);
G.push({component:j,height:L||undefined,width:I||undefined})
}var J=k-a,o=W>a;
var m=Math.max(0,a-K-N);
if(o){for(R=0;
R<E;
R++){G[R].width=q[R].minWidth||q[R].width||G[R].width
}}else{if(J>0){var B=[];
for(var D=0,u=E;
D<u;
D++){var A=q[D],s=A.minWidth||0;
if(A.flex){G[D].width=s
}else{B.push({minWidth:s,available:G[D].width-s,index:D})
}}B.sort(function(X,i){return X.available>i.available?1:-1
});
for(var R=0,u=B.length;
R<u;
R++){var F=B[R].index;
if(F==undefined){continue
}var A=q[F],l=G[F],t=l.width,s=A.minWidth,d=Math.max(s,t-Math.ceil(J/(u-R))),f=t-d;
G[F].width=d;
J-=f
}}else{var g=m,r=S;
for(R=0;
R<E;
R++){j=q[R];
H=G[R];
v=j.margins;
p=v.top+v.bottom;
if(O&&j.flex&&!j.width){c=Math.ceil((j.flex/r)*g);
g-=c;
r-=j.flex;
H.width=c;
H.dirtySize=true
}}}}if(V){T+=m/2
}else{if(z){T+=m
}}for(R=0;
R<E;
R++){j=q[R];
H=G[R];
v=j.margins;
T+=v.left;
p=v.top+v.bottom;
H.left=T;
H.top=C+v.top;
switch(this.align){case"stretch":M=n-p;
H.height=M.constrain(j.minHeight||0,j.maxHeight||1000000);
H.dirtySize=true;
break;
case"stretchmax":M=P-p;
H.height=M.constrain(j.minHeight||0,j.maxHeight||1000000);
H.dirtySize=true;
break;
case"middle":var y=n-H.height-p;
if(y>0){H.top=C+p+(y/2)
}}T+=H.width+v.right
}return{boxes:G,meta:{maxHeight:P,nonFlexWidth:K,desiredWidth:k,minimumWidth:W,shortfall:k-a,tooNarrow:o}}
}});
Ext.Container.LAYOUTS.hbox=Ext.layout.HBoxLayout;
Ext.layout.VBoxLayout=Ext.extend(Ext.layout.BoxLayout,{align:"left",type:"vbox",calculateChildBoxes:function(n,b){var D=n.length,Q=this.padding,B=Q.top,U=Q.left,w=B+Q.bottom,N=U+Q.right,a=b.width-this.scrollOffset,c=b.height,J=Math.max(0,a-N),O=this.pack=="start",W=this.pack=="center",y=this.pack=="end",j=0,t=0,T=0,K=0,l=0,F=[],g,H,M,V,s,f,S,G,R,v,m,d,q;
for(S=0;
S<D;
S++){g=n[S];
M=g.height;
H=g.width;
f=!g.hasLayout&&typeof g.doLayout=="function";
if(typeof M!="number"){if(g.flex&&!M){T+=g.flex
}else{if(!M&&f){g.doLayout()
}V=g.getSize();
H=V.width;
M=V.height
}}s=g.margins;
m=s.top+s.bottom;
j+=m+(M||0);
K+=m+(g.flex?g.minHeight||0:M);
l+=m+(g.minHeight||M||0);
if(typeof H!="number"){if(f){g.doLayout()
}H=g.getWidth()
}t=Math.max(t,H+s.left+s.right);
F.push({component:g,height:M||undefined,width:H||undefined})
}var L=K-c,k=l>c;
var p=Math.max(0,(c-j-w));
if(k){for(S=0,q=D;
S<q;
S++){F[S].height=n[S].minHeight||n[S].height||F[S].height
}}else{if(L>0){var I=[];
for(var C=0,q=D;
C<q;
C++){var z=n[C],r=z.minHeight||0;
if(z.flex){F[C].height=r
}else{I.push({minHeight:r,available:F[C].height-r,index:C})
}}I.sort(function(X,i){return X.available>i.available?1:-1
});
for(var S=0,q=I.length;
S<q;
S++){var E=I[S].index;
if(E==undefined){continue
}var z=n[E],h=F[E],u=h.height,r=z.minHeight,A=Math.max(r,u-Math.ceil(L/(q-S))),e=u-A;
F[E].height=A;
L-=e
}}else{var P=p,o=T;
for(S=0;
S<D;
S++){g=n[S];
G=F[S];
s=g.margins;
v=s.left+s.right;
if(O&&g.flex&&!g.height){R=Math.ceil((g.flex/o)*P);
P-=R;
o-=g.flex;
G.height=R;
G.dirtySize=true
}}}}if(W){B+=p/2
}else{if(y){B+=p
}}for(S=0;
S<D;
S++){g=n[S];
G=F[S];
s=g.margins;
B+=s.top;
v=s.left+s.right;
G.left=U+s.left;
G.top=B;
switch(this.align){case"stretch":d=J-v;
G.width=d.constrain(g.minWidth||0,g.maxWidth||1000000);
G.dirtySize=true;
break;
case"stretchmax":d=t-v;
G.width=d.constrain(g.minWidth||0,g.maxWidth||1000000);
G.dirtySize=true;
break;
case"center":var x=J-G.width-v;
if(x>0){G.left=U+v+(x/2)
}}B+=G.height+s.bottom
}return{boxes:F,meta:{maxWidth:t,nonFlexHeight:j,desiredHeight:K,minimumHeight:l,shortfall:K-c,tooNarrow:k}}
}});
Ext.Container.LAYOUTS.vbox=Ext.layout.VBoxLayout;
Ext.layout.ToolbarLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,type:"toolbar",triggerWidth:18,noItemsMenuText:'<div class="x-toolbar-no-items">(None)</div>',lastOverflow:false,tableHTML:['<table cellspacing="0" class="x-toolbar-ct">',"<tbody>","<tr>",'<td class="x-toolbar-left" align="{0}">','<table cellspacing="0">',"<tbody>",'<tr class="x-toolbar-left-row"></tr>',"</tbody>","</table>","</td>",'<td class="x-toolbar-right" align="right">','<table cellspacing="0" class="x-toolbar-right-ct">',"<tbody>","<tr>","<td>",'<table cellspacing="0">',"<tbody>",'<tr class="x-toolbar-right-row"></tr>',"</tbody>","</table>","</td>","<td>",'<table cellspacing="0">',"<tbody>",'<tr class="x-toolbar-extras-row"></tr>',"</tbody>","</table>","</td>","</tr>","</tbody>","</table>","</td>","</tr>","</tbody>","</table>"].join(""),onLayout:function(e,h){if(!this.leftTr){var g=e.buttonAlign=="center"?"center":"left";
h.addClass("x-toolbar-layout-ct");
h.insertHtml("beforeEnd",String.format(this.tableHTML,g));
this.leftTr=h.child("tr.x-toolbar-left-row",true);
this.rightTr=h.child("tr.x-toolbar-right-row",true);
this.extrasTr=h.child("tr.x-toolbar-extras-row",true);
if(this.hiddenItem==undefined){this.hiddenItems=[]
}}var j=e.buttonAlign=="right"?this.rightTr:this.leftTr,k=e.items.items,d=0;
for(var b=0,f=k.length,l;
b<f;
b++,d++){l=k[b];
if(l.isFill){j=this.rightTr;
d=-1
}else{if(!l.rendered){l.render(this.insertCell(l,j,d));
this.configureItem(l)
}else{if(!l.xtbHidden&&!this.isValidParent(l,j.childNodes[d])){var a=this.insertCell(l,j,d);
a.appendChild(l.getPositionEl().dom);
l.container=Ext.get(a)
}}}}this.cleanup(this.leftTr);
this.cleanup(this.rightTr);
this.cleanup(this.extrasTr);
this.fitToSize(h)
},cleanup:function(b){var e=b.childNodes,a,d;
for(a=e.length-1;
a>=0&&(d=e[a]);
a--){if(!d.firstChild){b.removeChild(d)
}}},insertCell:function(e,b,a){var d=document.createElement("td");
d.className="x-toolbar-cell";
b.insertBefore(d,b.childNodes[a]||null);
return d
},hideItem:function(a){this.hiddenItems.push(a);
a.xtbHidden=true;
a.xtbWidth=a.getPositionEl().dom.parentNode.offsetWidth;
a.hide()
},unhideItem:function(a){a.show();
a.xtbHidden=false;
this.hiddenItems.remove(a)
},getItemWidth:function(a){return a.hidden?(a.xtbWidth||0):a.getPositionEl().dom.parentNode.offsetWidth
},fitToSize:function(j){if(this.container.enableOverflow===false){return
}var b=j.dom.clientWidth,h=j.dom.firstChild.offsetWidth,l=b-this.triggerWidth,a=this.lastWidth||0,c=this.hiddenItems,e=c.length!=0,m=b>=a;
this.lastWidth=b;
if(h>b||(e&&m)){var k=this.container.items.items,g=k.length,d=0,n;
for(var f=0;
f<g;
f++){n=k[f];
if(!n.isFill){d+=this.getItemWidth(n);
if(d>l){if(!(n.hidden||n.xtbHidden)){this.hideItem(n)
}}else{if(n.xtbHidden){this.unhideItem(n)
}}}}}e=c.length!=0;
if(e){this.initMore();
if(!this.lastOverflow){this.container.fireEvent("overflowchange",this.container,true);
this.lastOverflow=true
}}else{if(this.more){this.clearMenu();
this.more.destroy();
delete this.more;
if(this.lastOverflow){this.container.fireEvent("overflowchange",this.container,false);
this.lastOverflow=false
}}}},createMenuConfig:function(c,a){var b=Ext.apply({},c.initialConfig),d=c.toggleGroup;
Ext.copyTo(b,c,["iconCls","icon","itemId","disabled","handler","scope","menu"]);
Ext.apply(b,{text:c.overflowText||c.text,hideOnClick:a});
if(d||c.enableToggle){Ext.apply(b,{group:d,checked:c.pressed,listeners:{checkchange:function(f,e){c.toggle(e)
}}})
}delete b.ownerCt;
delete b.xtype;
delete b.id;
return b
},addComponentToMenu:function(b,a){if(a instanceof Ext.Toolbar.Separator){b.add("-")
}else{if(Ext.isFunction(a.isXType)){if(a.isXType("splitbutton")){b.add(this.createMenuConfig(a,true))
}else{if(a.isXType("button")){b.add(this.createMenuConfig(a,!a.menu))
}else{if(a.isXType("buttongroup")){a.items.each(function(c){this.addComponentToMenu(b,c)
},this)
}}}}}},clearMenu:function(){var a=this.moreMenu;
if(a&&a.items){a.items.each(function(b){delete b.menu
})
}},beforeMoreShow:function(g){var b=this.container.items.items,a=b.length,f,e;
var c=function(i,h){return i.isXType("buttongroup")&&!(h instanceof Ext.Toolbar.Separator)
};
this.clearMenu();
g.removeAll();
for(var d=0;
d<a;
d++){f=b[d];
if(f.xtbHidden){if(e&&(c(f,e)||c(e,f))){g.add("-")
}this.addComponentToMenu(g,f);
e=f
}}if(g.items.length<1){g.add(this.noItemsMenuText)
}},initMore:function(){if(!this.more){this.moreMenu=new Ext.menu.Menu({ownerCt:this.container,listeners:{beforeshow:this.beforeMoreShow,scope:this}});
this.more=new Ext.Button({iconCls:"x-toolbar-more-icon",cls:"x-toolbar-more",menu:this.moreMenu,ownerCt:this.container});
var a=this.insertCell(this.more,this.extrasTr,100);
this.more.render(a)
}},destroy:function(){Ext.destroy(this.more,this.moreMenu);
delete this.leftTr;
delete this.rightTr;
delete this.extrasTr;
Ext.layout.ToolbarLayout.superclass.destroy.call(this)
}});
Ext.Container.LAYOUTS.toolbar=Ext.layout.ToolbarLayout;
Ext.layout.MenuLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,type:"menu",setContainer:function(a){this.monitorResize=!a.floating;
a.on("autosize",this.doAutoSize,this);
Ext.layout.MenuLayout.superclass.setContainer.call(this,a)
},renderItem:function(f,b,e){if(!this.itemTpl){this.itemTpl=Ext.layout.MenuLayout.prototype.itemTpl=new Ext.XTemplate('<li id="{itemId}" class="{itemCls}">','<tpl if="needsIcon">','<img alt="{altText}" src="{icon}" class="{iconCls}"/>',"</tpl>","</li>")
}if(f&&!f.rendered){if(Ext.isNumber(b)){b=e.dom.childNodes[b]
}var d=this.getItemArgs(f);
f.render(f.positionEl=b?this.itemTpl.insertBefore(b,d,true):this.itemTpl.append(e,d,true));
f.positionEl.menuItemId=f.getItemId();
if(!d.isMenuItem&&d.needsIcon){f.positionEl.addClass("x-menu-list-item-indent")
}this.configureItem(f)
}else{if(f&&!this.isValidParent(f,e)){if(Ext.isNumber(b)){b=e.dom.childNodes[b]
}e.dom.insertBefore(f.getActionEl().dom,b||null)
}}},getItemArgs:function(d){var a=d instanceof Ext.menu.Item,b=!(a||d instanceof Ext.menu.Separator);
return{isMenuItem:a,needsIcon:b&&(d.icon||d.iconCls),icon:d.icon||Ext.BLANK_IMAGE_URL,iconCls:"x-menu-item-icon "+(d.iconCls||""),itemId:"x-menu-el-"+d.id,itemCls:"x-menu-list-item ",altText:d.altText||""}
},isValidParent:function(b,a){return b.el.up("li.x-menu-list-item",5).dom.parentNode===(a.dom||a)
},onLayout:function(a,b){Ext.layout.MenuLayout.superclass.onLayout.call(this,a,b);
this.doAutoSize()
},doAutoSize:function(){var c=this.container,a=c.width;
if(c.floating){if(a){c.setWidth(a)
}else{if(Ext.isIE){c.setWidth(Ext.isStrict&&(Ext.isIE7||Ext.isIE8||Ext.isIE9)?"auto":c.minWidth);
var d=c.getEl(),b=d.dom.offsetWidth;
c.setWidth(c.getLayoutTarget().getWidth()+d.getFrameWidth("lr"))
}}}}});
Ext.Container.LAYOUTS.menu=Ext.layout.MenuLayout;
Ext.Viewport=Ext.extend(Ext.Container,{initComponent:function(){Ext.Viewport.superclass.initComponent.call(this);
document.getElementsByTagName("html")[0].className+=" x-viewport";
this.el=Ext.getBody();
this.el.setHeight=Ext.emptyFn;
this.el.setWidth=Ext.emptyFn;
this.el.setSize=Ext.emptyFn;
this.el.dom.scroll="no";
this.allowDomMove=false;
this.autoWidth=true;
this.autoHeight=true;
Ext.EventManager.onWindowResize(this.fireResize,this);
this.renderTo=this.el
},fireResize:function(a,b){this.fireEvent("resize",this,a,b,a,b)
}});
Ext.reg("viewport",Ext.Viewport);
Ext.Panel=Ext.extend(Ext.Container,{baseCls:"x-panel",collapsedCls:"x-panel-collapsed",maskDisabled:true,animCollapse:Ext.enableFx,headerAsText:true,buttonAlign:"right",collapsed:false,collapseFirst:true,minButtonWidth:75,elements:"body",preventBodyReset:false,padding:undefined,resizeEvent:"bodyresize",toolTarget:"header",collapseEl:"bwrap",slideAnchor:"t",disabledClass:"",deferHeight:true,expandDefaults:{duration:0.25},collapseDefaults:{duration:0.25},initComponent:function(){Ext.Panel.superclass.initComponent.call(this);
this.addEvents("bodyresize","titlechange","iconchange","collapse","expand","beforecollapse","beforeexpand","beforeclose","close","activate","deactivate");
if(this.unstyled){this.baseCls="x-plain"
}this.toolbars=[];
if(this.tbar){this.elements+=",tbar";
this.topToolbar=this.createToolbar(this.tbar);
this.tbar=null
}if(this.bbar){this.elements+=",bbar";
this.bottomToolbar=this.createToolbar(this.bbar);
this.bbar=null
}if(this.header===true){this.elements+=",header";
this.header=null
}else{if(this.headerCfg||(this.title&&this.header!==false)){this.elements+=",header"
}}if(this.footerCfg||this.footer===true){this.elements+=",footer";
this.footer=null
}if(this.buttons){this.fbar=this.buttons;
this.buttons=null
}if(this.fbar){this.createFbar(this.fbar)
}if(this.autoLoad){this.on("render",this.doAutoLoad,this,{delay:10})
}},createFbar:function(b){var a=this.minButtonWidth;
this.elements+=",footer";
this.fbar=this.createToolbar(b,{buttonAlign:this.buttonAlign,toolbarCls:"x-panel-fbar",enableOverflow:false,defaults:function(d){return{minWidth:d.minWidth||a}
}});
this.fbar.items.each(function(d){d.minWidth=d.minWidth||this.minButtonWidth
},this);
this.buttons=this.fbar.items.items
},createToolbar:function(b,c){var a;
if(Ext.isArray(b)){b={items:b}
}a=b.events?Ext.apply(b,c):this.createComponent(Ext.apply({},b,c),"toolbar");
this.toolbars.push(a);
return a
},createElement:function(a,c){if(this[a]){c.appendChild(this[a].dom);
return
}if(a==="bwrap"||this.elements.indexOf(a)!=-1){if(this[a+"Cfg"]){this[a]=Ext.fly(c).createChild(this[a+"Cfg"])
}else{var b=document.createElement("div");
b.className=this[a+"Cls"];
this[a]=Ext.get(c.appendChild(b))
}if(this[a+"CssClass"]){this[a].addClass(this[a+"CssClass"])
}if(this[a+"Style"]){this[a].applyStyles(this[a+"Style"])
}}},onRender:function(f,e){Ext.Panel.superclass.onRender.call(this,f,e);
this.createClasses();
var a=this.el,g=a.dom,j,h;
if(this.collapsible&&!this.hideCollapseTool){this.tools=this.tools?this.tools.slice(0):[];
this.tools[this.collapseFirst?"unshift":"push"]({id:"toggle",handler:this.toggleCollapse,scope:this})
}if(this.tools){h=this.tools;
this.elements+=(this.header!==false)?",header":""
}this.tools={};
a.addClass(this.baseCls);
if(g.firstChild){this.header=a.down("."+this.headerCls);
this.bwrap=a.down("."+this.bwrapCls);
var i=this.bwrap?this.bwrap:a;
this.tbar=i.down("."+this.tbarCls);
this.body=i.down("."+this.bodyCls);
this.bbar=i.down("."+this.bbarCls);
this.footer=i.down("."+this.footerCls);
this.fromMarkup=true
}if(this.preventBodyReset===true){a.addClass("x-panel-reset")
}if(this.cls){a.addClass(this.cls)
}if(this.buttons){this.elements+=",footer"
}if(this.frame){a.insertHtml("afterBegin",String.format(Ext.Element.boxMarkup,this.baseCls));
this.createElement("header",g.firstChild.firstChild.firstChild);
this.createElement("bwrap",g);
j=this.bwrap.dom;
var c=g.childNodes[1],b=g.childNodes[2];
j.appendChild(c);
j.appendChild(b);
var k=j.firstChild.firstChild.firstChild;
this.createElement("tbar",k);
this.createElement("body",k);
this.createElement("bbar",k);
this.createElement("footer",j.lastChild.firstChild.firstChild);
if(!this.footer){this.bwrap.dom.lastChild.className+=" x-panel-nofooter"
}this.ft=Ext.get(this.bwrap.dom.lastChild);
this.mc=Ext.get(k)
}else{this.createElement("header",g);
this.createElement("bwrap",g);
j=this.bwrap.dom;
this.createElement("tbar",j);
this.createElement("body",j);
this.createElement("bbar",j);
this.createElement("footer",j);
if(!this.header){this.body.addClass(this.bodyCls+"-noheader");
if(this.tbar){this.tbar.addClass(this.tbarCls+"-noheader")
}}}if(Ext.isDefined(this.padding)){this.body.setStyle("padding",this.body.addUnits(this.padding))
}if(this.border===false){this.el.addClass(this.baseCls+"-noborder");
this.body.addClass(this.bodyCls+"-noborder");
if(this.header){this.header.addClass(this.headerCls+"-noborder")
}if(this.footer){this.footer.addClass(this.footerCls+"-noborder")
}if(this.tbar){this.tbar.addClass(this.tbarCls+"-noborder")
}if(this.bbar){this.bbar.addClass(this.bbarCls+"-noborder")
}}if(this.bodyBorder===false){this.body.addClass(this.bodyCls+"-noborder")
}this.bwrap.enableDisplayMode("block");
if(this.header){this.header.unselectable();
if(this.headerAsText){this.header.dom.innerHTML='<span class="'+this.headerTextCls+'">'+this.header.dom.innerHTML+"</span>";
if(this.iconCls){this.setIconClass(this.iconCls)
}}}if(this.floating){this.makeFloating(this.floating)
}if(this.collapsible&&this.titleCollapse&&this.header){this.mon(this.header,"click",this.toggleCollapse,this);
this.header.setStyle("cursor","pointer")
}if(h){this.addTool.apply(this,h)
}if(this.fbar){this.footer.addClass("x-panel-btns");
this.fbar.ownerCt=this;
this.fbar.render(this.footer);
this.footer.createChild({cls:"x-clear"})
}if(this.tbar&&this.topToolbar){this.topToolbar.ownerCt=this;
this.topToolbar.render(this.tbar)
}if(this.bbar&&this.bottomToolbar){this.bottomToolbar.ownerCt=this;
this.bottomToolbar.render(this.bbar)
}},setIconClass:function(b){var a=this.iconCls;
this.iconCls=b;
if(this.rendered&&this.header){if(this.frame){this.header.addClass("x-panel-icon");
this.header.replaceClass(a,this.iconCls)
}else{var e=this.header,c=e.child("img.x-panel-inline-icon");
if(c){Ext.fly(c).replaceClass(a,this.iconCls)
}else{var d=e.child("span."+this.headerTextCls);
if(d){Ext.DomHelper.insertBefore(d.dom,{tag:"img",alt:"",src:Ext.BLANK_IMAGE_URL,cls:"x-panel-inline-icon "+this.iconCls})
}}}}this.fireEvent("iconchange",this,b,a)
},makeFloating:function(a){this.floating=true;
this.el=new Ext.Layer(Ext.apply({},a,{shadow:Ext.isDefined(this.shadow)?this.shadow:"sides",shadowOffset:this.shadowOffset,constrain:false,shim:this.shim===false?false:undefined}),this.el)
},getTopToolbar:function(){return this.topToolbar
},getBottomToolbar:function(){return this.bottomToolbar
},getFooterToolbar:function(){return this.fbar
},addButton:function(a,c,b){if(!this.fbar){this.createFbar([])
}if(c){if(Ext.isString(a)){a={text:a}
}a=Ext.apply({handler:c,scope:b},a)
}return this.fbar.add(a)
},addTool:function(){if(!this.rendered){if(!this.tools){this.tools=[]
}Ext.each(arguments,function(a){this.tools.push(a)
},this);
return
}if(!this[this.toolTarget]){return
}if(!this.toolTemplate){var g=new Ext.Template('<div class="x-tool x-tool-{id}">&#160;</div>');
g.disableFormats=true;
g.compile();
Ext.Panel.prototype.toolTemplate=g
}for(var f=0,d=arguments,c=d.length;
f<c;
f++){var b=d[f];
if(!this.tools[b.id]){var h="x-tool-"+b.id+"-over";
var e=this.toolTemplate.insertFirst(this[this.toolTarget],b,true);
this.tools[b.id]=e;
e.enableDisplayMode("block");
this.mon(e,"click",this.createToolHandler(e,b,h,this));
if(b.on){this.mon(e,b.on)
}if(b.hidden){e.hide()
}if(b.qtip){if(Ext.isObject(b.qtip)){Ext.QuickTips.register(Ext.apply({target:e.id},b.qtip))
}else{e.dom.qtip=b.qtip
}}e.addClassOnOver(h)
}}},onLayout:function(b,a){Ext.Panel.superclass.onLayout.apply(this,arguments);
if(this.hasLayout&&this.toolbars.length>0){Ext.each(this.toolbars,function(c){c.doLayout(undefined,a)
});
this.syncHeight()
}},syncHeight:function(){var b=this.toolbarHeight,c=this.body,a=this.lastSize.height,d;
if(this.autoHeight||!Ext.isDefined(a)||a=="auto"){return
}if(b!=this.getToolbarHeight()){b=Math.max(0,a-this.getFrameHeight());
c.setHeight(b);
d=c.getSize();
this.toolbarHeight=this.getToolbarHeight();
this.onBodyResize(d.width,d.height)
}},onShow:function(){if(this.floating){return this.el.show()
}Ext.Panel.superclass.onShow.call(this)
},onHide:function(){if(this.floating){return this.el.hide()
}Ext.Panel.superclass.onHide.call(this)
},createToolHandler:function(c,a,d,b){return function(f){c.removeClass(d);
if(a.stopEvent!==false){f.stopEvent()
}if(a.handler){a.handler.call(a.scope||c,f,c,b,a)
}}
},afterRender:function(){if(this.floating&&!this.hidden){this.el.show()
}if(this.title){this.setTitle(this.title)
}Ext.Panel.superclass.afterRender.call(this);
if(this.collapsed){this.collapsed=false;
this.collapse(false)
}this.initEvents()
},getKeyMap:function(){if(!this.keyMap){this.keyMap=new Ext.KeyMap(this.el,this.keys)
}return this.keyMap
},initEvents:function(){if(this.keys){this.getKeyMap()
}if(this.draggable){this.initDraggable()
}if(this.toolbars.length>0){Ext.each(this.toolbars,function(a){a.doLayout();
a.on({scope:this,afterlayout:this.syncHeight,remove:this.syncHeight})
},this);
this.syncHeight()
}},initDraggable:function(){this.dd=new Ext.Panel.DD(this,Ext.isBoolean(this.draggable)?null:this.draggable)
},beforeEffect:function(a){if(this.floating){this.el.beforeAction()
}if(a!==false){this.el.addClass("x-panel-animated")
}},afterEffect:function(a){this.syncShadow();
this.el.removeClass("x-panel-animated")
},createEffect:function(c,b,d){var e={scope:d,block:true};
if(c===true){e.callback=b;
return e
}else{if(!c.callback){e.callback=b
}else{e.callback=function(){b.call(d);
Ext.callback(c.callback,c.scope)
}
}}return Ext.applyIf(e,c)
},collapse:function(b){if(this.collapsed||this.el.hasFxBlock()||this.fireEvent("beforecollapse",this,b)===false){return
}var a=b===true||(b!==false&&this.animCollapse);
this.beforeEffect(a);
this.onCollapse(a,b);
return this
},onCollapse:function(a,b){if(a){this[this.collapseEl].slideOut(this.slideAnchor,Ext.apply(this.createEffect(b||true,this.afterCollapse,this),this.collapseDefaults))
}else{this[this.collapseEl].hide(this.hideMode);
this.afterCollapse(false)
}},afterCollapse:function(a){this.collapsed=true;
this.el.addClass(this.collapsedCls);
if(a!==false){this[this.collapseEl].hide(this.hideMode)
}this.afterEffect(a);
this.cascade(function(b){if(b.lastSize){b.lastSize={width:undefined,height:undefined}
}});
this.fireEvent("collapse",this)
},expand:function(b){if(!this.collapsed||this.el.hasFxBlock()||this.fireEvent("beforeexpand",this,b)===false){return
}var a=b===true||(b!==false&&this.animCollapse);
this.el.removeClass(this.collapsedCls);
this.beforeEffect(a);
this.onExpand(a,b);
return this
},onExpand:function(a,b){if(a){this[this.collapseEl].slideIn(this.slideAnchor,Ext.apply(this.createEffect(b||true,this.afterExpand,this),this.expandDefaults))
}else{this[this.collapseEl].show(this.hideMode);
this.afterExpand(false)
}},afterExpand:function(a){this.collapsed=false;
if(a!==false){this[this.collapseEl].show(this.hideMode)
}this.afterEffect(a);
if(this.deferLayout){delete this.deferLayout;
this.doLayout(true)
}this.fireEvent("expand",this)
},toggleCollapse:function(a){this[this.collapsed?"expand":"collapse"](a);
return this
},onDisable:function(){if(this.rendered&&this.maskDisabled){this.el.mask()
}Ext.Panel.superclass.onDisable.call(this)
},onEnable:function(){if(this.rendered&&this.maskDisabled){this.el.unmask()
}Ext.Panel.superclass.onEnable.call(this)
},onResize:function(f,d,c,e){var a=f,b=d;
if(Ext.isDefined(a)||Ext.isDefined(b)){if(!this.collapsed){if(Ext.isNumber(a)){this.body.setWidth(a=this.adjustBodyWidth(a-this.getFrameWidth()))
}else{if(a=="auto"){a=this.body.setWidth("auto").dom.offsetWidth
}else{a=this.body.dom.offsetWidth
}}if(this.tbar){this.tbar.setWidth(a);
if(this.topToolbar){this.topToolbar.setSize(a)
}}if(this.bbar){this.bbar.setWidth(a);
if(this.bottomToolbar){this.bottomToolbar.setSize(a);
if(Ext.isIE){this.bbar.setStyle("position","static");
this.bbar.setStyle("position","")
}}}if(this.footer){this.footer.setWidth(a);
if(this.fbar){this.fbar.setSize(Ext.isIE?(a-this.footer.getFrameWidth("lr")):"auto")
}}if(Ext.isNumber(b)){b=Math.max(0,b-this.getFrameHeight());
this.body.setHeight(b)
}else{if(b=="auto"){this.body.setHeight(b)
}}if(this.disabled&&this.el._mask){this.el._mask.setSize(this.el.dom.clientWidth,this.el.getHeight())
}}else{this.queuedBodySize={width:a,height:b};
if(!this.queuedExpand&&this.allowQueuedExpand!==false){this.queuedExpand=true;
this.on("expand",function(){delete this.queuedExpand;
this.onResize(this.queuedBodySize.width,this.queuedBodySize.height)
},this,{single:true})
}}this.onBodyResize(a,b)
}this.syncShadow();
Ext.Panel.superclass.onResize.call(this,f,d,c,e)
},onBodyResize:function(a,b){this.fireEvent("bodyresize",this,a,b)
},getToolbarHeight:function(){var a=0;
if(this.rendered){Ext.each(this.toolbars,function(b){a+=b.getHeight()
},this)
}return a
},adjustBodyHeight:function(a){return a
},adjustBodyWidth:function(a){return a
},onPosition:function(){this.syncShadow()
},getFrameWidth:function(){var b=this.el.getFrameWidth("lr")+this.bwrap.getFrameWidth("lr");
if(this.frame){var a=this.bwrap.dom.firstChild;
b+=(Ext.fly(a).getFrameWidth("l")+Ext.fly(a.firstChild).getFrameWidth("r"));
b+=this.mc.getFrameWidth("lr")
}return b
},getFrameHeight:function(){var a=this.el.getFrameWidth("tb")+this.bwrap.getFrameWidth("tb");
a+=(this.tbar?this.tbar.getHeight():0)+(this.bbar?this.bbar.getHeight():0);
if(this.frame){a+=this.el.dom.firstChild.offsetHeight+this.ft.dom.offsetHeight+this.mc.getFrameWidth("tb")
}else{a+=(this.header?this.header.getHeight():0)+(this.footer?this.footer.getHeight():0)
}return a
},getInnerWidth:function(){return this.getSize().width-this.getFrameWidth()
},getInnerHeight:function(){return this.body.getHeight()
},syncShadow:function(){if(this.floating){this.el.sync(true)
}},getLayoutTarget:function(){return this.body
},getContentTarget:function(){return this.body
},setTitle:function(b,a){this.title=b;
if(this.header&&this.headerAsText){this.header.child("span").update(b)
}if(a){this.setIconClass(a)
}this.fireEvent("titlechange",this,b);
return this
},getUpdater:function(){return this.body.getUpdater()
},load:function(){var a=this.body.getUpdater();
a.update.apply(a,arguments);
return this
},beforeDestroy:function(){Ext.Panel.superclass.beforeDestroy.call(this);
if(this.header){this.header.removeAllListeners()
}if(this.tools){for(var a in this.tools){Ext.destroy(this.tools[a])
}}if(this.toolbars.length>0){Ext.each(this.toolbars,function(b){b.un("afterlayout",this.syncHeight,this);
b.un("remove",this.syncHeight,this)
},this)
}if(Ext.isArray(this.buttons)){while(this.buttons.length){Ext.destroy(this.buttons[0])
}}if(this.rendered){Ext.destroy(this.ft,this.header,this.footer,this.tbar,this.bbar,this.body,this.mc,this.bwrap,this.dd);
if(this.fbar){Ext.destroy(this.fbar,this.fbar.el)
}}Ext.destroy(this.toolbars)
},createClasses:function(){this.headerCls=this.baseCls+"-header";
this.headerTextCls=this.baseCls+"-header-text";
this.bwrapCls=this.baseCls+"-bwrap";
this.tbarCls=this.baseCls+"-tbar";
this.bodyCls=this.baseCls+"-body";
this.bbarCls=this.baseCls+"-bbar";
this.footerCls=this.baseCls+"-footer"
},createGhost:function(a,e,b){var d=document.createElement("div");
d.className="x-panel-ghost "+(a?a:"");
if(this.header){d.appendChild(this.el.dom.firstChild.cloneNode(true))
}Ext.fly(d.appendChild(document.createElement("ul"))).setHeight(this.bwrap.getHeight());
d.style.width=this.el.dom.offsetWidth+"px";
if(!b){this.container.dom.appendChild(d)
}else{Ext.getDom(b).appendChild(d)
}if(e!==false&&this.el.useShim!==false){var c=new Ext.Layer({shadow:false,useDisplay:true,constrain:false},d);
c.show();
return c
}else{return new Ext.Element(d)
}},doAutoLoad:function(){var a=this.body.getUpdater();
if(this.renderer){a.setRenderer(this.renderer)
}a.update(Ext.isObject(this.autoLoad)?this.autoLoad:{url:this.autoLoad})
},getTool:function(a){return this.tools[a]
}});
Ext.reg("panel",Ext.Panel);
Ext.Editor=function(b,a){if(b.field){this.field=Ext.create(b.field,"textfield");
a=Ext.apply({},b);
delete a.field
}else{this.field=b
}Ext.Editor.superclass.constructor.call(this,a)
};
Ext.extend(Ext.Editor,Ext.Component,{allowBlur:true,value:"",alignment:"c-c?",offsets:[0,0],shadow:"frame",constrain:false,swallowKeys:true,completeOnEnter:true,cancelOnEsc:true,updateEl:false,initComponent:function(){Ext.Editor.superclass.initComponent.call(this);
this.addEvents("beforestartedit","startedit","beforecomplete","complete","canceledit","specialkey")
},onRender:function(b,a){this.el=new Ext.Layer({shadow:this.shadow,cls:"x-editor",parentEl:b,shim:this.shim,shadowOffset:this.shadowOffset||4,id:this.id,constrain:this.constrain});
if(this.zIndex){this.el.setZIndex(this.zIndex)
}this.el.setStyle("overflow",Ext.isGecko?"auto":"hidden");
if(this.field.msgTarget!="title"){this.field.msgTarget="qtip"
}this.field.inEditor=true;
this.mon(this.field,{scope:this,blur:this.onBlur,specialkey:this.onSpecialKey});
if(this.field.grow){this.mon(this.field,"autosize",this.el.sync,this.el,{delay:1})
}this.field.render(this.el).show();
this.field.getEl().dom.name="";
if(this.swallowKeys){this.field.el.swallowEvent(["keypress","keydown"])
}},onSpecialKey:function(f,d){var b=d.getKey(),a=this.completeOnEnter&&b==d.ENTER,c=this.cancelOnEsc&&b==d.ESC;
if(a||c){d.stopEvent();
if(a){this.completeEdit()
}else{this.cancelEdit()
}if(f.triggerBlur){f.triggerBlur()
}}this.fireEvent("specialkey",f,d)
},startEdit:function(b,c){if(this.editing){this.completeEdit()
}this.boundEl=Ext.get(b);
var a=c!==undefined?c:this.boundEl.dom.innerHTML;
if(!this.rendered){this.render(this.parentEl||document.body)
}if(this.fireEvent("beforestartedit",this,this.boundEl,a)!==false){this.startValue=a;
this.field.reset();
this.field.setValue(a);
this.realign(true);
this.editing=true;
this.show()
}},doAutoSize:function(){if(this.autoSize){var b=this.boundEl.getSize(),a=this.field.getSize();
switch(this.autoSize){case"width":this.setSize(b.width,a.height);
break;
case"height":this.setSize(a.width,b.height);
break;
case"none":this.setSize(a.width,a.height);
break;
default:this.setSize(b.width,b.height)
}}},setSize:function(a,b){delete this.field.lastSize;
this.field.setSize(a,b);
if(this.el){if(Ext.isGecko2||Ext.isOpera||(Ext.isIE7&&Ext.isStrict)){this.el.setSize(a,b)
}this.el.sync()
}},realign:function(a){if(a===true){this.doAutoSize()
}this.el.alignTo(this.boundEl,this.alignment,this.offsets)
},completeEdit:function(a){if(!this.editing){return
}if(this.field.assertValue){this.field.assertValue()
}var b=this.getValue();
if(!this.field.isValid()){if(this.revertInvalid!==false){this.cancelEdit(a)
}return
}if(String(b)===String(this.startValue)&&this.ignoreNoChange){this.hideEdit(a);
return
}if(this.fireEvent("beforecomplete",this,b,this.startValue)!==false){b=this.getValue();
if(this.updateEl&&this.boundEl){this.boundEl.update(b)
}this.hideEdit(a);
this.fireEvent("complete",this,b,this.startValue)
}},onShow:function(){this.el.show();
if(this.hideEl!==false){this.boundEl.hide()
}this.field.show().focus(false,true);
this.fireEvent("startedit",this.boundEl,this.startValue)
},cancelEdit:function(a){if(this.editing){var b=this.getValue();
this.setValue(this.startValue);
this.hideEdit(a);
this.fireEvent("canceledit",this,b,this.startValue)
}},hideEdit:function(a){if(a!==true){this.editing=false;
this.hide()
}},onBlur:function(){if(this.allowBlur===true&&this.editing&&this.selectSameEditor!==true){this.completeEdit()
}},onHide:function(){if(this.editing){this.completeEdit();
return
}this.field.blur();
if(this.field.collapse){this.field.collapse()
}this.el.hide();
if(this.hideEl!==false){this.boundEl.show()
}},setValue:function(a){this.field.setValue(a)
},getValue:function(){return this.field.getValue()
},beforeDestroy:function(){Ext.destroyMembers(this,"field");
delete this.parentEl;
delete this.boundEl
}});
Ext.reg("editor",Ext.Editor);
Ext.ColorPalette=Ext.extend(Ext.Component,{itemCls:"x-color-palette",value:null,clickEvent:"click",ctype:"Ext.ColorPalette",allowReselect:false,colors:["000000","993300","333300","003300","003366","000080","333399","333333","800000","FF6600","808000","008000","008080","0000FF","666699","808080","FF0000","FF9900","99CC00","339966","33CCCC","3366FF","800080","969696","FF00FF","FFCC00","FFFF00","00FF00","00FFFF","00CCFF","993366","C0C0C0","FF99CC","FFCC99","FFFF99","CCFFCC","CCFFFF","99CCFF","CC99FF","FFFFFF"],initComponent:function(){Ext.ColorPalette.superclass.initComponent.call(this);
this.addEvents("select");
if(this.handler){this.on("select",this.handler,this.scope,true)
}},onRender:function(b,a){this.autoEl={tag:"div",cls:this.itemCls};
Ext.ColorPalette.superclass.onRender.call(this,b,a);
var c=this.tpl||new Ext.XTemplate('<tpl for="."><a href="#" class="color-{.}" hidefocus="on"><em><span style="background:#{.}" unselectable="on">&#160;</span></em></a></tpl>');
c.overwrite(this.el,this.colors);
this.mon(this.el,this.clickEvent,this.handleClick,this,{delegate:"a"});
if(this.clickEvent!="click"){this.mon(this.el,"click",Ext.emptyFn,this,{delegate:"a",preventDefault:true})
}},afterRender:function(){Ext.ColorPalette.superclass.afterRender.call(this);
if(this.value){var a=this.value;
this.value=null;
this.select(a,true)
}},handleClick:function(b,a){b.preventDefault();
if(!this.disabled){var d=a.className.match(/(?:^|\s)color-(.{6})(?:\s|$)/)[1];
this.select(d.toUpperCase())
}},select:function(b,a){b=b.replace("#","");
if(b!=this.value||this.allowReselect){var c=this.el;
if(this.value){c.child("a.color-"+this.value).removeClass("x-color-palette-sel")
}c.child("a.color-"+b).addClass("x-color-palette-sel");
this.value=b;
if(a!==true){this.fireEvent("select",this,b)
}}}});
Ext.reg("colorpalette",Ext.ColorPalette);
Ext.DatePicker=Ext.extend(Ext.BoxComponent,{todayText:"Today",okText:"&#160;OK&#160;",cancelText:"Cancel",todayTip:"{0} (Spacebar)",minText:"This date is before the minimum date",maxText:"This date is after the maximum date",format:"m/d/y",disabledDaysText:"Disabled",disabledDatesText:"Disabled",monthNames:Date.monthNames,dayNames:Date.dayNames,nextText:"Next Month (Control+Right)",prevText:"Previous Month (Control+Left)",monthYearText:"Choose a month (Control+Up/Down to move years)",startDay:0,showToday:true,focusOnSelect:true,initHour:12,initComponent:function(){Ext.DatePicker.superclass.initComponent.call(this);
this.value=this.value?this.value.clearTime(true):new Date().clearTime();
this.addEvents("select");
if(this.handler){this.on("select",this.handler,this.scope||this)
}this.initDisabledDays()
},initDisabledDays:function(){if(!this.disabledDatesRE&&this.disabledDates){var b=this.disabledDates,a=b.length-1,c="(?:";
Ext.each(b,function(f,e){c+=Ext.isDate(f)?"^"+Ext.escapeRe(f.dateFormat(this.format))+"$":b[e];
if(e!=a){c+="|"
}},this);
this.disabledDatesRE=new RegExp(c+")")
}},setDisabledDates:function(a){if(Ext.isArray(a)){this.disabledDates=a;
this.disabledDatesRE=null
}else{this.disabledDatesRE=a
}this.initDisabledDays();
this.update(this.value,true)
},setDisabledDays:function(a){this.disabledDays=a;
this.update(this.value,true)
},setMinDate:function(a){this.minDate=a;
this.update(this.value,true)
},setMaxDate:function(a){this.maxDate=a;
this.update(this.value,true)
},setValue:function(a){this.value=a.clearTime(true);
this.update(this.value)
},getValue:function(){return this.value
},focus:function(){this.update(this.activeDate)
},onEnable:function(a){Ext.DatePicker.superclass.onEnable.call(this);
this.doDisabled(false);
this.update(a?this.value:this.activeDate);
if(Ext.isIE){this.el.repaint()
}},onDisable:function(){Ext.DatePicker.superclass.onDisable.call(this);
this.doDisabled(true);
if(Ext.isIE&&!Ext.isIE8){Ext.each([].concat(this.textNodes,this.el.query("th span")),function(a){Ext.fly(a).repaint()
})
}},doDisabled:function(a){this.keyNav.setDisabled(a);
this.prevRepeater.setDisabled(a);
this.nextRepeater.setDisabled(a);
if(this.showToday){this.todayKeyListener.setDisabled(a);
this.todayBtn.setDisabled(a)
}},onRender:function(e,b){var a=['<table cellspacing="0">','<tr><td class="x-date-left"><a href="#" title="',this.prevText,'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="',this.nextText,'">&#160;</a></td></tr>','<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>'],c=this.dayNames,g;
for(g=0;
g<7;
g++){var j=this.startDay+g;
if(j>6){j=j-7
}a.push("<th><span>",c[j].substr(0,1),"</span></th>")
}a[a.length]="</tr></thead><tbody><tr>";
for(g=0;
g<42;
g++){if(g%7===0&&g!==0){a[a.length]="</tr><tr>"
}a[a.length]='<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>'
}a.push("</tr></tbody></table></td></tr>",this.showToday?'<tr><td colspan="3" class="x-date-bottom" align="center"></td></tr>':"",'</table><div class="x-date-mp"></div>');
var h=document.createElement("div");
h.className="x-date-picker";
h.innerHTML=a.join("");
e.dom.insertBefore(h,b);
this.el=Ext.get(h);
this.eventEl=Ext.get(h.firstChild);
this.prevRepeater=new Ext.util.ClickRepeater(this.el.child("td.x-date-left a"),{handler:this.showPrevMonth,scope:this,preventDefault:true,stopDefault:true});
this.nextRepeater=new Ext.util.ClickRepeater(this.el.child("td.x-date-right a"),{handler:this.showNextMonth,scope:this,preventDefault:true,stopDefault:true});
this.monthPicker=this.el.down("div.x-date-mp");
this.monthPicker.enableDisplayMode("block");
this.keyNav=new Ext.KeyNav(this.eventEl,{left:function(d){if(d.ctrlKey){this.showPrevMonth()
}else{this.update(this.activeDate.add("d",-1))
}},right:function(d){if(d.ctrlKey){this.showNextMonth()
}else{this.update(this.activeDate.add("d",1))
}},up:function(d){if(d.ctrlKey){this.showNextYear()
}else{this.update(this.activeDate.add("d",-7))
}},down:function(d){if(d.ctrlKey){this.showPrevYear()
}else{this.update(this.activeDate.add("d",7))
}},pageUp:function(d){this.showNextMonth()
},pageDown:function(d){this.showPrevMonth()
},enter:function(d){d.stopPropagation();
return true
},scope:this});
this.el.unselectable();
this.cells=this.el.select("table.x-date-inner tbody td");
this.textNodes=this.el.query("table.x-date-inner tbody span");
this.mbtn=new Ext.Button({text:"&#160;",tooltip:this.monthYearText,renderTo:this.el.child("td.x-date-middle",true)});
this.mbtn.el.child("em").addClass("x-btn-arrow");
if(this.showToday){this.todayKeyListener=this.eventEl.addKeyListener(Ext.EventObject.SPACE,this.selectToday,this);
var f=(new Date()).dateFormat(this.format);
this.todayBtn=new Ext.Button({renderTo:this.el.child("td.x-date-bottom",true),text:String.format(this.todayText,f),tooltip:String.format(this.todayTip,f),handler:this.selectToday,scope:this})
}this.mon(this.eventEl,"mousewheel",this.handleMouseWheel,this);
this.mon(this.eventEl,"click",this.handleDateClick,this,{delegate:"a.x-date-date"});
this.mon(this.mbtn,"click",this.showMonthPicker,this);
this.onEnable(true)
},createMonthPicker:function(){if(!this.monthPicker.dom.firstChild){var a=['<table border="0" cellspacing="0">'];
for(var b=0;
b<6;
b++){a.push('<tr><td class="x-date-mp-month"><a href="#">',Date.getShortMonthName(b),"</a></td>",'<td class="x-date-mp-month x-date-mp-sep"><a href="#">',Date.getShortMonthName(b+6),"</a></td>",b===0?'<td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-prev"></a></td><td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-next"></a></td></tr>':'<td class="x-date-mp-year"><a href="#"></a></td><td class="x-date-mp-year"><a href="#"></a></td></tr>')
}a.push('<tr class="x-date-mp-btns"><td colspan="4"><button type="button" class="x-date-mp-ok">',this.okText,'</button><button type="button" class="x-date-mp-cancel">',this.cancelText,"</button></td></tr>","</table>");
this.monthPicker.update(a.join(""));
this.mon(this.monthPicker,"click",this.onMonthClick,this);
this.mon(this.monthPicker,"dblclick",this.onMonthDblClick,this);
this.mpMonths=this.monthPicker.select("td.x-date-mp-month");
this.mpYears=this.monthPicker.select("td.x-date-mp-year");
this.mpMonths.each(function(c,d,e){e+=1;
if((e%2)===0){c.dom.xmonth=5+Math.round(e*0.5)
}else{c.dom.xmonth=Math.round((e-1)*0.5)
}})
}},showMonthPicker:function(){if(!this.disabled){this.createMonthPicker();
var a=this.el.getSize();
this.monthPicker.setSize(a);
this.monthPicker.child("table").setSize(a);
this.mpSelMonth=(this.activeDate||this.value).getMonth();
this.updateMPMonth(this.mpSelMonth);
this.mpSelYear=(this.activeDate||this.value).getFullYear();
this.updateMPYear(this.mpSelYear);
this.monthPicker.slideIn("t",{duration:0.2})
}},updateMPYear:function(e){this.mpyear=e;
var c=this.mpYears.elements;
for(var b=1;
b<=10;
b++){var d=c[b-1],a;
if((b%2)===0){a=e+Math.round(b*0.5);
d.firstChild.innerHTML=a;
d.xyear=a
}else{a=e-(5-Math.round(b*0.5));
d.firstChild.innerHTML=a;
d.xyear=a
}this.mpYears.item(b-1)[a==this.mpSelYear?"addClass":"removeClass"]("x-date-mp-sel")
}},updateMPMonth:function(a){this.mpMonths.each(function(b,c,d){b[b.dom.xmonth==a?"addClass":"removeClass"]("x-date-mp-sel")
})
},selectMPMonth:function(a){},onMonthClick:function(f,b){f.stopEvent();
var c=new Ext.Element(b),a;
if(c.is("button.x-date-mp-cancel")){this.hideMonthPicker()
}else{if(c.is("button.x-date-mp-ok")){var g=new Date(this.mpSelYear,this.mpSelMonth,(this.activeDate||this.value).getDate());
if(g.getMonth()!=this.mpSelMonth){g=new Date(this.mpSelYear,this.mpSelMonth,1).getLastDateOfMonth()
}this.update(g);
this.hideMonthPicker()
}else{if((a=c.up("td.x-date-mp-month",2))){this.mpMonths.removeClass("x-date-mp-sel");
a.addClass("x-date-mp-sel");
this.mpSelMonth=a.dom.xmonth
}else{if((a=c.up("td.x-date-mp-year",2))){this.mpYears.removeClass("x-date-mp-sel");
a.addClass("x-date-mp-sel");
this.mpSelYear=a.dom.xyear
}else{if(c.is("a.x-date-mp-prev")){this.updateMPYear(this.mpyear-10)
}else{if(c.is("a.x-date-mp-next")){this.updateMPYear(this.mpyear+10)
}}}}}}},onMonthDblClick:function(d,b){d.stopEvent();
var c=new Ext.Element(b),a;
if((a=c.up("td.x-date-mp-month",2))){this.update(new Date(this.mpSelYear,a.dom.xmonth,(this.activeDate||this.value).getDate()));
this.hideMonthPicker()
}else{if((a=c.up("td.x-date-mp-year",2))){this.update(new Date(a.dom.xyear,this.mpSelMonth,(this.activeDate||this.value).getDate()));
this.hideMonthPicker()
}}},hideMonthPicker:function(a){if(this.monthPicker){if(a===true){this.monthPicker.hide()
}else{this.monthPicker.slideOut("t",{duration:0.2})
}}},showPrevMonth:function(a){this.update(this.activeDate.add("mo",-1))
},showNextMonth:function(a){this.update(this.activeDate.add("mo",1))
},showPrevYear:function(){this.update(this.activeDate.add("y",-1))
},showNextYear:function(){this.update(this.activeDate.add("y",1))
},handleMouseWheel:function(a){a.stopEvent();
if(!this.disabled){var b=a.getWheelDelta();
if(b>0){this.showPrevMonth()
}else{if(b<0){this.showNextMonth()
}}}},handleDateClick:function(b,a){b.stopEvent();
if(!this.disabled&&a.dateValue&&!Ext.fly(a.parentNode).hasClass("x-date-disabled")){this.cancelFocus=this.focusOnSelect===false;
this.setValue(new Date(a.dateValue));
delete this.cancelFocus;
this.fireEvent("select",this,this.value)
}},selectToday:function(){if(this.todayBtn&&!this.todayBtn.disabled){this.setValue(new Date().clearTime());
this.fireEvent("select",this,this.value)
}},update:function(F,z){if(this.rendered){var a=this.activeDate,o=this.isVisible();
this.activeDate=F;
if(!z&&a&&this.el){var n=F.getTime();
if(a.getMonth()==F.getMonth()&&a.getFullYear()==F.getFullYear()){this.cells.removeClass("x-date-selected");
this.cells.each(function(d){if(d.dom.firstChild.dateValue==n){d.addClass("x-date-selected");
if(o&&!this.cancelFocus){Ext.fly(d.dom.firstChild).focus(50)
}return false
}},this);
return
}}var j=F.getDaysInMonth(),p=F.getFirstDateOfMonth(),f=p.getDay()-this.startDay;
if(f<0){f+=7
}j+=f;
var A=F.add("mo",-1),g=A.getDaysInMonth()-f,e=this.cells.elements,q=this.textNodes,C=(new Date(A.getFullYear(),A.getMonth(),g,this.initHour)),B=new Date().clearTime().getTime(),u=F.clearTime(true).getTime(),s=this.minDate?this.minDate.clearTime(true):Number.NEGATIVE_INFINITY,x=this.maxDate?this.maxDate.clearTime(true):Number.POSITIVE_INFINITY,E=this.disabledDatesRE,r=this.disabledDatesText,H=this.disabledDays?this.disabledDays.join(""):false,D=this.disabledDaysText,y=this.format;
if(this.showToday){var l=new Date().clearTime(),c=(l<s||l>x||(E&&y&&E.test(l.dateFormat(y)))||(H&&H.indexOf(l.getDay())!=-1));
if(!this.disabled){this.todayBtn.setDisabled(c);
this.todayKeyListener[c?"disable":"enable"]()
}}var k=function(I,d){d.title="";
var i=C.clearTime(true).getTime();
d.firstChild.dateValue=i;
if(i==B){d.className+=" x-date-today";
d.title=I.todayText
}if(i==u){d.className+=" x-date-selected";
if(o){Ext.fly(d.firstChild).focus(50)
}}if(i<s){d.className=" x-date-disabled";
d.title=I.minText;
return
}if(i>x){d.className=" x-date-disabled";
d.title=I.maxText;
return
}if(H){if(H.indexOf(C.getDay())!=-1){d.title=D;
d.className=" x-date-disabled"
}}if(E&&y){var w=C.dateFormat(y);
if(E.test(w)){d.title=r.replace("%0",w);
d.className=" x-date-disabled"
}}};
var v=0;
for(;
v<f;
v++){q[v].innerHTML=(++g);
C.setDate(C.getDate()+1);
e[v].className="x-date-prevday";
k(this,e[v])
}for(;
v<j;
v++){var b=v-f+1;
q[v].innerHTML=(b);
C.setDate(C.getDate()+1);
e[v].className="x-date-active";
k(this,e[v])
}var G=0;
for(;
v<42;
v++){q[v].innerHTML=(++G);
C.setDate(C.getDate()+1);
e[v].className="x-date-nextday";
k(this,e[v])
}this.mbtn.setText(this.monthNames[F.getMonth()]+" "+F.getFullYear());
if(!this.internalRender){var h=this.el.dom.firstChild,m=h.offsetWidth;
this.el.setWidth(m+this.el.getBorderWidth("lr"));
Ext.fly(h).setWidth(m);
this.internalRender=true;
if(Ext.isOpera&&!this.secondPass){h.rows[0].cells[1].style.width=(m-(h.rows[0].cells[0].offsetWidth+h.rows[0].cells[2].offsetWidth))+"px";
this.secondPass=true;
this.update.defer(10,this,[F])
}}}},beforeDestroy:function(){if(this.rendered){Ext.destroy(this.keyNav,this.monthPicker,this.eventEl,this.mbtn,this.nextRepeater,this.prevRepeater,this.cells.el,this.todayBtn);
delete this.textNodes;
delete this.cells.elements
}}});
Ext.reg("datepicker",Ext.DatePicker);
Ext.LoadMask=function(c,b){this.el=Ext.get(c);
Ext.apply(this,b);
if(this.store){this.store.on({scope:this,beforeload:this.onBeforeLoad,load:this.onLoad,exception:this.onLoad});
this.removeMask=Ext.value(this.removeMask,false)
}else{var a=this.el.getUpdater();
a.showLoadIndicator=false;
a.on({scope:this,beforeupdate:this.onBeforeLoad,update:this.onLoad,failure:this.onLoad});
this.removeMask=Ext.value(this.removeMask,true)
}};
Ext.LoadMask.prototype={msg:"Loading...",msgCls:"x-mask-loading",disabled:false,disable:function(){this.disabled=true
},enable:function(){this.disabled=false
},onLoad:function(){this.el.unmask(this.removeMask)
},onBeforeLoad:function(){if(!this.disabled){this.el.mask(this.msg,this.msgCls)
}},show:function(){this.onBeforeLoad()
},hide:function(){this.onLoad()
},destroy:function(){if(this.store){this.store.un("beforeload",this.onBeforeLoad,this);
this.store.un("load",this.onLoad,this);
this.store.un("exception",this.onLoad,this)
}else{var a=this.el.getUpdater();
a.un("beforeupdate",this.onBeforeLoad,this);
a.un("update",this.onLoad,this);
a.un("failure",this.onLoad,this)
}}};
Ext.slider.Thumb=Ext.extend(Object,{dragging:false,constructor:function(a){Ext.apply(this,a||{},{cls:"x-slider-thumb",constrain:false});
Ext.slider.Thumb.superclass.constructor.call(this,a);
if(this.slider.vertical){Ext.apply(this,Ext.slider.Thumb.Vertical)
}},render:function(){this.el=this.slider.innerEl.insertFirst({cls:this.cls});
this.initEvents()
},enable:function(){this.disabled=false;
this.el.removeClass(this.slider.disabledClass)
},disable:function(){this.disabled=true;
this.el.addClass(this.slider.disabledClass)
},initEvents:function(){var a=this.el;
a.addClassOnOver("x-slider-thumb-over");
this.tracker=new Ext.dd.DragTracker({onBeforeStart:this.onBeforeDragStart.createDelegate(this),onStart:this.onDragStart.createDelegate(this),onDrag:this.onDrag.createDelegate(this),onEnd:this.onDragEnd.createDelegate(this),tolerance:3,autoStart:300});
this.tracker.initEl(a)
},onBeforeDragStart:function(a){if(this.disabled){return false
}else{this.slider.promoteThumb(this);
return true
}},onDragStart:function(a){this.el.addClass("x-slider-thumb-drag");
this.dragging=true;
this.dragStartValue=this.value;
this.slider.fireEvent("dragstart",this.slider,a,this)
},onDrag:function(f){var c=this.slider,b=this.index,d=this.getNewValue();
if(this.constrain){var a=c.thumbs[b+1],g=c.thumbs[b-1];
if(g!=undefined&&d<=g.value){d=g.value
}if(a!=undefined&&d>=a.value){d=a.value
}}c.setValue(b,d,false);
c.fireEvent("drag",c,f,this)
},getNewValue:function(){var a=this.slider,b=a.innerEl.translatePoints(this.tracker.getXY());
return Ext.util.Format.round(a.reverseValue(b.left),a.decimalPrecision)
},onDragEnd:function(c){var a=this.slider,b=this.value;
this.el.removeClass("x-slider-thumb-drag");
this.dragging=false;
a.fireEvent("dragend",a,c);
if(this.dragStartValue!=b){a.fireEvent("changecomplete",a,b,this)
}},destroy:function(){Ext.destroyMembers(this,"tracker","el")
}});
Ext.slider.MultiSlider=Ext.extend(Ext.BoxComponent,{vertical:false,minValue:0,maxValue:100,decimalPrecision:0,keyIncrement:1,increment:0,clickRange:[5,15],clickToChange:true,animate:true,constrainThumbs:true,topThumbZIndex:10000,initComponent:function(){if(!Ext.isDefined(this.value)){this.value=this.minValue
}this.thumbs=[];
Ext.slider.MultiSlider.superclass.initComponent.call(this);
this.keyIncrement=Math.max(this.increment,this.keyIncrement);
this.addEvents("beforechange","change","changecomplete","dragstart","drag","dragend");
if(this.values==undefined||Ext.isEmpty(this.values)){this.values=[0]
}var a=this.values;
for(var b=0;
b<a.length;
b++){this.addThumb(a[b])
}if(this.vertical){Ext.apply(this,Ext.slider.Vertical)
}},addThumb:function(b){var a=new Ext.slider.Thumb({value:b,slider:this,index:this.thumbs.length,constrain:this.constrainThumbs});
this.thumbs.push(a);
if(this.rendered){a.render()
}},promoteThumb:function(d){var a=this.thumbs,f,b;
for(var e=0,c=a.length;
e<c;
e++){b=a[e];
if(b==d){f=this.topThumbZIndex
}else{f=""
}b.el.setStyle("zIndex",f)
}},onRender:function(){this.autoEl={cls:"x-slider "+(this.vertical?"x-slider-vert":"x-slider-horz"),cn:{cls:"x-slider-end",cn:{cls:"x-slider-inner",cn:[{tag:"a",cls:"x-slider-focus",href:"#",tabIndex:"-1",hidefocus:"on"}]}}};
Ext.slider.MultiSlider.superclass.onRender.apply(this,arguments);
this.endEl=this.el.first();
this.innerEl=this.endEl.first();
this.focusEl=this.innerEl.child(".x-slider-focus");
for(var b=0;
b<this.thumbs.length;
b++){this.thumbs[b].render()
}var a=this.innerEl.child(".x-slider-thumb");
this.halfThumb=(this.vertical?a.getHeight():a.getWidth())/2;
this.initEvents()
},initEvents:function(){this.mon(this.el,{scope:this,mousedown:this.onMouseDown,keydown:this.onKeyDown});
this.focusEl.swallowEvent("click",true)
},onMouseDown:function(d){if(this.disabled){return
}var c=false;
for(var b=0;
b<this.thumbs.length;
b++){c=c||d.target==this.thumbs[b].el.dom
}if(this.clickToChange&&!c){var a=this.innerEl.translatePoints(d.getXY());
this.onClickChange(a)
}this.focus()
},onClickChange:function(c){if(c.top>this.clickRange[0]&&c.top<this.clickRange[1]){var a=this.getNearest(c,"left"),b=a.index;
this.setValue(b,Ext.util.Format.round(this.reverseValue(c.left),this.decimalPrecision),undefined,true)
}},getNearest:function(j,b){var l=b=="top"?this.innerEl.getHeight()-j[b]:j[b],f=this.reverseValue(l),h=(this.maxValue-this.minValue)+5,e=0,c=null;
for(var d=0;
d<this.thumbs.length;
d++){var a=this.thumbs[d],k=a.value,g=Math.abs(k-f);
if(Math.abs(g<=h)){c=a;
e=d;
h=g
}}return c
},onKeyDown:function(b){if(this.disabled||this.thumbs.length!==1){b.preventDefault();
return
}var a=b.getKey(),c;
switch(a){case b.UP:case b.RIGHT:b.stopEvent();
c=b.ctrlKey?this.maxValue:this.getValue(0)+this.keyIncrement;
this.setValue(0,c,undefined,true);
break;
case b.DOWN:case b.LEFT:b.stopEvent();
c=b.ctrlKey?this.minValue:this.getValue(0)-this.keyIncrement;
this.setValue(0,c,undefined,true);
break;
default:b.preventDefault()
}},doSnap:function(b){if(!(this.increment&&b)){return b
}var d=b,c=this.increment,a=b%c;
if(a!=0){d-=a;
if(a*2>=c){d+=c
}else{if(a*2<-c){d-=c
}}}return d.constrain(this.minValue,this.maxValue)
},afterRender:function(){Ext.slider.MultiSlider.superclass.afterRender.apply(this,arguments);
for(var c=0;
c<this.thumbs.length;
c++){var b=this.thumbs[c];
if(b.value!==undefined){var a=this.normalizeValue(b.value);
if(a!==b.value){this.setValue(c,a,false)
}else{this.moveThumb(c,this.translateValue(a),false)
}}}},getRatio:function(){var a=this.innerEl.getWidth(),b=this.maxValue-this.minValue;
return b==0?a:(a/b)
},normalizeValue:function(a){a=this.doSnap(a);
a=Ext.util.Format.round(a,this.decimalPrecision);
a=a.constrain(this.minValue,this.maxValue);
return a
},setMinValue:function(e){this.minValue=e;
var d=0,b=this.thumbs,a=b.length,c;
for(;
d<a;
++d){c=b[d];
c.value=c.value<e?e:c.value
}this.syncThumb()
},setMaxValue:function(e){this.maxValue=e;
var d=0,b=this.thumbs,a=b.length,c;
for(;
d<a;
++d){c=b[d];
c.value=c.value>e?e:c.value
}this.syncThumb()
},setValue:function(d,c,b,f){var a=this.thumbs[d],e=a.el;
c=this.normalizeValue(c);
if(c!==a.value&&this.fireEvent("beforechange",this,c,a.value,a)!==false){a.value=c;
if(this.rendered){this.moveThumb(d,this.translateValue(c),b!==false);
this.fireEvent("change",this,c,a);
if(f){this.fireEvent("changecomplete",this,c,a)
}}}},translateValue:function(a){var b=this.getRatio();
return(a*b)-(this.minValue*b)-this.halfThumb
},reverseValue:function(b){var a=this.getRatio();
return(b+(this.minValue*a))/a
},moveThumb:function(d,c,b){var a=this.thumbs[d].el;
if(!b||this.animate===false){a.setLeft(c)
}else{a.shift({left:c,stopFx:true,duration:0.35})
}},focus:function(){this.focusEl.focus(10)
},onResize:function(c,e){var b=this.thumbs,a=b.length,d=0;
for(;
d<a;
++d){b[d].el.stopFx()
}if(Ext.isNumber(c)){this.innerEl.setWidth(c-(this.el.getPadding("l")+this.endEl.getPadding("r")))
}this.syncThumb();
Ext.slider.MultiSlider.superclass.onResize.apply(this,arguments)
},onDisable:function(){Ext.slider.MultiSlider.superclass.onDisable.call(this);
for(var b=0;
b<this.thumbs.length;
b++){var a=this.thumbs[b],c=a.el;
a.disable();
if(Ext.isIE){var d=c.getXY();
c.hide();
this.innerEl.addClass(this.disabledClass).dom.disabled=true;
if(!this.thumbHolder){this.thumbHolder=this.endEl.createChild({cls:"x-slider-thumb "+this.disabledClass})
}this.thumbHolder.show().setXY(d)
}}},onEnable:function(){Ext.slider.MultiSlider.superclass.onEnable.call(this);
for(var b=0;
b<this.thumbs.length;
b++){var a=this.thumbs[b],c=a.el;
a.enable();
if(Ext.isIE){this.innerEl.removeClass(this.disabledClass).dom.disabled=false;
if(this.thumbHolder){this.thumbHolder.hide()
}c.show();
this.syncThumb()
}}},syncThumb:function(){if(this.rendered){for(var a=0;
a<this.thumbs.length;
a++){this.moveThumb(a,this.translateValue(this.thumbs[a].value))
}}},getValue:function(a){return this.thumbs[a].value
},getValues:function(){var a=[];
for(var b=0;
b<this.thumbs.length;
b++){a.push(this.thumbs[b].value)
}return a
},beforeDestroy:function(){var b=this.thumbs;
for(var c=0,a=b.length;
c<a;
++c){b[c].destroy();
b[c]=null
}Ext.destroyMembers(this,"endEl","innerEl","focusEl","thumbHolder");
Ext.slider.MultiSlider.superclass.beforeDestroy.call(this)
}});
Ext.reg("multislider",Ext.slider.MultiSlider);
Ext.slider.SingleSlider=Ext.extend(Ext.slider.MultiSlider,{constructor:function(a){a=a||{};
Ext.applyIf(a,{values:[a.value||0]});
Ext.slider.SingleSlider.superclass.constructor.call(this,a)
},getValue:function(){return Ext.slider.SingleSlider.superclass.getValue.call(this,0)
},setValue:function(d,b){var c=Ext.toArray(arguments),a=c.length;
if(a==1||(a<=3&&typeof arguments[1]!="number")){c.unshift(0)
}return Ext.slider.SingleSlider.superclass.setValue.apply(this,c)
},syncThumb:function(){return Ext.slider.SingleSlider.superclass.syncThumb.apply(this,[0].concat(arguments))
},getNearest:function(){return this.thumbs[0]
}});
Ext.Slider=Ext.slider.SingleSlider;
Ext.reg("slider",Ext.slider.SingleSlider);
Ext.slider.Vertical={onResize:function(a,b){this.innerEl.setHeight(b-(this.el.getPadding("t")+this.endEl.getPadding("b")));
this.syncThumb()
},getRatio:function(){var b=this.innerEl.getHeight(),a=this.maxValue-this.minValue;
return b/a
},moveThumb:function(d,c,b){var a=this.thumbs[d],e=a.el;
if(!b||this.animate===false){e.setBottom(c)
}else{e.shift({bottom:c,stopFx:true,duration:0.35})
}},onClickChange:function(c){if(c.left>this.clickRange[0]&&c.left<this.clickRange[1]){var a=this.getNearest(c,"top"),b=a.index,d=this.minValue+this.reverseValue(this.innerEl.getHeight()-c.top);
this.setValue(b,Ext.util.Format.round(d,this.decimalPrecision),undefined,true)
}}};
Ext.slider.Thumb.Vertical={getNewValue:function(){var b=this.slider,c=b.innerEl,d=c.translatePoints(this.tracker.getXY()),a=c.getHeight()-d.top;
return b.minValue+Ext.util.Format.round(a/b.getRatio(),b.decimalPrecision)
}};
Ext.ProgressBar=Ext.extend(Ext.BoxComponent,{baseCls:"x-progress",animate:false,waitTimer:null,initComponent:function(){Ext.ProgressBar.superclass.initComponent.call(this);
this.addEvents("update")
},onRender:function(d,a){var c=new Ext.Template('<div class="{cls}-wrap">','<div class="{cls}-inner">','<div class="{cls}-bar">','<div class="{cls}-text">',"<div>&#160;</div>","</div>","</div>",'<div class="{cls}-text {cls}-text-back">',"<div>&#160;</div>","</div>","</div>","</div>");
this.el=a?c.insertBefore(a,{cls:this.baseCls},true):c.append(d,{cls:this.baseCls},true);
if(this.id){this.el.dom.id=this.id
}var b=this.el.dom.firstChild;
this.progressBar=Ext.get(b.firstChild);
if(this.textEl){this.textEl=Ext.get(this.textEl);
delete this.textTopEl
}else{this.textTopEl=Ext.get(this.progressBar.dom.firstChild);
var e=Ext.get(b.childNodes[1]);
this.textTopEl.setStyle("z-index",99).addClass("x-hidden");
this.textEl=new Ext.CompositeElement([this.textTopEl.dom.firstChild,e.dom.firstChild]);
this.textEl.setWidth(b.offsetWidth)
}this.progressBar.setHeight(b.offsetHeight)
},afterRender:function(){Ext.ProgressBar.superclass.afterRender.call(this);
if(this.value){this.updateProgress(this.value,this.text)
}else{this.updateText(this.text)
}},updateProgress:function(c,d,b){this.value=c||0;
if(d){this.updateText(d)
}if(this.rendered&&!this.isDestroyed){var a=Math.floor(c*this.el.dom.firstChild.offsetWidth);
this.progressBar.setWidth(a,b===true||(b!==false&&this.animate));
if(this.textTopEl){this.textTopEl.removeClass("x-hidden").setWidth(a)
}}this.fireEvent("update",this,c,d);
return this
},wait:function(b){if(!this.waitTimer){var a=this;
b=b||{};
this.updateText(b.text);
this.waitTimer=Ext.TaskMgr.start({run:function(c){var d=b.increment||10;
c-=1;
this.updateProgress(((((c+d)%d)+1)*(100/d))*0.01,null,b.animate)
},interval:b.interval||1000,duration:b.duration,onStop:function(){if(b.fn){b.fn.apply(b.scope||this)
}this.reset()
},scope:a})
}return this
},isWaiting:function(){return this.waitTimer!==null
},updateText:function(a){this.text=a||"&#160;";
if(this.rendered){this.textEl.update(this.text)
}return this
},syncProgressBar:function(){if(this.value){this.updateProgress(this.value,this.text)
}return this
},setSize:function(a,c){Ext.ProgressBar.superclass.setSize.call(this,a,c);
if(this.textTopEl){var b=this.el.dom.firstChild;
this.textEl.setSize(b.offsetWidth,b.offsetHeight)
}this.syncProgressBar();
return this
},reset:function(a){this.updateProgress(0);
if(this.textTopEl){this.textTopEl.addClass("x-hidden")
}this.clearTimer();
if(a===true){this.hide()
}return this
},clearTimer:function(){if(this.waitTimer){this.waitTimer.onStop=null;
Ext.TaskMgr.stop(this.waitTimer);
this.waitTimer=null
}},onDestroy:function(){this.clearTimer();
if(this.rendered){if(this.textEl.isComposite){this.textEl.clear()
}Ext.destroyMembers(this,"textEl","progressBar","textTopEl")
}Ext.ProgressBar.superclass.onDestroy.call(this)
}});
Ext.reg("progress",Ext.ProgressBar);
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.data.Api=(function(){var a={};
return{actions:{create:"create",read:"read",update:"update",destroy:"destroy"},restActions:{create:"POST",read:"GET",update:"PUT",destroy:"DELETE"},isAction:function(b){return(Ext.data.Api.actions[b])?true:false
},getVerb:function(b){if(a[b]){return a[b]
}for(var c in this.actions){if(this.actions[c]===b){a[b]=c;
break
}}return(a[b]!==undefined)?a[b]:null
},isValid:function(b){var e=[];
var d=this.actions;
for(var c in b){if(!(c in d)){e.push(c)
}}return(!e.length)?true:e
},hasUniqueUrl:function(c,f){var b=(c.api[f])?c.api[f].url:null;
var e=true;
for(var d in c.api){if((e=(d===f)?true:(c.api[d].url!=b)?true:false)===false){break
}}return e
},prepare:function(b){if(!b.api){b.api={}
}for(var d in this.actions){var c=this.actions[d];
b.api[c]=b.api[c]||b.url||b.directFn;
if(typeof(b.api[c])=="string"){b.api[c]={url:b.api[c],method:(b.restful===true)?Ext.data.Api.restActions[c]:undefined}
}}},restify:function(b){b.restful=true;
for(var c in this.restActions){b.api[this.actions[c]].method||(b.api[this.actions[c]].method=this.restActions[c])
}b.onWrite=b.onWrite.createInterceptor(function(h,i,f,e){var d=i.reader;
var g=new Ext.data.Response({action:h,raw:f});
switch(f.status){case 200:return true;
break;
case 201:if(Ext.isEmpty(g.raw.responseText)){g.success=true
}else{return true
}break;
case 204:g.success=true;
g.data=null;
break;
default:return true;
break
}if(g.success===true){this.fireEvent("write",this,h,g.data,g,e,i.request.arg)
}else{this.fireEvent("exception",this,"remote",h,i,g,e)
}i.request.callback.call(i.request.scope,g.data,g,g.success);
return false
},b)
}}
})();
Ext.data.Response=function(b,a){Ext.apply(this,b,{raw:a})
};
Ext.data.Response.prototype={message:null,success:false,status:null,root:null,raw:null,getMessage:function(){return this.message
},getSuccess:function(){return this.success
},getStatus:function(){return this.status
},getRoot:function(){return this.root
},getRawResponse:function(){return this.raw
}};
Ext.data.Api.Error=Ext.extend(Ext.Error,{constructor:function(b,a){this.arg=a;
Ext.Error.call(this,b)
},name:"Ext.data.Api"});
Ext.apply(Ext.data.Api.Error.prototype,{lang:{"action-url-undefined":"No fallback url defined for this action.  When defining a DataProxy api, please be sure to define an url for each CRUD action in Ext.data.Api.actions or define a default url in addition to your api-configuration.",invalid:"received an invalid API-configuration.  Please ensure your proxy API-configuration contains only the actions defined in Ext.data.Api.actions","invalid-url":"Invalid url.  Please review your proxy configuration.",execute:'Attempted to execute an unknown action.  Valid API actions are defined in Ext.data.Api.actions"'}});
Ext.data.SortTypes={none:function(a){return a
},stripTagsRE:/<\/?[^>]+>/gi,asText:function(a){return String(a).replace(this.stripTagsRE,"")
},asUCText:function(a){return String(a).toUpperCase().replace(this.stripTagsRE,"")
},asUCString:function(a){return String(a).toUpperCase()
},asDate:function(a){if(!a){return 0
}if(Ext.isDate(a)){return a.getTime()
}return Date.parse(String(a))
},asFloat:function(a){var b=parseFloat(String(a).replace(/,/g,""));
return isNaN(b)?0:b
},asInt:function(a){var b=parseInt(String(a).replace(/,/g,""),10);
return isNaN(b)?0:b
}};
Ext.data.Record=function(a,b){this.id=(b||b===0)?b:Ext.data.Record.id(this);
this.data=a||{}
};
Ext.data.Record.create=function(e){var c=Ext.extend(Ext.data.Record,{});
var d=c.prototype;
d.fields=new Ext.util.MixedCollection(false,function(f){return f.name
});
for(var b=0,a=e.length;
b<a;
b++){d.fields.add(new Ext.data.Field(e[b]))
}c.getField=function(f){return d.fields.get(f)
};
return c
};
Ext.data.Record.PREFIX="ext-record";
Ext.data.Record.AUTO_ID=1;
Ext.data.Record.EDIT="edit";
Ext.data.Record.REJECT="reject";
Ext.data.Record.COMMIT="commit";
Ext.data.Record.id=function(a){a.phantom=true;
return[Ext.data.Record.PREFIX,"-",Ext.data.Record.AUTO_ID++].join("")
};
Ext.data.Record.prototype={dirty:false,editing:false,error:null,modified:null,phantom:false,join:function(a){this.store=a
},set:function(a,c){var b=Ext.isPrimitive(c)?String:Ext.encode;
if(b(this.data[a])==b(c)){return
}this.dirty=true;
if(!this.modified){this.modified={}
}if(this.modified[a]===undefined){this.modified[a]=this.data[a]
}this.data[a]=c;
if(!this.editing){this.afterEdit()
}},afterEdit:function(){if(this.store!=undefined&&typeof this.store.afterEdit=="function"){this.store.afterEdit(this)
}},afterReject:function(){if(this.store){this.store.afterReject(this)
}},afterCommit:function(){if(this.store){this.store.afterCommit(this)
}},get:function(a){return this.data[a]
},beginEdit:function(){this.editing=true;
this.modified=this.modified||{}
},cancelEdit:function(){this.editing=false;
delete this.modified
},endEdit:function(){this.editing=false;
if(this.dirty){this.afterEdit()
}},reject:function(b){var a=this.modified;
for(var c in a){if(typeof a[c]!="function"){this.data[c]=a[c]
}}this.dirty=false;
delete this.modified;
this.editing=false;
if(b!==true){this.afterReject()
}},commit:function(a){this.dirty=false;
delete this.modified;
this.editing=false;
if(a!==true){this.afterCommit()
}},getChanges:function(){var a=this.modified,b={};
for(var c in a){if(a.hasOwnProperty(c)){b[c]=this.data[c]
}}return b
},hasError:function(){return this.error!==null
},clearError:function(){this.error=null
},copy:function(a){return new this.constructor(Ext.apply({},this.data),a||this.id)
},isModified:function(a){return !!(this.modified&&this.modified.hasOwnProperty(a))
},isValid:function(){return this.fields.find(function(a){return(a.allowBlank===false&&Ext.isEmpty(this.data[a.name]))?true:false
},this)?false:true
},markDirty:function(){this.dirty=true;
if(!this.modified){this.modified={}
}this.fields.each(function(a){this.modified[a.name]=this.data[a.name]
},this)
}};
Ext.StoreMgr=Ext.apply(new Ext.util.MixedCollection(),{register:function(){for(var a=0,b;
(b=arguments[a]);
a++){this.add(b)
}},unregister:function(){for(var a=0,b;
(b=arguments[a]);
a++){this.remove(this.lookup(b))
}},lookup:function(e){if(Ext.isArray(e)){var b=["field1"],d=!Ext.isArray(e[0]);
if(!d){for(var c=2,a=e[0].length;
c<=a;
++c){b.push("field"+c)
}}return new Ext.data.ArrayStore({fields:b,data:e,expandData:d,autoDestroy:true,autoCreated:true})
}return Ext.isObject(e)?(e.events?e:Ext.create(e,"store")):this.get(e)
},getKey:function(a){return a.storeId
}});
Ext.data.Store=Ext.extend(Ext.util.Observable,{writer:undefined,remoteSort:false,autoDestroy:false,pruneModifiedRecords:false,lastOptions:null,autoSave:true,batch:true,restful:false,paramNames:undefined,defaultParamNames:{start:"start",limit:"limit",sort:"sort",dir:"dir"},isDestroyed:false,hasMultiSort:false,batchKey:"_ext_batch_",constructor:function(a){this.data=new Ext.util.MixedCollection(false);
this.data.getKey=function(b){return b.id
};
this.removed=[];
if(a&&a.data){this.inlineData=a.data;
delete a.data
}Ext.apply(this,a);
this.baseParams=Ext.isObject(this.baseParams)?this.baseParams:{};
this.paramNames=Ext.applyIf(this.paramNames||{},this.defaultParamNames);
if((this.url||this.api)&&!this.proxy){this.proxy=new Ext.data.HttpProxy({url:this.url,api:this.api})
}if(this.restful===true&&this.proxy){this.batch=false;
Ext.data.Api.restify(this.proxy)
}if(this.reader){if(!this.recordType){this.recordType=this.reader.recordType
}if(this.reader.onMetaChange){this.reader.onMetaChange=this.reader.onMetaChange.createSequence(this.onMetaChange,this)
}if(this.writer){if(this.writer instanceof (Ext.data.DataWriter)===false){this.writer=this.buildWriter(this.writer)
}this.writer.meta=this.reader.meta;
this.pruneModifiedRecords=true
}}if(this.recordType){this.fields=this.recordType.prototype.fields
}this.modified=[];
this.addEvents("datachanged","metachange","add","remove","update","clear","exception","beforeload","load","loadexception","beforewrite","write","beforesave","save");
if(this.proxy){this.relayEvents(this.proxy,["loadexception","exception"])
}if(this.writer){this.on({scope:this,add:this.createRecords,remove:this.destroyRecord,update:this.updateRecord,clear:this.onClear})
}this.sortToggle={};
if(this.sortField){this.setDefaultSort(this.sortField,this.sortDir)
}else{if(this.sortInfo){this.setDefaultSort(this.sortInfo.field,this.sortInfo.direction)
}}Ext.data.Store.superclass.constructor.call(this);
if(this.id){this.storeId=this.id;
delete this.id
}if(this.storeId){Ext.StoreMgr.register(this)
}if(this.inlineData){this.loadData(this.inlineData);
delete this.inlineData
}else{if(this.autoLoad){this.load.defer(10,this,[typeof this.autoLoad=="object"?this.autoLoad:undefined])
}}this.batchCounter=0;
this.batches={}
},buildWriter:function(b){var a=undefined,c=(b.format||"json").toLowerCase();
switch(c){case"json":a=Ext.data.JsonWriter;
break;
case"xml":a=Ext.data.XmlWriter;
break;
default:a=Ext.data.JsonWriter
}return new a(b)
},destroy:function(){if(!this.isDestroyed){if(this.storeId){Ext.StoreMgr.unregister(this)
}this.clearData();
this.data=null;
Ext.destroy(this.proxy);
this.reader=this.writer=null;
this.purgeListeners();
this.isDestroyed=true
}},add:function(c){var e,a,b,d;
c=[].concat(c);
if(c.length<1){return
}for(e=0,a=c.length;
e<a;
e++){b=c[e];
b.join(this);
if(b.dirty||b.phantom){this.modified.push(b)
}}d=this.data.length;
this.data.addAll(c);
if(this.snapshot){this.snapshot.addAll(c)
}this.fireEvent("add",this,c,d)
},addSorted:function(a){var b=this.findInsertIndex(a);
this.insert(b,a)
},doUpdate:function(a){var b=a.id;
this.getById(b).join(null);
this.data.replace(b,a);
if(this.snapshot){this.snapshot.replace(b,a)
}a.join(this);
this.fireEvent("update",this,a,Ext.data.Record.COMMIT)
},remove:function(a){if(Ext.isArray(a)){Ext.each(a,function(c){this.remove(c)
},this);
return
}var b=this.data.indexOf(a);
if(b>-1){a.join(null);
this.data.removeAt(b)
}if(this.pruneModifiedRecords){this.modified.remove(a)
}if(this.snapshot){this.snapshot.remove(a)
}if(b>-1){this.fireEvent("remove",this,a,b)
}},removeAt:function(a){this.remove(this.getAt(a))
},removeAll:function(b){var a=[];
this.each(function(c){a.push(c)
});
this.clearData();
if(this.snapshot){this.snapshot.clear()
}if(this.pruneModifiedRecords){this.modified=[]
}if(b!==true){this.fireEvent("clear",this,a)
}},onClear:function(b,a){Ext.each(a,function(d,c){this.destroyRecord(this,d,c)
},this)
},insert:function(d,c){var e,a,b;
c=[].concat(c);
for(e=0,a=c.length;
e<a;
e++){b=c[e];
this.data.insert(d+e,b);
b.join(this);
if(b.dirty||b.phantom){this.modified.push(b)
}}if(this.snapshot){this.snapshot.addAll(c)
}this.fireEvent("add",this,c,d)
},indexOf:function(a){return this.data.indexOf(a)
},indexOfId:function(a){return this.data.indexOfKey(a)
},getById:function(a){return(this.snapshot||this.data).key(a)
},getAt:function(a){return this.data.itemAt(a)
},getRange:function(b,a){return this.data.getRange(b,a)
},storeOptions:function(a){a=Ext.apply({},a);
delete a.callback;
delete a.scope;
this.lastOptions=a
},clearData:function(){this.data.each(function(a){a.join(null)
});
this.data.clear()
},load:function(b){b=Ext.apply({},b);
this.storeOptions(b);
if(this.sortInfo&&this.remoteSort){var a=this.paramNames;
b.params=Ext.apply({},b.params);
b.params[a.sort]=this.sortInfo.field;
b.params[a.dir]=this.sortInfo.direction
}try{return this.execute("read",null,b)
}catch(c){this.handleException(c);
return false
}},updateRecord:function(b,a,c){if(c==Ext.data.Record.EDIT&&this.autoSave===true&&(!a.phantom||(a.phantom&&a.isValid()))){this.save()
}},createRecords:function(c,b,e){var d=this.modified,g=b.length,a,f;
for(f=0;
f<g;
f++){a=b[f];
if(a.phantom&&a.isValid()){a.markDirty();
if(d.indexOf(a)==-1){d.push(a)
}}}if(this.autoSave===true){this.save()
}},destroyRecord:function(b,a,c){if(this.modified.indexOf(a)!=-1){this.modified.remove(a)
}if(!a.phantom){this.removed.push(a);
a.lastIndex=c;
if(this.autoSave===true){this.save()
}}},execute:function(e,a,c,b){if(!Ext.data.Api.isAction(e)){throw new Ext.data.Api.Error("execute",e)
}c=Ext.applyIf(c||{},{params:{}});
if(b!==undefined){this.addToBatch(b)
}var d=true;
if(e==="read"){d=this.fireEvent("beforeload",this,c);
Ext.applyIf(c.params,this.baseParams)
}else{if(this.writer.listful===true&&this.restful!==true){a=(Ext.isArray(a))?a:[a]
}else{if(Ext.isArray(a)&&a.length==1){a=a.shift()
}}if((d=this.fireEvent("beforewrite",this,e,a,c))!==false){this.writer.apply(c.params,this.baseParams,e,a)
}}if(d!==false){if(this.writer&&this.proxy.url&&!this.proxy.restful&&!Ext.data.Api.hasUniqueUrl(this.proxy,e)){c.params.xaction=e
}this.proxy.request(Ext.data.Api.actions[e],a,c.params,this.reader,this.createCallback(e,a,b),this,c)
}return d
},save:function(){if(!this.writer){throw new Ext.data.Store.Error("writer-undefined")
}var g=[],h,j,e,c={},d;
if(this.removed.length){g.push(["destroy",this.removed])
}var b=[].concat(this.getModifiedRecords());
if(b.length){var f=[];
for(d=b.length-1;
d>=0;
d--){if(b[d].phantom===true){var a=b.splice(d,1).shift();
if(a.isValid()){f.push(a)
}}else{if(!b[d].isValid()){b.splice(d,1)
}}}if(f.length){g.push(["create",f])
}if(b.length){g.push(["update",b])
}}h=g.length;
if(h){e=++this.batchCounter;
for(d=0;
d<h;
++d){j=g[d];
c[j[0]]=j[1]
}if(this.fireEvent("beforesave",this,c)!==false){for(d=0;
d<h;
++d){j=g[d];
this.doTransaction(j[0],j[1],e)
}return e
}}return -1
},doTransaction:function(e,b,c){function f(g){try{this.execute(e,g,undefined,c)
}catch(h){this.handleException(h)
}}if(this.batch===false){for(var d=0,a=b.length;
d<a;
d++){f.call(this,b[d])
}}else{f.call(this,b)
}},addToBatch:function(c){var a=this.batches,d=this.batchKey+c,e=a[d];
if(!e){a[d]=e={id:c,count:0,data:{}}
}++e.count
},removeFromBatch:function(d,g,f){var c=this.batches,e=this.batchKey+d,h=c[e],a;
if(h){a=h.data[g]||[];
h.data[g]=a.concat(f);
if(h.count===1){f=h.data;
delete c[e];
this.fireEvent("save",this,d,f)
}else{--h.count
}}},createCallback:function(c,a,b){var d=Ext.data.Api.actions;
return(c=="read")?this.loadRecords:function(f,e,g){this["on"+Ext.util.Format.capitalize(c)+"Records"](g,a,[].concat(f));
if(g===true){this.fireEvent("write",this,c,f,e,a)
}this.removeFromBatch(b,c,f)
}
},clearModified:function(a){if(Ext.isArray(a)){for(var b=a.length-1;
b>=0;
b--){this.modified.splice(this.modified.indexOf(a[b]),1)
}}else{this.modified.splice(this.modified.indexOf(a),1)
}},reMap:function(b){if(Ext.isArray(b)){for(var d=0,a=b.length;
d<a;
d++){this.reMap(b[d])
}}else{delete this.data.map[b._phid];
this.data.map[b.id]=b;
var c=this.data.keys.indexOf(b._phid);
this.data.keys.splice(c,1,b.id);
delete b._phid
}},onCreateRecords:function(d,a,b){if(d===true){try{this.reader.realize(a,b)
}catch(c){this.handleException(c);
if(Ext.isArray(a)){this.onCreateRecords(d,a,b)
}}}},onUpdateRecords:function(d,a,b){if(d===true){try{this.reader.update(a,b)
}catch(c){this.handleException(c);
if(Ext.isArray(a)){this.onUpdateRecords(d,a,b)
}}}},onDestroyRecords:function(e,b,d){b=(b instanceof Ext.data.Record)?[b]:[].concat(b);
for(var c=0,a=b.length;
c<a;
c++){this.removed.splice(this.removed.indexOf(b[c]),1)
}if(e===false){for(c=b.length-1;
c>=0;
c--){this.insert(b[c].lastIndex,b[c])
}}},handleException:function(a){Ext.handleError(a)
},reload:function(a){this.load(Ext.applyIf(a||{},this.lastOptions))
},loadRecords:function(b,k,g){var e,f;
if(this.isDestroyed===true){return
}if(!b||g===false){if(g!==false){this.fireEvent("load",this,[],k)
}if(k.callback){k.callback.call(k.scope||this,[],k,false,b)
}return
}var a=b.records,h=b.totalRecords||a.length;
if(!k||k.add!==true){if(this.pruneModifiedRecords){this.modified=[]
}for(e=0,f=a.length;
e<f;
e++){a[e].join(this)
}if(this.snapshot){this.data=this.snapshot;
delete this.snapshot
}this.clearData();
this.data.addAll(a);
this.totalLength=h;
this.applySort();
this.fireEvent("datachanged",this)
}else{var j=[],d,c=0;
for(e=0,f=a.length;
e<f;
++e){d=a[e];
if(this.indexOfId(d.id)>-1){this.doUpdate(d)
}else{j.push(d);
++c
}}this.totalLength=Math.max(h,this.data.length+c);
this.add(j)
}this.fireEvent("load",this,a,k);
if(k.callback){k.callback.call(k.scope||this,a,k,true)
}},loadData:function(c,a){var b=this.reader.readRecords(c);
this.loadRecords(b,{add:a},true)
},getCount:function(){return this.data.length||0
},getTotalCount:function(){return this.totalLength||0
},getSortState:function(){return this.sortInfo
},applySort:function(){if((this.sortInfo||this.multiSortInfo)&&!this.remoteSort){this.sortData()
}},sortData:function(){var a=this.hasMultiSort?this.multiSortInfo:this.sortInfo,h=a.direction||"ASC",g=a.sorters,c=[];
if(!this.hasMultiSort){g=[{direction:h,field:a.field}]
}for(var d=0,b=g.length;
d<b;
d++){c.push(this.createSortFunction(g[d].field,g[d].direction))
}if(c.length==0){return
}var f=h.toUpperCase()=="DESC"?-1:1;
var e=function(m,l){var k=c[0].call(this,m,l);
if(c.length>1){for(var o=1,n=c.length;
o<n;
o++){k=k||c[o].call(this,m,l)
}}return f*k
};
this.data.sort(h,e);
if(this.snapshot&&this.snapshot!=this.data){this.snapshot.sort(h,e)
}},createSortFunction:function(c,b){b=b||"ASC";
var a=b.toUpperCase()=="DESC"?-1:1;
var d=this.fields.get(c).sortType;
return function(f,e){var h=d(f.data[c]),g=d(e.data[c]);
return a*(h>g?1:(h<g?-1:0))
}
},setDefaultSort:function(b,a){a=a?a.toUpperCase():"ASC";
this.sortInfo={field:b,direction:a};
this.sortToggle[b]=a
},sort:function(b,a){if(Ext.isArray(arguments[0])){return this.multiSort.call(this,b,a)
}else{return this.singleSort(b,a)
}},singleSort:function(f,c){var e=this.fields.get(f);
if(!e){return false
}var b=e.name,a=this.sortInfo||null,d=this.sortToggle?this.sortToggle[b]:null;
if(!c){if(a&&a.field==b){c=(this.sortToggle[b]||"ASC").toggle("ASC","DESC")
}else{c=e.sortDir
}}this.sortToggle[b]=c;
this.sortInfo={field:b,direction:c};
this.hasMultiSort=false;
if(this.remoteSort){if(!this.load(this.lastOptions)){if(d){this.sortToggle[b]=d
}if(a){this.sortInfo=a
}}}else{this.applySort();
this.fireEvent("datachanged",this)
}return true
},multiSort:function(b,a){this.hasMultiSort=true;
a=a||"ASC";
if(this.multiSortInfo&&a==this.multiSortInfo.direction){a=a.toggle("ASC","DESC")
}this.multiSortInfo={sorters:b,direction:a};
if(this.remoteSort){this.singleSort(b[0].field,b[0].direction)
}else{this.applySort();
this.fireEvent("datachanged",this)
}},each:function(b,a){this.data.each(b,a)
},getModifiedRecords:function(){return this.modified
},sum:function(e,f,a){var c=this.data.items,b=0;
f=f||0;
a=(a||a===0)?a:c.length-1;
for(var d=f;
d<=a;
d++){b+=(c[d].data[e]||0)
}return b
},createFilterFn:function(d,c,e,a,b){if(Ext.isEmpty(c,false)){return false
}c=this.data.createValueMatcher(c,e,a,b);
return function(f){return c.test(f.data[d])
}
},createMultipleFilterFn:function(a){return function(b){var h=true;
for(var d=0,c=a.length;
d<c;
d++){var g=a[d],f=g.fn,e=g.scope;
h=h&&f.call(e,b)
}return h
}
},filter:function(m,l,g,h,e){var k;
if(Ext.isObject(m)){m=[m]
}if(Ext.isArray(m)){var b=[];
for(var f=0,d=m.length;
f<d;
f++){var a=m[f],c=a.fn,n=a.scope||this;
if(!Ext.isFunction(c)){c=this.createFilterFn(a.property,a.value,a.anyMatch,a.caseSensitive,a.exactMatch)
}b.push({fn:c,scope:n})
}k=this.createMultipleFilterFn(b)
}else{k=this.createFilterFn(m,l,g,h,e)
}return k?this.filterBy(k):this.clearFilter()
},filterBy:function(b,a){this.snapshot=this.snapshot||this.data;
this.data=this.queryBy(b,a||this);
this.fireEvent("datachanged",this)
},clearFilter:function(a){if(this.isFiltered()){this.data=this.snapshot;
delete this.snapshot;
if(a!==true){this.fireEvent("datachanged",this)
}}},isFiltered:function(){return !!this.snapshot&&this.snapshot!=this.data
},query:function(d,c,e,a){var b=this.createFilterFn(d,c,e,a);
return b?this.queryBy(b):this.data.clone()
},queryBy:function(b,a){var c=this.snapshot||this.data;
return c.filterBy(b,a||this)
},find:function(d,c,f,e,a){var b=this.createFilterFn(d,c,e,a);
return b?this.data.findIndexBy(b,null,f):-1
},findExact:function(b,a,c){return this.data.findIndexBy(function(d){return d.get(b)===a
},this,c)
},findBy:function(b,a,c){return this.data.findIndexBy(b,a,c)
},collect:function(h,j,b){var g=(b===true&&this.snapshot)?this.snapshot.items:this.data.items;
var k,m,a=[],c={};
for(var e=0,f=g.length;
e<f;
e++){k=g[e].data[h];
m=String(k);
if((j||!Ext.isEmpty(k))&&!c[m]){c[m]=true;
a[a.length]=k
}}return a
},afterEdit:function(a){if(this.modified.indexOf(a)==-1){this.modified.push(a)
}this.fireEvent("update",this,a,Ext.data.Record.EDIT)
},afterReject:function(a){this.modified.remove(a);
this.fireEvent("update",this,a,Ext.data.Record.REJECT)
},afterCommit:function(a){this.modified.remove(a);
this.fireEvent("update",this,a,Ext.data.Record.COMMIT)
},commitChanges:function(){var a=this.modified.slice(0),c=a.length,b;
for(b=0;
b<c;
b++){a[b].commit()
}this.modified=[];
this.removed=[]
},rejectChanges:function(){var a=this.modified.slice(0),e=this.removed.slice(0).reverse(),c=a.length,d=e.length,b;
for(b=0;
b<c;
b++){a[b].reject()
}for(b=0;
b<d;
b++){this.insert(e[b].lastIndex||0,e[b]);
e[b].reject()
}this.modified=[];
this.removed=[]
},onMetaChange:function(a){this.recordType=this.reader.recordType;
this.fields=this.recordType.prototype.fields;
delete this.snapshot;
if(this.reader.meta.sortInfo){this.sortInfo=this.reader.meta.sortInfo
}else{if(this.sortInfo&&!this.fields.get(this.sortInfo.field)){delete this.sortInfo
}}if(this.writer){this.writer.meta=this.reader.meta
}this.modified=[];
this.fireEvent("metachange",this,this.reader.meta)
},findInsertIndex:function(a){this.suspendEvents();
var c=this.data.clone();
this.data.add(a);
this.applySort();
var b=this.data.indexOf(a);
this.data=c;
this.resumeEvents();
return b
},setBaseParam:function(a,b){this.baseParams=this.baseParams||{};
this.baseParams[a]=b
}});
Ext.reg("store",Ext.data.Store);
Ext.data.Store.Error=Ext.extend(Ext.Error,{name:"Ext.data.Store"});
Ext.apply(Ext.data.Store.Error.prototype,{lang:{"writer-undefined":"Attempted to execute a write-action without a DataWriter installed."}});
Ext.data.Field=Ext.extend(Object,{constructor:function(b){if(Ext.isString(b)){b={name:b}
}Ext.apply(this,b);
var d=Ext.data.Types,a=this.sortType,c;
if(this.type){if(Ext.isString(this.type)){this.type=Ext.data.Types[this.type.toUpperCase()]||d.AUTO
}}else{this.type=d.AUTO
}if(Ext.isString(a)){this.sortType=Ext.data.SortTypes[a]
}else{if(Ext.isEmpty(a)){this.sortType=this.type.sortType
}}if(!this.convert){this.convert=this.type.convert
}},dateFormat:null,useNull:false,defaultValue:"",mapping:null,sortType:null,sortDir:"ASC",allowBlank:true});
Ext.data.DataReader=function(a,b){this.meta=a;
this.recordType=Ext.isArray(b)?Ext.data.Record.create(b):b;
if(this.recordType){this.buildExtractors()
}};
Ext.data.DataReader.prototype={getTotal:Ext.emptyFn,getRoot:Ext.emptyFn,getMessage:Ext.emptyFn,getSuccess:Ext.emptyFn,getId:Ext.emptyFn,buildExtractors:Ext.emptyFn,extractValues:Ext.emptyFn,realize:function(a,c){if(Ext.isArray(a)){for(var b=a.length-1;
b>=0;
b--){if(Ext.isArray(c)){this.realize(a.splice(b,1).shift(),c.splice(b,1).shift())
}else{this.realize(a.splice(b,1).shift(),c)
}}}else{if(Ext.isArray(c)&&c.length==1){c=c.shift()
}if(!this.isData(c)){throw new Ext.data.DataReader.Error("realize",a)
}a.phantom=false;
a._phid=a.id;
a.id=this.getId(c);
a.data=c;
a.commit();
a.store.reMap(a)
}},update:function(a,c){if(Ext.isArray(a)){for(var b=a.length-1;
b>=0;
b--){if(Ext.isArray(c)){this.update(a.splice(b,1).shift(),c.splice(b,1).shift())
}else{this.update(a.splice(b,1).shift(),c)
}}}else{if(Ext.isArray(c)&&c.length==1){c=c.shift()
}if(this.isData(c)){a.data=Ext.apply(a.data,c)
}a.commit()
}},extractData:function(k,a){var j=(this instanceof Ext.data.JsonReader)?"json":"node";
var c=[];
if(this.isData(k)&&!(this instanceof Ext.data.XmlReader)){k=[k]
}var h=this.recordType.prototype.fields,o=h.items,m=h.length,c=[];
if(a===true){var l=this.recordType;
for(var e=0;
e<k.length;
e++){var b=k[e];
var g=new l(this.extractValues(b,o,m),this.getId(b));
g[j]=b;
c.push(g)
}}else{for(var e=0;
e<k.length;
e++){var d=this.extractValues(k[e],o,m);
d[this.meta.idProperty]=this.getId(k[e]);
c.push(d)
}}return c
},isData:function(a){return(a&&Ext.isObject(a)&&!Ext.isEmpty(this.getId(a)))?true:false
},onMetaChange:function(a){delete this.ef;
this.meta=a;
this.recordType=Ext.data.Record.create(a.fields);
this.buildExtractors()
}};
Ext.data.DataReader.Error=Ext.extend(Ext.Error,{constructor:function(b,a){this.arg=a;
Ext.Error.call(this,b)
},name:"Ext.data.DataReader"});
Ext.apply(Ext.data.DataReader.Error.prototype,{lang:{update:"#update received invalid data from server.  Please see docs for DataReader#update and review your DataReader configuration.",realize:"#realize was called with invalid remote-data.  Please see the docs for DataReader#realize and review your DataReader configuration.","invalid-response":"#readResponse received an invalid response from the server."}});
Ext.data.DataWriter=function(a){Ext.apply(this,a)
};
Ext.data.DataWriter.prototype={writeAllFields:false,listful:false,apply:function(e,f,d,a){var c=[],b=d+"Record";
if(Ext.isArray(a)){Ext.each(a,function(g){c.push(this[b](g))
},this)
}else{if(a instanceof Ext.data.Record){c=this[b](a)
}}this.render(e,f,c)
},render:Ext.emptyFn,updateRecord:Ext.emptyFn,createRecord:Ext.emptyFn,destroyRecord:Ext.emptyFn,toHash:function(f,c){var e=f.fields.map,d={},b=(this.writeAllFields===false&&f.phantom===false)?f.getChanges():f.data,a;
Ext.iterate(b,function(h,g){if((a=e[h])){d[a.mapping?a.mapping:a.name]=g
}});
if(f.phantom){if(f.fields.containsKey(this.meta.idProperty)&&Ext.isEmpty(f.data[this.meta.idProperty])){delete d[this.meta.idProperty]
}}else{d[this.meta.idProperty]=f.id
}return d
},toArray:function(b){var a=[];
Ext.iterate(b,function(d,c){a.push({name:d,value:c})
},this);
return a
}};
Ext.data.DataProxy=function(a){a=a||{};
this.api=a.api;
this.url=a.url;
this.restful=a.restful;
this.listeners=a.listeners;
this.prettyUrls=a.prettyUrls;
this.addEvents("exception","beforeload","load","loadexception","beforewrite","write");
Ext.data.DataProxy.superclass.constructor.call(this);
try{Ext.data.Api.prepare(this)
}catch(b){if(b instanceof Ext.data.Api.Error){b.toConsole()
}}Ext.data.DataProxy.relayEvents(this,["beforewrite","write","exception"])
};
Ext.extend(Ext.data.DataProxy,Ext.util.Observable,{restful:false,setApi:function(){if(arguments.length==1){var a=Ext.data.Api.isValid(arguments[0]);
if(a===true){this.api=arguments[0]
}else{throw new Ext.data.Api.Error("invalid",a)
}}else{if(arguments.length==2){if(!Ext.data.Api.isAction(arguments[0])){throw new Ext.data.Api.Error("invalid",arguments[0])
}this.api[arguments[0]]=arguments[1]
}}Ext.data.Api.prepare(this)
},isApiAction:function(a){return(this.api[a])?true:false
},request:function(e,b,f,a,g,d,c){if(!this.api[e]&&!this.load){throw new Ext.data.DataProxy.Error("action-undefined",e)
}f=f||{};
if((e===Ext.data.Api.actions.read)?this.fireEvent("beforeload",this,f):this.fireEvent("beforewrite",this,e,b,f)!==false){this.doRequest.apply(this,arguments)
}else{g.call(d||this,null,c,false)
}},load:null,doRequest:function(e,b,f,a,g,d,c){this.load(f,a,g,d,c)
},onRead:Ext.emptyFn,onWrite:Ext.emptyFn,buildUrl:function(d,b){b=b||null;
var c=(this.conn&&this.conn.url)?this.conn.url:(this.api[d])?this.api[d].url:this.url;
if(!c){throw new Ext.data.Api.Error("invalid-url",d)
}var e=null;
var a=c.match(/(.*)(\.json|\.xml|\.html)$/);
if(a){e=a[2];
c=a[1]
}if((this.restful===true||this.prettyUrls===true)&&b instanceof Ext.data.Record&&!b.phantom){c+="/"+b.id
}return(e===null)?c:c+e
},destroy:function(){this.purgeListeners()
}});
Ext.apply(Ext.data.DataProxy,Ext.util.Observable.prototype);
Ext.util.Observable.call(Ext.data.DataProxy);
Ext.data.DataProxy.Error=Ext.extend(Ext.Error,{constructor:function(b,a){this.arg=a;
Ext.Error.call(this,b)
},name:"Ext.data.DataProxy"});
Ext.apply(Ext.data.DataProxy.Error.prototype,{lang:{"action-undefined":"DataProxy attempted to execute an API-action but found an undefined url / function.  Please review your Proxy url/api-configuration.","api-invalid":"Recieved an invalid API-configuration.  Please ensure your proxy API-configuration contains only the actions from Ext.data.Api.actions."}});
Ext.data.Request=function(a){Ext.apply(this,a)
};
Ext.data.Request.prototype={action:undefined,rs:undefined,params:undefined,callback:Ext.emptyFn,scope:undefined,reader:undefined};
Ext.data.Response=function(a){Ext.apply(this,a)
};
Ext.data.Response.prototype={action:undefined,success:undefined,message:undefined,data:undefined,raw:undefined,records:undefined};
Ext.data.ScriptTagProxy=function(a){Ext.apply(this,a);
Ext.data.ScriptTagProxy.superclass.constructor.call(this,a);
this.head=document.getElementsByTagName("head")[0]
};
Ext.data.ScriptTagProxy.TRANS_ID=1000;
Ext.extend(Ext.data.ScriptTagProxy,Ext.data.DataProxy,{timeout:30000,callbackParam:"callback",nocache:true,doRequest:function(e,f,d,g,i,j,k){var c=Ext.urlEncode(Ext.apply(d,this.extraParams));
var b=this.buildUrl(e,f);
if(!b){throw new Ext.data.Api.Error("invalid-url",b)
}b=Ext.urlAppend(b,c);
if(this.nocache){b=Ext.urlAppend(b,"_dc="+(new Date().getTime()))
}var a=++Ext.data.ScriptTagProxy.TRANS_ID;
var l={id:a,action:e,cb:"stcCallback"+a,scriptId:"stcScript"+a,params:d,arg:k,url:b,callback:i,scope:j,reader:g};
window[l.cb]=this.createCallback(e,f,l);
b+=String.format("&{0}={1}",this.callbackParam,l.cb);
if(this.autoAbort!==false){this.abort()
}l.timeoutId=this.handleFailure.defer(this.timeout,this,[l]);
var h=document.createElement("script");
h.setAttribute("src",b);
h.setAttribute("type","text/javascript");
h.setAttribute("id",l.scriptId);
this.head.appendChild(h);
this.trans=l
},createCallback:function(d,b,c){var a=this;
return function(e){a.trans=false;
a.destroyTrans(c,true);
if(d===Ext.data.Api.actions.read){a.onRead.call(a,d,c,e)
}else{a.onWrite.call(a,d,c,e,b)
}}
},onRead:function(d,c,b){var a;
try{a=c.reader.readRecords(b)
}catch(f){this.fireEvent("loadexception",this,c,b,f);
this.fireEvent("exception",this,"response",d,c,b,f);
c.callback.call(c.scope||window,null,c.arg,false);
return
}if(a.success===false){this.fireEvent("loadexception",this,c,b);
this.fireEvent("exception",this,"remote",d,c,b,null)
}else{this.fireEvent("load",this,b,c.arg)
}c.callback.call(c.scope||window,a,c.arg,a.success)
},onWrite:function(g,f,c,b){var a=f.reader;
try{var d=a.readResponse(g,c)
}catch(h){this.fireEvent("exception",this,"response",g,f,d,h);
f.callback.call(f.scope||window,null,d,false);
return
}if(!d.success===true){this.fireEvent("exception",this,"remote",g,f,d,b);
f.callback.call(f.scope||window,null,d,false);
return
}this.fireEvent("write",this,g,d.data,d,b,f.arg);
f.callback.call(f.scope||window,d.data,d,true)
},isLoading:function(){return this.trans?true:false
},abort:function(){if(this.isLoading()){this.destroyTrans(this.trans)
}},destroyTrans:function(b,a){this.head.removeChild(document.getElementById(b.scriptId));
clearTimeout(b.timeoutId);
if(a){window[b.cb]=undefined;
try{delete window[b.cb]
}catch(c){}}else{window[b.cb]=function(){window[b.cb]=undefined;
try{delete window[b.cb]
}catch(d){}}
}},handleFailure:function(a){this.trans=false;
this.destroyTrans(a,false);
if(a.action===Ext.data.Api.actions.read){this.fireEvent("loadexception",this,null,a.arg)
}this.fireEvent("exception",this,"response",a.action,{response:null,options:a.arg});
a.callback.call(a.scope||window,null,a.arg,false)
},destroy:function(){this.abort();
Ext.data.ScriptTagProxy.superclass.destroy.call(this)
}});
Ext.data.HttpProxy=function(a){Ext.data.HttpProxy.superclass.constructor.call(this,a);
this.conn=a;
this.conn.url=null;
this.useAjax=!a||!a.events;
var c=Ext.data.Api.actions;
this.activeRequest={};
for(var b in c){this.activeRequest[c[b]]=undefined
}};
Ext.extend(Ext.data.HttpProxy,Ext.data.DataProxy,{getConnection:function(){return this.useAjax?Ext.Ajax:this.conn
},setUrl:function(a,b){this.conn.url=a;
if(b===true){this.url=a;
this.api=null;
Ext.data.Api.prepare(this)
}},doRequest:function(f,d,h,c,b,e,a){var g={method:(this.api[f])?this.api[f]["method"]:undefined,request:{callback:b,scope:e,arg:a},reader:c,callback:this.createCallback(f,d),scope:this};
if(h.jsonData){g.jsonData=h.jsonData
}else{if(h.xmlData){g.xmlData=h.xmlData
}else{g.params=h||{}
}}this.conn.url=this.buildUrl(f,d);
if(this.useAjax){Ext.applyIf(g,this.conn);
if(this.activeRequest[f]){}this.activeRequest[f]=Ext.Ajax.request(g)
}else{this.conn.request(g)
}this.conn.url=null
},createCallback:function(b,a){return function(e,d,c){this.activeRequest[b]=undefined;
if(!d){if(b===Ext.data.Api.actions.read){this.fireEvent("loadexception",this,e,c)
}this.fireEvent("exception",this,"response",b,e,c);
e.request.callback.call(e.request.scope,null,e.request.arg,false);
return
}if(b===Ext.data.Api.actions.read){this.onRead(b,e,c)
}else{this.onWrite(b,e,c,a)
}}
},onRead:function(d,g,b){var a;
try{a=g.reader.read(b)
}catch(f){this.fireEvent("loadexception",this,g,b,f);
this.fireEvent("exception",this,"response",d,g,b,f);
g.request.callback.call(g.request.scope,null,g.request.arg,false);
return
}if(a.success===false){this.fireEvent("loadexception",this,g,b);
var c=g.reader.readResponse(d,b);
this.fireEvent("exception",this,"remote",d,g,c,null)
}else{this.fireEvent("load",this,g,g.request.arg)
}g.request.callback.call(g.request.scope,a,g.request.arg,a.success)
},onWrite:function(f,h,c,b){var a=h.reader;
var d;
try{d=a.readResponse(f,c)
}catch(g){this.fireEvent("exception",this,"response",f,h,c,g);
h.request.callback.call(h.request.scope,null,h.request.arg,false);
return
}if(d.success===true){this.fireEvent("write",this,f,d.data,d,b,h.request.arg)
}else{this.fireEvent("exception",this,"remote",f,h,d,b)
}h.request.callback.call(h.request.scope,d.data,d,d.success)
},destroy:function(){if(!this.useAjax){this.conn.abort()
}else{if(this.activeRequest){var b=Ext.data.Api.actions;
for(var a in b){if(this.activeRequest[b[a]]){Ext.Ajax.abort(this.activeRequest[b[a]])
}}}}Ext.data.HttpProxy.superclass.destroy.call(this)
}});
Ext.data.MemoryProxy=function(b){var a={};
a[Ext.data.Api.actions.read]=true;
Ext.data.MemoryProxy.superclass.constructor.call(this,{api:a});
this.data=b
};
Ext.extend(Ext.data.MemoryProxy,Ext.data.DataProxy,{doRequest:function(b,c,a,d,g,h,i){a=a||{};
var j;
try{j=d.readRecords(this.data)
}catch(f){this.fireEvent("loadexception",this,null,i,f);
this.fireEvent("exception",this,"response",b,i,null,f);
g.call(h,null,i,false);
return
}g.call(h,j,i,true)
}});
Ext.data.Types=new function(){var a=Ext.data.SortTypes;
Ext.apply(this,{stripRe:/[\$,%]/g,AUTO:{convert:function(b){return b
},sortType:a.none,type:"auto"},STRING:{convert:function(b){return(b===undefined||b===null)?"":String(b)
},sortType:a.asUCString,type:"string"},INT:{convert:function(b){return b!==undefined&&b!==null&&b!==""?parseInt(String(b).replace(Ext.data.Types.stripRe,""),10):(this.useNull?null:0)
},sortType:a.none,type:"int"},FLOAT:{convert:function(b){return b!==undefined&&b!==null&&b!==""?parseFloat(String(b).replace(Ext.data.Types.stripRe,""),10):(this.useNull?null:0)
},sortType:a.none,type:"float"},BOOL:{convert:function(b){return b===true||b==="true"||b==1
},sortType:a.none,type:"bool"},DATE:{convert:function(c){var d=this.dateFormat;
if(!c){return null
}if(Ext.isDate(c)){return c
}if(d){if(d=="timestamp"){return new Date(c*1000)
}if(d=="time"){return new Date(parseInt(c,10))
}return Date.parseDate(c,d)
}var b=Date.parse(c);
return b?new Date(b):null
},sortType:a.asDate,type:"date"}});
Ext.apply(this,{BOOLEAN:this.BOOL,INTEGER:this.INT,NUMBER:this.FLOAT})
};
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.data.JsonWriter=Ext.extend(Ext.data.DataWriter,{encode:true,encodeDelete:false,constructor:function(a){Ext.data.JsonWriter.superclass.constructor.call(this,a)
},render:function(c,d,b){if(this.encode===true){Ext.apply(c,d);
c[this.meta.root]=Ext.encode(b)
}else{var a=Ext.apply({},d);
a[this.meta.root]=b;
c.jsonData=a
}},createRecord:function(a){return this.toHash(a)
},updateRecord:function(a){return this.toHash(a)
},destroyRecord:function(b){if(this.encodeDelete){var a={};
a[this.meta.idProperty]=b.id;
return a
}else{return b.id
}}});
Ext.data.JsonReader=function(a,b){a=a||{};
Ext.applyIf(a,{idProperty:"id",successProperty:"success",totalProperty:"total"});
Ext.data.JsonReader.superclass.constructor.call(this,a,b||a.fields)
};
Ext.extend(Ext.data.JsonReader,Ext.data.DataReader,{read:function(a){var b=a.responseText;
var c=Ext.decode(b);
if(!c){throw {message:"JsonReader.read: Json object not found"}
}return this.readRecords(c)
},readResponse:function(e,b){var g=(b.responseText!==undefined)?Ext.decode(b.responseText):b;
if(!g){throw new Ext.data.JsonReader.Error("response")
}var a=this.getRoot(g),f=this.getSuccess(g);
if(f&&e===Ext.data.Api.actions.create){var d=Ext.isDefined(a);
if(d&&Ext.isEmpty(a)){throw new Ext.data.JsonReader.Error("root-empty",this.meta.root)
}else{if(!d){throw new Ext.data.JsonReader.Error("root-undefined-response",this.meta.root)
}}}var c=new Ext.data.Response({action:e,success:f,data:(a)?this.extractData(a,false):[],message:this.getMessage(g),raw:g});
if(Ext.isEmpty(c.success)){throw new Ext.data.JsonReader.Error("successProperty-response",this.meta.successProperty)
}return c
},readRecords:function(a){this.jsonData=a;
if(a.metaData){this.onMetaChange(a.metaData)
}var m=this.meta,h=this.recordType,b=h.prototype.fields,l=b.items,i=b.length,j;
var g=this.getRoot(a),e=g.length,d=e,k=true;
if(m.totalProperty){j=parseInt(this.getTotal(a),10);
if(!isNaN(j)){d=j
}}if(m.successProperty){j=this.getSuccess(a);
if(j===false||j==="false"){k=false
}}return{success:k,records:this.extractData(g,true),totalRecords:d}
},buildExtractors:function(){if(this.ef){return
}var l=this.meta,h=this.recordType,e=h.prototype.fields,k=e.items,j=e.length;
if(l.totalProperty){this.getTotal=this.createAccessor(l.totalProperty)
}if(l.successProperty){this.getSuccess=this.createAccessor(l.successProperty)
}if(l.messageProperty){this.getMessage=this.createAccessor(l.messageProperty)
}this.getRoot=l.root?this.createAccessor(l.root):function(f){return f
};
if(l.id||l.idProperty){var d=this.createAccessor(l.id||l.idProperty);
this.getId=function(g){var f=d(g);
return(f===undefined||f==="")?null:f
}
}else{this.getId=function(){return null
}
}var c=[];
for(var b=0;
b<j;
b++){e=k[b];
var a=(e.mapping!==undefined&&e.mapping!==null)?e.mapping:e.name;
c.push(this.createAccessor(a))
}this.ef=c
},simpleAccess:function(b,a){return b[a]
},createAccessor:function(){var a=/[\[\.]/;
return function(c){if(Ext.isEmpty(c)){return Ext.emptyFn
}if(Ext.isFunction(c)){return c
}var b=String(c).search(a);
if(b>=0){return new Function("obj","return obj"+(b>0?".":"")+c)
}return function(d){return d[c]
}
}
}(),extractValues:function(h,d,a){var g,c={};
for(var e=0;
e<a;
e++){g=d[e];
var b=this.ef[e](h);
c[g.name]=g.convert((b!==undefined)?b:g.defaultValue,h)
}return c
}});
Ext.data.JsonReader.Error=Ext.extend(Ext.Error,{constructor:function(b,a){this.arg=a;
Ext.Error.call(this,b)
},name:"Ext.data.JsonReader"});
Ext.apply(Ext.data.JsonReader.Error.prototype,{lang:{response:"An error occurred while json-decoding your server response","successProperty-response":'Could not locate your "successProperty" in your server response.  Please review your JsonReader config to ensure the config-property "successProperty" matches the property in your server-response.  See the JsonReader docs.',"root-undefined-config":'Your JsonReader was configured without a "root" property.  Please review your JsonReader config and make sure to define the root property.  See the JsonReader docs.',"idProperty-undefined":'Your JsonReader was configured without an "idProperty"  Please review your JsonReader configuration and ensure the "idProperty" is set (e.g.: "id").  See the JsonReader docs.',"root-empty":'Data was expected to be returned by the server in the "root" property of the response.  Please review your JsonReader configuration to ensure the "root" property matches that returned in the server-response.  See JsonReader docs.'}});
Ext.data.ArrayReader=Ext.extend(Ext.data.JsonReader,{readRecords:function(r){this.arrayData=r;
var l=this.meta,d=l?Ext.num(l.idIndex,l.id):null,b=this.recordType,q=b.prototype.fields,z=[],e=true,g;
var u=this.getRoot(r);
for(var y=0,A=u.length;
y<A;
y++){var t=u[y],a={},p=((d||d===0)&&t[d]!==undefined&&t[d]!==""?t[d]:null);
for(var x=0,m=q.length;
x<m;
x++){var B=q.items[x],w=B.mapping!==undefined&&B.mapping!==null?B.mapping:x;
g=t[w]!==undefined?t[w]:B.defaultValue;
g=B.convert(g,t);
a[B.name]=g
}var c=new b(a,p);
c.json=t;
z[z.length]=c
}var h=z.length;
if(l.totalProperty){g=parseInt(this.getTotal(r),10);
if(!isNaN(g)){h=g
}}if(l.successProperty){g=this.getSuccess(r);
if(g===false||g==="false"){e=false
}}return{success:e,records:z,totalRecords:h}
}});
Ext.data.ArrayStore=Ext.extend(Ext.data.Store,{constructor:function(a){Ext.data.ArrayStore.superclass.constructor.call(this,Ext.apply(a,{reader:new Ext.data.ArrayReader(a)}))
},loadData:function(e,b){if(this.expandData===true){var d=[];
for(var c=0,a=e.length;
c<a;
c++){d[d.length]=[e[c]]
}e=d
}Ext.data.ArrayStore.superclass.loadData.call(this,e,b)
}});
Ext.reg("arraystore",Ext.data.ArrayStore);
Ext.data.SimpleStore=Ext.data.ArrayStore;
Ext.reg("simplestore",Ext.data.SimpleStore);
Ext.data.JsonStore=Ext.extend(Ext.data.Store,{constructor:function(a){Ext.data.JsonStore.superclass.constructor.call(this,Ext.apply(a,{reader:new Ext.data.JsonReader(a)}))
}});
Ext.reg("jsonstore",Ext.data.JsonStore);
Ext.DataView=Ext.extend(Ext.BoxComponent,{selectedClass:"x-view-selected",emptyText:"",deferEmptyText:true,trackOver:false,blockRefresh:false,last:false,initComponent:function(){Ext.DataView.superclass.initComponent.call(this);
if(Ext.isString(this.tpl)||Ext.isArray(this.tpl)){this.tpl=new Ext.XTemplate(this.tpl)
}this.addEvents("beforeclick","click","mouseenter","mouseleave","containerclick","dblclick","contextmenu","containercontextmenu","selectionchange","beforeselect");
this.store=Ext.StoreMgr.lookup(this.store);
this.all=new Ext.CompositeElementLite();
this.selected=new Ext.CompositeElementLite()
},afterRender:function(){Ext.DataView.superclass.afterRender.call(this);
this.mon(this.getTemplateTarget(),{click:this.onClick,dblclick:this.onDblClick,contextmenu:this.onContextMenu,scope:this});
if(this.overClass||this.trackOver){this.mon(this.getTemplateTarget(),{mouseover:this.onMouseOver,mouseout:this.onMouseOut,scope:this})
}if(this.store){this.bindStore(this.store,true)
}},refresh:function(){this.clearSelections(false,true);
var c=this.getTemplateTarget(),d=this.store.getRange();
c.update("");
if(d.length<1){if(!this.deferEmptyText||this.hasSkippedEmptyText){c.update(this.emptyText)
}this.all.clear()
}else{this.tpl.overwrite(c,this.collectData(d,0));
this.all.fill(Ext.query(this.itemSelector,c.dom));
this.updateIndexes(0)
}this.hasSkippedEmptyText=true
},getTemplateTarget:function(){return this.el
},prepareData:function(b){return b
},collectData:function(f,h){var i=[],j=0,g=f.length;
for(;
j<g;
j++){i[i.length]=this.prepareData(f[j].data,h+j,f[j])
}return i
},bufferRender:function(e,d){var f=document.createElement("div");
this.tpl.overwrite(f,this.collectData(e,d));
return Ext.query(this.itemSelector,f)
},onUpdate:function(i,h){var g=this.store.indexOf(h);
if(g>-1){var j=this.isSelected(g),l=this.all.elements[g],k=this.bufferRender([h],g)[0];
this.all.replaceElement(g,k,true);
if(j){this.selected.replaceElement(l,k);
this.all.item(g).addClass(this.selectedClass)
}this.updateIndexes(g,g)
}},onAdd:function(i,k,j){if(this.all.getCount()===0){this.refresh();
return
}var l=this.bufferRender(k,j),h,a=this.all.elements;
if(j<this.all.getCount()){h=this.all.item(j).insertSibling(l,"before",true);
a.splice.apply(a,[j,0].concat(l))
}else{h=this.all.last().insertSibling(l,"after",true);
a.push.apply(a,l)
}this.updateIndexes(j)
},onRemove:function(f,e,d){this.deselect(d);
this.all.removeElement(d,true);
this.updateIndexes(d);
if(this.store.getCount()===0){this.refresh()
}},refreshNode:function(b){this.onUpdate(this.store,this.store.getAt(b))
},updateIndexes:function(g,h){var e=this.all.elements;
g=g||0;
h=h||((h===0)?0:(e.length-1));
for(var f=g;
f<=h;
f++){e[f].viewIndex=f
}},getStore:function(){return this.store
},bindStore:function(d,c){if(!c&&this.store){if(d!==this.store&&this.store.autoDestroy){this.store.destroy()
}else{this.store.un("beforeload",this.onBeforeLoad,this);
this.store.un("datachanged",this.onDataChanged,this);
this.store.un("add",this.onAdd,this);
this.store.un("remove",this.onRemove,this);
this.store.un("update",this.onUpdate,this);
this.store.un("clear",this.refresh,this)
}if(!d){this.store=null
}}if(d){d=Ext.StoreMgr.lookup(d);
d.on({scope:this,beforeload:this.onBeforeLoad,datachanged:this.onDataChanged,add:this.onAdd,remove:this.onRemove,update:this.onUpdate,clear:this.refresh})
}this.store=d;
if(d){this.refresh()
}},onDataChanged:function(){if(this.blockRefresh!==true){this.refresh.apply(this,arguments)
}},findItemFromChild:function(b){return Ext.fly(b).findParent(this.itemSelector,this.getTemplateTarget())
},onClick:function(f){var d=f.getTarget(this.itemSelector,this.getTemplateTarget()),e;
if(d){e=this.indexOf(d);
if(this.onItemClick(d,e,f)!==false){this.fireEvent("click",this,e,d,f)
}}else{if(this.fireEvent("containerclick",this,f)!==false){this.onContainerClick(f)
}}},onContainerClick:function(b){this.clearSelections()
},onContextMenu:function(c){var d=c.getTarget(this.itemSelector,this.getTemplateTarget());
if(d){this.fireEvent("contextmenu",this,this.indexOf(d),d,c)
}else{this.fireEvent("containercontextmenu",this,c)
}},onDblClick:function(c){var d=c.getTarget(this.itemSelector,this.getTemplateTarget());
if(d){this.fireEvent("dblclick",this,this.indexOf(d),d,c)
}},onMouseOver:function(c){var d=c.getTarget(this.itemSelector,this.getTemplateTarget());
if(d&&d!==this.lastItem){this.lastItem=d;
Ext.fly(d).addClass(this.overClass);
this.fireEvent("mouseenter",this,this.indexOf(d),d,c)
}},onMouseOut:function(b){if(this.lastItem){if(!b.within(this.lastItem,true,true)){Ext.fly(this.lastItem).removeClass(this.overClass);
this.fireEvent("mouseleave",this,this.indexOf(this.lastItem),this.lastItem,b);
delete this.lastItem
}}},onItemClick:function(d,e,f){if(this.fireEvent("beforeclick",this,e,d,f)===false){return false
}if(this.multiSelect){this.doMultiSelection(d,e,f);
f.preventDefault()
}else{if(this.singleSelect){this.doSingleSelection(d,e,f);
f.preventDefault()
}}return true
},doSingleSelection:function(d,e,f){if(f.ctrlKey&&this.isSelected(e)){this.deselect(e)
}else{this.select(e,false)
}},doMultiSelection:function(h,f,g){if(g.shiftKey&&this.last!==false){var e=this.last;
this.selectRange(e,f,g.ctrlKey);
this.last=e
}else{if((g.ctrlKey||this.simpleSelect)&&this.isSelected(f)){this.deselect(f)
}else{this.select(f,g.ctrlKey||g.shiftKey||this.simpleSelect)
}}},getSelectionCount:function(){return this.selected.getCount()
},getSelectedNodes:function(){return this.selected.elements
},getSelectedIndexes:function(){var e=[],g=this.selected.elements,h=0,f=g.length;
for(;
h<f;
h++){e.push(g[h].viewIndex)
}return e
},getSelectedRecords:function(){return this.getRecords(this.selected.elements)
},getRecords:function(h){var e=[],g=0,f=h.length;
for(;
g<f;
g++){e[e.length]=this.store.getAt(h[g].viewIndex)
}return e
},getRecord:function(b){return this.store.getAt(b.viewIndex)
},clearSelections:function(d,c){if((this.multiSelect||this.singleSelect)&&this.selected.getCount()>0){if(!c){this.selected.removeClass(this.selectedClass)
}this.selected.clear();
this.last=false;
if(!d){this.fireEvent("selectionchange",this,this.selected.elements)
}}},isSelected:function(b){return this.selected.contains(this.getNode(b))
},deselect:function(b){if(this.isSelected(b)){b=this.getNode(b);
this.selected.removeElement(b);
if(this.last==b.viewIndex){this.last=false
}Ext.fly(b).removeClass(this.selectedClass);
this.fireEvent("selectionchange",this,this.selected.elements)
}},select:function(k,i,g){if(Ext.isArray(k)){if(!i){this.clearSelections(true)
}for(var l=0,h=k.length;
l<h;
l++){this.select(k[l],true,true)
}if(!g){this.fireEvent("selectionchange",this,this.selected.elements)
}}else{var j=this.getNode(k);
if(!i){this.clearSelections(true)
}if(j&&!this.isSelected(j)){if(this.fireEvent("beforeselect",this,j,this.selected.elements)!==false){Ext.fly(j).addClass(this.selectedClass);
this.selected.add(j);
this.last=j.viewIndex;
if(!g){this.fireEvent("selectionchange",this,this.selected.elements)
}}}}},selectRange:function(f,e,d){if(!d){this.clearSelections(true)
}this.select(this.getNodes(f,e),true)
},getNode:function(c){if(Ext.isString(c)){return document.getElementById(c)
}else{if(Ext.isNumber(c)){return this.all.elements[c]
}else{if(c instanceof Ext.data.Record){var d=this.store.indexOf(c);
return this.all.elements[d]
}}}return c
},getNodes:function(h,g){var i=this.all.elements,f=[],j;
h=h||0;
g=!Ext.isDefined(g)?Math.max(i.length-1,0):g;
if(h<=g){for(j=h;
j<=g&&i[j];
j++){f.push(i[j])
}}else{for(j=h;
j>=g&&i[j];
j--){f.push(i[j])
}}return f
},indexOf:function(b){b=this.getNode(b);
if(Ext.isNumber(b.viewIndex)){return b.viewIndex
}return this.all.indexOf(b)
},onBeforeLoad:function(){if(this.loadingText){this.clearSelections(false,true);
this.getTemplateTarget().update('<div class="loading-indicator">'+this.loadingText+"</div>");
this.all.clear()
}},onDestroy:function(){this.all.clear();
this.selected.clear();
Ext.DataView.superclass.onDestroy.call(this);
this.bindStore(null)
}});
Ext.DataView.prototype.setStore=Ext.DataView.prototype.bindStore;
Ext.reg("dataview",Ext.DataView);
Ext.list.ListView=Ext.extend(Ext.DataView,{itemSelector:"dl",selectedClass:"x-list-selected",overClass:"x-list-over",scrollOffset:undefined,columnResize:true,columnSort:true,maxColumnWidth:Ext.isIE?99:100,initComponent:function(){if(this.columnResize){this.colResizer=new Ext.list.ColumnResizer(this.colResizer);
this.colResizer.init(this)
}if(this.columnSort){this.colSorter=new Ext.list.Sorter(this.columnSort);
this.colSorter.init(this)
}if(!this.internalTpl){this.internalTpl=new Ext.XTemplate('<div class="x-list-header"><div class="x-list-header-inner">','<tpl for="columns">','<div style="width:{[values.width*100]}%;text-align:{align};"><em unselectable="on" id="',this.id,'-xlhd-{#}">',"{header}","</em></div>","</tpl>",'<div class="x-clear"></div>',"</div></div>",'<div class="x-list-body"><div class="x-list-body-inner">',"</div></div>")
}if(!this.tpl){this.tpl=new Ext.XTemplate('<tpl for="rows">',"<dl>",'<tpl for="parent.columns">','<dt style="width:{[values.width*100]}%;text-align:{align};">','<em unselectable="on"<tpl if="cls"> class="{cls}</tpl>">',"{[values.tpl.apply(parent)]}","</em></dt>","</tpl>",'<div class="x-clear"></div>',"</dl>","</tpl>")
}var j=this.columns,o=0,n=0,i=j.length,s=[];
for(var p=0;
p<i;
p++){var c=j[p];
if(!c.isColumn){c.xtype=c.xtype?(/^lv/.test(c.xtype)?c.xtype:"lv"+c.xtype):"lvcolumn";
c=Ext.create(c)
}if(c.width){o+=c.width*100;
if(o>this.maxColumnWidth){c.width-=(o-this.maxColumnWidth)/100
}n++
}s.push(c)
}j=this.columns=s;
if(n<i){var r=i-n;
if(o<this.maxColumnWidth){var t=((this.maxColumnWidth-o)/r)/100;
for(var q=0;
q<i;
q++){var c=j[q];
if(!c.width){c.width=t
}}}}Ext.list.ListView.superclass.initComponent.call(this)
},onRender:function(){this.autoEl={cls:"x-list-wrap"};
Ext.list.ListView.superclass.onRender.apply(this,arguments);
this.internalTpl.overwrite(this.el,{columns:this.columns});
this.innerBody=Ext.get(this.el.dom.childNodes[1].firstChild);
this.innerHd=Ext.get(this.el.dom.firstChild.firstChild);
if(this.hideHeaders){this.el.dom.firstChild.style.display="none"
}},getTemplateTarget:function(){return this.innerBody
},collectData:function(){var b=Ext.list.ListView.superclass.collectData.apply(this,arguments);
return{columns:this.columns,rows:b}
},verifyInternalSize:function(){if(this.lastSize){this.onResize(this.lastSize.width,this.lastSize.height)
}},onResize:function(l,j){var g=this.innerBody.dom,i=this.innerHd.dom,k=l-Ext.num(this.scrollOffset,Ext.getScrollBarWidth())+"px",h;
if(!g){return
}h=g.parentNode;
if(Ext.isNumber(l)){if(this.reserveScrollOffset||((h.offsetWidth-h.clientWidth)>10)){g.style.width=k;
i.style.width=k
}else{g.style.width=l+"px";
i.style.width=l+"px";
setTimeout(function(){if((h.offsetWidth-h.clientWidth)>10){g.style.width=k;
i.style.width=k
}},10)
}}if(Ext.isNumber(j)){h.style.height=Math.max(0,j-i.parentNode.offsetHeight)+"px"
}},updateIndexes:function(){Ext.list.ListView.superclass.updateIndexes.apply(this,arguments);
this.verifyInternalSize()
},findHeaderIndex:function(h){h=h.dom||h;
var g=h.parentNode,j=g.parentNode.childNodes,c=0,i;
for(;
i=j[c];
c++){if(i==g){return c
}}return -1
},setHdWidths:function(){var g=this.innerHd.dom.getElementsByTagName("div"),h=0,e=this.columns,f=e.length;
for(;
h<f;
h++){g[h].style.width=(e[h].width*100)+"%"
}}});
Ext.reg("listview",Ext.list.ListView);
Ext.ListView=Ext.list.ListView;
Ext.list.Column=Ext.extend(Object,{isColumn:true,align:"left",header:"",width:null,cls:"",constructor:function(b){if(!b.tpl){b.tpl=new Ext.XTemplate("{"+b.dataIndex+"}")
}else{if(Ext.isString(b.tpl)){b.tpl=new Ext.XTemplate(b.tpl)
}}Ext.apply(this,b)
}});
Ext.reg("lvcolumn",Ext.list.Column);
Ext.list.NumberColumn=Ext.extend(Ext.list.Column,{format:"0,000.00",constructor:function(b){b.tpl=b.tpl||new Ext.XTemplate("{"+b.dataIndex+':number("'+(b.format||this.format)+'")}');
Ext.list.NumberColumn.superclass.constructor.call(this,b)
}});
Ext.reg("lvnumbercolumn",Ext.list.NumberColumn);
Ext.list.DateColumn=Ext.extend(Ext.list.Column,{format:"m/d/Y",constructor:function(b){b.tpl=b.tpl||new Ext.XTemplate("{"+b.dataIndex+':date("'+(b.format||this.format)+'")}');
Ext.list.DateColumn.superclass.constructor.call(this,b)
}});
Ext.reg("lvdatecolumn",Ext.list.DateColumn);
Ext.list.BooleanColumn=Ext.extend(Ext.list.Column,{trueText:"true",falseText:"false",undefinedText:"&#160;",constructor:function(g){g.tpl=g.tpl||new Ext.XTemplate("{"+g.dataIndex+":this.format}");
var c=this.trueText,h=this.falseText,f=this.undefinedText;
g.tpl.format=function(a){if(a===undefined){return f
}if(!a||a==="false"){return h
}return c
};
Ext.list.DateColumn.superclass.constructor.call(this,g)
}});
Ext.reg("lvbooleancolumn",Ext.list.BooleanColumn);
Ext.list.ColumnResizer=Ext.extend(Ext.util.Observable,{minPct:0.05,constructor:function(b){Ext.apply(this,b);
Ext.list.ColumnResizer.superclass.constructor.call(this)
},init:function(b){this.view=b;
b.on("render",this.initEvents,this)
},initEvents:function(b){b.mon(b.innerHd,"mousemove",this.handleHdMove,this);
this.tracker=new Ext.dd.DragTracker({onBeforeStart:this.onBeforeStart.createDelegate(this),onStart:this.onStart.createDelegate(this),onDrag:this.onDrag.createDelegate(this),onEnd:this.onEnd.createDelegate(this),tolerance:3,autoStart:300});
this.tracker.initEl(b.innerHd);
b.on("beforedestroy",this.tracker.destroy,this.tracker)
},handleHdMove:function(l,o){var p=5,e=l.getPageX(),k=l.getTarget("em",3,true);
if(k){var m=k.getRegion(),n=k.dom.style,j=k.dom.parentNode;
if(e-m.left<=p&&j!=j.parentNode.firstChild){this.activeHd=Ext.get(j.previousSibling.firstChild);
n.cursor=Ext.isWebKit?"e-resize":"col-resize"
}else{if(m.right-e<=p&&j!=j.parentNode.lastChild.previousSibling){this.activeHd=k;
n.cursor=Ext.isWebKit?"w-resize":"col-resize"
}else{delete this.activeHd;
n.cursor=""
}}}},onBeforeStart:function(b){this.dragHd=this.activeHd;
return !!this.dragHd
},onStart:function(h){var i=this,e=i.view,j=i.dragHd,g=i.tracker.getXY()[0];
i.proxy=e.el.createChild({cls:"x-list-resizer"});
i.dragX=j.getX();
i.headerIndex=e.findHeaderIndex(j);
i.headersDisabled=e.disableHeaders;
e.disableHeaders=true;
i.proxy.setHeight(e.el.getHeight());
i.proxy.setX(i.dragX);
i.proxy.setWidth(g-i.dragX);
this.setBoundaries()
},setBoundaries:function(n){var m=this.view,p=this.headerIndex,t=m.innerHd.getWidth(),n=m.innerHd.getX(),u=Math.ceil(t*this.minPct),l=t-u,r=m.columns.length,s=m.innerHd.select("em",true),q=u+n,v=l+n,o;
if(r==2){this.minX=q;
this.maxX=v
}else{o=s.item(p+2);
this.minX=s.item(p).getX()+u;
this.maxX=o?o.getX()-u:v;
if(p==0){this.minX=q
}else{if(p==r-2){this.maxX=v
}}}},onDrag:function(f){var d=this,e=d.tracker.getXY()[0].constrain(d.minX,d.maxX);
d.proxy.setWidth(e-this.dragX)
},onEnd:function(p){var r=this.proxy.getWidth(),q=this.headerIndex,m=this.view,t=m.columns,u=m.innerHd.getWidth(),n=Math.ceil(r*m.maxColumnWidth/u)/100,s=this.headersDisabled,e=t[q],o=t[q+1],v=e.width+o.width;
this.proxy.remove();
e.width=n;
o.width=v-n;
delete this.dragHd;
m.setHdWidths();
m.refresh();
setTimeout(function(){m.disableHeaders=s
},100)
}});
Ext.ListView.ColumnResizer=Ext.list.ColumnResizer;
Ext.list.Sorter=Ext.extend(Ext.util.Observable,{sortClasses:["sort-asc","sort-desc"],constructor:function(b){Ext.apply(this,b);
Ext.list.Sorter.superclass.constructor.call(this)
},init:function(b){this.view=b;
b.on("render",this.initEvents,this)
},initEvents:function(b){b.mon(b.innerHd,"click",this.onHdClick,this);
b.innerHd.setStyle("cursor","pointer");
b.mon(b.store,"datachanged",this.updateSortState,this);
this.updateSortState.defer(10,this,[b.store])
},updateSortState:function(n){var k=n.getSortState();
if(!k){return
}this.sortState=k;
var l=this.view.columns,j=-1;
for(var m=0,i=l.length;
m<i;
m++){if(l[m].dataIndex==k.field){j=m;
break
}}if(j!=-1){var h=k.direction;
this.updateSortIcon(j,h)
}},updateSortIcon:function(e,f){var g=this.sortClasses;
var h=this.view.innerHd.select("em").removeClass(g);
h.item(e).addClass(g[f=="DESC"?1:0])
},onHdClick:function(f){var d=f.getTarget("em",3);
if(d&&!this.view.disableHeaders){var e=this.view.findHeaderIndex(d);
this.view.store.sort(this.view.columns[e].dataIndex)
}}});
Ext.ListView.Sorter=Ext.list.Sorter;
Ext.data.XmlWriter=function(b){Ext.data.XmlWriter.superclass.constructor.apply(this,arguments);
this.tpl=(typeof(this.tpl)==="string")?new Ext.XTemplate(this.tpl).compile():this.tpl.compile()
};
Ext.extend(Ext.data.XmlWriter,Ext.data.DataWriter,{documentRoot:"xrequest",forceDocumentRoot:false,root:"records",xmlVersion:"1.0",xmlEncoding:"ISO-8859-15",tpl:'<tpl for="."><\u003fxml version="{version}" encoding="{encoding}"\u003f><tpl if="documentRoot"><{documentRoot}><tpl for="baseParams"><tpl for="."><{name}>{value}</{name}></tpl></tpl></tpl><tpl if="records.length&gt;1"><{root}></tpl><tpl for="records"><{parent.record}><tpl for="."><{name}>{value}</{name}></tpl></{parent.record}></tpl><tpl if="records.length&gt;1"></{root}></tpl><tpl if="documentRoot"></{documentRoot}></tpl></tpl>',render:function(d,f,e){f=this.toArray(f);
d.xmlData=this.tpl.applyTemplate({version:this.xmlVersion,encoding:this.xmlEncoding,documentRoot:(f.length>0||this.forceDocumentRoot===true)?this.documentRoot:false,record:this.meta.record,root:this.root,baseParams:f,records:(Ext.isArray(e[0]))?e:[e]})
},createRecord:function(b){return this.toArray(this.toHash(b))
},updateRecord:function(b){return this.toArray(this.toHash(b))
},destroyRecord:function(c){var d={};
d[this.meta.idProperty]=c.id;
return this.toArray(d)
}});
Ext.data.XmlReader=function(d,c){d=d||{};
Ext.applyIf(d,{idProperty:d.idProperty||d.idPath||d.id,successProperty:d.successProperty||d.success});
Ext.data.XmlReader.superclass.constructor.call(this,d,c||d.fields)
};
Ext.extend(Ext.data.XmlReader,Ext.data.DataReader,{read:function(d){var c=d.responseXML;
if(!c){throw {message:"XmlReader.read: XML Document not available"}
}return this.readRecords(c)
},readRecords:function(k){this.xmlData=k;
var h=k.documentElement||k,l=Ext.DomQuery,i=0,j=true;
if(this.meta.totalProperty){i=this.getTotal(h,0)
}if(this.meta.successProperty){j=this.getSuccess(h)
}var g=this.extractData(l.select(this.meta.record,h),true);
return{success:j,records:g,totalRecords:i||g.length}
},readResponse:function(k,h){var l=Ext.DomQuery,j=h.responseXML,i=j.documentElement||j;
var n=new Ext.data.Response({action:k,success:this.getSuccess(i),message:this.getMessage(i),data:this.extractData(l.select(this.meta.record,i)||l.select(this.meta.root,i),false),raw:j});
if(Ext.isEmpty(n.success)){throw new Ext.data.DataReader.Error("successProperty-response",this.meta.successProperty)
}if(k===Ext.data.Api.actions.create){var m=Ext.isDefined(n.data);
if(m&&Ext.isEmpty(n.data)){throw new Ext.data.JsonReader.Error("root-empty",this.meta.root)
}else{if(!m){throw new Ext.data.JsonReader.Error("root-undefined-response",this.meta.root)
}}}return n
},getSuccess:function(){return true
},buildExtractors:function(){if(this.ef){return
}var f=this.meta,m=this.recordType,n=m.prototype.fields,g=n.items,i=n.length;
if(f.totalProperty){this.getTotal=this.createAccessor(f.totalProperty)
}if(f.successProperty){this.getSuccess=this.createAccessor(f.successProperty)
}if(f.messageProperty){this.getMessage=this.createAccessor(f.messageProperty)
}this.getRoot=function(a){return(!Ext.isEmpty(a[this.meta.record]))?a[this.meta.record]:a[this.meta.root]
};
if(f.idPath||f.idProperty){var o=this.createAccessor(f.idPath||f.idProperty);
this.getId=function(b){var a=o(b)||b.id;
return(a===undefined||a==="")?null:a
}
}else{this.getId=function(){return null
}
}var p=[];
for(var q=0;
q<i;
q++){n=g[q];
var r=(n.mapping!==undefined&&n.mapping!==null)?n.mapping:n.name;
p.push(this.createAccessor(r))
}this.ef=p
},createAccessor:function(){var b=Ext.DomQuery;
return function(a){if(Ext.isFunction(a)){return a
}switch(a){case this.meta.totalProperty:return function(f,e){return b.selectNumber(a,f,e)
};
break;
case this.meta.successProperty:return function(i,h){var j=b.selectValue(a,i,true);
var g=j!==false&&j!=="false";
return g
};
break;
default:return function(f,e){return b.selectValue(a,f,e)
};
break
}}
}(),extractValues:function(j,m,i){var k,n={};
for(var l=0;
l<i;
l++){k=m[l];
var f=this.ef[l](j);
n[k.name]=k.convert((f!==undefined)?f:k.defaultValue,j)
}return n
}});
Ext.data.XmlStore=Ext.extend(Ext.data.Store,{constructor:function(b){Ext.data.XmlStore.superclass.constructor.call(this,Ext.apply(b,{reader:new Ext.data.XmlReader(b)}))
}});
Ext.reg("xmlstore",Ext.data.XmlStore);
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
(function(){var a=Ext.EventManager;
var b=Ext.lib.Dom;
Ext.dd.DragDrop=function(e,c,d){if(e){this.init(e,c,d)
}};
Ext.dd.DragDrop.prototype={id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true
},moveOnly:false,unlock:function(){this.locked=false
},isTarget:true,padding:null,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,b4StartDrag:function(c,d){},startDrag:function(c,d){},b4Drag:function(c){},onDrag:function(c){},onDragEnter:function(c,d){},b4DragOver:function(c){},onDragOver:function(c,d){},b4DragOut:function(c){},onDragOut:function(c,d){},b4DragDrop:function(c){},onDragDrop:function(c,d){},onInvalidDrop:function(c){},b4EndDrag:function(c){},endDrag:function(c){},b4MouseDown:function(c){},onMouseDown:function(c){},onMouseUp:function(c){},onAvailable:function(){},defaultPadding:{left:0,right:0,top:0,bottom:0},constrainTo:function(i,g,n){if(Ext.isNumber(g)){g={left:g,right:g,top:g,bottom:g}
}g=g||this.defaultPadding;
var k=Ext.get(this.getEl()).getBox(),d=Ext.get(i),m=d.getScroll(),j,e=d.dom;
if(e==document.body){j={x:m.left,y:m.top,width:Ext.lib.Dom.getViewWidth(),height:Ext.lib.Dom.getViewHeight()}
}else{var l=d.getXY();
j={x:l[0],y:l[1],width:e.clientWidth,height:e.clientHeight}
}var h=k.y-j.y,f=k.x-j.x;
this.resetConstraints();
this.setXConstraint(f-(g.left||0),j.width-f-k.width-(g.right||0),this.xTickSize);
this.setYConstraint(h-(g.top||0),j.height-h-k.height-(g.bottom||0),this.yTickSize)
},getEl:function(){if(!this._domRef){this._domRef=Ext.getDom(this.id)
}return this._domRef
},getDragEl:function(){return Ext.getDom(this.dragElId)
},init:function(e,c,d){this.initTarget(e,c,d);
a.on(this.id,"mousedown",this.handleMouseDown,this)
},initTarget:function(e,c,d){this.config=d||{};
this.DDM=Ext.dd.DDM;
this.groups={};
if(typeof e!=="string"){e=Ext.id(e)
}this.id=e;
this.addToGroup((c)?c:"default");
this.handleElId=e;
this.setDragElId(e);
this.invalidHandleTypes={A:"A"};
this.invalidHandleIds={};
this.invalidHandleClasses=[];
this.applyConfig();
this.handleOnAvailable()
},applyConfig:function(){this.padding=this.config.padding||[0,0,0,0];
this.isTarget=(this.config.isTarget!==false);
this.maintainOffset=(this.config.maintainOffset);
this.primaryButtonOnly=(this.config.primaryButtonOnly!==false)
},handleOnAvailable:function(){this.available=true;
this.resetConstraints();
this.onAvailable()
},setPadding:function(e,c,f,d){if(!c&&0!==c){this.padding=[e,e,e,e]
}else{if(!f&&0!==f){this.padding=[e,c,e,c]
}else{this.padding=[e,c,f,d]
}}},setInitPosition:function(f,e){var g=this.getEl();
if(!this.DDM.verifyEl(g)){return
}var d=f||0;
var c=e||0;
var h=b.getXY(g);
this.initPageX=h[0]-d;
this.initPageY=h[1]-c;
this.lastPageX=h[0];
this.lastPageY=h[1];
this.setStartPosition(h)
},setStartPosition:function(d){var c=d||b.getXY(this.getEl());
this.deltaSetXY=null;
this.startPageX=c[0];
this.startPageY=c[1]
},addToGroup:function(c){this.groups[c]=true;
this.DDM.regDragDrop(this,c)
},removeFromGroup:function(c){if(this.groups[c]){delete this.groups[c]
}this.DDM.removeDDFromGroup(this,c)
},setDragElId:function(c){this.dragElId=c
},setHandleElId:function(c){if(typeof c!=="string"){c=Ext.id(c)
}this.handleElId=c;
this.DDM.regHandle(this.id,c)
},setOuterHandleElId:function(c){if(typeof c!=="string"){c=Ext.id(c)
}a.on(c,"mousedown",this.handleMouseDown,this);
this.setHandleElId(c);
this.hasOuterHandles=true
},unreg:function(){a.un(this.id,"mousedown",this.handleMouseDown);
this._domRef=null;
this.DDM._remove(this)
},destroy:function(){this.unreg()
},isLocked:function(){return(this.DDM.isLocked()||this.locked)
},handleMouseDown:function(f,d){if(this.primaryButtonOnly&&f.button!=0){return
}if(this.isLocked()){return
}this.DDM.refreshCache(this.groups);
var c=new Ext.lib.Point(Ext.lib.Event.getPageX(f),Ext.lib.Event.getPageY(f));
if(!this.hasOuterHandles&&!this.DDM.isOverTarget(c,this)){}else{if(this.clickValidator(f)){this.setStartPosition();
this.b4MouseDown(f);
this.onMouseDown(f);
this.DDM.handleMouseDown(f,this);
this.DDM.stopEvent(f)
}else{}}},clickValidator:function(d){var c=d.getTarget();
return(this.isValidHandleChild(c)&&(this.id==this.handleElId||this.DDM.handleWasClicked(c,this.id)))
},addInvalidHandleType:function(c){var d=c.toUpperCase();
this.invalidHandleTypes[d]=d
},addInvalidHandleId:function(c){if(typeof c!=="string"){c=Ext.id(c)
}this.invalidHandleIds[c]=c
},addInvalidHandleClass:function(c){this.invalidHandleClasses.push(c)
},removeInvalidHandleType:function(c){var d=c.toUpperCase();
delete this.invalidHandleTypes[d]
},removeInvalidHandleId:function(c){if(typeof c!=="string"){c=Ext.id(c)
}delete this.invalidHandleIds[c]
},removeInvalidHandleClass:function(d){for(var e=0,c=this.invalidHandleClasses.length;
e<c;
++e){if(this.invalidHandleClasses[e]==d){delete this.invalidHandleClasses[e]
}}},isValidHandleChild:function(g){var f=true;
var j;
try{j=g.nodeName.toUpperCase()
}catch(h){j=g.nodeName
}f=f&&!this.invalidHandleTypes[j];
f=f&&!this.invalidHandleIds[g.id];
for(var d=0,c=this.invalidHandleClasses.length;
f&&d<c;
++d){f=!Ext.fly(g).hasClass(this.invalidHandleClasses[d])
}return f
},setXTicks:function(f,c){this.xTicks=[];
this.xTickSize=c;
var e={};
for(var d=this.initPageX;
d>=this.minX;
d=d-c){if(!e[d]){this.xTicks[this.xTicks.length]=d;
e[d]=true
}}for(d=this.initPageX;
d<=this.maxX;
d=d+c){if(!e[d]){this.xTicks[this.xTicks.length]=d;
e[d]=true
}}this.xTicks.sort(this.DDM.numericSort)
},setYTicks:function(f,c){this.yTicks=[];
this.yTickSize=c;
var e={};
for(var d=this.initPageY;
d>=this.minY;
d=d-c){if(!e[d]){this.yTicks[this.yTicks.length]=d;
e[d]=true
}}for(d=this.initPageY;
d<=this.maxY;
d=d+c){if(!e[d]){this.yTicks[this.yTicks.length]=d;
e[d]=true
}}this.yTicks.sort(this.DDM.numericSort)
},setXConstraint:function(e,d,c){this.leftConstraint=e;
this.rightConstraint=d;
this.minX=this.initPageX-e;
this.maxX=this.initPageX+d;
if(c){this.setXTicks(this.initPageX,c)
}this.constrainX=true
},clearConstraints:function(){this.constrainX=false;
this.constrainY=false;
this.clearTicks()
},clearTicks:function(){this.xTicks=null;
this.yTicks=null;
this.xTickSize=0;
this.yTickSize=0
},setYConstraint:function(c,e,d){this.topConstraint=c;
this.bottomConstraint=e;
this.minY=this.initPageY-c;
this.maxY=this.initPageY+e;
if(d){this.setYTicks(this.initPageY,d)
}this.constrainY=true
},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var d=(this.maintainOffset)?this.lastPageX-this.initPageX:0;
var c=(this.maintainOffset)?this.lastPageY-this.initPageY:0;
this.setInitPosition(d,c)
}else{this.setInitPosition()
}if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize)
}if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize)
}},getTick:function(j,f){if(!f){return j
}else{if(f[0]>=j){return f[0]
}else{for(var d=0,c=f.length;
d<c;
++d){var e=d+1;
if(f[e]&&f[e]>=j){var h=j-f[d];
var g=f[e]-j;
return(g>h)?f[d]:f[e]
}}return f[f.length-1]
}}},toString:function(){return("DragDrop "+this.id)
}}
})();
if(!Ext.dd.DragDropMgr){Ext.dd.DragDropMgr=function(){var a=Ext.EventManager;
return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,init:function(){this.initialized=true
},POINT:0,INTERSECT:1,mode:0,_execOnAll:function(d,c){for(var e in this.ids){for(var b in this.ids[e]){var f=this.ids[e][b];
if(!this.isTypeOfDD(f)){continue
}f[d].apply(f,c)
}}},_onLoad:function(){this.init();
a.on(document,"mouseup",this.handleMouseUp,this,true);
a.on(document,"mousemove",this.handleMouseMove,this,true);
a.on(window,"unload",this._onUnload,this,true);
a.on(window,"resize",this._onResize,this,true)
},_onResize:function(b){this._execOnAll("resetConstraints",[])
},lock:function(){this.locked=true
},unlock:function(){this.locked=false
},isLocked:function(){return this.locked
},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:350,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,regDragDrop:function(c,b){if(!this.initialized){this.init()
}if(!this.ids[b]){this.ids[b]={}
}this.ids[b][c.id]=c
},removeDDFromGroup:function(d,b){if(!this.ids[b]){this.ids[b]={}
}var c=this.ids[b];
if(c&&c[d.id]){delete c[d.id]
}},_remove:function(c){for(var b in c.groups){if(b&&this.ids[b]&&this.ids[b][c.id]){delete this.ids[b][c.id]
}}delete this.handleIds[c.id]
},regHandle:function(c,b){if(!this.handleIds[c]){this.handleIds[c]={}
}this.handleIds[c][b]=b
},isDragDrop:function(b){return(this.getDDById(b))?true:false
},getRelated:function(g,c){var f=[];
for(var e in g.groups){for(var d in this.ids[e]){var b=this.ids[e][d];
if(!this.isTypeOfDD(b)){continue
}if(!c||b.isTarget){f[f.length]=b
}}}return f
},isLegalTarget:function(f,e){var c=this.getRelated(f,true);
for(var d=0,b=c.length;
d<b;
++d){if(c[d].id==e.id){return true
}}return false
},isTypeOfDD:function(b){return(b&&b.__ygDragDrop)
},isHandle:function(c,b){return(this.handleIds[c]&&this.handleIds[c][b])
},getDDById:function(c){for(var b in this.ids){if(this.ids[b][c]){return this.ids[b][c]
}}return null
},handleMouseDown:function(d,c){if(Ext.QuickTips){Ext.QuickTips.ddDisable()
}if(this.dragCurrent){this.handleMouseUp(d)
}this.currentTarget=d.getTarget();
this.dragCurrent=c;
var b=c.getEl();
this.startX=d.getPageX();
this.startY=d.getPageY();
this.deltaX=this.startX-b.offsetLeft;
this.deltaY=this.startY-b.offsetTop;
this.dragThreshMet=false;
this.clickTimeout=setTimeout(function(){var e=Ext.dd.DDM;
e.startDrag(e.startX,e.startY)
},this.clickTimeThresh)
},startDrag:function(b,c){clearTimeout(this.clickTimeout);
if(this.dragCurrent){this.dragCurrent.b4StartDrag(b,c);
this.dragCurrent.startDrag(b,c)
}this.dragThreshMet=true
},handleMouseUp:function(b){if(Ext.QuickTips){Ext.QuickTips.ddEnable()
}if(!this.dragCurrent){return
}clearTimeout(this.clickTimeout);
if(this.dragThreshMet){this.fireEvents(b,true)
}else{}this.stopDrag(b);
this.stopEvent(b)
},stopEvent:function(b){if(this.stopPropagation){b.stopPropagation()
}if(this.preventDefault){b.preventDefault()
}},stopDrag:function(b){if(this.dragCurrent){if(this.dragThreshMet){this.dragCurrent.b4EndDrag(b);
this.dragCurrent.endDrag(b)
}this.dragCurrent.onMouseUp(b)
}this.dragCurrent=null;
this.dragOvers={}
},handleMouseMove:function(d){if(!this.dragCurrent){return true
}if(Ext.isIE&&(d.button!==0&&d.button!==1&&d.button!==2)){this.stopEvent(d);
return this.handleMouseUp(d)
}if(!this.dragThreshMet){var c=Math.abs(this.startX-d.getPageX());
var b=Math.abs(this.startY-d.getPageY());
if(c>this.clickPixelThresh||b>this.clickPixelThresh){this.startDrag(this.startX,this.startY)
}}if(this.dragThreshMet){this.dragCurrent.b4Drag(d);
this.dragCurrent.onDrag(d);
if(!this.dragCurrent.moveOnly){this.fireEvents(d,false)
}}this.stopEvent(d);
return true
},fireEvents:function(m,n){var p=this.dragCurrent;
if(!p||p.isLocked()){return
}var q=m.getPoint();
var b=[];
var f=[];
var k=[];
var h=[];
var d=[];
for(var g in this.dragOvers){var c=this.dragOvers[g];
if(!this.isTypeOfDD(c)){continue
}if(!this.isOverTarget(q,c,this.mode)){f.push(c)
}b[g]=true;
delete this.dragOvers[g]
}for(var o in p.groups){if("string"!=typeof o){continue
}for(g in this.ids[o]){var j=this.ids[o][g];
if(!this.isTypeOfDD(j)){continue
}if(j.isTarget&&!j.isLocked()&&((j!=p)||(p.ignoreSelf===false))){if(this.isOverTarget(q,j,this.mode)){if(n){h.push(j)
}else{if(!b[j.id]){d.push(j)
}else{k.push(j)
}this.dragOvers[j.id]=j
}}}}}if(this.mode){if(f.length){p.b4DragOut(m,f);
p.onDragOut(m,f)
}if(d.length){p.onDragEnter(m,d)
}if(k.length){p.b4DragOver(m,k);
p.onDragOver(m,k)
}if(h.length){p.b4DragDrop(m,h);
p.onDragDrop(m,h)
}}else{var l=0;
for(g=0,l=f.length;
g<l;
++g){p.b4DragOut(m,f[g].id);
p.onDragOut(m,f[g].id)
}for(g=0,l=d.length;
g<l;
++g){p.onDragEnter(m,d[g].id)
}for(g=0,l=k.length;
g<l;
++g){p.b4DragOver(m,k[g].id);
p.onDragOver(m,k[g].id)
}for(g=0,l=h.length;
g<l;
++g){p.b4DragDrop(m,h[g].id);
p.onDragDrop(m,h[g].id)
}}if(n&&!h.length){p.onInvalidDrop(m)
}},getBestMatch:function(d){var f=null;
var c=d.length;
if(c==1){f=d[0]
}else{for(var e=0;
e<c;
++e){var b=d[e];
if(b.cursorIsOver){f=b;
break
}else{if(!f||f.overlap.getArea()<b.overlap.getArea()){f=b
}}}}return f
},refreshCache:function(c){for(var b in c){if("string"!=typeof b){continue
}for(var d in this.ids[b]){var e=this.ids[b][d];
if(this.isTypeOfDD(e)){var f=this.getLocation(e);
if(f){this.locationCache[e.id]=f
}else{delete this.locationCache[e.id]
}}}}},verifyEl:function(c){if(c){var b;
if(Ext.isIE){try{b=c.offsetParent
}catch(d){}}else{b=c.offsetParent
}if(b){return true
}}return false
},getLocation:function(i){if(!this.isTypeOfDD(i)){return null
}var g=i.getEl(),n,f,d,p,o,q,c,m,h,k;
try{n=Ext.lib.Dom.getXY(g)
}catch(j){}if(!n){return null
}f=n[0];
d=f+g.offsetWidth;
p=n[1];
o=p+g.offsetHeight;
q=p-i.padding[0];
c=d+i.padding[1];
m=o+i.padding[2];
h=f-i.padding[3];
k=new Ext.lib.Region(q,c,m,h);
g=Ext.get(g.parentNode);
while(g&&k){if(g.isScrollable()){k=k.intersect(g.getRegion())
}g=g.parent()
}return k
},isOverTarget:function(j,b,d){var f=this.locationCache[b.id];
if(!f||!this.useCache){f=this.getLocation(b);
this.locationCache[b.id]=f
}if(!f){return false
}b.cursorIsOver=f.contains(j);
var i=this.dragCurrent;
if(!i||!i.getTargetCoord||(!d&&!i.constrainX&&!i.constrainY)){return b.cursorIsOver
}b.overlap=null;
var g=i.getTargetCoord(j.x,j.y);
var c=i.getDragEl();
var e=new Ext.lib.Region(g.y,g.x+c.offsetWidth,g.y+c.offsetHeight,g.x);
var h=e.intersect(f);
if(h){b.overlap=h;
return(d)?true:b.cursorIsOver
}else{return false
}},_onUnload:function(c,b){a.removeListener(document,"mouseup",this.handleMouseUp,this);
a.removeListener(document,"mousemove",this.handleMouseMove,this);
a.removeListener(window,"resize",this._onResize,this);
Ext.dd.DragDropMgr.unregAll()
},unregAll:function(){if(this.dragCurrent){this.stopDrag();
this.dragCurrent=null
}this._execOnAll("unreg",[]);
for(var b in this.elementCache){delete this.elementCache[b]
}this.elementCache={};
this.ids={}
},elementCache:{},getElWrapper:function(c){var b=this.elementCache[c];
if(!b||!b.el){b=this.elementCache[c]=new this.ElementWrapper(Ext.getDom(c))
}return b
},getElement:function(b){return Ext.getDom(b)
},getCss:function(c){var b=Ext.getDom(c);
return(b)?b.style:null
},ElementWrapper:function(b){this.el=b||null;
this.id=this.el&&b.id;
this.css=this.el&&b.style
},getPosX:function(b){return Ext.lib.Dom.getX(b)
},getPosY:function(b){return Ext.lib.Dom.getY(b)
},swapNode:function(d,b){if(d.swapNode){d.swapNode(b)
}else{var e=b.parentNode;
var c=b.nextSibling;
if(c==d){e.insertBefore(d,b)
}else{if(b==d.nextSibling){e.insertBefore(b,d)
}else{d.parentNode.replaceChild(b,d);
e.insertBefore(d,c)
}}}},getScroll:function(){var d,b,e=document.documentElement,c=document.body;
if(e&&(e.scrollTop||e.scrollLeft)){d=e.scrollTop;
b=e.scrollLeft
}else{if(c){d=c.scrollTop;
b=c.scrollLeft
}else{}}return{top:d,left:b}
},getStyle:function(c,b){return Ext.fly(c).getStyle(b)
},getScrollTop:function(){return this.getScroll().top
},getScrollLeft:function(){return this.getScroll().left
},moveToEl:function(b,d){var c=Ext.lib.Dom.getXY(d);
Ext.lib.Dom.setXY(b,c)
},numericSort:function(d,c){return(d-c)
},_timeoutCount:0,_addListeners:function(){var b=Ext.dd.DDM;
if(Ext.lib.Event&&document){b._onLoad()
}else{if(b._timeoutCount>2000){}else{setTimeout(b._addListeners,10);
if(document&&document.body){b._timeoutCount+=1
}}}},handleWasClicked:function(b,d){if(this.isHandle(d,b.id)){return true
}else{var c=b.parentNode;
while(c){if(this.isHandle(d,c.id)){return true
}else{c=c.parentNode
}}}return false
}}
}();
Ext.dd.DDM=Ext.dd.DragDropMgr;
Ext.dd.DDM._addListeners()
}Ext.dd.DD=function(c,a,b){if(c){this.init(c,a,b)
}};
Ext.extend(Ext.dd.DD,Ext.dd.DragDrop,{scroll:true,autoOffset:function(c,b){var a=c-this.startPageX;
var d=b-this.startPageY;
this.setDelta(a,d)
},setDelta:function(b,a){this.deltaX=b;
this.deltaY=a
},setDragElPos:function(c,b){var a=this.getDragEl();
this.alignElWithMouse(a,c,b)
},alignElWithMouse:function(c,g,f){var e=this.getTargetCoord(g,f);
var b=c.dom?c:Ext.fly(c,"_dd");
if(!this.deltaSetXY){var h=[e.x,e.y];
b.setXY(h);
var d=b.getLeft(true);
var a=b.getTop(true);
this.deltaSetXY=[d-e.x,a-e.y]
}else{b.setLeftTop(e.x+this.deltaSetXY[0],e.y+this.deltaSetXY[1])
}this.cachePosition(e.x,e.y);
this.autoScroll(e.x,e.y,c.offsetHeight,c.offsetWidth);
return e
},cachePosition:function(b,a){if(b){this.lastPageX=b;
this.lastPageY=a
}else{var c=Ext.lib.Dom.getXY(this.getEl());
this.lastPageX=c[0];
this.lastPageY=c[1]
}},autoScroll:function(k,j,e,l){if(this.scroll){var m=Ext.lib.Dom.getViewHeight();
var b=Ext.lib.Dom.getViewWidth();
var o=this.DDM.getScrollTop();
var d=this.DDM.getScrollLeft();
var i=e+j;
var n=l+k;
var g=(m+o-j-this.deltaY);
var f=(b+d-k-this.deltaX);
var c=40;
var a=(document.all)?80:30;
if(i>m&&g<c){window.scrollTo(d,o+a)
}if(j<o&&o>0&&j-o<c){window.scrollTo(d,o-a)
}if(n>b&&f<c){window.scrollTo(d+a,o)
}if(k<d&&d>0&&k-d<c){window.scrollTo(d-a,o)
}}},getTargetCoord:function(c,b){var a=c-this.deltaX;
var d=b-this.deltaY;
if(this.constrainX){if(a<this.minX){a=this.minX
}if(a>this.maxX){a=this.maxX
}}if(this.constrainY){if(d<this.minY){d=this.minY
}if(d>this.maxY){d=this.maxY
}}a=this.getTick(a,this.xTicks);
d=this.getTick(d,this.yTicks);
return{x:a,y:d}
},applyConfig:function(){Ext.dd.DD.superclass.applyConfig.call(this);
this.scroll=(this.config.scroll!==false)
},b4MouseDown:function(a){this.autoOffset(a.getPageX(),a.getPageY())
},b4Drag:function(a){this.setDragElPos(a.getPageX(),a.getPageY())
},toString:function(){return("DD "+this.id)
}});
Ext.dd.DDProxy=function(c,a,b){if(c){this.init(c,a,b);
this.initFrame()
}};
Ext.dd.DDProxy.dragElId="ygddfdiv";
Ext.extend(Ext.dd.DDProxy,Ext.dd.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var b=this;
var a=document.body;
if(!a||!a.firstChild){setTimeout(function(){b.createFrame()
},50);
return
}var d=this.getDragEl();
if(!d){d=document.createElement("div");
d.id=this.dragElId;
var c=d.style;
c.position="absolute";
c.visibility="hidden";
c.cursor="move";
c.border="2px solid #aaa";
c.zIndex=999;
a.insertBefore(d,a.firstChild)
}},initFrame:function(){this.createFrame()
},applyConfig:function(){Ext.dd.DDProxy.superclass.applyConfig.call(this);
this.resizeFrame=(this.config.resizeFrame!==false);
this.centerFrame=(this.config.centerFrame);
this.setDragElId(this.config.dragElId||Ext.dd.DDProxy.dragElId)
},showFrame:function(e,d){var c=this.getEl();
var a=this.getDragEl();
var b=a.style;
this._resizeProxy();
if(this.centerFrame){this.setDelta(Math.round(parseInt(b.width,10)/2),Math.round(parseInt(b.height,10)/2))
}this.setDragElPos(e,d);
Ext.fly(a).show()
},_resizeProxy:function(){if(this.resizeFrame){var a=this.getEl();
Ext.fly(this.getDragEl()).setSize(a.offsetWidth,a.offsetHeight)
}},b4MouseDown:function(b){var a=b.getPageX();
var c=b.getPageY();
this.autoOffset(a,c);
this.setDragElPos(a,c)
},b4StartDrag:function(a,b){this.showFrame(a,b)
},b4EndDrag:function(a){Ext.fly(this.getDragEl()).hide()
},endDrag:function(c){var b=this.getEl();
var a=this.getDragEl();
a.style.visibility="";
this.beforeMove();
b.style.visibility="hidden";
Ext.dd.DDM.moveToEl(b,a);
a.style.visibility="hidden";
b.style.visibility="";
this.afterDrag()
},beforeMove:function(){},afterDrag:function(){},toString:function(){return("DDProxy "+this.id)
}});
Ext.dd.DDTarget=function(c,a,b){if(c){this.initTarget(c,a,b)
}};
Ext.extend(Ext.dd.DDTarget,Ext.dd.DragDrop,{getDragEl:Ext.emptyFn,isValidHandleChild:Ext.emptyFn,startDrag:Ext.emptyFn,endDrag:Ext.emptyFn,onDrag:Ext.emptyFn,onDragDrop:Ext.emptyFn,onDragEnter:Ext.emptyFn,onDragOut:Ext.emptyFn,onDragOver:Ext.emptyFn,onInvalidDrop:Ext.emptyFn,onMouseDown:Ext.emptyFn,onMouseUp:Ext.emptyFn,setXConstraint:Ext.emptyFn,setYConstraint:Ext.emptyFn,resetConstraints:Ext.emptyFn,clearConstraints:Ext.emptyFn,clearTicks:Ext.emptyFn,setInitPosition:Ext.emptyFn,setDragElId:Ext.emptyFn,setHandleElId:Ext.emptyFn,setOuterHandleElId:Ext.emptyFn,addInvalidHandleClass:Ext.emptyFn,addInvalidHandleId:Ext.emptyFn,addInvalidHandleType:Ext.emptyFn,removeInvalidHandleClass:Ext.emptyFn,removeInvalidHandleId:Ext.emptyFn,removeInvalidHandleType:Ext.emptyFn,toString:function(){return("DDTarget "+this.id)
}});
Ext.dd.DragTracker=Ext.extend(Ext.util.Observable,{active:false,tolerance:5,autoStart:false,constructor:function(a){Ext.apply(this,a);
this.addEvents("mousedown","mouseup","mousemove","dragstart","dragend","drag");
this.dragRegion=new Ext.lib.Region(0,0,0,0);
if(this.el){this.initEl(this.el)
}Ext.dd.DragTracker.superclass.constructor.call(this,a)
},initEl:function(a){this.el=Ext.get(a);
a.on("mousedown",this.onMouseDown,this,this.delegate?{delegate:this.delegate}:undefined)
},destroy:function(){this.el.un("mousedown",this.onMouseDown,this);
delete this.el
},onMouseDown:function(b,a){if(this.fireEvent("mousedown",this,b)!==false&&this.onBeforeStart(b)!==false){this.startXY=this.lastXY=b.getXY();
this.dragTarget=this.delegate?a:this.el.dom;
if(this.preventDefault!==false){b.preventDefault()
}Ext.getDoc().on({scope:this,mouseup:this.onMouseUp,mousemove:this.onMouseMove,selectstart:this.stopSelect});
if(this.autoStart){this.timer=this.triggerStart.defer(this.autoStart===true?1000:this.autoStart,this,[b])
}}},onMouseMove:function(d,c){if(this.active&&Ext.isIE&&!d.browserEvent.button){d.preventDefault();
this.onMouseUp(d);
return
}d.preventDefault();
var b=d.getXY(),a=this.startXY;
this.lastXY=b;
if(!this.active){if(Math.abs(a[0]-b[0])>this.tolerance||Math.abs(a[1]-b[1])>this.tolerance){this.triggerStart(d)
}else{return
}}this.fireEvent("mousemove",this,d);
this.onDrag(d);
this.fireEvent("drag",this,d)
},onMouseUp:function(c){var b=Ext.getDoc(),a=this.active;
b.un("mousemove",this.onMouseMove,this);
b.un("mouseup",this.onMouseUp,this);
b.un("selectstart",this.stopSelect,this);
c.preventDefault();
this.clearStart();
this.active=false;
delete this.elRegion;
this.fireEvent("mouseup",this,c);
if(a){this.onEnd(c);
this.fireEvent("dragend",this,c)
}},triggerStart:function(a){this.clearStart();
this.active=true;
this.onStart(a);
this.fireEvent("dragstart",this,a)
},clearStart:function(){if(this.timer){clearTimeout(this.timer);
delete this.timer
}},stopSelect:function(a){a.stopEvent();
return false
},onBeforeStart:function(a){},onStart:function(a){},onDrag:function(a){},onEnd:function(a){},getDragTarget:function(){return this.dragTarget
},getDragCt:function(){return this.el
},getXY:function(a){return a?this.constrainModes[a].call(this,this.lastXY):this.lastXY
},getOffset:function(c){var b=this.getXY(c),a=this.startXY;
return[a[0]-b[0],a[1]-b[1]]
},constrainModes:{point:function(b){if(!this.elRegion){this.elRegion=this.getDragCt().getRegion()
}var a=this.dragRegion;
a.left=b[0];
a.top=b[1];
a.right=b[0];
a.bottom=b[1];
a.constrainTo(this.elRegion);
return[a.left,a.top]
}}});
Ext.dd.ScrollManager=function(){var c=Ext.dd.DragDropMgr;
var e={};
var b=null;
var h={};
var g=function(k){b=null;
a()
};
var i=function(){if(c.dragCurrent){c.refreshCache(c.dragCurrent.groups)
}};
var d=function(){if(c.dragCurrent){var k=Ext.dd.ScrollManager;
var l=h.el.ddScrollConfig?h.el.ddScrollConfig.increment:k.increment;
if(!k.animate){if(h.el.scroll(h.dir,l)){i()
}}else{h.el.scroll(h.dir,l,true,k.animDuration,i)
}}};
var a=function(){if(h.id){clearInterval(h.id)
}h.id=0;
h.el=null;
h.dir=""
};
var f=function(l,k){a();
h.el=l;
h.dir=k;
var n=l.ddScrollConfig?l.ddScrollConfig.ddGroup:undefined,m=(l.ddScrollConfig&&l.ddScrollConfig.frequency)?l.ddScrollConfig.frequency:Ext.dd.ScrollManager.frequency;
if(n===undefined||c.dragCurrent.ddGroup==n){h.id=setInterval(d,m)
}};
var j=function(n,p){if(p||!c.dragCurrent){return
}var q=Ext.dd.ScrollManager;
if(!b||b!=c.dragCurrent){b=c.dragCurrent;
q.refreshCache()
}var s=Ext.lib.Event.getXY(n);
var t=new Ext.lib.Point(s[0],s[1]);
for(var l in e){var m=e[l],k=m._region;
var o=m.ddScrollConfig?m.ddScrollConfig:q;
if(k&&k.contains(t)&&m.isScrollable()){if(k.bottom-t.y<=o.vthresh){if(h.el!=m){f(m,"down")
}return
}else{if(k.right-t.x<=o.hthresh){if(h.el!=m){f(m,"left")
}return
}else{if(t.y-k.top<=o.vthresh){if(h.el!=m){f(m,"up")
}return
}else{if(t.x-k.left<=o.hthresh){if(h.el!=m){f(m,"right")
}return
}}}}}}a()
};
c.fireEvents=c.fireEvents.createSequence(j,c);
c.stopDrag=c.stopDrag.createSequence(g,c);
return{register:function(m){if(Ext.isArray(m)){for(var l=0,k=m.length;
l<k;
l++){this.register(m[l])
}}else{m=Ext.get(m);
e[m.id]=m
}},unregister:function(m){if(Ext.isArray(m)){for(var l=0,k=m.length;
l<k;
l++){this.unregister(m[l])
}}else{m=Ext.get(m);
delete e[m.id]
}},vthresh:25,hthresh:25,increment:100,frequency:500,animate:true,animDuration:0.4,ddGroup:undefined,refreshCache:function(){for(var k in e){if(typeof e[k]=="object"){e[k]._region=e[k].getRegion()
}}}}
}();
Ext.dd.Registry=function(){var d={};
var b={};
var a=0;
var c=function(f,e){if(typeof f=="string"){return f
}var g=f.id;
if(!g&&e!==false){g="extdd-"+(++a);
f.id=g
}return g
};
return{register:function(h,j){j=j||{};
if(typeof h=="string"){h=document.getElementById(h)
}j.ddel=h;
d[c(h)]=j;
if(j.isHandle!==false){b[j.ddel.id]=j
}if(j.handles){var g=j.handles;
for(var f=0,e=g.length;
f<e;
f++){b[c(g[f])]=j
}}},unregister:function(h){var k=c(h,false);
var j=d[k];
if(j){delete d[k];
if(j.handles){var g=j.handles;
for(var f=0,e=g.length;
f<e;
f++){delete b[c(g[f],false)]
}}}},getHandle:function(e){if(typeof e!="string"){e=e.id
}return b[e]
},getHandleFromEvent:function(g){var f=Ext.lib.Event.getTarget(g);
return f?b[f.id]:null
},getTarget:function(e){if(typeof e!="string"){e=e.id
}return d[e]
},getTargetFromEvent:function(g){var f=Ext.lib.Event.getTarget(g);
return f?d[f.id]||b[f.id]:null
}}
}();
Ext.dd.StatusProxy=function(a){Ext.apply(this,a);
this.id=this.id||Ext.id();
this.el=new Ext.Layer({dh:{id:this.id,tag:"div",cls:"x-dd-drag-proxy "+this.dropNotAllowed,children:[{tag:"div",cls:"x-dd-drop-icon"},{tag:"div",cls:"x-dd-drag-ghost"}]},shadow:!a||a.shadow!==false});
this.ghost=Ext.get(this.el.dom.childNodes[1]);
this.dropStatus=this.dropNotAllowed
};
Ext.dd.StatusProxy.prototype={dropAllowed:"x-dd-drop-ok",dropNotAllowed:"x-dd-drop-nodrop",setStatus:function(a){a=a||this.dropNotAllowed;
if(this.dropStatus!=a){this.el.replaceClass(this.dropStatus,a);
this.dropStatus=a
}},reset:function(a){this.el.dom.className="x-dd-drag-proxy "+this.dropNotAllowed;
this.dropStatus=this.dropNotAllowed;
if(a){this.ghost.update("")
}},update:function(a){if(typeof a=="string"){this.ghost.update(a)
}else{this.ghost.update("");
a.style.margin="0";
this.ghost.dom.appendChild(a)
}var b=this.ghost.dom.firstChild;
if(b){Ext.fly(b).setStyle("float","none")
}},getEl:function(){return this.el
},getGhost:function(){return this.ghost
},hide:function(a){this.el.hide();
if(a){this.reset(true)
}},stop:function(){if(this.anim&&this.anim.isAnimated&&this.anim.isAnimated()){this.anim.stop()
}},show:function(){this.el.show()
},sync:function(){this.el.sync()
},repair:function(b,c,a){this.callback=c;
this.scope=a;
if(b&&this.animRepair!==false){this.el.addClass("x-dd-drag-repair");
this.el.hideUnders(true);
this.anim=this.el.shift({duration:this.repairDuration||0.5,easing:"easeOut",xy:b,stopFx:true,callback:this.afterRepair,scope:this})
}else{this.afterRepair()
}},afterRepair:function(){this.hide(true);
if(typeof this.callback=="function"){this.callback.call(this.scope||this)
}this.callback=null;
this.scope=null
},destroy:function(){Ext.destroy(this.ghost,this.el)
}};
Ext.dd.DragSource=function(b,a){this.el=Ext.get(b);
if(!this.dragData){this.dragData={}
}Ext.apply(this,a);
if(!this.proxy){this.proxy=new Ext.dd.StatusProxy()
}Ext.dd.DragSource.superclass.constructor.call(this,this.el.dom,this.ddGroup||this.group,{dragElId:this.proxy.id,resizeFrame:false,isTarget:false,scroll:this.scroll===true});
this.dragging=false
};
Ext.extend(Ext.dd.DragSource,Ext.dd.DDProxy,{dropAllowed:"x-dd-drop-ok",dropNotAllowed:"x-dd-drop-nodrop",getDragData:function(a){return this.dragData
},onDragEnter:function(c,d){var b=Ext.dd.DragDropMgr.getDDById(d);
this.cachedTarget=b;
if(this.beforeDragEnter(b,c,d)!==false){if(b.isNotifyTarget){var a=b.notifyEnter(this,c,this.dragData);
this.proxy.setStatus(a)
}else{this.proxy.setStatus(this.dropAllowed)
}if(this.afterDragEnter){this.afterDragEnter(b,c,d)
}}},beforeDragEnter:function(b,a,c){return true
},alignElWithMouse:function(){Ext.dd.DragSource.superclass.alignElWithMouse.apply(this,arguments);
this.proxy.sync()
},onDragOver:function(c,d){var b=this.cachedTarget||Ext.dd.DragDropMgr.getDDById(d);
if(this.beforeDragOver(b,c,d)!==false){if(b.isNotifyTarget){var a=b.notifyOver(this,c,this.dragData);
this.proxy.setStatus(a)
}if(this.afterDragOver){this.afterDragOver(b,c,d)
}}},beforeDragOver:function(b,a,c){return true
},onDragOut:function(b,c){var a=this.cachedTarget||Ext.dd.DragDropMgr.getDDById(c);
if(this.beforeDragOut(a,b,c)!==false){if(a.isNotifyTarget){a.notifyOut(this,b,this.dragData)
}this.proxy.reset();
if(this.afterDragOut){this.afterDragOut(a,b,c)
}}this.cachedTarget=null
},beforeDragOut:function(b,a,c){return true
},onDragDrop:function(b,c){var a=this.cachedTarget||Ext.dd.DragDropMgr.getDDById(c);
if(this.beforeDragDrop(a,b,c)!==false){if(a.isNotifyTarget){if(a.notifyDrop(this,b,this.dragData)){this.onValidDrop(a,b,c)
}else{this.onInvalidDrop(a,b,c)
}}else{this.onValidDrop(a,b,c)
}if(this.afterDragDrop){this.afterDragDrop(a,b,c)
}}delete this.cachedTarget
},beforeDragDrop:function(b,a,c){return true
},onValidDrop:function(b,a,c){this.hideProxy();
if(this.afterValidDrop){this.afterValidDrop(b,a,c)
}},getRepairXY:function(b,a){return this.el.getXY()
},onInvalidDrop:function(b,a,c){this.beforeInvalidDrop(b,a,c);
if(this.cachedTarget){if(this.cachedTarget.isNotifyTarget){this.cachedTarget.notifyOut(this,a,this.dragData)
}this.cacheTarget=null
}this.proxy.repair(this.getRepairXY(a,this.dragData),this.afterRepair,this);
if(this.afterInvalidDrop){this.afterInvalidDrop(a,c)
}},afterRepair:function(){if(Ext.enableFx){this.el.highlight(this.hlColor||"c3daf9")
}this.dragging=false
},beforeInvalidDrop:function(b,a,c){return true
},handleMouseDown:function(b){if(this.dragging){return
}var a=this.getDragData(b);
if(a&&this.onBeforeDrag(a,b)!==false){this.dragData=a;
this.proxy.stop();
Ext.dd.DragSource.superclass.handleMouseDown.apply(this,arguments)
}},onBeforeDrag:function(a,b){return true
},onStartDrag:Ext.emptyFn,startDrag:function(a,b){this.proxy.reset();
this.dragging=true;
this.proxy.update("");
this.onInitDrag(a,b);
this.proxy.show()
},onInitDrag:function(a,c){var b=this.el.dom.cloneNode(true);
b.id=Ext.id();
this.proxy.update(b);
this.onStartDrag(a,c);
return true
},getProxy:function(){return this.proxy
},hideProxy:function(){this.proxy.hide();
this.proxy.reset(true);
this.dragging=false
},triggerCacheRefresh:function(){Ext.dd.DDM.refreshCache(this.groups)
},b4EndDrag:function(a){},endDrag:function(a){this.onEndDrag(this.dragData,a)
},onEndDrag:function(a,b){},autoOffset:function(a,b){this.setDelta(-12,-20)
},destroy:function(){Ext.dd.DragSource.superclass.destroy.call(this);
Ext.destroy(this.proxy)
}});
Ext.dd.DropTarget=Ext.extend(Ext.dd.DDTarget,{constructor:function(b,a){this.el=Ext.get(b);
Ext.apply(this,a);
if(this.containerScroll){Ext.dd.ScrollManager.register(this.el)
}Ext.dd.DropTarget.superclass.constructor.call(this,this.el.dom,this.ddGroup||this.group,{isTarget:true})
},dropAllowed:"x-dd-drop-ok",dropNotAllowed:"x-dd-drop-nodrop",isTarget:true,isNotifyTarget:true,notifyEnter:function(a,c,b){if(this.overClass){this.el.addClass(this.overClass)
}return this.dropAllowed
},notifyOver:function(a,c,b){return this.dropAllowed
},notifyOut:function(a,c,b){if(this.overClass){this.el.removeClass(this.overClass)
}},notifyDrop:function(a,c,b){return false
},destroy:function(){Ext.dd.DropTarget.superclass.destroy.call(this);
if(this.containerScroll){Ext.dd.ScrollManager.unregister(this.el)
}}});
Ext.dd.DragZone=Ext.extend(Ext.dd.DragSource,{constructor:function(b,a){Ext.dd.DragZone.superclass.constructor.call(this,b,a);
if(this.containerScroll){Ext.dd.ScrollManager.register(this.el)
}},getDragData:function(a){return Ext.dd.Registry.getHandleFromEvent(a)
},onInitDrag:function(a,b){this.proxy.update(this.dragData.ddel.cloneNode(true));
this.onStartDrag(a,b);
return true
},afterRepair:function(){if(Ext.enableFx){Ext.Element.fly(this.dragData.ddel).highlight(this.hlColor||"c3daf9")
}this.dragging=false
},getRepairXY:function(a){return Ext.Element.fly(this.dragData.ddel).getXY()
},destroy:function(){Ext.dd.DragZone.superclass.destroy.call(this);
if(this.containerScroll){Ext.dd.ScrollManager.unregister(this.el)
}}});
Ext.dd.DropZone=function(b,a){Ext.dd.DropZone.superclass.constructor.call(this,b,a)
};
Ext.extend(Ext.dd.DropZone,Ext.dd.DropTarget,{getTargetFromEvent:function(a){return Ext.dd.Registry.getTargetFromEvent(a)
},onNodeEnter:function(d,a,c,b){},onNodeOver:function(d,a,c,b){return this.dropAllowed
},onNodeOut:function(d,a,c,b){},onNodeDrop:function(d,a,c,b){return false
},onContainerOver:function(a,c,b){return this.dropNotAllowed
},onContainerDrop:function(a,c,b){return false
},notifyEnter:function(a,c,b){return this.dropNotAllowed
},notifyOver:function(a,c,b){var d=this.getTargetFromEvent(c);
if(!d){if(this.lastOverNode){this.onNodeOut(this.lastOverNode,a,c,b);
this.lastOverNode=null
}return this.onContainerOver(a,c,b)
}if(this.lastOverNode!=d){if(this.lastOverNode){this.onNodeOut(this.lastOverNode,a,c,b)
}this.onNodeEnter(d,a,c,b);
this.lastOverNode=d
}return this.onNodeOver(d,a,c,b)
},notifyOut:function(a,c,b){if(this.lastOverNode){this.onNodeOut(this.lastOverNode,a,c,b);
this.lastOverNode=null
}},notifyDrop:function(a,c,b){if(this.lastOverNode){this.onNodeOut(this.lastOverNode,a,c,b);
this.lastOverNode=null
}var d=this.getTargetFromEvent(c);
return d?this.onNodeDrop(d,a,c,b):this.onContainerDrop(a,c,b)
},triggerCacheRefresh:function(){Ext.dd.DDM.refreshCache(this.groups)
}});
Ext.Element.addMethods({initDD:function(c,b,d){var a=new Ext.dd.DD(Ext.id(this.dom),c,b);
return Ext.apply(a,d)
},initDDProxy:function(c,b,d){var a=new Ext.dd.DDProxy(Ext.id(this.dom),c,b);
return Ext.apply(a,d)
},initDDTarget:function(c,b,d){var a=new Ext.dd.DDTarget(Ext.id(this.dom),c,b);
return Ext.apply(a,d)
}});
Ext.ux.MultiMonthCalendar=Ext.extend(Ext.Component,{minDate:null,maxDate:null,minText:"This date is before the minimum date",maxText:"This date is after the maximum date",format:"m/d/y",disabledDays:null,disabledDaysText:"",disabledDatesRE:null,disabledDatesText:"",constrainToViewport:true,monthNames:Date.monthNames,dayNames:Date.dayNames,nextText:"Next Month",prevText:"Previous Month",startDay:0,noOfMonth:2,eventDates:null,noOfMonthPerRow:3,initComponent:function(){Ext.ux.MultiMonthCalendar.superclass.initComponent.call(this);
this.value=this.value?this.value.clearTime():new Date().clearTime();
this.initDisabledDays();
this.noOfMonthPerRow=this.noOfMonthPerRow>this.noOfMonth?this.noOfMonth:this.noOfMonthPerRow;
this.addEvents("select");
if(this.handler){this.on("select",this.handler,this.scope||this)
}},initDisabledDays:function(){if(!this.disabledDatesRE&&this.disabledDates){var a=this.disabledDates;
var c="(?:";
for(var b=0;
b<a.length;
b++){c+=a[b];
if(b!=a.length-1){c+="|"
}}this.disabledDatesRE=new RegExp(c+")")
}},setValue:function(b){var a=this.value;
this.value=b.clearTime(true);
if(this.el){this.update(this.value)
}},getValue:function(){return this.value
},focus:function(){if(this.el){this.update(this.activeDate)
}},onRender:function(container,position){var m=["<table cellspacing='0'>"];
if(this.noOfMonthPerRow>1){m.push("<tr><td class='x-date-left'><a href='#' title='",this.prevText,"'> </a></td>");
m.push("<td class='x-date-left' colspan='"+eval(this.noOfMonthPerRow*2-3)+"'></td>");
m.push("<td class='x-date-right'><a href='#' title='",this.nextText,"'> </a></td></tr><tr>")
}else{m.push("<tr><td><table cellspacing='0' width='100%'><tr><td class='x-date-left'><a href='#' title='",this.prevText,"'> </a></td>");
m.push("<td class='x-date-right'><a href='#' title='",this.nextText,"'> </a></td></tr></table></td></tr><tr>")
}for(var x=0;
x<this.noOfMonth;
x++){m.push("<td><table border='1' cellspacing='0'><tr>");
m.push("<td class='x-date-middle' align='center'><span id='monthLabel"+x+"'></span></td>");
m.push("</tr><tr><td><table class='x-date-inner' id='inner-date"+x+"' cellspacing='0'><thead><tr>");
var dn=this.dayNames;
for(var i=0;
i<7;
i++){var d=this.startDay+i;
if(d>6){d=d-7
}m.push("<th><span>",dn[d].substr(0,1),"</span></th>")
}m[m.length]="</tr></thead><tbody><tr>";
for(var i=0;
i<42;
i++){if(i%7==0&&i!=0){m[m.length]="</tr><tr>"
}m[m.length]='<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>'
}m[m.length]="</tr></tbody></table></td></tr></table></td>";
if(x!=this.noOfMonth-1){m[m.length]="<td width='3'></td>"
}if((x+1)%this.noOfMonthPerRow==0&&x!=0){m[m.length]="</tr><tr>"
}}m[m.length]="</tr></table>";
var el=document.createElement("div");
el.className="x-date-picker";
el.innerHTML=m.join("");
container.dom.insertBefore(el,position);
this.el=Ext.get(el);
this.eventEl=Ext.get(el.firstChild);
new Ext.util.ClickRepeater(this.el.child("td.x-date-left a"),{handler:this.showPrevMonth,scope:this,preventDefault:true,stopDefault:true});
new Ext.util.ClickRepeater(this.el.child("td.x-date-right a"),{handler:this.showNextMonth,scope:this,preventDefault:true,stopDefault:true});
var kn=new Ext.KeyNav(this.eventEl,{left:function(e){e.ctrlKey?this.showPrevMonth():this.update(this.activeDate.add("d",-1))
},right:function(e){e.ctrlKey?this.showNextMonth():this.update(this.activeDate.add("d",1))
},pageUp:function(e){this.showNextMonth()
},pageDown:function(e){this.showPrevMonth()
},enter:function(e){e.stopPropagation();
return true
},scope:this});
this.eventEl.on("click",this.handleDateClick,this,{delegate:"a.x-date-date"});
this.cellsArray=new Array();
this.textNodesArray=new Array();
for(var x=0;
x<this.noOfMonth;
x++){var cells=Ext.get("inner-date"+x).select("tbody td");
var textNodes=Ext.get("inner-date"+x).query("tbody span");
this.cellsArray[x]=cells;
this.textNodesArray[x]=textNodes
}if(Ext.isIE){this.el.repaint()
}this.update(this.value)
},showPrevMonth:function(a){this.update(this.activeDate.add("mo",-1))
},showNextMonth:function(a){this.update(this.activeDate.add("mo",1))
},handleDateClick:function(b,a){b.stopEvent();
if(a.dateValue&&!Ext.fly(a.parentNode).hasClass("x-date-disabled")){this.setValue(new Date(a.dateValue));
this.fireEvent("select",this,this.value)
}},update:function(v){this.activeDate=v;
for(var j=0;
j<this.noOfMonth;
j++){var g=v.getDaysInMonth();
var l=v.getFirstDateOfMonth();
var b=l.getDay()-this.startDay;
if(b<=this.startDay){b+=7
}var t=v.add("mo",-1);
var e=t.getDaysInMonth()-b;
var a=this.cellsArray[j].elements;
var m=this.textNodesArray[j];
g+=b;
var q=86400000;
var u=(new Date(t.getFullYear(),t.getMonth(),e)).clearTime();
var o=this.minDate?this.minDate.clearTime():Number.NEGATIVE_INFINITY;
var r=this.maxDate?this.maxDate.clearTime():Number.POSITIVE_INFINITY;
var z=this.disabledDatesRE;
var n=this.disabledDatesText;
var B=this.disabledDays?this.disabledDays.join(""):false;
var y=this.disabledDaysText;
var s=this.format;
var h=function(C,d){d.title="";
var i=u.getTime();
d.firstChild.dateValue=i;
if(i<o){d.className=" x-date-disabled";
d.title=C.minText;
return
}if(i>r){d.className=" x-date-disabled";
d.title=C.maxText;
return
}if(B){if(B.indexOf(u.getDay())!=-1){d.title=y;
d.className=" x-date-disabled"
}}if(z&&s){var w=u.dateFormat(s);
if(z.test(w)){d.title=n.replace("%0",w);
d.className=" x-date-disabled"
}}if(C.eventDates&&(d.className.indexOf("x-date-active")!=-1)){for(var D=0;
D<C.eventDates.length;
D++){var x=C.eventDates[D].clearTime().getTime();
if(i==x){d.className+=" x-date-selected";
break
}}}};
var p=0;
for(;
p<b;
p++){m[p].innerHTML=(++e);
u.setDate(u.getDate()+1);
a[p].className="x-date-prevday";
h(this,a[p])
}for(;
p<g;
p++){intDay=p-b+1;
m[p].innerHTML=(intDay);
u.setDate(u.getDate()+1);
a[p].className="x-date-active";
h(this,a[p])
}var A=0;
for(;
p<42;
p++){m[p].innerHTML=(++A);
u.setDate(u.getDate()+1);
a[p].className="x-date-nextday";
h(this,a[p])
}var c=Ext.get("monthLabel"+j);
c.update(this.monthNames[v.getMonth()]+" "+v.getFullYear());
if(!this.internalRender){var f=this.el.dom.firstChild;
var k=f.offsetWidth;
this.el.setWidth(k+this.el.getBorderWidth("lr"));
Ext.fly(f).setWidth(k);
this.internalRender=true;
if(Ext.isOpera&&!this.secondPass){f.rows[0].cells[1].style.width=(k-(f.rows[0].cells[0].offsetWidth+f.rows[0].cells[2].offsetWidth))+"px";
this.secondPass=true;
this.update.defer(10,this,[v])
}}v=v.add("mo",1)
}}});
Ext.reg("mmcalendar",Ext.ux.MultiMonthCalendar);
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.Button=Ext.extend(Ext.BoxComponent,{hidden:false,disabled:false,pressed:false,enableToggle:false,menuAlign:"tl-bl?",type:"button",menuClassTarget:"tr:nth(2)",clickEvent:"click",handleMouseEvents:true,tooltipType:"qtip",buttonSelector:"button:first-child",scale:"small",iconAlign:"left",arrowAlign:"right",initComponent:function(){if(this.menu){if(Ext.isArray(this.menu)){this.menu={items:this.menu}
}if(Ext.isObject(this.menu)){this.menu.ownerCt=this
}this.menu=Ext.menu.MenuMgr.get(this.menu);
this.menu.ownerCt=undefined
}Ext.Button.superclass.initComponent.call(this);
this.addEvents("click","toggle","mouseover","mouseout","menushow","menuhide","menutriggerover","menutriggerout");
if(Ext.isString(this.toggleGroup)){this.enableToggle=true
}},getTemplateArgs:function(){return[this.type,"x-btn-"+this.scale+" x-btn-icon-"+this.scale+"-"+this.iconAlign,this.getMenuClass(),this.cls,this.id]
},setButtonClass:function(){if(this.useSetClass){if(!Ext.isEmpty(this.oldCls)){this.el.removeClass([this.oldCls,"x-btn-pressed"])
}this.oldCls=(this.iconCls||this.icon)?(this.text?"x-btn-text-icon":"x-btn-icon"):"x-btn-noicon";
this.el.addClass([this.oldCls,this.pressed?"x-btn-pressed":null])
}},getMenuClass:function(){return this.menu?(this.arrowAlign!="bottom"?"x-btn-arrow":"x-btn-arrow-bottom"):""
},onRender:function(c,a){if(!this.template){if(!Ext.Button.buttonTemplate){Ext.Button.buttonTemplate=new Ext.Template('<table id="{4}" cellspacing="0" class="x-btn {3}"><tbody class="{1}">','<tr><td class="x-btn-tl"><i>&#160;</i></td><td class="x-btn-tc"></td><td class="x-btn-tr"><i>&#160;</i></td></tr>','<tr><td class="x-btn-ml"><i>&#160;</i></td><td class="x-btn-mc"><em class="{2}" unselectable="on"><button type="{0}"></button></em></td><td class="x-btn-mr"><i>&#160;</i></td></tr>','<tr><td class="x-btn-bl"><i>&#160;</i></td><td class="x-btn-bc"></td><td class="x-btn-br"><i>&#160;</i></td></tr>',"</tbody></table>");
Ext.Button.buttonTemplate.compile()
}this.template=Ext.Button.buttonTemplate
}var b,d=this.getTemplateArgs();
if(a){b=this.template.insertBefore(a,d,true)
}else{b=this.template.append(c,d,true)
}this.btnEl=b.child(this.buttonSelector);
this.mon(this.btnEl,{scope:this,focus:this.onFocus,blur:this.onBlur});
this.initButtonEl(b,this.btnEl);
Ext.ButtonToggleMgr.register(this)
},initButtonEl:function(b,c){this.el=b;
this.setIcon(this.icon);
this.setText(this.text);
this.setIconClass(this.iconCls);
if(Ext.isDefined(this.tabIndex)){c.dom.tabIndex=this.tabIndex
}if(this.tooltip){this.setTooltip(this.tooltip,true)
}if(this.handleMouseEvents){this.mon(b,{scope:this,mouseover:this.onMouseOver,mousedown:this.onMouseDown})
}if(this.menu){this.mon(this.menu,{scope:this,show:this.onMenuShow,hide:this.onMenuHide})
}if(this.repeat){var a=new Ext.util.ClickRepeater(b,Ext.isObject(this.repeat)?this.repeat:{});
this.mon(a,"click",this.onRepeatClick,this)
}else{this.mon(b,this.clickEvent,this.onClick,this)
}},afterRender:function(){Ext.Button.superclass.afterRender.call(this);
this.useSetClass=true;
this.setButtonClass();
this.doc=Ext.getDoc();
this.doAutoWidth()
},setIconClass:function(a){this.iconCls=a;
if(this.el){this.btnEl.dom.className="";
this.btnEl.addClass(["x-btn-text",a||""]);
this.setButtonClass()
}return this
},setTooltip:function(b,a){if(this.rendered){if(!a){this.clearTip()
}if(Ext.isObject(b)){Ext.QuickTips.register(Ext.apply({target:this.btnEl.id},b));
this.tooltip=b
}else{this.btnEl.dom[this.tooltipType]=b
}}else{this.tooltip=b
}return this
},clearTip:function(){if(Ext.isObject(this.tooltip)){Ext.QuickTips.unregister(this.btnEl)
}},beforeDestroy:function(){if(this.rendered){this.clearTip()
}if(this.menu&&this.destroyMenu!==false){Ext.destroy(this.btnEl,this.menu)
}Ext.destroy(this.repeater)
},onDestroy:function(){if(this.rendered){this.doc.un("mouseover",this.monitorMouseOver,this);
this.doc.un("mouseup",this.onMouseUp,this);
delete this.doc;
delete this.btnEl;
Ext.ButtonToggleMgr.unregister(this)
}Ext.Button.superclass.onDestroy.call(this)
},doAutoWidth:function(){if(this.autoWidth!==false&&this.el&&this.text&&this.width===undefined){this.el.setWidth("auto");
if(Ext.isIE7&&Ext.isStrict){var a=this.btnEl;
if(a&&a.getWidth()>20){a.clip();
a.setWidth(Ext.util.TextMetrics.measure(a,this.text).width+a.getFrameWidth("lr"))
}}if(this.minWidth){if(this.el.getWidth()<this.minWidth){this.el.setWidth(this.minWidth)
}}}},setHandler:function(b,a){this.handler=b;
this.scope=a;
return this
},setText:function(a){this.text=a;
if(this.el){this.btnEl.update(a||"&#160;");
this.setButtonClass()
}this.doAutoWidth();
return this
},setIcon:function(a){this.icon=a;
if(this.el){this.btnEl.setStyle("background-image",a?"url("+a+")":"");
this.setButtonClass()
}return this
},getText:function(){return this.text
},toggle:function(b,a){b=b===undefined?!this.pressed:!!b;
if(b!=this.pressed){if(this.rendered){this.el[b?"addClass":"removeClass"]("x-btn-pressed")
}this.pressed=b;
if(!a){this.fireEvent("toggle",this,b);
if(this.toggleHandler){this.toggleHandler.call(this.scope||this,this,b)
}}}return this
},onDisable:function(){this.onDisableChange(true)
},onEnable:function(){this.onDisableChange(false)
},onDisableChange:function(a){if(this.el){if(!Ext.isIE6||!this.text){this.el[a?"addClass":"removeClass"](this.disabledClass)
}this.el.dom.disabled=a
}this.disabled=a
},showMenu:function(){if(this.rendered&&this.menu){if(this.tooltip){Ext.QuickTips.getQuickTip().cancelShow(this.btnEl)
}if(this.menu.isVisible()){this.menu.hide()
}this.menu.ownerCt=this;
this.menu.show(this.el,this.menuAlign)
}return this
},hideMenu:function(){if(this.hasVisibleMenu()){this.menu.hide()
}return this
},hasVisibleMenu:function(){return this.menu&&this.menu.ownerCt==this&&this.menu.isVisible()
},onRepeatClick:function(a,b){this.onClick(b)
},onClick:function(a){if(a){a.preventDefault()
}if(a.button!==0){return
}if(!this.disabled){this.doToggle();
if(this.menu&&!this.hasVisibleMenu()&&!this.ignoreNextClick){this.showMenu()
}this.fireEvent("click",this,a);
if(this.handler){this.handler.call(this.scope||this,this,a)
}}},doToggle:function(){if(this.enableToggle&&(this.allowDepress!==false||!this.pressed)){this.toggle()
}},isMenuTriggerOver:function(b,a){return this.menu&&!a
},isMenuTriggerOut:function(b,a){return this.menu&&!a
},onMouseOver:function(b){if(!this.disabled){var a=b.within(this.el,true);
if(!a){this.el.addClass("x-btn-over");
if(!this.monitoringMouseOver){this.doc.on("mouseover",this.monitorMouseOver,this);
this.monitoringMouseOver=true
}this.fireEvent("mouseover",this,b)
}if(this.isMenuTriggerOver(b,a)){this.fireEvent("menutriggerover",this,this.menu,b)
}}},monitorMouseOver:function(a){if(a.target!=this.el.dom&&!a.within(this.el)){if(this.monitoringMouseOver){this.doc.un("mouseover",this.monitorMouseOver,this);
this.monitoringMouseOver=false
}this.onMouseOut(a)
}},onMouseOut:function(b){var a=b.within(this.el)&&b.target!=this.el.dom;
this.el.removeClass("x-btn-over");
this.fireEvent("mouseout",this,b);
if(this.isMenuTriggerOut(b,a)){this.fireEvent("menutriggerout",this,this.menu,b)
}},focus:function(){this.btnEl.focus()
},blur:function(){this.btnEl.blur()
},onFocus:function(a){if(!this.disabled){this.el.addClass("x-btn-focus")
}},onBlur:function(a){this.el.removeClass("x-btn-focus")
},getClickEl:function(b,a){return this.el
},onMouseDown:function(a){if(!this.disabled&&a.button===0){this.getClickEl(a).addClass("x-btn-click");
this.doc.on("mouseup",this.onMouseUp,this)
}},onMouseUp:function(a){if(a.button===0){this.getClickEl(a,true).removeClass("x-btn-click");
this.doc.un("mouseup",this.onMouseUp,this)
}},onMenuShow:function(a){if(this.menu.ownerCt==this){this.menu.ownerCt=this;
this.ignoreNextClick=0;
this.el.addClass("x-btn-menu-active");
this.fireEvent("menushow",this,this.menu)
}},onMenuHide:function(a){if(this.menu.ownerCt==this){this.el.removeClass("x-btn-menu-active");
this.ignoreNextClick=this.restoreClick.defer(250,this);
this.fireEvent("menuhide",this,this.menu);
delete this.menu.ownerCt
}},restoreClick:function(){this.ignoreNextClick=0
}});
Ext.reg("button",Ext.Button);
Ext.ButtonToggleMgr=function(){var a={};
function b(e,h){if(h){var f=a[e.toggleGroup];
for(var d=0,c=f.length;
d<c;
d++){if(f[d]!=e){f[d].toggle(false)
}}}}return{register:function(c){if(!c.toggleGroup){return
}var d=a[c.toggleGroup];
if(!d){d=a[c.toggleGroup]=[]
}d.push(c);
c.on("toggle",b)
},unregister:function(c){if(!c.toggleGroup){return
}var d=a[c.toggleGroup];
if(d){d.remove(c);
c.un("toggle",b)
}},getPressed:function(f){var e=a[f];
if(e){for(var d=0,c=e.length;
d<c;
d++){if(e[d].pressed===true){return e[d]
}}}return null
}}
}();
Ext.SplitButton=Ext.extend(Ext.Button,{arrowSelector:"em",split:true,initComponent:function(){Ext.SplitButton.superclass.initComponent.call(this);
this.addEvents("arrowclick")
},onRender:function(){Ext.SplitButton.superclass.onRender.apply(this,arguments);
if(this.arrowTooltip){this.el.child(this.arrowSelector).dom[this.tooltipType]=this.arrowTooltip
}},setArrowHandler:function(b,a){this.arrowHandler=b;
this.scope=a
},getMenuClass:function(){return"x-btn-split"+(this.arrowAlign=="bottom"?"-bottom":"")
},isClickOnArrow:function(c){if(this.arrowAlign!="bottom"){var b=this.el.child("em.x-btn-split");
var a=b.getRegion().right-b.getPadding("r");
return c.getPageX()>a
}else{return c.getPageY()>this.btnEl.getRegion().bottom
}},onClick:function(b,a){b.preventDefault();
if(!this.disabled){if(this.isClickOnArrow(b)){if(this.menu&&!this.menu.isVisible()&&!this.ignoreNextClick){this.showMenu()
}this.fireEvent("arrowclick",this,b);
if(this.arrowHandler){this.arrowHandler.call(this.scope||this,this,b)
}}else{this.doToggle();
this.fireEvent("click",this,b);
if(this.handler){this.handler.call(this.scope||this,this,b)
}}}},isMenuTriggerOver:function(a){return this.menu&&a.target.tagName==this.arrowSelector
},isMenuTriggerOut:function(b,a){return this.menu&&b.target.tagName!=this.arrowSelector
}});
Ext.reg("splitbutton",Ext.SplitButton);
Ext.CycleButton=Ext.extend(Ext.SplitButton,{getItemText:function(a){if(a&&this.showText===true){var b="";
if(this.prependText){b+=this.prependText
}b+=a.text;
return b
}return undefined
},setActiveItem:function(c,a){if(!Ext.isObject(c)){c=this.menu.getComponent(c)
}if(c){if(!this.rendered){this.text=this.getItemText(c);
this.iconCls=c.iconCls
}else{var b=this.getItemText(c);
if(b){this.setText(b)
}this.setIconClass(c.iconCls)
}this.activeItem=c;
if(!c.checked){c.setChecked(true,a)
}if(this.forceIcon){this.setIconClass(this.forceIcon)
}if(!a){this.fireEvent("change",this,c)
}}},getActiveItem:function(){return this.activeItem
},initComponent:function(){this.addEvents("change");
if(this.changeHandler){this.on("change",this.changeHandler,this.scope||this);
delete this.changeHandler
}this.itemCount=this.items.length;
this.menu={cls:"x-cycle-menu",items:[]};
var a=0;
Ext.each(this.items,function(c,b){Ext.apply(c,{group:c.group||this.id,itemIndex:b,checkHandler:this.checkHandler,scope:this,checked:c.checked||false});
this.menu.items.push(c);
if(c.checked){a=b
}},this);
Ext.CycleButton.superclass.initComponent.call(this);
this.on("click",this.toggleSelected,this);
this.setActiveItem(a,true)
},checkHandler:function(a,b){if(b){this.setActiveItem(a)
}},toggleSelected:function(){var a=this.menu;
a.render();
if(!a.hasLayout){a.doLayout()
}var d,b;
for(var c=1;
c<this.itemCount;
c++){d=(this.activeItem.itemIndex+c)%this.itemCount;
b=a.items.itemAt(d);
if(!b.disabled){b.setChecked(true);
break
}}}});
Ext.reg("cycle",Ext.CycleButton);
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.form.Field=Ext.extend(Ext.BoxComponent,{invalidClass:"x-form-invalid",invalidText:"The value in this field is invalid",focusClass:"x-form-focus",validationEvent:"keyup",validateOnBlur:true,validationDelay:250,defaultAutoCreate:{tag:"input",type:"text",size:"20",autocomplete:"off"},fieldClass:"x-form-field",msgTarget:"qtip",msgFx:"normal",readOnly:false,disabled:false,submitValue:true,isFormField:true,msgDisplay:"",hasFocus:false,initComponent:function(){Ext.form.Field.superclass.initComponent.call(this);
this.addEvents("focus","blur","specialkey","change","invalid","valid")
},getName:function(){return this.rendered&&this.el.dom.name?this.el.dom.name:this.name||this.id||""
},onRender:function(c,a){if(!this.el){var b=this.getAutoCreate();
if(!b.name){b.name=this.name||this.id
}if(this.inputType){b.type=this.inputType
}this.autoEl=b
}Ext.form.Field.superclass.onRender.call(this,c,a);
if(this.submitValue===false){this.el.dom.removeAttribute("name")
}var d=this.el.dom.type;
if(d){if(d=="password"){d="text"
}this.el.addClass("x-form-"+d)
}if(this.readOnly){this.setReadOnly(true)
}if(this.tabIndex!==undefined){this.el.dom.setAttribute("tabIndex",this.tabIndex)
}this.el.addClass([this.fieldClass,this.cls])
},getItemCt:function(){return this.itemCt
},initValue:function(){if(this.value!==undefined){this.setValue(this.value)
}else{if(!Ext.isEmpty(this.el.dom.value)&&this.el.dom.value!=this.emptyText){this.setValue(this.el.dom.value)
}}this.originalValue=this.getValue()
},isDirty:function(){if(this.disabled||!this.rendered){return false
}return String(this.getValue())!==String(this.originalValue)
},setReadOnly:function(a){if(this.rendered){this.el.dom.readOnly=a
}this.readOnly=a
},afterRender:function(){Ext.form.Field.superclass.afterRender.call(this);
this.initEvents();
this.initValue()
},fireKey:function(a){if(a.isSpecialKey()){this.fireEvent("specialkey",this,a)
}},reset:function(){this.setValue(this.originalValue);
this.clearInvalid()
},initEvents:function(){this.mon(this.el,Ext.EventManager.getKeyEvent(),this.fireKey,this);
this.mon(this.el,"focus",this.onFocus,this);
this.mon(this.el,"blur",this.onBlur,this,this.inEditor?{buffer:10}:null)
},preFocus:Ext.emptyFn,onFocus:function(){this.preFocus();
if(this.focusClass){this.el.addClass(this.focusClass)
}if(!this.hasFocus){this.hasFocus=true;
this.startValue=this.getValue();
this.fireEvent("focus",this)
}},beforeBlur:Ext.emptyFn,onBlur:function(){this.beforeBlur();
if(this.focusClass){this.el.removeClass(this.focusClass)
}this.hasFocus=false;
if(this.validationEvent!==false&&(this.validateOnBlur||this.validationEvent=="blur")){this.validate()
}var a=this.getValue();
if(String(a)!==String(this.startValue)){this.fireEvent("change",this,a,this.startValue)
}this.fireEvent("blur",this);
this.postBlur()
},postBlur:Ext.emptyFn,isValid:function(a){if(this.disabled){return true
}var c=this.preventMark;
this.preventMark=a===true;
var b=this.validateValue(this.processValue(this.getRawValue()),a);
this.preventMark=c;
return b
},validate:function(){if(this.disabled||this.validateValue(this.processValue(this.getRawValue()))){this.clearInvalid();
return true
}return false
},processValue:function(a){return a
},validateValue:function(b){var a=this.getErrors(b)[0];
if(a==undefined){return true
}else{this.markInvalid(a);
return false
}},getErrors:function(){return[]
},getActiveError:function(){return this.activeError||""
},markInvalid:function(c){if(this.rendered&&!this.preventMark){c=c||this.invalidText;
var a=this.getMessageHandler();
if(a){a.mark(this,c)
}else{if(this.msgTarget){this.el.addClass(this.invalidClass);
var b=Ext.getDom(this.msgTarget);
if(b){b.innerHTML=c;
b.style.display=this.msgDisplay
}}}}this.setActiveError(c)
},clearInvalid:function(){if(this.rendered&&!this.preventMark){this.el.removeClass(this.invalidClass);
var a=this.getMessageHandler();
if(a){a.clear(this)
}else{if(this.msgTarget){this.el.removeClass(this.invalidClass);
var b=Ext.getDom(this.msgTarget);
if(b){b.innerHTML="";
b.style.display="none"
}}}}this.unsetActiveError()
},setActiveError:function(b,a){this.activeError=b;
if(a!==true){this.fireEvent("invalid",this,b)
}},unsetActiveError:function(a){delete this.activeError;
if(a!==true){this.fireEvent("valid",this)
}},getMessageHandler:function(){return Ext.form.MessageTargets[this.msgTarget]
},getErrorCt:function(){return this.el.findParent(".x-form-element",5,true)||this.el.findParent(".x-form-field-wrap",5,true)
},alignErrorEl:function(){this.errorEl.setWidth(this.getErrorCt().getWidth(true)-20)
},alignErrorIcon:function(){this.errorIcon.alignTo(this.el,"tl-tr",[2,0])
},getRawValue:function(){var a=this.rendered?this.el.getValue():Ext.value(this.value,"");
if(a===this.emptyText){a=""
}return a
},getValue:function(){if(!this.rendered){return this.value
}var a=this.el.getValue();
if(a===this.emptyText||a===undefined){a=""
}return a
},setRawValue:function(a){return this.rendered?(this.el.dom.value=(Ext.isEmpty(a)?"":a)):""
},setValue:function(a){this.value=a;
if(this.rendered){this.el.dom.value=(Ext.isEmpty(a)?"":a);
this.validate()
}return this
},append:function(a){this.setValue([this.getValue(),a].join(""))
}});
Ext.form.MessageTargets={qtip:{mark:function(a,b){a.el.addClass(a.invalidClass);
a.el.dom.qtip=b;
a.el.dom.qclass="x-form-invalid-tip";
if(Ext.QuickTips){Ext.QuickTips.enable()
}},clear:function(a){a.el.removeClass(a.invalidClass);
a.el.dom.qtip=""
}},title:{mark:function(a,b){a.el.addClass(a.invalidClass);
a.el.dom.title=b
},clear:function(a){a.el.dom.title=""
}},under:{mark:function(b,c){b.el.addClass(b.invalidClass);
if(!b.errorEl){var a=b.getErrorCt();
if(!a){b.el.dom.title=c;
return
}b.errorEl=a.createChild({cls:"x-form-invalid-msg"});
b.on("resize",b.alignErrorEl,b);
b.on("destroy",function(){Ext.destroy(this.errorEl)
},b)
}b.alignErrorEl();
b.errorEl.update(c);
Ext.form.Field.msgFx[b.msgFx].show(b.errorEl,b)
},clear:function(a){a.el.removeClass(a.invalidClass);
if(a.errorEl){Ext.form.Field.msgFx[a.msgFx].hide(a.errorEl,a)
}else{a.el.dom.title=""
}}},side:{mark:function(b,c){b.el.addClass(b.invalidClass);
if(!b.errorIcon){var a=b.getErrorCt();
if(!a){b.el.dom.title=c;
return
}b.errorIcon=a.createChild({cls:"x-form-invalid-icon"});
if(b.ownerCt){b.ownerCt.on("afterlayout",b.alignErrorIcon,b);
b.ownerCt.on("expand",b.alignErrorIcon,b)
}b.on("resize",b.alignErrorIcon,b);
b.on("destroy",function(){Ext.destroy(this.errorIcon)
},b)
}b.alignErrorIcon();
b.errorIcon.dom.qtip=c;
b.errorIcon.dom.qclass="x-form-invalid-tip";
b.errorIcon.show()
},clear:function(a){a.el.removeClass(a.invalidClass);
if(a.errorIcon){a.errorIcon.dom.qtip="";
a.errorIcon.hide()
}else{a.el.dom.title=""
}}}};
Ext.form.Field.msgFx={normal:{show:function(a,b){a.setDisplayed("block")
},hide:function(a,b){a.setDisplayed(false).update("")
}},slide:{show:function(a,b){a.slideIn("t",{stopFx:true})
},hide:function(a,b){a.slideOut("t",{stopFx:true,useDisplay:true})
}},slideRight:{show:function(a,b){a.fixDisplay();
a.alignTo(b.el,"tl-tr");
a.slideIn("l",{stopFx:true})
},hide:function(a,b){a.slideOut("l",{stopFx:true,useDisplay:true})
}}};
Ext.reg("field",Ext.form.Field);
Ext.form.TextField=Ext.extend(Ext.form.Field,{grow:false,growMin:30,growMax:800,vtype:null,maskRe:null,disableKeyFilter:false,allowBlank:true,minLength:0,maxLength:Number.MAX_VALUE,minLengthText:"The minimum length for this field is {0}",maxLengthText:"The maximum length for this field is {0}",selectOnFocus:false,blankText:"This field is required",validator:null,regex:null,regexText:"",emptyText:null,emptyClass:"x-form-empty-field",initComponent:function(){Ext.form.TextField.superclass.initComponent.call(this);
this.addEvents("autosize","keydown","keyup","keypress")
},initEvents:function(){Ext.form.TextField.superclass.initEvents.call(this);
if(this.validationEvent=="keyup"){this.validationTask=new Ext.util.DelayedTask(this.validate,this);
this.mon(this.el,"keyup",this.filterValidation,this)
}else{if(this.validationEvent!==false&&this.validationEvent!="blur"){this.mon(this.el,this.validationEvent,this.validate,this,{buffer:this.validationDelay})
}}if(this.selectOnFocus||this.emptyText){this.mon(this.el,"mousedown",this.onMouseDown,this);
if(this.emptyText){this.applyEmptyText()
}}if(this.maskRe||(this.vtype&&this.disableKeyFilter!==true&&(this.maskRe=Ext.form.VTypes[this.vtype+"Mask"]))){this.mon(this.el,"keypress",this.filterKeys,this)
}if(this.grow){this.mon(this.el,"keyup",this.onKeyUpBuffered,this,{buffer:50});
this.mon(this.el,"click",this.autoSize,this)
}if(this.enableKeyEvents){this.mon(this.el,{scope:this,keyup:this.onKeyUp,keydown:this.onKeyDown,keypress:this.onKeyPress})
}},onMouseDown:function(a){if(!this.hasFocus){this.mon(this.el,"mouseup",Ext.emptyFn,this,{single:true,preventDefault:true})
}},processValue:function(a){if(this.stripCharsRe){var b=a.replace(this.stripCharsRe,"");
if(b!==a){this.setRawValue(b);
return b
}}return a
},filterValidation:function(a){if(!a.isNavKeyPress()){this.validationTask.delay(this.validationDelay)
}},onDisable:function(){Ext.form.TextField.superclass.onDisable.call(this);
if(Ext.isIE){this.el.dom.unselectable="on"
}},onEnable:function(){Ext.form.TextField.superclass.onEnable.call(this);
if(Ext.isIE){this.el.dom.unselectable=""
}},onKeyUpBuffered:function(a){if(this.doAutoSize(a)){this.autoSize()
}},doAutoSize:function(a){return !a.isNavKeyPress()
},onKeyUp:function(a){this.fireEvent("keyup",this,a)
},onKeyDown:function(a){this.fireEvent("keydown",this,a)
},onKeyPress:function(a){this.fireEvent("keypress",this,a)
},reset:function(){Ext.form.TextField.superclass.reset.call(this);
this.applyEmptyText()
},applyEmptyText:function(){if(this.rendered&&this.emptyText&&this.getRawValue().length<1&&!this.hasFocus){this.setRawValue(this.emptyText);
this.el.addClass(this.emptyClass)
}},preFocus:function(){var a=this.el,b;
if(this.emptyText){if(a.dom.value==this.emptyText){this.setRawValue("");
b=true
}a.removeClass(this.emptyClass)
}if(this.selectOnFocus||b){a.dom.select()
}},postBlur:function(){this.applyEmptyText()
},filterKeys:function(b){if(b.ctrlKey){return
}var a=b.getKey();
if(Ext.isGecko&&(b.isNavKeyPress()||a==b.BACKSPACE||(a==b.DELETE&&b.button==-1))){return
}var c=String.fromCharCode(b.getCharCode());
if(!Ext.isGecko&&b.isSpecialKey()&&!c){return
}if(!this.maskRe.test(c)){b.stopEvent()
}},setValue:function(a){if(this.emptyText&&this.el&&!Ext.isEmpty(a)){this.el.removeClass(this.emptyClass)
}Ext.form.TextField.superclass.setValue.apply(this,arguments);
this.applyEmptyText();
this.autoSize();
return this
},getErrors:function(a){var d=Ext.form.TextField.superclass.getErrors.apply(this,arguments);
a=Ext.isDefined(a)?a:this.processValue(this.getRawValue());
if(Ext.isFunction(this.validator)){var c=this.validator(a);
if(c!==true){d.push(c)
}}if(a.length<1||a===this.emptyText){if(this.allowBlank){return d
}else{d.push(this.blankText)
}}if(!this.allowBlank&&(a.length<1||a===this.emptyText)){d.push(this.blankText)
}if(a.length<this.minLength){d.push(String.format(this.minLengthText,this.minLength))
}if(a.length>this.maxLength){d.push(String.format(this.maxLengthText,this.maxLength))
}if(this.vtype){var b=Ext.form.VTypes;
if(!b[this.vtype](a,this)){d.push(this.vtypeText||b[this.vtype+"Text"])
}}if(this.regex&&!this.regex.test(a)){d.push(this.regexText)
}return d
},selectText:function(g,a){var c=this.getRawValue();
var e=false;
if(c.length>0){g=g===undefined?0:g;
a=a===undefined?c.length:a;
var f=this.el.dom;
if(f.setSelectionRange){f.setSelectionRange(g,a)
}else{if(f.createTextRange){var b=f.createTextRange();
b.moveStart("character",g);
b.moveEnd("character",a-c.length);
b.select()
}}e=Ext.isGecko||Ext.isOpera
}else{e=true
}if(e){this.focus()
}},autoSize:function(){if(!this.grow||!this.rendered){return
}if(!this.metrics){this.metrics=Ext.util.TextMetrics.createInstance(this.el)
}var c=this.el;
var b=c.dom.value;
var e=document.createElement("div");
e.appendChild(document.createTextNode(b));
b=e.innerHTML;
Ext.removeNode(e);
e=null;
b+="&#160;";
var a=Math.min(this.growMax,Math.max(this.metrics.getWidth(b)+10,this.growMin));
this.el.setWidth(a);
this.fireEvent("autosize",this,a)
},onDestroy:function(){if(this.validationTask){this.validationTask.cancel();
this.validationTask=null
}Ext.form.TextField.superclass.onDestroy.call(this)
}});
Ext.reg("textfield",Ext.form.TextField);
Ext.form.TriggerField=Ext.extend(Ext.form.TextField,{defaultAutoCreate:{tag:"input",type:"text",size:"16",autocomplete:"off"},hideTrigger:false,editable:true,readOnly:false,wrapFocusClass:"x-trigger-wrap-focus",autoSize:Ext.emptyFn,monitorTab:true,deferHeight:true,mimicing:false,actionMode:"wrap",defaultTriggerWidth:17,onResize:function(a,c){Ext.form.TriggerField.superclass.onResize.call(this,a,c);
var b=this.getTriggerWidth();
if(Ext.isNumber(a)){this.el.setWidth(a-b)
}this.wrap.setWidth(this.el.getWidth()+b)
},getTriggerWidth:function(){var a=this.trigger.getWidth();
if(!this.hideTrigger&&!this.readOnly&&a===0){a=this.defaultTriggerWidth
}return a
},alignErrorIcon:function(){if(this.wrap){this.errorIcon.alignTo(this.wrap,"tl-tr",[2,0])
}},onRender:function(b,a){this.doc=Ext.isIE?Ext.getBody():Ext.getDoc();
Ext.form.TriggerField.superclass.onRender.call(this,b,a);
this.wrap=this.el.wrap({cls:"x-form-field-wrap x-form-field-trigger-wrap"});
this.trigger=this.wrap.createChild(this.triggerConfig||{tag:"img",src:Ext.BLANK_IMAGE_URL,alt:"",cls:"x-form-trigger "+this.triggerClass});
this.initTrigger();
if(!this.width){this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth())
}this.resizeEl=this.positionEl=this.wrap
},getWidth:function(){return(this.el.getWidth()+this.trigger.getWidth())
},updateEditState:function(){if(this.rendered){if(this.readOnly){this.el.dom.readOnly=true;
this.el.addClass("x-trigger-noedit");
this.mun(this.el,"click",this.onTriggerClick,this);
this.trigger.setDisplayed(false)
}else{if(!this.editable){this.el.dom.readOnly=true;
this.el.addClass("x-trigger-noedit");
this.mon(this.el,"click",this.onTriggerClick,this)
}else{this.el.dom.readOnly=false;
this.el.removeClass("x-trigger-noedit");
this.mun(this.el,"click",this.onTriggerClick,this)
}this.trigger.setDisplayed(!this.hideTrigger)
}this.onResize(this.width||this.wrap.getWidth())
}},setHideTrigger:function(a){if(a!=this.hideTrigger){this.hideTrigger=a;
this.updateEditState()
}},setEditable:function(a){if(a!=this.editable){this.editable=a;
this.updateEditState()
}},setReadOnly:function(a){if(a!=this.readOnly){this.readOnly=a;
this.updateEditState()
}},afterRender:function(){Ext.form.TriggerField.superclass.afterRender.call(this);
this.updateEditState()
},initTrigger:function(){this.mon(this.trigger,"click",this.onTriggerClick,this,{preventDefault:true});
this.trigger.addClassOnOver("x-form-trigger-over");
this.trigger.addClassOnClick("x-form-trigger-click")
},onDestroy:function(){Ext.destroy(this.trigger,this.wrap);
if(this.mimicing){this.doc.un("mousedown",this.mimicBlur,this)
}delete this.doc;
Ext.form.TriggerField.superclass.onDestroy.call(this)
},onFocus:function(){Ext.form.TriggerField.superclass.onFocus.call(this);
if(!this.mimicing){this.wrap.addClass(this.wrapFocusClass);
this.mimicing=true;
this.doc.on("mousedown",this.mimicBlur,this,{delay:10});
if(this.monitorTab){this.on("specialkey",this.checkTab,this)
}}},checkTab:function(a,b){if(b.getKey()==b.TAB){this.triggerBlur()
}},onBlur:Ext.emptyFn,mimicBlur:function(a){if(!this.isDestroyed&&!this.wrap.contains(a.target)&&this.validateBlur(a)){this.triggerBlur()
}},triggerBlur:function(){this.mimicing=false;
this.doc.un("mousedown",this.mimicBlur,this);
if(this.monitorTab&&this.el){this.un("specialkey",this.checkTab,this)
}Ext.form.TriggerField.superclass.onBlur.call(this);
if(this.wrap){this.wrap.removeClass(this.wrapFocusClass)
}},beforeBlur:Ext.emptyFn,validateBlur:function(a){return true
},onTriggerClick:Ext.emptyFn});
Ext.form.TwinTriggerField=Ext.extend(Ext.form.TriggerField,{initComponent:function(){Ext.form.TwinTriggerField.superclass.initComponent.call(this);
this.triggerConfig={tag:"span",cls:"x-form-twin-triggers",cn:[{tag:"img",src:Ext.BLANK_IMAGE_URL,alt:"",cls:"x-form-trigger "+this.trigger1Class},{tag:"img",src:Ext.BLANK_IMAGE_URL,alt:"",cls:"x-form-trigger "+this.trigger2Class}]}
},getTrigger:function(a){return this.triggers[a]
},afterRender:function(){Ext.form.TwinTriggerField.superclass.afterRender.call(this);
var c=this.triggers,b=0,a=c.length;
for(;
b<a;
++b){if(this["hideTrigger"+(b+1)]){c[b].hide()
}}},initTrigger:function(){var a=this.trigger.select(".x-form-trigger",true),b=this;
a.each(function(d,f,c){var e="Trigger"+(c+1);
d.hide=function(){var g=b.wrap.getWidth();
this.dom.style.display="none";
b.el.setWidth(g-b.trigger.getWidth());
b["hidden"+e]=true
};
d.show=function(){var g=b.wrap.getWidth();
this.dom.style.display="";
b.el.setWidth(g-b.trigger.getWidth());
b["hidden"+e]=false
};
this.mon(d,"click",this["on"+e+"Click"],this,{preventDefault:true});
d.addClassOnOver("x-form-trigger-over");
d.addClassOnClick("x-form-trigger-click")
},this);
this.triggers=a.elements
},getTriggerWidth:function(){var a=0;
Ext.each(this.triggers,function(d,c){var e="Trigger"+(c+1),b=d.getWidth();
if(b===0&&!this["hidden"+e]){a+=this.defaultTriggerWidth
}else{a+=b
}},this);
return a
},onDestroy:function(){Ext.destroy(this.triggers);
Ext.form.TwinTriggerField.superclass.onDestroy.call(this)
},onTrigger1Click:Ext.emptyFn,onTrigger2Click:Ext.emptyFn});
Ext.reg("trigger",Ext.form.TriggerField);
Ext.form.TextArea=Ext.extend(Ext.form.TextField,{growMin:60,growMax:1000,growAppend:"&#160;\n&#160;",enterIsSpecial:false,preventScrollbars:false,onRender:function(b,a){if(!this.el){this.defaultAutoCreate={tag:"textarea",style:"width:100px;height:60px;",autocomplete:"off"}
}Ext.form.TextArea.superclass.onRender.call(this,b,a);
if(this.grow){this.textSizeEl=Ext.DomHelper.append(document.body,{tag:"pre",cls:"x-form-grow-sizer"});
if(this.preventScrollbars){this.el.setStyle("overflow","hidden")
}this.el.setHeight(this.growMin)
}},onDestroy:function(){Ext.removeNode(this.textSizeEl);
Ext.form.TextArea.superclass.onDestroy.call(this)
},fireKey:function(a){if(a.isSpecialKey()&&(this.enterIsSpecial||(a.getKey()!=a.ENTER||a.hasModifier()))){this.fireEvent("specialkey",this,a)
}},doAutoSize:function(a){return !a.isNavKeyPress()||a.getKey()==a.ENTER
},filterValidation:function(a){if(!a.isNavKeyPress()||(!this.enterIsSpecial&&a.keyCode==a.ENTER)){this.validationTask.delay(this.validationDelay)
}},autoSize:function(){if(!this.grow||!this.textSizeEl){return
}var c=this.el,a=Ext.util.Format.htmlEncode(c.dom.value),d=this.textSizeEl,b;
Ext.fly(d).setWidth(this.el.getWidth());
if(a.length<1){a="&#160;&#160;"
}else{a+=this.growAppend;
if(Ext.isIE){a=a.replace(/\n/g,"&#160;<br />")
}}d.innerHTML=a;
b=Math.min(this.growMax,Math.max(d.offsetHeight,this.growMin));
if(b!=this.lastHeight){this.lastHeight=b;
this.el.setHeight(b);
this.fireEvent("autosize",this,b)
}}});
Ext.reg("textarea",Ext.form.TextArea);
Ext.form.NumberField=Ext.extend(Ext.form.TextField,{fieldClass:"x-form-field x-form-num-field",allowDecimals:true,decimalSeparator:".",decimalPrecision:2,allowNegative:true,minValue:Number.NEGATIVE_INFINITY,maxValue:Number.MAX_VALUE,minText:"The minimum value for this field is {0}",maxText:"The maximum value for this field is {0}",nanText:"{0} is not a valid number",baseChars:"0123456789",autoStripChars:false,initEvents:function(){var a=this.baseChars+"";
if(this.allowDecimals){a+=this.decimalSeparator
}if(this.allowNegative){a+="-"
}a=Ext.escapeRe(a);
this.maskRe=new RegExp("["+a+"]");
if(this.autoStripChars){this.stripCharsRe=new RegExp("[^"+a+"]","gi")
}Ext.form.NumberField.superclass.initEvents.call(this)
},getErrors:function(b){var c=Ext.form.NumberField.superclass.getErrors.apply(this,arguments);
b=Ext.isDefined(b)?b:this.processValue(this.getRawValue());
if(b.length<1){return c
}b=String(b).replace(this.decimalSeparator,".");
if(isNaN(b)){c.push(String.format(this.nanText,b))
}var a=this.parseValue(b);
if(a<this.minValue){c.push(String.format(this.minText,this.minValue))
}if(a>this.maxValue){c.push(String.format(this.maxText,this.maxValue))
}return c
},getValue:function(){return this.fixPrecision(this.parseValue(Ext.form.NumberField.superclass.getValue.call(this)))
},setValue:function(a){a=Ext.isNumber(a)?a:parseFloat(String(a).replace(this.decimalSeparator,"."));
a=this.fixPrecision(a);
a=isNaN(a)?"":String(a).replace(".",this.decimalSeparator);
return Ext.form.NumberField.superclass.setValue.call(this,a)
},setMinValue:function(a){this.minValue=Ext.num(a,Number.NEGATIVE_INFINITY)
},setMaxValue:function(a){this.maxValue=Ext.num(a,Number.MAX_VALUE)
},parseValue:function(a){a=parseFloat(String(a).replace(this.decimalSeparator,"."));
return isNaN(a)?"":a
},fixPrecision:function(b){var a=isNaN(b);
if(!this.allowDecimals||this.decimalPrecision==-1||a||!b){return a?"":b
}return parseFloat(parseFloat(b).toFixed(this.decimalPrecision))
},beforeBlur:function(){var a=this.parseValue(this.getRawValue());
if(!Ext.isEmpty(a)){this.setValue(a)
}}});
Ext.reg("numberfield",Ext.form.NumberField);
Ext.form.DateField=Ext.extend(Ext.form.TriggerField,{format:"m/d/Y",altFormats:"m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d|n-j|n/j",disabledDaysText:"Disabled",disabledDatesText:"Disabled",minText:"The date in this field must be equal to or after {0}",maxText:"The date in this field must be equal to or before {0}",invalidText:"{0} is not a valid date - it must be in the format {1}",triggerClass:"x-form-date-trigger",showToday:true,startDay:0,defaultAutoCreate:{tag:"input",type:"text",size:"10",autocomplete:"off"},initTime:"12",initTimeFormat:"H",safeParse:function(b,c){if(Date.formatContainsHourInfo(c)){return Date.parseDate(b,c)
}else{var a=Date.parseDate(b+" "+this.initTime,c+" "+this.initTimeFormat);
if(a){return a.clearTime()
}}},initComponent:function(){Ext.form.DateField.superclass.initComponent.call(this);
this.addEvents("select");
if(Ext.isString(this.minValue)){this.minValue=this.parseDate(this.minValue)
}if(Ext.isString(this.maxValue)){this.maxValue=this.parseDate(this.maxValue)
}this.disabledDatesRE=null;
this.initDisabledDays()
},initEvents:function(){Ext.form.DateField.superclass.initEvents.call(this);
this.keyNav=new Ext.KeyNav(this.el,{down:function(a){this.onTriggerClick()
},scope:this,forceKeyDown:true})
},initDisabledDays:function(){if(this.disabledDates){var b=this.disabledDates,a=b.length-1,c="(?:";
Ext.each(b,function(f,e){c+=Ext.isDate(f)?"^"+Ext.escapeRe(f.dateFormat(this.format))+"$":b[e];
if(e!=a){c+="|"
}},this);
this.disabledDatesRE=new RegExp(c+")")
}},setDisabledDates:function(a){this.disabledDates=a;
this.initDisabledDays();
if(this.menu){this.menu.picker.setDisabledDates(this.disabledDatesRE)
}},setDisabledDays:function(a){this.disabledDays=a;
if(this.menu){this.menu.picker.setDisabledDays(a)
}},setMinValue:function(a){this.minValue=(Ext.isString(a)?this.parseDate(a):a);
if(this.menu){this.menu.picker.setMinDate(this.minValue)
}},setMaxValue:function(a){this.maxValue=(Ext.isString(a)?this.parseDate(a):a);
if(this.menu){this.menu.picker.setMaxDate(this.maxValue)
}},getErrors:function(e){var g=Ext.form.DateField.superclass.getErrors.apply(this,arguments);
e=this.formatDate(e||this.processValue(this.getRawValue()));
if(e.length<1){return g
}var c=e;
e=this.parseDate(e);
if(!e){g.push(String.format(this.invalidText,c,this.format));
return g
}var f=e.getTime();
if(this.minValue&&f<this.minValue.clearTime().getTime()){g.push(String.format(this.minText,this.formatDate(this.minValue)))
}if(this.maxValue&&f>this.maxValue.clearTime().getTime()){g.push(String.format(this.maxText,this.formatDate(this.maxValue)))
}if(this.disabledDays){var a=e.getDay();
for(var b=0;
b<this.disabledDays.length;
b++){if(a===this.disabledDays[b]){g.push(this.disabledDaysText);
break
}}}var d=this.formatDate(e);
if(this.disabledDatesRE&&this.disabledDatesRE.test(d)){g.push(String.format(this.disabledDatesText,d))
}return g
},validateBlur:function(){return !this.menu||!this.menu.isVisible()
},getValue:function(){return this.parseDate(Ext.form.DateField.superclass.getValue.call(this))||""
},setValue:function(a){return Ext.form.DateField.superclass.setValue.call(this,this.formatDate(this.parseDate(a)))
},parseDate:function(f){if(!f||Ext.isDate(f)){return f
}var b=this.safeParse(f,this.format),c=this.altFormats,e=this.altFormatsArray;
if(!b&&c){e=e||c.split("|");
for(var d=0,a=e.length;
d<a&&!b;
d++){b=this.safeParse(f,e[d])
}}return b
},onDestroy:function(){Ext.destroy(this.menu,this.keyNav);
Ext.form.DateField.superclass.onDestroy.call(this)
},formatDate:function(a){return Ext.isDate(a)?a.dateFormat(this.format):a
},onTriggerClick:function(){if(this.disabled){return
}if(this.menu==null){this.menu=new Ext.menu.DateMenu({hideOnClick:false,focusOnSelect:false})
}this.onFocus();
Ext.apply(this.menu.picker,{minDate:this.minValue,maxDate:this.maxValue,disabledDatesRE:this.disabledDatesRE,disabledDatesText:this.disabledDatesText,disabledDays:this.disabledDays,disabledDaysText:this.disabledDaysText,format:this.format,showToday:this.showToday,startDay:this.startDay,minText:String.format(this.minText,this.formatDate(this.minValue)),maxText:String.format(this.maxText,this.formatDate(this.maxValue))});
this.menu.picker.setValue(this.getValue()||new Date());
this.menu.show(this.el,"tl-bl?");
this.menuEvents("on")
},menuEvents:function(a){this.menu[a]("select",this.onSelect,this);
this.menu[a]("hide",this.onMenuHide,this);
this.menu[a]("show",this.onFocus,this)
},onSelect:function(a,b){this.setValue(b);
this.fireEvent("select",this,b);
this.menu.hide()
},onMenuHide:function(){this.focus(false,60);
this.menuEvents("un")
},beforeBlur:function(){var a=this.parseDate(this.getRawValue());
if(a){this.setValue(a)
}}});
Ext.reg("datefield",Ext.form.DateField);
Ext.form.DisplayField=Ext.extend(Ext.form.Field,{validationEvent:false,validateOnBlur:false,defaultAutoCreate:{tag:"div"},fieldClass:"x-form-display-field",htmlEncode:false,initEvents:Ext.emptyFn,isValid:function(){return true
},validate:function(){return true
},getRawValue:function(){var a=this.rendered?this.el.dom.innerHTML:Ext.value(this.value,"");
if(a===this.emptyText){a=""
}if(this.htmlEncode){a=Ext.util.Format.htmlDecode(a)
}return a
},getValue:function(){return this.getRawValue()
},getName:function(){return this.name
},setRawValue:function(a){if(this.htmlEncode){a=Ext.util.Format.htmlEncode(a)
}return this.rendered?(this.el.dom.innerHTML=(Ext.isEmpty(a)?"":a)):(this.value=a)
},setValue:function(a){this.setRawValue(a);
return this
}});
Ext.reg("displayfield",Ext.form.DisplayField);
Ext.form.ComboBox=Ext.extend(Ext.form.TriggerField,{defaultAutoCreate:{tag:"input",type:"text",size:"24",autocomplete:"off"},listClass:"",selectedClass:"x-combo-selected",listEmptyText:"",triggerClass:"x-form-arrow-trigger",shadow:"sides",listAlign:"tl-bl?",maxHeight:300,minHeight:90,triggerAction:"query",minChars:4,autoSelect:true,typeAhead:false,queryDelay:500,pageSize:0,selectOnFocus:false,queryParam:"query",loadingText:"Loading...",resizable:false,handleHeight:8,allQuery:"",mode:"remote",minListWidth:70,forceSelection:false,typeAheadDelay:250,lazyInit:true,clearFilterOnReset:true,submitValue:undefined,initComponent:function(){Ext.form.ComboBox.superclass.initComponent.call(this);
this.addEvents("expand","collapse","beforeselect","select","beforequery");
if(this.transform){var c=Ext.getDom(this.transform);
if(!this.hiddenName){this.hiddenName=c.name
}if(!this.store){this.mode="local";
var h=[],e=c.options;
for(var b=0,a=e.length;
b<a;
b++){var g=e[b],f=(g.hasAttribute?g.hasAttribute("value"):g.getAttributeNode("value").specified)?g.value:g.text;
if(g.selected&&Ext.isEmpty(this.value,true)){this.value=f
}h.push([f,g.text])
}this.store=new Ext.data.ArrayStore({idIndex:0,fields:["value","text"],data:h,autoDestroy:true});
this.valueField="value";
this.displayField="text"
}c.name=Ext.id();
if(!this.lazyRender){this.target=true;
this.el=Ext.DomHelper.insertBefore(c,this.autoCreate||this.defaultAutoCreate);
this.render(this.el.parentNode,c)
}Ext.removeNode(c)
}else{if(this.store){this.store=Ext.StoreMgr.lookup(this.store);
if(this.store.autoCreated){this.displayField=this.valueField="field1";
if(!this.store.expandData){this.displayField="field2"
}this.mode="local"
}}}this.selectedIndex=-1;
if(this.mode=="local"){if(!Ext.isDefined(this.initialConfig.queryDelay)){this.queryDelay=10
}if(!Ext.isDefined(this.initialConfig.minChars)){this.minChars=0
}}},onRender:function(b,a){if(this.hiddenName&&!Ext.isDefined(this.submitValue)){this.submitValue=false
}Ext.form.ComboBox.superclass.onRender.call(this,b,a);
if(this.hiddenName){this.hiddenField=this.el.insertSibling({tag:"input",type:"hidden",name:this.hiddenName,id:(this.hiddenId||Ext.id())},"before",true)
}if(Ext.isGecko){this.el.dom.setAttribute("autocomplete","off")
}if(!this.lazyInit){this.initList()
}else{this.on("focus",this.initList,this,{single:true})
}},initValue:function(){Ext.form.ComboBox.superclass.initValue.call(this);
if(this.hiddenField){this.hiddenField.value=Ext.value(Ext.isDefined(this.hiddenValue)?this.hiddenValue:this.value,"")
}},getParentZIndex:function(){var a;
if(this.ownerCt){this.findParentBy(function(b){a=parseInt(b.getPositionEl().getStyle("z-index"),10);
return !!a
})
}return a
},getZIndex:function(b){b=b||Ext.getDom(this.getListParent()||Ext.getBody());
var a=parseInt(Ext.fly(b).getStyle("z-index"),10);
if(!a){a=this.getParentZIndex()
}return(a||12000)+5
},initList:function(){if(!this.list){var a="x-combo-list",c=Ext.getDom(this.getListParent()||Ext.getBody());
this.list=new Ext.Layer({parentEl:c,shadow:this.shadow,cls:[a,this.listClass].join(" "),constrain:false,zindex:this.getZIndex(c)});
var b=this.listWidth||Math.max(this.wrap.getWidth(),this.minListWidth);
this.list.setSize(b,0);
this.list.swallowEvent("mousewheel");
this.assetHeight=0;
if(this.syncFont!==false){this.list.setStyle("font-size",this.el.getStyle("font-size"))
}if(this.title){this.header=this.list.createChild({cls:a+"-hd",html:this.title});
this.assetHeight+=this.header.getHeight()
}this.innerList=this.list.createChild({cls:a+"-inner"});
this.mon(this.innerList,"mouseover",this.onViewOver,this);
this.mon(this.innerList,"mousemove",this.onViewMove,this);
this.innerList.setWidth(b-this.list.getFrameWidth("lr"));
if(this.pageSize){this.footer=this.list.createChild({cls:a+"-ft"});
this.pageTb=new Ext.PagingToolbar({store:this.store,pageSize:this.pageSize,renderTo:this.footer});
this.assetHeight+=this.footer.getHeight()
}if(!this.tpl){this.tpl='<tpl for="."><div class="'+a+'-item">{'+this.displayField+"}</div></tpl>"
}this.view=new Ext.DataView({applyTo:this.innerList,tpl:this.tpl,singleSelect:true,selectedClass:this.selectedClass,itemSelector:this.itemSelector||"."+a+"-item",emptyText:this.listEmptyText,deferEmptyText:false});
this.mon(this.view,{containerclick:this.onViewClick,click:this.onViewClick,scope:this});
this.bindStore(this.store,true);
if(this.resizable){this.resizer=new Ext.Resizable(this.list,{pinned:true,handles:"se"});
this.mon(this.resizer,"resize",function(f,d,e){this.maxHeight=e-this.handleHeight-this.list.getFrameWidth("tb")-this.assetHeight;
this.listWidth=d;
this.innerList.setWidth(d-this.list.getFrameWidth("lr"));
this.restrictHeight()
},this);
this[this.pageSize?"footer":"innerList"].setStyle("margin-bottom",this.handleHeight+"px")
}}},getListParent:function(){return document.body
},getStore:function(){return this.store
},bindStore:function(a,b){if(this.store&&!b){if(this.store!==a&&this.store.autoDestroy){this.store.destroy()
}else{this.store.un("beforeload",this.onBeforeLoad,this);
this.store.un("load",this.onLoad,this);
this.store.un("exception",this.collapse,this)
}if(!a){this.store=null;
if(this.view){this.view.bindStore(null)
}if(this.pageTb){this.pageTb.bindStore(null)
}}}if(a){if(!b){this.lastQuery=null;
if(this.pageTb){this.pageTb.bindStore(a)
}}this.store=Ext.StoreMgr.lookup(a);
this.store.on({scope:this,beforeload:this.onBeforeLoad,load:this.onLoad,exception:this.collapse});
if(this.view){this.view.bindStore(a)
}}},reset:function(){if(this.clearFilterOnReset&&this.mode=="local"){this.store.clearFilter()
}Ext.form.ComboBox.superclass.reset.call(this)
},initEvents:function(){Ext.form.ComboBox.superclass.initEvents.call(this);
this.keyNav=new Ext.KeyNav(this.el,{up:function(a){this.inKeyMode=true;
this.selectPrev()
},down:function(a){if(!this.isExpanded()){this.onTriggerClick()
}else{this.inKeyMode=true;
this.selectNext()
}},enter:function(a){this.onViewClick()
},esc:function(a){this.collapse()
},tab:function(a){if(this.forceSelection===true){this.collapse()
}else{this.onViewClick(false)
}return true
},scope:this,doRelay:function(c,b,a){if(a=="down"||this.scope.isExpanded()){var d=Ext.KeyNav.prototype.doRelay.apply(this,arguments);
if(!Ext.isIE&&Ext.EventManager.useKeydown){this.scope.fireKey(c)
}return d
}return true
},forceKeyDown:true,defaultEventAction:"stopEvent"});
this.queryDelay=Math.max(this.queryDelay||10,this.mode=="local"?10:250);
this.dqTask=new Ext.util.DelayedTask(this.initQuery,this);
if(this.typeAhead){this.taTask=new Ext.util.DelayedTask(this.onTypeAhead,this)
}if(!this.enableKeyEvents){this.mon(this.el,"keyup",this.onKeyUp,this)
}},onDestroy:function(){if(this.dqTask){this.dqTask.cancel();
this.dqTask=null
}this.bindStore(null);
Ext.destroy(this.resizer,this.view,this.pageTb,this.list);
Ext.destroyMembers(this,"hiddenField");
Ext.form.ComboBox.superclass.onDestroy.call(this)
},fireKey:function(a){if(!this.isExpanded()){Ext.form.ComboBox.superclass.fireKey.call(this,a)
}},onResize:function(a,b){Ext.form.ComboBox.superclass.onResize.apply(this,arguments);
if(!isNaN(a)&&this.isVisible()&&this.list){this.doResize(a)
}else{this.bufferSize=a
}},doResize:function(a){if(!Ext.isDefined(this.listWidth)){var b=Math.max(a,this.minListWidth);
this.list.setWidth(b);
this.innerList.setWidth(b-this.list.getFrameWidth("lr"))
}},onEnable:function(){Ext.form.ComboBox.superclass.onEnable.apply(this,arguments);
if(this.hiddenField){this.hiddenField.disabled=false
}},onDisable:function(){Ext.form.ComboBox.superclass.onDisable.apply(this,arguments);
if(this.hiddenField){this.hiddenField.disabled=true
}},onBeforeLoad:function(){if(!this.hasFocus){return
}this.innerList.update(this.loadingText?'<div class="loading-indicator">'+this.loadingText+"</div>":"");
this.restrictHeight();
this.selectedIndex=-1
},onLoad:function(){if(!this.hasFocus){return
}if(this.store.getCount()>0||this.listEmptyText){this.expand();
this.restrictHeight();
if(this.lastQuery==this.allQuery){if(this.editable){this.el.dom.select()
}if(this.autoSelect!==false&&!this.selectByValue(this.value,true)){this.select(0,true)
}}else{if(this.autoSelect!==false){this.selectNext()
}if(this.typeAhead&&this.lastKey!=Ext.EventObject.BACKSPACE&&this.lastKey!=Ext.EventObject.DELETE){this.taTask.delay(this.typeAheadDelay)
}}}else{this.collapse()
}},onTypeAhead:function(){if(this.store.getCount()>0){var b=this.store.getAt(0);
var c=b.data[this.displayField];
var a=c.length;
var d=this.getRawValue().length;
if(d!=a){this.setRawValue(c);
this.selectText(d,c.length)
}}},assertValue:function(){var b=this.getRawValue(),a;
if(this.valueField&&Ext.isDefined(this.value)){a=this.findRecord(this.valueField,this.value)
}if(!a||a.get(this.displayField)!=b){a=this.findRecord(this.displayField,b)
}if(!a&&this.forceSelection){if(b.length>0&&b!=this.emptyText){this.el.dom.value=Ext.value(this.lastSelectionText,"");
this.applyEmptyText()
}else{this.clearValue()
}}else{if(a&&this.valueField){if(this.value==b){return
}b=a.get(this.valueField||this.displayField)
}this.setValue(b)
}},onSelect:function(a,b){if(this.fireEvent("beforeselect",this,a,b)!==false){this.setValue(a.data[this.valueField||this.displayField]);
this.collapse();
this.fireEvent("select",this,a,b)
}},getName:function(){var a=this.hiddenField;
return a&&a.name?a.name:this.hiddenName||Ext.form.ComboBox.superclass.getName.call(this)
},getValue:function(){if(this.valueField){return Ext.isDefined(this.value)?this.value:""
}else{return Ext.form.ComboBox.superclass.getValue.call(this)
}},clearValue:function(){if(this.hiddenField){this.hiddenField.value=""
}this.setRawValue("");
this.lastSelectionText="";
this.applyEmptyText();
this.value=""
},setValue:function(a){var c=a;
if(this.valueField){var b=this.findRecord(this.valueField,a);
if(b){c=b.data[this.displayField]
}else{if(Ext.isDefined(this.valueNotFoundText)){c=this.valueNotFoundText
}}}this.lastSelectionText=c;
if(this.hiddenField){this.hiddenField.value=Ext.value(a,"")
}Ext.form.ComboBox.superclass.setValue.call(this,c);
this.value=a;
return this
},findRecord:function(c,b){var a;
if(this.store.getCount()>0){this.store.each(function(d){if(d.data[c]==b){a=d;
return false
}})
}return a
},onViewMove:function(b,a){this.inKeyMode=false
},onViewOver:function(d,b){if(this.inKeyMode){return
}var c=this.view.findItemFromChild(b);
if(c){var a=this.view.indexOf(c);
this.select(a,false)
}},onViewClick:function(b){var a=this.view.getSelectedIndexes()[0],c=this.store,d=c.getAt(a);
if(d){this.onSelect(d,a)
}else{this.collapse()
}if(b!==false){this.el.focus()
}},restrictHeight:function(){this.innerList.dom.style.height="";
var b=this.innerList.dom,e=this.list.getFrameWidth("tb")+(this.resizable?this.handleHeight:0)+this.assetHeight,c=Math.max(b.clientHeight,b.offsetHeight,b.scrollHeight),a=this.getPosition()[1]-Ext.getBody().getScroll().top,f=Ext.lib.Dom.getViewHeight()-a-this.getSize().height,d=Math.max(a,f,this.minHeight||0)-this.list.shadowOffset-e-5;
c=Math.min(c,d,this.maxHeight);
this.innerList.setHeight(c);
this.list.beginUpdate();
this.list.setHeight(c+e);
this.list.alignTo.apply(this.list,[this.el].concat(this.listAlign));
this.list.endUpdate()
},isExpanded:function(){return this.list&&this.list.isVisible()
},selectByValue:function(a,c){if(!Ext.isEmpty(a,true)){var b=this.findRecord(this.valueField||this.displayField,a);
if(b){this.select(this.store.indexOf(b),c);
return true
}}return false
},select:function(a,c){this.selectedIndex=a;
this.view.select(a);
if(c!==false){var b=this.view.getNode(a);
if(b){this.innerList.scrollChildIntoView(b,false)
}}},selectNext:function(){var a=this.store.getCount();
if(a>0){if(this.selectedIndex==-1){this.select(0)
}else{if(this.selectedIndex<a-1){this.select(this.selectedIndex+1)
}}}},selectPrev:function(){var a=this.store.getCount();
if(a>0){if(this.selectedIndex==-1){this.select(0)
}else{if(this.selectedIndex!==0){this.select(this.selectedIndex-1)
}}}},onKeyUp:function(b){var a=b.getKey();
if(this.editable!==false&&this.readOnly!==true&&(a==b.BACKSPACE||!b.isSpecialKey())){this.lastKey=a;
this.dqTask.delay(this.queryDelay)
}Ext.form.ComboBox.superclass.onKeyUp.call(this,b)
},validateBlur:function(){return !this.list||!this.list.isVisible()
},initQuery:function(){this.doQuery(this.getRawValue())
},beforeBlur:function(){this.assertValue()
},postBlur:function(){Ext.form.ComboBox.superclass.postBlur.call(this);
this.collapse();
this.inKeyMode=false
},doQuery:function(c,b){c=Ext.isEmpty(c)?"":c;
var a={query:c,forceAll:b,combo:this,cancel:false};
if(this.fireEvent("beforequery",a)===false||a.cancel){return false
}c=a.query;
b=a.forceAll;
if(b===true||(c.length>=this.minChars)){if(this.lastQuery!==c){this.lastQuery=c;
if(this.mode=="local"){this.selectedIndex=-1;
if(b){this.store.clearFilter()
}else{this.store.filter(this.displayField,c)
}this.onLoad()
}else{this.store.baseParams[this.queryParam]=c;
this.store.load({params:this.getParams(c)});
this.expand()
}}else{this.selectedIndex=-1;
this.onLoad()
}}},getParams:function(a){var b={},c=this.store.paramNames;
if(this.pageSize){b[c.start]=0;
b[c.limit]=this.pageSize
}return b
},collapse:function(){if(!this.isExpanded()){return
}this.list.hide();
Ext.getDoc().un("mousewheel",this.collapseIf,this);
Ext.getDoc().un("mousedown",this.collapseIf,this);
this.fireEvent("collapse",this)
},collapseIf:function(a){if(!this.isDestroyed&&!a.within(this.wrap)&&!a.within(this.list)){this.collapse()
}},expand:function(){if(this.isExpanded()||!this.hasFocus){return
}if(this.title||this.pageSize){this.assetHeight=0;
if(this.title){this.assetHeight+=this.header.getHeight()
}if(this.pageSize){this.assetHeight+=this.footer.getHeight()
}}if(this.bufferSize){this.doResize(this.bufferSize);
delete this.bufferSize
}this.list.alignTo.apply(this.list,[this.el].concat(this.listAlign));
this.list.setZIndex(this.getZIndex());
this.list.show();
if(Ext.isGecko2){this.innerList.setOverflow("auto")
}this.mon(Ext.getDoc(),{scope:this,mousewheel:this.collapseIf,mousedown:this.collapseIf});
this.fireEvent("expand",this)
},onTriggerClick:function(){if(this.readOnly||this.disabled){return
}if(this.isExpanded()){this.collapse();
this.el.focus()
}else{this.onFocus({});
if(this.triggerAction=="all"){this.doQuery(this.allQuery,true)
}else{this.doQuery(this.getRawValue())
}this.el.focus()
}}});
Ext.reg("combo",Ext.form.ComboBox);
Ext.form.Checkbox=Ext.extend(Ext.form.Field,{focusClass:undefined,fieldClass:"x-form-field",checked:false,boxLabel:"&#160;",defaultAutoCreate:{tag:"input",type:"checkbox",autocomplete:"off"},actionMode:"wrap",initComponent:function(){Ext.form.Checkbox.superclass.initComponent.call(this);
this.addEvents("check")
},onResize:function(){Ext.form.Checkbox.superclass.onResize.apply(this,arguments);
if(!this.boxLabel&&!this.fieldLabel){this.el.alignTo(this.wrap,"c-c")
}},initEvents:function(){Ext.form.Checkbox.superclass.initEvents.call(this);
this.mon(this.el,{scope:this,click:this.onClick,change:this.onClick})
},markInvalid:Ext.emptyFn,clearInvalid:Ext.emptyFn,onRender:function(b,a){Ext.form.Checkbox.superclass.onRender.call(this,b,a);
if(this.inputValue!==undefined){this.el.dom.value=this.inputValue
}this.wrap=this.el.wrap({cls:"x-form-check-wrap"});
if(this.boxLabel){this.wrap.createChild({tag:"label",htmlFor:this.el.id,cls:"x-form-cb-label",html:this.boxLabel})
}if(this.checked){this.setValue(true)
}else{this.checked=this.el.dom.checked
}if(Ext.isIE&&!Ext.isStrict){this.wrap.repaint()
}this.resizeEl=this.positionEl=this.wrap
},onDestroy:function(){Ext.destroy(this.wrap);
Ext.form.Checkbox.superclass.onDestroy.call(this)
},initValue:function(){this.originalValue=this.getValue()
},getValue:function(){if(this.rendered){return this.el.dom.checked
}return this.checked
},onClick:function(){if(this.el.dom.checked!=this.checked){this.setValue(this.el.dom.checked)
}},setValue:function(a){var c=this.checked,b=this.inputValue;
if(a===false){this.checked=false
}else{this.checked=(a===true||a==="true"||a=="1"||(b?a==b:String(a).toLowerCase()=="on"))
}if(this.rendered){this.el.dom.checked=this.checked;
this.el.dom.defaultChecked=this.checked
}if(c!=this.checked){this.fireEvent("check",this,this.checked);
if(this.handler){this.handler.call(this.scope||this,this,this.checked)
}}return this
}});
Ext.reg("checkbox",Ext.form.Checkbox);
Ext.form.CheckboxGroup=Ext.extend(Ext.form.Field,{columns:"auto",vertical:false,allowBlank:true,blankText:"You must select at least one item in this group",defaultType:"checkbox",groupCls:"x-form-check-group",initComponent:function(){this.addEvents("change");
this.on("change",this.validate,this);
Ext.form.CheckboxGroup.superclass.initComponent.call(this)
},onRender:function(h,f){if(!this.el){var o={autoEl:{id:this.id},cls:this.groupCls,layout:"column",renderTo:h,bufferResize:false};
var a={xtype:"container",defaultType:this.defaultType,layout:"form",defaults:{hideLabel:true,anchor:"100%"}};
if(this.items[0].items){Ext.apply(o,{layoutConfig:{columns:this.items.length},defaults:this.defaults,items:this.items});
for(var e=0,k=this.items.length;
e<k;
e++){Ext.applyIf(this.items[e],a)
}}else{var d,m=[];
if(typeof this.columns=="string"){this.columns=this.items.length
}if(!Ext.isArray(this.columns)){var j=[];
for(var e=0;
e<this.columns;
e++){j.push((100/this.columns)*0.01)
}this.columns=j
}d=this.columns.length;
for(var e=0;
e<d;
e++){var b=Ext.apply({items:[]},a);
b[this.columns[e]<=1?"columnWidth":"width"]=this.columns[e];
if(this.defaults){b.defaults=Ext.apply(b.defaults||{},this.defaults)
}m.push(b)
}if(this.vertical){var q=Math.ceil(this.items.length/d),n=0;
for(var e=0,k=this.items.length;
e<k;
e++){if(e>0&&e%q==0){n++
}if(this.items[e].fieldLabel){this.items[e].hideLabel=false
}m[n].items.push(this.items[e])
}}else{for(var e=0,k=this.items.length;
e<k;
e++){var p=e%d;
if(this.items[e].fieldLabel){this.items[e].hideLabel=false
}m[p].items.push(this.items[e])
}}Ext.apply(o,{layoutConfig:{columns:d},items:m})
}this.panel=new Ext.Container(o);
this.panel.ownerCt=this;
this.el=this.panel.getEl();
if(this.forId&&this.itemCls){var c=this.el.up(this.itemCls).child("label",true);
if(c){c.setAttribute("htmlFor",this.forId)
}}var g=this.panel.findBy(function(i){return i.isFormField
},this);
this.items=new Ext.util.MixedCollection();
this.items.addAll(g)
}Ext.form.CheckboxGroup.superclass.onRender.call(this,h,f)
},initValue:function(){if(this.value){this.setValue.apply(this,this.buffered?this.value:[this.value]);
delete this.buffered;
delete this.value
}},afterRender:function(){Ext.form.CheckboxGroup.superclass.afterRender.call(this);
this.eachItem(function(a){a.on("check",this.fireChecked,this);
a.inGroup=true
})
},doLayout:function(){if(this.rendered){this.panel.forceLayout=this.ownerCt.forceLayout;
this.panel.doLayout()
}},fireChecked:function(){var a=[];
this.eachItem(function(b){if(b.checked){a.push(b)
}});
this.fireEvent("change",this,a)
},getErrors:function(){var b=Ext.form.CheckboxGroup.superclass.getErrors.apply(this,arguments);
if(!this.allowBlank){var a=true;
this.eachItem(function(c){if(c.checked){return(a=false)
}});
if(a){b.push(this.blankText)
}}return b
},isDirty:function(){if(this.disabled||!this.rendered){return false
}var a=false;
this.eachItem(function(b){if(b.isDirty()){a=true;
return false
}});
return a
},setReadOnly:function(a){if(this.rendered){this.eachItem(function(b){b.setReadOnly(a)
})
}this.readOnly=a
},onDisable:function(){this.eachItem(function(a){a.disable()
})
},onEnable:function(){this.eachItem(function(a){a.enable()
})
},onResize:function(a,b){this.panel.setSize(a,b);
this.panel.doLayout()
},reset:function(){if(this.originalValue){this.eachItem(function(a){if(a.setValue){a.setValue(false);
a.originalValue=a.getValue()
}});
this.resetOriginal=true;
this.setValue(this.originalValue);
delete this.resetOriginal
}else{this.eachItem(function(a){if(a.reset){a.reset()
}})
}(function(){this.clearInvalid()
}).defer(50,this)
},setValue:function(){if(this.rendered){this.onSetValue.apply(this,arguments)
}else{this.buffered=true;
this.value=arguments
}return this
},onSetValue:function(d,c){if(arguments.length==1){if(Ext.isArray(d)){Ext.each(d,function(g,e){if(Ext.isObject(g)&&g.setValue){g.setValue(true);
if(this.resetOriginal===true){g.originalValue=g.getValue()
}}else{var f=this.items.itemAt(e);
if(f){f.setValue(g)
}}},this)
}else{if(Ext.isObject(d)){for(var a in d){var b=this.getBox(a);
if(b){b.setValue(d[a])
}}}else{this.setValueForItem(d)
}}}else{var b=this.getBox(d);
if(b){b.setValue(c)
}}},beforeDestroy:function(){Ext.destroy(this.panel);
if(!this.rendered){Ext.destroy(this.items)
}Ext.form.CheckboxGroup.superclass.beforeDestroy.call(this)
},setValueForItem:function(a){a=String(a).split(",");
this.eachItem(function(b){if(a.indexOf(b.inputValue)>-1){b.setValue(true)
}})
},getBox:function(b){var a=null;
this.eachItem(function(c){if(b==c||c.dataIndex==b||c.id==b||c.getName()==b){a=c;
return false
}});
return a
},getValue:function(){var a=[];
this.eachItem(function(b){if(b.checked){a.push(b)
}});
return a
},eachItem:function(b,a){if(this.items&&this.items.each){this.items.each(b,a||this)
}},getRawValue:Ext.emptyFn,setRawValue:Ext.emptyFn});
Ext.reg("checkboxgroup",Ext.form.CheckboxGroup);
Ext.form.CompositeField=Ext.extend(Ext.form.Field,{defaultMargins:"0 5 0 0",skipLastItemMargin:true,isComposite:true,combineErrors:true,labelConnector:", ",initComponent:function(){var f=[],b=this.items,e;
for(var d=0,c=b.length;
d<c;
d++){e=b[d];
if(!Ext.isEmpty(e.ref)){e.ref="../"+e.ref
}f.push(e.fieldLabel);
Ext.applyIf(e,this.defaults);
if(!(d==c-1&&this.skipLastItemMargin)){Ext.applyIf(e,{margins:this.defaultMargins})
}}this.fieldLabel=this.fieldLabel||this.buildLabel(f);
this.fieldErrors=new Ext.util.MixedCollection(true,function(g){return g.field
});
this.fieldErrors.on({scope:this,add:this.updateInvalidMark,remove:this.updateInvalidMark,replace:this.updateInvalidMark});
Ext.form.CompositeField.superclass.initComponent.apply(this,arguments);
this.innerCt=new Ext.Container({layout:"hbox",items:this.items,cls:"x-form-composite",defaultMargins:"0 3 0 0",ownerCt:this});
this.innerCt.ownerCt=undefined;
var a=this.innerCt.findBy(function(g){return g.isFormField
},this);
this.items=new Ext.util.MixedCollection();
this.items.addAll(a)
},onRender:function(c,a){if(!this.el){var d=this.innerCt;
d.render(c);
this.el=d.getEl();
if(this.combineErrors){this.eachItem(function(e){Ext.apply(e,{markInvalid:this.onFieldMarkInvalid.createDelegate(this,[e],0),clearInvalid:this.onFieldClearInvalid.createDelegate(this,[e],0)})
})
}var b=this.el.parent().parent().child("label",true);
if(b){b.setAttribute("for",this.items.items[0].id)
}}Ext.form.CompositeField.superclass.onRender.apply(this,arguments)
},onFieldMarkInvalid:function(d,c){var b=d.getName(),a={field:b,errorName:d.fieldLabel||b,error:c};
this.fieldErrors.replace(b,a);
if(!d.preventMark){d.el.addClass(d.invalidClass)
}},onFieldClearInvalid:function(a){this.fieldErrors.removeKey(a.getName());
a.el.removeClass(a.invalidClass)
},updateInvalidMark:function(){var a=Ext.isIE6&&Ext.isStrict;
if(this.fieldErrors.length==0){this.clearInvalid();
if(a){this.clearInvalid.defer(50,this)
}}else{var b=this.buildCombinedErrorMessage(this.fieldErrors.items);
this.sortErrors();
this.markInvalid(b);
if(a){this.markInvalid(b)
}}},validateValue:function(c,a){var b=true;
this.eachItem(function(d){if(!d.isValid(a)){b=false
}});
return b
},buildCombinedErrorMessage:function(e){var d=[],b;
for(var c=0,a=e.length;
c<a;
c++){b=e[c];
d.push(String.format("{0}: {1}",b.errorName,b.error))
}return d.join("<br />")
},sortErrors:function(){var a=this.items;
this.fieldErrors.sort("ASC",function(f,d){var c=function(b){return function(h){return h.getName()==b
}
};
var g=a.findIndexBy(c(f.field)),e=a.findIndexBy(c(d.field));
return g<e?-1:1
})
},reset:function(){this.eachItem(function(a){a.reset()
});
(function(){this.clearInvalid()
}).defer(50,this)
},clearInvalidChildren:function(){this.eachItem(function(a){a.clearInvalid()
})
},buildLabel:function(a){return Ext.clean(a).join(this.labelConnector)
},isDirty:function(){if(this.disabled||!this.rendered){return false
}var a=false;
this.eachItem(function(b){if(b.isDirty()){a=true;
return false
}});
return a
},eachItem:function(b,a){if(this.items&&this.items.each){this.items.each(b,a||this)
}},onResize:function(e,c,a,d){var b=this.innerCt;
if(this.rendered&&b.rendered){b.setSize(e,c)
}Ext.form.CompositeField.superclass.onResize.apply(this,arguments)
},doLayout:function(c,b){if(this.rendered){var a=this.innerCt;
a.forceLayout=this.ownerCt.forceLayout;
a.doLayout(c,b)
}},beforeDestroy:function(){Ext.destroy(this.innerCt);
Ext.form.CompositeField.superclass.beforeDestroy.call(this)
},setReadOnly:function(a){if(a==undefined){a=true
}a=!!a;
if(this.rendered){this.eachItem(function(b){b.setReadOnly(a)
})
}this.readOnly=a
},onShow:function(){Ext.form.CompositeField.superclass.onShow.call(this);
this.doLayout()
},onDisable:function(){this.eachItem(function(a){a.disable()
})
},onEnable:function(){this.eachItem(function(a){a.enable()
})
}});
Ext.reg("compositefield",Ext.form.CompositeField);
Ext.form.Radio=Ext.extend(Ext.form.Checkbox,{inputType:"radio",markInvalid:Ext.emptyFn,clearInvalid:Ext.emptyFn,getGroupValue:function(){var a=this.el.up("form")||Ext.getBody();
var b=a.child('input[name="'+this.el.dom.name+'"]:checked',true);
return b?b.value:null
},setValue:function(b){var a,d,c;
if(typeof b=="boolean"){Ext.form.Radio.superclass.setValue.call(this,b)
}else{if(this.rendered){a=this.getCheckEl();
c=a.child('input[name="'+this.el.dom.name+'"][value="'+b+'"]',true);
if(c){Ext.getCmp(c.id).setValue(true)
}}}if(this.rendered&&this.checked){a=a||this.getCheckEl();
d=this.getCheckEl().select('input[name="'+this.el.dom.name+'"]');
d.each(function(e){if(e.dom.id!=this.id){Ext.getCmp(e.dom.id).setValue(false)
}},this)
}return this
},getCheckEl:function(){if(this.inGroup){return this.el.up(".x-form-radio-group")
}return this.el.up("form")||Ext.getBody()
}});
Ext.reg("radio",Ext.form.Radio);
Ext.form.RadioGroup=Ext.extend(Ext.form.CheckboxGroup,{allowBlank:true,blankText:"You must select one item in this group",defaultType:"radio",groupCls:"x-form-radio-group",getValue:function(){var a=null;
this.eachItem(function(b){if(b.checked){a=b;
return false
}});
return a
},onSetValue:function(c,b){if(arguments.length>1){var a=this.getBox(c);
if(a){a.setValue(b);
if(a.checked){this.eachItem(function(d){if(d!==a){d.setValue(false)
}})
}}}else{this.setValueForItem(c)
}},setValueForItem:function(a){a=String(a).split(",")[0];
this.eachItem(function(b){b.setValue(a==b.inputValue)
})
},fireChecked:function(){if(!this.checkTask){this.checkTask=new Ext.util.DelayedTask(this.bufferChecked,this)
}this.checkTask.delay(10)
},bufferChecked:function(){var a=null;
this.eachItem(function(b){if(b.checked){a=b;
return false
}});
this.fireEvent("change",this,a)
},onDestroy:function(){if(this.checkTask){this.checkTask.cancel();
this.checkTask=null
}Ext.form.RadioGroup.superclass.onDestroy.call(this)
}});
Ext.reg("radiogroup",Ext.form.RadioGroup);
Ext.form.Hidden=Ext.extend(Ext.form.Field,{inputType:"hidden",shouldLayout:false,onRender:function(){Ext.form.Hidden.superclass.onRender.apply(this,arguments)
},initEvents:function(){this.originalValue=this.getValue()
},setSize:Ext.emptyFn,setWidth:Ext.emptyFn,setHeight:Ext.emptyFn,setPosition:Ext.emptyFn,setPagePosition:Ext.emptyFn,markInvalid:Ext.emptyFn,clearInvalid:Ext.emptyFn});
Ext.reg("hidden",Ext.form.Hidden);
Ext.form.BasicForm=Ext.extend(Ext.util.Observable,{constructor:function(b,a){Ext.apply(this,a);
if(Ext.isString(this.paramOrder)){this.paramOrder=this.paramOrder.split(/[\s,|]/)
}this.items=new Ext.util.MixedCollection(false,function(c){return c.getItemId()
});
this.addEvents("beforeaction","actionfailed","actioncomplete");
if(b){this.initEl(b)
}Ext.form.BasicForm.superclass.constructor.call(this)
},timeout:30,paramOrder:undefined,paramsAsHash:false,waitTitle:"Please Wait...",activeAction:null,trackResetOnLoad:false,initEl:function(a){this.el=Ext.get(a);
this.id=this.el.id||Ext.id();
if(!this.standardSubmit){this.el.on("submit",this.onSubmit,this)
}this.el.addClass("x-form")
},getEl:function(){return this.el
},onSubmit:function(a){a.stopEvent()
},destroy:function(a){if(a!==true){this.items.each(function(b){Ext.destroy(b)
});
Ext.destroy(this.el)
}this.items.clear();
this.purgeListeners()
},isValid:function(){var a=true;
this.items.each(function(b){if(!b.validate()){a=false
}});
return a
},isDirty:function(){var a=false;
this.items.each(function(b){if(b.isDirty()){a=true;
return false
}});
return a
},doAction:function(b,a){if(Ext.isString(b)){b=new Ext.form.Action.ACTION_TYPES[b](this,a)
}if(this.fireEvent("beforeaction",this,b)!==false){this.beforeAction(b);
b.run.defer(100,b)
}return this
},submit:function(b){b=b||{};
if(this.standardSubmit){var a=b.clientValidation===false||this.isValid();
if(a){var c=this.el.dom;
if(this.url&&Ext.isEmpty(c.action)){c.action=this.url
}c.submit()
}return a
}var d=String.format("{0}submit",this.api?"direct":"");
this.doAction(d,b);
return this
},load:function(a){var b=String.format("{0}load",this.api?"direct":"");
this.doAction(b,a);
return this
},updateRecord:function(b){b.beginEdit();
var a=b.fields,d,c;
a.each(function(e){d=this.findField(e.name);
if(d){c=d.getValue();
if(Ext.type(c)!==false&&c.getGroupValue){c=c.getGroupValue()
}else{if(d.eachItem){c=[];
d.eachItem(function(f){c.push(f.getValue())
})
}}b.set(e.name,c)
}},this);
b.endEdit();
return this
},loadRecord:function(a){this.setValues(a.data);
return this
},beforeAction:function(a){this.items.each(function(c){if(c.isFormField&&c.syncValue){c.syncValue()
}});
var b=a.options;
if(b.waitMsg){if(this.waitMsgTarget===true){this.el.mask(b.waitMsg,"x-mask-loading")
}else{if(this.waitMsgTarget){this.waitMsgTarget=Ext.get(this.waitMsgTarget);
this.waitMsgTarget.mask(b.waitMsg,"x-mask-loading")
}else{Ext.MessageBox.wait(b.waitMsg,b.waitTitle||this.waitTitle)
}}}},afterAction:function(a,c){this.activeAction=null;
var b=a.options;
if(b.waitMsg){if(this.waitMsgTarget===true){this.el.unmask()
}else{if(this.waitMsgTarget){this.waitMsgTarget.unmask()
}else{Ext.MessageBox.updateProgress(1);
Ext.MessageBox.hide()
}}}if(c){if(b.reset){this.reset()
}Ext.callback(b.success,b.scope,[this,a]);
this.fireEvent("actioncomplete",this,a)
}else{Ext.callback(b.failure,b.scope,[this,a]);
this.fireEvent("actionfailed",this,a)
}},findField:function(c){var b=this.items.get(c);
if(!Ext.isObject(b)){var a=function(d){if(d.isFormField){if(d.dataIndex==c||d.id==c||d.getName()==c){b=d;
return false
}else{if(d.isComposite){return d.items.each(a)
}else{if(d instanceof Ext.form.CheckboxGroup&&d.rendered){return d.eachItem(a)
}}}}};
this.items.each(a)
}return b||null
},markInvalid:function(h){if(Ext.isArray(h)){for(var c=0,a=h.length;
c<a;
c++){var b=h[c];
var d=this.findField(b.id);
if(d){d.markInvalid(b.msg)
}}}else{var e,g;
for(g in h){if(!Ext.isFunction(h[g])&&(e=this.findField(g))){e.markInvalid(h[g])
}}}return this
},setValues:function(c){if(Ext.isArray(c)){for(var d=0,a=c.length;
d<a;
d++){var b=c[d];
var e=this.findField(b.id);
if(e){e.setValue(b.value);
if(this.trackResetOnLoad){e.originalValue=e.getValue()
}}}}else{var g,h;
for(h in c){if(!Ext.isFunction(c[h])&&(g=this.findField(h))){g.setValue(c[h]);
if(this.trackResetOnLoad){g.originalValue=g.getValue()
}}}}return this
},getValues:function(b){var a=Ext.lib.Ajax.serializeForm(this.el.dom);
if(b===true){return a
}return Ext.urlDecode(a)
},getFieldValues:function(a){var d={},e,b,c;
this.items.each(function(g){if(!g.disabled&&(a!==true||g.isDirty())){e=g.getName();
b=d[e];
c=g.getValue();
if(Ext.isDefined(b)){if(Ext.isArray(b)){d[e].push(c)
}else{d[e]=[b,c]
}}else{d[e]=c
}}});
return d
},clearInvalid:function(){this.items.each(function(a){a.clearInvalid()
});
return this
},reset:function(){this.items.each(function(a){a.reset()
});
return this
},add:function(){this.items.addAll(Array.prototype.slice.call(arguments,0));
return this
},remove:function(a){this.items.remove(a);
return this
},cleanDestroyed:function(){this.items.filterBy(function(a){return !!a.isDestroyed
}).each(this.remove,this)
},render:function(){this.items.each(function(a){if(a.isFormField&&!a.rendered&&document.getElementById(a.id)){a.applyToMarkup(a.id)
}});
return this
},applyToFields:function(a){this.items.each(function(b){Ext.apply(b,a)
});
return this
},applyIfToFields:function(a){this.items.each(function(b){Ext.applyIf(b,a)
});
return this
},callFieldMethod:function(b,a){a=a||[];
this.items.each(function(c){if(Ext.isFunction(c[b])){c[b].apply(c,a)
}});
return this
}});
Ext.BasicForm=Ext.form.BasicForm;
Ext.FormPanel=Ext.extend(Ext.Panel,{minButtonWidth:75,labelAlign:"left",monitorValid:false,monitorPoll:200,layout:"form",initComponent:function(){this.form=this.createForm();
Ext.FormPanel.superclass.initComponent.call(this);
this.bodyCfg={tag:"form",cls:this.baseCls+"-body",method:this.method||"POST",id:this.formId||Ext.id()};
if(this.fileUpload){this.bodyCfg.enctype="multipart/form-data"
}this.initItems();
this.addEvents("clientvalidation");
this.relayEvents(this.form,["beforeaction","actionfailed","actioncomplete"])
},createForm:function(){var a=Ext.applyIf({listeners:{}},this.initialConfig);
return new Ext.form.BasicForm(null,a)
},initFields:function(){var c=this.form;
var a=this;
var b=function(d){if(a.isField(d)){c.add(d)
}else{if(d.findBy&&d!=a){a.applySettings(d);
if(d.items&&d.items.each){d.items.each(b,this)
}}}};
this.items.each(b,this)
},applySettings:function(b){var a=b.ownerCt;
Ext.applyIf(b,{labelAlign:a.labelAlign,labelWidth:a.labelWidth,itemCls:a.itemCls})
},getLayoutTarget:function(){return this.form.el
},getForm:function(){return this.form
},onRender:function(b,a){this.initFields();
Ext.FormPanel.superclass.onRender.call(this,b,a);
this.form.initEl(this.body)
},beforeDestroy:function(){this.stopMonitoring();
this.form.destroy(true);
Ext.FormPanel.superclass.beforeDestroy.call(this)
},isField:function(a){return !!a.setValue&&!!a.getValue&&!!a.markInvalid&&!!a.clearInvalid
},initEvents:function(){Ext.FormPanel.superclass.initEvents.call(this);
this.on({scope:this,add:this.onAddEvent,remove:this.onRemoveEvent});
if(this.monitorValid){this.startMonitoring()
}},onAdd:function(a){Ext.FormPanel.superclass.onAdd.call(this,a);
this.processAdd(a)
},onAddEvent:function(a,b){if(a!==this){this.processAdd(b)
}},processAdd:function(a){if(this.isField(a)){this.form.add(a)
}else{if(a.findBy){this.applySettings(a);
this.form.add.apply(this.form,a.findBy(this.isField))
}}},onRemove:function(a){Ext.FormPanel.superclass.onRemove.call(this,a);
this.processRemove(a)
},onRemoveEvent:function(a,b){if(a!==this){this.processRemove(b)
}},processRemove:function(a){if(!this.destroying){if(this.isField(a)){this.form.remove(a)
}else{if(a.findBy){Ext.each(a.findBy(this.isField),this.form.remove,this.form);
this.form.cleanDestroyed()
}}}},startMonitoring:function(){if(!this.validTask){this.validTask=new Ext.util.TaskRunner();
this.validTask.start({run:this.bindHandler,interval:this.monitorPoll||200,scope:this})
}},stopMonitoring:function(){if(this.validTask){this.validTask.stopAll();
this.validTask=null
}},load:function(){this.form.load.apply(this.form,arguments)
},onDisable:function(){Ext.FormPanel.superclass.onDisable.call(this);
if(this.form){this.form.items.each(function(){this.disable()
})
}},onEnable:function(){Ext.FormPanel.superclass.onEnable.call(this);
if(this.form){this.form.items.each(function(){this.enable()
})
}},bindHandler:function(){var e=true;
this.form.items.each(function(g){if(!g.isValid(true)){e=false;
return false
}});
if(this.fbar){var b=this.fbar.items.items;
for(var d=0,a=b.length;
d<a;
d++){var c=b[d];
if(c.formBind===true&&c.disabled===e){c.setDisabled(!e)
}}}this.fireEvent("clientvalidation",this,e)
}});
Ext.reg("form",Ext.FormPanel);
Ext.form.FormPanel=Ext.FormPanel;
Ext.form.FieldSet=Ext.extend(Ext.Panel,{baseCls:"x-fieldset",layout:"form",animCollapse:false,onRender:function(b,a){if(!this.el){this.el=document.createElement("fieldset");
this.el.id=this.id;
if(this.title||this.header||this.checkboxToggle){this.el.appendChild(document.createElement("legend")).className=this.baseCls+"-header"
}}Ext.form.FieldSet.superclass.onRender.call(this,b,a);
if(this.checkboxToggle){var c=typeof this.checkboxToggle=="object"?this.checkboxToggle:{tag:"input",type:"checkbox",name:this.checkboxName||this.id+"-checkbox"};
this.checkbox=this.header.insertFirst(c);
this.checkbox.dom.checked=!this.collapsed;
this.mon(this.checkbox,"click",this.onCheckClick,this)
}},onCollapse:function(a,b){if(this.checkbox){this.checkbox.dom.checked=false
}Ext.form.FieldSet.superclass.onCollapse.call(this,a,b)
},onExpand:function(a,b){if(this.checkbox){this.checkbox.dom.checked=true
}Ext.form.FieldSet.superclass.onExpand.call(this,a,b)
},onCheckClick:function(){this[this.checkbox.dom.checked?"expand":"collapse"]()
}});
Ext.reg("fieldset",Ext.form.FieldSet);
Ext.form.HtmlEditor=Ext.extend(Ext.form.Field,{enableFormat:true,enableFontSize:true,enableColors:true,enableAlignments:true,enableLists:true,enableSourceEdit:true,enableLinks:true,enableFont:true,createLinkText:"Please enter the URL for the link:",defaultLinkValue:"http://",fontFamilies:["Arial","Courier New","Tahoma","Times New Roman","Verdana"],defaultFont:"tahoma",defaultValue:(Ext.isOpera||Ext.isIE6)?"&#160;":"&#8203;",actionMode:"wrap",validationEvent:false,deferHeight:true,initialized:false,activated:false,sourceEditMode:false,onFocus:Ext.emptyFn,iframePad:3,hideMode:"offsets",defaultAutoCreate:{tag:"textarea",style:"width:500px;height:300px;",autocomplete:"off"},initComponent:function(){this.addEvents("initialize","activate","beforesync","beforepush","sync","push","editmodechange");
Ext.form.HtmlEditor.superclass.initComponent.call(this)
},createFontOptions:function(){var d=[],b=this.fontFamilies,c,f;
for(var e=0,a=b.length;
e<a;
e++){c=b[e];
f=c.toLowerCase();
d.push('<option value="',f,'" style="font-family:',c,';"',(this.defaultFont==f?' selected="true">':">"),c,"</option>")
}return d.join("")
},createToolbar:function(e){var c=[];
var a=Ext.QuickTips&&Ext.QuickTips.isEnabled();
function d(i,g,h){return{itemId:i,cls:"x-btn-icon",iconCls:"x-edit-"+i,enableToggle:g!==false,scope:e,handler:h||e.relayBtnCmd,clickEvent:"mousedown",tooltip:a?e.buttonTips[i]||undefined:undefined,overflowText:e.buttonTips[i].title||undefined,tabIndex:-1}
}if(this.enableFont&&!Ext.isSafari2){var f=new Ext.Toolbar.Item({autoEl:{tag:"select",cls:"x-font-select",html:this.createFontOptions()}});
c.push(f,"-")
}if(this.enableFormat){c.push(d("bold"),d("italic"),d("underline"))
}if(this.enableFontSize){c.push("-",d("increasefontsize",false,this.adjustFont),d("decreasefontsize",false,this.adjustFont))
}if(this.enableColors){c.push("-",{itemId:"forecolor",cls:"x-btn-icon",iconCls:"x-edit-forecolor",clickEvent:"mousedown",tooltip:a?e.buttonTips.forecolor||undefined:undefined,tabIndex:-1,menu:new Ext.menu.ColorMenu({allowReselect:true,focus:Ext.emptyFn,value:"000000",plain:true,listeners:{scope:this,select:function(h,g){this.execCmd("forecolor",Ext.isWebKit||Ext.isIE?"#"+g:g);
this.deferFocus()
}},clickEvent:"mousedown"})},{itemId:"backcolor",cls:"x-btn-icon",iconCls:"x-edit-backcolor",clickEvent:"mousedown",tooltip:a?e.buttonTips.backcolor||undefined:undefined,tabIndex:-1,menu:new Ext.menu.ColorMenu({focus:Ext.emptyFn,value:"FFFFFF",plain:true,allowReselect:true,listeners:{scope:this,select:function(h,g){if(Ext.isGecko){this.execCmd("useCSS",false);
this.execCmd("hilitecolor",g);
this.execCmd("useCSS",true);
this.deferFocus()
}else{this.execCmd(Ext.isOpera?"hilitecolor":"backcolor",Ext.isWebKit||Ext.isIE?"#"+g:g);
this.deferFocus()
}}},clickEvent:"mousedown"})})
}if(this.enableAlignments){c.push("-",d("justifyleft"),d("justifycenter"),d("justifyright"))
}if(!Ext.isSafari2){if(this.enableLinks){c.push("-",d("createlink",false,this.createLink))
}if(this.enableLists){c.push("-",d("insertorderedlist"),d("insertunorderedlist"))
}if(this.enableSourceEdit){c.push("-",d("sourceedit",true,function(g){this.toggleSourceEdit(!this.sourceEditMode)
}))
}}var b=new Ext.Toolbar({renderTo:this.wrap.dom.firstChild,items:c});
if(f){this.fontSelect=f.el;
this.mon(this.fontSelect,"change",function(){var g=this.fontSelect.dom.value;
this.relayCmd("fontname",g);
this.deferFocus()
},this)
}this.mon(b.el,"click",function(g){g.preventDefault()
});
this.tb=b;
this.tb.doLayout()
},onDisable:function(){this.wrap.mask();
Ext.form.HtmlEditor.superclass.onDisable.call(this)
},onEnable:function(){this.wrap.unmask();
Ext.form.HtmlEditor.superclass.onEnable.call(this)
},setReadOnly:function(b){Ext.form.HtmlEditor.superclass.setReadOnly.call(this,b);
if(this.initialized){if(Ext.isIE){this.getEditorBody().contentEditable=!b
}else{this.setDesignMode(!b)
}var a=this.getEditorBody();
if(a){a.style.cursor=this.readOnly?"default":"text"
}this.disableItems(b)
}},getDocMarkup:function(){var a=Ext.fly(this.iframe).getHeight()-this.iframePad*2;
return String.format('<html><head><style type="text/css">body{border: 0; margin: 0; padding: {0}px; height: {1}px; cursor: text}</style></head><body></body></html>',this.iframePad,a)
},getEditorBody:function(){var a=this.getDoc();
return a.body||a.documentElement
},getDoc:function(){return Ext.isIE?this.getWin().document:(this.iframe.contentDocument||this.getWin().document)
},getWin:function(){return Ext.isIE?this.iframe.contentWindow:window.frames[this.iframe.name]
},onRender:function(b,a){Ext.form.HtmlEditor.superclass.onRender.call(this,b,a);
this.el.dom.style.border="0 none";
this.el.dom.setAttribute("tabIndex",-1);
this.el.addClass("x-hidden");
if(Ext.isIE){this.el.applyStyles("margin-top:-1px;margin-bottom:-1px;")
}this.wrap=this.el.wrap({cls:"x-html-editor-wrap",cn:{cls:"x-html-editor-tb"}});
this.createToolbar(this);
this.disableItems(true);
this.tb.doLayout();
this.createIFrame();
if(!this.width){var c=this.el.getSize();
this.setSize(c.width,this.height||c.height)
}this.resizeEl=this.positionEl=this.wrap
},createIFrame:function(){var a=document.createElement("iframe");
a.name=Ext.id();
a.frameBorder="0";
a.style.overflow="auto";
a.src=Ext.SSL_SECURE_URL;
this.wrap.dom.appendChild(a);
this.iframe=a;
this.monitorTask=Ext.TaskMgr.start({run:this.checkDesignMode,scope:this,interval:100})
},initFrame:function(){Ext.TaskMgr.stop(this.monitorTask);
var b=this.getDoc();
this.win=this.getWin();
b.open();
b.write(this.getDocMarkup());
b.close();
var a={run:function(){var c=this.getDoc();
if(c.body||c.readyState=="complete"){Ext.TaskMgr.stop(a);
this.setDesignMode(true);
this.initEditor.defer(10,this)
}},interval:10,duration:10000,scope:this};
Ext.TaskMgr.start(a)
},checkDesignMode:function(){if(this.wrap&&this.wrap.dom.offsetWidth){var a=this.getDoc();
if(!a){return
}if(!a.editorInitialized||this.getDesignMode()!="on"){this.initFrame()
}}},setDesignMode:function(b){var a=this.getDoc();
if(a){if(this.readOnly){b=false
}a.designMode=(/on|true/i).test(String(b).toLowerCase())?"on":"off"
}},getDesignMode:function(){var a=this.getDoc();
if(!a){return""
}return String(a.designMode).toLowerCase()
},disableItems:function(a){if(this.fontSelect){this.fontSelect.dom.disabled=a
}this.tb.items.each(function(b){if(b.getItemId()!="sourceedit"){b.setDisabled(a)
}})
},onResize:function(b,c){Ext.form.HtmlEditor.superclass.onResize.apply(this,arguments);
if(this.el&&this.iframe){if(Ext.isNumber(b)){var e=b-this.wrap.getFrameWidth("lr");
this.el.setWidth(e);
this.tb.setWidth(e);
this.iframe.style.width=Math.max(e,0)+"px"
}if(Ext.isNumber(c)){var a=c-this.wrap.getFrameWidth("tb")-this.tb.el.getHeight();
this.el.setHeight(a);
this.iframe.style.height=Math.max(a,0)+"px";
var d=this.getEditorBody();
if(d){d.style.height=Math.max((a-(this.iframePad*2)),0)+"px"
}}}},toggleSourceEdit:function(b){var d,a;
if(b===undefined){b=!this.sourceEditMode
}this.sourceEditMode=b===true;
var c=this.tb.getComponent("sourceedit");
if(c.pressed!==this.sourceEditMode){c.toggle(this.sourceEditMode);
if(!c.xtbHidden){return
}}if(this.sourceEditMode){this.previousSize=this.getSize();
d=Ext.get(this.iframe).getHeight();
this.disableItems(true);
this.syncValue();
this.iframe.className="x-hidden";
this.el.removeClass("x-hidden");
this.el.dom.removeAttribute("tabIndex");
this.el.focus();
this.el.dom.style.height=d+"px"
}else{a=parseInt(this.el.dom.style.height,10);
if(this.initialized){this.disableItems(this.readOnly)
}this.pushValue();
this.iframe.className="";
this.el.addClass("x-hidden");
this.el.dom.setAttribute("tabIndex",-1);
this.deferFocus();
this.setSize(this.previousSize);
delete this.previousSize;
this.iframe.style.height=a+"px"
}this.fireEvent("editmodechange",this,this.sourceEditMode)
},createLink:function(){var a=prompt(this.createLinkText,this.defaultLinkValue);
if(a&&a!="http://"){this.relayCmd("createlink",a)
}},initEvents:function(){this.originalValue=this.getValue()
},markInvalid:Ext.emptyFn,clearInvalid:Ext.emptyFn,setValue:function(a){Ext.form.HtmlEditor.superclass.setValue.call(this,a);
this.pushValue();
return this
},cleanHtml:function(a){a=String(a);
if(Ext.isWebKit){a=a.replace(/\sclass="(?:Apple-style-span|khtml-block-placeholder)"/gi,"")
}if(a.charCodeAt(0)==this.defaultValue.replace(/\D/g,"")){a=a.substring(1)
}return a
},syncValue:function(){if(this.initialized){var d=this.getEditorBody();
var c=d.innerHTML;
if(Ext.isWebKit){var b=d.getAttribute("style");
var a=b.match(/text-align:(.*?);/i);
if(a&&a[1]){c='<div style="'+a[0]+'">'+c+"</div>"
}}c=this.cleanHtml(c);
if(this.fireEvent("beforesync",this,c)!==false){this.el.dom.value=c;
this.fireEvent("sync",this,c)
}}},getValue:function(){this[this.sourceEditMode?"pushValue":"syncValue"]();
return Ext.form.HtmlEditor.superclass.getValue.call(this)
},pushValue:function(){if(this.initialized){var a=this.el.dom.value;
if(!this.activated&&a.length<1){a=this.defaultValue
}if(this.fireEvent("beforepush",this,a)!==false){this.getEditorBody().innerHTML=a;
if(Ext.isGecko){this.setDesignMode(false);
this.setDesignMode(true)
}this.fireEvent("push",this,a)
}}},deferFocus:function(){this.focus.defer(10,this)
},focus:function(){if(this.win&&!this.sourceEditMode){this.win.focus()
}else{this.el.focus()
}},initEditor:function(){try{var c=this.getEditorBody(),a=this.el.getStyles("font-size","font-family","background-image","background-repeat","background-color","color"),f,b;
a["background-attachment"]="fixed";
c.bgProperties="fixed";
Ext.DomHelper.applyStyles(c,a);
f=this.getDoc();
if(f){try{Ext.EventManager.removeAll(f)
}catch(d){}}b=this.onEditorEvent.createDelegate(this);
Ext.EventManager.on(f,{mousedown:b,dblclick:b,click:b,keyup:b,buffer:100});
if(Ext.isGecko){Ext.EventManager.on(f,"keypress",this.applyCommand,this)
}if(Ext.isIE||Ext.isWebKit||Ext.isOpera){Ext.EventManager.on(f,"keydown",this.fixKeys,this)
}f.editorInitialized=true;
this.initialized=true;
this.pushValue();
this.setReadOnly(this.readOnly);
this.fireEvent("initialize",this)
}catch(d){}},beforeDestroy:function(){if(this.monitorTask){Ext.TaskMgr.stop(this.monitorTask)
}if(this.rendered){Ext.destroy(this.tb);
var b=this.getDoc();
if(b){try{Ext.EventManager.removeAll(b);
for(var c in b){delete b[c]
}}catch(a){}}if(this.wrap){this.wrap.dom.innerHTML="";
this.wrap.remove()
}}Ext.form.HtmlEditor.superclass.beforeDestroy.call(this)
},onFirstFocus:function(){this.activated=true;
this.disableItems(this.readOnly);
if(Ext.isGecko){this.win.focus();
var a=this.win.getSelection();
if(!a.focusNode||a.focusNode.nodeType!=3){var b=a.getRangeAt(0);
b.selectNodeContents(this.getEditorBody());
b.collapse(true);
this.deferFocus()
}try{this.execCmd("useCSS",true);
this.execCmd("styleWithCSS",false)
}catch(c){}}this.fireEvent("activate",this)
},adjustFont:function(b){var d=b.getItemId()=="increasefontsize"?1:-1,c=this.getDoc(),a=parseInt(c.queryCommandValue("FontSize")||2,10);
if((Ext.isSafari&&!Ext.isSafari2)||Ext.isChrome||Ext.isAir){if(a<=10){a=1+d
}else{if(a<=13){a=2+d
}else{if(a<=16){a=3+d
}else{if(a<=18){a=4+d
}else{if(a<=24){a=5+d
}else{a=6+d
}}}}}a=a.constrain(1,6)
}else{if(Ext.isSafari){d*=2
}a=Math.max(1,a+d)+(Ext.isSafari?"px":0)
}this.execCmd("FontSize",a)
},onEditorEvent:function(a){this.updateToolbar()
},updateToolbar:function(){if(this.readOnly){return
}if(!this.activated){this.onFirstFocus();
return
}var b=this.tb.items.map,c=this.getDoc();
if(this.enableFont&&!Ext.isSafari2){var a=(c.queryCommandValue("FontName")||this.defaultFont).toLowerCase();
if(a!=this.fontSelect.dom.value){this.fontSelect.dom.value=a
}}if(this.enableFormat){b.bold.toggle(c.queryCommandState("bold"));
b.italic.toggle(c.queryCommandState("italic"));
b.underline.toggle(c.queryCommandState("underline"))
}if(this.enableAlignments){b.justifyleft.toggle(c.queryCommandState("justifyleft"));
b.justifycenter.toggle(c.queryCommandState("justifycenter"));
b.justifyright.toggle(c.queryCommandState("justifyright"))
}if(!Ext.isSafari2&&this.enableLists){b.insertorderedlist.toggle(c.queryCommandState("insertorderedlist"));
b.insertunorderedlist.toggle(c.queryCommandState("insertunorderedlist"))
}Ext.menu.MenuMgr.hideAll();
this.syncValue()
},relayBtnCmd:function(a){this.relayCmd(a.getItemId())
},relayCmd:function(b,a){(function(){this.focus();
this.execCmd(b,a);
this.updateToolbar()
}).defer(10,this)
},execCmd:function(b,a){var c=this.getDoc();
c.execCommand(b,false,a===undefined?null:a);
this.syncValue()
},applyCommand:function(b){if(b.ctrlKey){var d=b.getCharCode(),a;
if(d>0){d=String.fromCharCode(d);
switch(d){case"b":a="bold";
break;
case"i":a="italic";
break;
case"u":a="underline";
break
}if(a){this.win.focus();
this.execCmd(a);
this.deferFocus();
b.preventDefault()
}}}},insertAtCursor:function(c){if(!this.activated){return
}if(Ext.isIE){this.win.focus();
var b=this.getDoc(),a=b.selection.createRange();
if(a){a.pasteHTML(c);
this.syncValue();
this.deferFocus()
}}else{this.win.focus();
this.execCmd("InsertHTML",c);
this.deferFocus()
}},fixKeys:function(){if(Ext.isIE){return function(f){var a=f.getKey(),d=this.getDoc(),b;
if(a==f.TAB){f.stopEvent();
b=d.selection.createRange();
if(b){b.collapse(true);
b.pasteHTML("&nbsp;&nbsp;&nbsp;&nbsp;");
this.deferFocus()
}}else{if(a==f.ENTER){b=d.selection.createRange();
if(b){var c=b.parentElement();
if(!c||c.tagName.toLowerCase()!="li"){f.stopEvent();
b.pasteHTML("<br />");
b.collapse(false);
b.select()
}}}}}
}else{if(Ext.isOpera){return function(b){var a=b.getKey();
if(a==b.TAB){b.stopEvent();
this.win.focus();
this.execCmd("InsertHTML","&nbsp;&nbsp;&nbsp;&nbsp;");
this.deferFocus()
}}
}else{if(Ext.isWebKit){return function(b){var a=b.getKey();
if(a==b.TAB){b.stopEvent();
this.execCmd("InsertText","\t");
this.deferFocus()
}else{if(a==b.ENTER){b.stopEvent();
this.execCmd("InsertHtml","<br /><br />");
this.deferFocus()
}}}
}}}}(),getToolbar:function(){return this.tb
},buttonTips:{bold:{title:"Bold (Ctrl+B)",text:"Make the selected text bold.",cls:"x-html-editor-tip"},italic:{title:"Italic (Ctrl+I)",text:"Make the selected text italic.",cls:"x-html-editor-tip"},underline:{title:"Underline (Ctrl+U)",text:"Underline the selected text.",cls:"x-html-editor-tip"},increasefontsize:{title:"Grow Text",text:"Increase the font size.",cls:"x-html-editor-tip"},decreasefontsize:{title:"Shrink Text",text:"Decrease the font size.",cls:"x-html-editor-tip"},backcolor:{title:"Text Highlight Color",text:"Change the background color of the selected text.",cls:"x-html-editor-tip"},forecolor:{title:"Font Color",text:"Change the color of the selected text.",cls:"x-html-editor-tip"},justifyleft:{title:"Align Text Left",text:"Align text to the left.",cls:"x-html-editor-tip"},justifycenter:{title:"Center Text",text:"Center text in the editor.",cls:"x-html-editor-tip"},justifyright:{title:"Align Text Right",text:"Align text to the right.",cls:"x-html-editor-tip"},insertunorderedlist:{title:"Bullet List",text:"Start a bulleted list.",cls:"x-html-editor-tip"},insertorderedlist:{title:"Numbered List",text:"Start a numbered list.",cls:"x-html-editor-tip"},createlink:{title:"Hyperlink",text:"Make the selected text a hyperlink.",cls:"x-html-editor-tip"},sourceedit:{title:"Source Edit",text:"Switch to source editing mode.",cls:"x-html-editor-tip"}}});
Ext.reg("htmleditor",Ext.form.HtmlEditor);
Ext.form.TimeField=Ext.extend(Ext.form.ComboBox,{minValue:undefined,maxValue:undefined,minText:"The time in this field must be equal to or after {0}",maxText:"The time in this field must be equal to or before {0}",invalidText:"{0} is not a valid time",format:"g:i A",altFormats:"g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H|gi a|hi a|giA|hiA|gi A|hi A",increment:15,mode:"local",triggerAction:"all",typeAhead:false,initDate:"1/1/2008",initDateFormat:"j/n/Y",initComponent:function(){if(Ext.isDefined(this.minValue)){this.setMinValue(this.minValue,true)
}if(Ext.isDefined(this.maxValue)){this.setMaxValue(this.maxValue,true)
}if(!this.store){this.generateStore(true)
}Ext.form.TimeField.superclass.initComponent.call(this)
},setMinValue:function(b,a){this.setLimit(b,true,a);
return this
},setMaxValue:function(b,a){this.setLimit(b,false,a);
return this
},generateStore:function(b){var c=this.minValue||new Date(this.initDate).clearTime(),a=this.maxValue||new Date(this.initDate).clearTime().add("mi",(24*60)-1),d=[];
while(c<=a){d.push(c.dateFormat(this.format));
c=c.add("mi",this.increment)
}this.bindStore(d,b)
},setLimit:function(b,f,a){var e;
if(Ext.isString(b)){e=this.parseDate(b)
}else{if(Ext.isDate(b)){e=b
}}if(e){var c=new Date(this.initDate).clearTime();
c.setHours(e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds());
this[f?"minValue":"maxValue"]=c;
if(!a){this.generateStore()
}}},getValue:function(){var a=Ext.form.TimeField.superclass.getValue.call(this);
return this.formatDate(this.parseDate(a))||""
},setValue:function(a){return Ext.form.TimeField.superclass.setValue.call(this,this.formatDate(this.parseDate(a)))
},validateValue:Ext.form.DateField.prototype.validateValue,formatDate:Ext.form.DateField.prototype.formatDate,parseDate:function(g){if(!g||Ext.isDate(g)){return g
}var h=this.initDate+" ",f=this.initDateFormat+" ",b=Date.parseDate(h+g,f+this.format),c=this.altFormats;
if(!b&&c){if(!this.altFormatsArray){this.altFormatsArray=c.split("|")
}for(var e=0,d=this.altFormatsArray,a=d.length;
e<a&&!b;
e++){b=Date.parseDate(h+g,f+d[e])
}}return b
}});
Ext.reg("timefield",Ext.form.TimeField);
Ext.form.SliderField=Ext.extend(Ext.form.Field,{useTips:true,tipText:null,actionMode:"wrap",initComponent:function(){var b=Ext.copyTo({id:this.id+"-slider"},this.initialConfig,["vertical","minValue","maxValue","decimalPrecision","keyIncrement","increment","clickToChange","animate"]);
if(this.useTips){var a=this.tipText?{getText:this.tipText}:{};
b.plugins=[new Ext.slider.Tip(a)]
}this.slider=new Ext.Slider(b);
Ext.form.SliderField.superclass.initComponent.call(this)
},onRender:function(b,a){this.autoCreate={id:this.id,name:this.name,type:"hidden",tag:"input"};
Ext.form.SliderField.superclass.onRender.call(this,b,a);
this.wrap=this.el.wrap({cls:"x-form-field-wrap"});
this.resizeEl=this.positionEl=this.wrap;
this.slider.render(this.wrap)
},onResize:function(b,c,d,a){Ext.form.SliderField.superclass.onResize.call(this,b,c,d,a);
this.slider.setSize(b,c)
},initEvents:function(){Ext.form.SliderField.superclass.initEvents.call(this);
this.slider.on("change",this.onChange,this)
},onChange:function(b,a){this.setValue(a,undefined,true)
},onEnable:function(){Ext.form.SliderField.superclass.onEnable.call(this);
this.slider.enable()
},onDisable:function(){Ext.form.SliderField.superclass.onDisable.call(this);
this.slider.disable()
},beforeDestroy:function(){Ext.destroy(this.slider);
Ext.form.SliderField.superclass.beforeDestroy.call(this)
},alignErrorIcon:function(){this.errorIcon.alignTo(this.slider.el,"tl-tr",[2,0])
},setMinValue:function(a){this.slider.setMinValue(a);
return this
},setMaxValue:function(a){this.slider.setMaxValue(a);
return this
},setValue:function(c,b,a){if(!a){this.slider.setValue(c,b)
}return Ext.form.SliderField.superclass.setValue.call(this,this.slider.getValue())
},getValue:function(){return this.slider.getValue()
}});
Ext.reg("sliderfield",Ext.form.SliderField);
Ext.form.Label=Ext.extend(Ext.BoxComponent,{onRender:function(b,a){if(!this.el){this.el=document.createElement("label");
this.el.id=this.getId();
this.el.innerHTML=this.text?Ext.util.Format.htmlEncode(this.text):(this.html||"");
if(this.forId){this.el.setAttribute("for",this.forId)
}}Ext.form.Label.superclass.onRender.call(this,b,a)
},setText:function(a,b){var c=b===false;
this[!c?"text":"html"]=a;
delete this[c?"text":"html"];
if(this.rendered){this.el.dom.innerHTML=b!==false?Ext.util.Format.htmlEncode(a):a
}return this
}});
Ext.reg("label",Ext.form.Label);
Ext.form.Action=function(b,a){this.form=b;
this.options=a||{}
};
Ext.form.Action.CLIENT_INVALID="client";
Ext.form.Action.SERVER_INVALID="server";
Ext.form.Action.CONNECT_FAILURE="connect";
Ext.form.Action.LOAD_FAILURE="load";
Ext.form.Action.prototype={type:"default",run:function(a){},success:function(a){},handleResponse:function(a){},failure:function(a){this.response=a;
this.failureType=Ext.form.Action.CONNECT_FAILURE;
this.form.afterAction(this,false)
},processResponse:function(a){this.response=a;
if(!a.responseText&&!a.responseXML){return true
}this.result=this.handleResponse(a);
return this.result
},decodeResponse:function(a){try{return Ext.decode(a.responseText)
}catch(b){return false
}},getUrl:function(c){var a=this.options.url||this.form.url||this.form.el.dom.action;
if(c){var b=this.getParams();
if(b){a=Ext.urlAppend(a,b)
}}return a
},getMethod:function(){return(this.options.method||this.form.method||this.form.el.dom.method||"POST").toUpperCase()
},getParams:function(){var a=this.form.baseParams;
var b=this.options.params;
if(b){if(typeof b=="object"){b=Ext.urlEncode(Ext.applyIf(b,a))
}else{if(typeof b=="string"&&a){b+="&"+Ext.urlEncode(a)
}}}else{if(a){b=Ext.urlEncode(a)
}}return b
},createCallback:function(a){var a=a||{};
return{success:this.success,failure:this.failure,scope:this,timeout:(a.timeout*1000)||(this.form.timeout*1000),upload:this.form.fileUpload?this.success:undefined}
}};
Ext.form.Action.Submit=function(b,a){Ext.form.Action.Submit.superclass.constructor.call(this,b,a)
};
Ext.extend(Ext.form.Action.Submit,Ext.form.Action,{type:"submit",run:function(){var e=this.options,f=this.getMethod(),d=f=="GET";
if(e.clientValidation===false||this.form.isValid()){if(e.submitEmptyText===false){var a=this.form.items,c=[],b=function(g){if(g.el.getValue()==g.emptyText){c.push(g);
g.el.dom.value=""
}if(g.isComposite&&g.rendered){g.items.each(b)
}};
a.each(b)
}Ext.Ajax.request(Ext.apply(this.createCallback(e),{form:this.form.el.dom,url:this.getUrl(d),method:f,headers:e.headers,params:!d?this.getParams():null,isUpload:this.form.fileUpload}));
if(e.submitEmptyText===false){Ext.each(c,function(g){if(g.applyEmptyText){g.applyEmptyText()
}})
}}else{if(e.clientValidation!==false){this.failureType=Ext.form.Action.CLIENT_INVALID;
this.form.afterAction(this,false)
}}},success:function(b){var a=this.processResponse(b);
if(a===true||a.success){this.form.afterAction(this,true);
return
}if(a.errors){this.form.markInvalid(a.errors)
}this.failureType=Ext.form.Action.SERVER_INVALID;
this.form.afterAction(this,false)
},handleResponse:function(c){if(this.form.errorReader){var b=this.form.errorReader.read(c);
var f=[];
if(b.records){for(var d=0,a=b.records.length;
d<a;
d++){var e=b.records[d];
f[d]=e.data
}}if(f.length<1){f=null
}return{success:b.success,errors:f}
}return this.decodeResponse(c)
}});
Ext.form.Action.Load=function(b,a){Ext.form.Action.Load.superclass.constructor.call(this,b,a);
this.reader=this.form.reader
};
Ext.extend(Ext.form.Action.Load,Ext.form.Action,{type:"load",run:function(){Ext.Ajax.request(Ext.apply(this.createCallback(this.options),{method:this.getMethod(),url:this.getUrl(false),headers:this.options.headers,params:this.getParams()}))
},success:function(b){var a=this.processResponse(b);
if(a===true||!a.success||!a.data){this.failureType=Ext.form.Action.LOAD_FAILURE;
this.form.afterAction(this,false);
return
}this.form.clearInvalid();
this.form.setValues(a.data);
this.form.afterAction(this,true)
},handleResponse:function(b){if(this.form.reader){var a=this.form.reader.read(b);
var c=a.records&&a.records[0]?a.records[0].data:null;
return{success:a.success,data:c}
}return this.decodeResponse(b)
}});
Ext.form.Action.DirectLoad=Ext.extend(Ext.form.Action.Load,{constructor:function(b,a){Ext.form.Action.DirectLoad.superclass.constructor.call(this,b,a)
},type:"directload",run:function(){var a=this.getParams();
a.push(this.success,this);
this.form.api.load.apply(window,a)
},getParams:function(){var c=[],g={};
var e=this.form.baseParams;
var f=this.options.params;
Ext.apply(g,f,e);
var b=this.form.paramOrder;
if(b){for(var d=0,a=b.length;
d<a;
d++){c.push(g[b[d]])
}}else{if(this.form.paramsAsHash){c.push(g)
}}return c
},processResponse:function(a){this.result=a;
return a
},success:function(a,b){if(b.type==Ext.Direct.exceptions.SERVER){a={}
}Ext.form.Action.DirectLoad.superclass.success.call(this,a)
}});
Ext.form.Action.DirectSubmit=Ext.extend(Ext.form.Action.Submit,{constructor:function(b,a){Ext.form.Action.DirectSubmit.superclass.constructor.call(this,b,a)
},type:"directsubmit",run:function(){var a=this.options;
if(a.clientValidation===false||this.form.isValid()){this.success.params=this.getParams();
this.form.api.submit(this.form.el.dom,this.success,this)
}else{if(a.clientValidation!==false){this.failureType=Ext.form.Action.CLIENT_INVALID;
this.form.afterAction(this,false)
}}},getParams:function(){var c={};
var a=this.form.baseParams;
var b=this.options.params;
Ext.apply(c,b,a);
return c
},processResponse:function(a){this.result=a;
return a
},success:function(a,b){if(b.type==Ext.Direct.exceptions.SERVER){a={}
}Ext.form.Action.DirectSubmit.superclass.success.call(this,a)
}});
Ext.form.Action.ACTION_TYPES={load:Ext.form.Action.Load,submit:Ext.form.Action.Submit,directload:Ext.form.Action.DirectLoad,directsubmit:Ext.form.Action.DirectSubmit};
Ext.form.VTypes=function(){var c=/^[a-zA-Z_]+$/,d=/^[a-zA-Z0-9_]+$/,b=/^(\w+)([\-+.\'][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/,a=/(((^https?)|(^ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
return{email:function(e){return b.test(e)
},emailText:'This field should be an e-mail address in the format "user@example.com"',emailMask:/[a-z0-9_\.\-\+\'@]/i,url:function(e){return a.test(e)
},urlText:'This field should be a URL in the format "http://www.example.com"',alpha:function(e){return c.test(e)
},alphaText:"This field should only contain letters and _",alphaMask:/[a-z_]/i,alphanum:function(e){return d.test(e)
},alphanumText:"This field should only contain letters, numbers and _",alphanumMask:/[a-z0-9_]/i}
}();
Ext.grid.GridPanel=Ext.extend(Ext.Panel,{autoExpandColumn:false,autoExpandMax:1000,autoExpandMin:50,columnLines:false,ddText:"{0} selected row{1}",deferRowRender:true,enableColumnHide:true,enableColumnMove:true,enableDragDrop:false,enableHdMenu:true,loadMask:false,minColumnWidth:25,stripeRows:false,trackMouseOver:true,stateEvents:["columnmove","columnresize","sortchange","groupchange"],view:null,bubbleEvents:[],rendered:false,viewReady:false,initComponent:function(){Ext.grid.GridPanel.superclass.initComponent.call(this);
if(this.columnLines){this.cls=(this.cls||"")+" x-grid-with-col-lines"
}this.autoScroll=false;
this.autoWidth=false;
if(Ext.isArray(this.columns)){this.colModel=new Ext.grid.ColumnModel(this.columns);
delete this.columns
}if(this.ds){this.store=this.ds;
delete this.ds
}if(this.cm){this.colModel=this.cm;
delete this.cm
}if(this.sm){this.selModel=this.sm;
delete this.sm
}this.store=Ext.StoreMgr.lookup(this.store);
this.addEvents("click","dblclick","contextmenu","mousedown","mouseup","mouseover","mouseout","keypress","keydown","cellmousedown","rowmousedown","headermousedown","groupmousedown","rowbodymousedown","containermousedown","cellclick","celldblclick","rowclick","rowdblclick","headerclick","headerdblclick","groupclick","groupdblclick","containerclick","containerdblclick","rowbodyclick","rowbodydblclick","rowcontextmenu","cellcontextmenu","headercontextmenu","groupcontextmenu","containercontextmenu","rowbodycontextmenu","bodyscroll","columnresize","columnmove","sortchange","groupchange","reconfigure","viewready")
},onRender:function(h,f){Ext.grid.GridPanel.superclass.onRender.apply(this,arguments);
var g=this.getGridEl();
this.el.addClass("x-grid-panel");
this.mon(g,{scope:this,mousedown:this.onMouseDown,click:this.onClick,dblclick:this.onDblClick,contextmenu:this.onContextMenu});
this.relayEvents(g,["mousedown","mouseup","mouseover","mouseout","keypress","keydown"]);
var c=this.getView();
c.init(this);
c.render();
this.getSelectionModel().init(this)
},initEvents:function(){Ext.grid.GridPanel.superclass.initEvents.call(this);
if(this.loadMask){this.loadMask=new Ext.LoadMask(this.bwrap,Ext.apply({store:this.store},this.loadMask))
}},initStateEvents:function(){Ext.grid.GridPanel.superclass.initStateEvents.call(this);
this.mon(this.colModel,"hiddenchange",this.saveState,this,{delay:100})
},applyState:function(t){var m=this.colModel,p=t.columns,n=this.store,c,o,i;
if(p){for(var r=0,q=p.length;
r<q;
r++){c=p[r];
o=m.getColumnById(c.id);
if(o){i=m.getIndexById(c.id);
m.setState(i,{hidden:c.hidden,width:c.width,sortable:c.sortable});
if(i!=r){m.moveColumn(i,r)
}}}}if(n){c=t.sort;
if(c){n[n.remoteSort?"setDefaultSort":"sort"](c.field,c.direction)
}c=t.group;
if(n.groupBy){if(c){n.groupBy(c)
}else{n.clearGrouping()
}}}var s=Ext.apply({},t);
delete s.columns;
delete s.sort;
Ext.grid.GridPanel.superclass.applyState.call(this,s)
},getState:function(){var j={columns:[]},c=this.store,k,h;
for(var l=0,i;
(i=this.colModel.config[l]);
l++){j.columns[l]={id:i.id,width:i.width};
if(i.hidden){j.columns[l].hidden=true
}if(i.sortable){j.columns[l].sortable=true
}}if(c){k=c.getSortState();
if(k){j.sort=k
}if(c.getGroupState){h=c.getGroupState();
if(h){j.group=h
}}}return j
},afterRender:function(){Ext.grid.GridPanel.superclass.afterRender.call(this);
var b=this.view;
this.on("bodyresize",b.layout,b);
b.layout(true);
if(this.deferRowRender){if(!this.deferRowRenderTask){this.deferRowRenderTask=new Ext.util.DelayedTask(b.afterRender,this.view)
}this.deferRowRenderTask.delay(10)
}else{b.afterRender()
}this.viewReady=true
},reconfigure:function(e,d){var f=this.rendered;
if(f){if(this.loadMask){this.loadMask.destroy();
this.loadMask=new Ext.LoadMask(this.bwrap,Ext.apply({},{store:e},this.initialConfig.loadMask))
}}if(this.view){this.view.initData(e,d)
}this.store=e;
this.colModel=d;
if(f){this.view.refresh(true)
}this.fireEvent("reconfigure",this,e,d)
},onDestroy:function(){if(this.deferRowRenderTask&&this.deferRowRenderTask.cancel){this.deferRowRenderTask.cancel()
}if(this.rendered){Ext.destroy(this.view,this.loadMask)
}else{if(this.store&&this.store.autoDestroy){this.store.destroy()
}}Ext.destroy(this.colModel,this.selModel);
this.store=this.selModel=this.colModel=this.view=this.loadMask=null;
Ext.grid.GridPanel.superclass.onDestroy.call(this)
},processEvent:function(d,c){this.view.processEvent(d,c)
},onClick:function(b){this.processEvent("click",b)
},onMouseDown:function(b){this.processEvent("mousedown",b)
},onContextMenu:function(c,d){this.processEvent("contextmenu",c)
},onDblClick:function(b){this.processEvent("dblclick",b)
},walkCells:function(k,r,s,p,l){var m=this.colModel,o=m.getColumnCount(),t=this.store,n=t.getCount(),q=true;
if(s<0){if(r<0){k--;
q=false
}while(k>=0){if(!q){r=o-1
}q=false;
while(r>=0){if(p.call(l||this,k,r,m)===true){return[k,r]
}r--
}k--
}}else{if(r>=o){k++;
q=false
}while(k<n){if(!q){r=0
}q=false;
while(r<o){if(p.call(l||this,k,r,m)===true){return[k,r]
}r++
}k++
}}return null
},getGridEl:function(){return this.body
},stopEditing:Ext.emptyFn,getSelectionModel:function(){if(!this.selModel){this.selModel=new Ext.grid.RowSelectionModel(this.disableSelection?{selectRow:Ext.emptyFn}:null)
}return this.selModel
},getStore:function(){return this.store
},getColumnModel:function(){return this.colModel
},getView:function(){if(!this.view){this.view=new Ext.grid.GridView(this.viewConfig)
}return this.view
},getDragDropText:function(){var b=this.selModel.getCount();
return String.format(this.ddText,b,b==1?"":"s")
}});
Ext.reg("grid",Ext.grid.GridPanel);
Ext.grid.PivotGrid=Ext.extend(Ext.grid.GridPanel,{aggregator:"sum",renderer:undefined,initComponent:function(){Ext.grid.PivotGrid.superclass.initComponent.apply(this,arguments);
this.initAxes();
this.enableColumnResize=false;
this.viewConfig=Ext.apply(this.viewConfig||{},{forceFit:true});
this.colModel=new Ext.grid.ColumnModel({})
},getAggregator:function(){if(typeof this.aggregator=="string"){return Ext.grid.PivotAggregatorMgr.types[this.aggregator]
}else{return this.aggregator
}},setAggregator:function(b){this.aggregator=b
},setMeasure:function(b){this.measure=b
},setLeftAxis:function(c,d){this.leftAxis=c;
if(d){this.view.refresh()
}},setTopAxis:function(c,d){this.topAxis=c;
if(d){this.view.refresh()
}},initAxes:function(){var b=Ext.grid.PivotAxis;
if(!(this.leftAxis instanceof b)){this.setLeftAxis(new b({orientation:"vertical",dimensions:this.leftAxis||[],store:this.store}))
}if(!(this.topAxis instanceof b)){this.setTopAxis(new b({orientation:"horizontal",dimensions:this.topAxis||[],store:this.store}))
}},extractData:function(){var B=this.store.data.items,i=B.length,k=[],x,y,z,A;
if(i==0){return[]
}var w=this.leftAxis.getTuples(),t=w.length,v=this.topAxis.getTuples(),D=v.length,C=this.getAggregator();
for(y=0;
y<i;
y++){x=B[y];
for(z=0;
z<t;
z++){k[z]=k[z]||[];
if(w[z].matcher(x)===true){for(A=0;
A<D;
A++){k[z][A]=k[z][A]||[];
if(v[A].matcher(x)){k[z][A].push(x)
}}}}}var u=k.length,s,j;
for(y=0;
y<u;
y++){j=k[y];
s=j.length;
for(z=0;
z<s;
z++){k[y][z]=C(k[y][z],this.measure)
}}return k
},getView:function(){if(!this.view){this.view=new Ext.grid.PivotGridView(this.viewConfig)
}return this.view
}});
Ext.reg("pivotgrid",Ext.grid.PivotGrid);
Ext.grid.PivotAggregatorMgr=new Ext.AbstractManager();
Ext.grid.PivotAggregatorMgr.registerType("sum",function(g,j){var h=g.length,i=0,f;
for(f=0;
f<h;
f++){i+=g[f].get(j)
}return i
});
Ext.grid.PivotAggregatorMgr.registerType("avg",function(g,j){var h=g.length,i=0,f;
for(f=0;
f<h;
f++){i+=g[f].get(j)
}return(i/h)||"n/a"
});
Ext.grid.PivotAggregatorMgr.registerType("min",function(g,j){var h=[],i=g.length,f;
for(f=0;
f<i;
f++){h.push(g[f].get(j))
}return Math.min.apply(this,h)||"n/a"
});
Ext.grid.PivotAggregatorMgr.registerType("max",function(g,j){var h=[],i=g.length,f;
for(f=0;
f<i;
f++){h.push(g[f].get(j))
}return Math.max.apply(this,h)||"n/a"
});
Ext.grid.PivotAggregatorMgr.registerType("count",function(d,c){return d.length
});
Ext.grid.GridView=Ext.extend(Ext.util.Observable,{deferEmptyText:true,scrollOffset:undefined,autoFill:false,forceFit:false,sortClasses:["sort-asc","sort-desc"],sortAscText:"Sort Ascending",sortDescText:"Sort Descending",columnsText:"Columns",selectedRowClass:"x-grid3-row-selected",borderWidth:2,tdClass:"x-grid3-cell",hdCls:"x-grid3-hd",markDirty:true,cellSelectorDepth:4,rowSelectorDepth:10,rowBodySelectorDepth:10,cellSelector:"td.x-grid3-cell",rowSelector:"div.x-grid3-row",rowBodySelector:"div.x-grid3-row-body",firstRowCls:"x-grid3-row-first",lastRowCls:"x-grid3-row-last",rowClsRe:/(?:^|\s+)x-grid3-row-(first|last|alt)(?:\s+|$)/g,headerMenuOpenCls:"x-grid3-hd-menu-open",rowOverCls:"x-grid3-row-over",constructor:function(b){Ext.apply(this,b);
this.addEvents("beforerowremoved","beforerowsinserted","beforerefresh","rowremoved","rowsinserted","rowupdated","refresh");
Ext.grid.GridView.superclass.constructor.call(this)
},masterTpl:new Ext.Template('<div class="x-grid3" hidefocus="true">','<div class="x-grid3-viewport">','<div class="x-grid3-header">','<div class="x-grid3-header-inner">','<div class="x-grid3-header-offset" style="{ostyle}">{header}</div>',"</div>",'<div class="x-clear"></div>',"</div>",'<div class="x-grid3-scroller">','<div class="x-grid3-body" style="{bstyle}">{body}</div>','<a href="#" class="x-grid3-focus" tabIndex="-1"></a>',"</div>","</div>",'<div class="x-grid3-resize-marker">&#160;</div>','<div class="x-grid3-resize-proxy">&#160;</div>',"</div>"),headerTpl:new Ext.Template('<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',"<thead>",'<tr class="x-grid3-hd-row">{cells}</tr>',"</thead>","</table>"),bodyTpl:new Ext.Template("{rows}"),cellTpl:new Ext.Template('<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}" tabIndex="0" {cellAttr}>','<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on" {attr}>{value}</div>',"</td>"),initTemplates:function(){var l=this.templates||{},k,g,i=new Ext.Template('<td class="x-grid3-hd x-grid3-cell x-grid3-td-{id} {css}" style="{style}">','<div {tooltip} {attr} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">',this.grid.enableHdMenu?'<a class="x-grid3-hd-btn" href="#"></a>':"","{value}",'<img alt="" class="x-grid3-sort-icon" src="',Ext.BLANK_IMAGE_URL,'" />',"</div>","</td>"),h=['<tr class="x-grid3-row-body-tr" style="{bodyStyle}">','<td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on">','<div class="x-grid3-row-body">{body}</div>',"</td>","</tr>"].join(""),j=['<table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',"<tbody>","<tr>{cells}</tr>",this.enableRowBody?h:"","</tbody>","</table>"].join("");
Ext.applyIf(l,{hcell:i,cell:this.cellTpl,body:this.bodyTpl,header:this.headerTpl,master:this.masterTpl,row:new Ext.Template('<div class="x-grid3-row {alt}" style="{tstyle}">'+j+"</div>"),rowInner:new Ext.Template(j)});
for(g in l){k=l[g];
if(k&&Ext.isFunction(k.compile)&&!k.compiled){k.disableFormats=true;
k.compile()
}}this.templates=l;
this.colRe=new RegExp("x-grid3-td-([^\\s]+)","")
},fly:function(b){if(!this._flyweight){this._flyweight=new Ext.Element.Flyweight(document.body)
}this._flyweight.dom=b;
return this._flyweight
},getEditorParent:function(){return this.scroller.dom
},initElements:function(){var f=Ext.Element,i=Ext.get(this.grid.getGridEl().dom.firstChild),h=new f(i.child("div.x-grid3-viewport")),j=new f(h.child("div.x-grid3-header")),g=new f(h.child("div.x-grid3-scroller"));
if(this.grid.hideHeaders){j.setDisplayed(false)
}if(this.forceFit){g.setStyle("overflow-x","hidden")
}Ext.apply(this,{el:i,mainWrap:h,scroller:g,mainHd:j,innerHd:j.child("div.x-grid3-header-inner").dom,mainBody:new f(f.fly(g).child("div.x-grid3-body")),focusEl:new f(f.fly(g).child("a")),resizeMarker:new f(i.child("div.x-grid3-resize-marker")),resizeProxy:new f(i.child("div.x-grid3-resize-proxy"))});
this.focusEl.swallowEvent("click",true)
},getRows:function(){return this.hasRows()?this.mainBody.dom.childNodes:[]
},findCell:function(b){if(!b){return false
}return this.fly(b).findParent(this.cellSelector,this.cellSelectorDepth)
},findCellIndex:function(g,h){var e=this.findCell(g),f;
if(e){f=this.fly(e).hasClass(h);
if(!h||f){return this.getCellIndex(e)
}}return false
},getCellIndex:function(c){if(c){var d=c.className.match(this.colRe);
if(d&&d[1]){return this.cm.getIndexById(d[1])
}}return false
},findHeaderCell:function(c){var d=this.findCell(c);
return d&&this.fly(d).hasClass(this.hdCls)?d:null
},findHeaderIndex:function(b){return this.findCellIndex(b,this.hdCls)
},findRow:function(b){if(!b){return false
}return this.fly(b).findParent(this.rowSelector,this.rowSelectorDepth)
},findRowIndex:function(d){var c=this.findRow(d);
return c?c.rowIndex:false
},findRowBody:function(b){if(!b){return false
}return this.fly(b).findParent(this.rowBodySelector,this.rowBodySelectorDepth)
},getRow:function(b){return this.getRows()[b]
},getCell:function(c,d){return Ext.fly(this.getRow(c)).query(this.cellSelector)[d]
},getHeaderCell:function(b){return this.mainHd.dom.getElementsByTagName("td")[b]
},addRowClass:function(d,e){var f=this.getRow(d);
if(f){this.fly(f).addClass(e)
}},removeRowClass:function(f,e){var d=this.getRow(f);
if(d){this.fly(d).removeClass(e)
}},removeRow:function(b){Ext.removeNode(this.getRow(b));
this.syncFocusEl(b)
},removeRows:function(h,f){var e=this.mainBody.dom,g;
for(g=h;
g<=f;
g++){Ext.removeNode(e.childNodes[h])
}this.syncFocusEl(h)
},getScrollState:function(){var b=this.scroller.dom;
return{left:b.scrollLeft,top:b.scrollTop}
},restoreScroll:function(d){var c=this.scroller.dom;
c.scrollLeft=d.left;
c.scrollTop=d.top
},scrollToTop:function(){var b=this.scroller.dom;
b.scrollTop=0;
b.scrollLeft=0
},syncScroll:function(){this.syncHeaderScroll();
var b=this.scroller.dom;
this.grid.fireEvent("bodyscroll",b.scrollLeft,b.scrollTop)
},syncHeaderScroll:function(){var d=this.innerHd,c=this.scroller.dom.scrollLeft;
d.scrollLeft=c;
d.scrollLeft=c
},updateSortIcon:function(i,j){var g=this.sortClasses,f=g[j=="DESC"?1:0],h=this.mainHd.select("td").removeClass(g);
h.item(i).addClass(f)
},updateAllColumnWidths:function(){var p=this.getTotalWidth(),m=this.cm.getColumnCount(),i=this.getRows(),o=i.length,s=[],j,t,n,q,r;
for(q=0;
q<m;
q++){s[q]=this.getColumnWidth(q);
this.getHeaderCell(q).style.width=s[q]
}this.updateHeaderWidth();
for(q=0;
q<o;
q++){j=i[q];
j.style.width=p;
t=j.firstChild;
if(t){t.style.width=p;
n=t.rows[0];
for(r=0;
r<m;
r++){n.childNodes[r].style.width=s[r]
}}}this.onAllColumnWidthsUpdated(s,p)
},updateColumnWidth:function(q,s){var r=this.getColumnWidth(q),m=this.getTotalWidth(),n=this.getHeaderCell(q),t=this.getRows(),p=t.length,i,o,l;
this.updateHeaderWidth();
n.style.width=r;
for(o=0;
o<p;
o++){i=t[o];
l=i.firstChild;
i.style.width=m;
if(l){l.style.width=m;
l.rows[0].childNodes[q].style.width=r
}}this.onColumnWidthUpdated(q,r,m)
},updateColumnHidden:function(s,m){var n=this.getTotalWidth(),l=m?"none":"",o=this.getHeaderCell(s),t=this.getRows(),q=t.length,i,r,p;
this.updateHeaderWidth();
o.style.display=l;
for(p=0;
p<q;
p++){i=t[p];
i.style.width=n;
r=i.firstChild;
if(r){r.style.width=n;
r.rows[0].childNodes[s].style.display=l
}}this.onColumnHiddenUpdated(s,m,n);
delete this.lastViewWidth;
this.layout()
},doRender:function(O,z,I,R,D,B){var L=this.templates,P=L.cell,i=L.row,G=D-1,Q="width:"+this.getTotalWidth()+";",K=[],J=[],H={tstyle:Q},E={},y=z.length,j,M,N,A,C,F;
for(C=0;
C<y;
C++){N=z[C];
J=[];
F=C+R;
for(A=0;
A<D;
A++){M=O[A];
E.id=M.id;
E.css=A===0?"x-grid3-cell-first ":(A==G?"x-grid3-cell-last ":"");
E.attr=E.cellAttr="";
E.style=M.style;
E.value=M.renderer.call(M.scope,N.data[M.name],E,N,F,A,I);
if(Ext.isEmpty(E.value)){E.value="&#160;"
}if(this.markDirty&&N.dirty&&typeof N.modified[M.name]!="undefined"){E.css+=" x-grid3-dirty-cell"
}J[J.length]=P.apply(E)
}j=[];
if(B&&((F+1)%2===0)){j[0]="x-grid3-row-alt"
}if(N.dirty){j[1]=" x-grid3-dirty-row"
}H.cols=D;
if(this.getRowClass){j[2]=this.getRowClass(N,F,H,I)
}H.alt=j.join(" ");
H.cells=J.join("");
K[K.length]=i.apply(H)
}return K.join("")
},processRows:function(h,i){if(!this.ds||this.ds.getCount()<1){return
}var k=this.getRows(),l=k.length,j,g;
i=i||!this.grid.stripeRows;
h=h||0;
for(g=0;
g<l;
g++){j=k[g];
if(j){j.rowIndex=g;
if(!i){j.className=j.className.replace(this.rowClsRe," ");
if((g+1)%2===0){j.className+=" x-grid3-row-alt"
}}}}if(h===0){Ext.fly(k[0]).addClass(this.firstRowCls)
}Ext.fly(k[l-1]).addClass(this.lastRowCls)
},afterRender:function(){if(!this.ds||!this.cm){return
}this.mainBody.dom.innerHTML=this.renderBody()||"&#160;";
this.processRows(0,true);
if(this.deferEmptyText!==true){this.applyEmptyText()
}this.grid.fireEvent("viewready",this.grid)
},afterRenderUI:function(){var b=this.grid;
this.initElements();
Ext.fly(this.innerHd).on("click",this.handleHdDown,this);
this.mainHd.on({scope:this,mouseover:this.handleHdOver,mouseout:this.handleHdOut,mousemove:this.handleHdMove});
this.scroller.on("scroll",this.syncScroll,this);
if(b.enableColumnResize!==false){this.splitZone=new Ext.grid.GridView.SplitDragZone(b,this.mainHd.dom)
}if(b.enableColumnMove){this.columnDrag=new Ext.grid.GridView.ColumnDragZone(b,this.innerHd);
this.columnDrop=new Ext.grid.HeaderDropZone(b,this.mainHd.dom)
}if(b.enableHdMenu!==false){this.hmenu=new Ext.menu.Menu({id:b.id+"-hctx"});
this.hmenu.add({itemId:"asc",text:this.sortAscText,cls:"xg-hmenu-sort-asc"},{itemId:"desc",text:this.sortDescText,cls:"xg-hmenu-sort-desc"});
if(b.enableColumnHide!==false){this.colMenu=new Ext.menu.Menu({id:b.id+"-hcols-menu"});
this.colMenu.on({scope:this,beforeshow:this.beforeColMenuShow,itemclick:this.handleHdMenuClick});
this.hmenu.add("-",{itemId:"columns",hideOnClick:false,text:this.columnsText,menu:this.colMenu,iconCls:"x-cols-icon"})
}this.hmenu.on("itemclick",this.handleHdMenuClick,this)
}if(b.trackMouseOver){this.mainBody.on({scope:this,mouseover:this.onRowOver,mouseout:this.onRowOut})
}if(b.enableDragDrop||b.enableDrag){this.dragZone=new Ext.grid.GridDragZone(b,{ddGroup:b.ddGroup||"GridDD"})
}this.updateHeaderSortState()
},renderUI:function(){var b=this.templates;
return b.master.apply({body:b.body.apply({rows:"&#160;"}),header:this.renderHeaders(),ostyle:"width:"+this.getOffsetWidth()+";",bstyle:"width:"+this.getTotalWidth()+";"})
},processEvent:function(q,m){var l=m.getTarget(),r=this.grid,o=this.findHeaderIndex(l),e,k,p,n;
r.fireEvent(q,m);
if(o!==false){r.fireEvent("header"+q,r,o,m)
}else{e=this.findRowIndex(l);
if(e!==false){k=this.findCellIndex(l);
if(k!==false){p=r.colModel.getColumnAt(k);
if(r.fireEvent("cell"+q,r,e,k,m)!==false){if(!p||(p.processEvent&&(p.processEvent(q,m,r,e,k)!==false))){r.fireEvent("row"+q,r,e,m)
}}}else{if(r.fireEvent("row"+q,r,e,m)!==false){(n=this.findRowBody(l))&&r.fireEvent("rowbody"+q,r,e,m)
}}}else{r.fireEvent("container"+q,r,m)
}}},layout:function(l){if(!this.mainBody){return
}var t=this.grid,q=t.getGridEl(),r=q.getSize(true),m=r.width,s=r.height,n=this.scroller,o,p,k;
if(m<20||s<20){return
}if(t.autoHeight){o=n.dom.style;
o.overflow="visible";
if(Ext.isWebKit){o.position="static"
}}else{this.el.setSize(m,s);
p=this.mainHd.getHeight();
k=s-p;
n.setSize(m,k);
if(this.innerHd){this.innerHd.style.width=(m)+"px"
}}if(this.forceFit||(l===true&&this.autoFill)){if(this.lastViewWidth!=m){this.fitColumns(false,false);
this.lastViewWidth=m
}}else{this.autoExpand();
this.syncHeaderScroll()
}this.onLayout(m,k)
},onLayout:function(d,c){},onColumnWidthUpdated:function(f,e,d){},onAllColumnWidthsUpdated:function(d,c){},onColumnHiddenUpdated:function(d,f,e){},updateColumnText:function(d,c){},afterMove:function(b){},init:function(b){this.grid=b;
this.initTemplates();
this.initData(b.store,b.colModel);
this.initUI(b)
},getColumnId:function(b){return this.cm.getColumnId(b)
},getOffsetWidth:function(){return(this.cm.getTotalWidth()+this.getScrollOffset())+"px"
},getScrollOffset:function(){return Ext.num(this.scrollOffset,Ext.getScrollBarWidth())
},renderHeaders:function(){var n=this.cm,m=this.templates,r=m.hcell,o={},l=n.getColumnCount(),k=l-1,i=[],p,q;
for(p=0;
p<l;
p++){if(p==0){q="x-grid3-cell-first "
}else{q=p==k?"x-grid3-cell-last ":""
}o={id:n.getColumnId(p),value:n.getColumnHeader(p)||"",style:this.getColumnStyle(p,true),css:q,tooltip:this.getColumnTooltip(p)};
if(n.config[p].align=="right"){o.istyle="padding-right: 16px;"
}else{delete o.istyle
}i[p]=r.apply(o)
}return m.header.apply({cells:i.join(""),tstyle:String.format("width: {0};",this.getTotalWidth())})
},getColumnTooltip:function(d){var c=this.cm.getColumnTooltip(d);
if(c){if(Ext.QuickTips.isEnabled()){return'ext:qtip="'+c+'"'
}else{return'title="'+c+'"'
}}return""
},beforeUpdate:function(){this.grid.stopEditing(true)
},updateHeaders:function(){this.innerHd.firstChild.innerHTML=this.renderHeaders();
this.updateHeaderWidth(false)
},updateHeaderWidth:function(f){var d=this.innerHd.firstChild,e=this.getTotalWidth();
d.style.width=this.getOffsetWidth();
d.firstChild.style.width=e;
if(f!==false){this.mainBody.dom.style.width=e
}},focusRow:function(b){this.focusCell(b,0,false)
},focusCell:function(g,e,h){this.syncFocusEl(this.ensureVisible(g,e,h));
var f=this.focusEl;
if(Ext.isGecko){f.focus()
}else{f.focus.defer(1,f)
}},resolveCell:function(j,m,k){if(!Ext.isNumber(j)){j=j.rowIndex
}if(!this.ds){return null
}if(j<0||j>=this.ds.getCount()){return null
}m=(m!==undefined?m:0);
var n=this.getRow(j),h=this.cm,l=h.getColumnCount(),i;
if(!(k===false&&m===0)){while(m<l&&h.isHidden(m)){m++
}i=this.getCell(j,m)
}return{row:n,cell:i}
},getResolvedXY:function(d){if(!d){return null
}var e=d.cell,f=d.row;
if(e){return Ext.fly(e).getXY()
}else{return[this.el.getX(),Ext.fly(f).getY()]
}},syncFocusEl:function(g,f,h){var e=g;
if(!Ext.isArray(e)){g=Math.min(g,Math.max(0,this.getRows().length-1));
if(isNaN(g)){return
}e=this.getResolvedXY(this.resolveCell(g,f,h))
}this.focusEl.setXY(e||this.scroller.getXY())
},ensureVisible:function(H,C,D){var p=this.resolveCell(H,C,D);
if(!p||!p.row){return null
}var y=p.row,B=p.cell,v=this.scroller.dom,E=y,c=0,u=this.el.dom;
while(E&&E!=u){c+=E.offsetTop;
E=E.offsetParent
}c-=this.mainHd.dom.offsetHeight;
u=parseInt(v.scrollTop,10);
var t=c+y.offsetHeight,G=v.clientHeight,w=u+G;
if(c<u){v.scrollTop=c
}else{if(t>w){v.scrollTop=t-G
}}if(D!==false){var x=parseInt(B.offsetLeft,10),z=x+B.offsetWidth,A=parseInt(v.scrollLeft,10),F=A+v.clientWidth;
if(x<A){v.scrollLeft=x
}else{if(z>F){v.scrollLeft=z-v.clientWidth
}}}return this.getResolvedXY(p)
},insertRows:function(j,k,n,l){var o=j.getCount()-1;
if(!l&&k===0&&n>=o){this.fireEvent("beforerowsinserted",this,k,n);
this.refresh();
this.fireEvent("rowsinserted",this,k,n)
}else{if(!l){this.fireEvent("beforerowsinserted",this,k,n)
}var i=this.renderRows(k,n),m=this.getRow(k);
if(m){if(k===0){Ext.fly(this.getRow(0)).removeClass(this.firstRowCls)
}Ext.DomHelper.insertHtml("beforeBegin",m,i)
}else{var p=this.getRow(o-1);
if(p){Ext.fly(p).removeClass(this.lastRowCls)
}Ext.DomHelper.insertHtml("beforeEnd",this.mainBody.dom,i)
}if(!l){this.processRows(k);
this.fireEvent("rowsinserted",this,k,n)
}else{if(k===0||k>=o){Ext.fly(this.getRow(k)).addClass(k===0?this.firstRowCls:this.lastRowCls)
}}}this.syncFocusEl(k)
},deleteRows:function(e,f,d){if(e.getRowCount()<1){this.refresh()
}else{this.fireEvent("beforerowsdeleted",this,f,d);
this.removeRows(f,d);
this.processRows(f);
this.fireEvent("rowsdeleted",this,f,d)
}},getColumnStyle:function(g,k){var h=this.cm,i=h.config,l=k?"":i[g].css||"",j=i[g].align;
l+=String.format("width: {0};",this.getColumnWidth(g));
if(h.isHidden(g)){l+="display: none; "
}if(j){l+=String.format("text-align: {0};",j)
}return l
},getColumnWidth:function(d){var f=this.cm.getColumnWidth(d),e=this.borderWidth;
if(Ext.isNumber(f)){if(Ext.isBorderBox||(Ext.isWebKit&&!Ext.isSafari2)){return f+"px"
}else{return Math.max(f-e,0)+"px"
}}else{return f
}},getTotalWidth:function(){return this.cm.getTotalWidth()+"px"
},fitColumns:function(G,E,F){var L=this.grid,C=this.cm,v=C.getTotalWidth(false),x=this.getGridInnerWidth(),w=x-v,J=[],z=0,A=0,i,I,y;
if(x<20||w===0){return false
}var H=C.getColumnCount(true),B=C.getColumnCount(false),K=H-(Ext.isNumber(F)?1:0);
if(K===0){K=1;
F=undefined
}for(y=0;
y<B;
y++){if(!C.isFixed(y)&&y!==F){i=C.getColumnWidth(y);
J.push(y,i);
if(!C.isHidden(y)){z=y;
A+=i
}}}I=(x-C.getTotalWidth())/A;
while(J.length){i=J.pop();
y=J.pop();
C.setColumnWidth(y,Math.max(L.minColumnWidth,Math.floor(i+i*I)),true)
}v=C.getTotalWidth(false);
if(v>x){var u=(K==H)?z:F,D=Math.max(1,C.getColumnWidth(u)-(v-x));
C.setColumnWidth(u,D,true)
}if(G!==true){this.updateAllColumnWidths()
}return true
},autoExpand:function(k){var t=this.grid,m=this.cm,p=this.getGridInnerWidth(),r=m.getTotalWidth(false),o=t.autoExpandColumn;
if(!this.userResized&&o){if(p!=r){var l=m.getIndexById(o),s=m.getColumnWidth(l),n=p-r+s,q=Math.min(Math.max(n,t.autoExpandMin),t.autoExpandMax);
if(s!=q){m.setColumnWidth(l,q,true);
if(k!==true){this.updateColumnWidth(l,q)
}}}}},getGridInnerWidth:function(){return this.grid.getGridEl().getWidth(true)-this.getScrollOffset()
},getColumnData:function(){var j=[],l=this.cm,i=l.getColumnCount(),h=this.ds.fields,k,g;
for(k=0;
k<i;
k++){g=l.getDataIndex(k);
j[k]={name:Ext.isDefined(g)?g:(h.get(k)?h.get(k).name:undefined),renderer:l.getRenderer(k),scope:l.getRendererScope(k),id:l.getColumnId(k),style:this.getColumnStyle(k)}
}return j
},renderRows:function(k,p){var r=this.grid,m=r.store,j=r.stripeRows,n=r.colModel,l=n.getColumnCount(),o=m.getCount(),q;
if(o<1){return""
}k=k||0;
p=Ext.isDefined(p)?p:o-1;
q=m.getRange(k,p);
return this.doRender(this.getColumnData(),q,m,k,l,j)
},renderBody:function(){var b=this.renderRows()||"&#160;";
return this.templates.body.apply({rows:b})
},refreshRow:function(y){var u=this.ds,t=this.cm.getColumnCount(),B=this.getColumnData(),s=t-1,q=["x-grid3-row"],z={tstyle:String.format("width: {0};",this.getTotalWidth())},D=[],v=this.templates.cell,w,i,C,r,x,A;
if(Ext.isNumber(y)){w=y;
y=u.getAt(w)
}else{w=u.indexOf(y)
}if(!y||w<0){return
}for(A=0;
A<t;
A++){C=B[A];
if(A==0){x="x-grid3-cell-first"
}else{x=(A==s)?"x-grid3-cell-last ":""
}r={id:C.id,style:C.style,css:x,attr:"",cellAttr:""};
r.value=C.renderer.call(C.scope,y.data[C.name],r,y,w,A,u);
if(Ext.isEmpty(r.value)){r.value="&#160;"
}if(this.markDirty&&y.dirty&&typeof y.modified[C.name]!="undefined"){r.css+=" x-grid3-dirty-cell"
}D[A]=v.apply(r)
}i=this.getRow(w);
i.className="";
if(this.grid.stripeRows&&((w+1)%2===0)){q.push("x-grid3-row-alt")
}if(this.getRowClass){z.cols=t;
q.push(this.getRowClass(y,w,z,u))
}this.fly(i).addClass(q).setStyle(z.tstyle);
z.cells=D.join("");
i.innerHTML=this.templates.rowInner.apply(z);
this.fireEvent("rowupdated",this,w,y)
},refresh:function(c){this.fireEvent("beforerefresh",this);
this.grid.stopEditing(true);
var d=this.renderBody();
this.mainBody.update(d).setWidth(this.getTotalWidth());
if(c===true){this.updateHeaders();
this.updateHeaderSortState()
}this.processRows(0,true);
this.layout();
this.applyEmptyText();
this.fireEvent("refresh",this)
},applyEmptyText:function(){if(this.emptyText&&!this.hasRows()){this.mainBody.update('<div class="x-grid-empty">'+this.emptyText+"</div>")
}},updateHeaderSortState:function(){var d=this.ds.getSortState();
if(!d){return
}if(!this.sortState||(this.sortState.field!=d.field||this.sortState.direction!=d.direction)){this.grid.fireEvent("sortchange",this.grid,d)
}this.sortState=d;
var f=this.cm.findColumnIndex(d.field);
if(f!=-1){var e=d.direction;
this.updateSortIcon(f,e)
}},clearHeaderSortState:function(){if(!this.sortState){return
}this.grid.fireEvent("sortchange",this.grid,null);
this.mainHd.select("td").removeClass(this.sortClasses);
delete this.sortState
},destroy:function(){var l=this,t=l.grid,q=t.getGridEl(),m=l.dragZone,o=l.splitZone,n=l.columnDrag,p=l.columnDrop,k=l.scrollToTopTask,r,s;
if(k&&k.cancel){k.cancel()
}Ext.destroyMembers(l,"colMenu","hmenu");
l.initData(null,null);
l.purgeListeners();
Ext.fly(l.innerHd).un("click",l.handleHdDown,l);
if(t.enableColumnMove){r=n.dragData;
s=n.proxy;
Ext.destroy(n.el,s.ghost,s.el,p.el,p.proxyTop,p.proxyBottom,r.ddel,r.header);
if(s.anim){Ext.destroy(s.anim)
}delete s.ghost;
delete r.ddel;
delete r.header;
n.destroy();
delete Ext.dd.DDM.locationCache[n.id];
delete n._domRef;
delete p.proxyTop;
delete p.proxyBottom;
p.destroy();
delete Ext.dd.DDM.locationCache["gridHeader"+q.id];
delete p._domRef;
delete Ext.dd.DDM.ids[p.ddGroup]
}if(o){o.destroy();
delete o._domRef;
delete Ext.dd.DDM.ids["gridSplitters"+q.id]
}Ext.fly(l.innerHd).removeAllListeners();
Ext.removeNode(l.innerHd);
delete l.innerHd;
Ext.destroy(l.el,l.mainWrap,l.mainHd,l.scroller,l.mainBody,l.focusEl,l.resizeMarker,l.resizeProxy,l.activeHdBtn,l._flyweight,m,o);
delete t.container;
if(m){m.destroy()
}Ext.dd.DDM.currentTarget=null;
delete Ext.dd.DDM.locationCache[q.id];
Ext.EventManager.removeResizeListener(l.onWindowResize,l)
},onDenyColumnHide:function(){},render:function(){if(this.autoFill){var b=this.grid.ownerCt;
if(b&&b.getLayout()){b.on("afterlayout",function(){this.fitColumns(true,true);
this.updateHeaders();
this.updateHeaderSortState()
},this,{single:true})
}}else{if(this.forceFit){this.fitColumns(true,false)
}else{if(this.grid.autoExpandColumn){this.autoExpand(true)
}}}this.grid.getGridEl().dom.innerHTML=this.renderUI();
this.afterRenderUI()
},initData:function(g,h){var f=this;
if(f.ds){var i=f.ds;
i.un("add",f.onAdd,f);
i.un("load",f.onLoad,f);
i.un("clear",f.onClear,f);
i.un("remove",f.onRemove,f);
i.un("update",f.onUpdate,f);
i.un("datachanged",f.onDataChange,f);
if(i!==g&&i.autoDestroy){i.destroy()
}}if(g){g.on({scope:f,load:f.onLoad,add:f.onAdd,remove:f.onRemove,update:f.onUpdate,clear:f.onClear,datachanged:f.onDataChange})
}if(f.cm){var j=f.cm;
j.un("configchange",f.onColConfigChange,f);
j.un("widthchange",f.onColWidthChange,f);
j.un("headerchange",f.onHeaderChange,f);
j.un("hiddenchange",f.onHiddenChange,f);
j.un("columnmoved",f.onColumnMove,f)
}if(h){delete f.lastViewWidth;
h.on({scope:f,configchange:f.onColConfigChange,widthchange:f.onColWidthChange,headerchange:f.onHeaderChange,hiddenchange:f.onHiddenChange,columnmoved:f.onColumnMove})
}f.ds=g;
f.cm=h
},onDataChange:function(){this.refresh(true);
this.updateHeaderSortState();
this.syncFocusEl(0)
},onClear:function(){this.refresh();
this.syncFocusEl(0)
},onUpdate:function(c,d){this.refreshRow(d)
},onAdd:function(d,e,f){this.insertRows(d,f,f+(e.length-1))
},onRemove:function(e,f,h,g){if(g!==true){this.fireEvent("beforerowremoved",this,h,f)
}this.removeRow(h);
if(g!==true){this.processRows(h);
this.applyEmptyText();
this.fireEvent("rowremoved",this,h,f)
}},onLoad:function(){if(Ext.isGecko){if(!this.scrollToTopTask){this.scrollToTopTask=new Ext.util.DelayedTask(this.scrollToTop,this)
}this.scrollToTopTask.delay(1)
}else{this.scrollToTop()
}},onColWidthChange:function(e,d,f){this.updateColumnWidth(d,f)
},onHeaderChange:function(e,d,f){this.updateHeaders()
},onHiddenChange:function(e,d,f){this.updateColumnHidden(d,f)
},onColumnMove:function(e,f,d){this.indexMap=null;
this.refresh(true);
this.restoreScroll(this.getScrollState());
this.afterMove(d);
this.grid.fireEvent("columnmove",f,d)
},onColConfigChange:function(){delete this.lastViewWidth;
this.indexMap=null;
this.refresh(true)
},initUI:function(b){b.on("headerclick",this.onHeaderClick,this)
},initEvents:Ext.emptyFn,onHeaderClick:function(c,d){if(this.headersDisabled||!this.cm.isSortable(d)){return
}c.stopEditing(true);
c.store.sort(this.cm.getDataIndex(d))
},onRowOver:function(d,e){var f=this.findRowIndex(e);
if(f!==false){this.addRowClass(f,this.rowOverCls)
}},onRowOut:function(d,e){var f=this.findRowIndex(e);
if(f!==false&&!d.within(this.getRow(f),true)){this.removeRowClass(f,this.rowOverCls)
}},onRowSelect:function(b){this.addRowClass(b,this.selectedRowClass)
},onRowDeselect:function(b){this.removeRowClass(b,this.selectedRowClass)
},onCellSelect:function(f,d){var e=this.getCell(f,d);
if(e){this.fly(e).addClass("x-grid3-cell-selected")
}},onCellDeselect:function(f,d){var e=this.getCell(f,d);
if(e){this.fly(e).removeClass("x-grid3-cell-selected")
}},handleWheel:function(b){b.stopPropagation()
},onColumnSplitterMoved:function(d,c){this.userResized=true;
this.grid.colModel.setColumnWidth(d,c,true);
if(this.forceFit){this.fitColumns(true,false,d);
this.updateAllColumnWidths()
}else{this.updateColumnWidth(d,c);
this.syncHeaderScroll()
}this.grid.fireEvent("columnresize",d,c)
},beforeColMenuShow:function(){var e=this.cm,g=e.getColumnCount(),f=this.colMenu,h;
f.removeAll();
for(h=0;
h<g;
h++){if(e.config[h].hideable!==false){f.add(new Ext.menu.CheckItem({text:e.getColumnHeader(h),itemId:"col-"+e.getColumnId(h),checked:!e.isHidden(h),disabled:e.config[h].hideable===false,hideOnClick:false}))
}}},handleHdMenuClick:function(f){var e=this.ds,d=this.cm.getDataIndex(this.hdCtxIndex);
switch(f.getItemId()){case"asc":e.sort(d,"ASC");
break;
case"desc":e.sort(d,"DESC");
break;
default:this.handleHdMenuClickDefault(f)
}return true
},handleHdMenuClickDefault:function(h){var e=this.cm,g=h.getItemId(),f=e.getIndexById(g.substr(4));
if(f!=-1){if(h.checked&&e.getColumnsBy(this.isHideableColumn,this).length<=1){this.onDenyColumnHide();
return
}e.setHidden(f,h.checked)
}},handleHdDown:function(l,k){if(Ext.fly(k).hasClass("x-grid3-hd-btn")){l.stopEvent();
var e=this.cm,n=this.findHeaderCell(k),m=this.getCellIndex(n),o=e.isSortable(m),p=this.hmenu,q=p.items,r=this.headerMenuOpenCls;
this.hdCtxIndex=m;
Ext.fly(n).addClass(r);
q.get("asc").setDisabled(!o);
q.get("desc").setDisabled(!o);
p.on("hide",function(){Ext.fly(n).removeClass(r)
},this,{single:true});
p.show(k,"tl-bl?")
}},handleHdMove:function(t){var v=this.findHeaderCell(this.activeHdRef);
if(v&&!this.headersDisabled){var s=this.splitHandleWidth||5,u=this.activeHdRegion,e=v.style,r=this.cm,p="",x=t.getPageX();
if(this.grid.enableColumnResize!==false){var B=this.activeHdIndex,A=this.getPreviousVisible(B),q=r.isResizable(B),z=A&&r.isResizable(A),y=x-u.left<=s,w=u.right-x<=(!this.activeHdBtn?s:2);
if(y&&z){p=Ext.isAir?"move":Ext.isWebKit?"e-resize":"col-resize"
}else{if(w&&q){p=Ext.isAir?"move":Ext.isWebKit?"w-resize":"col-resize"
}}}e.cursor=p
}},getPreviousVisible:function(b){while(b>0){if(!this.cm.isHidden(b-1)){return b
}b--
}return undefined
},handleHdOver:function(h,e){var g=this.findHeaderCell(e);
if(g&&!this.headersDisabled){var f=this.fly(g);
this.activeHdRef=e;
this.activeHdIndex=this.getCellIndex(g);
this.activeHdRegion=f.getRegion();
if(!this.isMenuDisabled(this.activeHdIndex,f)){f.addClass("x-grid3-hd-over");
this.activeHdBtn=f.child(".x-grid3-hd-btn");
if(this.activeHdBtn){this.activeHdBtn.dom.style.height=(g.firstChild.offsetHeight-1)+"px"
}}}},handleHdOut:function(d,e){var f=this.findHeaderCell(e);
if(f&&(!Ext.isIE||!d.within(f,true))){this.activeHdRef=null;
this.fly(f).removeClass("x-grid3-hd-over");
f.style.cursor=""
}},isMenuDisabled:function(d,c){return this.cm.isMenuDisabled(d)
},hasRows:function(){var b=this.mainBody.dom.firstChild;
return b&&b.nodeType==1&&b.className!="x-grid-empty"
},isHideableColumn:function(b){return !b.hidden
},bind:function(d,c){this.initData(d,c)
}});
Ext.grid.GridView.SplitDragZone=Ext.extend(Ext.dd.DDProxy,{constructor:function(d,c){this.grid=d;
this.view=d.getView();
this.marker=this.view.resizeMarker;
this.proxy=this.view.resizeProxy;
Ext.grid.GridView.SplitDragZone.superclass.constructor.call(this,c,"gridSplitters"+this.grid.getGridEl().id,{dragElId:Ext.id(this.proxy.dom),resizeFrame:false});
this.scroll=false;
this.hw=this.view.splitHandleWidth||5
},b4StartDrag:function(g,h){this.dragHeadersDisabled=this.view.headersDisabled;
this.view.headersDisabled=true;
var i=this.view.mainWrap.getHeight();
this.marker.setHeight(i);
this.marker.show();
this.marker.alignTo(this.view.getHeaderCell(this.cellIndex),"tl-tl",[-2,0]);
this.proxy.setHeight(i);
var f=this.cm.getColumnWidth(this.cellIndex),j=Math.max(f-this.grid.minColumnWidth,0);
this.resetConstraints();
this.setXConstraint(j,1000);
this.setYConstraint(0,0);
this.minX=g-j;
this.maxX=g+1000;
this.startPos=g;
Ext.dd.DDProxy.prototype.b4StartDrag.call(this,g,h)
},allowHeaderDrag:function(b){return true
},handleMouseDown:function(r){var m=this.view.findHeaderCell(r.getTarget());
if(m&&this.allowHeaderDrag(r)){var e=this.view.fly(m).getXY(),p=e[0],l=r.getXY(),q=l[0],n=m.offsetWidth,o=false;
if((q-p)<=this.hw){o=-1
}else{if((p+n)-q<=this.hw){o=0
}}if(o!==false){this.cm=this.grid.colModel;
var k=this.view.getCellIndex(m);
if(o==-1){if(k+o<0){return
}while(this.cm.isHidden(k+o)){--o;
if(k+o<0){return
}}}this.cellIndex=k+o;
this.split=m.dom;
if(this.cm.isResizable(this.cellIndex)&&!this.cm.isFixed(this.cellIndex)){Ext.grid.GridView.SplitDragZone.superclass.handleMouseDown.apply(this,arguments)
}}else{if(this.view.columnDrag){this.view.columnDrag.callHandleMouseDown(r)
}}}},endDrag:function(h){this.marker.hide();
var g=this.view,j=Math.max(this.minX,h.getPageX()),i=j-this.startPos,e=this.dragHeadersDisabled;
g.onColumnSplitterMoved(this.cellIndex,this.cm.getColumnWidth(this.cellIndex)+i);
setTimeout(function(){g.headersDisabled=e
},50)
},autoOffset:function(){this.setDelta(0,0)
}});
Ext.grid.PivotGridView=Ext.extend(Ext.grid.GridView,{colHeaderCellCls:"grid-hd-group-cell",title:"",getColumnHeaders:function(){return this.grid.topAxis.buildHeaders()
},getRowHeaders:function(){return this.grid.leftAxis.buildHeaders()
},renderRows:function(P,z){var O=this.grid,E=O.extractData(),D=E.length,K=this.templates,A=O.renderer,J=typeof A=="function",j=this.getCellCls,F=typeof j=="function",M=K.cell,i=K.row,I=[],C={},N="width:"+this.getGridInnerWidth()+"px;",H,B,L,x,G;
P=P||0;
z=Ext.isDefined(z)?z:D-1;
for(x=0;
x<D;
x++){G=E[x];
B=G.length;
H=[];
for(var y=0;
y<B;
y++){C.id=x+"-"+y;
C.css=y===0?"x-grid3-cell-first ":(y==(B-1)?"x-grid3-cell-last ":"");
C.attr=C.cellAttr="";
C.value=G[y];
if(Ext.isEmpty(C.value)){C.value="&#160;"
}if(J){C.value=A(C.value)
}if(F){C.css+=j(C.value)+" "
}H[H.length]=M.apply(C)
}I[I.length]=i.apply({tstyle:N,cols:B,cells:H.join(""),alt:""})
}return I.join("")
},masterTpl:new Ext.Template('<div class="x-grid3 x-pivotgrid" hidefocus="true">','<div class="x-grid3-viewport">','<div class="x-grid3-header">','<div class="x-grid3-header-title"><span>{title}</span></div>','<div class="x-grid3-header-inner">','<div class="x-grid3-header-offset" style="{ostyle}"></div>',"</div>",'<div class="x-clear"></div>',"</div>",'<div class="x-grid3-scroller">','<div class="x-grid3-row-headers"></div>','<div class="x-grid3-body" style="{bstyle}">{body}</div>','<a href="#" class="x-grid3-focus" tabIndex="-1"></a>',"</div>","</div>",'<div class="x-grid3-resize-marker">&#160;</div>','<div class="x-grid3-resize-proxy">&#160;</div>',"</div>"),initTemplates:function(){Ext.grid.PivotGridView.superclass.initTemplates.apply(this,arguments);
var b=this.templates||{};
if(!b.gcell){b.gcell=new Ext.XTemplate('<td class="x-grid3-hd x-grid3-gcell x-grid3-td-{id} ux-grid-hd-group-row-{row} '+this.colHeaderCellCls+'" style="{style}">','<div {tooltip} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">',this.grid.enableHdMenu?'<a class="x-grid3-hd-btn" href="#"></a>':"","{value}","</div>","</td>")
}this.templates=b;
this.hrowRe=new RegExp("ux-grid-hd-group-row-(\\d+)","")
},initElements:function(){Ext.grid.PivotGridView.superclass.initElements.apply(this,arguments);
this.rowHeadersEl=new Ext.Element(this.scroller.child("div.x-grid3-row-headers"));
this.headerTitleEl=new Ext.Element(this.mainHd.child("div.x-grid3-header-title"))
},getGridInnerWidth:function(){var b=Ext.grid.PivotGridView.superclass.getGridInnerWidth.apply(this,arguments);
return b-this.getTotalRowHeaderWidth()
},getTotalRowHeaderWidth:function(){var g=this.getRowHeaders(),h=g.length,e=0,f;
for(f=0;
f<h;
f++){e+=g[f].width
}return e
},getTotalColumnHeaderHeight:function(){return this.getColumnHeaders().length*21
},getCellIndex:function(d){if(d){var e=d.className.match(this.colRe),f;
if(e&&(f=e[1])){return parseInt(f.split("-")[1],10)
}}return false
},renderUI:function(){var c=this.templates,d=this.getGridInnerWidth();
return c.master.apply({body:c.body.apply({rows:"&#160;"}),ostyle:"width:"+d+"px",bstyle:"width:"+d+"px"})
},onLayout:function(c,d){Ext.grid.PivotGridView.superclass.onLayout.apply(this,arguments);
var c=this.getGridInnerWidth();
this.resizeColumnHeaders(c);
this.resizeAllRows(c)
},refresh:function(c){this.fireEvent("beforerefresh",this);
this.grid.stopEditing(true);
var d=this.renderBody();
this.mainBody.update(d).setWidth(this.getGridInnerWidth());
if(c===true){this.updateHeaders();
this.updateHeaderSortState()
}this.processRows(0,true);
this.layout();
this.applyEmptyText();
this.fireEvent("refresh",this)
},renderHeaders:Ext.emptyFn,fitColumns:Ext.emptyFn,resizeColumnHeaders:function(c){var d=this.grid.topAxis;
if(d.rendered){d.el.setWidth(c)
}},resizeRowHeaders:function(){var d=this.getTotalRowHeaderWidth(),c=String.format("margin-left: {0}px;",d);
this.rowHeadersEl.setWidth(d);
this.mainBody.applyStyles(c);
Ext.fly(this.innerHd).applyStyles(c);
this.headerTitleEl.setWidth(d);
this.headerTitleEl.setHeight(this.getTotalColumnHeaderHeight())
},resizeAllRows:function(e){var g=this.getRows(),h=g.length,f;
for(f=0;
f<h;
f++){Ext.fly(g[f]).setWidth(e);
Ext.fly(g[f]).child("table").setWidth(e)
}},updateHeaders:function(){this.renderGroupRowHeaders();
this.renderGroupColumnHeaders()
},renderGroupRowHeaders:function(){var b=this.grid.leftAxis;
this.resizeRowHeaders();
b.rendered=false;
b.render(this.rowHeadersEl);
this.setTitle(this.title)
},setTitle:function(b){this.headerTitleEl.child("span").dom.innerHTML=b
},renderGroupColumnHeaders:function(){var b=this.grid.topAxis;
b.rendered=false;
b.render(this.innerHd.firstChild)
},isMenuDisabled:function(d,c){return true
}});
Ext.grid.PivotAxis=Ext.extend(Ext.Component,{orientation:"horizontal",defaultHeaderWidth:80,paddingWidth:7,setDimensions:function(b){this.dimensions=b
},onRender:function(d,e){var f=this.orientation=="horizontal"?this.renderHorizontalRows():this.renderVerticalRows();
this.el=Ext.DomHelper.overwrite(d.dom,{tag:"table",cn:f},true)
},renderHorizontalRows:function(){var k=this.buildHeaders(),j=k.length,m=[],p,l,n,o,i;
for(o=0;
o<j;
o++){p=[];
l=k[o].items;
n=l.length;
for(i=0;
i<n;
i++){p.push({tag:"td",html:l[i].header,colspan:l[i].span})
}m[o]={tag:"tr",cn:p}
}return m
},renderVerticalRows:function(){var s=this.buildHeaders(),m=s.length,t=[],i=[],n,r,j,o,p,q;
for(p=0;
p<m;
p++){r=s[p];
o=r.width||80;
n=r.items.length;
for(q=0;
q<n;
q++){j=r.items[q];
t[j.start]=t[j.start]||[];
t[j.start].push({tag:"td",html:j.header,rowspan:j.span,width:Ext.isBorderBox?o:o-this.paddingWidth})
}}n=t.length;
for(p=0;
p<n;
p++){i[p]={tag:"tr",cn:t[p]}
}return i
},getTuples:function(){var y=new Ext.data.Store({});
y.data=this.store.data.clone();
y.fields=this.store.fields;
var q=[],z=this.dimensions,x=z.length,s;
for(s=0;
s<x;
s++){q.push({field:z[s].dataIndex,direction:z[s].direction||"ASC"})
}y.sort(q);
var v=y.data.items,o=[],r=[],i,t,w,u,p;
x=v.length;
for(s=0;
s<x;
s++){w=this.getRecordInfo(v[s]);
u=w.data;
t="";
for(p in u){t+=u[p]+"---"
}if(o.indexOf(t)==-1){o.push(t);
r.push(w)
}}y.destroy();
return r
},getRecordInfo:function(j){var n=this.dimensions,o=n.length,l={},k,p,i;
for(i=0;
i<o;
i++){k=n[i];
p=k.dataIndex;
l[p]=j.get(p)
}var m=function(a){return function(c){for(var b in a){if(c.get(b)!=a[b]){return false
}}return true
}
};
return{data:l,matcher:m(l)}
},buildHeaders:function(){var x=this.getTuples(),w=x.length,F=this.dimensions,B,j=F.length,D=[],u,i,v,s,t,E,y,z,A,C;
for(A=0;
A<j;
A++){B=F[A];
i=[];
t=0;
E=0;
for(C=0;
C<w;
C++){u=x[C];
y=C==(w-1);
v=u.data[B.dataIndex];
z=s!=undefined&&s!=v;
if(A>0&&C>0){z=z||u.data[F[A-1].dataIndex]!=x[C-1].data[F[A-1].dataIndex]
}if(z){i.push({header:s,span:t,start:E});
E+=t;
t=0
}if(y){i.push({header:v,span:t+1,start:E});
E+=t;
t=0
}s=v;
t++
}D.push({items:i,width:B.width||this.defaultHeaderWidth});
s=undefined
}return D
}});
Ext.grid.HeaderDragZone=Ext.extend(Ext.dd.DragZone,{maxDragWidth:120,constructor:function(e,f,d){this.grid=e;
this.view=e.getView();
this.ddGroup="gridHeader"+this.grid.getGridEl().id;
Ext.grid.HeaderDragZone.superclass.constructor.call(this,f);
if(d){this.setHandleElId(Ext.id(f));
this.setOuterHandleElId(Ext.id(d))
}this.scroll=false
},getDragData:function(f){var e=Ext.lib.Event.getTarget(f),d=this.view.findHeaderCell(e);
if(d){return{ddel:d.firstChild,header:d}
}return false
},onInitDrag:function(d){this.dragHeadersDisabled=this.view.headersDisabled;
this.view.headersDisabled=true;
var c=this.dragData.ddel.cloneNode(true);
c.id=Ext.id();
c.style.width=Math.min(this.dragData.header.offsetWidth,this.maxDragWidth)+"px";
this.proxy.update(c);
return true
},afterValidDrop:function(){this.completeDrop()
},afterInvalidDrop:function(){this.completeDrop()
},completeDrop:function(){var d=this.view,c=this.dragHeadersDisabled;
setTimeout(function(){d.headersDisabled=c
},50)
}});
Ext.grid.HeaderDropZone=Ext.extend(Ext.dd.DropZone,{proxyOffsets:[-4,-9],fly:Ext.Element.fly,constructor:function(e,f,d){this.grid=e;
this.view=e.getView();
this.proxyTop=Ext.DomHelper.append(document.body,{cls:"col-move-top",html:"&#160;"},true);
this.proxyBottom=Ext.DomHelper.append(document.body,{cls:"col-move-bottom",html:"&#160;"},true);
this.proxyTop.hide=this.proxyBottom.hide=function(){this.setLeftTop(-100,-100);
this.setStyle("visibility","hidden")
};
this.ddGroup="gridHeader"+this.grid.getGridEl().id;
Ext.grid.HeaderDropZone.superclass.constructor.call(this,e.getGridEl().dom)
},getTargetFromEvent:function(f){var e=Ext.lib.Event.getTarget(f),d=this.view.findCellIndex(e);
if(d!==false){return this.view.getHeaderCell(d)
}},nextVisible:function(f){var d=this.view,e=this.grid.colModel;
f=f.nextSibling;
while(f){if(!e.isHidden(d.getCellIndex(f))){return f
}f=f.nextSibling
}return null
},prevVisible:function(f){var d=this.view,e=this.grid.colModel;
f=f.prevSibling;
while(f){if(!e.isHidden(d.getCellIndex(f))){return f
}f=f.prevSibling
}return null
},positionIndicator:function(o,k,l){var h=Ext.lib.Event.getPageX(l),n=Ext.lib.Dom.getRegion(k.firstChild),p,m,e=n.top+this.proxyOffsets[1];
if((n.right-h)<=(n.right-n.left)/2){p=n.right+this.view.borderWidth;
m="after"
}else{p=n.left;
m="before"
}if(this.grid.colModel.isFixed(this.view.getCellIndex(k))){return false
}p+=this.proxyOffsets[0];
this.proxyTop.setLeftTop(p,e);
this.proxyTop.show();
if(!this.bottomOffset){this.bottomOffset=this.view.mainHd.getHeight()
}this.proxyBottom.setLeftTop(p,e+this.proxyTop.dom.offsetHeight+this.bottomOffset);
this.proxyBottom.show();
return m
},onNodeEnter:function(g,f,h,e){if(e.header!=g){this.positionIndicator(e.header,g,h)
}},onNodeOver:function(h,e,i,j){var g=false;
if(j.header!=h){g=this.positionIndicator(j.header,h,i)
}if(!g){this.proxyTop.hide();
this.proxyBottom.hide()
}return g?this.dropAllowed:this.dropNotAllowed
},onNodeOut:function(g,f,h,e){this.proxyTop.hide();
this.proxyBottom.hide()
},onNodeDrop:function(u,h,r,t){var s=t.header;
if(s!=u){var o=this.grid.colModel,p=Ext.lib.Event.getPageX(r),v=Ext.lib.Dom.getRegion(u.firstChild),e=(v.right-p)<=((v.right-v.left)/2)?"after":"before",q=this.view.getCellIndex(s),n=this.view.getCellIndex(u);
if(e=="after"){n++
}if(q<n){n--
}o.moveColumn(q,n);
return true
}return false
}});
Ext.grid.GridView.ColumnDragZone=Ext.extend(Ext.grid.HeaderDragZone,{constructor:function(d,c){Ext.grid.GridView.ColumnDragZone.superclass.constructor.call(this,d,c,null);
this.proxy.el.addClass("x-grid3-col-dd")
},handleMouseDown:function(b){},callHandleMouseDown:function(b){Ext.grid.GridView.ColumnDragZone.superclass.handleMouseDown.call(this,b)
}});
Ext.grid.SplitDragZone=Ext.extend(Ext.dd.DDProxy,{fly:Ext.Element.fly,constructor:function(e,f,d){this.grid=e;
this.view=e.getView();
this.proxy=this.view.resizeProxy;
Ext.grid.SplitDragZone.superclass.constructor.call(this,f,"gridSplitters"+this.grid.getGridEl().id,{dragElId:Ext.id(this.proxy.dom),resizeFrame:false});
this.setHandleElId(Ext.id(f));
this.setOuterHandleElId(Ext.id(d));
this.scroll=false
},b4StartDrag:function(f,g){this.view.headersDisabled=true;
this.proxy.setHeight(this.view.mainWrap.getHeight());
var e=this.cm.getColumnWidth(this.cellIndex);
var h=Math.max(e-this.grid.minColumnWidth,0);
this.resetConstraints();
this.setXConstraint(h,1000);
this.setYConstraint(0,0);
this.minX=f-h;
this.maxX=f+1000;
this.startPos=f;
Ext.dd.DDProxy.prototype.b4StartDrag.call(this,f,g)
},handleMouseDown:function(f){var d=Ext.EventObject.setEvent(f);
var e=this.fly(d.getTarget());
if(e.hasClass("x-grid-split")){this.cellIndex=this.view.getCellIndex(e.dom);
this.split=e.dom;
this.cm=this.grid.colModel;
if(this.cm.isResizable(this.cellIndex)&&!this.cm.isFixed(this.cellIndex)){Ext.grid.SplitDragZone.superclass.handleMouseDown.apply(this,arguments)
}}},endDrag:function(f){this.view.headersDisabled=false;
var e=Math.max(this.minX,Ext.lib.Event.getPageX(f));
var d=e-this.startPos;
this.view.onColumnSplitterMoved(this.cellIndex,this.cm.getColumnWidth(this.cellIndex)+d)
},autoOffset:function(){this.setDelta(0,0)
}});
Ext.grid.GridDragZone=function(c,d){this.view=c.getView();
Ext.grid.GridDragZone.superclass.constructor.call(this,this.view.mainBody.dom,d);
this.scroll=false;
this.grid=c;
this.ddel=document.createElement("div");
this.ddel.className="x-grid-dd-wrap"
};
Ext.extend(Ext.grid.GridDragZone,Ext.dd.DragZone,{ddGroup:"GridDD",getDragData:function(e){var f=Ext.lib.Event.getTarget(e);
var g=this.view.findRowIndex(f);
if(g!==false){var h=this.grid.selModel;
if(!h.isSelected(g)||e.hasModifier()){h.handleMouseDown(this.grid,g,e)
}return{grid:this.grid,ddel:this.ddel,rowIndex:g,selections:h.getSelections()}
}return false
},onInitDrag:function(c){var d=this.dragData;
this.ddel.innerHTML=this.grid.getDragDropText();
this.proxy.update(this.ddel)
},afterRepair:function(){this.dragging=false
},getRepairXY:function(c,d){return false
},onEndDrag:function(d,c){},onValidDrop:function(e,d,f){this.hideProxy()
},beforeInvalidDrop:function(d,c){}});
Ext.grid.ColumnModel=Ext.extend(Ext.util.Observable,{defaultWidth:100,defaultSortable:false,constructor:function(b){if(b.columns){Ext.apply(this,b);
this.setConfig(b.columns,true)
}else{this.setConfig(b,true)
}this.addEvents("widthchange","headerchange","hiddenchange","columnmoved","configchange");
Ext.grid.ColumnModel.superclass.constructor.call(this)
},getColumnId:function(b){return this.config[b].id
},getColumnAt:function(b){return this.config[b]
},setConfig:function(l,c){var k,i,h;
if(!c){delete this.totalWidth;
for(k=0,h=this.config.length;
k<h;
k++){i=this.config[k];
if(i.setEditor){i.setEditor(null)
}}}this.defaults=Ext.apply({width:this.defaultWidth,sortable:this.defaultSortable},this.defaults);
this.config=l;
this.lookup={};
for(k=0,h=l.length;
k<h;
k++){i=Ext.applyIf(l[k],this.defaults);
if(Ext.isEmpty(i.id)){i.id=k
}if(!i.isColumn){var j=Ext.grid.Column.types[i.xtype||"gridcolumn"];
i=new j(i);
l[k]=i
}this.lookup[i.id]=i
}if(!c){this.fireEvent("configchange",this)
}},getColumnById:function(b){return this.lookup[b]
},getIndexById:function(f){for(var d=0,e=this.config.length;
d<e;
d++){if(this.config[d].id==f){return d
}}return -1
},moveColumn:function(g,c){var f=this.config,h=f[g];
f.splice(g,1);
f.splice(c,0,h);
this.dataMap=null;
this.fireEvent("columnmoved",this,g,c)
},getColumnCount:function(c){var h=this.config.length,g=0,f;
if(c===true){for(f=0;
f<h;
f++){if(!this.isHidden(f)){g++
}}return g
}return h
},getColumnsBy:function(l,m){var c=this.config,k=c.length,i=[],n,j;
for(n=0;
n<k;
n++){j=c[n];
if(l.call(m||this,j,n)===true){i[i.length]=j
}}return i
},isSortable:function(b){return !!this.config[b].sortable
},isMenuDisabled:function(b){return !!this.config[b].menuDisabled
},getRenderer:function(b){return this.config[b].renderer||Ext.grid.ColumnModel.defaultRenderer
},getRendererScope:function(b){return this.config[b].scope
},setRenderer:function(d,c){this.config[d].renderer=c
},getColumnWidth:function(d){var c=this.config[d].width;
if(typeof c!="number"){c=this.defaultWidth
}return c
},setColumnWidth:function(d,f,e){this.config[d].width=f;
this.totalWidth=null;
if(!e){this.fireEvent("widthchange",this,d,f)
}},getTotalWidth:function(d){if(!this.totalWidth){this.totalWidth=0;
for(var f=0,e=this.config.length;
f<e;
f++){if(d||!this.isHidden(f)){this.totalWidth+=this.getColumnWidth(f)
}}}return this.totalWidth
},getColumnHeader:function(b){return this.config[b].header
},setColumnHeader:function(d,c){this.config[d].header=c;
this.fireEvent("headerchange",this,d,c)
},getColumnTooltip:function(b){return this.config[b].tooltip
},setColumnTooltip:function(d,c){this.config[d].tooltip=c
},getDataIndex:function(b){return this.config[b].dataIndex
},setDataIndex:function(d,c){this.config[d].dataIndex=c
},findColumnIndex:function(h){var g=this.config;
for(var c=0,f=g.length;
c<f;
c++){if(g[c].dataIndex==h){return c
}}return -1
},isCellEditable:function(c,g){var h=this.config[c],f=h.editable;
return !!(f||(!Ext.isDefined(f)&&h.editor))
},getCellEditor:function(d,c){return this.config[d].getCellEditor(c)
},setEditable:function(d,c){this.config[d].editable=c
},isHidden:function(b){return !!this.config[b].hidden
},isFixed:function(b){return !!this.config[b].fixed
},isResizable:function(b){return b>=0&&this.config[b].resizable!==false&&this.config[b].fixed!==true
},setHidden:function(e,c){var f=this.config[e];
if(f.hidden!==c){f.hidden=c;
this.totalWidth=null;
this.fireEvent("hiddenchange",this,e,c)
}},setEditor:function(d,c){this.config[d].setEditor(c)
},destroy:function(){var c=this.config.length,d=0;
for(;
d<c;
d++){this.config[d].destroy()
}delete this.config;
delete this.lookup;
this.purgeListeners()
},setState:function(d,c){c=Ext.applyIf(c,this.defaults);
Ext.apply(this.config[d],c)
}});
Ext.grid.ColumnModel.defaultRenderer=function(b){if(typeof b=="string"&&b.length<1){return"&#160;"
}return b
};
Ext.grid.AbstractSelectionModel=Ext.extend(Ext.util.Observable,{constructor:function(){this.locked=false;
Ext.grid.AbstractSelectionModel.superclass.constructor.call(this)
},init:function(b){this.grid=b;
if(this.lockOnInit){delete this.lockOnInit;
this.locked=false;
this.lock()
}this.initEvents()
},lock:function(){if(!this.locked){this.locked=true;
var b=this.grid;
if(b){b.getView().on({scope:this,beforerefresh:this.sortUnLock,refresh:this.sortLock})
}else{this.lockOnInit=true
}}},sortLock:function(){this.locked=true
},sortUnLock:function(){this.locked=false
},unlock:function(){if(this.locked){this.locked=false;
var d=this.grid,c;
if(d){c=d.getView();
c.un("beforerefresh",this.sortUnLock,this);
c.un("refresh",this.sortLock,this)
}else{delete this.lockOnInit
}}},isLocked:function(){return this.locked
},destroy:function(){this.unlock();
this.purgeListeners()
}});
Ext.grid.RowSelectionModel=Ext.extend(Ext.grid.AbstractSelectionModel,{singleSelect:false,constructor:function(b){Ext.apply(this,b);
this.selections=new Ext.util.MixedCollection(false,function(a){return a.id
});
this.last=false;
this.lastActive=false;
this.addEvents("selectionchange","beforerowselect","rowselect","rowdeselect");
Ext.grid.RowSelectionModel.superclass.constructor.call(this)
},initEvents:function(){if(!this.grid.enableDragDrop&&!this.grid.enableDrag){this.grid.on("rowmousedown",this.handleMouseDown,this)
}this.rowNav=new Ext.KeyNav(this.grid.getGridEl(),{up:this.onKeyPress,down:this.onKeyPress,scope:this});
this.grid.getView().on({scope:this,refresh:this.onRefresh,rowupdated:this.onRowUpdated,rowremoved:this.onRemove})
},onKeyPress:function(j,e){var h=e=="up",i=h?"selectPrevious":"selectNext",k=h?-1:1,l;
if(!j.shiftKey||this.singleSelect){this[i](false)
}else{if(this.last!==false&&this.lastActive!==false){l=this.last;
this.selectRange(this.last,this.lastActive+k);
this.grid.getView().focusRow(this.lastActive);
if(l!==false){this.last=l
}}else{this.selectFirstRow()
}}},onRefresh:function(){var i=this.grid.store,k=this.getSelections(),l=0,h=k.length,g,j;
this.silent=true;
this.clearSelections(true);
for(;
l<h;
l++){j=k[l];
if((g=i.indexOfId(j.id))!=-1){this.selectRow(g,true)
}}if(k.length!=this.selections.getCount()){this.fireEvent("selectionchange",this)
}this.silent=false
},onRemove:function(e,d,f){if(this.selections.remove(f)!==false){this.fireEvent("selectionchange",this)
}},onRowUpdated:function(e,d,f){if(this.isSelected(f)){e.onRowSelect(d)
}},selectRecords:function(f,h){if(!h){this.clearSelections()
}var i=this.grid.store,j=0,g=f.length;
for(;
j<g;
j++){this.selectRow(i.indexOf(f[j]),true)
}},getCount:function(){return this.selections.length
},selectFirstRow:function(){this.selectRow(0)
},selectLastRow:function(b){this.selectRow(this.grid.store.getCount()-1,b)
},selectNext:function(b){if(this.hasNext()){this.selectRow(this.last+1,b);
this.grid.getView().focusRow(this.last);
return true
}return false
},selectPrevious:function(b){if(this.hasPrevious()){this.selectRow(this.last-1,b);
this.grid.getView().focusRow(this.last);
return true
}return false
},hasNext:function(){return this.last!==false&&(this.last+1)<this.grid.store.getCount()
},hasPrevious:function(){return !!this.last
},getSelections:function(){return[].concat(this.selections.items)
},getSelected:function(){return this.selections.itemAt(0)
},each:function(h,i){var j=this.getSelections(),f=0,g=j.length;
for(;
f<g;
f++){if(h.call(i||this,j[f],f)===false){return false
}}return true
},clearSelections:function(e){if(this.isLocked()){return
}if(e!==true){var f=this.grid.store,d=this.selections;
d.each(function(a){this.deselectRow(f.indexOfId(a.id))
},this);
d.clear()
}else{this.selections.clear()
}this.last=false
},selectAll:function(){if(this.isLocked()){return
}this.selections.clear();
for(var c=0,d=this.grid.store.getCount();
c<d;
c++){this.selectRow(c,true)
}},hasSelection:function(){return this.selections.length>0
},isSelected:function(d){var c=Ext.isNumber(d)?this.grid.store.getAt(d):d;
return(c&&this.selections.key(c.id)?true:false)
},isIdSelected:function(b){return(this.selections.key(b)?true:false)
},handleMouseDown:function(k,i,j){if(j.button!==0||this.isLocked()){return
}var g=this.grid.getView();
if(j.shiftKey&&!this.singleSelect&&this.last!==false){var l=this.last;
this.selectRange(l,i,j.ctrlKey);
this.last=l;
g.focusRow(i)
}else{var e=this.isSelected(i);
if(j.ctrlKey&&e){this.deselectRow(i)
}else{if(!e||this.getCount()>1){this.selectRow(i,j.ctrlKey||j.shiftKey);
g.focusRow(i)
}}}},selectRows:function(h,g){if(!g){this.clearSelections()
}for(var e=0,f=h.length;
e<f;
e++){this.selectRow(h[e],true)
}},selectRange:function(e,f,g){var h;
if(this.isLocked()){return
}if(!g){this.clearSelections()
}if(e<=f){for(h=e;
h<=f;
h++){this.selectRow(h,true)
}}else{for(h=e;
h>=f;
h--){this.selectRow(h,true)
}}},deselectRange:function(h,e,f){if(this.isLocked()){return
}for(var g=h;
g<=e;
g++){this.deselectRow(g,f)
}},selectRow:function(e,g,f){if(this.isLocked()||(e<0||e>=this.grid.store.getCount())||(g&&this.isSelected(e))){return
}var h=this.grid.store.getAt(e);
if(h&&this.fireEvent("beforerowselect",this,e,g,h)!==false){if(!g||this.singleSelect){this.clearSelections()
}this.selections.add(h);
this.last=this.lastActive=e;
if(!f){this.grid.getView().onRowSelect(e)
}if(!this.silent){this.fireEvent("rowselect",this,e,h);
this.fireEvent("selectionchange",this)
}}},deselectRow:function(d,e){if(this.isLocked()){return
}if(this.last==d){this.last=false
}if(this.lastActive==d){this.lastActive=false
}var f=this.grid.store.getAt(d);
if(f){this.selections.remove(f);
if(!e){this.grid.getView().onRowDeselect(d)
}this.fireEvent("rowdeselect",this,d,f);
this.fireEvent("selectionchange",this)
}},acceptsNav:function(f,d,e){return !e.isHidden(d)&&e.isCellEditable(d,f)
},onEditorKey:function(g,p){var t=p.getKey(),s,r=this.grid,c=r.lastEdit,q=r.activeEditor,u=p.shiftKey,e,c,v,k;
if(t==p.TAB){p.stopEvent();
q.completeEdit();
if(u){s=r.walkCells(q.row,q.col-1,-1,this.acceptsNav,this)
}else{s=r.walkCells(q.row,q.col+1,1,this.acceptsNav,this)
}}else{if(t==p.ENTER){if(this.moveEditorOnEnter!==false){if(u){s=r.walkCells(c.row-1,c.col,-1,this.acceptsNav,this)
}else{s=r.walkCells(c.row+1,c.col,1,this.acceptsNav,this)
}}}}if(s){v=s[0];
k=s[1];
this.onEditorSelect(v,c.row);
if(r.isEditor&&r.editing){e=r.activeEditor;
if(e&&e.field.triggerBlur){e.field.triggerBlur()
}}r.startEditing(v,k)
}},onEditorSelect:function(c,d){if(d!=c){this.selectRow(c)
}},destroy:function(){Ext.destroy(this.rowNav);
this.rowNav=null;
Ext.grid.RowSelectionModel.superclass.destroy.call(this)
}});
Ext.grid.Column=Ext.extend(Ext.util.Observable,{isColumn:true,constructor:function(c){Ext.apply(this,c);
if(Ext.isString(this.renderer)){this.renderer=Ext.util.Format[this.renderer]
}else{if(Ext.isObject(this.renderer)){this.scope=this.renderer.scope;
this.renderer=this.renderer.fn
}}if(!this.scope){this.scope=this
}var d=this.editor;
delete this.editor;
this.setEditor(d);
this.addEvents("click","contextmenu","dblclick","mousedown");
Ext.grid.Column.superclass.constructor.call(this)
},processEvent:function(e,i,j,h,g){return this.fireEvent(e,this,j,h,i)
},destroy:function(){if(this.setEditor){this.setEditor(null)
}this.purgeListeners()
},renderer:function(b){return b
},getEditor:function(b){return this.editable!==false?this.editor:null
},setEditor:function(c){var d=this.editor;
if(d){if(d.gridEditor){d.gridEditor.destroy();
delete d.gridEditor
}else{d.destroy()
}}this.editor=null;
if(c){if(!c.isXType){c=Ext.create(c,"textfield")
}this.editor=c
}},getCellEditor:function(c){var d=this.getEditor(c);
if(d){if(!d.startEdit){if(!d.gridEditor){d.gridEditor=new Ext.grid.GridEditor(d)
}d=d.gridEditor
}}return d
}});
Ext.grid.BooleanColumn=Ext.extend(Ext.grid.Column,{trueText:"true",falseText:"false",undefinedText:"&#160;",constructor:function(f){Ext.grid.BooleanColumn.superclass.constructor.call(this,f);
var h=this.trueText,g=this.falseText,e=this.undefinedText;
this.renderer=function(a){if(a===undefined){return e
}if(!a||a==="false"){return g
}return h
}
}});
Ext.grid.NumberColumn=Ext.extend(Ext.grid.Column,{format:"0,000.00",constructor:function(b){Ext.grid.NumberColumn.superclass.constructor.call(this,b);
this.renderer=Ext.util.Format.numberRenderer(this.format)
}});
Ext.grid.DateColumn=Ext.extend(Ext.grid.Column,{format:"m/d/Y",constructor:function(b){Ext.grid.DateColumn.superclass.constructor.call(this,b);
this.renderer=Ext.util.Format.dateRenderer(this.format)
}});
Ext.grid.TemplateColumn=Ext.extend(Ext.grid.Column,{constructor:function(d){Ext.grid.TemplateColumn.superclass.constructor.call(this,d);
var c=(!Ext.isPrimitive(this.tpl)&&this.tpl.compile)?this.tpl:new Ext.XTemplate(this.tpl);
this.renderer=function(b,a,f){return c.apply(f.data)
};
this.tpl=c
}});
Ext.grid.ActionColumn=Ext.extend(Ext.grid.Column,{header:"&#160;",actionIdRe:/x-action-col-(\d+)/,altText:"",constructor:function(g){var i=this,l=g.items||(i.items=[i]),h=l.length,k,j;
Ext.grid.ActionColumn.superclass.constructor.call(i,g);
i.renderer=function(b,a){b=Ext.isFunction(g.renderer)?g.renderer.apply(this,arguments)||"":"";
a.css+=" x-action-col-cell";
for(k=0;
k<h;
k++){j=l[k];
b+='<img alt="'+(j.altText||i.altText)+'" src="'+(j.icon||Ext.BLANK_IMAGE_URL)+'" class="x-action-col-icon x-action-col-'+String(k)+" "+(j.iconCls||"")+" "+(Ext.isFunction(j.getClass)?j.getClass.apply(j.scope||this.scope||this,arguments):"")+'"'+((j.tooltip)?' ext:qtip="'+j.tooltip+'"':"")+" />"
}return b
}
},destroy:function(){delete this.items;
delete this.renderer;
return Ext.grid.ActionColumn.superclass.destroy.apply(this,arguments)
},processEvent:function(p,l,o,k,e){var j=l.getTarget().className.match(this.actionIdRe),m,n;
if(j&&(m=this.items[parseInt(j[1],10)])){if(p=="click"){(n=m.handler||this.handler)&&n.call(m.scope||this.scope||this,o,k,e,m,l)
}else{if((p=="mousedown")&&(m.stopSelection!==false)){return false
}}}return Ext.grid.ActionColumn.superclass.processEvent.apply(this,arguments)
}});
Ext.grid.Column.types={gridcolumn:Ext.grid.Column,booleancolumn:Ext.grid.BooleanColumn,numbercolumn:Ext.grid.NumberColumn,datecolumn:Ext.grid.DateColumn,templatecolumn:Ext.grid.TemplateColumn,actioncolumn:Ext.grid.ActionColumn};
Ext.grid.RowNumberer=Ext.extend(Object,{header:"",width:23,sortable:false,constructor:function(b){Ext.apply(this,b);
if(this.rowspan){this.renderer=this.renderer.createDelegate(this)
}},fixed:true,hideable:false,menuDisabled:true,dataIndex:"",id:"numberer",rowspan:undefined,renderer:function(e,h,f,g){if(this.rowspan){h.cellAttr='rowspan="'+this.rowspan+'"'
}return g+1
}});
Ext.grid.CheckboxSelectionModel=Ext.extend(Ext.grid.RowSelectionModel,{header:'<div class="x-grid3-hd-checker">&#160;</div>',width:20,sortable:false,menuDisabled:true,fixed:true,hideable:false,dataIndex:"",id:"checker",isColumn:true,constructor:function(){Ext.grid.CheckboxSelectionModel.superclass.constructor.apply(this,arguments);
if(this.checkOnly){this.handleMouseDown=Ext.emptyFn
}},initEvents:function(){Ext.grid.CheckboxSelectionModel.superclass.initEvents.call(this);
this.grid.on("render",function(){Ext.fly(this.grid.getView().innerHd).on("mousedown",this.onHdMouseDown,this)
},this)
},processEvent:function(e,i,j,h,g){if(e=="mousedown"){this.onMouseDown(i,i.getTarget());
return false
}else{return Ext.grid.Column.prototype.processEvent.apply(this,arguments)
}},onMouseDown:function(h,e){if(h.button===0&&e.className=="x-grid3-row-checker"){h.stopEvent();
var g=h.getTarget(".x-grid3-row");
if(g){var f=g.rowIndex;
if(this.isSelected(f)){this.deselectRow(f)
}else{this.selectRow(f,true);
this.grid.getView().focusRow(f)
}}}},onHdMouseDown:function(h,f){if(f.className=="x-grid3-hd-checker"){h.stopEvent();
var e=Ext.fly(f.parentNode);
var g=e.hasClass("x-grid3-hd-checker-on");
if(g){e.removeClass("x-grid3-hd-checker-on");
this.clearSelections()
}else{e.addClass("x-grid3-hd-checker-on");
this.selectAll()
}}},renderer:function(d,f,e){return'<div class="x-grid3-row-checker">&#160;</div>'
},onEditorSelect:function(c,d){if(d!=c&&!this.checkOnly){this.selectRow(c)
}}});
Ext.menu.Menu=Ext.extend(Ext.Container,{minWidth:120,shadow:"sides",subMenuAlign:"tl-tr?",defaultAlign:"tl-bl?",allowOtherMenus:false,ignoreParentClicks:false,enableScrolling:true,maxHeight:null,scrollIncrement:24,showSeparator:true,defaultOffsets:[0,0],plain:false,floating:true,zIndex:15000,hidden:true,layout:"menu",hideMode:"offsets",scrollerHeight:8,autoLayout:true,defaultType:"menuitem",bufferResize:false,initComponent:function(){if(Ext.isArray(this.initialConfig)){Ext.apply(this,{items:this.initialConfig})
}this.addEvents("click","mouseover","mouseout","itemclick");
Ext.menu.MenuMgr.register(this);
if(this.floating){Ext.EventManager.onWindowResize(this.hide,this)
}else{if(this.initialConfig.hidden!==false){this.hidden=false
}this.internalDefaults={hideOnClick:false}
}Ext.menu.Menu.superclass.initComponent.call(this);
if(this.autoLayout){var b=this.doLayout.createDelegate(this,[]);
this.on({add:b,remove:b})
}},getLayoutTarget:function(){return this.ul
},onRender:function(d,e){if(!d){d=Ext.getBody()
}var f={id:this.getId(),cls:"x-menu "+((this.floating)?"x-menu-floating x-layer ":"")+(this.cls||"")+(this.plain?" x-menu-plain":"")+(this.showSeparator?"":" x-menu-nosep"),style:this.style,cn:[{tag:"a",cls:"x-menu-focus",href:"#",onclick:"return false;",tabIndex:"-1"},{tag:"ul",cls:"x-menu-list"}]};
if(this.floating){this.el=new Ext.Layer({shadow:this.shadow,dh:f,constrain:false,parentEl:d,zindex:this.zIndex})
}else{this.el=d.createChild(f)
}Ext.menu.Menu.superclass.onRender.call(this,d,e);
if(!this.keyNav){this.keyNav=new Ext.menu.MenuNav(this)
}this.focusEl=this.el.child("a.x-menu-focus");
this.ul=this.el.child("ul.x-menu-list");
this.mon(this.ul,{scope:this,click:this.onClick,mouseover:this.onMouseOver,mouseout:this.onMouseOut});
if(this.enableScrolling){this.mon(this.el,{scope:this,delegate:".x-menu-scroller",click:this.onScroll,mouseover:this.deactivateActive})
}},findTargetItem:function(c){var d=c.getTarget(".x-menu-list-item",this.ul,true);
if(d&&d.menuItemId){return this.items.get(d.menuItemId)
}},onClick:function(c){var d=this.findTargetItem(c);
if(d){if(d.isFormField){this.setActiveItem(d)
}else{if(d instanceof Ext.menu.BaseItem){if(d.menu&&this.ignoreParentClicks){d.expandMenu();
c.preventDefault()
}else{if(d.onClick){d.onClick(c);
this.fireEvent("click",this,d,c)
}}}}}},setActiveItem:function(d,c){if(d!=this.activeItem){this.deactivateActive();
if((this.activeItem=d).isFormField){d.focus()
}else{d.activate(c)
}}else{if(c){d.expandMenu()
}}},deactivateActive:function(){var a=this.activeItem;
if(a){if(a.isFormField){if(a.collapse){a.collapse()
}}else{a.deactivate()
}delete this.activeItem
}},tryActivate:function(i,j){var g=this.items;
for(var l=i,h=g.length;
l>=0&&l<h;
l+=j){var k=g.get(l);
if(k.isVisible()&&!k.disabled&&(k.canActivate||k.isFormField)){this.setActiveItem(k,false);
return k
}}return false
},onMouseOver:function(c){var d=this.findTargetItem(c);
if(d){if(d.canActivate&&!d.disabled){this.setActiveItem(d,true)
}}this.over=true;
this.fireEvent("mouseover",this,c,d)
},onMouseOut:function(c){var d=this.findTargetItem(c);
if(d){if(d==this.activeItem&&d.shouldDeactivate&&d.shouldDeactivate(c)){this.activeItem.deactivate();
delete this.activeItem
}}this.over=false;
this.fireEvent("mouseout",this,c,d)
},onScroll:function(g,e){if(g){g.stopEvent()
}var f=this.ul.dom,h=Ext.fly(e).is(".x-menu-scroller-top");
f.scrollTop+=this.scrollIncrement*(h?-1:1);
if(h?f.scrollTop<=0:f.scrollTop+this.activeMax>=f.scrollHeight){this.onScrollerOut(null,e)
}},onScrollerIn:function(g,e){var f=this.ul.dom,h=Ext.fly(e).is(".x-menu-scroller-top");
if(h?f.scrollTop>0:f.scrollTop+this.activeMax<f.scrollHeight){Ext.fly(e).addClass(["x-menu-item-active","x-menu-scroller-active"])
}},onScrollerOut:function(c,d){Ext.fly(d).removeClass(["x-menu-item-active","x-menu-scroller-active"])
},show:function(d,f,e){if(this.floating){this.parentMenu=e;
if(!this.el){this.render();
this.doLayout(false,true)
}this.showAt(this.el.getAlignToXY(d,f||this.defaultAlign,this.defaultOffsets),e)
}else{Ext.menu.Menu.superclass.show.call(this)
}},showAt:function(c,d){if(this.fireEvent("beforeshow",this)!==false){this.parentMenu=d;
if(!this.el){this.render()
}if(this.enableScrolling){this.el.setXY(c);
c[1]=this.constrainScroll(c[1]);
c=[this.el.adjustForConstraints(c)[0],c[1]]
}else{c=this.el.adjustForConstraints(c)
}this.el.setXY(c);
this.el.show();
Ext.menu.Menu.superclass.onShow.call(this);
if(Ext.isIE){this.fireEvent("autosize",this);
if(!Ext.isIE8){this.el.repaint()
}}this.hidden=false;
this.focus();
this.fireEvent("show",this)
}},constrainScroll:function(k){var i,o=this.ul.setHeight("auto").getHeight(),j=k,l,n,m,p;
if(this.floating){n=Ext.fly(this.el.dom.parentNode);
m=n.getScroll().top;
p=n.getViewSize().height;
l=k-m;
i=this.maxHeight?this.maxHeight:p-l;
if(o>p){i=p;
j=k-l
}else{if(i<o){j=k-(o-i);
i=o
}}}else{i=this.getHeight()
}if(this.maxHeight){i=Math.min(this.maxHeight,i)
}if(o>i&&i>0){this.activeMax=i-this.scrollerHeight*2-this.el.getFrameWidth("tb")-Ext.num(this.el.shadowOffset,0);
this.ul.setHeight(this.activeMax);
this.createScrollers();
this.el.select(".x-menu-scroller").setDisplayed("")
}else{this.ul.setHeight(o);
this.el.select(".x-menu-scroller").setDisplayed("none")
}this.ul.dom.scrollTop=0;
return j
},createScrollers:function(){if(!this.scroller){this.scroller={pos:0,top:this.el.insertFirst({tag:"div",cls:"x-menu-scroller x-menu-scroller-top",html:"&#160;"}),bottom:this.el.createChild({tag:"div",cls:"x-menu-scroller x-menu-scroller-bottom",html:"&#160;"})};
this.scroller.top.hover(this.onScrollerIn,this.onScrollerOut,this);
this.scroller.topRepeater=new Ext.util.ClickRepeater(this.scroller.top,{listeners:{click:this.onScroll.createDelegate(this,[null,this.scroller.top],false)}});
this.scroller.bottom.hover(this.onScrollerIn,this.onScrollerOut,this);
this.scroller.bottomRepeater=new Ext.util.ClickRepeater(this.scroller.bottom,{listeners:{click:this.onScroll.createDelegate(this,[null,this.scroller.bottom],false)}})
}},onLayout:function(){if(this.isVisible()){if(this.enableScrolling){this.constrainScroll(this.el.getTop())
}if(this.floating){this.el.sync()
}}},focus:function(){if(!this.hidden){this.doFocus.defer(50,this)
}},doFocus:function(){if(!this.hidden){this.focusEl.focus()
}},hide:function(b){if(!this.isDestroyed){this.deepHide=b;
Ext.menu.Menu.superclass.hide.call(this);
delete this.deepHide
}},onHide:function(){Ext.menu.Menu.superclass.onHide.call(this);
this.deactivateActive();
if(this.el&&this.floating){this.el.hide()
}var b=this.parentMenu;
if(this.deepHide===true&&b){if(b.floating){b.hide(true)
}else{b.deactivateActive()
}}},lookupComponent:function(b){if(Ext.isString(b)){b=(b=="separator"||b=="-")?new Ext.menu.Separator():new Ext.menu.TextItem(b);
this.applyDefaults(b)
}else{if(Ext.isObject(b)){b=this.getMenuItem(b)
}else{if(b.tagName||b.el){b=new Ext.BoxComponent({el:b})
}}}return b
},applyDefaults:function(c){if(!Ext.isString(c)){c=Ext.menu.Menu.superclass.applyDefaults.call(this,c);
var d=this.internalDefaults;
if(d){if(c.events){Ext.applyIf(c.initialConfig,d);
Ext.apply(c,d)
}else{Ext.applyIf(c,d)
}}}return c
},getMenuItem:function(b){b.ownerCt=this;
if(!b.isXType){if(!b.xtype&&Ext.isBoolean(b.checked)){return new Ext.menu.CheckItem(b)
}return Ext.create(b,this.defaultType)
}return b
},addSeparator:function(){return this.add(new Ext.menu.Separator())
},addElement:function(b){return this.add(new Ext.menu.BaseItem({el:b}))
},addItem:function(b){return this.add(b)
},addMenuItem:function(b){return this.add(this.getMenuItem(b))
},addText:function(b){return this.add(new Ext.menu.TextItem(b))
},onDestroy:function(){Ext.EventManager.removeResizeListener(this.hide,this);
var d=this.parentMenu;
if(d&&d.activeChild==this){delete d.activeChild
}delete this.parentMenu;
Ext.menu.Menu.superclass.onDestroy.call(this);
Ext.menu.MenuMgr.unregister(this);
if(this.keyNav){this.keyNav.disable()
}var c=this.scroller;
if(c){Ext.destroy(c.topRepeater,c.bottomRepeater,c.top,c.bottom)
}Ext.destroy(this.el,this.focusEl,this.ul)
}});
Ext.reg("menu",Ext.menu.Menu);
Ext.menu.MenuNav=Ext.extend(Ext.KeyNav,function(){function d(a,b){if(!b.tryActivate(b.items.indexOf(b.activeItem)-1,-1)){b.tryActivate(b.items.length-1,-1)
}}function c(a,b){if(!b.tryActivate(b.items.indexOf(b.activeItem)+1,1)){b.tryActivate(0,1)
}}return{constructor:function(a){Ext.menu.MenuNav.superclass.constructor.call(this,a.el);
this.scope=this.menu=a
},doRelay:function(a,b){var e=a.getKey();
if(this.menu.activeItem&&this.menu.activeItem.isFormField&&e!=a.TAB){return false
}if(!this.menu.activeItem&&a.isNavKeyPress()&&e!=a.SPACE&&e!=a.RETURN){this.menu.tryActivate(0,1);
return false
}return b.call(this.scope||this,a,this.menu)
},tab:function(a,b){a.stopEvent();
if(a.shiftKey){d(a,b)
}else{c(a,b)
}},up:d,down:c,right:function(a,b){if(b.activeItem){b.activeItem.expandMenu(true)
}},left:function(a,b){b.hide();
if(b.parentMenu&&b.parentMenu.activeItem){b.parentMenu.activeItem.activate()
}},enter:function(a,b){if(b.activeItem){a.stopPropagation();
b.activeItem.onClick(a);
b.fireEvent("click",this,b.activeItem);
return true
}}}
}());
Ext.menu.MenuMgr=function(){var t,v,y,w={},z=false,p=new Date();
function n(){t={};
v=new Ext.util.MixedCollection();
y=Ext.getDoc().addKeyListener(27,r);
y.disable()
}function r(){if(v&&v.length>0){var a=v.clone();
a.each(function(b){b.hide()
});
return true
}return false
}function u(a){v.remove(a);
if(v.length<1){y.disable();
Ext.getDoc().un("mousedown",o);
z=false
}}function q(b){var a=v.last();
p=new Date();
v.add(b);
if(!z){y.enable();
Ext.getDoc().on("mousedown",o);
z=true
}if(b.parentMenu){b.getEl().setZIndex(parseInt(b.parentMenu.getEl().getStyle("z-index"),10)+3);
b.parentMenu.activeChild=b
}else{if(a&&!a.isDestroyed&&a.isVisible()){b.getEl().setZIndex(parseInt(a.getEl().getStyle("z-index"),10)+3)
}}}function x(a){if(a.activeChild){a.activeChild.hide()
}if(a.autoHideTimer){clearTimeout(a.autoHideTimer);
delete a.autoHideTimer
}}function s(b){var a=b.parentMenu;
if(!a&&!b.allowOtherMenus){r()
}else{if(a&&a.activeChild){a.activeChild.hide()
}}}function o(a){if(p.getElapsed()>50&&v.length>0&&!a.getTarget(".x-menu")){r()
}}return{hideAll:function(){return r()
},register:function(a){if(!t){n()
}t[a.id]=a;
a.on({beforehide:x,hide:u,beforeshow:s,show:q})
},get:function(a){if(typeof a=="string"){if(!t){return null
}return t[a]
}else{if(a.events){return a
}else{if(typeof a.length=="number"){return new Ext.menu.Menu({items:a})
}else{return Ext.create(a,"menu")
}}}},unregister:function(a){delete t[a.id];
a.un("beforehide",x);
a.un("hide",u);
a.un("beforeshow",s);
a.un("show",q)
},registerCheckable:function(b){var a=b.group;
if(a){if(!w[a]){w[a]=[]
}w[a].push(b)
}},unregisterCheckable:function(b){var a=b.group;
if(a){w[a].remove(b)
}},onCheckChange:function(d,c){if(d.group&&c){var a=w[d.group],e=0,f=a.length,b;
for(;
e<f;
e++){b=a[e];
if(b!=d){b.setChecked(false)
}}}},getCheckedItem:function(b){var a=w[b];
if(a){for(var c=0,d=a.length;
c<d;
c++){if(a[c].checked){return a[c]
}}}return null
},setCheckedItem:function(c,a){var b=w[c];
if(b){for(var d=0,e=b.length;
d<e;
d++){if(b[d].id==a){b[d].setChecked(true)
}}}return null
}}
}();
Ext.menu.BaseItem=Ext.extend(Ext.Component,{canActivate:false,activeClass:"x-menu-item-active",hideOnClick:true,clickHideDelay:1,ctype:"Ext.menu.BaseItem",actionMode:"container",initComponent:function(){Ext.menu.BaseItem.superclass.initComponent.call(this);
this.addEvents("click","activate","deactivate");
if(this.handler){this.on("click",this.handler,this.scope)
}},onRender:function(c,d){Ext.menu.BaseItem.superclass.onRender.apply(this,arguments);
if(this.ownerCt&&this.ownerCt instanceof Ext.menu.Menu){this.parentMenu=this.ownerCt
}else{this.container.addClass("x-menu-list-item");
this.mon(this.el,{scope:this,click:this.onClick,mouseenter:this.activate,mouseleave:this.deactivate})
}},setHandler:function(c,d){if(this.handler){this.un("click",this.handler,this.scope)
}this.on("click",this.handler=c,this.scope=d)
},onClick:function(b){if(!this.disabled&&this.fireEvent("click",this,b)!==false&&(this.parentMenu&&this.parentMenu.fireEvent("itemclick",this,b)!==false)){this.handleClick(b)
}else{b.stopEvent()
}},activate:function(){if(this.disabled){return false
}var b=this.container;
b.addClass(this.activeClass);
this.region=b.getRegion().adjust(2,2,-2,-2);
this.fireEvent("activate",this);
return true
},deactivate:function(){this.container.removeClass(this.activeClass);
this.fireEvent("deactivate",this)
},shouldDeactivate:function(b){return !this.region||!this.region.contains(b.getPoint())
},handleClick:function(c){var d=this.parentMenu;
if(this.hideOnClick){if(d.floating){this.clickHideDelayTimer=d.hide.defer(this.clickHideDelay,d,[true])
}else{d.deactivateActive()
}}},beforeDestroy:function(){clearTimeout(this.clickHideDelayTimer);
Ext.menu.BaseItem.superclass.beforeDestroy.call(this)
},expandMenu:Ext.emptyFn,hideMenu:Ext.emptyFn});
Ext.reg("menubaseitem",Ext.menu.BaseItem);
Ext.menu.TextItem=Ext.extend(Ext.menu.BaseItem,{hideOnClick:false,itemCls:"x-menu-text",constructor:function(b){if(typeof b=="string"){b={text:b}
}Ext.menu.TextItem.superclass.constructor.call(this,b)
},onRender:function(){var b=document.createElement("span");
b.className=this.itemCls;
b.innerHTML=this.text;
this.el=b;
Ext.menu.TextItem.superclass.onRender.apply(this,arguments)
}});
Ext.reg("menutextitem",Ext.menu.TextItem);
Ext.menu.Separator=Ext.extend(Ext.menu.BaseItem,{itemCls:"x-menu-sep",hideOnClick:false,activeClass:"",onRender:function(d){var c=document.createElement("span");
c.className=this.itemCls;
c.innerHTML="&#160;";
this.el=c;
d.addClass("x-menu-sep-li");
Ext.menu.Separator.superclass.onRender.apply(this,arguments)
}});
Ext.reg("menuseparator",Ext.menu.Separator);
Ext.menu.Item=Ext.extend(Ext.menu.BaseItem,{itemCls:"x-menu-item",canActivate:true,showDelay:200,altText:"",hideDelay:200,ctype:"Ext.menu.Item",initComponent:function(){Ext.menu.Item.superclass.initComponent.call(this);
if(this.menu){if(Ext.isArray(this.menu)){this.menu={items:this.menu}
}if(Ext.isObject(this.menu)){this.menu.ownerCt=this
}this.menu=Ext.menu.MenuMgr.get(this.menu);
this.menu.ownerCt=undefined
}},onRender:function(e,a){if(!this.itemTpl){this.itemTpl=Ext.menu.Item.prototype.itemTpl=new Ext.XTemplate('<a id="{id}" class="{cls}" hidefocus="true" unselectable="on" href="{href}"','<tpl if="hrefTarget">',' target="{hrefTarget}"',"</tpl>",">",'<img alt="{altText}" src="{icon}" class="x-menu-item-icon {iconCls}"/>','<span class="x-menu-item-text">{text}</span>',"</a>")
}var f=this.getTemplateArgs();
this.el=a?this.itemTpl.insertBefore(a,f,true):this.itemTpl.append(e,f,true);
this.iconEl=this.el.child("img.x-menu-item-icon");
this.textEl=this.el.child(".x-menu-item-text");
if(!this.href){this.mon(this.el,"click",Ext.emptyFn,null,{preventDefault:true})
}Ext.menu.Item.superclass.onRender.call(this,e,a)
},getTemplateArgs:function(){return{id:this.id,cls:this.itemCls+(this.menu?" x-menu-item-arrow":"")+(this.cls?" "+this.cls:""),href:this.href||"#",hrefTarget:this.hrefTarget,icon:this.icon||Ext.BLANK_IMAGE_URL,iconCls:this.iconCls||"",text:this.itemText||this.text||"&#160;",altText:this.altText||""}
},setText:function(b){this.text=b||"&#160;";
if(this.rendered){this.textEl.update(this.text);
this.parentMenu.layout.doAutoSize()
}},setIconClass:function(d){var c=this.iconCls;
this.iconCls=d;
if(this.rendered){this.iconEl.replaceClass(c,this.iconCls)
}},beforeDestroy:function(){clearTimeout(this.showTimer);
clearTimeout(this.hideTimer);
if(this.menu){delete this.menu.ownerCt;
this.menu.destroy()
}Ext.menu.Item.superclass.beforeDestroy.call(this)
},handleClick:function(b){if(!this.href){b.stopEvent()
}Ext.menu.Item.superclass.handleClick.apply(this,arguments)
},activate:function(b){if(Ext.menu.Item.superclass.activate.apply(this,arguments)){this.focus();
if(b){this.expandMenu()
}}return true
},shouldDeactivate:function(b){if(Ext.menu.Item.superclass.shouldDeactivate.call(this,b)){if(this.menu&&this.menu.isVisible()){return !this.menu.getEl().getRegion().contains(b.getPoint())
}return true
}return false
},deactivate:function(){Ext.menu.Item.superclass.deactivate.apply(this,arguments);
this.hideMenu()
},expandMenu:function(b){if(!this.disabled&&this.menu){clearTimeout(this.hideTimer);
delete this.hideTimer;
if(!this.menu.isVisible()&&!this.showTimer){this.showTimer=this.deferExpand.defer(this.showDelay,this,[b])
}else{if(this.menu.isVisible()&&b){this.menu.tryActivate(0,1)
}}}},deferExpand:function(b){delete this.showTimer;
this.menu.show(this.container,this.parentMenu.subMenuAlign||"tl-tr?",this.parentMenu);
if(b){this.menu.tryActivate(0,1)
}},hideMenu:function(){clearTimeout(this.showTimer);
delete this.showTimer;
if(!this.hideTimer&&this.menu&&this.menu.isVisible()){this.hideTimer=this.deferHide.defer(this.hideDelay,this)
}},deferHide:function(){delete this.hideTimer;
if(this.menu.over){this.parentMenu.setActiveItem(this,false)
}else{this.menu.hide()
}}});
Ext.reg("menuitem",Ext.menu.Item);
Ext.menu.CheckItem=Ext.extend(Ext.menu.Item,{itemCls:"x-menu-item x-menu-check-item",groupClass:"x-menu-group-item",checked:false,ctype:"Ext.menu.CheckItem",initComponent:function(){Ext.menu.CheckItem.superclass.initComponent.call(this);
this.addEvents("beforecheckchange","checkchange");
if(this.checkHandler){this.on("checkchange",this.checkHandler,this.scope)
}Ext.menu.MenuMgr.registerCheckable(this)
},onRender:function(b){Ext.menu.CheckItem.superclass.onRender.apply(this,arguments);
if(this.group){this.el.addClass(this.groupClass)
}if(this.checked){this.checked=false;
this.setChecked(true,true)
}},destroy:function(){Ext.menu.MenuMgr.unregisterCheckable(this);
Ext.menu.CheckItem.superclass.destroy.apply(this,arguments)
},setChecked:function(d,e){var f=e===true;
if(this.checked!=d&&(f||this.fireEvent("beforecheckchange",this,d)!==false)){Ext.menu.MenuMgr.onCheckChange(this,d);
if(this.container){this.container[d?"addClass":"removeClass"]("x-menu-item-checked")
}this.checked=d;
if(!f){this.fireEvent("checkchange",this,d)
}}},handleClick:function(b){if(!this.disabled&&!(this.checked&&this.group)){this.setChecked(!this.checked)
}Ext.menu.CheckItem.superclass.handleClick.apply(this,arguments)
}});
Ext.reg("menucheckitem",Ext.menu.CheckItem);
Ext.menu.DateMenu=Ext.extend(Ext.menu.Menu,{enableScrolling:false,hideOnClick:true,pickerId:null,cls:"x-date-menu",initComponent:function(){this.on("beforeshow",this.onBeforeShow,this);
if(this.strict=(Ext.isIE7&&Ext.isStrict)){this.on("show",this.onShow,this,{single:true,delay:20})
}Ext.apply(this,{plain:true,showSeparator:false,items:this.picker=new Ext.DatePicker(Ext.applyIf({internalRender:this.strict||!Ext.isIE,ctCls:"x-menu-date-item",id:this.pickerId},this.initialConfig))});
this.picker.purgeListeners();
Ext.menu.DateMenu.superclass.initComponent.call(this);
this.relayEvents(this.picker,["select"]);
this.on("show",this.picker.focus,this.picker);
this.on("select",this.menuHide,this);
if(this.handler){this.on("select",this.handler,this.scope||this)
}},menuHide:function(){if(this.hideOnClick){this.hide(true)
}},onBeforeShow:function(){if(this.picker){this.picker.hideMonthPicker(true)
}},onShow:function(){var b=this.picker.getEl();
b.setWidth(b.getWidth())
}});
Ext.reg("datemenu",Ext.menu.DateMenu);
Ext.menu.ColorMenu=Ext.extend(Ext.menu.Menu,{enableScrolling:false,hideOnClick:true,cls:"x-color-menu",paletteId:null,initComponent:function(){Ext.apply(this,{plain:true,showSeparator:false,items:this.palette=new Ext.ColorPalette(Ext.applyIf({id:this.paletteId},this.initialConfig))});
this.palette.purgeListeners();
Ext.menu.ColorMenu.superclass.initComponent.call(this);
this.relayEvents(this.palette,["select"]);
this.on("select",this.menuHide,this);
if(this.handler){this.on("select",this.handler,this.scope||this)
}},menuHide:function(){if(this.hideOnClick){this.hide(true)
}}});
Ext.reg("colormenu",Ext.menu.ColorMenu);
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.TabPanel=Ext.extend(Ext.Panel,{deferredRender:true,tabWidth:120,minTabWidth:30,resizeTabs:false,enableTabScroll:false,scrollIncrement:0,scrollRepeatInterval:400,scrollDuration:0.35,animScroll:true,tabPosition:"top",baseCls:"x-tab-panel",autoTabs:false,autoTabSelector:"div.x-tab",activeTab:undefined,tabMargin:2,plain:false,wheelIncrement:20,idDelimiter:"__",itemCls:"x-tab-item",elements:"body",headerAsText:false,frame:false,hideBorders:true,initComponent:function(){this.frame=false;
Ext.TabPanel.superclass.initComponent.call(this);
this.addEvents("beforetabchange","tabchange","contextmenu");
this.setLayout(new Ext.layout.CardLayout(Ext.apply({layoutOnCardChange:this.layoutOnTabChange,deferredRender:this.deferredRender},this.layoutConfig)));
if(this.tabPosition=="top"){this.elements+=",header";
this.stripTarget="header"
}else{this.elements+=",footer";
this.stripTarget="footer"
}if(!this.stack){this.stack=Ext.TabPanel.AccessStack()
}this.initItems()
},onRender:function(c,a){Ext.TabPanel.superclass.onRender.call(this,c,a);
if(this.plain){var f=this.tabPosition=="top"?"header":"footer";
this[f].addClass("x-tab-panel-"+f+"-plain")
}var b=this[this.stripTarget];
this.stripWrap=b.createChild({cls:"x-tab-strip-wrap",cn:{tag:"ul",cls:"x-tab-strip x-tab-strip-"+this.tabPosition}});
var e=(this.tabPosition=="bottom"?this.stripWrap:null);
b.createChild({cls:"x-tab-strip-spacer"},e);
this.strip=new Ext.Element(this.stripWrap.dom.firstChild);
this.edge=this.strip.createChild({tag:"li",cls:"x-tab-edge",cn:[{tag:"span",cls:"x-tab-strip-text",cn:"&#160;"}]});
this.strip.createChild({cls:"x-clear"});
this.body.addClass("x-tab-panel-body-"+this.tabPosition);
if(!this.itemTpl){var d=new Ext.Template('<li class="{cls}" id="{id}"><a class="x-tab-strip-close"></a>','<a class="x-tab-right" href="#"><em class="x-tab-left">','<span class="x-tab-strip-inner"><span class="x-tab-strip-text {iconCls}">{text}</span></span>',"</em></a></li>");
d.disableFormats=true;
d.compile();
Ext.TabPanel.prototype.itemTpl=d
}this.items.each(this.initTab,this)
},afterRender:function(){Ext.TabPanel.superclass.afterRender.call(this);
if(this.autoTabs){this.readTabs(false)
}if(this.activeTab!==undefined){var a=Ext.isObject(this.activeTab)?this.activeTab:this.items.get(this.activeTab);
delete this.activeTab;
this.setActiveTab(a)
}},initEvents:function(){Ext.TabPanel.superclass.initEvents.call(this);
this.mon(this.strip,{scope:this,mousedown:this.onStripMouseDown,contextmenu:this.onStripContextMenu});
if(this.enableTabScroll){this.mon(this.strip,"mousewheel",this.onWheel,this)
}},findTargets:function(c){var b=null,a=c.getTarget("li:not(.x-tab-edge)",this.strip);
if(a){b=this.getComponent(a.id.split(this.idDelimiter)[1]);
if(b.disabled){return{close:null,item:null,el:null}
}}return{close:c.getTarget(".x-tab-strip-close",this.strip),item:b,el:a}
},onStripMouseDown:function(b){if(b.button!==0){return
}b.preventDefault();
var a=this.findTargets(b);
if(a.close){if(a.item.fireEvent("beforeclose",a.item)!==false){a.item.fireEvent("close",a.item);
this.remove(a.item)
}return
}if(a.item&&a.item!=this.activeTab){this.setActiveTab(a.item)
}},onStripContextMenu:function(b){b.preventDefault();
var a=this.findTargets(b);
if(a.item){this.fireEvent("contextmenu",this,a.item,b)
}},readTabs:function(d){if(d===true){this.items.each(function(g){this.remove(g)
},this)
}var c=this.el.query(this.autoTabSelector);
for(var b=0,a=c.length;
b<a;
b++){var e=c[b],f=e.getAttribute("title");
e.removeAttribute("title");
this.add({title:f,contentEl:e})
}},initTab:function(d,b){var e=this.strip.dom.childNodes[b],f=this.getTemplateArgs(d),c=e?this.itemTpl.insertBefore(e,f):this.itemTpl.append(this.strip,f),a="x-tab-strip-over",g=Ext.get(c);
g.hover(function(){if(!d.disabled){g.addClass(a)
}},function(){g.removeClass(a)
});
if(d.tabTip){g.child("span.x-tab-strip-text",true).qtip=d.tabTip
}d.tabEl=c;
g.select("a").on("click",function(h){if(!h.getPageX()){this.onStripMouseDown(h)
}},this,{preventDefault:true});
d.on({scope:this,disable:this.onItemDisabled,enable:this.onItemEnabled,titlechange:this.onItemTitleChanged,iconchange:this.onItemIconChanged,beforeshow:this.onBeforeShowItem})
},getTemplateArgs:function(b){var a=b.closable?"x-tab-strip-closable":"";
if(b.disabled){a+=" x-item-disabled"
}if(b.iconCls){a+=" x-tab-with-icon"
}if(b.tabCls){a+=" "+b.tabCls
}return{id:this.id+this.idDelimiter+b.getItemId(),text:b.title,cls:a,iconCls:b.iconCls||""}
},onAdd:function(b){Ext.TabPanel.superclass.onAdd.call(this,b);
if(this.rendered){var a=this.items;
this.initTab(b,a.indexOf(b));
this.delegateUpdates()
}},onBeforeAdd:function(b){var a=b.events?(this.items.containsKey(b.getItemId())?b:null):this.items.get(b);
if(a){this.setActiveTab(b);
return false
}Ext.TabPanel.superclass.onBeforeAdd.apply(this,arguments);
var c=b.elements;
b.elements=c?c.replace(",header",""):c;
b.border=(b.border===true)
},onRemove:function(d){var b=Ext.get(d.tabEl);
if(b){b.select("a").removeAllListeners();
Ext.destroy(b)
}Ext.TabPanel.superclass.onRemove.call(this,d);
this.stack.remove(d);
delete d.tabEl;
d.un("disable",this.onItemDisabled,this);
d.un("enable",this.onItemEnabled,this);
d.un("titlechange",this.onItemTitleChanged,this);
d.un("iconchange",this.onItemIconChanged,this);
d.un("beforeshow",this.onBeforeShowItem,this);
if(d==this.activeTab){var a=this.stack.next();
if(a){this.setActiveTab(a)
}else{if(this.items.getCount()>0){this.setActiveTab(0)
}else{this.setActiveTab(null)
}}}if(!this.destroying){this.delegateUpdates()
}},onBeforeShowItem:function(a){if(a!=this.activeTab){this.setActiveTab(a);
return false
}},onItemDisabled:function(b){var a=this.getTabEl(b);
if(a){Ext.fly(a).addClass("x-item-disabled")
}this.stack.remove(b)
},onItemEnabled:function(b){var a=this.getTabEl(b);
if(a){Ext.fly(a).removeClass("x-item-disabled")
}},onItemTitleChanged:function(b){var a=this.getTabEl(b);
if(a){Ext.fly(a).child("span.x-tab-strip-text",true).innerHTML=b.title
}},onItemIconChanged:function(d,a,c){var b=this.getTabEl(d);
if(b){b=Ext.get(b);
b.child("span.x-tab-strip-text").replaceClass(c,a);
b[Ext.isEmpty(a)?"removeClass":"addClass"]("x-tab-with-icon")
}},getTabEl:function(a){var b=this.getComponent(a);
return b?b.tabEl:null
},onResize:function(){Ext.TabPanel.superclass.onResize.apply(this,arguments);
this.delegateUpdates()
},beginUpdate:function(){this.suspendUpdates=true
},endUpdate:function(){this.suspendUpdates=false;
this.delegateUpdates()
},hideTabStripItem:function(b){b=this.getComponent(b);
var a=this.getTabEl(b);
if(a){a.style.display="none";
this.delegateUpdates()
}this.stack.remove(b)
},unhideTabStripItem:function(b){b=this.getComponent(b);
var a=this.getTabEl(b);
if(a){a.style.display="";
this.delegateUpdates()
}},delegateUpdates:function(){var a=this.rendered;
if(this.suspendUpdates){return
}if(this.resizeTabs&&a){this.autoSizeTabs()
}if(this.enableTabScroll&&a){this.autoScrollTabs()
}},autoSizeTabs:function(){var g=this.items.length,b=this.tabPosition!="bottom"?"header":"footer",c=this[b].dom.offsetWidth,a=this[b].dom.clientWidth;
if(!this.resizeTabs||g<1||!a){return
}var j=Math.max(Math.min(Math.floor((a-4)/g)-this.tabMargin,this.tabWidth),this.minTabWidth);
this.lastTabWidth=j;
var l=this.strip.query("li:not(.x-tab-edge)");
for(var e=0,h=l.length;
e<h;
e++){var k=l[e],m=Ext.fly(k).child(".x-tab-strip-inner",true),f=k.offsetWidth,d=m.offsetWidth;
m.style.width=(j-(f-d))+"px"
}},adjustBodyWidth:function(a){if(this.header){this.header.setWidth(a)
}if(this.footer){this.footer.setWidth(a)
}return a
},setActiveTab:function(c){c=this.getComponent(c);
if(this.fireEvent("beforetabchange",this,c,this.activeTab)===false){return
}if(!this.rendered){this.activeTab=c;
return
}if(this.activeTab!=c){if(this.activeTab){var a=this.getTabEl(this.activeTab);
if(a){Ext.fly(a).removeClass("x-tab-strip-active")
}}this.activeTab=c;
if(c){var b=this.getTabEl(c);
Ext.fly(b).addClass("x-tab-strip-active");
this.stack.add(c);
this.layout.setActiveItem(c);
this.delegateUpdates();
if(this.scrolling){this.scrollToTab(c,this.animScroll)
}}this.fireEvent("tabchange",this,c)
}},getActiveTab:function(){return this.activeTab||null
},getItem:function(a){return this.getComponent(a)
},autoScrollTabs:function(){this.pos=this.tabPosition=="bottom"?this.footer:this.header;
var g=this.items.length,d=this.pos.dom.offsetWidth,c=this.pos.dom.clientWidth,f=this.stripWrap,e=f.dom,b=e.offsetWidth,h=this.getScrollPos(),a=this.edge.getOffsetsTo(this.stripWrap)[0]+h;
if(!this.enableTabScroll||b<20){return
}if(g==0||a<=c){e.scrollLeft=0;
f.setWidth(c);
if(this.scrolling){this.scrolling=false;
this.pos.removeClass("x-tab-scrolling");
this.scrollLeft.hide();
this.scrollRight.hide();
if(Ext.isAir||Ext.isWebKit){e.style.marginLeft="";
e.style.marginRight=""
}}}else{if(!this.scrolling){this.pos.addClass("x-tab-scrolling");
if(Ext.isAir||Ext.isWebKit){e.style.marginLeft="18px";
e.style.marginRight="18px"
}}c-=f.getMargins("lr");
f.setWidth(c>20?c:20);
if(!this.scrolling){if(!this.scrollLeft){this.createScrollers()
}else{this.scrollLeft.show();
this.scrollRight.show()
}}this.scrolling=true;
if(h>(a-c)){e.scrollLeft=a-c
}else{this.scrollToTab(this.activeTab,false)
}this.updateScrollButtons()
}},createScrollers:function(){this.pos.addClass("x-tab-scrolling-"+this.tabPosition);
var c=this.stripWrap.dom.offsetHeight;
var a=this.pos.insertFirst({cls:"x-tab-scroller-left"});
a.setHeight(c);
a.addClassOnOver("x-tab-scroller-left-over");
this.leftRepeater=new Ext.util.ClickRepeater(a,{interval:this.scrollRepeatInterval,handler:this.onScrollLeft,scope:this});
this.scrollLeft=a;
var b=this.pos.insertFirst({cls:"x-tab-scroller-right"});
b.setHeight(c);
b.addClassOnOver("x-tab-scroller-right-over");
this.rightRepeater=new Ext.util.ClickRepeater(b,{interval:this.scrollRepeatInterval,handler:this.onScrollRight,scope:this});
this.scrollRight=b
},getScrollWidth:function(){return this.edge.getOffsetsTo(this.stripWrap)[0]+this.getScrollPos()
},getScrollPos:function(){return parseInt(this.stripWrap.dom.scrollLeft,10)||0
},getScrollArea:function(){return parseInt(this.stripWrap.dom.clientWidth,10)||0
},getScrollAnim:function(){return{duration:this.scrollDuration,callback:this.updateScrollButtons,scope:this}
},getScrollIncrement:function(){return this.scrollIncrement||(this.resizeTabs?this.lastTabWidth+2:100)
},scrollToTab:function(e,a){if(!e){return
}var c=this.getTabEl(e),g=this.getScrollPos(),d=this.getScrollArea(),f=Ext.fly(c).getOffsetsTo(this.stripWrap)[0]+g,b=f+c.offsetWidth;
if(f<g){this.scrollTo(f,a)
}else{if(b>(g+d)){this.scrollTo(b-d,a)
}}},scrollTo:function(b,a){this.stripWrap.scrollTo("left",b,a?this.getScrollAnim():false);
if(!a){this.updateScrollButtons()
}},onWheel:function(f){var g=f.getWheelDelta()*this.wheelIncrement*-1;
f.stopEvent();
var h=this.getScrollPos(),c=h+g,a=this.getScrollWidth()-this.getScrollArea();
var b=Math.max(0,Math.min(a,c));
if(b!=h){this.scrollTo(b,false)
}},onScrollRight:function(){var a=this.getScrollWidth()-this.getScrollArea(),c=this.getScrollPos(),b=Math.min(a,c+this.getScrollIncrement());
if(b!=c){this.scrollTo(b,this.animScroll)
}},onScrollLeft:function(){var b=this.getScrollPos(),a=Math.max(0,b-this.getScrollIncrement());
if(a!=b){this.scrollTo(a,this.animScroll)
}},updateScrollButtons:function(){var a=this.getScrollPos();
this.scrollLeft[a===0?"addClass":"removeClass"]("x-tab-scroller-left-disabled");
this.scrollRight[a>=(this.getScrollWidth()-this.getScrollArea())?"addClass":"removeClass"]("x-tab-scroller-right-disabled")
},beforeDestroy:function(){Ext.destroy(this.leftRepeater,this.rightRepeater);
this.deleteMembers("strip","edge","scrollLeft","scrollRight","stripWrap");
this.activeTab=null;
Ext.TabPanel.superclass.beforeDestroy.apply(this)
}});
Ext.reg("tabpanel",Ext.TabPanel);
Ext.TabPanel.prototype.activate=Ext.TabPanel.prototype.setActiveTab;
Ext.TabPanel.AccessStack=function(){var a=[];
return{add:function(b){a.push(b);
if(a.length>10){a.shift()
}},remove:function(e){var d=[];
for(var c=0,b=a.length;
c<b;
c++){if(a[c]!=e){d.push(a[c])
}}a=d
},next:function(){return a.pop()
}}
};
Ext.Tip=Ext.extend(Ext.Panel,{minWidth:40,maxWidth:300,shadow:"sides",defaultAlign:"tl-bl?",autoRender:true,quickShowInterval:250,frame:true,hidden:true,baseCls:"x-tip",floating:{shadow:true,shim:true,useDisplay:true,constrain:false},autoHeight:true,closeAction:"hide",initComponent:function(){Ext.Tip.superclass.initComponent.call(this);
if(this.closable&&!this.title){this.elements+=",header"
}},afterRender:function(){Ext.Tip.superclass.afterRender.call(this);
if(this.closable){this.addTool({id:"close",handler:this[this.closeAction],scope:this})
}},showAt:function(b){Ext.Tip.superclass.show.call(this);
if(this.measureWidth!==false&&(!this.initialConfig||typeof this.initialConfig.width!="number")){this.doAutoWidth()
}if(this.constrainPosition){b=this.el.adjustForConstraints(b)
}this.setPagePosition(b[0],b[1])
},doAutoWidth:function(d){d=d||0;
var c=this.body.getTextWidth();
if(this.title){c=Math.max(c,this.header.child("span").getTextWidth(this.title))
}c+=this.getFrameWidth()+(this.closable?20:0)+this.body.getPadding("lr")+d;
this.setWidth(c.constrain(this.minWidth,this.maxWidth));
if(Ext.isIE7&&!this.repainted){this.el.repaint();
this.repainted=true
}},showBy:function(d,c){if(!this.rendered){this.render(Ext.getBody())
}this.showAt(this.el.getAlignToXY(d,c||this.defaultAlign))
},initDraggable:function(){this.dd=new Ext.Tip.DD(this,typeof this.draggable=="boolean"?null:this.draggable);
this.header.addClass("x-tip-draggable")
}});
Ext.reg("tip",Ext.Tip);
Ext.Tip.DD=function(c,d){Ext.apply(this,d);
this.tip=c;
Ext.Tip.DD.superclass.constructor.call(this,c.el.id,"WindowDD-"+c.id);
this.setHandleElId(c.header.id);
this.scroll=false
};
Ext.extend(Ext.Tip.DD,Ext.dd.DD,{moveOnly:true,scroll:false,headerOffsets:[100,25],startDrag:function(){this.tip.el.disableShadow()
},endDrag:function(b){this.tip.el.enableShadow(true)
}});
Ext.ToolTip=Ext.extend(Ext.Tip,{showDelay:500,hideDelay:200,dismissDelay:5000,trackMouse:false,anchorToTarget:true,anchorOffset:0,targetCounter:0,constrainPosition:false,initComponent:function(){Ext.ToolTip.superclass.initComponent.call(this);
this.lastActive=new Date();
this.initTarget(this.target);
this.origAnchor=this.anchor
},onRender:function(c,d){Ext.ToolTip.superclass.onRender.call(this,c,d);
this.anchorCls="x-tip-anchor-"+this.getAnchorPosition();
this.anchorEl=this.el.createChild({cls:"x-tip-anchor "+this.anchorCls})
},afterRender:function(){Ext.ToolTip.superclass.afterRender.call(this);
this.anchorEl.setStyle("z-index",this.el.getZIndex()+1).setVisibilityMode(Ext.Element.DISPLAY)
},initTarget:function(f){var e;
if((e=Ext.get(f))){if(this.target){var d=Ext.get(this.target);
this.mun(d,"mouseover",this.onTargetOver,this);
this.mun(d,"mouseout",this.onTargetOut,this);
this.mun(d,"mousemove",this.onMouseMove,this)
}this.mon(e,{mouseover:this.onTargetOver,mouseout:this.onTargetOut,mousemove:this.onMouseMove,scope:this});
this.target=e
}if(this.anchor){this.anchorTarget=this.target
}},onMouseMove:function(c){var d=this.delegate?c.getTarget(this.delegate):this.triggerElement=true;
if(d){this.targetXY=c.getXY();
if(d===this.triggerElement){if(!this.hidden&&this.trackMouse){this.setPagePosition(this.getTargetXY())
}}else{this.hide();
this.lastActive=new Date(0);
this.onTargetOver(c)
}}else{if(!this.closable&&this.isVisible()){this.hide()
}}},getTargetXY:function(){if(this.delegate){this.anchorTarget=this.triggerElement
}if(this.anchor){this.targetCounter++;
var t=this.getOffsets(),l=(this.anchorToTarget&&!this.trackMouse)?this.el.getAlignToXY(this.anchorTarget,this.getAnchorAlign()):this.targetXY,v=Ext.lib.Dom.getViewWidth()-5,p=Ext.lib.Dom.getViewHeight()-5,o=document.documentElement,r=document.body,m=(o.scrollLeft||r.scrollLeft||0)+5,n=(o.scrollTop||r.scrollTop||0)+5,u=[l[0]+t[0],l[1]+t[1]],q=this.getSize();
this.anchorEl.removeClass(this.anchorCls);
if(this.targetCounter<2){if(u[0]<m){if(this.anchorToTarget){this.defaultAlign="l-r";
if(this.mouseOffset){this.mouseOffset[0]*=-1
}}this.anchor="left";
return this.getTargetXY()
}if(u[0]+q.width>v){if(this.anchorToTarget){this.defaultAlign="r-l";
if(this.mouseOffset){this.mouseOffset[0]*=-1
}}this.anchor="right";
return this.getTargetXY()
}if(u[1]<n){if(this.anchorToTarget){this.defaultAlign="t-b";
if(this.mouseOffset){this.mouseOffset[1]*=-1
}}this.anchor="top";
return this.getTargetXY()
}if(u[1]+q.height>p){if(this.anchorToTarget){this.defaultAlign="b-t";
if(this.mouseOffset){this.mouseOffset[1]*=-1
}}this.anchor="bottom";
return this.getTargetXY()
}}this.anchorCls="x-tip-anchor-"+this.getAnchorPosition();
this.anchorEl.addClass(this.anchorCls);
this.targetCounter=0;
return u
}else{var s=this.getMouseOffset();
return[this.targetXY[0]+s[0],this.targetXY[1]+s[1]]
}},getMouseOffset:function(){var b=this.anchor?[0,0]:[15,18];
if(this.mouseOffset){b[0]+=this.mouseOffset[0];
b[1]+=this.mouseOffset[1]
}return b
},getAnchorPosition:function(){if(this.anchor){this.tipAnchor=this.anchor.charAt(0)
}else{var b=this.defaultAlign.match(/^([a-z]+)-([a-z]+)(\?)?$/);
if(!b){throw"AnchorTip.defaultAlign is invalid"
}this.tipAnchor=b[1].charAt(0)
}switch(this.tipAnchor){case"t":return"top";
case"b":return"bottom";
case"r":return"right"
}return"left"
},getAnchorAlign:function(){switch(this.anchor){case"top":return"tl-bl";
case"left":return"tl-tr";
case"right":return"tr-tl";
default:return"bl-tl"
}},getOffsets:function(){var d,e=this.getAnchorPosition().charAt(0);
if(this.anchorToTarget&&!this.trackMouse){switch(e){case"t":d=[0,9];
break;
case"b":d=[0,-13];
break;
case"r":d=[-13,0];
break;
default:d=[9,0];
break
}}else{switch(e){case"t":d=[-15-this.anchorOffset,30];
break;
case"b":d=[-19-this.anchorOffset,-13-this.el.dom.offsetHeight];
break;
case"r":d=[-15-this.el.dom.offsetWidth,-13-this.anchorOffset];
break;
default:d=[25,-13-this.anchorOffset];
break
}}var f=this.getMouseOffset();
d[0]+=f[0];
d[1]+=f[1];
return d
},onTargetOver:function(c){if(this.disabled||c.within(this.target.dom,true)){return
}var d=c.getTarget(this.delegate);
if(d){this.triggerElement=d;
this.clearTimer("hide");
this.targetXY=c.getXY();
this.delayShow()
}},delayShow:function(){if(this.hidden&&!this.showTimer){if(this.lastActive.getElapsed()<this.quickShowInterval){this.show()
}else{this.showTimer=this.show.defer(this.showDelay,this)
}}else{if(!this.hidden&&this.autoHide!==false){this.show()
}}},onTargetOut:function(b){if(this.disabled||b.within(this.target.dom,true)){return
}this.clearTimer("show");
if(this.autoHide!==false){this.delayHide()
}},delayHide:function(){if(!this.hidden&&!this.hideTimer){this.hideTimer=this.hide.defer(this.hideDelay,this)
}},hide:function(){this.clearTimer("dismiss");
this.lastActive=new Date();
if(this.anchorEl){this.anchorEl.hide()
}Ext.ToolTip.superclass.hide.call(this);
delete this.triggerElement
},show:function(){if(this.anchor){this.showAt([-1000,-1000]);
this.origConstrainPosition=this.constrainPosition;
this.constrainPosition=false;
this.anchor=this.origAnchor
}this.showAt(this.getTargetXY());
if(this.anchor){this.anchorEl.show();
this.syncAnchor();
this.constrainPosition=this.origConstrainPosition
}else{this.anchorEl.hide()
}},showAt:function(b){this.lastActive=new Date();
this.clearTimers();
Ext.ToolTip.superclass.showAt.call(this,b);
if(this.dismissDelay&&this.autoHide!==false){this.dismissTimer=this.hide.defer(this.dismissDelay,this)
}if(this.anchor&&!this.anchorEl.isVisible()){this.syncAnchor();
this.anchorEl.show()
}else{this.anchorEl.hide()
}},syncAnchor:function(){var e,d,f;
switch(this.tipAnchor.charAt(0)){case"t":e="b";
d="tl";
f=[20+this.anchorOffset,2];
break;
case"r":e="l";
d="tr";
f=[-2,11+this.anchorOffset];
break;
case"b":e="t";
d="bl";
f=[20+this.anchorOffset,-2];
break;
default:e="r";
d="tl";
f=[2,11+this.anchorOffset];
break
}this.anchorEl.alignTo(this.el,e+"-"+d,f)
},setPagePosition:function(d,c){Ext.ToolTip.superclass.setPagePosition.call(this,d,c);
if(this.anchor){this.syncAnchor()
}},clearTimer:function(b){b=b+"Timer";
clearTimeout(this[b]);
delete this[b]
},clearTimers:function(){this.clearTimer("show");
this.clearTimer("dismiss");
this.clearTimer("hide")
},onShow:function(){Ext.ToolTip.superclass.onShow.call(this);
Ext.getDoc().on("mousedown",this.onDocMouseDown,this)
},onHide:function(){Ext.ToolTip.superclass.onHide.call(this);
Ext.getDoc().un("mousedown",this.onDocMouseDown,this)
},onDocMouseDown:function(b){if(this.autoHide!==true&&!this.closable&&!b.within(this.el.dom)){this.disable();
this.doEnable.defer(100,this)
}},doEnable:function(){if(!this.isDestroyed){this.enable()
}},onDisable:function(){this.clearTimers();
this.hide()
},adjustPosition:function(f,g){if(this.constrainPosition){var h=this.targetXY[1],e=this.getSize().height;
if(g<=h&&(g+e)>=h){g=h-e-5
}}return{x:f,y:g}
},beforeDestroy:function(){this.clearTimers();
Ext.destroy(this.anchorEl);
delete this.anchorEl;
delete this.target;
delete this.anchorTarget;
delete this.triggerElement;
Ext.ToolTip.superclass.beforeDestroy.call(this)
},onDestroy:function(){Ext.getDoc().un("mousedown",this.onDocMouseDown,this);
Ext.ToolTip.superclass.onDestroy.call(this)
}});
Ext.reg("tooltip",Ext.ToolTip);
Ext.QuickTip=Ext.extend(Ext.ToolTip,{interceptTitles:false,tagConfig:{namespace:"ext",attribute:"qtip",width:"qwidth",target:"target",title:"qtitle",hide:"hide",cls:"qclass",align:"qalign",anchor:"anchor"},initComponent:function(){this.target=this.target||Ext.getDoc();
this.targets=this.targets||{};
Ext.QuickTip.superclass.initComponent.call(this)
},register:function(o){var m=Ext.isArray(o)?o:arguments;
for(var n=0,i=m.length;
n<i;
n++){var j=m[n];
var l=j.target;
if(l){if(Ext.isArray(l)){for(var p=0,c=l.length;
p<c;
p++){this.targets[Ext.id(l[p])]=j
}}else{this.targets[Ext.id(l)]=j
}}}},unregister:function(b){delete this.targets[Ext.id(b)]
},cancelShow:function(c){var d=this.activeTarget;
c=Ext.get(c).dom;
if(this.isVisible()){if(d&&d.el==c){this.hide()
}}else{if(d&&d.el==c){this.clearTimer("show")
}}},getTipCfg:function(g){var e=g.getTarget(),h,f;
if(this.interceptTitles&&e.title&&Ext.isString(e.title)){h=e.title;
e.qtip=h;
e.removeAttribute("title");
g.preventDefault()
}else{f=this.tagConfig;
h=e.qtip||Ext.fly(e).getAttribute(f.attribute,f.namespace)
}return h
},onTargetOver:function(j){if(this.disabled){return
}this.targetXY=j.getXY();
var n=j.getTarget();
if(!n||n.nodeType!==1||n==document||n==document.body){return
}if(this.activeTarget&&((n==this.activeTarget.el)||Ext.fly(this.activeTarget.el).contains(n))){this.clearTimer("hide");
this.show();
return
}if(n&&this.targets[n.id]){this.activeTarget=this.targets[n.id];
this.activeTarget.el=n;
this.anchor=this.activeTarget.anchor;
if(this.anchor){this.anchorTarget=n
}this.delayShow();
return
}var l,k=Ext.fly(n),e=this.tagConfig,m=e.namespace;
if(l=this.getTipCfg(j)){var i=k.getAttribute(e.hide,m);
this.activeTarget={el:n,text:l,width:k.getAttribute(e.width,m),autoHide:i!="user"&&i!=="false",title:k.getAttribute(e.title,m),cls:k.getAttribute(e.cls,m),align:k.getAttribute(e.align,m)};
this.anchor=k.getAttribute(e.anchor,m);
if(this.anchor){this.anchorTarget=n
}this.delayShow()
}},onTargetOut:function(b){if(this.activeTarget&&b.within(this.activeTarget.el)&&!this.getTipCfg(b)){return
}this.clearTimer("show");
if(this.autoHide!==false){this.delayHide()
}},showAt:function(c){var d=this.activeTarget;
if(d){if(!this.rendered){this.render(Ext.getBody());
this.activeTarget=d
}if(d.width){this.setWidth(d.width);
this.body.setWidth(this.adjustBodyWidth(d.width-this.getFrameWidth()));
this.measureWidth=false
}else{this.measureWidth=true
}this.setTitle(d.title||"");
this.body.update(d.text);
this.autoHide=d.autoHide;
this.dismissDelay=d.dismissDelay||this.dismissDelay;
if(this.lastCls){this.el.removeClass(this.lastCls);
delete this.lastCls
}if(d.cls){this.el.addClass(d.cls);
this.lastCls=d.cls
}if(this.anchor){this.constrainPosition=false
}else{if(d.align){c=this.el.getAlignToXY(d.el,d.align);
this.constrainPosition=false
}else{this.constrainPosition=true
}}}Ext.QuickTip.superclass.showAt.call(this,c)
},hide:function(){delete this.activeTarget;
Ext.QuickTip.superclass.hide.call(this)
}});
Ext.reg("quicktip",Ext.QuickTip);
Ext.QuickTips=function(){var c,d=false;
return{init:function(a){if(!c){if(!Ext.isReady){Ext.onReady(function(){Ext.QuickTips.init(a)
});
return
}c=new Ext.QuickTip({elements:"header,body",disabled:d});
if(a!==false){c.render(Ext.getBody())
}}},ddDisable:function(){if(c&&!d){c.disable()
}},ddEnable:function(){if(c&&!d){c.enable()
}},enable:function(){if(c){c.enable()
}d=false
},disable:function(){if(c){c.disable()
}d=true
},isEnabled:function(){return c!==undefined&&!c.disabled
},getQuickTip:function(){return c
},register:function(){c.register.apply(c,arguments)
},unregister:function(){c.unregister.apply(c,arguments)
},tips:function(){c.register.apply(c,arguments)
}}
}();
Ext.slider.Tip=Ext.extend(Ext.Tip,{minWidth:10,offsets:[0,-10],init:function(b){b.on({scope:this,dragstart:this.onSlide,drag:this.onSlide,dragend:this.hide,destroy:this.destroy})
},onSlide:function(d,f,e){this.show();
this.body.update(this.getText(e));
this.doAutoWidth();
this.el.alignTo(e.el,"b-t?",this.offsets)
},getText:function(b){return String(b.value)
}});
Ext.ux.SliderTip=Ext.slider.Tip;
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.Toolbar=function(a){if(Ext.isArray(a)){a={items:a,layout:"toolbar"}
}else{a=Ext.apply({layout:"toolbar"},a);
if(a.buttons){a.items=a.buttons
}}Ext.Toolbar.superclass.constructor.call(this,a)
};
(function(){var a=Ext.Toolbar;
Ext.extend(a,Ext.Container,{defaultType:"button",enableOverflow:false,trackMenus:true,internalDefaults:{removeMode:"container",hideParent:true},toolbarCls:"x-toolbar",initComponent:function(){a.superclass.initComponent.call(this);
this.addEvents("overflowchange")
},onRender:function(c,b){if(!this.el){if(!this.autoCreate){this.autoCreate={cls:this.toolbarCls+" x-small-editor"}
}this.el=c.createChild(Ext.apply({id:this.id},this.autoCreate),b);
Ext.Toolbar.superclass.onRender.apply(this,arguments)
}},lookupComponent:function(b){if(Ext.isString(b)){if(b=="-"){b=new a.Separator()
}else{if(b==" "){b=new a.Spacer()
}else{if(b=="->"){b=new a.Fill()
}else{b=new a.TextItem(b)
}}}this.applyDefaults(b)
}else{if(b.isFormField||b.render){b=this.createComponent(b)
}else{if(b.tag){b=new a.Item({autoEl:b})
}else{if(b.tagName){b=new a.Item({el:b})
}else{if(Ext.isObject(b)){b=b.xtype?this.createComponent(b):this.constructButton(b)
}}}}}return b
},applyDefaults:function(e){if(!Ext.isString(e)){e=Ext.Toolbar.superclass.applyDefaults.call(this,e);
var b=this.internalDefaults;
if(e.events){Ext.applyIf(e.initialConfig,b);
Ext.apply(e,b)
}else{Ext.applyIf(e,b)
}}return e
},addSeparator:function(){return this.add(new a.Separator())
},addSpacer:function(){return this.add(new a.Spacer())
},addFill:function(){this.add(new a.Fill())
},addElement:function(b){return this.addItem(new a.Item({el:b}))
},addItem:function(b){return this.add.apply(this,arguments)
},addButton:function(c){if(Ext.isArray(c)){var e=[];
for(var d=0,b=c.length;
d<b;
d++){e.push(this.addButton(c[d]))
}return e
}return this.add(this.constructButton(c))
},addText:function(b){return this.addItem(new a.TextItem(b))
},addDom:function(b){return this.add(new a.Item({autoEl:b}))
},addField:function(b){return this.add(b)
},insertButton:function(c,f){if(Ext.isArray(f)){var e=[];
for(var d=0,b=f.length;
d<b;
d++){e.push(this.insertButton(c+d,f[d]))
}return e
}return Ext.Toolbar.superclass.insert.call(this,c,f)
},trackMenu:function(c,b){if(this.trackMenus&&c.menu){var d=b?"mun":"mon";
this[d](c,"menutriggerover",this.onButtonTriggerOver,this);
this[d](c,"menushow",this.onButtonMenuShow,this);
this[d](c,"menuhide",this.onButtonMenuHide,this)
}},constructButton:function(d){var c=d.events?d:this.createComponent(d,d.split?"splitbutton":this.defaultType);
return c
},onAdd:function(b){Ext.Toolbar.superclass.onAdd.call(this);
this.trackMenu(b);
if(this.disabled){b.disable()
}},onRemove:function(b){Ext.Toolbar.superclass.onRemove.call(this);
if(b==this.activeMenuBtn){delete this.activeMenuBtn
}this.trackMenu(b,true)
},onDisable:function(){this.items.each(function(b){if(b.disable){b.disable()
}})
},onEnable:function(){this.items.each(function(b){if(b.enable){b.enable()
}})
},onButtonTriggerOver:function(b){if(this.activeMenuBtn&&this.activeMenuBtn!=b){this.activeMenuBtn.hideMenu();
b.showMenu();
this.activeMenuBtn=b
}},onButtonMenuShow:function(b){this.activeMenuBtn=b
},onButtonMenuHide:function(b){delete this.activeMenuBtn
}});
Ext.reg("toolbar",Ext.Toolbar);
a.Item=Ext.extend(Ext.BoxComponent,{hideParent:true,enable:Ext.emptyFn,disable:Ext.emptyFn,focus:Ext.emptyFn});
Ext.reg("tbitem",a.Item);
a.Separator=Ext.extend(a.Item,{onRender:function(c,b){this.el=c.createChild({tag:"span",cls:"xtb-sep"},b)
}});
Ext.reg("tbseparator",a.Separator);
a.Spacer=Ext.extend(a.Item,{onRender:function(c,b){this.el=c.createChild({tag:"div",cls:"xtb-spacer",style:this.width?"width:"+this.width+"px":""},b)
}});
Ext.reg("tbspacer",a.Spacer);
a.Fill=Ext.extend(a.Item,{render:Ext.emptyFn,isFill:true});
Ext.reg("tbfill",a.Fill);
a.TextItem=Ext.extend(a.Item,{constructor:function(b){a.TextItem.superclass.constructor.call(this,Ext.isString(b)?{text:b}:b)
},onRender:function(c,b){this.autoEl={cls:"xtb-text",html:this.text||""};
a.TextItem.superclass.onRender.call(this,c,b)
},setText:function(b){if(this.rendered){this.el.update(b)
}else{this.text=b
}}});
Ext.reg("tbtext",a.TextItem);
a.Button=Ext.extend(Ext.Button,{});
a.SplitButton=Ext.extend(Ext.SplitButton,{});
Ext.reg("tbbutton",a.Button);
Ext.reg("tbsplit",a.SplitButton)
})();
Ext.ButtonGroup=Ext.extend(Ext.Panel,{baseCls:"x-btn-group",layout:"table",defaultType:"button",frame:true,internalDefaults:{removeMode:"container",hideParent:true},initComponent:function(){this.layoutConfig=this.layoutConfig||{};
Ext.applyIf(this.layoutConfig,{columns:this.columns});
if(!this.title){this.addClass("x-btn-group-notitle")
}this.on("afterlayout",this.onAfterLayout,this);
Ext.ButtonGroup.superclass.initComponent.call(this)
},applyDefaults:function(b){b=Ext.ButtonGroup.superclass.applyDefaults.call(this,b);
var a=this.internalDefaults;
if(b.events){Ext.applyIf(b.initialConfig,a);
Ext.apply(b,a)
}else{Ext.applyIf(b,a)
}return b
},onAfterLayout:function(){var a=this.body.getFrameWidth("lr")+this.body.dom.firstChild.offsetWidth;
this.body.setWidth(a);
this.el.setWidth(a+this.getFrameWidth())
}});
Ext.reg("buttongroup",Ext.ButtonGroup);
(function(){var a=Ext.Toolbar;
Ext.PagingToolbar=Ext.extend(Ext.Toolbar,{pageSize:20,displayMsg:"Displaying {0} - {1} of {2}",emptyMsg:"No data to display",beforePageText:"Page",afterPageText:"of {0}",firstText:"First Page",prevText:"Previous Page",nextText:"Next Page",lastText:"Last Page",refreshText:"Refresh",initComponent:function(){var c=[this.first=new a.Button({tooltip:this.firstText,overflowText:this.firstText,iconCls:"x-tbar-page-first",disabled:true,handler:this.moveFirst,scope:this}),this.prev=new a.Button({tooltip:this.prevText,overflowText:this.prevText,iconCls:"x-tbar-page-prev",disabled:true,handler:this.movePrevious,scope:this}),"-",this.beforePageText,this.inputItem=new Ext.form.NumberField({cls:"x-tbar-page-number",allowDecimals:false,allowNegative:false,enableKeyEvents:true,selectOnFocus:true,submitValue:false,listeners:{scope:this,keydown:this.onPagingKeyDown,blur:this.onPagingBlur}}),this.afterTextItem=new a.TextItem({text:String.format(this.afterPageText,1)}),"-",this.next=new a.Button({tooltip:this.nextText,overflowText:this.nextText,iconCls:"x-tbar-page-next",disabled:true,handler:this.moveNext,scope:this}),this.last=new a.Button({tooltip:this.lastText,overflowText:this.lastText,iconCls:"x-tbar-page-last",disabled:true,handler:this.moveLast,scope:this}),"-",this.refresh=new a.Button({tooltip:this.refreshText,overflowText:this.refreshText,iconCls:"x-tbar-loading",handler:this.doRefresh,scope:this})];
var b=this.items||this.buttons||[];
if(this.prependButtons){this.items=b.concat(c)
}else{this.items=c.concat(b)
}delete this.buttons;
if(this.displayInfo){this.items.push("->");
this.items.push(this.displayItem=new a.TextItem({}))
}Ext.PagingToolbar.superclass.initComponent.call(this);
this.addEvents("change","beforechange");
this.on("afterlayout",this.onFirstLayout,this,{single:true});
this.cursor=0;
this.bindStore(this.store,true)
},onFirstLayout:function(){if(this.dsLoaded){this.onLoad.apply(this,this.dsLoaded)
}},updateInfo:function(){if(this.displayItem){var b=this.store.getCount();
var c=b==0?this.emptyMsg:String.format(this.displayMsg,this.cursor+1,this.cursor+b,this.store.getTotalCount());
this.displayItem.setText(c)
}},onLoad:function(b,e,i){if(!this.rendered){this.dsLoaded=[b,e,i];
return
}var f=this.getParams();
this.cursor=(i.params&&i.params[f.start])?i.params[f.start]:0;
var h=this.getPageData(),c=h.activePage,g=h.pages;
this.afterTextItem.setText(String.format(this.afterPageText,h.pages));
this.inputItem.setValue(c);
this.first.setDisabled(c==1);
this.prev.setDisabled(c==1);
this.next.setDisabled(c==g);
this.last.setDisabled(c==g);
this.refresh.enable();
this.updateInfo();
this.fireEvent("change",this,h)
},getPageData:function(){var b=this.store.getTotalCount();
return{total:b,activePage:Math.ceil((this.cursor+this.pageSize)/this.pageSize),pages:b<this.pageSize?1:Math.ceil(b/this.pageSize)}
},changePage:function(b){this.doLoad(((b-1)*this.pageSize).constrain(0,this.store.getTotalCount()))
},onLoadError:function(){if(!this.rendered){return
}this.refresh.enable()
},readPage:function(e){var b=this.inputItem.getValue(),c;
if(!b||isNaN(c=parseInt(b,10))){this.inputItem.setValue(e.activePage);
return false
}return c
},onPagingFocus:function(){this.inputItem.select()
},onPagingBlur:function(b){this.inputItem.setValue(this.getPageData().activePage)
},onPagingKeyDown:function(h,g){var c=g.getKey(),i=this.getPageData(),f;
if(c==g.RETURN){g.stopEvent();
f=this.readPage(i);
if(f!==false){f=Math.min(Math.max(1,f),i.pages)-1;
this.doLoad(f*this.pageSize)
}}else{if(c==g.HOME||c==g.END){g.stopEvent();
f=c==g.HOME?1:i.pages;
h.setValue(f)
}else{if(c==g.UP||c==g.PAGEUP||c==g.DOWN||c==g.PAGEDOWN){g.stopEvent();
if((f=this.readPage(i))){var b=g.shiftKey?10:1;
if(c==g.DOWN||c==g.PAGEDOWN){b*=-1
}f+=b;
if(f>=1&f<=i.pages){h.setValue(f)
}}}}}},getParams:function(){return this.paramNames||this.store.paramNames
},beforeLoad:function(){if(this.rendered&&this.refresh){this.refresh.disable()
}},doLoad:function(d){var c={},b=this.getParams();
c[b.start]=d;
c[b.limit]=this.pageSize;
if(this.fireEvent("beforechange",this,c)!==false){this.store.load({params:c})
}},moveFirst:function(){this.doLoad(0)
},movePrevious:function(){this.doLoad(Math.max(0,this.cursor-this.pageSize))
},moveNext:function(){this.doLoad(this.cursor+this.pageSize)
},moveLast:function(){var c=this.store.getTotalCount(),b=c%this.pageSize;
this.doLoad(b?(c-b):c-this.pageSize)
},doRefresh:function(){this.doLoad(this.cursor)
},bindStore:function(c,d){var b;
if(!d&&this.store){if(c!==this.store&&this.store.autoDestroy){this.store.destroy()
}else{this.store.un("beforeload",this.beforeLoad,this);
this.store.un("load",this.onLoad,this);
this.store.un("exception",this.onLoadError,this)
}if(!c){this.store=null
}}if(c){c=Ext.StoreMgr.lookup(c);
c.on({scope:this,beforeload:this.beforeLoad,load:this.onLoad,exception:this.onLoadError});
b=true
}this.store=c;
if(b){this.onLoad(c,null,{})
}},unbind:function(b){this.bindStore(null)
},bind:function(b){this.bindStore(b)
},onDestroy:function(){this.bindStore(null);
Ext.PagingToolbar.superclass.onDestroy.call(this)
}})
})();
Ext.reg("paging",Ext.PagingToolbar);
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.ux.Portal=Ext.extend(Ext.Panel,{layout:"column",autoScroll:true,cls:"x-portal",defaultType:"portalcolumn",initComponent:function(){Ext.ux.Portal.superclass.initComponent.call(this);
this.addEvents({validatedrop:true,beforedragover:true,dragover:true,beforedrop:true,drop:true})
},initEvents:function(){Ext.ux.Portal.superclass.initEvents.call(this);
this.dd=new Ext.ux.Portal.DropZone(this,this.dropConfig)
},beforeDestroy:function(){if(this.dd){this.dd.unreg()
}Ext.ux.Portal.superclass.beforeDestroy.call(this)
}});
Ext.reg("portal",Ext.ux.Portal);
Ext.ux.Portal.DropZone=Ext.extend(Ext.dd.DropTarget,{constructor:function(a,b){this.portal=a;
Ext.dd.ScrollManager.register(a.body);
Ext.ux.Portal.DropZone.superclass.constructor.call(this,a.bwrap.dom,b);
a.body.ddScrollConfig=this.ddScrollConfig
},ddScrollConfig:{vthresh:50,hthresh:-1,animate:true,increment:200},createEvent:function(a,f,d,b,h,g){return{portal:this.portal,panel:d.panel,columnIndex:b,column:h,position:g,data:d,source:a,rawEvent:f,status:this.dropAllowed}
},notifyOver:function(v,t,w){var f=t.getXY(),a=this.portal,n=v.proxy;
if(!this.grid){this.grid=this.getGrid()
}var b=a.body.dom.clientWidth;
if(!this.lastCW){this.lastCW=b
}else{if(this.lastCW!=b){this.lastCW=b;
a.doLayout();
this.grid=this.getGrid()
}}var d=0,l=this.grid.columnX,m=false;
for(var s=l.length;
d<s;
d++){if(f[0]<(l[d].x+l[d].w)){m=true;
break
}}if(!m){d--
}var q,k=false,i=0,u=a.items.itemAt(d),o=u.items.items,j=false;
for(var s=o.length;
i<s;
i++){q=o[i];
var r=q.el.getHeight();
if(r===0){j=true
}else{if((q.el.getY()+(r/2))>f[1]){k=true;
break
}}}i=(k&&q?i:u.items.getCount())+(j?-1:0);
var g=this.createEvent(v,t,w,d,u,i);
if(a.fireEvent("validatedrop",g)!==false&&a.fireEvent("beforedragover",g)!==false){n.getProxy().setWidth("auto");
if(q){n.moveProxy(q.el.dom.parentNode,k?q.el.dom:null)
}else{n.moveProxy(u.el.dom,null)
}this.lastPos={c:u,col:d,p:j||(k&&q)?i:false};
this.scrollPos=a.body.getScroll();
a.fireEvent("dragover",g);
return g.status
}else{return g.status
}},notifyOut:function(){delete this.grid
},notifyDrop:function(l,h,g){delete this.grid;
if(!this.lastPos){return
}var j=this.lastPos.c,f=this.lastPos.col,k=this.lastPos.p,a=l.panel,b=this.createEvent(l,h,g,f,j,k!==false?k:j.items.getCount());
if(this.portal.fireEvent("validatedrop",b)!==false&&this.portal.fireEvent("beforedrop",b)!==false){l.proxy.getProxy().remove();
a.el.dom.parentNode.removeChild(l.panel.el.dom);
if(k!==false){j.insert(k,a)
}else{j.add(a)
}j.doLayout();
this.portal.fireEvent("drop",b);
var m=this.scrollPos.top;
if(m){var i=this.portal.body.dom;
setTimeout(function(){i.scrollTop=m
},10)
}}delete this.lastPos
},getGrid:function(){var a=this.portal.bwrap.getBox();
a.columnX=[];
this.portal.items.each(function(b){a.columnX.push({x:b.el.getX(),w:b.el.getWidth()})
});
return a
},unreg:function(){Ext.dd.ScrollManager.unregister(this.portal.body);
Ext.ux.Portal.DropZone.superclass.unreg.call(this)
}});
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.ux.PortalColumn=Ext.extend(Ext.Container,{layout:"anchor",defaultType:"portlet",cls:"x-portal-column"});
Ext.reg("portalcolumn",Ext.ux.PortalColumn);
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.ux.Portlet=Ext.extend(Ext.Panel,{anchor:"100%",frame:true,collapsible:true,draggable:true,cls:"x-portlet"});
Ext.reg("portlet",Ext.ux.Portlet);
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.ns("Ext.ux.grid");
Ext.ux.grid.TableGrid=function(p,f){f=f||{};
Ext.apply(this,f);
var c=f.fields||[],a=f.columns||[];
p=Ext.get(p);
var k=p.insertSibling();
var l=[],m=[];
var e=p.query("thead th");
for(var g=0,j;
j=e[g];
g++){var o=j.innerHTML;
var b="tcol-"+g;
l.push(Ext.applyIf(c[g]||{},{name:b,mapping:"td:nth("+(g+1)+")/@innerHTML"}));
m.push(Ext.applyIf(a[g]||{},{header:o,dataIndex:b,width:j.offsetWidth,tooltip:j.title,sortable:true}))
}var d=new Ext.data.Store({reader:new Ext.data.XmlReader({record:"tbody tr"},l)});
d.loadData(p.dom);
var n=new Ext.grid.ColumnModel(m);
if(f.width||f.height){k.setSize(f.width||"auto",f.height||"auto")
}else{k.setWidth(p.getWidth())
}if(f.remove!==false){p.remove()
}Ext.applyIf(this,{ds:d,cm:n,sm:new Ext.grid.RowSelectionModel(),autoHeight:true,autoWidth:false});
Ext.ux.grid.TableGrid.superclass.constructor.call(this,k,{})
};
Ext.extend(Ext.ux.grid.TableGrid,Ext.grid.GridPanel);
Ext.grid.TableGrid=Ext.ux.grid.TableGrid;
/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.Window=Ext.extend(Ext.Panel,{baseCls:"x-window",resizable:true,draggable:true,closable:true,closeAction:"close",constrain:false,constrainHeader:false,plain:false,minimizable:false,maximizable:false,minHeight:100,minWidth:200,expandOnShow:true,showAnimDuration:0.25,hideAnimDuration:0.25,collapsible:false,initHidden:undefined,hidden:true,elements:"header,body",frame:true,floating:true,initComponent:function(){this.initTools();
Ext.Window.superclass.initComponent.call(this);
this.addEvents("resize","maximize","minimize","restore");
if(Ext.isDefined(this.initHidden)){this.hidden=this.initHidden
}if(this.hidden===false){this.hidden=true;
this.show()
}},getState:function(){return Ext.apply(Ext.Window.superclass.getState.call(this)||{},this.getBox(true))
},onRender:function(b,a){Ext.Window.superclass.onRender.call(this,b,a);
if(this.plain){this.el.addClass("x-window-plain")
}this.focusEl=this.el.createChild({tag:"a",href:"#",cls:"x-dlg-focus",tabIndex:"-1",html:"&#160;"});
this.focusEl.swallowEvent("click",true);
this.proxy=this.el.createProxy("x-window-proxy");
this.proxy.enableDisplayMode("block");
if(this.modal){this.mask=this.container.createChild({cls:"ext-el-mask"},this.el.dom);
this.mask.enableDisplayMode("block");
this.mask.hide();
this.mon(this.mask,"click",this.focus,this)
}if(this.maximizable){this.mon(this.header,"dblclick",this.toggleMaximize,this)
}},initEvents:function(){Ext.Window.superclass.initEvents.call(this);
if(this.animateTarget){this.setAnimateTarget(this.animateTarget)
}if(this.resizable){this.resizer=new Ext.Resizable(this.el,{minWidth:this.minWidth,minHeight:this.minHeight,handles:this.resizeHandles||"all",pinned:true,resizeElement:this.resizerAction,handleCls:"x-window-handle"});
this.resizer.window=this;
this.mon(this.resizer,"beforeresize",this.beforeResize,this)
}if(this.draggable){this.header.addClass("x-window-draggable")
}this.mon(this.el,"mousedown",this.toFront,this);
this.manager=this.manager||Ext.WindowMgr;
this.manager.register(this);
if(this.maximized){this.maximized=false;
this.maximize()
}if(this.closable){var a=this.getKeyMap();
a.on(27,this.onEsc,this);
a.disable()
}},initDraggable:function(){this.dd=new Ext.Window.DD(this)
},onEsc:function(a,b){if(this.activeGhost){this.unghost()
}b.stopEvent();
this[this.closeAction]()
},beforeDestroy:function(){if(this.rendered){this.hide();
this.clearAnchor();
Ext.destroy(this.focusEl,this.resizer,this.dd,this.proxy,this.mask)
}Ext.Window.superclass.beforeDestroy.call(this)
},onDestroy:function(){if(this.manager){this.manager.unregister(this)
}Ext.Window.superclass.onDestroy.call(this)
},initTools:function(){if(this.minimizable){this.addTool({id:"minimize",handler:this.minimize.createDelegate(this,[])})
}if(this.maximizable){this.addTool({id:"maximize",handler:this.maximize.createDelegate(this,[])});
this.addTool({id:"restore",handler:this.restore.createDelegate(this,[]),hidden:true})
}if(this.closable){this.addTool({id:"close",handler:this[this.closeAction].createDelegate(this,[])})
}},resizerAction:function(){var a=this.proxy.getBox();
this.proxy.hide();
this.window.handleResize(a);
return a
},beforeResize:function(){this.resizer.minHeight=Math.max(this.minHeight,this.getFrameHeight()+40);
this.resizer.minWidth=Math.max(this.minWidth,this.getFrameWidth()+40);
this.resizeBox=this.el.getBox()
},updateHandles:function(){if(Ext.isIE&&this.resizer){this.resizer.syncHandleHeight();
this.el.repaint()
}},handleResize:function(b){var a=this.resizeBox;
if(a.x!=b.x||a.y!=b.y){this.updateBox(b)
}else{this.setSize(b);
if(Ext.isIE6&&Ext.isStrict){this.doLayout()
}}this.focus();
this.updateHandles();
this.saveState()
},focus:function(){var e=this.focusEl,a=this.defaultButton,c=typeof a,d,b;
if(Ext.isDefined(a)){if(Ext.isNumber(a)&&this.fbar){e=this.fbar.items.get(a)
}else{if(Ext.isString(a)){e=Ext.getCmp(a)
}else{e=a
}}d=e.getEl();
b=Ext.getDom(this.container);
if(d&&b){if(b!=document.body&&!Ext.lib.Region.getRegion(b).contains(Ext.lib.Region.getRegion(d.dom))){return
}}}e=e||this.focusEl;
e.focus.defer(10,e)
},setAnimateTarget:function(a){a=Ext.get(a);
this.animateTarget=a
},beforeShow:function(){delete this.el.lastXY;
delete this.el.lastLT;
if(this.x===undefined||this.y===undefined){var a=this.el.getAlignToXY(this.container,"c-c");
var b=this.el.translatePoints(a[0],a[1]);
this.x=this.x===undefined?b.left:this.x;
this.y=this.y===undefined?b.top:this.y
}this.el.setLeftTop(this.x,this.y);
if(this.expandOnShow){this.expand(false)
}if(this.modal){Ext.getBody().addClass("x-body-masked");
this.mask.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));
this.mask.show()
}},show:function(c,a,b){if(!this.rendered){this.render(Ext.getBody())
}if(this.hidden===false){this.toFront();
return this
}if(this.fireEvent("beforeshow",this)===false){return this
}if(a){this.on("show",a,b,{single:true})
}this.hidden=false;
if(Ext.isDefined(c)){this.setAnimateTarget(c)
}this.beforeShow();
if(this.animateTarget){this.animShow()
}else{this.afterShow()
}return this
},afterShow:function(b){if(this.isDestroyed){return false
}this.proxy.hide();
this.el.setStyle("display","block");
this.el.show();
if(this.maximized){this.fitContainer()
}if(Ext.isMac&&Ext.isGecko2){this.cascade(this.setAutoScroll)
}if(this.monitorResize||this.modal||this.constrain||this.constrainHeader){Ext.EventManager.onWindowResize(this.onWindowResize,this)
}this.doConstrain();
this.doLayout();
if(this.keyMap){this.keyMap.enable()
}this.toFront();
this.updateHandles();
if(b&&(Ext.isIE||Ext.isWebKit)){var a=this.getSize();
this.onResize(a.width,a.height)
}this.onShow();
this.fireEvent("show",this)
},animShow:function(){this.proxy.show();
this.proxy.setBox(this.animateTarget.getBox());
this.proxy.setOpacity(0);
var a=this.getBox();
this.el.setStyle("display","none");
this.proxy.shift(Ext.apply(a,{callback:this.afterShow.createDelegate(this,[true],false),scope:this,easing:"easeNone",duration:this.showAnimDuration,opacity:0.5}))
},hide:function(c,a,b){if(this.hidden||this.fireEvent("beforehide",this)===false){return this
}if(a){this.on("hide",a,b,{single:true})
}this.hidden=true;
if(c!==undefined){this.setAnimateTarget(c)
}if(this.modal){this.mask.hide();
Ext.getBody().removeClass("x-body-masked")
}if(this.animateTarget){this.animHide()
}else{this.el.hide();
this.afterHide()
}return this
},afterHide:function(){this.proxy.hide();
if(this.monitorResize||this.modal||this.constrain||this.constrainHeader){Ext.EventManager.removeResizeListener(this.onWindowResize,this)
}if(this.keyMap){this.keyMap.disable()
}this.onHide();
this.fireEvent("hide",this)
},animHide:function(){this.proxy.setOpacity(0.5);
this.proxy.show();
var a=this.getBox(false);
this.proxy.setBox(a);
this.el.hide();
this.proxy.shift(Ext.apply(this.animateTarget.getBox(),{callback:this.afterHide,scope:this,duration:this.hideAnimDuration,easing:"easeNone",opacity:0}))
},onShow:Ext.emptyFn,onHide:Ext.emptyFn,onWindowResize:function(){if(this.maximized){this.fitContainer()
}if(this.modal){this.mask.setSize("100%","100%");
var a=this.mask.dom.offsetHeight;
this.mask.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true))
}this.doConstrain()
},doConstrain:function(){if(this.constrain||this.constrainHeader){var b;
if(this.constrain){b={right:this.el.shadowOffset,left:this.el.shadowOffset,bottom:this.el.shadowOffset}
}else{var a=this.getSize();
b={right:-(a.width-100),bottom:-(a.height-25+this.el.getConstrainOffset())}
}var c=this.el.getConstrainToXY(this.container,true,b);
if(c){this.setPosition(c[0],c[1])
}}},ghost:function(a){var c=this.createGhost(a);
var b=this.getBox(true);
c.setLeftTop(b.x,b.y);
c.setWidth(b.width);
this.el.hide();
this.activeGhost=c;
return c
},unghost:function(b,a){if(!this.activeGhost){return
}if(b!==false){this.el.show();
this.focus.defer(10,this);
if(Ext.isMac&&Ext.isGecko2){this.cascade(this.setAutoScroll)
}}if(a!==false){this.setPosition(this.activeGhost.getLeft(true),this.activeGhost.getTop(true))
}this.activeGhost.hide();
this.activeGhost.remove();
delete this.activeGhost
},minimize:function(){this.fireEvent("minimize",this);
return this
},close:function(){if(this.fireEvent("beforeclose",this)!==false){if(this.hidden){this.doClose()
}else{this.hide(null,this.doClose,this)
}}},doClose:function(){this.fireEvent("close",this);
this.destroy()
},maximize:function(){if(!this.maximized){this.expand(false);
this.restoreSize=this.getSize();
this.restorePos=this.getPosition(true);
if(this.maximizable){this.tools.maximize.hide();
this.tools.restore.show()
}this.maximized=true;
this.el.disableShadow();
if(this.dd){this.dd.lock()
}if(this.collapsible){this.tools.toggle.hide()
}this.el.addClass("x-window-maximized");
this.container.addClass("x-window-maximized-ct");
this.setPosition(0,0);
this.fitContainer();
this.fireEvent("maximize",this)
}return this
},restore:function(){if(this.maximized){var a=this.tools;
this.el.removeClass("x-window-maximized");
if(a.restore){a.restore.hide()
}if(a.maximize){a.maximize.show()
}this.setPosition(this.restorePos[0],this.restorePos[1]);
this.setSize(this.restoreSize.width,this.restoreSize.height);
delete this.restorePos;
delete this.restoreSize;
this.maximized=false;
this.el.enableShadow(true);
if(this.dd){this.dd.unlock()
}if(this.collapsible&&a.toggle){a.toggle.show()
}this.container.removeClass("x-window-maximized-ct");
this.doConstrain();
this.fireEvent("restore",this)
}return this
},toggleMaximize:function(){return this[this.maximized?"restore":"maximize"]()
},fitContainer:function(){var a=this.container.getViewSize(false);
this.setSize(a.width,a.height)
},setZIndex:function(a){if(this.modal){this.mask.setStyle("z-index",a)
}this.el.setZIndex(++a);
a+=5;
if(this.resizer){this.resizer.proxy.setStyle("z-index",++a)
}this.lastZIndex=a
},alignTo:function(b,a,c){var d=this.el.getAlignToXY(b,a,c);
this.setPagePosition(d[0],d[1]);
return this
},anchorTo:function(c,e,d,b){this.clearAnchor();
this.anchorTarget={el:c,alignment:e,offsets:d};
Ext.EventManager.onWindowResize(this.doAnchor,this);
var a=typeof b;
if(a!="undefined"){Ext.EventManager.on(window,"scroll",this.doAnchor,this,{buffer:a=="number"?b:50})
}return this.doAnchor()
},doAnchor:function(){var a=this.anchorTarget;
this.alignTo(a.el,a.alignment,a.offsets);
return this
},clearAnchor:function(){if(this.anchorTarget){Ext.EventManager.removeResizeListener(this.doAnchor,this);
Ext.EventManager.un(window,"scroll",this.doAnchor,this);
delete this.anchorTarget
}return this
},toFront:function(a){if(this.manager.bringToFront(this)){if(!a||!a.getTarget().focus){this.focus()
}}return this
},setActive:function(a){if(a){if(!this.maximized){this.el.enableShadow(true)
}this.fireEvent("activate",this)
}else{this.el.disableShadow();
this.fireEvent("deactivate",this)
}},toBack:function(){this.manager.sendToBack(this);
return this
},center:function(){var a=this.el.getAlignToXY(this.container,"c-c");
this.setPagePosition(a[0],a[1]);
return this
}});
Ext.reg("window",Ext.Window);
Ext.Window.DD=Ext.extend(Ext.dd.DD,{constructor:function(a){this.win=a;
Ext.Window.DD.superclass.constructor.call(this,a.el.id,"WindowDD-"+a.id);
this.setHandleElId(a.header.id);
this.scroll=false
},moveOnly:true,headerOffsets:[100,25],startDrag:function(){var a=this.win;
this.proxy=a.ghost(a.initialConfig.cls);
if(a.constrain!==false){var c=a.el.shadowOffset;
this.constrainTo(a.container,{right:c,left:c,bottom:c})
}else{if(a.constrainHeader!==false){var b=this.proxy.getSize();
this.constrainTo(a.container,{right:-(b.width-this.headerOffsets[0]),bottom:-(b.height-this.headerOffsets[1])})
}}},b4Drag:Ext.emptyFn,onDrag:function(a){this.alignElWithMouse(this.proxy,a.getPageX(),a.getPageY())
},endDrag:function(a){this.win.unghost();
this.win.saveState()
}});
Ext.WindowGroup=function(){var f={};
var d=[];
var e=null;
var c=function(i,h){return(!i._lastAccess||i._lastAccess<h._lastAccess)?-1:1
};
var g=function(){var k=d,h=k.length;
if(h>0){k.sort(c);
var j=k[0].manager.zseed;
for(var l=0;
l<h;
l++){var m=k[l];
if(m&&!m.hidden){m.setZIndex(j+(l*10))
}}}a()
};
var b=function(h){if(h!=e){if(e){e.setActive(false)
}e=h;
if(h){h.setActive(true)
}}};
var a=function(){for(var h=d.length-1;
h>=0;
--h){if(!d[h].hidden){b(d[h]);
return
}}b(null)
};
return{zseed:9000,register:function(h){if(h.manager){h.manager.unregister(h)
}h.manager=this;
f[h.id]=h;
d.push(h);
h.on("hide",a)
},unregister:function(h){delete h.manager;
delete f[h.id];
h.un("hide",a);
d.remove(h)
},get:function(h){return typeof h=="object"?h:f[h]
},bringToFront:function(h){h=this.get(h);
if(h!=e){h._lastAccess=new Date().getTime();
g();
return true
}return false
},sendToBack:function(h){h=this.get(h);
h._lastAccess=-(new Date().getTime());
g();
return h
},hideAll:function(){for(var h in f){if(f[h]&&typeof f[h]!="function"&&f[h].isVisible()){f[h].hide()
}}},getActive:function(){return e
},getBy:function(k,j){var l=[];
for(var h=d.length-1;
h>=0;
--h){var m=d[h];
if(k.call(j||m,m)!==false){l.push(m)
}}return l
},each:function(i,h){for(var j in f){if(f[j]&&typeof f[j]!="function"){if(i.call(h||f[j],f[j])===false){return
}}}}}
};
Ext.WindowMgr=new Ext.WindowGroup();
Ext.MessageBox=function(){var t,b,p,s,g,k,r,a,m,o,i,f,q,u,n,h="",d="",l=["ok","yes","no","cancel"];
var c=function(w){q[w].blur();
if(t.isVisible()){t.hide();
v();
Ext.callback(b.fn,b.scope||window,[w,u.dom.value,b],1)
}};
var v=function(){if(b&&b.cls){t.el.removeClass(b.cls)
}m.reset()
};
var e=function(y,w,x){if(b&&b.closable!==false){t.hide();
v()
}if(x){x.stopEvent()
}};
var j=function(w){var y=0,x;
if(!w){Ext.each(l,function(z){q[z].hide()
});
return y
}t.footer.dom.style.display="";
Ext.iterate(q,function(z,A){x=w[z];
if(x){A.show();
A.setText(Ext.isString(x)?x:Ext.MessageBox.buttonText[z]);
y+=A.getEl().getWidth()+15
}else{A.hide()
}});
return y
};
return{getDialog:function(w){if(!t){var y=[];
q={};
Ext.each(l,function(z){y.push(q[z]=new Ext.Button({text:this.buttonText[z],handler:c.createCallback(z),hideMode:"offsets"}))
},this);
t=new Ext.Window({autoCreate:true,title:w,resizable:false,constrain:true,constrainHeader:true,minimizable:false,maximizable:false,stateful:false,modal:true,shim:true,buttonAlign:"center",width:400,height:100,minHeight:80,plain:true,footer:true,closable:true,close:function(){if(b&&b.buttons&&b.buttons.no&&!b.buttons.cancel){c("no")
}else{c("cancel")
}},fbar:new Ext.Toolbar({items:y,enableOverflow:false})});
t.render(document.body);
t.getEl().addClass("x-window-dlg");
p=t.mask;
g=t.body.createChild({html:'<div class="ext-mb-icon"></div><div class="ext-mb-content"><span class="ext-mb-text"></span><br /><div class="ext-mb-fix-cursor"><input type="text" class="ext-mb-input" /><textarea class="ext-mb-textarea"></textarea></div></div>'});
i=Ext.get(g.dom.firstChild);
var x=g.dom.childNodes[1];
k=Ext.get(x.firstChild);
r=Ext.get(x.childNodes[2].firstChild);
r.enableDisplayMode();
r.addKeyListener([10,13],function(){if(t.isVisible()&&b&&b.buttons){if(b.buttons.ok){c("ok")
}else{if(b.buttons.yes){c("yes")
}}}});
a=Ext.get(x.childNodes[2].childNodes[1]);
a.enableDisplayMode();
m=new Ext.ProgressBar({renderTo:g});
g.createChild({cls:"x-clear"})
}return t
},updateText:function(A){if(!t.isVisible()&&!b.width){t.setSize(this.maxWidth,100)
}k.update(A?A+" ":"&#160;");
var y=d!=""?(i.getWidth()+i.getMargins("lr")):0,C=k.getWidth()+k.getMargins("lr"),z=t.getFrameWidth("lr"),B=t.body.getFrameWidth("lr"),x;
x=Math.max(Math.min(b.width||y+C+z+B,b.maxWidth||this.maxWidth),Math.max(b.minWidth||this.minWidth,n||0));
if(b.prompt===true){u.setWidth(x-y-z-B)
}if(b.progress===true||b.wait===true){m.setSize(x-y-z-B)
}if(Ext.isIE&&x==n){x+=4
}k.update(A||"&#160;");
t.setSize(x,"auto").center();
return this
},updateProgress:function(x,w,y){m.updateProgress(x,w);
if(y){this.updateText(y)
}return this
},isVisible:function(){return t&&t.isVisible()
},hide:function(){var w=t?t.activeGhost:null;
if(this.isVisible()||w){t.hide();
v();
if(w){t.unghost(false,false)
}}return this
},show:function(z){if(this.isVisible()){this.hide()
}b=z;
var A=this.getDialog(b.title||"&#160;");
A.setTitle(b.title||"&#160;");
var w=(b.closable!==false&&b.progress!==true&&b.wait!==true);
A.tools.close.setDisplayed(w);
u=r;
b.prompt=b.prompt||(b.multiline?true:false);
if(b.prompt){if(b.multiline){r.hide();
a.show();
a.setHeight(Ext.isNumber(b.multiline)?b.multiline:this.defaultTextHeight);
u=a
}else{r.show();
a.hide()
}}else{r.hide();
a.hide()
}u.dom.value=b.value||"";
if(b.prompt){A.focusEl=u
}else{var y=b.buttons;
var x=null;
if(y&&y.ok){x=q.ok
}else{if(y&&y.yes){x=q.yes
}}if(x){A.focusEl=x
}}if(Ext.isDefined(b.iconCls)){A.setIconClass(b.iconCls)
}this.setIcon(Ext.isDefined(b.icon)?b.icon:h);
n=j(b.buttons);
m.setVisible(b.progress===true||b.wait===true);
this.updateProgress(0,b.progressText);
this.updateText(b.msg);
if(b.cls){A.el.addClass(b.cls)
}A.proxyDrag=b.proxyDrag===true;
A.modal=b.modal!==false;
A.mask=b.modal!==false?p:false;
if(!A.isVisible()){document.body.appendChild(t.el.dom);
A.setAnimateTarget(b.animEl);
A.on("show",function(){if(w===true){A.keyMap.enable()
}else{A.keyMap.disable()
}},this,{single:true});
A.show(b.animEl)
}if(b.wait===true){m.wait(b.waitConfig)
}return this
},setIcon:function(w){if(!t){h=w;
return
}h=undefined;
if(w&&w!=""){i.removeClass("x-hidden");
i.replaceClass(d,w);
g.addClass("x-dlg-icon");
d=w
}else{i.replaceClass(d,"x-hidden");
g.removeClass("x-dlg-icon");
d=""
}return this
},progress:function(y,x,w){this.show({title:y,msg:x,buttons:false,progress:true,closable:false,minWidth:this.minProgressWidth,progressText:w});
return this
},wait:function(y,x,w){this.show({title:x,msg:y,buttons:false,closable:false,wait:true,modal:true,minWidth:this.minProgressWidth,waitConfig:w});
return this
},alert:function(z,y,x,w){this.show({title:z,msg:y,buttons:this.OK,fn:x,scope:w,minWidth:this.minWidth});
return this
},confirm:function(z,y,x,w){this.show({title:z,msg:y,buttons:this.YESNO,fn:x,scope:w,icon:this.QUESTION,minWidth:this.minWidth});
return this
},prompt:function(B,A,y,x,w,z){this.show({title:B,msg:A,buttons:this.OKCANCEL,fn:y,minWidth:this.minPromptWidth,scope:x,prompt:true,multiline:w,value:z});
return this
},OK:{ok:true},CANCEL:{cancel:true},OKCANCEL:{ok:true,cancel:true},YESNO:{yes:true,no:true},YESNOCANCEL:{yes:true,no:true,cancel:true},INFO:"ext-mb-info",WARNING:"ext-mb-warning",QUESTION:"ext-mb-question",ERROR:"ext-mb-error",defaultTextHeight:75,maxWidth:600,minWidth:100,minProgressWidth:250,minPromptWidth:250,buttonText:{ok:"OK",cancel:"Cancel",yes:"Yes",no:"No"}}
}();
Ext.Msg=Ext.MessageBox;
Ext.dd.PanelProxy=Ext.extend(Object,{constructor:function(a,b){this.panel=a;
this.id=this.panel.id+"-ddproxy";
Ext.apply(this,b)
},insertProxy:true,setStatus:Ext.emptyFn,reset:Ext.emptyFn,update:Ext.emptyFn,stop:Ext.emptyFn,sync:Ext.emptyFn,getEl:function(){return this.ghost
},getGhost:function(){return this.ghost
},getProxy:function(){return this.proxy
},hide:function(){if(this.ghost){if(this.proxy){this.proxy.remove();
delete this.proxy
}this.panel.el.dom.style.display="";
this.ghost.remove();
delete this.ghost
}},show:function(){if(!this.ghost){this.ghost=this.panel.createGhost(this.panel.initialConfig.cls,undefined,Ext.getBody());
this.ghost.setXY(this.panel.el.getXY());
if(this.insertProxy){this.proxy=this.panel.el.insertSibling({cls:"x-panel-dd-spacer"});
this.proxy.setSize(this.panel.getSize())
}this.panel.el.dom.style.display="none"
}},repair:function(b,c,a){this.hide();
if(typeof c=="function"){c.call(a||this)
}},moveProxy:function(a,b){if(this.proxy){a.insertBefore(this.proxy.dom,b)
}}});
Ext.Panel.DD=Ext.extend(Ext.dd.DragSource,{constructor:function(b,a){this.panel=b;
this.dragData={panel:b};
this.proxy=new Ext.dd.PanelProxy(b,a);
Ext.Panel.DD.superclass.constructor.call(this,b.el,a);
var d=b.header,c=b.body;
if(d){this.setHandleElId(d.id);
c=b.header
}c.setStyle("cursor","move");
this.scroll=false
},showFrame:Ext.emptyFn,startDrag:Ext.emptyFn,b4StartDrag:function(a,b){this.proxy.show()
},b4MouseDown:function(b){var a=b.getPageX(),c=b.getPageY();
this.autoOffset(a,c)
},onInitDrag:function(a,b){this.onStartDrag(a,b);
return true
},createFrame:Ext.emptyFn,getDragEl:function(a){return this.proxy.ghost.dom
},endDrag:function(a){this.proxy.hide();
this.panel.saveState()
},autoOffset:function(a,b){a-=this.startPageX;
b-=this.startPageY;
this.setDelta(a,b)
}});