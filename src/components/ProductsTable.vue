<template>
<div class="table-container">
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
  <div class="pagination-container">
    <div class="items-per-page-container">
      <span class="items-per-page-label">Items per page:</span>
      <SelectDropdown class="items-per-page" :options="selectOptions" :selected="selectedOptionValue"></SelectDropdown>
    </div>
    <div class="current-page-container">
      <SelectDropdown :options="selectOptions" :selected="selectedOptionValue"></SelectDropdown>
    </div>
  </div>
</div>
</template>

<script>
import ProductTableRow from './ProductTableRow';
import SelectDropdown from './SelectDropdown';
import productData from './../mock-data/products';

const SELECT_OPTIONS = [
  {
    value: 5,
    name: '5',
  },
  {
    value: 10,
    name: '10',
  },
  {
    value: 15,
    name: '15',
  },
];

const DEFAULT_SELECTED_ITEMS_PER_PAGE = SELECT_OPTIONS[1].value;

export default {
  name: 'ProductsTable',
  components: {
    ProductTableRow,
    SelectDropdown,
  },
  data() {
    return {
      products: productData,
      selectOptions: SELECT_OPTIONS,
      selectedOptionValue: DEFAULT_SELECTED_ITEMS_PER_PAGE,
      // mock the page logic for now
      pages: [1, 2, 3],
      currentPage: 1,
    };
  },
};
</script>

<style lang="scss">
@import '~styles/variables';

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
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

.pagination-container {
  margin: 10px 0 20px;
  position: relative;

  span {
    display: inline-block;
    font-size: 15px;
    margin-right: 5px;
  }
}

.items-per-page-container,
.current-page-container {
  display: inline-block;
}

.current-page-container {
  position: absolute;
  right: 0;
}
</style>
