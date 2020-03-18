const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin()]
});
