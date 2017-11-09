<template>
<thead>
  <tr>
    <th>
      <input
        @click="handleAllProductEdit"
        class="checkbox" 
        type="checkbox" />
    </th>
    <th
      @click="handleHeaderClick('name')" 
      :class="{ ascending: shouldHaveAscendingClass('name') }"
      class="name caret">
      Name
    </th>
    <th
      @click="handleHeaderClick('type')"
      :class="{ ascending: shouldHaveAscendingClass('type') }" 
      class="center caret">
      Type
    </th>
    <th
      @click="handleHeaderClick('price')"
      :class="{ ascending: shouldHaveAscendingClass('price') }"
      class="right caret">
      Price
    </th>
    <th
      @click="handleHeaderClick('inventory')"
      :class="{ ascending: shouldHaveAscendingClass('inventory') }"
      class="right caret">
      Inventory
    </th>
  </tr>
</thead>
</template>

<script>
import Events from './../event-bus';

export default {
  name: 'ProductsTable',
  props: {
    sortOrderCategory: {
      type: String,
    },

    sortOrderIsAscending: {
      type: Boolean,
    },
  },

  data() {
    return {
      events: Events,
    };
  },

  methods: {
    handleHeaderClick(category) {
      let sortOrderIsAscending = this.sortOrderIsAscending;

      if (this.sortOrderCategory === category) {
        sortOrderIsAscending = !sortOrderIsAscending;
      } else {
        sortOrderIsAscending = true;
      }

      this.events.bus.$emit(this.events.names.headerLabelClick, {
        sortOrderCategory: category,
        sortOrderIsAscending,
      });
    },

    handleAllProductEdit(event) {
      this.events.bus.$emit(this.events.names.editAllProducts, event.target.checked);
    },

    shouldHaveAscendingClass(category) {
      return (this.sortOrderCategory === category) && this.sortOrderIsAscending;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~styles/variables';

th {
  color: black;
  font-weight: normal;
  cursor: pointer;

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

  &.name {
    padding-left: 13px;
  }
}
</style>
