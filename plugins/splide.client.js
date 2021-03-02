import Vue from 'vue';
import VueSplide from '@splidejs/vue-splide';

Vue.use(VueSplide);
new Vue({
    el: '#app',
    render: h => h(App),
});