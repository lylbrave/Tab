;(function($){
	 
	 var Tab = function(tab){
	 	//把tab类的自身保存一下
	 	var _this_=this;
	 	//保存单个tab组件
	 	this.tab=tab;
	 	//配置默认参数
	 	this.config={
	 		"triggerType":"mouseover",
	 		"effect":"default",
	 		"invoke":1,
	 		"auto":false
	 	};
	 	
	 	if(this.getConfig()){
	 		$.extend(this.config,this.getConfig());
	 	};
	 	
	 	this.tabItems =this.tab.find("ul.tab-nav li");
	 	this.contentItems =this.tab.find("div.content-wrap div.content-item");
	 	
	    var config = this.config;
	    if(config.triggerType==="click"){
		this.tabItems.bind(config.triggerType,function(){
			_this_.invoke($(this));//这个this是每次鼠标移入时的tab
		  });
	    }else if(config.triggerType==="mouseover"||config.triggerType!="click"){
	    	this.tabItems.mouseover(function(){
	    		_this_.invoke($(this));
	    	});
	    }
	    
	    if(config.auto){
	    	//定义一个全局定时器
	    	this.timer = null;
	    	//计数器
	    	this.loop=0;
	    	this.autoPlay();
	    	this.tab.hover(function(){
	    		window.clearInterval(_this_.timer);
	    	},function(){
	    		_this_.autoPlay();
	    	});
	    };
	    if(config.invoke>1){
	    	this.invoke(this.tabItems.eq(config.invoke-1));
	    }
};
	 
	 Tab.prototype = {
	 	
	 	//自动间隔时间切换
	 	autoPlay:function(){
	 		var _this_=this,
	 		tabItems=this.tabItems,//临时保存tab列表
	 		tabLength = tabItems.size(),//tab个数
	 		config=this.config;
	 		
	 		this.timer=window.setInterval(function(){
	 			_this_.loop++;
	 			if(_this_.loop>=tabLength){
	 				_this_.loop=0;
	 			};
	 			tabItems.eq(_this_.loop).trigger(config.triggerType);
	 			
	 		},config.auto)
	 	},
	 	//事件驱动函数
	 	
        invoke:function(currentTab){
	 
	 		var _this_=this;
	 		var index = currentTab.index();
	 		currentTab.addClass("active").siblings().removeClass("active");
	 		var effect = this.config.effect;
	 		var conItems=this.contentItems;
	 	    if(effect==="default"||effect!="fade"){
	 	    	conItems.eq(index).addClass("current").siblings().remove("current");
	 	    }else if(effect==="fade"){
	 	    	conItems.eq(index).fadeIn().siblings().fadeOut();
	 	    };
	 	    if(this.config.auto){
	 	    	this.loop=index;
	 	    };
	 	},
	 	getConfig:function(){
	 		//拿一下tab item节点上的data-config
	 		var config =this.tab.attr("data-config");
	 		
	 		if(config&&config!=""){
	 			return $.parseJSON(config);
	 		}else{
	 			return null;
	 		};
	 		
	 	}
	 };
	 //注册成jq方法
	 $.fn.extend({
	 	tab:function(){
	 		this.each(function(){
	 			new Tab($(this));
	 		});
	 	}
	 });
	 window.Tab=Tab;
})(jQuery);
