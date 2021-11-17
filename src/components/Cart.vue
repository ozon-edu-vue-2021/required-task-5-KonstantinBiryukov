<template>
  <div>
    <h1>Cart</h1>
    <div v-for="product in products" :key="product.id">
      <div> Name: {{ product.dish }}</div>
      <div> Quantity: {{ product.quantity }}</div>
      <button @click="deleteProduct(product.id)">Remove</button>
    </div>
    <div v-if="products.length">
      <div>
        <span>Quantity of all items: </span>
        {{ allItemsQuantity }}
      </div>
      <button @click="checkout">Checkout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  computed: {
    products() {
      return this.$store.state.cartProducts;
    },
    allItemsQuantity() {
      return this.$store.getters.allItemsQuantity;
    }
  },
  methods: {
    deleteProduct(id) {
      this.$store.commit("removeProductFromCart", id)
    },
    checkout() {
      const productsInfo = this.products.map(product => {
        return `${product.dish} : ${product.quantity}`;
      })
      alert(productsInfo);
    }
  }
}
</script>

<style scoped>

</style>