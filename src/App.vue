<template>
  <div id="app">
    <ProductsPage />
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

<style lang="scss">
@import '~styles/variables';

#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $base-font-color;
  font-size: 17px;;
}

input[type=checkbox].checkbox {
    position: relative; 
    appearance: none;
    width: 18px;
    height: 18px;
    border: 1px solid $button-border-color;
    border-radius: $border-radius;
    line-height: 18px;
    vertical-align: middle;
    cursor: pointer;
    text-align: center;

    &:checked {
      background-color: $primary-color;
      background-image: url('./assets/check-icon.png');
      background-size: contain;
      border: 1px solid $primary-color;
    }
}
</style>
