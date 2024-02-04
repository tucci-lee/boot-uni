import {
	token,
	profile
} from '@/common/cache.js'

// const baseUrl = 'http://localhost:9000'
const baseUrl = 'https://api.boot.tucci.cc'
const http = uni.$u.http

http.setConfig((config) => {
	config.baseURL = baseUrl;
	config.sslVerify = false;
	return config
})

http.interceptors.request.use((config) => {
	var bearerToken = uni.getStorageSync(token);
	if (bearerToken) {
		config.header.Authorization = "Bearer " + bearerToken;
	}
	let info = uni.getSystemInfoSync();
	// #ifdef APP-PLUS
	let version = info.appWgtVersion;
	// #endif
	// #ifndef APP-PLUS
	let version = info.appVersion;
	// #endif
	config.params.appid = info.appId;
	config.params.version = version;
	config.params.deviceId = info.deviceId;
	config.params.deviceModel = info.deviceModel;
	config.params.platform = info.uniPlatform;
	return config
}, config => {
	return Promise.reject(config)
})

http.interceptors.response.use((response) => {
	const data = response.data;
	if (data.status) {
		return data;
	} else {
		if (data.code == 11111) {
			uni.removeStorageSync(token);
			uni.removeStorageSync(profile);
			// #ifndef MP
			uni.reLaunch({
				url: "/pages/authorize/signin"
			});
			// #endif
			return data;
		}
		if (data.code == 40001) {
			return data;
		}
		uni.showToast({
			icon: 'none',
			title: data.message
		})
		return data;
	}
}, (response) => {
	uni.showToast({
		icon: 'none',
		title: '网络异常，请稍后再试...'
	})
	uni.hideLoading();
	return Promise.reject(response);
})

export default http