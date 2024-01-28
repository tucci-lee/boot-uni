<template>
	<view class="page">
		<u-navbar placeholder>
			<view slot="left"></view>
			<text slot="center" class="navbar-title">首页</text>
		</u-navbar>

		<u-swiper :list="bannerList" @click="goBannerUrl" height="200" radius="10" keyName="image" interval="5000"
			indicator circular></u-swiper>

		<u-gap height="20"></u-gap>

		<u-notice-bar :text="noticeTitle" speed="30" @click="goNotice"></u-notice-bar>

		<u-gap height="20"></u-gap>

		<view class="body">
			<h2>欢迎使用Boot</h2>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: [],
				noticeList: [],
				noticeTitle: '',
			}
		},
		onLoad() {
			this.listBanner();
			this.listNotice();
		},
		methods: {
			listBanner() {
				this.$api.listBanner().then(res => {
					if (res.status) {
						this.bannerList = res.data;
					}
				})
			},
			listNotice() {
				this.$api.listNotice().then(res => {
					if (res.status) {
						this.noticeList = res.data;
						this.noticeTitle = this.noticeList[0].title;
					}
				})
			},
			goBannerUrl(index) {
				let banner = this.bannerList[index];
				if (banner.url) {
					uni.navigateTo({
						url: '/pages/webview/index?src=' + banner.url + '&title=' + banner.title,
					})
				}
			},
			goNotice() {
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 20rpx 20rpx;

		.body {
			display: flex;
			justify-content: center;
		}
	}
</style>