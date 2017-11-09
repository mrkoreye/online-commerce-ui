<template>
  <div id="app">
    <ProductsPage />
    <div class="link-container">
      <a 
        class="github-link"
        href="http://github.com/mrkoreye/online-commerce-ui">
        Code On GitHub
      </a>
    </div>
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
  font-size: 17px;
  max-width: 1000px;
  margin: 0 auto;
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

.link-container {
  text-align: right;
  margin: 20px 0;
  padding: 9px;

  .github-link {
    color: $base-font-color;
    font-size: 13px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
