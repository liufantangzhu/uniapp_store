	<template>
		<div class="goodsItem">
			<img :src="goodsItem.imgsrc" alt="" class="goodsimg">
			<div class="goods-info">
				<p>{{goodsItem.title}}</p>
				<span class="price">￥{{goodsItem.price}}</span>
				<span class="collect">{{goodsItem.cfav}}</span>
			</div>
			
		</div>
	</template>

	<script>
		export default{
		name:'GoodsListItem',
		  props:{
		  	goodsItem:{
		  		type:Object,
		  		default(){
		  			return {}
		  		}
		  	}
		  },
			data(){
				return{

				}
			},
			created(){
			}

		};
	</script>

	<style scoped>
	.goodsItem{
		background-color: #FFFFFF;
		padding-bottom: 40px;
		position: relative;
		width:350rpx;
		margin:  10rpx 0 ;
	}
		.goodsimg{
			width:100%;
			height:350rpx;
			border-radius: 5px;
			padding:15rpx;
			box-sizing: border-box;
		}
		.goods-info{
			font-size: 12px;
			position: absolute;
			bottom: 5px;
			left: 0;
			right: 0;
			overflow: hidden;
			text-align: center;
			
		}
		.goods-info p{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin-bottom: 3px;
		}
		.goods-info .price{
			margin-right: 20px;
			color: rgb(255, 68, 68);

		}
		.goods-info .collect{
			position: relative;
			
		}
		.goods-info .collect::before {
			content: '';
			position: absolute;
			left: -15px;
			top: 0;
			width: 14px;
			height: 14px;
			background-image: url('../../../assets/img/common/collect.svg')0 0/14px 14px;
		}
	</style>

