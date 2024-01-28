<template>
	<view class="page">
		<u-navbar placeholder autoBack @rightClick="goSetting()">
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">钱包</text>
			<text slot="right" class="icon">&#xe62b;</text>
		</u-navbar>

		<view class="card">
			<view>
				<view class="card-assets">总资产</view>
				<h2 class="card-balance">￥1.00</h2>
				<view style="padding-top: 80rpx;">账单详情</view>
			</view>
			<view>
				<view>充值</view>
				<view>提现</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.page {
		padding: 30rpx;

		.card {
			background-color: #009600;
			height: 250rpx;
			border-radius: 20rpx;

			display: flex;
			justify-content: space-between;
			padding: 30rpx;

			.card-assets {
				color: #FFF;
			}
			
			.card-balance{
				padding-top: 30rpx;
				color: #FFF;
			}
		}
	}
</style>