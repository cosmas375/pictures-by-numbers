const path = require('path');

module.exports = {
  // https://github.com/neutrinojs/webpack-chain/tree/v4#getting-started
  chainWebpack(config) {
    config.devtool('source-map');
    config.module
      .rule('js')
      .test(/\.js$/)
      .exclude.add(path.resolve(__dirname, 'src/workers'));
    config.module
      .rule('worker-loader')
      .test(/\.js$/)
      .include.add(path.resolve(__dirname, 'src/workers'))
      .end()
      .use('worker-loader')
      .loader('worker-loader')
      .end();
  }
};
