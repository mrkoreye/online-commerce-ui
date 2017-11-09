<template>
<div class="table-container">
  <table>
    <ProductsTableHeader
      :sortOrderCategory="sortOrderCategory"
      :sortOrderIsAscending="sortOrderIsAscending" />
    <template v-if="productsToDisplay">
    <tbody>
      <transition name="slide-fade">
        <ProductsTableRow
          v-if="addNewProductMode"
          :key="addNewProduct.id"
          :product="addNewProduct"
          :row-number="addNewProductRowNumber"
          :default-to-edit-mode="addNewProductDefaultToEdit" />
      </transition>
      <ProductsTableRow 
        v-for="(product, index) in productsToDisplay"
        :row-number="index"
        :key="product.id" 
        :product="product" />
    </tbody>
    </template>
    <template v-else>
    <div class="no-products">
      We did not find any matching products
    </div>
    </template>
  </table>
  <ProductsTablePaginationControls 
    :numProductsPerPage="numProductsPerPage"
    :currentPage="currentPage"
    :pageOptions="pageOptions" />
</div>
</template>

<script>
import chunk from 'lodash.chunk';

import ProductsTableRow from './ProductsTableRow';
import AppSelectDropdown from './AppSelectDropdown';
import ProductsTablePaginationControls from './ProductsTablePaginationControls';
import ProductsTableHeader from './ProductsTableHeader';
import Events from './../event-bus';
import config from './../config';

export default {
  name: 'ProductsTable',
  components: {
    ProductsTableRow,
    AppSelectDropdown,
    ProductsTablePaginationControls,
    ProductsTableHeader,
  },
  props: {
    products: Array,
  },

  data() {
    return {
      numProductsPerPage: config.DEFAULT_SELECTED_ITEMS_PER_PAGE,
      currentPage: config.DEFAULT_CURRENT_PAGE,
      events: Events,
      sortOrderCategory: 'name',
      sortOrderIsAscending: true,
      addNewProductMode: false,
      addNewProductDefaultToEdit: true,
      addNewProductRowNumber: -1,
      addNewProduct: Object.assign({}, config.DEFAULT_NEW_PRODUCT),
    };
  },

  computed: {
    productsToDisplay() {
      return this.productPages[this.currentPage - 1];
    },

    productPages() {
      return chunk(this.sortedProducts, this.numProductsPerPage);
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
        let sortCriterion1 = product1[this.sortOrderCategory];
        let sortCriterion2 = product2[this.sortOrderCategory];
        let sortReturnNumber;

        if (typeof sortCriterion1 === 'string') {
          sortCriterion1 = sortCriterion1.trim().toLowerCase().normalize();
          sortCriterion2 = sortCriterion2.trim().toLowerCase().normalize();
        }

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
        this.currentPage = config.DEFAULT_CURRENT_PAGE;
      }
    },
  },

  methods: {
    handleAllProductEdit(event) {
      this.events.bus.$emit(this.events.names.editAllProducts, event.target.checked);
    },
  },

  mounted() {
    this.events.bus.$on(this.events.names.productsPerPage, (newValue) => {
      this.numProductsPerPage = parseInt(newValue, 10);
    });

    this.events.bus.$on(this.events.names.currentlySelectedPage, (newValue) => {
      this.currentPage = parseInt(newValue, 10);
    });

    this.events.bus.$on(this.events.names.headerLabelClick, (newValues) => {
      this.sortOrderCategory = newValues.sortOrderCategory;
      this.sortOrderIsAscending = newValues.sortOrderIsAscending;
    });

    this.events.bus.$on(this.events.names.clickAddProduct, () => {
      if (this.addNewProductMode) {
        return;
      }

      this.addNewProduct = Object.assign({}, config.DEFAULT_NEW_PRODUCT);
      this.addNewProduct.id = Date.now();
      this.addNewProductMode = true;
    });

    this.events.bus.$on(this.events.names.newProductAdded, () => {
      this.addNewProductMode = false;
    });
  },
};
</script>

<style lang="scss">
@import '~styles/shared-table-styles';
</style>

<style lang="scss" scoped>
@import '~styles/variables';

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  table-layout: fixed;
}

.no-products {
  width: 900px;
  text-align: center;
  padding: 50px 0;
}

.slide-fade-enter-active {
  transition: all .2s ease-in-out;
}
.slide-fade-leave-active {
  transition: all .2s ease-in-out;
}
.slide-fade-enter, 
.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(30px);
}

.slide-fade-leave-to {
  transform: translateX(-30px);
}
</style>
