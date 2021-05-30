import Vue from 'vue'
import vuetify from './vuetify';
import App from './App.vue';
import router from "./router";
import {store} from './store/index';

new Vue({
    store,
    vuetify,
    router,
    render: h => h(App),
    el: '#app',
});