var total = 17;
	var zWin = $(window);
	var render = function(){
		var tmpl = '';
		var padding = 2;
		var scrollBarWidth = 0;
		var winWidth = $(window).width();
		var picWidth = Math.floor((winWidth-padding*3-scrollBarWidth)/4);
		for(var i=1;i<=total;i++){
			var p = padding;
			if(i%4==1){
				p = 0;
			}
			tmpl+='<li data-id="'+i+'" class="animated bounceIn" style="width:'+picWidth+'px;height:'+picWidth+'px;padding-left:'+p+'px;padding-top:'+padding+'px;"><img src="img/'+i+'.jpg"></li>';
		}
		$('#container').html(tmpl);
	}
	render();
var cid;
var wImg=$('#large_img');
var domImage=wImg[0];
var loadImg=function(id,callback){
	$("#container").css({height:zWin.height(),'overflow':'hidden'});
	$("#large_container").css({
		width:zWin.width(),
		height:zWin.height()
	}).show();
	var imgsrc='img/'+id+'.large.jpg';
	var ImageObj=new Image();
	ImageObj.src=imgsrc;
	ImageObj.onload=function(){
		var w=this.width;
		var h=this.height;
		var winWidth=zWin.width();
		var winHeight=zWin.height();
		var realw=parseInt((winWidth-winHeight*w/h)/2);
		var realh=parseInt((winHeight-winWidth*h/w)/2);
		
		wImg.css('width','auto').css('height','auto');
		wImg.css('padding-left','0px').css('padding-top','0px');
		if(h/w>1.2){
			wImg.attr('src',imgsrc).css('height',winHeight).css('padding-left',realw+'px');
		}else{
			wImg.attr('src',imgsrc).css('width',winWidth).css('padding-top',realh+'px');
		}
		callback&&callback();
	}
}
//点击一个图片显示缩略图
$("#container").delegate("li","tap",function(){
	var _id=cid=$(this).attr("data-id");
	loadImg(_id);
})
//点击一下回到原位置
$("#large_container").tap(function(){
	$("#container").css({height:'auto','overflow':'auto'});
	$("#large_container").hide();
});

$('#large_container').mousedown(function(e){
		e.preventDefault();
	});
//向前滑动
var lock=false;
$("#large_container").swipeLeft(function(){
	if(lock){
		return;
	}
	cid++;
	lock=true;
	loadImg(cid,function(){
		domImage.addEventListener('webkitAnimationEnd',function(){
			wImg.removeClass('animated bounceInRight');
			domImage.removeEventListener('webkitAnimationEnd');
			lock = false;
		},false);
		wImg.addClass('animated bounceInRight');
	});
});

//向后滑动
$("#large_container").swipeRight(function(){
	if(lock){
		return;
	}
	cid--;
	lock=true;
	if(cid>0){
		loadImg(cid,function(){
				domImage.addEventListener('webkitAnimationEnd',function(){
					wImg.removeClass('animated bounceInLeft');
					domImage.removeEventListener('webkitAnimationEnd');
					lock = false;
				},false);
				wImg.addClass('animated bounceInLeft');
			});	
	}else{
		cid=1
	}
});
