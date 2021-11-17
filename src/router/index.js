import Vue from 'vue';
import Router from 'vue-router';

import Products from '../components/Products';
import Cart from '../components/Cart';

Vue.use(Router);
export default new Router({
    mode: 'history', // default 'hash'
    routes: [
        {
            path: "/",
            component: Products,
        },
        {
            path: "/cart",
            component: Cart
        }
    ]
});

