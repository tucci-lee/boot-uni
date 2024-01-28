<template>
	<view class="page">
		<u-navbar placeholder autoBack>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">设置</text>
		</u-navbar>

		<view class="body">
			<u-cell-group>
				<u-cell title="账号与安全" url="/pages/my/account/index" size="large" isLink>
				</u-cell>
			</u-cell-group>
		</view>

		<u-gap height="50"></u-gap>

		<view>
			<u-button @click="signout()" plain color="#009600">退出登录</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onShow() {},
		methods: {
			signout() {
				this.$api.signout().then(res => {
					if (res.status) {
						uni.removeStorageSync(this.$cache.token);
						uni.removeStorageSync(this.$cache.profile);
						// #ifndef MP
						uni.reLaunch({
							url: '/pages/authorize/signin'
						})
						// #endif
						// #ifdef MP
						uni.switchTab({
							url: '/pages/index/index'
						})
						// #endif
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
		.body {
			background-color: #FFF;
		}
	}
</style>