<template>
	<view class="page">
		<u-navbar autoBack placeholder>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">设备信息</text>
		</u-navbar>

		<u-gap height="20"></u-gap>

		<view class="body">
			<u-cell-group>
				<u-cell title="设备名称" :value="device.deviceModel" size="large" isLink>
				</u-cell>
			</u-cell-group>
		</view>
		
		<u-gap height="20"></u-gap>
		
		<view class="body">
			<u-cell-group>
				<u-cell title="平台" :value="device.platform" size="large" isLink>
				</u-cell>
			</u-cell-group>
		</view>

		<u-gap height="20"></u-gap>

		<view class="body">
			<u-cell-group>
				<u-cell title="IP" :value="device.ip" size="large" isLink>
				</u-cell>
			</u-cell-group>
		</view>

		<u-gap height="20"></u-gap>

		<view class="body">
			<u-cell-group>
				<u-cell title="登录时间" :value="formatTime(device.createTime)" size="large" isLink>
				</u-cell>
			</u-cell-group>
		</view>

		<u-gap height="50"></u-gap>

		<u-button v-if="!device.isSelf" @click="deleteDevice()" color="#009600" text="删除设备"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				device: {},
			}
		},
		onLoad(option) {
			this.device = JSON.parse(option.device);
		},
		methods: {
			deleteDevice() {
				uni.showModal({
					content: '确定删除此设备吗？',
					success: (res) => {
						if (res.confirm) {
							this.$api.deleteDevice(this.device.token).then(res => {
								if (res.status) {
									uni.navigateBack();
								}
							})
						}
					}
				});
			},
			formatTime(time) {
				return this.$util.timeFormat(time);
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