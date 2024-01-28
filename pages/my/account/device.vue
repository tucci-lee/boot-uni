<template>
	<view class="page">
		<u-navbar autoBack placeholder>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">设备管理</text>
		</u-navbar>

		<view class="body">
			<u-cell-group>
				<u-cell v-for="(item,index) in list" :key="index" :title="item.deviceModel"
					:value="item.isSelf?'当前设备':''" :url="'/pages/my/account/deviceInfo?device='+JSON.stringify(item)"
					size="large" isLink>
				</u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
			}
		},
		onShow() {
			this.listDevice();
		},
		methods: {
			listDevice() {
				this.$api.listDevice().then(res => {
					if (res.status) {
						this.list = res.data;
					}
				})
			},
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