module.exports = {
	showToast: (title, icon) => {
		uni.showToast({
			icon: icon || 'none',
			title: title
		})
	},
	hideLoading: () => {
		uni.hideLoading();
	},
	showLoading: (title) => {
		uni.showLoading({
			title: title || '加载中...',
		})
	},
	timeFormat: (time, format) => {
		return uni.$u.timeFormat(parseInt(time), format || 'yyyy-mm-dd hh:MM:ss');
	},
}