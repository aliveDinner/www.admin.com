// JavaScript Document

$(function(){
	//搜索框高亮
	$(".com_so input").focus(function(){
		$(this).parent().addClass("focus");
	}).blur(function(){
		$(this).parent().removeClass("focus");
	});
	
	//筛选下拉
	$(".screen_box .box_btn").click(function(e){
		$(this).parent().toggleClass("show");
		e.stopPropagation();
	});
	
	//筛选下拉点击按钮关闭
	$(".screen_box .com_btn_inquiry").click(function(){
		$(this).parents(".screen_box").removeClass("show");
	});
		
	//点击其它地方关闭
	$(document).click(function(){
		//筛选关闭
		$(".screen_box").removeClass("show");
	});
		
	//阻止冒泡
	$(".screen_box").click(function(e){
		e.stopPropagation();
	});
	
	//表格点击批量操作
	$(document).on("click",".layui-form-checkbox",function(){
		var num = $(".layui-form-checked").length;
		
		if( num != 0){
			$(".com_screen .title h1").addClass("layui-hide");
			$(".com_screen .checked_btn").removeClass("layui-hide");	
		}else{
			$(".com_screen .checked_btn").addClass("layui-hide");
			$(".com_screen .title h1").removeClass("layui-hide");
		};
	});
	
	//tab切换
	$(".tab_btn li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		
		var index = $(this).index();
		$(this).parents(".com_txt_box").find(".tab_info .a_tab_info").eq(index).removeClass("hide").siblings().addClass("hide");
	});
	
	//详情信息折叠
	$(".com_txt_box .box_cont h2 i").click(function(){
		$(this).toggleClass("on");
		$(this).parent().next().toggleClass("layui-hide");
	});
});

//layui框架事件调用
	//框架调用
	layui.use('element',function(){
		var element = layui.element;
	});
	
	//表格调用
	layui.use('table',function(){
		var table = layui.table;
	});
	
	//时间调用
	layui.use('laydate',function(){
		var laydate = layui.laydate;

		//执行一个laydate实例
		laydate.render({
			elem:'#date',		//实力id
			range:true			//范围选择
		});
	});
	
	//上传调用
	layui.use('upload',function(){
		var upload = layui.upload;
		upload.render({
			elem:'#upload',
			url:'/upload/',
			accept:'file',
			done:function(res){
				console.log(res)
			}
		});
	});
	
	//弹窗调用
	layui.use('layer',function(){
		var $ = layui.jquery,layer = layui.layer;
		
		/*
		top.layer.msg('正在加载数据...', {
		  icon:16,
		  area:['100px','65px'],
		  shade:[0.3,'#000'],
		  time:800
		});
		*/
		
		var active ={
			pay:function(){
				top.layer.open({
					type:2,
					area:['320px','600px'],
					title:'打赏',
					fixed:false,
					maxmin:true,
					scrollbar:false,
					content:'pay.html',
					anim:-1
				});
			},del_btn:function(){
				top.layer.confirm('是否确认删除？',{
					btn: ['确认','取消'],
					title:'删除'
				});
			},msg_txt:function(){
				top.layer.msg('错误信息提示',{		//信息提示
					icon:2,
					offset:'70px',
					anim:6
				})
			},table_box:function(){				//表格
				top.layer.open({
					type:2,
					area:['80%','80%'],
					title:'选择',
					fixed:false,
					maxmin:true,
					scrollbar:false,
					content:'table.html',
					anim:-1
				});
			},right_box:function(){				//右侧弹窗-详情弹窗
				layer.open({
					type:2,
					area:['640px','100%'],
					title:'详情',
					fixed:false,
					maxmin:true,
					scrollbar:false,
					content:'view.html',
					offset:'r',
					shade:[0.1,'#fff'],
					shadeClose:true,
					anim:2,
					resize:false,
					move:false
				});  
			},right_add_box:function(){			//右侧弹窗-添加弹窗
				layer.open({
					type:2,
					area:['640px','100%'],
					title:'新增/编辑',
					fixed:false,
					maxmin:true,
					scrollbar:false,
					content:'add.html',
					offset:'r',
					shade:[0.1,'#fff'],
					shadeClose:true,
					anim:2,
					resize:false,
					move:false
				});  
			}
		}
		//弹窗触发
		$(document).on('click','.layer',function(){
			var type = $(this).data('type');
			active[type] ? active[type].call(this) :'';
		});
	
		//弹窗关闭
		$(document).on('click','.layer_close',function(){
			var index = parent.layer.getFrameIndex(window.name);	//先得到当前iframe层的索引
			parent.layer.close(index);								//再执行关闭    
		});
	});
