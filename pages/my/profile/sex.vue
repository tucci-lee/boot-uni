<template>
	<view class="page">
		<u-navbar autoBack placeholder>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">性别</text>
		</u-navbar>
		<view class="body">
			<u-cell-group>
				<u-cell @click="changeSex(1)" title="男" size="large">
					<view slot="value"></view>
					<text v-if="sex==1" slot="value" class="icon icon-primary">&#xe664;</text>
				</u-cell>
				<u-cell @click="changeSex(0)" title="女" size="large">
					<!-- 微信小程序不添加这行不显示if中的valuen内容 -->
					<view slot="value"></view>
					<text v-if="sex==0" slot="value" class="icon icon-primary">&#xe664;</text>
				</u-cell>
			</u-cell-group>
		</view>
		
		<u-gap height="50"></u-gap>
		
		<u-button @click="updateSex()" color="#009600" text="保存"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				profile: {},
				sex: '',
			}
		},
		onLoad() {
			this.getProfile();
		},
		methods: {
			getProfile() {
				this.profile = uni.getStorageSync(this.$cache.profile);
				this.sex = this.profile.sex;
			},
			changeSex(sex) {
				this.sex = sex;
			},
			updateSex() {
				if (this.sex !== 0 && this.sex !== 1) {
					return this.$util.showToast('性别不能为空');
				}
				if (this.profile.sex === this.sex) {
					return uni.navigateBack();
				}
				let body = {
					sex: this.sex
				}
				this.$util.showLoading();
				this.$api.updateSex(body).then(res => {
					this.$util.hideLoading();
					if (res.status) {
						// 事件发送
						this.profile.sex = this.sex;
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