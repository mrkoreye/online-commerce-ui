<template>
<div class="table-container">
  <table>
    <tr>
      <th>
        <input
          @click="handleAllProductEdit"
          class="checkbox" 
          type="checkbox" />
      </th>
      <th
        @click="handleHeaderClick('name')" 
        :class="{ ascending: sortOrderCategory === 'name' && sortOrderIsAscending }"
        class="name caret">
        Name
      </th>
      <th
        @click="handleHeaderClick('type')"
        :class="{ ascending: sortOrderCategory === 'type' && sortOrderIsAscending }" 
        class="center caret">
        Type
      </th>
      <th
        @click="handleHeaderClick('price')"
        :class="{ ascending: sortOrderCategory === 'price' && sortOrderIsAscending }"
        class="right caret">
        Price
      </th>
      <th
        @click="handleHeaderClick('inventory')"
        :class="{ ascending: sortOrderCategory === 'inventory' && sortOrderIsAscending }"
        class="right caret">
        Inventory
      </th>
    </tr>
    <ProductsTableRow 
      v-for="(product, index) in productsToDisplay"
      :row-number="index"
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
        :change-event-name="events.names.productsPerPage"
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
        :change-event-name="events.names.currentlySelectedPage"
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
import Events from './../event-bus';

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

export default {
  name: 'ProductsTable',
  components: {
    ProductsTableRow,
    SelectDropdown,
  },
  props: ['products'],
  mounted() {
    this.events.bus.$on(this.events.names.productsPerPage, (newValue) => {
      this.numProductsPerPage = parseInt(newValue, 10);
    });

    this.events.bus.$on(this.events.names.currentlySelectedPage, (newValue) => {
      this.currentPage = parseInt(newValue, 10);
    });
  },
  beforeDestroy() {
    this.events.bus.$off(this.events.names.productsPerPage);
    this.events.bus.$off(this.events.names.currentlySelectedPage);
  },
  data() {
    return {
      numProductsPerPageOptions: NUM_PRODUCTS_PER_PAGE_OPTIONS,
      numProductsPerPage: DEFAULT_SELECTED_ITEMS_PER_PAGE,
      currentPage: DEFAULT_CURRENT_PAGE,
      events: Events,
      sortOrderCategory: 'name',
      sortOrderIsAscending: true,
    };
  },
  computed: {
    productsToDisplay() {
      return this.productPages[this.currentPage - 1];
    },
    productPages() {
      return chunk(this.sortedProducts, this.numProductsPerPage);
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
    sortedProducts() {
      const sortedProducts = this.products.sort((product1, product2) => {
        const sortCriterion1 = product1[this.sortOrderCategory];
        const sortCriterion2 = product2[this.sortOrderCategory];
        let sortReturnNumber;

        if (sortCriterion1 < sortCriterion2) {
          sortReturnNumber = -1;
        } else if (sortCriterion1 > sortCriterion2) {
          sortReturnNumber = 1;
        } else {
          // The sort critera are equal
          sortReturnNumber = 0;
        }

        if (!this.sortOrderIsAscending) {
          // Reverse the sort order if the user wants descending instead of ascending
          sortReturnNumber *= -1;
        }

        return sortReturnNumber;
      });

      return sortedProducts;
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
    handleHeaderClick(category) {
      if (this.sortOrderCategory === category) {
        this.sortOrderIsAscending = !this.sortOrderIsAscending;
      } else {
        this.sortOrderIsAscending = true;
      }

      this.sortOrderCategory = category;
    },
    handleAllProductEdit(event) {
      this.events.bus.$emit(this.events.names.editAllProducts, event.target.checked);
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
  table-layout: fixed;
}

th {
  color: black;
  font-weight: normal;
  text-align: left;
  cursor: pointer;

  &.name {
    padding-left: 10px;
  }
}

th, td {
  position: relative;
  border-bottom: 1px solid $light-border-color;
  padding: 10px 2px;

  &.right {
    text-align: right;
    width: 120px;
  }

  &.center {
    text-align: right;
    width: 105px;
    padding-right: 30px;

    &.caret {
      padding-right: 50px;
    }
  }

  &.name {
    width: 42%;
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
    border-bottom: 0;
  }

  &.caret.ascending::after {
    transform: rotate(180deg);
  }

  &:first-child {
    text-align: center;
    margin: 0 10px;

    &::after {
      border: 0;
    }
  }

  &:last-child {
    padding-right: 80px;
    width: 22%;
  }

  .select-container {
    width: 90%;
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
  margin: 0 5px;
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
