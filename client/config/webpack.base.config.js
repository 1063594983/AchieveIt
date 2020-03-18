const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const { join, basename } = require('path');
const camel2Dash = require('camel-2-dash');

module.exports = {
  entry: './src/main.ts',
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/],
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'element-ui',
                libraryDirectory: 'lib',
                camel2DashComponentName: true,
                style: path => join('element-ui', 'lib', 'theme-chalk', `${camel2Dash(basename(path, '.js'))}.css`)
              })
            ]
          })
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  }
};
