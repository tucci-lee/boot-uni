<template>
	<view class="page">
		<u-navbar autoBack placeholder>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">账号与安全</text>
		</u-navbar>

		<view class="body">
			<u-cell-group>
				<u-cell title="账号" :value="account.username" url="/pages/my/account/username" size="large" isLink>
				</u-cell>
				<u-cell title="手机号" :value="account.phone" @click="goPhone()" size="large" isLink>
				</u-cell>
				<u-cell title="邮箱" :value="account.email?account.email:'未设置'" @click="goEmail()" size="large" isLink>
				</u-cell>
			</u-cell-group>
		</view>

		<u-gap height="20"></u-gap>

		<view class="body">
			<u-cell-group>
				<u-cell title="实名" :value="account.realName?account.realName:'未实名'" @click="goReal()" size="large"
					isLink>
				</u-cell>
				<u-cell title="设备管理" url="/pages/my/account/device" size="large" isLink>
				</u-cell>
				<u-cell title="第三方账号管理" size="large" isLink>
				</u-cell>
			</u-cell-group>
		</view>

		<u-gap height="50"></u-gap>

		<u-button @click="signoff()" plain color="#009600" text="账号注销"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: {},
			}
		},
		onShow() {
			this.getAccount();
		},
		methods: {
			getAccount() {
				this.$api.getAccount().then(res => {
					if (res.status) {
						this.account = res.data;
					}
				})
			},
			signoff() {
				uni.showModal({
					content: '确定要注销吗？',
					success: (res) => {
						if (res.confirm) {
							this.$util.showLoading();
							this.$api.signoff().then(res => {
								this.$util.hideLoading();
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
						}
					}
				});
			},
			goPhone() {
				uni.showModal({
					content: '确定修改手机号吗？',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/my/account/phone'
							})
						}
					}
				});
			},
			goEmail() {
				uni.showModal({
					content: '确定修改邮箱吗？',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/my/account/email'
							})
						}
					}
				});
			},
			goReal() {
				if (this.account.isReal) {
					this.$util.showToast('已实名认证');
				} else {
					uni.navigateTo({
						url: '/pages/my/account/real'
					})
				}
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