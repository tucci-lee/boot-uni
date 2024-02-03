<template>
	<view class="page">
		<u-navbar autoBack placeholder>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">个人信息</text>
		</u-navbar>

		<view class="body">
			<!-- #ifdef MP -->
			<view class="body-avatar">
				<button openType="chooseAvatar" @chooseavatar="updateAvatar" class="body-avatar-btn">
					<u-avatar :src="profile.avatar" size="90">
					</u-avatar>
					<view class="body-avatar-camera">
						<u-icon name="camera" size="30px"></u-icon>
					</view>
				</button>
			</view>
			<!-- #endif -->
			<u-cell-group>
				<!-- #ifndef MP -->
				<u-cell title="头像" url="/pages/my/profile/avatar" size="large" isLink>
					<u-avatar slot="value" :src="profile.avatar" size="60" shape="square"></u-avatar>
				</u-cell>
				<!-- #endif -->
				<u-cell title="昵称" :value="profile.nickname" url="/pages/my/profile/nickname" size="large" isLink>
				</u-cell>
				<u-cell title="性别" :value="profile.sex===1?'男':profile.sex===0?'女':''" url="/pages/my/profile/sex"
					size="large" isLink>
				</u-cell>
				<u-cell title="生日" :value="profile.birthday" @click="openBirthday()" size="large" isLink>
				</u-cell>
				<u-cell title="地区" :value="profile.regionName" url="/pages/my/profile/region" size="large" isLink>
				</u-cell>
				<u-cell title="简介" :value="profile.introduction" url="/pages/my/profile/introduction" size="large"
					isLink>
				</u-cell>
			</u-cell-group>
		</view>

		<u-datetime-picker :show="birthdayShow" v-model="birthday" @cancel="closeBirthday" @close="closeBirthday"
			@confirm="updateBirthday" mode="date" :maxDate="new Date().getTime()" :minDate="0" confirmColor="#009600"
			closeOnClickOverlay></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				profile: {},
				birthdayShow: false,
				birthday: '',
			}
		},
		onLoad() {
			this.getProfile();
			this.on();
		},
		onUnload() {
			uni.$off(this.$cache.profile);
		},
		methods: {
			on() {
				uni.$on(this.$cache.profile, (data) => {
					this.profile = data;
					uni.setStorageSync(this.$cache.profile, data);
				})
			},
			getProfile() {
				this.profile = uni.getStorageSync(this.$cache.profile);
			},
			openBirthday() {
				if (this.profile.birthday) {
					this.birthday = this.profile.birthday;
				} else {
					this.birthday = new Date().getTime();
				}
				this.birthdayShow = true;
			},
			closeBirthday() {
				this.birthdayShow = false;
			},
			updateBirthday(data) {
				if (this.birthday === data.value) {
					this.birthdayShow = false;
				} else {
					let birthday = this.$util.timeFormat(data.value, 'yyyy-mm-dd');
					let body = {
						birthday: birthday
					}
					this.$util.showLoading();
					this.$api.updateBirthday(body).then(res => {
						this.$util.hideLoading();
						if (res.status) {
							this.profile.birthday = birthday;
							this.birthdayShow = false;
						}
					})
				}
			},
			updateAvatar(response) {
				this.$util.showLoading();
				this.$api.updateAvatarApp(response.detail.avatarUrl).then(res => {
					this.$util.hideLoading();
					if (res.status) {
						// 事件发送
						this.profile.avatar = res.data;
						uni.$emit(this.$cache.profile, this.profile);
						this.cropperShow = false;
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

			.body-avatar {
				height: 300rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.body-avatar-btn {
					height: 90px;
					width: 90px;
					border-radius: 50%;
					padding: 0;
					background-color: #FFF;
				}

				.body-avatar-btn:after {
					border-color: #FFF;
				}

				.body-avatar-camera {
					position: relative;
					left: 50px;
					top: -30px;
					background-color: #d3d4d6;
					border-radius: 50%;
					width: 30px;
				}
			}
		}
	}
</style>