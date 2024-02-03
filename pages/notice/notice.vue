<template>
	<view class="page">
		<u-navbar placeholder autoBack>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">通知列表</text>
		</u-navbar>

		<u-loading-page :loading="loading"></u-loading-page>

		<view v-if="!loading">
			<u-sticky :customNavHeight="tabsHeight" bgColor="#FFF">
				<u-tabs :current="categoryActive" :list="categoryList" @change="changeCategory" lineColor="#009600"></u-tabs>
			</u-sticky>

			<u-gap height="20"></u-gap>

			<view class="body">
				<u-cell-group>
					<u-cell v-if="list.length" v-for="(item, index) in list" :key="index" @click="goDetail(item)"
						:label="timeFormat(item.createTime)">
						<u-text slot="title" :lines="1" :text="item.title"></u-text>
						<!-- 微信小程序不添加这行不显示if中的valuen内容 -->
						<view slot="value"></view>
						<image slot="value" v-if="item.category" :src="item.category.image"></image>
					</u-cell>
				</u-cell-group>
				<view v-if="!list.length" class="empty">
					<u-empty>
					</u-empty>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				categoryActive: 0,
				categoryList: [{
					id: '',
					name: '全部'
				}],
				list: [],
				finish: false,
				query: {
					pageNo: 1,
					categoryId: ''
				},
				tabsHeight: 44
			};
		},
		onPullDownRefresh() {
			this.finish = false;
			this.query.pageNo = 1;
			this.listData(true, () => uni.stopPullDownRefresh());
		},
		onReachBottom() {
			if (this.finish) {
				return;
			}
			this.query.pageNo++;
			this.listData();
		},
		onLoad() {
			this.listNoticeCategory();
			this.listData();
			let info = uni.getSystemInfoSync();
			this.tabsHeight = this.tabsHeight + info.safeAreaInsets.top;
		},
		methods: {
			listNoticeCategory() {
				this.$api.listNoticeCategory().then(res => {
					if (res.status) {
						this.categoryList = [...this.categoryList, ...res.data];
					}
				})
			},
			changeCategory(item) {
				if (this.query.categoryId !== item.id) {
					this.finish = false;
					this.query.categoryId = item.id;
					this.query.pageNo = 1;
					this.listData(true);
				}
			},
			listData(reset, stop) {
				stop && stop()
				this.$api.listNotice(this.query).then(res => {
					this.loading = false;
					if (!res.status) {
						return;
					}
					let data = res.data;
					if (!data.length) {
						this.finish = true;
						return;
					}
					if (reset) {
						this.list = data;
					} else {
						this.list = [...this.list, ...data];
					}
				})
			},
			goDetail(item) {
				uni.navigateTo({
					url: '/pages/notice/info?id=' + item.id
				})
			},
			timeFormat(time) {
				return this.$util.timeFormat(time);
			}
		}
	}
</script>

<style lang="scss">
	.page {
		.body {
			padding: 20rpx 20rpx;

			image {
				border-radius: 10rpx;
				height: 100rpx;
				width: 200rpx;
			}

			.empty {
				height: 60vh;
				display: flex;
				justify-content: center;
			}
		}
	}
</style>