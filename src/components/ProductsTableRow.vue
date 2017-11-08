<template>
  <tr>
    <td>
      <input 
        class="checkbox" 
        type="checkbox" />
    </td>
    <td>
      <div class="product-image-thumbnail"> 
        <img :src="product.thumbnail" />
      </div>
      <span>
        {{ product.name }}
      </span>
    </td>
    <td>
      {{ product.type }}
    </td>
    <td class="right">
      ${{ product.price }}
    </td>
    <td class="right">
      {{ product.inventory }}
    </td>
  </tr>
</template>

<script>
export default {
  name: 'ProductsTableRow',
  props: ['product'],
};
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.product-image-thumbnail {
  height: 32px;
  width: 32px;
  display: inline-block;
  text-align: center;
  margin-right: 10px;
  border-radius: $border-radius;
  border: 1px solid $light-border-color;
  vertical-align: middle;

  img {
    max-width: 100%;
  }
}
</style>
