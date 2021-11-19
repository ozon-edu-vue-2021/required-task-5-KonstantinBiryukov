<template>
  <div>
    <router-link to="cart">
      <CartButton/>
    </router-link>
    <div class="product-list">
      <div class="card" v-for="product in products" :key="product.id">
        <img :src="getRandomImage()" alt="food" style="width:100%">
        <div class="container">
          <h4><b>Name: {{ product.dish }}</b></h4>
          <p> Price: {{ product.price }}</p>
        </div>
        <button @click="addProduct(product.id)">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import {images} from "@/store/images";
import CartButton from "./CartButton";

export default {
  name: "Products",
  components: {CartButton},
  data() {
    return {
      products: [],
      images: images
    }
  },
  async mounted() {
    await this.$store.dispatch("getProducts");
    this.products = this.$store.state.products;
  },
  methods: {
    getRandomImage() {
      let src = images[0].src;
      const imagesLength = images.length;
      images.forEach(image => {
        const randomId = Math.floor(Math.random() * (imagesLength + 1));
        if (randomId === image.id) {
          src = image.src;
        }
      });
      return require("../assets/images/" + src);
    },
    addProduct(id) {
      this.$store.commit("addProductToCart", id);
      console.log("Product is added: " + id);
    }
  }
}
</script>

<style scoped>
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  float: left;
  width: 23%;
  padding: 10px 10px;
  margin: 5px;
  height: 40%;
}


/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
</style>