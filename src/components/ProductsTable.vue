<template>
  <table>
    <tr>
      <th>
        <input class="checkbox" type="checkbox" />
      </th>
      <th class="name caret" >Name</th>
      <th class="caret">Type</th>
      <th class="right caret">Price</th>
      <th class="right caret">Inventory</th>
    </tr>
    <ProductTableRow v-for="product in products" :key="product.id" :product="product"></ProductTableRow>
  </table>
</template>

<script>
import ProductTableRow from './ProductTableRow';
import productData from './../mock-data/products';

export default {
  name: 'ProductsTable',
  components: {
    ProductTableRow,
  },
  data() {
    return {
      products: productData,
    };
  },
};
</script>

<style lang="scss">
@import '~styles/variables';

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  color: black;
  font-weight: normal;
  text-align: left;
  cursor: pointer;
}

th, td {
  position: relative;
  border-bottom: 1px solid $light-border-color;
  padding: 10px 2px;

  &.right {
    text-align: right;
  }

  &.name {
    width: 50%;
  }

  &.caret::after {
    position: absolute;
    top: 24px;
    margin-left: 8px;
    content: '';
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #A9B2BB;
  }

  &:first-child {
    text-align: center;

    &::after {
      border: 0;
    }
  }

  &:last-child {
    padding-right: 80px;
    width: 22%;
  }
}
</style>
