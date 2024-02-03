<template>
	<view class="page">
		<u-navbar autoBack placeholder>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">简介</text>
		</u-navbar>
		<u-textarea v-model="introduction" placeholder="请输入内容" count maxlength="200" height="150"></u-textarea>
		
		<u-gap height="50"></u-gap>
		
		<u-button @click="updateIntroduction()" color="#009600" text="保存"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				profile: {},
				introduction: '',
			}
		},
		onLoad() {
			this.getProfile();
		},
		methods: {
			getProfile() {
				this.profile = uni.getStorageSync(this.$cache.profile);
				this.introduction = this.profile.introduction;
			},
			updateIntroduction() {
				if (this.profile.introduction === this.introduction) {
					return uni.navigateBack();
				}
				let body = {
					introduction: this.introduction
				}
				this.$util.showLoading();
				this.$api.updateIntroduction(body).then(res => {
					this.$util.hideLoading();
					if (res.status) {
						// 事件发送
						this.profile.introduction = this.introduction;
						uni.$emit(this.$cache.profile, this.profile);

						uni.navigateBack();
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}
</style>