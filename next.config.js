// const withSass = require("@zeit/next-sass");
// module.exports = withSass();

const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withCSS(withSass());