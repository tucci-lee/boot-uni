<template>
	<view class="page">
		<u-navbar placeholder autoBack>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">实名认证</text>
		</u-navbar>

		<u-gap height="150"></u-gap>

		<u-form labelWidth="80">
			<u-form-item label="姓名" borderBottom>
				<u-input v-model="updateRealBody.realName" placeholder="请输入姓名" border="none" maxlength="50"
					clearable></u-input>
			</u-form-item>
			<u-form-item label="身份证" borderBottom>
				<u-input v-model="updateRealBody.idCard" placeholder="请输入身份证" border="none" maxlength="18" clearable
					type="idcard"></u-input>
			</u-form-item>
		</u-form>

		<u-gap height="50"></u-gap>

		<u-button @click="updateReal()" color="#009600" text="保存"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				updateRealBody: {
					realName: '',
					idCard: '',
				},
			}
		},
		methods: {
			updateReal() {
				if (!this.updateRealBody.realName) {
					return this.$util.showToast('姓名不能为空');
				}
				if (!this.updateRealBody.idCard) {
					return this.$util.showToast('身份证不能为空');
				}
				if (this.updateRealBody.idCard.length != 18) {
					return this.$util.showToast('身份证格式错误');
				}
				let body = {
					realName: this.updateRealBody.realName,
					idCard: this.updateRealBody.idCard,
				}
				this.$util.showLoading();
				this.$api.createReal(body).then(res => {
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
	}
</style>