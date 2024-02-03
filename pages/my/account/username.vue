<template>
	<view class="page">
		<u-navbar autoBack placeholder>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">账号</text>
		</u-navbar>

		<u-line></u-line>

		<view class="body">
			<u-input v-model="username" placeholder="请输入账号" border="bottom" maxlength="20" clearable></u-input>
		</view>
		<view class="tip">账号只允许数字、字母、下划线和小数点且最多20位。</view>
		
		<u-gap height="50"></u-gap>
		
		<u-button @click="updateUsername()" color="#009600" text="保存"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				account: {},
			}
		},
		onLoad() {
			this.getAccount();
		},
		methods: {
			getAccount() {
				this.$api.getAccount().then(res => {
					if (res.status) {
						let account = res.data;
						this.username = account.username;
						this.account = account;
					}
				})
			},
			updateUsername() {
				if (!this.username) {
					return this.$util.showToast('账号不能为空');
				}
				if (!/^[0-9a-zA-Z_.]{1,20}$/.test(this.username)) {
					return this.$util.showToast('账号格式不正确');
				}
				if (this.account.username === this.username) {
					return uni.navigateBack();
				}

				let body = {
					username: this.username
				}
				this.$util.showLoading();
				this.$api.updateUsername(body).then(res => {
					this.$util.hideLoading();
					if (res.status) {
						uni.navigateBack();
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		.body {
			background-color: #FFF;
		}

		.tip {
			padding: 10rpx;
			color: #999;
		}
	}
</style>