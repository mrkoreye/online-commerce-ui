// Simple API service to interact with
// the product API

import axios from 'axios';

const MOCK_PRODUCT_API_URL_BASE = 'http://private-anon-cdd19d70cc-weeblyfrontendtrialapi.apiary-mock.com/';
const PRODUCTS_URL_BASE = `${MOCK_PRODUCT_API_URL_BASE}products`;
const PRODUCT_URL_BASE = `${MOCK_PRODUCT_API_URL_BASE}product/`;

class ProductApi {
  constructor() {
    this.axios = axios;
  }

  getAllProducts() {
    this.axios.get(PRODUCTS_URL_BASE);
  }

  createProduct(product) {
    this.axios.post(PRODUCTS_URL_BASE, product);
  }

  getProduct(id) {
    this.axios.get(`${PRODUCT_URL_BASE + id}`);
  }

  updateProduct(product) {
    this.axios.put(`${PRODUCT_URL_BASE + product.id}`, product);
  }
}

export default new ProductApi();
