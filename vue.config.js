module.exports = {
  productionSourceMap: false,
  chainWebpack(config) {
    // https://github.com/neutrinojs/webpack-chain/tree/v4#getting-started
    config.module.rule('js').test(/^((?!\.worker).)*\.js$/);
    config.module
      .rule('worker-loader')
      .test(/\.worker\.js$/)
      .use('worker-loader')
      .loader('worker-loader')
      .end();
  }
};
