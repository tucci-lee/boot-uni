<template>
	<view class="page">
		<u-navbar placeholder autoBack>
			<text slot="left" class="icon">&#xe660;</text>
			<text slot="center" class="navbar-title">通知详情</text>
		</u-navbar>
		
		<u-gap height="30"></u-gap>
		
		<h3>{{notice.title}}</h3>
		
		<u-gap height="20"></u-gap>
		
		<rich-text :nodes="notice.content" id="richText"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				notice: '',
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getNotice();
		},
		methods: {
			getNotice() {
				this.$api.getNotice(this.id).then(res => {
					let data = res.data;
					// data.content = data.content.replaceAll("<p>", "<p style='margin:8px 0'>");
					// data.content = data.content.replaceAll("<img ", "<img style='width:100%;' ")
					// data.content = data.content.replaceAll("<img ", "<img style='width:100%;' ")
					this.notice = data;
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 0 30rpx;
		background-color: #FFF;

		h3 {
			text-align: center;
		}
	}
</style>