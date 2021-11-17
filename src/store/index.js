import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//  https://random-data-api.com/api/food/random_food?size=30
const RANDOM_DATA_URL = "https://random-data-api.com"

export default new Vuex.Store({
    state: {
        products: [],
        cartProducts: []
    },
    mutations: {
        setProducts(state, payload) {
            state.products = payload;
        },
        addProductToCart(state, id) {
            const product = state.products.find(product => product.id === id);
            const index = state.cartProducts.findIndex(product => product.id === id);

            // Is this Product already in the Cart ?
            if (index === -1) {
                product["quantity"] = 1;
                state.cartProducts.push(product);
            } else {
                product["quantity"] += 1;
                state.cartProducts[index] = product;
            }
        },
        removeProductFromCart(state, id) {
            const product = state.cartProducts.find(product => product.id === id);
            const index = state.cartProducts.findIndex(product => product.id === id);

            state.cartProducts.splice(index, 1);

            if (product["quantity"] > 1) {
                product["quantity"] -= 1;
                state.cartProducts.push(product);
            }
        }
    },
    actions: {
        async getProducts({commit}) {
            const randomProductsUrl = new URL("/api/food/random_food", RANDOM_DATA_URL);
            randomProductsUrl.searchParams.set("size", "30");
            const random30Products = await fetch(randomProductsUrl.toString());
            const products = await random30Products.json();
            // add random Price to each product
            products.forEach(product => {
                product.price = Math.floor(Math.random() * 1000);
            });
            commit("setProducts", products);
        }
    },
    getters: {
        allItemsQuantity(state) {
            return state.cartProducts.reduce((acc, item) => {
                return acc + item.quantity
            }, 0)
        },
        totalPrice(state) {
            return state.cartProducts.reduce((acc, item) => {
                return acc + (item.quantity * item.price);
            }, 0)
        }
    }
});
