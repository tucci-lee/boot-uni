<template>
	<view class="page">
		<u-navbar autoBack placeholder>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">选择地区</text>
		</u-navbar>

		<view class="body">
			<u-cell-group v-if="pid==0">
				<u-cell v-for="(item, index) in regions" :key="index" :title="item.name"
					:url="'/pages/my/profile/region?pid='+item.id" size="large" isLink>
				</u-cell>
			</u-cell-group>
			<u-cell-group v-else>
				<u-cell v-for="(item, index) in regions" :key="index" :title="item.name" @click="updateRegion(item)"
					size="large">
				</u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {
		regions
	} from '@/common/region.js'
	export default {
		data() {
			return {
				pid: 0,
				regions: [],
				pRegion: {},
			}
		},
		onLoad(option) {
			if (option.pid) {
				this.pid = option.pid;
			}
			this.getRegions();
		},
		methods: {
			getRegions() {
				this.regions = regions.filter(e => {
					if (e.id == this.pid) {
						this.rRegion = e;
					}
					return e.pid == this.pid;
				})
			},
			updateRegion(region) {
				let body = {
					country: "CN",
					regionCode: region.code,
					regionName: this.rRegion.name + "." + region.name
				}
				this.$util.showLoading();
				this.$api.updateRegion(body).then(res => {
					this.$util.hideLoading();
					if (res.status) {
						// 事件发送
						let profile = uni.getStorageSync(this.$cache.profile);
						profile.regionCode = body.regionCode;
						profile.regionName = body.regionName;
						uni.$emit(this.$cache.profile, profile);

						uni.navigateBack({
							delta: 2
						})
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