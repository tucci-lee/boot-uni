import App from './App'

import Vue from 'vue'
import './uni.promisify.adaptor'
// uview
import uView from 'uview-ui'
Vue.use(uView)
// 工具包
import util from '@/common/util.js'
Vue.prototype.$util = util
// api
import api from '@/common/api.js'
Vue.prototype.$api = api
// 事件总线
import event from '@/common/event.js'
Vue.prototype.$event = event
// 缓存
import * as cache from '@/common/cache.js'
Vue.prototype.$cache = cache
// 加密
import encrypt from '@/common/encrypt.js'
Vue.prototype.$encrypt = encrypt

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()