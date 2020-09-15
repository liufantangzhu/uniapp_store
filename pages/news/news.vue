<template>
	<view class="news">
		<news-item @itemClick="goDetail" :list="newsList"></news-item>
	</view>
</template>

<script>
	import newsItem from '../../static/comonents/news_item/news_item.vue'
	export default {
		data() {
			return {
				newsList: [
					{id:'1',title:'【9月28日更新】微淘超级上新日10月安排出炉！',click:'161w',add_time:'2019-04-29',img_url:'https://img.alicdn.com/imgextra/i2/1714004173/O1CN01wxkHIU1ghHItr42zt_!!0-martrix_bbs.jpg'},
					{id:'2',title:'粉丝管理工具FAQ及封禁名单',click:'163w',add_time:'Aug 30 2019 14:57:58',img_url:'https://img.alicdn.com/imgextra/i1/1714004173/TB2Ugn4asj_B1NjSZFHXXaDWpXa_!!2-martrix_bbs.png'},
					{id:'3',title:'淘拍电脑端主图视频制作发布操作教程',click:'74w',add_time:'2018-03-28',img_url:'https://img.alicdn.com/tfs/TB1_p5ID1OSBuNjy0FdXXbDnVXa-1372-687.png'},
					{id:'4',title:'店铺设计布局把握商品数量发布应该哪些问题？',click:'26w',add_time:'2015-02-14',img_url:'http://img02.taobaocdn.com/imgextra/i2/10271066304541145/TB2priGbFXXXXc4XXXXXXXXXXXX_!!321090271-0-martrix_bbs.jpg'},
					{id:'5',title:'提高店铺的DSR评分需要做哪些优化',click:'519',add_time:'2018-07-19 ',img_url:'https://img.alicdn.com/imgextra/i3/3031019012/TB2ciAnE29TBuNjy1zbXXXpepXa_!!3031019012-0-beehive-scenes.jpg'},
					{id:'6',title:'天空中的物流，航空货运',click:'397',add_time:' 2019-06-03',img_url:'https://img.alicdn.com/imgextra/i2/2159446175/O1CN01KckfE31vUCEx4q9um_!!0-martrix_bbs.jpg'},
					{id:'7',title:'双核PCM1794，胆味解码器，大DAC，双核单牛',click:'266',add_time:'2019-05-29',img_url:'https://img.alicdn.com/imgextra/i1/719794463/O1CN01kI3AJJ1iq6AoOnCos_!!0-martrix_bbs.jpg'},
					{id:'8',title:'血管不健康，从头伤到脚！保护血管健康你要这么做',click:'299',add_time:'2019-05-31 08:50',img_url:'https://img.alicdn.com/imgextra/i2/1832345209/O1CN012S3b991oLldimAber_!!2-martrix_bbs.png'},
					// {id:'',title:'',click:'',add_time:'',img_url:''}
				]
			}
		},
		components: {
			newsItem
			},
		methods: {
		// 	async getNews () {
		// 		const res = await this.$myRuquest({
		// 			url: '/api/getnewslist'
		// 		})
		// 		this.newsList = res.data.message
		// 	},
			goDetail (id) {
				uni.navigateTo({
					url: '/pages/news-detail/news-detail?id='+id
				})
			// }
		}
		
		// onLoad () {
			// this.getNews()
		}
	}
</script>

<style lang="scss">
	.news {
		
	}
</style>
