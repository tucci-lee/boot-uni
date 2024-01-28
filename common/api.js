import http from '@/common/http.js'

module.exports = {
	getImageCaptcha: (query) => http.get('/passport/captcha/image', {
		params: query
	}),
	getSmsCaptcha: (body) => http.post('/passport/captcha/sms', body),
	getEmailCaptcha: (body) => http.post('/passport/captcha/email', body),
	signup: (body) => http.post('/passport/signup', body),
	signin: (body) => http.post('/passport/signin', body),
	quickSignin: (body) => http.post('/passport/signin/quick', body),
	signout: () => http.post('/passport/signout'),
	signoff: () => http.post('/passport/signoff'),
	getAccount: () => http.get('/passport/account'),
	password: (body) => http.put('/passport/password', body),
	updateUsername: (body) => http.put('/passport/username', body),
	updatePhone: (body) => http.put('/passport/phone', body),
	updateEmail: (body) => http.put('/passport/email', body),
	listDevice: (query) => http.get('/passport/device', {
		params: query
	}),
	deleteDevice: (token) => http.delete('/passport/device/' + token),
	createReal: (body) => http.post('/passport/real', body),
	weixinAppletSignin: (body) => http.post('/passport/signin/weixin/applet', body),
	weixinAppletSignup: (body) => http.post('/passport/signup/weixin/applet', body),

	getProfile: () => http.get('/profile'),
	updateAvatarH5: (file) => http.upload('/profile/avatar', {
		file: file
	}),
	updateAvatarApp: (filePath) => http.upload('/profile/avatar', {
		filePath: filePath,
		name: 'file'
	}),
	updateNickname: (body) => http.put('/profile/nickname', body),
	updateSex: (body) => http.put('/profile/sex', body),
	updateBirthday: (body) => http.put('/profile/birthday', body),
	updateRegion: (body) => http.put('/profile/region', body),
	updateIntroduction: (body) => http.put('/profile/introduction', body),

	
	listBanner: (query) => http.get('/basic/banner', {
		params: query
	}),
	listNoticeCategory: (query) => http.get('/basic/notice/category', {
		params: query
	}),
	listNotice: (query) => http.get('/basic/notice', {
		params: query
	}),
	getNotice: (id) => http.get('/basic/notice/' + id),
}