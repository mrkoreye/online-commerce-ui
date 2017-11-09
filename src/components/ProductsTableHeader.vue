<template>
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
      let sortOrderCategory = this.sortOrderCategory;
      let sortOrderIsAscending = this.sortOrderIsAscending;

      if (sortOrderCategory === category) {
        sortOrderIsAscending = !sortOrderIsAscending;
      } else {
        sortOrderIsAscending = true;
      }

      sortOrderCategory = category;

      this.events.bus.$emit(this.events.names.headerLabelClick, {
        sortOrderCategory,
        sortOrderIsAscending,
      });
    },

    handleAllProductEdit(event) {
      this.events.bus.$emit(this.events.names.editAllProducts, event.target.checked);
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
