<template>
	<view class="page">
		<u-navbar placeholder>
			<view slot="left"></view>
			<text slot="center" class="navbar-title">登录</text>
		</u-navbar>

		<u-gap height="50"></u-gap>

		<u-form labelWidth="80">
			<u-form-item label="手机号" borderBottom>
				<u-input v-model="signinBody.phone" placeholder="请输入手机号" border="none" type="number" maxlength="11"
					clearable></u-input>
			</u-form-item>
			<u-form-item label="密码" borderBottom>
				<u-input v-model="signinBody.password" placeholder="请输入密码" border="none" password maxlength="16"
					clearable></u-input>
			</u-form-item>
		</u-form>

		<u-gap height="20"></u-gap>

		<u-radio-group v-model="agreementSelect">
			<u-radio name="true">
				<text>我已阅并同意
					<text class="agreement-text" @click="goUserAgreement()">《用户服务协议》</text>
				</text>
			</u-radio>
		</u-radio-group>

		<u-gap height="20"></u-gap>

		<u-button @click="signin()" color="#009600" text="登录"></u-button>

		<u-gap height="20"></u-gap>

		<view class="other-signin">
			<view style="width:200rpx">
				<u-button @click="goQuickSignin()" plain size="small" color="#009600" text="验证码登录"></u-button>
			</view>
			<view class="other-signin-icon">
				<text class="icon" style="font-size:50rpx;color:#009600">&#xe638;</text>
				<text class="icon" style="font-size:50rpx;color:">&#xe64f;</text>
				<text class="icon" style="font-size:50rpx;color:#1296db">&#xe637;</text>
			</view>
		</view>

		<u-gap height="20"></u-gap>

		<view class="other-option">
			<text @click="goSignup()">去注册</text>
			<text @click="goPassword()">忘记密码？</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				signinBody: {
					phone: '',
					password: '',
				},
				agreementSelect: false,
			}
		},
		methods: {
			signin() {
				if (!this.signinBody.phone) {
					return this.$util.showToast('手机号不能为空');
				}
				if (!/^1[3-9][0-9]{9}$/.test(this.signinBody.phone)) {
					return this.$util.showToast('手机号不正确');
				}
				if (!this.signinBody.password) {
					return this.$util.showToast('密码不能为空');
				}
				if (!/^.{6,16}$/.test(this.signinBody.password)) {
					return this.$util.showToast('密码长度需要6-16位');
				}
				if (!this.agreementSelect) {
					return this.$util.showToast('请勾选用户协议');
				}
				let body = {
					phone: this.signinBody.phone,
					password: this.$encrypt.encrypt(this.signinBody.password),
				}
				this.$api.signin(body).then(res => {
					if (res.status) {
						uni.setStorageSync(this.$cache.token, res.data.token);
						uni.setStorageSync(this.$cache.profile, res.data);
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				})
			},
			goUserAgreement() {
				uni.navigateTo({
					url: '/pages/agreement/userAgreement'
				})
			},
			goQuickSignin() {
				uni.navigateTo({
					url: '/pages/authorize/quickSignin'
				})
			},
			goSignup() {
				uni.navigateTo({
					url: '/pages/authorize/signup'
				})
			},
			goPassword() {
				uni.navigateTo({
					url: '/pages/authorize/password'
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 200rpx 70rpx 0 70rpx;

		.agreement-text {
			color: blue;
		}

		.other-signin {
			display: flex;
			justify-content: space-between;

			.other-signin-icon {
				text {
					padding-left: 20rpx;
				}
			}
		}

		.other-option {
			display: flex;
			justify-content: space-between;
			color: #999;
		}
	}
</style>