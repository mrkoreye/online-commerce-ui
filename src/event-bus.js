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
      clickExport: '$clickedExportButton',
      clickImport: '$clickedImportButton',
      clickAddProduct: '$clickedAddProductButton',
      headerLabelClick: '$clickedHeaderLabel',
      newProductAdded: '$newProductAdded',
    };
  }

  // This method is used when tearing down the app to remove event listeners
  destroyAllGlobalListeners() {
    const nameKeys = Object.keys(this.names);

    nameKeys.forEach((key) => {
      this.bus.$off(this.names[key]);
    });
  }
}

export default new Events();
