<template>
  <div id="app">
    <ProductsPage/>
  </div>
</template>

<script>
import ProductsPage from './components/ProductsPage';

export default {
  name: 'app',
  components: {
    ProductsPage,
  },
};
</script>

<style>
#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #526173;
  font-size: 17px;;
}

input[type="checkbox"] {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border: 1px solid gray;
    border-radius: 3px;
    line-height: 18px;
    vertical-align: middle;
    cursor: pointer;
    text-align: center;
}
</style>
