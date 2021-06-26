const path = require('path');

module.exports = {
  // https://github.com/neutrinojs/webpack-chain/tree/v4#getting-started
  chainWebpack(config) {
    config.devtool('source-map');
    config.module.rule('js').test(/^((?!\.worker).)*\.js$/);
    config.module
      .rule('worker-loader')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .end();
  }
};
