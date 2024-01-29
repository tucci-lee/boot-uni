<template>
	<view class="page">
		<u-navbar autoBack placeholder>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">昵称</text>
		</u-navbar>

		<u-line></u-line>

		<view class="body">
			<u-input v-model="nickname" placeholder="请输入昵称" border="bottom" maxlength="20" clearable></u-input>
		</view>
		
		<u-gap height="50"></u-gap>
		
		<u-button @click="updateNickname()" color="#009600" text="保存"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				profile: {},
				nickname: '',
			}
		},
		onLoad() {
			this.getProfile();
		},
		methods: {
			getProfile() {
				this.profile = uni.getStorageSync(this.$cache.profile);
				this.nickname = this.profile.nickname;
			},
			updateNickname() {
				if (!this.nickname) {
					return this.$util.showToast('昵称不能为空');
				}
				if (this.profile.nickname === this.nickname) {
					return uni.navigateBack();
				}
				let body = {
					nickname: this.nickname
				}
				this.$api.updateNickname(body).then(res => {
					if (res.status) {
						// 事件发送
						this.profile.nickname = this.nickname;
						uni.$emit(this.$cache.profile, this.profile);

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
	}
</style>