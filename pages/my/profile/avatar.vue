<template>
	<view class="page">
		<view v-if="!cropperShow">
			<u-navbar @rightClick="openActions()" bgColor="#000" autoBack placeholder>
				<text slot="left" class="icon">&#xe660;</text>
				<text slot="center" class="navbar-title">头像</text>
				<text slot="right" class="icon">&#xe610;</text>
			</u-navbar>

			<image class="avatar" :src="profile.avatar" mode="aspectFit"></image>

			<u-action-sheet :show="actionsShow" :actions="actions" @select="selectAction" @close="closeActions()"
				round="30" cancelText="取消" closeOnClickOverlay closeOnClickAction safeAreaInsetBottom></u-action-sheet>
		</view>
		<view v-else>
			<tui-picture-cropper lockRatio :imageUrl="localImg" @ready="ready" @close="close"
				@cropper="cropper"></tui-picture-cropper>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				profile: {},
				actionsShow: false,
				cropperShow: false,
				localImg: '',
				localImgTem: '',
				// #ifdef APP-PLUS
				actions: [{
					id: 1,
					name: '拍照',
				}, {
					id: 2,
					name: '相册选择',
				}, {
					id: 3,
					name: '保存',
				}]
				// #endif
				// #ifdef H5
				actions: [{
					id: 2,
					name: '选择图片',
				}]
				// #endif
			}
		},
		onLoad() {
			this.getProfile();
		},
		methods: {
			getProfile() {
				this.profile = uni.getStorageSync(this.$cache.profile);
			},
			openActions() {
				this.actionsShow = true;
			},
			closeActions() {
				this.actionsShow = false;
			},
			selectAction(item) {
				if (item.id === 1) {
					uni.chooseImage({
						count: 1,
						sourceType: ['camera'],
						success: (res) => {
							this.localImgTem = res.tempFilePaths[0];
							this.cropperShow = true;
						}
					})
				} else if (item.id === 2) {
					uni.chooseImage({
						count: 1,
						sourceType: ['album'],
						success: (res) => {
							this.localImgTem = res.tempFilePaths[0];
							this.cropperShow = true;
						}
					})
				} else {
					uni.downloadFile({
						url: this.profile.avatar,
						success: (res) => {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: () => {
									this.$util.showToast('保存成功');
								}
							})
						},
					})
				}
			},
			/**
			 * 必须在ready中设置裁剪图片才行
			 */
			ready() {
				this.localImg = this.localImgTem;
			},
			/**
			 * 关闭裁剪
			 */
			close() {
				this.cropperShow = false;
			},
			/**
			 * 生成裁剪
			 */
			cropper(data) {
				// #ifdef H5
				let buffer = uni.base64ToArrayBuffer(data.base64.split(',')[1]);
				let blob = new Blob([buffer], {
					type: 'image/png'
				});
				let file = new File([blob], new Date() + '.png');
				this.$util.showLoading();
				this.$api.updateAvatarH5(file).then(res => {
					this.$util.hideLoading();
					if (res.status) {
						// 事件发送
						this.profile.avatar = res.data;
						uni.$emit(this.$cache.profile, this.profile);
						this.cropperShow = false;
					}
				})
				// #endif
				// #ifdef APP-PLUS
				this.$util.showLoading();
				this.$api.updateAvatarApp(data.url).then(res => {
					this.$util.hideLoading();
					if (res.status) {
						// 事件发送
						this.profile.avatar = res.data;
						uni.$emit(this.$cache.profile, this.profile);
						this.cropperShow = false;
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	.page {
		color: #FFF;
		background-color: #000;
		justify-content: center;

		.avatar {
			width: 100vw;
			height: 100vw;
		}
	}
</style>