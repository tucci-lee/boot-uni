<template>
	<view class="page">
		<view class="safe-top"></view>
		<view class="profile">
			<u-avatar @click="goProfile()" :src="profile.avatar" size="90"></u-avatar>
			<view class="profile-right">
				<view class="profile-right-info-nickname" @click="goSignin()">
					{{profile.nickname?profile.nickname:'点击登录'}}
				</view>
				<u-gap height="10"></u-gap>
				<view class="profile-right-info-account" @click="copy(account.username)" v-if="account.username">
					账号：{{account.username}}</view>
			</view>
		</view>

		<!-- <u-gap height="20"></u-gap>

		<view class="service">
			<u-cell-group>
				<u-cell title="钱包" @click="goWallet()" size="large" isLink>
					<text slot="icon" class="icon service-icon">&#xe6b1;</text>
				</u-cell>
			</u-cell-group>
		</view> -->

		<u-gap height="20"></u-gap>

		<view class="service">
			<u-cell-group>
				<u-cell title="设置" @click="goSetting()" size="large" isLink>
					<text slot="icon" class="icon service-icon">&#xe62b;</text>
				</u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				profile: {},
				account: {},
			}
		},
		onShow() {
			this.getAccount();
			this.getProfile();
		},
		methods: {
			getProfile() {
				this.$api.getProfile().then(res => {
					if (res.status) {
						let profile = res.data;
						this.profile = profile;
						uni.setStorageSync(this.$cache.profile, profile);
					} else {
						this.profile = {}
					}
				})
			},
			getAccount() {
				this.$api.getAccount().then(res => {
					if (res.status) {
						let account = res.data;
						this.account = account;
					} else {
						this.account = {}
					}
				})
			},
			goProfile() {
				if (!this.profile.uid) {
					return this.$util.showToast('请先登录');
				}
				uni.navigateTo({
					url: '/pages/my/profile/index'
				})
			},
			goWallet() {
				if (!this.profile.uid) {
					return this.$util.showToast('请先登录');
				}
				uni.navigateTo({
					url: '/pages/my/wallet/index'
				})
			},
			goSetting() {
				if (!this.profile.uid) {
					return this.$util.showToast('请先登录');
				}
				uni.navigateTo({
					url: '/pages/my/setting/index'
				})
			},
			copy(text) {
				uni.setClipboardData({
					data: text,
					showToast: false,
					success: () => {
						this.$util.showToast('复制成功');
					}
				})
			},
			goSignin() {
				if (this.profile.uid) {
					return;
				}
				// #ifdef MP
				this.$util.showLoading();
				uni.login({
					success: response => {
						let body = {
							code: response.code
						}
						this.$api.weixinAppletSignin(response).then(res => {
							this.$util.hideLoading();
							if (res.status) {
								uni.setStorageSync(this.$cache.token, res.data.token);
								uni.setStorageSync(this.$cache.profile, res.data);
								this.getProfile();
								this.getAccount();
							} else if (res.code == 40001) {
								uni.navigateTo({
									url: '/pages/authorize/mpSignup'
								})
							}
						})
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	.page {

		.profile {
			background-color: #FFF;
			padding: 150rpx 30rpx 50rpx 60rpx;
			display: flex;
			align-items: center;

			.profile-right {
				padding-left: 50rpx;
				display: flex;
				flex-direction: column;

				.profile-right-info-nickname {
					font-size: 18px;
					font-weight: 500;
				}

				.profile-right-info-account {
					color: #999;
				}
			}
		}

		.service {
			background-color: #FFF;

			.service-icon {
				font-size: 50rpx;
				color: #009600;
			}
		}
	}
</style>