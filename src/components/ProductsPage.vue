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
      <input type="text" placeholder="Search..." />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<style lang="scss" scoped>
.products-page-container {
  position: relative;
  margin: 30px auto;
  width: 900px;
  padding: 20px 40px;
  border: 1px solid #d6d6d6;
  border-radius: 3px;
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
  border: 1px solid #b7bec6;
  border-radius: 3px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  padding: 0 20px;
  cursor: pointer;
  margin: 0 7px;

  &.primary {
    background: #0a5bfe;
    color: white;
    border: 1px solid #0a5bfe;
  }
}

.search-container {
  input {
    border: 1px solid #b7bec6;
    border-radius: 3px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    font-size: 17px;
  }
}
</style>
