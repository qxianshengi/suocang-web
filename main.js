import Vue from 'vue';
import App from './App.vue';
import routes from './config/routes.js';
import store from './config/store.js';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
import VueRouter from 'vue-router';
import VueClipboard from 'vue-clipboard2';
import Layout from './public/layout';
import VueI18n from 'vue-i18n';
import vueResource from 'vue-resource';
import $ from 'jquery';
import Api from './config/api';

Vue.use(iView);
Vue.use(VueClipboard);
Vue.use(VueRouter);
Vue.use(VueI18n);

Vue.prototype.$ajax = axios;
axios.defaults.withCredentials = true;

let router = new VueRouter({
    mode: 'hash',
    routes
});

const i18n = new VueI18n({
    locale: 'zh', // 语言标识
    messages: {
        'zh': require('./assets/lang/zh.js'),
    }
});
//
//
//
Vue.use(vueResource);
Vue.use(VueI18n);
Vue.prototype.host = "http://www.luckynewplan.com:6103";
Vue.prototype.host2 = "http://www.luckynewplan.com:6102";
// Vue.prototype.host = "http://api.bitrade.wxmarket.cn";
Vue.prototype.api = Api;
Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true
Vue.http.options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Content-Type': 'application/json;charset=utf-8'
};



Vue.config.productionTip = false
//

Vue.http.interceptors.push((request, next) => {
  //登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
  let storeToke = localStorage.getItem('TOKEN');
   request.headers.set('x-auth-token', storeToke);
  next((response) => {
        //登录极验证时需获取后台返回的TOKEN值
       var xAuthToken = response.headers.get('x-auth-token');
        if(xAuthToken!=null&&xAuthToken!=''){
           localStorage.setItem('TOKEN', xAuthToken);
     }

      if (response.body.code == '4000' || response.body.code == '3000') {
          store.commit('setMember',null);
          router.push('/login');
         return false;
      }
        return response;
  });
});


new Vue({
    el: '#app',
    router,
    i18n,
    store,
    template: '<Layout/>',
    components: { Layout }
})
