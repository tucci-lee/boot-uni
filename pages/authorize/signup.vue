<template>
	<view class="page">
		<u-navbar placeholder autoBack>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">注册</text>
		</u-navbar>

		<u-gap height="250"></u-gap>

		<u-form labelWidth="80">
			<u-form-item label="手机号" borderBottom>
				<u-input v-model="signupBody.phone" placeholder="请输入手机号" border="none" type="number" maxlength="11"
					clearable></u-input>
			</u-form-item>
			<u-form-item label="验证码" borderBottom>
				<u-input v-model="signupBody.captcha" placeholder="请输入验证码" border="none" maxlength="4" clearable>
					<template slot="suffix">
						<u-code ref="captchaCode" @change="captchaCodeChange"></u-code>
						<u-button @tap="showImageCaptcha()" color="#009600" :text="captchaCodeTips"></u-button>
					</template>
				</u-input>
			</u-form-item>
			<u-form-item label="密码" borderBottom>
				<u-input v-model="signupBody.password" placeholder="请输入密码" border="none" password maxlength="16"
					clearable class="form-input"></u-input>
			</u-form-item>
		</u-form>

		<u-gap height="20"></u-gap>

		<view>
			<u-radio-group v-model="agreementSelect">
				<u-radio name="true">
					<text>我已阅并同意
						<text class="agreement-text" @click="goUserAgreement()">《用户服务协议》</text>
					</text>
				</u-radio>
			</u-radio-group>
		</view>

		<u-gap height="20"></u-gap>

		<u-button @click="signup()" color="#009600" text="注册"></u-button>


		<u-popup :show="imageCaptchaShow" @open="openImageCaptcha" @close="closeImageCaptcha" mode="center" round="10"
			:safeAreaInsetBottom="false">
			<view class="imageCaptcha">
				<u-input v-model="smsCaptchaBody.imageCaptcha" placeholder="请输入验证码" maxlength="4" clearable>
					<image slot="suffix" @click="getImageCaptcha()" :src="imageCaptchaBase64"></image>
				</u-input>

				<u-gap height="20"></u-gap>

				<u-button @click="getSmsCaptcha()" color="#009600" text="提交"></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				signupBody: {
					phone: '',
					captcha: '',
					password: '',
					invitedUid: '',
				},
				agreementSelect: false,
				// 获取短信验证码的按钮文字
				captchaCodeTips: '获取验证码',
				imageCaptchaShow: false,
				imageCaptchaQuery: {
					type: 102
				},
				imageCaptchaBase64: '',
				smsCaptchaBody: {
					type: 102,
					phone: '',
					imageCaptchaKey: '',
					imageCaptcha: '',
				}
			}
		},
		onLoad(option) {
			this.signupBody.invitedUid = option.invitedUid;
		},
		methods: {
			captchaCodeChange(text) {
				this.captchaCodeTips = text;
			},
			showImageCaptcha() {
				if (!this.signupBody.phone) {
					return this.$util.showToast('手机号不能为空');
				}
				if (!/^1[3-9][0-9]{9}$/.test(this.signupBody.phone)) {
					return this.$util.showToast('手机号不正确');
				}
				// 是否可以获取
				if (this.$refs.captchaCode.canGetCode) {
					this.imageCaptchaShow = true;
				}
			},
			openImageCaptcha() {
				this.getImageCaptcha()
			},
			closeImageCaptcha() {
				this.imageCaptchaShow = false;
			},
			getImageCaptcha() {
				this.$api.getImageCaptcha(this.imageCaptchaQuery).then(res => {
					if (res.status) {
						let data = res.data;
						this.smsCaptchaBody.imageCaptchaKey = data.key;
						this.imageCaptchaBase64 = data.base64;
					}
				})
			},
			getSmsCaptcha() {
				this.smsCaptchaBody.phone = this.signupBody.phone;
				this.$api.getSmsCaptcha(this.smsCaptchaBody).then(res => {
					if (res.status) {
						this.$refs.captchaCode.start();
						this.imageCaptchaShow = false;
					} else {
						this.getImageCaptcha();
						this.smsCaptchaBody.imageCaptcha = '';
					}
				})
			},
			signup() {
				if (!this.signupBody.phone) {
					return this.$util.showToast('手机号不能为空');
				}
				if (!/^1[3-9][0-9]{9}$/.test(this.signupBody.phone)) {
					return this.$util.showToast('手机号不正确');
				}
				if (!this.signupBody.captcha) {
					return this.$util.showToast('验证码不能为空');
				}
				if (!this.signupBody.password) {
					return this.$util.showToast('密码不能为空');
				}
				if (!/^.{6,16}$/.test(this.signupBody.password)) {
					return this.$util.showToast('密码长度需要6-16位');
				}
				if (!this.agreementSelect) {
					return this.$util.showToast('请勾选用户协议');
				}
				let body = {
					phone: this.signupBody.phone,
					password: this.$encrypt.encrypt(this.signupBody.password),
					captcha: this.signupBody.captcha,
					invitedUid: this.signupBody.invitedUid
				}
				this.$util.showLoading();
				this.$api.signup(body).then(res => {
					this.$util.hideLoading();
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
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 0 70rpx;

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

		.imageCaptcha {
			width: 80vw;
			padding: 50rpx 30rpx;

			image {
				width: 200rpx;
				height: 80rpx;
			}
		}

	}
</style>