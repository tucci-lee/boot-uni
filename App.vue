<script>
	export default {
		onLaunch: function() {},
		onShow: function() {

		},
		onHide: function() {}
	}
</script>

<style lang="scss">
	// uview
	@import "uview-ui/index.scss";

	/*每个页面公共css */
	html,
	body,
	page {
		background-color: #FAFAFA;
	}

	@font-face {
		font-family: 'iconfont';
		src: url('/static/ttf/icon.ttf') format('truetype');
	}

	.page {
		font-size: 14px;

		.safe-top {
			padding-top: var(--status-bar-height);
			background-color: #FFF;
		}

		.icon {
			font-family: iconfont;
			font-size: 40rpx;
			font-weight: 700;
		}

		.navbar-title {
			font-size: 18px;
			font-weight: 500;
		}

		.icon-primary {
			color: #009600;
		}
	}

	::v-deep .u-input {
		height: 80rpx;
	}
</style>