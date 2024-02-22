<template>
	<view class="page">
		<u-navbar placeholder autoBack>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">邮箱</text>
		</u-navbar>

		<u-gap height="250"></u-gap>

		<u-form labelWidth="80">
			<u-form-item label="邮箱" borderBottom>
				<u-input v-model="updateEmailBody.email" placeholder="请输入邮箱" border="none" maxlength="50"
					clearable></u-input>
			</u-form-item>
			<u-form-item label="验证码" borderBottom>
				<u-input v-model="updateEmailBody.captcha" placeholder="请输入验证码" border="none" maxlength="4" clearable>
					<template slot="suffix">
						<u-code ref="captchaCode" @change="captchaCodeChange"></u-code>
						<u-button @tap="showImageCaptcha()" color="#009600" :text="captchaCodeTips"></u-button>
					</template>
				</u-input>
			</u-form-item>
		</u-form>

		<u-gap height="20"></u-gap>

		<u-button @click="updateEmail()" color="#009600" text="修改"></u-button>

		<u-popup :show="imageCaptchaShow" @open="openImageCaptcha" @close="closeImageCaptcha" mode="center" round="10"
			:safeAreaInsetBottom="false">
			<view class="imageCaptcha">
				<u-input v-model="emailCaptchaBody.imageCaptcha" placeholder="请输入验证码" maxlength="4" clearable>
					<image slot="suffix" @click="getImageCaptcha()" :src="imageCaptchaBase64"></image>
				</u-input>

				<u-gap height="20"></u-gap>

				<u-button @click="getEmailCaptcha()" color="#009600" text="提交"></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				updateEmailBody: {
					email: '',
					captcha: '',
				},
				// 获取短信验证码的按钮文字
				captchaCodeTips: '获取验证码',
				imageCaptchaShow: false,
				imageCaptchaQuery: {
					type: 401
				},
				imageCaptchaBase64: '',
				emailCaptchaBody: {
					type: 401,
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
				if (!this.updateEmailBody.email) {
					return this.$util.showToast('邮箱不能为空');
				}
				if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.updateEmailBody.email)) {
					return this.$util.showToast('邮箱格式不正确');
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
						this.emailCaptchaBody.imageCaptchaKey = data.key;
						this.imageCaptchaBase64 = data.base64;
					}
				})
			},
			getEmailCaptcha() {
				this.emailCaptchaBody.email = this.updateEmailBody.email;
				this.$api.getEmailCaptcha(this.emailCaptchaBody).then(res => {
					if (res.status) {
						this.$refs.captchaCode.start();
						this.imageCaptchaShow = false;
					} else {
						this.getImageCaptcha();
						this.emailCaptchaBody.imageCaptcha = '';
					}
				})
			},
			updateEmail() {
				if (!this.updateEmailBody.email) {
					return this.$util.showToast('邮箱不能为空');
				}
				if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.updateEmailBody.email)) {
					return this.$util.showToast('邮箱格式不正确');
				}
				if (!this.updateEmailBody.captcha) {
					return this.$util.showToast('验证码不能为空');
				}
				let body = {
					email: this.updateEmailBody.email,
					captcha: this.updateEmailBody.captcha,
				}
				this.$util.showLoading();
				this.$api.updateEmail(body).then(res => {
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