<template>
<div class="table-container">
  <table>
    <tr>
      <th>
        <input 
          class="checkbox" 
          type="checkbox" />
      </th>
      <th class="name caret">Name</th>
      <th class="caret">Type</th>
      <th class="right caret">Price</th>
      <th class="right caret">Inventory</th>
    </tr>
    <ProductsTableRow 
      v-for="product in productsToDisplay" 
      :key="product.id" 
      :product="product" />
  </table>
  <div class="pagination-container">
    <div class="items-per-page-container">
      <span class="items-per-page-label">
        Items per page:
      </span>
      <SelectDropdown 
        class="items-per-page" 
        another="hi"
        :options="numProductsPerPageOptions" 
        :change-event-name="numProductsPerPageEventName"
        :selected="numProductsPerPage" />
    </div>
    <div class="current-page-container">
      <div 
        class="paginate-button back disabled"
        @click="paginate('back')">
      </div>
      <SelectDropdown 
        :options="pages"
        :changeCallback="updateCurrentPage"
        :selected="currentPage" />
      <div 
        class="paginate-button forward"
        @click="paginate()">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ProductsTableRow from './ProductsTableRow';
import SelectDropdown from './SelectDropdown';
import productData from './../mock-data/products';
import EventBus from './../event-bus';

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

const MOCK_PAGES = [
  {
    value: 1,
    name: '1',
  },
  {
    value: 2,
    name: '2',
  },
  {
    value: 3,
    name: '3',
  },
];

const MOCK_CURRENT_PAGE = MOCK_PAGES[0].value;
const DEFAULT_SELECTED_ITEMS_PER_PAGE = SELECT_OPTIONS[1].value;
const NUM_PRODUCTS_PER_PAGE_EVENT_NAME = '$changedProductsPerPage';

export default {
  name: 'ProductsTable',
  components: {
    ProductsTableRow,
    SelectDropdown,
  },
  mounted() {
    EventBus.$on(this.numProductsPerPageEventName, (newValue) => {
      this.numProductsPerPage = newValue;
    });
  },
  beforeDestroy() {
    EventBus.$off(this.numProductsPerPageEventName);
  },
  data() {
    return {
      products: productData,
      numProductsPerPageOptions: SELECT_OPTIONS,
      numProductsPerPage: DEFAULT_SELECTED_ITEMS_PER_PAGE,
      // mock the page logic for now
      pages: MOCK_PAGES,
      currentPage: MOCK_CURRENT_PAGE,
      numProductsPerPageEventName: NUM_PRODUCTS_PER_PAGE_EVENT_NAME,
      updateCurrentPage(event) {
        if (event) {
          this.currentPage = event.target.value;
        }
      },
    };
  },
  computed: {
    productsToDisplay() {
      // const startingProductIndex = (this.currentPage * this.numProductsPerPage) - 1;
      // return this.products.slice(startingProductIndex, this.numProductsPerPage);
      return this.products.slice(0, this.numProductsPerPage);
    },
  },
  methods: {
    paginate(direction) {
      if (direction === 'back') {
        if (this.currentPage === 1) {
          return;
        }

        this.currentPage -= 1;
      } else {
        if (this.currentPage === this.pages.length) {
          return;
        }

        this.currentPage += 1;
      }
    },
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
    top: 20px;
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

.paginate-button {
  display: inline-block;
  border-radius: $border-radius;
  border: 1px solid $button-border-color;
  background-image: url('./../assets/caret-dropdown-icon.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 11px;
  height: 32px;
  width: 32px;
  vertical-align: middle;
  cursor: pointer;

  &.forward {
    transform: rotate(270deg);
  }

  &.back {
    transform: rotate(90deg);
  }

  &.disabled {
    opacity: 0.3;
  }
}
</style>
