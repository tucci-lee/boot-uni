<template>
	<view class="page">
		<u-navbar placeholder autoBack>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">钱包</text>
		</u-navbar>

		<view class="body">
			<u-cell-group>
				<u-cell title="余额" size="large" isLink>
					<text slot="icon" class="icon body-icon">&#xe60e;</text>
				</u-cell>
				<u-cell title="账单" size="large" isLink>
					<text slot="icon" class="icon body-icon">&#xe620;</text>
				</u-cell>
			</u-cell-group>
		</view>
		
		<u-gap height="20"></u-gap>
		
		<view class="body">
			<u-cell-group>
				<u-cell title="设置" size="large" isLink>
					<text slot="icon" class="icon body-icon">&#xe62b;</text>
				</u-cell>
			</u-cell-group>
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
		.body {
			background-color: #FFF;

			.body-icon {
				font-size: 50rpx;
				color: #009600;
			}
		}
	}
</style>