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
        :options="numProductsPerPageOptions" 
        :change-event-name="numProductsPerPageEventName"
        :selected="numProductsPerPage" />
    </div>
    <div class="current-page-container">
      <div
        :class="{ disabled: backButtonIsDisabled }" 
        class="paginate-button back"
        @click="paginate('back')">
      </div>
      <SelectDropdown 
        :options="pageOptions"
        :change-event-name="currentPageEventName"
        :selected="currentPage" />
      <div 
        :class="{ disabled: forwardButtonIsDisabled }" 
        class="paginate-button forward"
        @click="paginate()">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import chunk from 'lodash.chunk';

import ProductsTableRow from './ProductsTableRow';
import SelectDropdown from './SelectDropdown';
import EventBus from './../event-bus';

const NUM_PRODUCTS_PER_PAGE_OPTIONS = [
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

const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_SELECTED_ITEMS_PER_PAGE = NUM_PRODUCTS_PER_PAGE_OPTIONS[1].value;
const NUM_PRODUCTS_PER_PAGE_EVENT_NAME = '$changedProductsPerPage';
const CURRENT_PAGE_EVENT_NAME = '$currentPageEventName';

export default {
  name: 'ProductsTable',
  components: {
    ProductsTableRow,
    SelectDropdown,
  },
  props: ['products'],
  mounted() {
    EventBus.$on(this.numProductsPerPageEventName, (newValue) => {
      this.numProductsPerPage = parseInt(newValue, 10);
    });

    EventBus.$on(this.currentPageEventName, (newValue) => {
      this.currentPage = parseInt(newValue, 10);
    });
  },
  beforeDestroy() {
    EventBus.$off(this.numProductsPerPageEventName);
    EventBus.$off(this.currentPageEventName);
  },
  data() {
    return {
      numProductsPerPageOptions: NUM_PRODUCTS_PER_PAGE_OPTIONS,
      numProductsPerPage: DEFAULT_SELECTED_ITEMS_PER_PAGE,
      currentPage: DEFAULT_CURRENT_PAGE,
      numProductsPerPageEventName: NUM_PRODUCTS_PER_PAGE_EVENT_NAME,
      currentPageEventName: CURRENT_PAGE_EVENT_NAME,
    };
  },
  computed: {
    productsToDisplay() {
      return this.productPages[this.currentPage - 1];
    },
    productPages() {
      return chunk(this.products, this.numProductsPerPage);
    },
    backButtonIsDisabled() {
      return this.currentPage === 1 || this.pageOptions.length === 1;
    },
    forwardButtonIsDisabled() {
      return this.currentPage === this.pageOptions.length;
    },
    pageOptions() {
      const numPagesAllowed = this.productPages.length;
      const pageOptions = [];
      let currentPage = 1;

      while (pageOptions.length !== numPagesAllowed) {
        pageOptions.push({ value: currentPage, name: `${currentPage}` });
        currentPage += 1;
      }

      return pageOptions;
    },
  },
  watch: {
    pageOptions(newPageOptions) {
      const validCurrentPage = newPageOptions.find(option => option.value === this.currentPage);

      if (!validCurrentPage) {
        this.currentPage = DEFAULT_CURRENT_PAGE;
      }
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
        if (this.currentPage === this.pageOptions.length) {
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
    cursor: default;
  }
}
</style>
