const config = {
  DEFAULT_CURRENT_PAGE: 1,
  DEFAULT_SELECTED_ITEMS_PER_PAGE: 10,
  DEFAULT_NEW_PRODUCT: {
    id: Date.now(),
    name: '',
    type: 'Physical',
    price: 0,
    inventory: 0,
    thumbnail: 'http://frontend-trial-project.weebly.com/uploads/1/0/5/4/105462933/super-high-waisted-jeans-google-search-iozlcm0zk5j.png',
  },
  NUM_PRODUCTS_PER_PAGE_OPTIONS: [
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
  ],
  PRODUCT_TYPE_OPTIONS: [
    {
      name: 'Physical',
      value: 'Physical',
    },
    {
      name: 'Digital',
      value: 'Digital',
    },
  ],
};

export default config;
