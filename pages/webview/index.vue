<template>
	<view class="page">
		<view>
			<web-view :src="src"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				title: '',
			}
		},
		onLoad(option) {
			this.src = option.src;
			this.title = option.title;
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	

	.page {}
</style>