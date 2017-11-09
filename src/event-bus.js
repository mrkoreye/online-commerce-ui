// Simple event bus for communicating events. Decided to use
// this approach to help with state management over vuex because
// the app is so small.
import Vue from 'vue';

class Events {
  constructor() {
    this.bus = new Vue();
    this.names = {
      changeSort: '$changedSort',
      productsPerPage: '$changedProductsPerPage',
      currentlySelectedPage: '$currentlySelectedPage',
      updateProduct: '$updatedProduct',
      editAllProducts: '$editAllProducts',
      changeTypeOfProduct: '$changeTypeOfProduct',
    };
  }
}

export default new Events();
