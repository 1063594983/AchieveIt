module.exports = {
  configureWebpack: {
    externals: {
      'element-ui': 'ELEMENT',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
    },
  },
  chainWebpack: (config) => {
    if (process.env.ANALYZE_REPORT) {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
  },
};
