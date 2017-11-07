// vuex requires a Promise polyfill in this browser报错
import 'babel-polyfill'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
{{#router}}
import Router from 'vue-router'
Vue.use(Router)
{{/router}}

import Vuex from 'vuex'
Vue.use(Vuex)

Vue.config.productionTip = false

// js件夹下的 js 文件
window.mixin = {}
(r => {
    r.keys().forEach(r)
})(require.context('./common/', true, /\.js$/));

// 自动注册组件
(r => {
    r.keys().forEach(key => {
        let item = r(key)
        Vue.component(item.name, item)
    })
})(require.context('./components/', true, /.+index\.vue$/));

// 共享目录中的组件、文件
(r => {
    r.keys().forEach(r)
})(require.context('./Public/js/', true, /\.js$/))
(r => {
    r.keys().forEach(key => {
        let item = r(key)
        Vue.component(item.name, item);
    })
})(require.context('./Public/components/', true, /.+index\.vue$/))

window.app = new Vue({
    el: '#app',
    {{#router}}
    router: new Router({
        // mode: 'history',
        routes: (r => {
            return r.keys().map(key => {
                var item = r(key)
                return {
                    path: item.name === 'index' ? `/` : `/${item.name}`,
                    name: item.name,
                    component: item
                }
            });
        })(require.context('./pages/', true, /index\.vue$/))
    }),
    {{/router}}

    template: '<App/>',
    store:new Vuex.Store({
        modules: (r => {
            let result = {}
            r.keys().forEach(key => {
                let item = r(key).default // export defult
                result[item.name] = item
            });
            return result
        })(require.context('./', true, /store\.js$/))
    }), // Vuex
    components: {App: require('./App.vue')}
});
