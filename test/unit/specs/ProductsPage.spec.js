import Vue from 'vue';
import ProductsPage from '@/components/ProductsPage';

describe('ProductPage.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ProductsPage);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('h1').textContent)
      .to.equal('Products');
  });
});
