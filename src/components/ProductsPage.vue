<template>
  <div class="products-page-container">
    <div class="header-container">
      <h1>Products</h1>
      <div class="loader-container">
        <div
          v-if="isLoading"
          class="loader">
        </div>
      </div>
      <div class="product-actions-container">
        <AppButton
          :click-event-name="events.names.clickExport"
          text="Export"/>
        <AppButton
          :click-event-name="events.names.clickImport"
          text="Import"/>
        <AppButton
          :click-event-name="events.names.clickAddProduct"
          class="primary"
          text="Add Product"/>
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
import Events from './../event-bus';
import AppButton from './AppButton';
import ProductApi from './../services/product-api';

// Regex to capture word groups and use for searching
const WORD_REGEX = /\w+/g;

// Regex to extract any price data (numbers prefixed with $)
// Requiring the user to use $ for price data allows for searching
// of products that have numbers in their name.
// Their are probably better ways to do this,
// but in order to keep this search algorithim relatively simple
// we are requring users to use $ to indicate price
const PRICE_REGEX = /\$\d+\.*\d*/g;

export default {
  name: 'ProductsPage',
  components: {
    ProductsTable,
    AppButton,
  },

  data() {
    return {
      searchQuery: '',
      allProducts: [],
      events: Events,
      productApi: new ProductApi(),
      isLoading: true,
    };
  },

  computed: {
    trimmedQueryInput() {
      return this.searchQuery.trim().toLowerCase().normalize() || '';
    },

    searchQueryTextData() {
      // Break the searchQuery input into individual words,
      // and first remove any price data e.g. $34
      return this.trimmedQueryInput.replace(PRICE_REGEX, '').match(WORD_REGEX);
    },

    searchQueryPriceData() {
      return this.trimmedQueryInput.match(PRICE_REGEX);
    },

    filteredProducts() {
      // Bail and just return unfiltered product data if
      // there is not valid info taken from the searchQuery
      if (!this.searchQueryTextData && !this.searchQueryPriceData) {
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

        return this.queryMatchesName(productName) &&
          this.queryMatchesPrice(productPriceRounded);
      });

      return filteredProducts;
    },
  },

  mounted() {
    this.productApi.getAllProducts().then((response) => {
      this.allProducts = response.data;
      this.isLoading = false;
    });

    this.events.bus.$on(this.events.names.updateProduct, (editProduct) => {
      this.isLoading = true;
      const foundProduct = this.allProducts.find(product => product.id === editProduct.id);

      if (foundProduct) {
        Object.assign(foundProduct, editProduct);

        this.productApi.updateProduct(foundProduct).then(() => {
          this.isLoading = false;
        });
      } else {
        this.allProducts.push(editProduct);
        this.events.bus.$emit(this.events.names.newProductAdded);
        this.productApi.createProduct(editProduct).then(() => {
          this.isLoading = false;
        });
      }
    });
  },

  beforeDestroy() {
    this.events.bus.$off(this.events.names.updateProduct);
  },

  methods: {
    queryMatchesName(productName) {
      if (!this.searchQueryTextData) {
        // Return true if there is not any textData to parse
        return true;
      }

      return this.searchQueryTextData.every((substring) => {
        const productNamePresent = productName.indexOf(substring) !== -1;
        return productNamePresent;
      });
    },

    queryMatchesPrice(productPriceRounded) {
      if (!this.searchQueryPriceData) {
        // Return true if there is not any priceData to parse
        return true;
      }

      return this.searchQueryPriceData.every((searchPrice) => {
        const trimmedSearchPrice = searchPrice.replace('$', '');
        const parsedPrice = Math.floor(parseInt(trimmedSearchPrice, 10));
        const priceMatches = parsedPrice === productPriceRounded;
        return priceMatches;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~styles/variables';
@import '~styles/loader';

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

.loader-container {
  position: absolute;
  top: 16px;
  left: 180px;
}
</style>
