import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'lib-flexible/flexible'

import axios from 'axios'
import VueAxios from 'vue-axios'

//高德
import AMap from 'vue-amap';

Vue.use(VueAxios, axios)


import {
         Button,
         Form,
         Field,
         Divider,
         Popup,
         Toast,
         Tabbar, 
         TabbarItem,
         CellGroup,
         ActionSheet,
         Cell,
         NavBar,
         Icon,
         SwipeItem,
         Swipe,
         Lazyload,
         Dialog,
         GridItem,
         Grid,
         Calendar,
         DatetimePicker,
         Picker,


                } from 'vant'

Vue
  .use(Button)
  .use(Form)
  .use(Field)
  .use(Divider)
  .use(Popup)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(CellGroup)
  .use(ActionSheet)
  .use(Cell)
  .use(NavBar)
  .use(Icon)
  .use(SwipeItem)
  .use(Swipe)
  .use(Lazyload)
  .use(Dialog)
  .use(GridItem)
  .use(Grid)
  .use(Calendar)
  .use(DatetimePicker)
  .use(Picker)



  Vue.use(AMap);

  // 初始化vue-amap
  AMap.initAMapApiLoader({
    // 高德key
    key: '834315e774200bbe8dcecba076abb705',
    // 插件集合 （插件按需引入）
    plugin: ['AMap.Geolocation']
  });

//设置Vue原型属性
Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

//配置请求基础路径
// axios.defaults.baseURL = 'http://www.kangliuyong.com:10002';

//axios拦截器，在发起请求之前执行
axios.interceptors.request.use(config => {

  //处理post请求参数, 进行参数序列化
  if (config.method == 'post') {

    //序列化post请求参数
    let paramsString = '';
    for (let key in config.data) {
      paramsString += `${key}=${config.data[key]}&`;
    }

    //重新赋值config.data
    config.data = paramsString.slice(0, -1);

    // console.log('config.data ==> ', config.data);

  }

  //必须返回config
  return config;
})




Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
