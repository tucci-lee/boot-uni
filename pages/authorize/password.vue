<template>
	<view class="page">
		<u-navbar placeholder autoBack>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">找回密码</text>
		</u-navbar>

		<u-gap height="250"></u-gap>

		<u-form labelWidth="80">
			<u-form-item label="手机号" borderBottom>
				<u-input v-model="passwordBody.phone" placeholder="请输入手机号" border="none" type="number" maxlength="11"
					clearable></u-input>
			</u-form-item>
			<u-form-item label="验证码" borderBottom>
				<u-input v-model="passwordBody.captcha" placeholder="请输入验证码" border="none" maxlength="4" clearable>
					<template slot="suffix">
						<u-code ref="smsCode" @change="smsCodeChange"></u-code>
						<u-button @tap="showImageCaptcha()" color="#009600" :text="smsCodeTips"></u-button>
					</template>
				</u-input>
			</u-form-item>
			<u-form-item label="密码" borderBottom>
				<u-input v-model="passwordBody.password" placeholder="请输入密码" border="none" password maxlength="16"
					clearable></u-input>
			</u-form-item>
		</u-form>

		<u-gap height="20"></u-gap>

		<u-button @click="password()" color="#009600" text="找回密码"></u-button>

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
				passwordBody: {
					phone: '',
					captcha: '',
					password: '',
				},
				// 获取短信验证码的按钮文字
				smsCodeTips: '获取验证码',
				imageCaptchaShow: false,
				imageCaptchaQuery: {
					type: 201
				},
				imageCaptchaBase64: '',
				smsCaptchaBody: {
					type: 201,
					phone: '',
					imageCaptchaKey: '',
					imageCaptcha: '',
				}
			}
		},
		methods: {
			smsCodeChange(text) {
				this.smsCodeTips = text;
			},
			showImageCaptcha() {
				if (!this.passwordBody.phone) {
					return this.$util.showToast('手机号不能为空');
				}
				if (!/^1[3-9][0-9]{9}$/.test(this.passwordBody.phone)) {
					return this.$util.showToast('手机号不正确');
				}
				// 是否可以获取
				if (this.$refs.smsCode.canGetCode) {
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
				this.smsCaptchaBody.phone = this.passwordBody.phone;
				this.$api.getSmsCaptcha(this.smsCaptchaBody).then(res => {
					if (res.status) {
						this.$refs.smsCode.start();
						this.imageCaptchaShow = false;
					} else {
						this.getImageCaptcha();
						this.smsCaptchaBody.imageCaptcha = '';
					}
				})
			},
			password() {
				if (!this.passwordBody.phone) {
					return this.$util.showToast('手机号不能为空');
				}
				if (!/^1[3-9][0-9]{9}$/.test(this.passwordBody.phone)) {
					return this.$util.showToast('手机号不正确');
				}
				if (!this.passwordBody.captcha) {
					return this.$util.showToast('验证码不能为空');
				}
				if (!this.passwordBody.password) {
					return this.$util.showToast('密码不能为空');
				}
				if (!/^.{6,16}$/.test(this.passwordBody.password)) {
					return this.$util.showToast('密码长度需要6-16位');
				}
				let body = {
					phone: this.passwordBody.phone,
					password: this.$encrypt.encrypt(this.passwordBody.password),
					captcha: this.passwordBody.captcha
				}
				this.$util.showLoading();
				this.$api.password(body).then(res => {
					this.$util.hideLoading();
					if (res.status) {
						uni.navigateTo({
							url: '/pages/authorize/signin'
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 0 70rpx;

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