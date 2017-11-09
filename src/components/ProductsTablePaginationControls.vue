<template>
<div class="pagination-container">
  <div class="items-per-page-container">
    <span class="items-per-page-label">
      Items per page:
    </span>
    <AppSelectDropdown 
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
    <AppSelectDropdown 
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
import AppSelectDropdown from './AppSelectDropdown';
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

export default {
  name: 'ProductsTablePaginationControls',
  components: {
    AppSelectDropdown,
  },
  props: {
    numProductsPerPage: {
      type: Number,
    },

    currentPage: {
      type: Number,
    },

    pageOptions: {
      type: Array,
    },
  },

  data() {
    return {
      numProductsPerPageOptions: NUM_PRODUCTS_PER_PAGE_OPTIONS,
      events: Events,
    };
  },

  computed: {
    backButtonIsDisabled() {
      return this.currentPage === 1 || this.pageOptions.length === 1;
    },

    forwardButtonIsDisabled() {
      return this.currentPage === this.pageOptions.length;
    },
  },

  methods: {
    paginate(direction) {
      let currentPage = this.currentPage;

      if (direction === 'back') {
        if (currentPage === 1) {
          return;
        }

        currentPage -= 1;
      } else {
        if (currentPage === this.pageOptions.length) {
          return;
        }

        currentPage += 1;
      }

      this.events.bus.$emit(this.events.names.currentlySelectedPage, currentPage);
    },
  },
};
</script>

<style lang="scss">
@import '~styles/variables';

.pagination-container {
  margin: 10px 0 20px;
  position: relative;

  span {
    display: inline-block;
    font-size: 15px;
    margin-right: 10px;
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
