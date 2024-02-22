<template>
	<view class="page">
		<u-navbar placeholder autoBack>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">手机号</text>
		</u-navbar>

		<u-gap height="250"></u-gap>

		<u-form labelWidth="80">
			<u-form-item label="手机号" borderBottom>
				<u-input v-model="updatePhoneBody.phone" placeholder="请输入手机号" border="none" maxlength="11"
					clearable></u-input>
			</u-form-item>
			<u-form-item label="验证码" borderBottom>
				<u-input v-model="updatePhoneBody.captcha" placeholder="请输入验证码" border="none" maxlength="4" clearable>
					<template slot="suffix">
						<u-code ref="captchaCode" @change="captchaCodeChange"></u-code>
						<u-button @tap="showImageCaptcha()" color="#009600" :text="captchaCodeTips"></u-button>
					</template>
				</u-input>
			</u-form-item>
		</u-form>

		<u-gap height="20"></u-gap>

		<u-button @click="updatePhone()" color="#009600" text="修改"></u-button>

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
				updatePhoneBody: {
					phone: '',
					captcha: '',
				},
				// 获取短信验证码的按钮文字
				captchaCodeTips: '获取验证码',
				imageCaptchaShow: false,
				imageCaptchaQuery: {
					type: 301
				},
				imageCaptchaBase64: '',
				smsCaptchaBody: {
					type: 301,
					imageCaptchaKey: '',
					imageCaptcha: '',
				}
			}
		},
		methods: {
			captchaCodeChange(text) {
				this.captchaCodeTips = text;
			},
			showImageCaptcha() {
				if (!this.updatePhoneBody.phone) {
					return this.$util.showToast('手机号不能为空');
				}
				if (!/^1[3-9][0-9]{9}$/.test(this.updatePhoneBody.phone)) {
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
				this.smsCaptchaBody.phone = this.updatePhoneBody.phone;
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
			updatePhone() {
				if (!this.updatePhoneBody.phone) {
					return this.$util.showToast('手机号不能为空');
				}
				if (!/^1[3-9][0-9]{9}$/.test(this.updatePhoneBody.phone)) {
					return this.$util.showToast('手机号不正确');
				}

				let body = {
					phone: this.updatePhoneBody.phone,
					captcha: this.updatePhoneBody.captcha,
				}
				this.$util.showLoading();
				this.$api.updatePhone(body).then(res => {
					this.$util.hideLoading();
					if (res.status) {
						uni.navigateBack();
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