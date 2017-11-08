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
      <img class="search-icon" src="./../assets/search-icon.svg">
      <input type="text" placeholder="Search..." />
    </div>
    <ProductsTable/>
  </div>
</template>

<script>
import ProductsTable from './ProductsTable';

export default {
  name: 'ProductsPage',
  components: {
    ProductsTable,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
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
  height: 40px;
  line-height: 40px;
  text-align: center;
  padding: 0 20px;
  cursor: pointer;
  margin: 0 7px;

  &.primary {
    background: $primary-blue;
    color: white;
    border: 1px solid $primary-blue;
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
    height: 40px;
    line-height: 40px;
    padding-left: 60px;
    font-size: 17px;
  }
}
</style>
