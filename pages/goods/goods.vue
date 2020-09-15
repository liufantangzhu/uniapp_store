<template>
	<view  class="goods_list">
		<goods-list :goods='goods'></goods-list>
		<view class="isOver" v-if="flag">-----真的不能再往下拉啦-----</view>
	</view>
	
</template>

<script>
	import goodsList from '../../static/comonents/content/goods/goodslist.vue'
	export default {
		data() {
			return {
				flag: false,
				page:1,
				goods:[
	          {imgsrc:'https://gaitaobao1.alicdn.com/tfscom/i3/2200869404234/O1CN01gJVDzr1h9DY7GE4ee_!!0-item_pic.jpg_240x240xz.jpg_.webp',title:'三月兔/Marchare 樱花粉扑美妆蛋不吃粉海绵化妆蛋粉扑',price:'29.9',cfav:'1200'},
	          {imgsrc:'https://gaitaobao2.alicdn.com/tfscom/i4/2307829976/O1CN01dRcRQI2NZ3l9rZzP0_!!2307829976-0-lubanu-s.jpg_240x240xz.jpg_.webp',title:'卡姿兰彩妆套装初学者化妆品全套组合淡妆自然学生灰姑娘套装正品',price:'169.9',cfav:'1104'},
	          {imgsrc:'https://img.alicdn.com/bao/uploaded/i1/810921128/O1CN012H8qbg1KCfMwdpQJv_!!810921128-0-lubanu-s.jpg_468x468q75.jpg_.webp',title:'Nico粉饼定妆粉散粉干粉控油持久遮瑕防水干湿两用修容蜜粉女正品券35元¥14.90¥49.9nico旗舰店月销 1.99万',price:'14.9',cfav:'199'},
	          {imgsrc:'https://img.alicdn.com/bao/uploaded/i1/784497909/O1CN01wrifMQ28IN4VK1ec0_!!0-item_pic.jpg_468x468q75.jpg_.webp',title:'唇刷口红笔刷伸缩便携带盖化妆刷女一支装初学者遮瑕刷迷你眼影刷券5元¥7.90¥12.9zoreya旗舰店月销 6024',price:'7.9',cfav:'62'},
	          {imgsrc:'https://img.alicdn.com/bao/uploaded/i3/123601316/TB20u_4g8jTBKNjSZFwXXcG4XXa_!!123601316.jpg_468x468q75.jpg_.webp',title:'简大小姐貂毛平头唇刷化妆师专用伸缩便携款唇膏刷口红刷女化妆刷¥36¥75简 大小姐月销 1554',price:'36.9',cfav:'1554'},
	          {imgsrc:'https://img.alicdn.com/bao/uploaded/i1/2457188379/O1CN01Bv9RKz2BldF5ZKSi7_!!2457188379-0-lubanu-s.jpg_468x468q75.jpg_.webp',title:'丽扬散粉空气蜜粉定妆粉女控油持久遮瑕提亮肤色防水网红修容粉¥30¥98丽扬化妆品旗舰店月销 8588',price:'59.0',cfav:'3359'},
	          {imgsrc:'https://img.alicdn.com/bao/uploaded/i3/191008125/O1CN01Tq24PO29tIdvrlYqx_!!191008125-0-lubanu-s.jpg_468x468q75.jpg_.webp',title:'美康粉黛旷野玫瑰散粉定妆粉饼女持久控油防水防汗不易脱妆蜜粉¥49¥89美康粉黛旗舰店月销 11.80万',price:'49.9',cfav:'1180'},
	          {imgsrc:'https://gaitaobao2.alicdn.com/tfscom/i3/1773211220/O1CN01y9xLtJ1KsnoAPMNuy_!!0-item_pic.jpg_240x240xz.jpg_.webp',title:'ZEESEA滋色妆前乳隔离霜保湿遮瑕液粉底液定妆粉散粉3件彩妆套装',price:'129.9',cfav:'1069'},
	          
	        ],
					goods2:[
					    {imgsrc:'https://gaitaobao1.alicdn.com/tfscom/i3/2200869404234/O1CN01gJVDzr1h9DY7GE4ee_!!0-item_pic.jpg_240x240xz.jpg_.webp',title:'三月兔/Marchare 樱花粉扑美妆蛋不吃粉海绵化妆蛋粉扑',price:'29.9',cfav:'1200'},
					    {imgsrc:'https://gaitaobao2.alicdn.com/tfscom/i4/2307829976/O1CN01dRcRQI2NZ3l9rZzP0_!!2307829976-0-lubanu-s.jpg_240x240xz.jpg_.webp',title:'卡姿兰彩妆套装初学者化妆品全套组合淡妆自然学生灰姑娘套装正品',price:'169.9',cfav:'1104'},
					    {imgsrc:'https://img.alicdn.com/bao/uploaded/i1/810921128/O1CN012H8qbg1KCfMwdpQJv_!!810921128-0-lubanu-s.jpg_468x468q75.jpg_.webp',title:'Nico粉饼定妆粉散粉干粉控油持久遮瑕防水干湿两用修容蜜粉女正品券35元¥14.90¥49.9nico旗舰店月销 1.99万',price:'14.9',cfav:'199'},
					    {imgsrc:'https://img.alicdn.com/bao/uploaded/i1/784497909/O1CN01wrifMQ28IN4VK1ec0_!!0-item_pic.jpg_468x468q75.jpg_.webp',title:'唇刷口红笔刷伸缩便携带盖化妆刷女一支装初学者遮瑕刷迷你眼影刷券5元¥7.90¥12.9zoreya旗舰店月销 6024',price:'7.9',cfav:'62'},
					    {imgsrc:'https://img.alicdn.com/bao/uploaded/i3/123601316/TB20u_4g8jTBKNjSZFwXXcG4XXa_!!123601316.jpg_468x468q75.jpg_.webp',title:'简大小姐貂毛平头唇刷化妆师专用伸缩便携款唇膏刷口红刷女化妆刷¥36¥75简 大小姐月销 1554',price:'36.9',cfav:'1554'},
					    {imgsrc:'https://img.alicdn.com/bao/uploaded/i1/2457188379/O1CN01Bv9RKz2BldF5ZKSi7_!!2457188379-0-lubanu-s.jpg_468x468q75.jpg_.webp',title:'丽扬散粉空气蜜粉定妆粉女控油持久遮瑕提亮肤色防水网红修容粉¥30¥98丽扬化妆品旗舰店月销 8588',price:'59.0',cfav:'3359'},
					    {imgsrc:'https://img.alicdn.com/bao/uploaded/i3/191008125/O1CN01Tq24PO29tIdvrlYqx_!!191008125-0-lubanu-s.jpg_468x468q75.jpg_.webp',title:'美康粉黛旷野玫瑰散粉定妆粉饼女持久控油防水防汗不易脱妆蜜粉¥49¥89美康粉黛旗舰店月销 11.80万',price:'49.9',cfav:'1180'},
					    {imgsrc:'https://gaitaobao2.alicdn.com/tfscom/i3/1773211220/O1CN01y9xLtJ1KsnoAPMNuy_!!0-item_pic.jpg_240x240xz.jpg_.webp',title:'ZEESEA滋色妆前乳隔离霜保湿遮瑕液粉底液定妆粉散粉3件彩妆套装',price:'129.9',cfav:'1069'},
					    
					  ],
			}
		},
		onLoad() {
	
		},
		components:{
			goodsList
		},
		methods: {
		},
		onReachBottom() {
			if(this.page<=3){
				this.goods=this.goods.concat(this.goods2);
				this.page++
			}else{
				this.flag=true;
			}
		},
		onPullDownRefresh() {
			this.flag = false;
			setTimeout(()=>{uni.stopPullDownRefresh()},1000)
		}
	}
</script>

<style>
	.goods_list{
		background-color: #eee;
	}
	.isOver{
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		color: #FF6100;
		font-size: 28rpx;
	}
</style>
