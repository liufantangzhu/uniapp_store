<template>
	<view class="contact">
		<image class="img" src="../../static/assets/img/aboutUS/aboutUS.jpg"></image>
		<view class="info">
			<view @click="phone">联系电话：17156868693 ( 点击拨打 )</view>
			<view>联系地址：广州市荔湾区海龙街增漖洪石坊85号</view>
		</view>
		<map class="map" 
		:longitude="longitude" 
		:scale="scale" 
		:latitude="latitude" 
		:markers="markers">
		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 113.30764968,
				latitude: 23.1200491,
				scale: 13,
				markers:[
					{
						longitude: 113.30764968,
						latitude: 23.1200491,
						iconPath: '../../static/assets/img/position/location.png',
						width: 30,
						height: 30
					}
				]
			}
		},
		methods: {
			phone() {
				uni.makePhoneCall({
					phoneNumber: '17156868693'
				})
			}
		}
	};
</script>

<style lang="scss">
.contact{
	.img{
		width: 750rpx;
		height: 320rpx;
	}
	.info{
		padding: 10rpx 20rpx;
		font-size: 30rpx;
		view{
			line-height: 80rpx;
			border-bottom: 1px solid #eee;
		}
	}
	
	.map{
		width: 750rpx;
		height: 750rpx;
	}
}
</style>
