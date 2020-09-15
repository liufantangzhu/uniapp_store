<template>
	<view class="pics">
		<scroll-view class="left" scroll-y>
			<view 
			@click="leftClickHandle(index,item.id)"
			:class="active===index?'active':''" 
			v-for="(item,index) in cates" 
			:key="item.id">
			  {{item.title}}
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view class="item" v-for="item in secondData" :key="item.id">
				<image @click="previewImg(item.img_url)" :src="item.img_url"></image>
				<text>{{item.title}}</text>
			</view>
			<text v-if="secondData.length === 0">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				secondData: [],
				cates: [
					{title:'美景植物',id:'1'},{title:'家居生活',id:'2'},{title:'美食菜谱',id:'3'},
					{title:'户型装饰',id:'4'},{title:'广告摄影',id:'5'},{title:'空间设计',id:'6'},
					{title:'明星美女',id:'7'},{title:'优雅汉服',id:'8'},{title:'动漫cos',id:'9'},
					{title:'摄影学习',id:'10'},{title:'摄影设计',id:'11'},{title:'摄影器材',id:'12'}
					],
				doc:[
					[
						{id:'1',title:'松果是松科植物的果实，成熟后内有种子为松子。松果样子像峰塔。长约6~10厘米，宽约3厘米。体如鱼鳞，颜色有白有黑。',img_url:'https://gaitaobao4.alicdn.com/tfscom/i4/TB10k3pLXXXXXbeXXXXXXXXXXXX_!!0-item_pic.jpg_240x240xz.jpg_.webp'},
						{id:'2',title:'紫藤，（学名：Wisteria sinensis），别名藤萝、朱藤、黄环。属豆科、紫藤属，一种落叶攀援缠绕性大藤本植物。干皮深灰色，不裂；春季开花，青紫色蝶形花冠，花紫色或深紫色，十分美丽。',img_url:'https://gaitaobao2.alicdn.com/tfscom/i4/2204939381635/O1CN01uVPgJx1Nws7Yug698_!!2-item_pic.png_240x240xz.jpg_.webp'},
					],
					[
						{id:'4',title:'哇，妈妈，你终于把老沙发换掉啦，这个新沙发简直太漂亮了，这比之前那个木头的舒服多了坐上去软软的，说晚上要到上面睡觉呢。',img_url:'https://gaitaobao2.alicdn.com/tfscom/i4/2632225845/O1CN01LBzm2d1t33cc7Mh7s_!!2632225845.jpg_240x240xz.jpg_.webp'},
						{id:'5',title:'简约北欧风格，时尚大气，符合现在人的装修风格，质量挺好的，款式很现代，放大厅很漂亮',img_url:'https://gaitaobao3.alicdn.com/tfscom/i4/2168796818/O1CN01gVFrNm20EgxUmXY7X_!!0-item_pic.jpg_240x240xz.jpg_.webp'}
					],
					[
						// {id:'',title:'',img_url:''}
						{id:'7',title:'真的好吃好久没有吃到家乡味了，在云南所有的辣条都是甜甜的，味精的味道，老家的味道就是香',img_url:'https://gaitaobao3.alicdn.com/tfscom/i3/2815257805/O1CN01KnD19527WjsmRQ3gU_!!2815257805.jpg_240x240xz.jpg_.webp'},
						{id:'8',title:'网红美食 一勺老卤 风干鸭脖/鸭锁骨 咸蛋黄风干鸭脖/鸭锁骨 ',img_url:'https://gd3.alicdn.com/imgextra/i2/2/O1CN010zOct91jBAPI6e134_!!2-item_pic.png_400x400.jpg'}
					],
					[
						{id:'10',title:'北欧ins风装饰画客厅现代简约沙发背景墙后面轻奢挂画餐厅小户型',img_url:'https://gaitaobao3.alicdn.com/tfscom/i2/175754641/TB1cfuMKUY1gK0jSZFCq6AwqXXa?_!!0-item_pic.jpg_240x240xz.jpg_.webp'}
					]
				]
				
			}
		},
		methods: {
			async getPicsCate () {
				const res = await this.$myRuquest({
					url: '/api/getimgcategory'
				})
				this.cates = res.data.message
				this.leftClickHandle(0,this.cates[0].id)
			},
			async leftClickHandle (index,id) {
				this.active = index
				// 获取右侧的数据
				// const res = await this.$myRuquest({
				// 	url: '/api/getimages/'+id
				// })
				this.secondData = this.doc[index]
			},
			previewImg (current) {
				const urls = this.secondData.map(item=>{
					return item.img_url
				})
				uni.previewImage({
					current,
					urls
				})
			}
		},
		
		onLoad () {
			 this.leftClickHandle(0,0)
		}
	}
</script>

<style lang="scss">
page{
	height: 100%;
}
.pics{
	height: 100%;
	display: flex;
	.left{
		width: 200rpx;
		height: 100%;
		border-right:1px solid #eee;
		view{
			height: 60px;
			line-height: 60px;
			color: #333;
			text-align: center;
			font-size: 30rpx;
			border-top:1px solid #eee;
		}
		.active{
			background: #FF6100;
			color: #fff;
		}
	}
	.right{
		height: 100%;
		width: 520rpx;
		margin: 10rpx auto;
		.item{
			image{
				width: 520rpx;
				height: 520rpx;
				border-radius: 5px;
			}
			text{
				font-size: 30rpx;
				line-height: 60rpx;
			}
		}
	}
}
</style>
