<template>
  <div class="products-page-container">
    <div class="header-container">
      <h1>Products</h1>
      <div class="product-actions-container">
        <div class="button">Export</div>
        <div class="button">Import</div>
        <div class="button primary">Add Product</div>
      </div>
    </div>
    <div class="search-container">
      <img 
        class="search-icon" 
        src="./../assets/search-icon.svg">
      <input
        v-model="searchQuery" 
        type="text" 
        placeholder="Search..." />
    </div>
    <ProductsTable :products="filteredProducts" />
  </div>
</template>

<script>
import ProductsTable from './ProductsTable';
import productData from './../mock-data/products';
import Events from './../event-bus';

const WORD_REGEX = /\w+/g;
const PRICE_REGEX = /\$\d+\.*\d*/g;

export default {
  name: 'ProductsPage',
  components: {
    ProductsTable,
  },
  mounted() {
    this.events.bus.$on(this.events.names.updateProduct, (editProduct) => {
      const foundProduct = this.allProducts.find(product => product.id === editProduct.id);

      if (foundProduct) {
        Object.assign(foundProduct, editProduct);
      }
    });
  },
  beforeDestroy() {
    this.events.bus.$off(this.events.names.updateProduct);
  },
  data() {
    return {
      searchQuery: '',
      allProducts: productData,
      events: Events,
    };
  },
  computed: {
    filteredProducts() {
      const trimmedQueryInput = this.searchQuery
        .trim()
        .toLowerCase()
        .normalize();

      // If no searchQuery, bypass any filtering
      if (!trimmedQueryInput) {
        return this.allProducts;
      }

      // Break the searchQuery input into individual words,
      // and first remove any price data e.g. $34
      const textData = trimmedQueryInput.replace(PRICE_REGEX, '').match(WORD_REGEX);

      // Extract any price data (numbers prefixed with $)
      // Requiring the user to use $ for price data allows for searching
      // of products that have numbers in their name.
      // Their are probably better ways to do this,
      // but in order to keep this search algorithim relatively simple
      // we are requring users to use $ to indicate price
      const priceData = trimmedQueryInput.match(PRICE_REGEX);

      // Bail and just return unfiltered product data if
      // there is not valid info taken from the searchQuery
      if (!textData && !priceData) {
        return this.allProducts;
      }

      // Consider debouncing searchQuery input
      // to prevent too much intense filtering
      const filteredProducts = this.allProducts.filter((product) => {
        const productName = product.name &&
          product.name.toLowerCase().trim().normalize();

        // Convert product price to a whole number (round down), since most
        // people think in terms of whole dollar amounts when searching
        const productPriceRounded = Math.floor(product.price);

        // Do not return product in query if it doesn't have a name or price
        if (!productName || !productPriceRounded) {
          return false;
        }

        let queryMatchesName = false;
        let priceMatchesProduct = false;

        if (textData) {
          queryMatchesName = textData.every((substring) => {
            const productNamePresent = productName.indexOf(substring) !== -1;
            return productNamePresent;
          });
        } else {
          // Set to true if there is not any textData to parse
          queryMatchesName = true;
        }

        if (priceData) {
          priceMatchesProduct = priceData.every((searchPrice) => {
            const trimmedSearchPrice = searchPrice.replace('$', '');
            const parsedPrice = Math.floor(parseInt(trimmedSearchPrice, 10));
            const priceMatches = parsedPrice === productPriceRounded;
            return priceMatches;
          });
        } else {
          // Set to true if there is not any price data to parse
          priceMatchesProduct = true;
        }

        return queryMatchesName && priceMatchesProduct;
      });

      return filteredProducts;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.products-page-container {
  position: relative;
  margin: 30px auto;
  width: 900px;
  padding: 20px 40px;
  border: 1px solid #d6d6d6;
}

.header-container {
  line-height: 50px;
  margin-bottom: 30px;
}

h1 {
  color: black;
  font-weight: normal;
  display: inline-block;
  margin: 0;
  font-size: 1.5em;
}

.product-actions-container {
  display: inline-block;
  position: absolute;
  right: 40px;
}

.button {
  display: inline-block;
  border: 1px solid $button-border-color;
  border-radius: $border-radius;
  height: $button-height;
  line-height: $button-height;
  text-align: center;
  padding: 0 20px;
  cursor: pointer;
  margin: 0 6px;

  &.primary {
    background: $primary-color;
    color: white;
    border: 1px solid $primary-color;
  }
}

.search-container {
  position: relative;

  .search-icon {
    position: absolute;
    top: 12px;
    left: 30px;
    width: 20px;
    height: 20px;
    opacity: 0.6;
  }

  input {
    border: 1px solid $button-border-color;
    border-radius: $border-radius;
    height: $button-height;
    line-height: $button-height;
    padding-left: 60px;
    font-size: 17px;
  }
}
</style>
