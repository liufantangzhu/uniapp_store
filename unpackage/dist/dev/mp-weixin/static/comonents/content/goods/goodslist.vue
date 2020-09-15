	<template>
		<div class="goods">
			<goods-list-item v-for='item,index in goods' :goodsItem='item' :key='index'>
			</goods-list-item>
		</div>
	</template>
	<script>
		import GoodsListItem from './GoodsListItem'
		export default{
		name:'goodsList',
		  components: {
		  	GoodsListItem
		  },
		  props:{
		  	goods:{
		  		type:Array,
		  		default(){
		  			return []
		  		}
		  	}
		  },
			data(){
				return{

				}
			},
			created() {

			}

		};
	</script>

	<style scoped>
		.goods{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			text-align: center;
			padding: 2px;
			z-index: -1;
			margin-bottom: 44px;
		}
	</style>

