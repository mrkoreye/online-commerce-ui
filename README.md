# online-commerce-ui

> A vue.js frontend for an online commerce site. It supports adding/editing products, sorting, front-end only searching, and pagination. Currently hooked up to a mock api.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Deployment
This site is deployed to aws s3 [here](http://commerce-ui.korey.io). The deployment process invovles building the production files, minifying js/css/html, and uploading to an s3 bucket.
Since this project was built using the `vue-cli`, the build process is built in. Yay! Run this command to build and deploy:
```
npm run deploy
```

For a detailed explanation on the cli template used in this project, visit [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
