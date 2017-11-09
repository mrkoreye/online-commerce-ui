<template>
<tr :class="{ editing: isEditMode }">
  <td>
    <input
      @click="toggleEditMode"
      :checked="isEditMode"
      :disabled="showErrorMessage"
      class="checkbox" 
      type="checkbox" />
  </td>
  <template v-if="!isEditMode">
  <td>
    <div class="product-image-thumbnail"> 
      <img :src="product.thumbnail" />
    </div>
    <span class="product-name">
      {{ product.name }}
    </span>
  </td>
  <td class="center">
    {{ product.type }}
  </td>
  <td class="right">
    ${{ product.price }}
  </td>
  <td 
    :class="{ zero: product.inventory === 0 }"
    class="inventory right">
    {{ product.inventory }}
  </td>
  </template>
  <template v-else>
  <td>
    <div
      v-if="showErrorMessage"
      :style="{ 'z-index': 1000 - rowNumber }"
      class="error-state-container">
      To be valid, products must have:
      <ul>
        <li v-if="!validName">a name</li>
        <li v-if="!validPrice">a numerical price</li>
        <li v-if="!validInventory">an inventory that is a whole number and greater than zero</li>
      </ul>
    </div>
    <div class="product-image-thumbnail"> 
      <img :src="editProduct.thumbnail" />
    </div>
    <input
      :class="{ error: showErrorMessage && !validName }" 
      class=" product-data name"
      v-model.trim="editProduct.name" />
  </td>
  <td class="center type-dropdown">
    <AppSelectDropdown 
      :options="productTypeOptions"
      :change-event-name="productTypeEventName"
      :selected="editProduct.type" />
  </td>
  <td class="right">
    <div class="money-input-container">
      <span class="money-sign">$</span>
      <input
        :class="{ error: showErrorMessage && !validPrice }"
        class="product-data right-align money"
        v-model.number="editProduct.price" />
    </div>
  </td>
  <td class="right">
    <input
      :class="{ error: showErrorMessage && !validInventory }"
      class="product-data right-align"
      v-model.number="editProduct.inventory" />
  </td>
  </template>
</tr>
</template>

<script>
import AppSelectDropdown from './../components/AppSelectDropdown';
import Events from './../event-bus';

const PRODUCT_TYPE_OPTIONS = [
  {
    name: 'Physical',
    value: 'Physical',
  },
  {
    name: 'Digital',
    value: 'Digital',
  },
];

export default {
  name: 'ProductsTableRow',
  components: {
    AppSelectDropdown,
  },

  props: {
    product: {
      type: Object,
    },

    rowNumber: {
      type: [Number, String],
    },

    defaultToEditMode: {
      type: Boolean,
    },
  },

  data() {
    return {
      isEditMode: false,
      editProduct: Object.assign({}, this.product),
      events: Events,
      productTypeOptions: PRODUCT_TYPE_OPTIONS,
      validName: true,
      validPrice: true,
      validInventory: true,
      showErrorState: false,
    };
  },

  computed: {
    productTypeEventName() {
      return `${this.events.names.changeTypeOfProduct}-${this.editProduct.id}`;
    },

    showErrorMessage() {
      return this.showErrorState && !(this.validName && this.validPrice && this.validInventory);
    },
  },

  methods: {
    enterEditMode() {
      this.isEditMode = true;
    },

    exitEditMode() {
      if (this.verifyProductProperties()) {
        this.events.bus.$emit(this.events.names.updateProduct, this.editProduct);
        this.isEditMode = false;
        this.showErrorState = false;
      }
    },

    toggleEditMode() {
      if (this.isEditMode) {
        this.exitEditMode();
      } else {
        this.enterEditMode();
      }
    },

    verifyProductProperties() {
      const noErrors = this.validName && this.validPrice && this.validInventory;

      if (noErrors) {
        return true;
      }

      this.showErrorState = true;
      this.isEditMode = true;
      return false;
    },
  },

  watch: {
    // eslint-disable-next-line func-names
    'editProduct.name': function (newVal) {
      if (!newVal) {
        this.validName = false;
      } else {
        this.validName = true;
      }
    },
    // eslint-disable-next-line func-names
    'editProduct.price': function (newVal) {
      if (typeof newVal === 'number') {
        this.validPrice = true;
      } else {
        this.validPrice = false;
      }
    },
    // eslint-disable-next-line func-names
    'editProduct.inventory': function (newVal) {
      const isNumber = typeof newVal === 'number';
      let isValidInteger;

      if (isNumber) {
        isValidInteger = Number.isInteger(newVal) && (newVal >= 0);
      }

      if (isValidInteger) {
        this.validInventory = true;
      } else {
        this.validInventory = false;
      }
    },
  },

  mounted() {
    this.events.bus.$on(this.productTypeEventName, (type) => {
      this.editProduct.type = type;
    });

    this.events.bus.$on(this.events.names.editAllProducts, (checked) => {
      if (checked) {
        this.enterEditMode();
      } else {
        this.exitEditMode();
      }
    });

    if (this.defaultToEditMode) {
      this.isEditMode = true;
    }
  },

  beforeDestroy() {
    this.events.bus.$off(this.productTypeEventName);
    this.events.bus.$off(this.events.names.editAllProducts);
  },
};
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.product-image-thumbnail {
  height: $thumbnail-height;
  width: $thumbnail-height;
  display: inline-block;
  text-align: center;
  margin: 0 10px;
  border-radius: $border-radius;
  border: 1px solid $light-border-color;
  vertical-align: middle;

  img {
    max-width: 100%;
  }
}

.error-state-container {
  position: absolute;
  background: white;
  top: 50px;
  width: 200%;
  border-left: 5px solid $error-color;
  border-radius: $border-radius;
  padding: 20px;
  box-shadow: 2px 2px 5px 1px rgba(0,0,0,0.3);
}

.product-name {
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 310px;
  overflow: hidden;
}

.inventory.zero {
  color: $error-color;
}

.editing {
  background-color: #F8F9FA;

  input.product-data {
    display: inline-block;
    vertical-align: middle;
    border: 1px solid $button-border-color;
    border-radius: $border-radius;
    height: $thumbnail-height;
    line-height: $thumbnail-height;
    color: $base-font-color;
    padding: 0 10px;
    position: relative;
    width: 40%;

    &.name {
      width: 77%;
    }

    &.right-align {
      text-align: right;
    }

    &.error {
      border: 1px solid $error-color;
    }
  }

  .money-input-container {
    position: relative;
    display: inline-block;

    .money-sign {
      position: absolute;
      top: 7px;
      left: 18%;
      width: 20px;
      height: 20px;
      color: $button-border-color;
      z-index: 1;
    }

    input {
      width: 60%;
    }
  }

  .type-dropdown /deep/ {
    .select-container {
      width: 90%;
    }
  }
}
</style>
