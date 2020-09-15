<template>
	<view>
		<view class="home_search">
			<view class="search-ico-wapper">
				<image src="../../static/search/search.png"></image>
			</view>
			<input type="text" value="" class="home_search_input" placeholder="点击输入搜索内容" />
		</view>
		<view class="home_swiper">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="item in sewiper" :key='item.id'>
					<view class="swiper-item">
						<image :src="item.img"></image>
					</view>
					
				</swiper-item>
			</swiper>
		</view>
		<!-- 导航 -->
		<view class="home_recommend">
			<view class="recommend_item"
			
			 v-for="(item,index) in nav" :key='index'
			 @click="navItemClick(item.path)">
				<view>
					<image :src='item.icon'></image>
				</view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="hot_goods">
			<view class='tit'>
				推荐商品
			</view>
			<goods-list :goods="goods" ></goods-list>
		</view>
	</view>
</template>

<script>
	import goodsList from '../../static/comonents/content/goods/goodslist.vue'
	export default {
		data() {
			return {
				sewiper:[
					{'id':'1','img':require('static/swipers/1.jpg'),'url':''},
					{'id':'2','img':require('static/swipers/2.jpg'),'url':''},
					{'id':'3','img':require('static/swipers/3.jpg'),'url':''},
				],
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
				nav:[
					{
						icon: require('static/assets/img/nav/shop.png'),
						title: '瓜皮超市',
						path: '/pages/goods/goods'
					},
					{
						icon: require('static/assets/img/nav/客服.png'),
						title: '联系我们',
						path: '/pages/contact/contact'
					},
					{
						icon: require('static/assets/img/nav/社区.png'),
						title: '社区图片',
						path: '/pages/pics/pics'
					},
					{
						icon:require('static/assets/img/nav/视频学习.png'),
						title: '学习视频',
						path: '/pages/videos/videos'
					}
				]
			}
		},
		onLoad() {
	
		},
		components:{
			goodsList
		},
		methods: {
			navItemClick(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss">
	.home_swiper{
		swiper{
			width: 750rpx;
			height: 350rpx;
			image{
				width: 100%;height: 350rpx;
			}
		}
	}
	 .home_search{
		 height: 60rpx;
		 padding:20rpx 50rpx;
		 background-color:#FF6100;
		 position: relative;
		 .search-ico-wapper{
			 width: 40rpx;
			 height: 40rpx;
			 position: absolute;
			 left: 70rpx;
			 top: 30rpx;
			 image{
				 width: inherit;
				 height: inherit;
			 }
		 }
		 .home_search_input{
			 background-color: #ffffff;
			 border-radius:30rpx;
			 height:60rpx;
			 padding:0 30rpx 0 80rpx;
			 font-size: 30rpx;
		 }
	 }
	 .home_recommend{
		 display: flex; 
		 width: 100%;
		 align-items: center;		
		 margin-top: 20rpx;
		 // border-bottom: 8rpx solid #eee;
		 .recommend_item{
			flex-grow:1;
			text-align: center;
			view image{
				width: 100rpx;
				height: 100rpx;
				border-radius:50%;
				}
		 }
	 }
	 .hot_goods{
		 background: #eee;
		 overflow: hidden;
		 margin-top: 10rpx;
		 .tit{
			 color:#FF6100;height: 50px;line-height: 50px;
			 text-align: center;
			 letter-spacing: 20px;
			 background: #fff;
			 margin: 7rpx 0;
		 }
	 }
</style>
